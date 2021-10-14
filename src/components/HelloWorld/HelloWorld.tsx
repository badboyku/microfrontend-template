import * as React from 'react';
import './styles.css';

type Props = {};

const HelloWorld: React.FC<Props> = (_props) => {
  return <div className="hello-world">Hello World!</div>;
};

export default HelloWorld;
