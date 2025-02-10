import { useCallback } from 'react';
import { useRouteError } from 'react-router-dom';

type Props = {};

const AppError = (_props: Props) => {
  const error = useRouteError();

  // TODO: Handle error!!!
  // eslint-disable-next-line no-console
  console.error(error);

  /* istanbul ignore next */
  const reloadWindow = useCallback(() => window.location.reload(), []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="error">We&apos;re sorry, but something went wrong</h1>
      <h3>You may go back, or click below to try again</h3>
      <button type="button" onClick={reloadWindow}>
        Retry
      </button>
    </div>
  );
};

export default AppError;
