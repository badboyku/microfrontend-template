import logger from 'utils/logger';
import './styles.css';

type Props = {};

const HelloWorld = (_props: Props) => {
  logger.debug('microfrontend-template: components/HelloWorld called');

  return <div className="hello-world">Hello World!</div>;
};

export default HelloWorld;
