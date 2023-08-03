import Link from 'next/link'

export function Header() {
  return (
    <header className="flex flex-row items-center justify-between min-w-min h-16 p-8 bg-neutral-900 text-white">
      <strong className="text-2xl">
        Útil<b className="text-violet-500">.</b>
      </strong>

      <nav className="flex flex-row gap-4">
        <Link href="/">Imagens</Link>
        <Link href="/">Conversor</Link>
      </nav>
    </header>
  )
}
