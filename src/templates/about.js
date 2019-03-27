import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Bio from '../components/Bio'
import { Link, graphql } from 'gatsby'

class AboutPageTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    return (
      <Layout location={this.props.location}>
        <SEO title="About" />
        <Link to="/">
          <h1>Techy Novice</h1>
        </Link>
        <Bio />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Layout>
    )
  }
}

export default AboutPageTemplate

export const pageQuery = graphql`
  query AboutPage($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`
