import React from 'react';

export const AnaLogoMark: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 56,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="30.5" stroke="currentColor" strokeWidth="1" />
    <text
      x="50%"
      y="55%"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="Cormorant Garamond, serif"
      fontSize="18"
      fontStyle="italic"
      letterSpacing="2"
    >
      ANA
    </text>
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.11 4.91A9.82 9.82 0 0012.05 2C6.6 2 2.17 6.43 2.17 11.88c0 1.74.46 3.44 1.32 4.93L2.1 22l5.32-1.39a9.86 9.86 0 004.63 1.18h.01c5.45 0 9.88-4.43 9.88-9.88 0-2.64-1.03-5.12-2.83-7zM12.06 20.1h-.01a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.16.83.84-3.08-.2-.32a8.2 8.2 0 01-1.25-4.33c0-4.53 3.69-8.22 8.22-8.22a8.16 8.16 0 015.81 2.41 8.16 8.16 0 012.41 5.81c0 4.53-3.69 8.22-8.22 8.22zm4.5-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.17.25-.64.8-.79.97-.14.17-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.37 1 2.54.12.17 1.73 2.65 4.2 3.71.59.25 1.04.4 1.4.51.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.14-1.17-.06-.1-.23-.16-.48-.28z" />
  </svg>
);

export const ArrowRight: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

export const Sparkle: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2l1.6 4.8L18 8.4l-4.4 1.6L12 14.8l-1.6-4.8L6 8.4l4.4-1.6L12 2zm7 11l.8 2.4L22 16.2l-2.2.8L19 19.4l-.8-2.4L16 16.2l2.2-.8L19 13zM5 14l.6 1.8L7.4 16.4l-1.8.6L5 18.8l-.6-1.8L2.6 16.4l1.8-.6L5 14z" />
  </svg>
);
