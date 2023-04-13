import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import ThemeSwitcher from '@components/ui/ThemeSwitcher'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="flex flex-col items-center justify-between pt-6 pb-10 space-y-4 text-sm md:flex-row text-accent-6">
          <div>
            <span>&copy; {new Date().getFullYear()} Rox Arts Print Shop, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center text-sm text-primary">
            <span className="text-primary">Created by</span>
            <a
              rel="noopener noreferrer"
              href="https://cyprian.topiax.xyz"
              aria-label="Vercel.com Link"
              target="_blank"
              className="ml-1 font-bold text-primary"
            >
              Cyprian Aarons
            </a>
          </div>
        </div>
      </Container>
    </footer >
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
