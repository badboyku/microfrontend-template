import * as React from 'react';
import { HelloWorld } from '../../components';
import { getEnvVars } from '../../utils/envVars';
import logoUrl, { ReactComponent as Logo } from './logo.svg';
import './style.scss';
import './styles.css';

type Props = {};

const Home: React.FC<Props> = (_props: Props) => {
  const envVars = getEnvVars();
  const { IS_DEV, IS_PROD, PUBLIC_URL, REACT_APP_MY_ENVVAR } = envVars;

  return (
    <div>
      <h1>Home</h1>
      <HelloWorld />
      <img src={logoUrl} className="logo" alt="logo" />
      <Logo width={40} />
      <h3>Env Vars</h3>
      <div>
        IS_DEV: <span style={{ fontWeight: 'bold' }}>{IS_DEV.toString()}</span>
      </div>
      <div>
        IS_PROD: <span style={{ fontWeight: 'bold' }}>{IS_PROD.toString()}</span>
      </div>
      <div>
        PUBLIC_URL: <span style={{ fontWeight: 'bold' }}>{PUBLIC_URL}</span>
      </div>
      <div>
        REACT_APP_MY_ENVVAR: <span style={{ fontWeight: 'bold' }}>{REACT_APP_MY_ENVVAR}</span>
      </div>
    </div>
  );
};

export default Home;
