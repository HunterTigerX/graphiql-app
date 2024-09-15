import { IState } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

export default function DocumentationGQL() {
  const document = useSelector((state: IState) => state.main.documentation);
  const languageData = useSelector((state: IState) => state.main.languageData);
  return (
    <>
      {document && (
        <>
          <div className={`graphiql-block graphiql-block-response ${document ? 'graphiql_25' : ''}`}>
            <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
              {languageData.documentationHeader}
            </Typography>
            {document && <pre className="documentation_wrapper">{document}</pre>}
          </div>
        </>
      )}
    </>
  );
}
