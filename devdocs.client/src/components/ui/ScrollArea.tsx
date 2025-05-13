import React from 'react';
 
export function ScrollArea({ children }: { children: React.ReactNode }) {
  return <div style={{ overflowY: 'auto', maxHeight: '100%' }}>{children}</div>;
} 