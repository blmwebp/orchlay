import React from 'react'

const paths = {
  arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  arrowUp: <><path d="M7 17 17 7"/><path d="M8 7h9v9"/></>,
  chevron: <path d="m6 9 6 6 6-6"/>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close: <><path d="M5 5l14 14M19 5 5 19"/></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></>,
  windows: <><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></>,
  chart: <><path d="M3 21h18M5 17V9m7 8V4m7 13v-6"/><path d="m4 8 7-5 8 6"/></>,
  code: <><path d="m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14"/></>,
  support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="12" width="4" height="7" rx="2"/><rect x="18" y="12" width="4" height="7" rx="2"/><path d="M20 18v1a3 3 0 0 1-3 3h-4"/></>,
  globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></>,
  sparkle: <><path d="m12 2 2.1 6.9L21 11l-6.9 2.1L12 20l-2.1-6.9L3 11l6.9-2.1L12 2Z"/></>,
phone: (
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2
    19.79 19.79 0 0 1-8.63-3.07
    19.5 19.5 0 0 1-6-6
    19.79 19.79 0 0 1-3.07-8.67
    A2 2 0 0 1 4.11 2h3
    a2 2 0 0 1 2 1.72
    c.12.96.34 1.9.66 2.79
    a2 2 0 0 1-.45 2.11L8.09 9.91
    a16 16 0 0 0 6 6l1.27-1.23
    a2 2 0 0 1 2.11-.45
    c.89.32 1.83.54 2.79.66
    A2 2 0 0 1 22 16.92z" />
),
}

export default function Icon({ name, size = 24, strokeWidth = 1.8, className = '' }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.sparkle}
    </svg>
  )
}
