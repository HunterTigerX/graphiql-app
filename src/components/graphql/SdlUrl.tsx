'use client';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Input, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSDL } from '@/reducers/actions/actions';
import { IResults, IState } from '@/interfaces/interfaces';
import { dataFromUrl } from '@/methods/graphql/urlConverter';
import { useEffect } from 'react';

export default function SDLUrlInput() {
  const dispatch = useDispatch<AppDispatch>();
  const sdlUrl = useSelector((state: IState) => state.main.sdlUrlInput);
  const languageData = useSelector((state: IState) => state.main.languageData);

  useEffect(() => {
    const currentUrl = window.location.href;
    const partialData: IResults | boolean = dataFromUrl(currentUrl);
    if (partialData && partialData.endpointUrl !== '') {
      dispatch(updateSDL(`${partialData.endpointUrl}?sdl`));
    } else {
      dispatch(updateSDL(``));
    }
  }, []);

  return (
    <>
      <div className="graphiql-input-wrapper">
        <Typography
          variant="h6"
          component="h3"
          className={`${languageData.graphQlHeader === 'GraphiQL Client' ? 'url_graphql' : 'url_graphql-ru'} 'h3-width'`}
          fontWeight={600}
        >
          {languageData.sdlUrlHeader}
        </Typography>
        <Input
          type="text"
          value={sdlUrl}
          className="graphiql-input"
          onChange={(e) => {
            dispatch(updateSDL(e.target.value));
          }}
        />
      </div>
    </>
  );
}
