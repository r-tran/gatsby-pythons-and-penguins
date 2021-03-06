import React from "react"
import { Link } from "gatsby"
import Toggle from './Toggle'
import { rhythm } from "../utils/typography"

class Layout extends React.Component {
  state = {
    theme: null,
  };
  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }
  render() {
    const { title, children } = this.props

    let header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )

    const ListLink = props => (
      <li style={{ 
        display: `inline-block`, 
        marginRight: `1rem` , 
        fontFamily: `100%/1.75 'Merriweather','Georgia',serif`, 
        fontWeight:`700`, 
        fontKerning: `normal`}}>
        <Link 
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
        }}
        to={props.to}>{props.children}</Link>
      </li>
    )

    return (
      <div
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--textNormal)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out', }}
      >
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>
            <ul style={{ 
              float: `right`,
              display: `flex`,
             }}>
              <ListLink to="/about/">About</ListLink>
              <ListLink to="/posts/">Blog</ListLink>
              {this.state.theme !== null ? (
                <Toggle
                  checked={this.state.theme === 'dark'}
                  onChange={e =>
                    window.__setPreferredTheme(
                      e.target.checked ? 'dark' : 'light'
                    )
                  }
                />
              ) : (
                <div style={{ height: '24px' }} />
              )}
            </ul>
            {header}
          </header>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
