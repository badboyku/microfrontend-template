import logger from 'utils/logger';
import './styles.css';

const HelloWorld = () => {
  logger.debug('microfrontend-template: components/HelloWorld called');

  return <div className="hello-world">Hello World!</div>;
};

export default HelloWorld;
