import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const installFontAwesome = () => {
  library.add(fab, faEnvelope)
};

export default installFontAwesome;