export const metadata = {
  title: 'WWTWM Game',
  description: 'Sponsored by Shelta!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main>{children}</main>
  )
}
