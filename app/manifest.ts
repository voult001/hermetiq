import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VaultBnB Host - Earn $500/TB/year',
    short_name: 'VAULTBNB HOST',
    description: 'Rent your spare drive. Encrypted host dashboard.',
    start_url: '/host',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#00FFAB',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
