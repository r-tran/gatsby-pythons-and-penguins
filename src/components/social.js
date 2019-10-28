import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    return (
      <div>
        <Icon
          href={`https://twitter.com/r8tran`}
          icon={['fab', 'twitter']}
        />
        <Icon
          href={`https://github.com/r-tran`}
          icon={['fab', 'github']}
        />
        <Icon
          href={`https://dev.to/rtran`}
          icon={['fab', 'dev']}
        />
        <Icon
          href={`https://www.linkedin.com/in/r-tran-021/`}
          icon={['fab', 'linkedin']}
        />
        <Icon href={`mailto:rayt579@yahoo.com`} icon={['fas', 'envelope']} />
      </div>
  )
}

export default SocialLinks