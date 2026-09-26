import './styles.css'

export const metadata = {
  title: 'run_in_one · Next.js',
  description: '러닝 정보를 한곳에서 관리하는 올인원 서비스',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'run in one',
    description: '러닝 정보를 한곳에서 관리하는 올인원 서비스',
    images: ['/open-graph.jpg'],
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return <html lang="ko"><body>{children}</body></html>
}
