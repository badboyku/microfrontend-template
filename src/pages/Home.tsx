import * as React from 'react';
import HelloWorld from '../components/HelloWorld';

type Props = {};

const Home: React.FC<Props> = (_props) => {
  return (
    <div>
      <HelloWorld />
    </div>
  );
};

export default Home;
