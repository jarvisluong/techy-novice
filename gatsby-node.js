const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Migrate from wordpress
  createRedirect({
    fromPath: '/2017/03/19/cach-gap-fork-mot-repository-tren-github/',
    toPath: '/cach-gap-fork-mot-repository-tren-github/',
    isPermanent: true,
    redirectInBrowser: true,
  })

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    const blogPostAmp = path.resolve(`./src/templates/blog-post.amp.js`)
    const tagTemplate = path.resolve('./src/templates/tag.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

        posts.forEach((post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })

          createPage({
            path: `/amp/${post.node.fields.slug}`,
            component: blogPostAmp,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        // Create tag pages
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })
        // Eliminate duplicate tags
        tags = Array.from(new Set(tags))

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            // Creating kebab case for tag link
            path: `/tags/${tag.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()}/`,
            component: tagTemplate,
            context: {
              tag,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
