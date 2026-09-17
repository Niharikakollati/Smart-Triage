import React from 'react';
import { WebLayout } from './WebLayout';

export const AndroidFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <WebLayout>{children}</WebLayout>;
};

export { WebLayout };

