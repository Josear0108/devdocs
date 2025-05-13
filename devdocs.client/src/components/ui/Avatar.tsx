import React from 'react';

export function Avatar({ children }: { children: React.ReactNode }) {
  return <div className="avatar">{children}</div>;
}

export function AvatarImage({ src }: { src: string }) {
  return <img className="avatar-img" src={src} alt="avatar" />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="avatar-fallback">{children}</div>;
} 