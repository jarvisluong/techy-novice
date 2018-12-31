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
        href="https://mobile.twitter.com/jarvisluong"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>{' '}
      &bull;{' '}
      <a
        href="https://github.com/jarvisluong"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>{' '}
      &bull;{' '}
      <a
        href="https://www.linkedin.com/in/jarvisluong/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      &bull;{' '}
      <a
        href="mailto:contact@luongdanghai.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Email
      </a>
    </footer>
  )
}
