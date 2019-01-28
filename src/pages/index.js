import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostsList'
import Button from '../components/Button'

const IndexPage = ({ data, location }) => (
  <Layout location={location}>
    <div>
      <p>
        This blog was a joy to build using <strong>Gatsby 💜</strong> (a React
        based static site generator) and is hosted on{' '}
        <strong>Netlify 🔥</strong>.
      </p>
      <PostList
        showChevron="yes"
        showImage="yes"
        showCategories="yes"
        showSearch="yes"
        posts={data.allMarkdownRemark.edges}
      />
    </div>
  </Layout>
)

export default IndexPage

export const HomePageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
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
