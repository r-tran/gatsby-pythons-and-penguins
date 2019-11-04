import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStaticQuery, graphql } from "gatsby"

const Icon = ({ href, icon, ariaLabel, }) => (
  <a
    href={href}
    aria-label={ariaLabel}
  >
    <span className="fa-layers fa-fw fa-2x">
      <FontAwesomeIcon icon={icon} />
    </span>
  </a>
);

const SocialLinks = () => {
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
          ariaLabel={"The twitter account link"}
        />
        <Icon
          href={`https://github.com/${social.github}`}
          icon={['fab', 'github']}
          ariaLabel={"The github account link"}
        />
        <Icon
          href={`https://dev.to/${social.dev}`}
          icon={['fab', 'dev']}
          ariaLabel={"The dev account link"}
        />
        <Icon
          href={`https://www.linkedin.com/in/${social.linkedin}/`}
          icon={['fab', 'linkedin']}
          ariaLabel={"The linkedin account link"}
        />
        <Icon 
          href={`mailto:${social.email}`} 
          icon={['fas', 'envelope']} 
          ariaLabel={"The email address to contact"}/>
      </div>
  )
}

export default SocialLinks