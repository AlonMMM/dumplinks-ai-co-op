import React from 'react';

export const GhostIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 92C72.0914 92 90 74.0914 90 52C90 29.9086 72.0914 12 50 12C27.9086 12 10 29.9086 10 52C10 74.0914 27.9086 92 50 92Z" fill="#1F2937" fillOpacity="0.5"/>
    <path d="M50 18C35 18 26 30 26 46V68C26 70 28 72 30 70L34 66L38 70L42 66L46 70L50 66L54 70L58 66L62 70L66 66L70 70C72 72 74 70 74 68V46C74 30 65 18 50 18Z" fill="#F3F4F6"/>
    <circle cx="42" cy="42" r="3" fill="#111827"/>
    <circle cx="58" cy="42" r="3" fill="#111827"/>
    <path d="M46 50C46 50 48 52 50 52C52 52 54 50 54 50" stroke="#111827" strokeWidth="2" strokeLinecap="round"/>
    <path d="M66 40L76 32" stroke="#F3F4F6" strokeWidth="4" strokeLinecap="round"/>
    <path d="M34 40L24 32" stroke="#F3F4F6" strokeWidth="4" strokeLinecap="round"/>
    <rect x="68" y="24" width="16" height="12" rx="2" transform="rotate(15 68 24)" fill="#8B5CF6"/>
    <path d="M70 26L82 29" stroke="white" strokeWidth="2" transform="rotate(15 68 24)"/>
  </svg>
);