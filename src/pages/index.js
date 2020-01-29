import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import style from "./home-css-modules.module.css"
import SocialLinks from "../components/social"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout title={siteTitle}>
        <SEO title="Home" />
        <div id="home-center" className={style.content}>
          <h1 id="home-title"> Ray Tran </h1>
          <p id="home-subtitle">☁️ Tinkering with all things DevOps and distributed systems ☁️</p>
          <SocialLinks/>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
