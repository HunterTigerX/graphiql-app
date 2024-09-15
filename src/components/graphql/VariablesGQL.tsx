'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { updateVariables } from '@/reducers/actions/actions';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Button, Typography } from '@mui/material';
import { IState } from '@/interfaces/interfaces';

export default function VariablesBlock() {
  const dispatch = useDispatch<AppDispatch>();
  const [variablesVisible, showVariables] = useState(true);
  const query = useSelector((state: IState) => state.main.queryInput);
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const variables = useSelector((state: IState) => state.main.variablesInput);
  const searchResults = useSelector((state: IState) => state.main.searchResults);
  const languageData = useSelector((state: IState) => state.main.languageData);

  const changeUrlOnBlur = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(endpointUrl, headers !== '' ? JSON.parse(headers) : '', query, variables);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
  };

  const toggleVariables = () => {
    showVariables(!variablesVisible);
  };

  return (
    <div className="variables_wrapper_outer">
      <div className="variables-wrapper">
        <Typography variant="h6" component="h3" className="h3-width" fontWeight={600}>
          {languageData.variablesHeader}
          <Button variant="outlined" size="small" onClick={toggleVariables}>
            {!variablesVisible && languageData.show}
            {variablesVisible && languageData.hide}
          </Button>
        </Typography>
      </div>

      <>
        {variablesVisible && (
          <textarea
            className={`textarea textarea-variables ${searchResults.result ? 'textarea_borders_none' : ''}`}
            value={variables}
            onChange={(e) => {
              dispatch(updateVariables(e.target.value));
            }}
            onBlur={changeUrlOnBlur}
            rows={5}
          />
        )}{' '}
      </>
    </div>
  );
}
