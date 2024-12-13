import {ShareContent} from 'react-native';
import {Platform} from 'react-native';

// Define the share function with optional params for flexibility
export const globalShare = async ({
  message,
  url,
  title,
}: {
  message?: string;
  url?: string;
  title?: string;
}): Promise<void> => {
  try {
    // Ensure message is always a string (fallback to an empty string if undefined)
    const contentMessage = message || '';
    const contentUrl = url || '';

    // Prepare content based on platform
    const content: ShareContent = Platform.select({
      ios: {
        title: title || 'Share via',
        message: `${contentMessage}${contentUrl ? `\n${contentUrl}` : ''}`, // iOS combines message and url
      },
      android: {
        title: title || 'Share via',
        message: contentMessage, // Android handles message and URL separately
        url: contentUrl || undefined,
      },
      default: {
        title: title || 'Share via',
        message: contentMessage,
      },
    }) as ShareContent; // Type assertion since we're constructing content based on platform

    if (!content) {
      throw new Error('Sharing not supported on this platform');
    }
  } catch (error) {
    throw new Error('Failed to share content');
  }
};
