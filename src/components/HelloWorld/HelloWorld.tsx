import * as React from 'react';
import './styles.css';

export type Props = {};

const HelloWorld: React.FC<Props> = (_props: Props) => {
  return <div className="hello-world">Hello World!</div>;
};

export default HelloWorld;
