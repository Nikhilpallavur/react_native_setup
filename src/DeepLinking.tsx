import React from 'react';
import {useDeepLinking} from './hooks/deepLinking';

interface DeepLinkingProps {
  children: React.ReactNode;
}

export const DeepLinking: React.FC<DeepLinkingProps> = ({children}) => {
  useDeepLinking();

  return <>{children}</>;
};

export default DeepLinking;
