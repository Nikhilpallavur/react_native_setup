// utils/errorHandler.ts

import {showToast} from '../toast';

// Adjust the import path based on your project structure

export const handleError = (error: unknown, customMessage?: string) => {
  let message = 'An unexpected error occurred'; // Default message

  if (error instanceof Error) {
    // If error is an instance of Error, use its message
    message = error.message;
  } else if (typeof error === 'string') {
    // If error is a string, use it directly
    message = error;
  }

  if (customMessage) {
    // Prepend or append the custom message if provided
    message = `${customMessage}: ${message}`;
  }

  showToast({type: 'error', text1: message});
};
