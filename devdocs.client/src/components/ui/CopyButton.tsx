// src/components/ui/CopyButton.tsx
import React from 'react';
import { Copy, Check } from 'react-feather';
import { useCopy } from '../../hooks/use-copy';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: number;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = '',
  size = 16
}) => {
  const { copy, isCopied } = useCopy();

  const handleCopy = () => {
    copy(text);
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-button ${isCopied ? 'copied' : ''} ${className}`}
      title={isCopied ? 'Copiado!' : 'Copiar código'}
      aria-label={isCopied ? 'Código copiado' : 'Copiar código'}
    >
      {isCopied ? <Check size={size} /> : <Copy size={size} />}
    </button>
  );
};
