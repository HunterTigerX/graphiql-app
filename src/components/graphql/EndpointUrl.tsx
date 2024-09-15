'use client';
import { makeNewUrl, urlConverter } from '@/methods/graphql/urlConverter';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Input, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateEndpoint, updateSDL } from '@/reducers/actions/actions';
import { IState } from '@/interfaces/interfaces';

export default function EndpointUrlInput() {
  const dispatch = useDispatch<AppDispatch>();
  const endpointUrl = useSelector((state: IState) => state.main.endpointUrlInput);
  const headers = useSelector((state: IState) => state.main.headersKeys);
  const query = useSelector((state: IState) => state.main.queryInput);
  const variables = useSelector((state: IState) => state.main.variablesInput);
  const languageData = useSelector((state: IState) => state.main.languageData);
  const sdlUrl = useSelector((state: IState) => state.main.sdlUrlInput);

  const changeUrlOnBlur = async () => {
    const currentUrl = window.location.href;
    const convertedDataToUrl = urlConverter(endpointUrl, headers !== '' ? JSON.parse(headers) : '', query, variables);
    const newUrl = makeNewUrl(currentUrl, convertedDataToUrl);
    window.history.pushState({}, '', newUrl);
    if (sdlUrl === '' && endpointUrl !== '') {
      dispatch(updateSDL(`${endpointUrl}?sdl`));
    }
  };

  return (
    <>
      <div className="graphiql-input-wrapper">
        <Typography
          className={`${languageData.graphQlHeader === 'GraphiQL Client' ? 'url_graphql' : 'url_graphql-ru'} 'h3-width'`}
          variant="h6"
          component="h3"
          fontWeight={600}
        >
          {languageData.endpointUrlHeader}
        </Typography>
        <Input
          type="text"
          className="graphiql-input"
          value={endpointUrl}
          onChange={(e) => {
            dispatch(updateEndpoint(e.target.value));
          }}
          onBlur={changeUrlOnBlur}
        />
      </div>
    </>
  );
}
