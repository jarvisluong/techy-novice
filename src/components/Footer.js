import React from 'react'

import { rhythm } from '../utils/typography'

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
      }}
    >
      <a
        href="mailto:techynovice.amulet273@passmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Email
      </a>
    </footer>
  )
}
