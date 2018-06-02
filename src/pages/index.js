import React from 'react'
import PostList from '../components/PostsList'
import Link from 'gatsby-link'
import Button from '../components/Button'

const IndexPage = ({ data }) => (
  <div>
    <p>
      This blog was a joy to build using <strong>Gatsby 💜</strong> (a React
      based static site generator) and is hosted on <strong>Firebase 🔥</strong>.
    </p>
    <h4 style={{ marginTop: '2rem' }}>Last 5 recent posts:</h4>
    <PostList
      showChevron="yes"
      showImage="yes"
      showCategories="no"
      showSearch="no"
      posts={data.allMarkdownRemark.edges}
    />
    <Button style={{ fontSize: '1.2rem', marginRight: '1rem' }} to="/news/">
      All blog posts
    </Button>
  </div>
)

export default IndexPage

export const HomePageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 5
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 390)
          id
          timeToRead
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            path
            title
            author
            tags
            ogImage {
              publicURL
            }
          }
        }
      }
    }
  }
`
