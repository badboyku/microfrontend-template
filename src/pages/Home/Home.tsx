import HelloWorld from 'components/HelloWorld';
import logger from 'utils/logger';
import logoUrl, { ReactComponent as Logo } from './logo.svg';
import './style.scss';
import './styles.css';

type Props = {};

const Home = (_props: Props) => {
  logger.debug('microfrontend-template: pages/Home called');

  return (
    <div>
      <h1>Home</h1>
      <HelloWorld />
      <img src={logoUrl} className="logo" alt="logo" />
      <Logo width={40} />

      <h3>Build Time Env Vars:</h3>
      <div className="envVarsContainer">
        <div className="envVar">
          <div className="envVarName">IS_DEV:</div>
          <div className="envVarValue">{IS_DEV.toString()}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <div className="envVarName">IS_PROD:</div>
          <div className="envVarValue">{IS_PROD.toString()}</div>
        </div>
      </div>

      <h3>Runtime Env Vars:</h3>
      <div className="envVarsContainer">
        {Object.entries(window.__RUNTIME_CONFIG__).map(([name, value]) => {
          return (
            <div key={name} className="envVar">
              <div className="envVarName">{`${name}:`}</div>
              <div className="envVarValue">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
