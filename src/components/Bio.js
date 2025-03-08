import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Link to="/about" style={{ boxShadow: 'none' }}>
              <p>I build and share with passion.</p>
            </Link>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
      }
    }
  }
`

export default Bio
