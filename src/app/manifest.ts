import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zyndesk Jo',
    short_name: 'Zyndesk',
    description: 'AI, automation, software & training in Jordan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F9FC',
    theme_color: '#102A43',
    icons: [
      {
        src: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
    ],
  };
}
