import HelloWorld from 'components/HelloWorld';
import logger from 'utils/logger';
import logoUrl, { ReactComponent as Logo } from './logo.svg';
import './style.scss';
import './styles.css';

const Home = () => {
  logger.debug('microfrontend-template: pages/Home called');
  const envVars = window.__RUNTIME_CONFIG__ || /* istanbul ignore next */ {};

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
        <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
          <div className="envVarName">SETTINGS_CODE:</div>
          <div className="envVarValue">{SETTINGS_CODE.toString()}</div>
        </div>
      </div>

      <h3>Runtime Env Vars:</h3>
      <div className="envVarsContainer">
        {Object.entries(envVars).map(([name, value]) => {
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
