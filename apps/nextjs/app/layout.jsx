import './styles.css'

export const metadata = {
  title: 'run_in_one · Next.js',
  description: 'Next.js starter app',
}

export default function RootLayout({ children }) {
  return <html lang="ko"><body>{children}</body></html>
}
