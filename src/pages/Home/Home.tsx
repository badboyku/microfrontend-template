import * as React from 'react';
import HelloWorld from '../../components/HelloWorld';
import logoUrl, {ReactComponent as Logo} from './logo.svg';
import './style.scss';
import './styles.css';

type Props = {};

const Home = (_props: Props): JSX.Element => {
  return (
    <div>
      <h1>Home</h1>
      <HelloWorld />
      <img src={logoUrl} className="logo" alt="logo" />
      <Logo width={40} />
    </div>
  );
};

export default Home;
