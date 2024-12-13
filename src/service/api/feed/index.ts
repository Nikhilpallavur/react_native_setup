import {PAGINATION_DEFAULT_DATA} from '../../../constants/common';
import {ArticleType} from '../../../types';
import {handleError} from '../../../utils';
import {supabase} from '../../supabase/connect';

export const getArticlesWithInteractions = async ({
  offset,
  userId,
  action_type,
}: {
  userId: string;
  offset: number;
  action_type?: 'like' | 'bookmark';
}) => {
  try {
    let articles: ArticleType[] | null = [];
    let totalCount: number | null = 0;
    if (action_type) {
      const {data, error, count} = await supabase
        .from('article_interactions')
        .select('financial_articles(*)') // Fetch related financial_articles
        .eq('user_id', userId) // Match current user ID
        .eq('action_type', action_type)
        .limit(PAGINATION_DEFAULT_DATA.limit)
        .range(offset, offset + PAGINATION_DEFAULT_DATA.limit - 1);
      if (error) {
        throw new Error(`Error fetching articles: ${error.message}`);
      }
      totalCount = count;
      articles = data.map(interaction => {
        const {financial_articles} = interaction;
        if (!financial_articles) {
          throw new Error('Missing financial_articles data');
        }
        return {
          ...financial_articles,
        } as unknown as ArticleType;
      });
    } else {
      const {data, error, count} = await supabase
        .from('financial_articles')
        .select('*', {count: 'exact'})
        .order('created_at', {ascending: false})
        .limit(PAGINATION_DEFAULT_DATA.limit)
        .range(offset, offset + PAGINATION_DEFAULT_DATA.limit - 1);

      totalCount = count;
      articles = data;
      if (error) {
        throw new Error(`Error fetching articles: ${error.message}`);
      }
    }

    // Step 2: Fetch all interactions (likes and bookmarks)
    const {data: allInteractions, error: interactionsError} = await supabase
      .from('article_interactions')
      .select('article_id, action_type, user_id');

    if (interactionsError) {
      throw new Error(
        `Error fetching interactions: ${interactionsError.message}`,
      );
    }

    if (articles === null || articles?.length === 0) {
      throw new Error('Error fetching data');
    }

    // Step 3: Group interactions by article and action type (like/bookmark)
    const interactionCounts = allInteractions.reduce((acc, interaction) => {
      const {article_id, action_type: action_typeVar} = interaction;

      // Initialize counts if not already set
      if (!acc[article_id]) {
        acc[article_id] = {likeCount: 0, bookmarkCount: 0};
      }

      // Increment counts based on action type
      if (action_typeVar === 'like') {
        acc[article_id].likeCount += 1;
      } else if (action_typeVar === 'bookmark') {
        acc[article_id].bookmarkCount += 1;
      }

      return acc;
    }, {} as Record<number, {likeCount: number; bookmarkCount: number}>);

    // Step 4: Fetch user-specific interactions (likes/bookmarks) and rename to avoid conflict
    const {data: userSpecificInteractions, error: userInteractionsError} =
      await supabase
        .from('article_interactions')
        .select('article_id, action_type')
        .eq('user_id', userId);

    if (userInteractionsError) {
      throw new Error(
        `Error fetching user interactions: ${userInteractionsError.message}`,
      );
    }

    // Step 5: Enrich each article with interaction counts and user-specific actions
    const enrichedArticles = articles.map(article => {
      const interactionCount = interactionCounts[article.id] || {
        likeCount: 0,
        bookmarkCount: 0,
      };

      const userLiked = userSpecificInteractions.some(
        interaction =>
          interaction.article_id === article.id &&
          interaction.action_type === 'like',
      );

      const userBookmarked = userSpecificInteractions.some(
        interaction =>
          interaction.article_id === article.id &&
          interaction.action_type === 'bookmark',
      );

      return {
        ...article,
        totalLikeCount: interactionCount.likeCount, // Total likes for the article
        totalBookmarkCount: interactionCount.bookmarkCount, // Total bookmarks for the article
        userLiked, // Whether the current user liked the article
        userBookmarked, // Whether the current user bookmarked the article
      };
    });

    return {
      data: enrichedArticles,
      count: totalCount,
    };
  } catch (error) {
    handleError(error, 'Failed to fetch feed data. Please try again later.');
    return {
      data: [],
      count: 0,
    };
  }
};

interface ToggleInteractionParams {
  userId: string;
  articleId: number;
  actionType: 'like' | 'bookmark';
}

export const toggleArticleInteraction = async ({
  userId,
  articleId,
  actionType,
}: ToggleInteractionParams) => {
  try {
    // Check if the interaction already exists
    const {data: existingInteraction, error: checkError} = await supabase
      .from('article_interactions')
      .select('*')
      .eq('user_id', userId)
      .eq('article_id', articleId)
      .eq('action_type', actionType)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is the code for "no rows found," which means no existing interaction
      throw new Error(`Error checking interaction: ${checkError.message}`);
    }

    if (existingInteraction) {
      // If interaction exists, remove it (user is unliking/removing bookmark)
      const {error: deleteError} = await supabase
        .from('article_interactions')
        .delete()
        .eq('id', existingInteraction.id); // Use the existing interaction's ID

      if (deleteError) {
        throw new Error(`Error removing interaction: ${deleteError.message}`);
      }

      return {message: `${actionType} removed`}; // Indicate the interaction was removed
    } else {
      // If interaction doesn't exist, insert it (user is liking/adding bookmark)
      const {error: insertError} = await supabase
        .from('article_interactions')
        .insert([
          {user_id: userId, article_id: articleId, action_type: actionType},
        ]);

      if (insertError) {
        throw new Error(`Error adding interaction: ${insertError.message}`);
      }

      return {message: `${actionType} added`}; // Indicate the interaction was added
    }
  } catch (error) {
    handleError(error, 'Failed to fetch feed data. Please try again later.');
    throw new Error('Error');
  }
};
