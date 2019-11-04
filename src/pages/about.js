import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

class AboutPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const node = data.allMarkdownRemark.edges[0].node
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="About" description={node.frontmatter.description}/>
        <article>
          <h1>{node.frontmatter.title}</h1>
          <section dangerouslySetInnerHTML={{ __html: node.html}}/>
        </article>
      </Layout> 
    )
  }
}

export default AboutPage 

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {title: {eq: "About"}}}, limit: 1) {
      edges {
        node {
          excerpt
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
` 
