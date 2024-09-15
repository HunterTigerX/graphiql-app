'use client';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button, Input, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertMessage, updateHeaders } from '@/reducers/actions/actions';
import { IState, IHeaders } from '@/interfaces/interfaces';
import { enLanguage, ruLanguage } from '@/languages/languages';

export default function HeadersBlock() {
  const dispatch = useDispatch<AppDispatch>();
  const [headersVisible, showHeaders] = useState(true);
  const [enabledEditButtons, setEditButtons] = useState<number[]>([]);
  const [newHeaderKey, setNewHeaderKey] = useState<string>('');
  const [newHeaderValue, setNewHeaderValue] = useState<string>('');
  const errorMessage = useSelector((state: IState) => state.main.error);
  const languageData = localStorage.getItem('language_data') === 'ru' ? ruLanguage : enLanguage;
  const headersStringified = useSelector((state: IState) => state.main.headersKeys);
  const headers: IHeaders[] = headersStringified !== '' ? JSON.parse(headersStringified) : [{ key: '', value: '' }];
  const endpointUrlInput = useSelector((state: IState) => state.main.endpointUrlInput);
  const query = useSelector((state: IState) => state.main.queryInput);
  const variables = useSelector((state: IState) => state.main.variablesInput);

  const showAlert = (error: string) => {
    dispatch(setAlertMessage(error));
    if (errorMessage === '') {
      setTimeout(() => {
        dispatch(setAlertMessage(''));
      }, 3000);
    }
  };

  const changeUrlOnBlur = async (newHeaders: IHeaders[]) => {
    dispatch(updateHeaders(newHeaders));
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(endpointUrlInput, newHeaders, query, variables);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
  };

  const removeHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    dispatch(updateHeaders(newHeaders));
    changeUrlOnBlur(newHeaders);
  };

  const handleHeaderChange = (index: number, field: string, value: string) => {
    const newHeaders = [...headers];
    const keyValueFromArray = newHeaders[index];
    if (field === 'key') {
      keyValueFromArray.key = value;
    } else {
      keyValueFromArray.value = value;
    }
    dispatch(updateHeaders(newHeaders));
  };

  const clearHeaderInput = () => {
    setNewHeaderValue('');
    setNewHeaderKey('');
  };

  const changeHeader = (index: number) => {
    if (headers[index].key === '') {
      showAlert('Headers key input is missing a value');
    } else if (headers[index].value === '') {
      showAlert('Headers value input is missing a value');
    } else {
      const filtered = [...enabledEditButtons].filter((item) => item !== index);
      setEditButtons(filtered);
      changeUrlOnBlur(headers);
    }
  };

  const editHeader = (index: number) => {
    const newArray = [...enabledEditButtons];
    newArray.push(index);
    setEditButtons(newArray);
  };

  const addHeader = () => {
    if (newHeaderKey && newHeaderValue) {
      const newHeaders = [...headers, { key: newHeaderKey, value: newHeaderValue }];
      dispatch(updateHeaders(newHeaders));
      clearHeaderInput();
      changeUrlOnBlur(newHeaders);
    } else {
      if (!newHeaderKey) {
        showAlert('Headers key input is missing a value');
      }
      if (!newHeaderValue) {
        showAlert('Headers value input is missing a value');
      }
    }
  };

  const toggleHeaders = () => {
    showHeaders(!headersVisible);
  };

  return (
    <>
      <div className="headers-wrapper">
        <div className="graphiql-input-wrapper">
          <Typography variant="h6" component="h3" className="h3-width" fontWeight={600}>
            {languageData.headersHeader}
            <Button onClick={toggleHeaders} variant="outlined" size="small" fullWidth>
              {!headersVisible && languageData.show}
              {headersVisible && languageData.hide}
            </Button>
          </Typography>
        </div>
        {headersVisible && (
          <div className="headers-wrapper-inner">
            <div className="headers-element">
              <div className={`header-inputs-wrapper  ${languageData.add !== 'Add' ? 'header-inputs-wrapper-ru' : ''}`}>
                <Input
                  className="header_keyvalue_entered"
                  type="text"
                  placeholder={languageData.headerKey}
                  value={newHeaderKey}
                  onChange={(e) => setNewHeaderKey(e.target.value)}
                />
                <Input
                  className="header_keyvalue_entered"
                  type="text"
                  placeholder={languageData.headerValue}
                  value={newHeaderValue}
                  onChange={(e) => setNewHeaderValue(e.target.value)}
                />
              </div>

              <div
                className={`header-buttons-wrapper  ${languageData.add !== 'Add' ? 'header-buttons-wrapper-ru' : ''}`}
              >
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  className={languageData.add === 'Add' ? 'header_button_left_en' : 'header_button_left_ru'}
                  onClick={addHeader}
                >
                  {languageData.add}
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  className={languageData.add === 'Add' ? 'header_button_right_en' : 'header_button_right_ru'}
                  onClick={clearHeaderInput}
                >
                  {languageData.clear}
                </Button>
              </div>
            </div>

            {headers.map((header, index) => {
              return (
                <div className="headers-element" key={`header-${index}`}>
                  <div
                    className={`header-inputs-wrapper  ${languageData.add !== 'Add' ? 'header-inputs-wrapper-ru' : ''}`}
                  >
                    <Input
                      className="header_keyvalue_entered"
                      type="text"
                      placeholder={languageData.headerKey}
                      value={header.key}
                      onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                      disabled={!enabledEditButtons.includes(index)}
                    />
                    <Input
                      className="header_keyvalue_entered"
                      type="text"
                      placeholder={languageData.headerValue}
                      value={header.value}
                      onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                      disabled={!enabledEditButtons.includes(index)}
                    />
                  </div>
                  <div
                    className={`header-buttons-wrapper  ${languageData.add !== 'Add' ? 'header-buttons-wrapper-ru' : ''}`}
                  >
                    {!enabledEditButtons.includes(index) && (
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        className={languageData.add === 'Add' ? 'header_button_left_en' : 'header_button_left_ru'}
                        onClick={() => editHeader(index)}
                      >
                        {languageData.edit}
                      </Button>
                    )}

                    {enabledEditButtons.includes(index) && (
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        className={languageData.add === 'Add' ? 'header_button_left_en' : 'header_button_left_ru'}
                        onClick={() => changeHeader(index)}
                      >
                        {languageData.change}
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      className={languageData.add === 'Add' ? 'header_button_right_en' : 'header_button_right_ru'}
                      onClick={() => removeHeader(index)}
                    >
                      {languageData.remove}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
