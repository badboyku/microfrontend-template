import * as React from 'react';
import logoUrl, {ReactComponent as Logo} from './logo.svg';
import './styles.css';

type Props = {};

const HelloWorld = (_props: Props): JSX.Element => {
  return (
    <div>
      <div className="hello-world">Hello World!!!</div>
      <img src={logoUrl} className="logo" alt="logo" />
      <Logo width={40} />
    </div>
  );
};

export default HelloWorld;
