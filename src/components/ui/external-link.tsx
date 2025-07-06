import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
}

export function ExternalLink({ href, children, className = '', showIcon = true }: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-1 
        text-blue-600 hover:text-blue-700 hover:underline 
        dark:text-blue-400 dark:hover:text-blue-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
        dark:focus:ring-offset-gray-900 
        rounded-sm
        ${className}
      `}
    >
      {children}
      {showIcon && <ExternalLinkIcon className="w-3 h-3" />}
    </Link>
  )
}