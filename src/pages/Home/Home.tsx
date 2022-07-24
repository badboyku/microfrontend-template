import * as React from 'react';
import { HelloWorld } from '../../components';
import logoUrl, { ReactComponent as Logo } from './logo.svg';
import './style.scss';
import './styles.css';
import type { ReactAppEnvVars } from '../../@types/global';

export type Props = {};

const Home: React.FC<Props> = (_props: Props) => {
  /* istanbul ignore next */
  const { _env_: env = {} } = window;
  const { REACT_APP_MY_VAR: reactAppMyVar } = env as ReactAppEnvVars;

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
      <h4>Custom React App Env Vars</h4>
      <div>
        Buildtime: REACT_APP_MY_ENVVAR: <span style={{ fontWeight: 'bold' }}>{REACT_APP_MY_VAR}</span>
      </div>
      <div>
        Runtime: REACT_APP_MY_ENVVAR: <span style={{ fontWeight: 'bold' }}>{reactAppMyVar}</span>
      </div>
    </div>
  );
};

export default Home;
