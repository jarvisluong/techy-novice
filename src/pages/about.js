import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Bio from '../components/Bio'
import { Link } from 'gatsby'

class AboutPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="About" />
        <Link to="/">
          <h1>Techy Novice</h1>
        </Link>
        <Bio />
      </Layout>
    )
  }
}

export default AboutPage
