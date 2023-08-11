export const metadata = {
  title: 'Stats Page',
  description: 'Sponsored by Shelta!',
}

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main>{children}</main>
  )
}
