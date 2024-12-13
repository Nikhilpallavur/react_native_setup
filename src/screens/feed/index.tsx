import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {PAGINATION_DEFAULT_DATA} from '../../constants/common';
import {handleError} from '../../utils';
import {ArticleType, RootStackParamList} from '../../types';
import {PATH_URL} from '../../constants';
import {useCurrentThemeData, useUserDetails} from '../../lib/redux/hooks';
import PostCard from '../../components/cards/feed/post';
import {globalShare} from '../../utils/functions/share';
import {AppMainLayout} from '../../layout';
import {
  getArticlesWithInteractions,
  toggleArticleInteraction,
} from '../../service/api';

interface FeedPageProps {
  navigation: NavigationProp<RootStackParamList, 'feed'>;
}

const FeedScreen = ({navigation}: FeedPageProps) => {
  const {colors} = useCurrentThemeData();
  const {userId} = useUserDetails();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const fetchFeedData = useCallback(
    async (refresh = false) => {
      if (loading) {
        return;
      } // Prevent fetching while already loading
      try {
        setLoading(true);
        const {data: articlesData} = await getArticlesWithInteractions({
          offset,
          userId: userId,
        });

        if (refresh) {
          setArticles(articlesData || []);
        } else {
          setArticles(prev => [...prev, ...(articlesData || [])]);
        }

        if (
          articlesData &&
          articlesData.length < PAGINATION_DEFAULT_DATA.limit
        ) {
          setHasMore(false);
        }

        setOffset(prev => prev + PAGINATION_DEFAULT_DATA.limit);
      } catch (error) {
        handleError(
          error,
          'Failed to fetch feed data. Please try again later.',
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading, offset, userId],
  );

  useEffect(() => {
    if (offset === 0 && userId !== '') {
      fetchFeedData(true);
    }
  }, [fetchFeedData, offset, userId]);

  const onRefresh = () => {
    setOffset(0);
    setRefreshing(true);
    setHasMore(true); // Reset pagination control
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchFeedData();
    }
  };

  const onSharePress = async ({item}: {item: ArticleType}) => {
    try {
      await globalShare({
        message: item?.title ?? '',
        url: `dolfin://${PATH_URL.feedDetail}`,
        title: 'Feed Share',
      });
    } catch (error) {
      handleError(error, 'Failed to share article. Please try again later.');
    }
  };

  const onInteraction = async ({
    articleId,
    actionType,
  }: {
    articleId: number;
    actionType: 'like' | 'bookmark';
  }) => {
    await toggleArticleInteraction({
      userId: userId,
      articleId: articleId,
      actionType: actionType,
    });
  };

  const renderItem = ({item}: {item: ArticleType}) => (
    <PostCard
      onPressImage={() => navigation.navigate('feedDetail')}
      itemKey={String(item?.id)}
      url={item.image_url}
      subText={`${item.source} • ${item.category}`}
      title={item.title}
      onShare={() => onSharePress({item})}
      userBookmarked={item?.userBookmarked}
      userLiked={item?.userLiked}
      onLikeToggle={() => {
        onInteraction({articleId: item.id, actionType: 'like'});
      }}
      onBookmarkToggle={() => {
        onInteraction({articleId: item.id, actionType: 'bookmark'});
      }}
    />
  );

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <ActivityIndicator
        style={{marginVertical: 20}}
        size="large"
        color={colors.primary}
      />
    );
  };

  return (
    <AppMainLayout title="Feed">
      <FlatList
        style={{flex: 1}}
        data={articles}
        renderItem={renderItem}
        bounces={true}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </AppMainLayout>
  );
};

export default FeedScreen;
