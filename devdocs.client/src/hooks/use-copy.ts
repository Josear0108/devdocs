// src/hooks/use-copy.ts
import { useState, useCallback } from 'react';

export const useCopy = (timeout: number = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (!navigator.clipboard) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setIsCopied(true);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      } finally {
        document.body.removeChild(textArea);
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }

    setTimeout(() => setIsCopied(false), timeout);
  }, [timeout]);

  return { copy, isCopied };
};
