import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useCurrentThemeData} from '../../../../lib/redux/hooks';
import {globalStyles} from '../../../../styles';
import {CommonImage} from '../../../common/image';
import {CustomText} from '../../..';
import {defaultDimensions} from '../../../../constants';
import {
  BookmarkOutlineIcon,
  HeartOutlineIcon,
  ShareOutlineIcon,
} from '../../../../assets/icons';

interface PostCardProps {
  url: string;
  title: string;
  subText: string;
  itemKey: string;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  subTextStyle?: TextStyle;
  cardStyle?: ViewStyle;
  showImage?: boolean;
  showShadow?: boolean;
  userLiked?: boolean;
  userBookmarked?: boolean;
  onLikeToggle?: (status: boolean) => void; // Callback when heart icon is toggled
  onBookmarkToggle?: (status: boolean) => void; // Callback when bookmark icon is toggled
  onShare?: () => void; // Callback when share icon is clicked
  onPressImage?: () => void; // Callback when image is pressed
}

const PostCard: React.FC<PostCardProps> = ({
  url,
  title,
  subText,
  itemKey,
  imageStyle,
  titleStyle,
  subTextStyle,
  cardStyle,
  showImage = true,
  showShadow = false,
  onLikeToggle,
  onBookmarkToggle,
  onShare,
  onPressImage,
  userBookmarked,
  userLiked,
}: PostCardProps) => {
  const {colors} = useCurrentThemeData();
  const commonStyles = globalStyles({colors});
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsLiked(userBookmarked ?? false);
    setIsBookmarked(userLiked ?? false);
  }, [userLiked, userBookmarked]);

  // Heart click handler
  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    onLikeToggle?.(!isLiked); // Call the parent callback
  };

  // Bookmark click handler
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    if (onBookmarkToggle) {
      onBookmarkToggle(!isBookmarked);
    } // Call the parent callback
  };

  // Share click handler
  const handleShareClick = () => {
    if (onShare) {
      onShare();
    } // Call the parent callback
  };

  return (
    <View
      style={[
        showShadow ? commonStyles.shadowMedium : {},
        styles.card,
        cardStyle,
      ]}
      key={itemKey}>
      {showImage && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            onPressImage?.();
          }}
          style={styles.image}>
          <CommonImage
            source={{uri: url ?? ''}}
            style={[styles.image, imageStyle]}
            showBgColor={true}
          />
        </TouchableOpacity>
      )}
      <View style={styles.cardBottom}>
        <View style={styles.iconContainer}>
          <View style={styles.firstIconContainer}>
            {/* Heart Icon */}
            <TouchableOpacity onPress={handleHeartClick}>
              <HeartOutlineIcon
                stroke={isLiked ? 'red' : colors.text}
                width={30}
                height={30}
                strokeWidth={1}
                fill={isLiked ? 'red' : colors.background}
              />
            </TouchableOpacity>

            {/* Share Icon */}
            <TouchableOpacity onPress={handleShareClick}>
              <ShareOutlineIcon
                stroke={colors.text}
                width={28}
                height={28}
                strokeWidth={1}
              />
            </TouchableOpacity>
          </View>

          {/* Bookmark Icon */}
          <TouchableOpacity onPress={handleBookmarkClick}>
            <BookmarkOutlineIcon
              stroke={isBookmarked ? 'blue' : colors.text}
              width={30}
              height={30}
              strokeWidth={1}
            />
          </TouchableOpacity>
        </View>

        {/* Title and Subtitle */}
        <View>
          <CustomText
            style={[
              {color: colors.text},
              commonStyles.cardHeaderBold,
              titleStyle,
            ]}>
            {title}
          </CustomText>
          <CustomText
            style={[
              {color: colors.text, marginTop: 8},
              commonStyles.text,
              subTextStyle,
            ]}>
            {subText}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardBottom: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: defaultDimensions.appHorizontalPadding,
    paddingVertical: defaultDimensions.paddingSmall,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  image: {
    width: '100%',
    height: 350,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: defaultDimensions.marginSmall,
  },
  firstIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
});

export default PostCard;
