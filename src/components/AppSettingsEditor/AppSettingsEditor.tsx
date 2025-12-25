import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useRevalidator } from 'react-router';
import logger from 'utils/logger';
import settings from 'utils/settings';
import type { AppSettings } from '@types';
import type { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent } from 'react';
import './styles.css';

const fields: { name: keyof AppSettings; label: string; help?: string }[] = [{ name: 'token', label: 'Token' }];

const AppSettingsEditor = () => {
  logger.debug('microfrontend-template: components/AppSettingsEditor called');
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMouseLeftButtonDown, setIsMouseLeftButtonDown] = useState(false);
  const [keys, setKeys] = useState('');
  const [settingsState, setSettingsState] = useState<AppSettings>(settings.getSettings());

  const { token } = settingsState;

  useEffect(() => {
    /* istanbul ignore next */
    if (keys === SETTINGS_CODE) {
      setIsModalOpen(true);
    }
  }, [keys]);

  // Handle container events.
  /* istanbul ignore next */
  const containerHandleOnKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      setIsModalOpen(false);
    }
  }, []);
  /* istanbul ignore next */
  const containerHandleOnMouseDown = useCallback((event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const element = event.target as HTMLDivElement;
    if (element?.getAttribute('role') === 'presentation') {
      setIsModalOpen(false);
    }
  }, []);

  // Handle close button events.
  /* istanbul ignore next */
  const closeButtonHandleOnKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if ([' ', 'Enter', 'Escape'].includes(event.key)) {
      setIsModalOpen(false);
    }
  }, []);
  /* istanbul ignore next */
  const closeButtonHandleOnMouseDown = useCallback((event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setIsModalOpen(false);
  }, []);

  // Handle form events.
  /* istanbul ignore next */
  const formHandleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newSettings = {
        ...(settings.token !== token ? { auth: { isAuthorized: false, authorizedDateTime: undefined }, token } : {}),
      };
      settings.updateSettings(newSettings, true);
      setIsModalOpen(false);

      const searchParams = new URLSearchParams(search);
      const params = searchParams.toString();
      const queryParams = params ? `?${params}` : '';
      navigate(`${pathname}${queryParams}`);

      revalidate();
    },
    [token, search, navigate, pathname, revalidate],
  );
  /* istanbul ignore next */
  const formInputHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettingsState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  // Handle settings button events.
  /* istanbul ignore next */
  const settingsButtonHandleOnKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (isMouseLeftButtonDown && !isModalOpen) {
        setKeys(`${keys}${event.key}`);
      }
    },
    [isMouseLeftButtonDown, isModalOpen, keys],
  );
  /* istanbul ignore next */
  const settingsButtonHandleOnMouseDown = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (!isModalOpen && event.button === 0) {
        setIsMouseLeftButtonDown(true);
      }
    },
    [isModalOpen],
  );
  /* istanbul ignore next */
  const settingsButtonHandleOnMouseUp = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsMouseLeftButtonDown(false);
    setKeys('');
  }, []);

  /* istanbul ignore next */
  if (isModalOpen) {
    return (
      <div
        role="presentation"
        className="settings-container"
        onKeyDown={containerHandleOnKeyDown}
        onMouseDown={containerHandleOnMouseDown}
      >
        <div className="settings-modal">
          <div className="settings-modal-header-row">
            <div className="settings-modal-header">
              <div className="settings-modal-title">App Settings (microfrontend-template)</div>
            </div>
            <div className="settings-modal-header-close">
              <span
                role="button"
                className="settings-modal-header-close-button"
                onKeyDown={closeButtonHandleOnKeyDown}
                onMouseDown={closeButtonHandleOnMouseDown}
                tabIndex={0}
              >
                &#9746;
              </span>
            </div>
          </div>
          <form autoComplete="off" onSubmit={formHandleSubmit}>
            {fields.map(({ name, label, help }) => {
              const value = settingsState[name];

              return (
                <div key={name}>
                  <label htmlFor={name}>
                    <div className="settings-form-field-row">
                      <div className="settings-form-field-label">{label}:</div>
                      <div className="settings-form-field-input">
                        <input
                          className="settings-form-field-input-box"
                          type="text"
                          id={name}
                          name={name}
                          value={typeof value === 'string' || typeof value === 'boolean' ? value.toString() : ''}
                          onChange={formInputHandleChange}
                        />
                        {help && <span className="settings-form-field-help">{help}</span>}
                      </div>
                    </div>
                  </label>
                </div>
              );
            })}
            <div className="settings-form-button-row">
              <div>
                <input className="settings-form-button" type="submit" value="Save" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <button
      id="settings-button"
      className="settings-button"
      type="button"
      aria-hidden
      onKeyDown={settingsButtonHandleOnKeyDown}
      onMouseDown={settingsButtonHandleOnMouseDown}
      onMouseUp={settingsButtonHandleOnMouseUp}
      tabIndex={0}
    />
  );
};

export default AppSettingsEditor;
