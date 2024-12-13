import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {supabase} from '../../service/supabase/connect';
import {PAGINATION_DEFAULT_DATA} from '../../constants/common';
import {handleError, showToast} from '../../utils';
import {globalStyles} from '../../styles';
import {RootStackParamList} from '../../types';
import {defaultBorderRadius, defaultDimensions} from '../../constants';
import {CustomText} from '../../components';
import {useCurrentThemeData} from '../../lib/redux/hooks';

interface LoginPageProps {
  navigation: NavigationProp<RootStackParamList, 'checks'>;
}

interface Article {
  id: number;
  title: string;
  url: string;
  source: string;
  category: string;
  image_url: string;
}

const ExpensesScreen = ({}: LoginPageProps) => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors: colors});
  const [articles, setArticles] = useState<Article[]>([]);
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
        const {data: articlesData, error: articlesError} = await supabase
          .from('financial_articles')
          .select('*', {count: 'exact'})
          .order('created_at', {ascending: false})
          .limit(PAGINATION_DEFAULT_DATA.limit)
          .range(offset, offset + PAGINATION_DEFAULT_DATA.limit - 1);

        if (articlesError) {
          showToast({type: 'error', text1: articlesError.message});
          return;
        }

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
    [loading, offset],
  );

  useEffect(() => {
    if (offset === 0) {
      fetchFeedData(true);
    }
  }, [fetchFeedData, offset]);

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

  const renderItem = ({item}: {item: Article}) => (
    <View
      style={[
        commonStyles.shadowSmall,
        styles.card,
        {backgroundColor: colors.cardBackground},
      ]}
      key={item?.id}>
      <View style={styles.cardBottom}>
        <CustomText
          style={[
            {
              color: colors.text,
            },
            commonStyles.cardHeaderBold,
          ]}>
          {item.title}
        </CustomText>
        <CustomText
          style={[{color: colors.text, marginTop: 5}, commonStyles.text]}>
          {item.source} • {item.category}
        </CustomText>
      </View>
    </View>
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
    <SafeAreaView style={[commonStyles.container]}>
      {/* <CommonHeader title="Feed" /> */}
      <FlatList
        style={{flex: 1}}
        data={articles}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 16,
        }}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: defaultBorderRadius.large,
    marginBottom: 10,
  },
  cardBottom: {
    paddingHorizontal: defaultDimensions.paddingMedium,
    paddingVertical: defaultDimensions.paddingMedium,
  },
  image: {
    height: 180,
    borderTopEndRadius: defaultBorderRadius.large,
    borderTopStartRadius: defaultBorderRadius.large,
    overflow: 'hidden',
  },
});

export default ExpensesScreen;
