import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStaticQuery, graphql } from "gatsby"

const Icon = ({ href, icon }) => (
  <a
    href={href}
  >
    <span className="fa-layers fa-fw fa-2x">
      <FontAwesomeIcon icon={icon} />
    </span>
  </a>
);

const SocialLinks= () => {
    const data = useStaticQuery(graphql`
      query {
        site {
          siteMetadata {
            author
            social {
              twitter
              github
              dev
              linkedin
              email
            }
          }
        }
      }
    `)
    const social = data.site.siteMetadata.social
    return (
      <div>
        <Icon
          href={`https://twitter.com/${social.twitter}`}
          icon={['fab', 'twitter']}
        />
        <Icon
          href={`https://github.com/${social.github}`}
          icon={['fab', 'github']}
        />
        <Icon
          href={`https://dev.to/${social.dev}`}
          icon={['fab', 'dev']}
        />
        <Icon
          href={`https://www.linkedin.com/in/${social.linkedin}/`}
          icon={['fab', 'linkedin']}
        />
        <Icon href={`mailto:${social.email}`} icon={['fas', 'envelope']} />
      </div>
  )
}

export default SocialLinks