'use client';
import { IState } from '@/interfaces/interfaces';
import JsonViewer from '@/methods/graphql/jsonViewer';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

export default function ResponseGQL() {
  const searchResults = useSelector((state: IState) => state.main.searchResults);
  const message = searchResults.result;
  const code = searchResults.code;
  const from = searchResults.from;
  const document = useSelector((state: IState) => state.main.documentation);
  const languageData = useSelector((state: IState) => state.main.languageData);

  return (
    <>
      <div className={`graphiql-block-response graphiql-block ${document ? 'graphiql_25' : ''}`}>
        <div className="response-wrapper">
          <Typography variant="h5" component="h2" className="h2" fontWeight={600}>
            {languageData.responseHeader}
          </Typography>
          <div className={code !== 0 ? 'response-data-filled response-data' : 'response-data'}>
            <Typography variant="h6" component="p" fontWeight={600}>
              {languageData.status}: {code === 0 ? '' : code}
            </Typography>
            {code === 200 && message && (
              <>
                <Typography variant="subtitle1" component="div" fontWeight={600}>
                  {languageData.body}:{' '}
                </Typography>
                <Typography variant="subtitle2" component="div" className="response-result">
                  {from ? JsonViewer(JSON.parse(message) as object) : JSON.parse(message)}
                </Typography>
              </>
            )}
            {code !== 200 && code !== 0 && (
              <Typography variant="h6" component="p" fontWeight={600}>
                {languageData.body}: <span>{message as string}</span>
              </Typography>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
