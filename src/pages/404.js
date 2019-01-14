import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { Link } from 'gatsby'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="404: Not Found" />
        <h1>Not Found</h1>
        <p>
          Hey, the link you request does not exist... Maybe you can visit the{' '}
          <Link to="/">home page</Link> and see if you can find what you want?
          :)
        </p>
      </Layout>
    )
  }
}

export default NotFoundPage
