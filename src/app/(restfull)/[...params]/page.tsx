'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Stack, Box, CircularProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import { IState } from '@/interfaces/interfaces';
import { useSelector } from 'react-redux';
import MethodSelect from '@/components/restfull/MethodSelect';
import UrlInput from '@/components/restfull/UrlInput';
import HeadersManager from '@/components/restfull/HeadersManager';
import VariablesManager from '@/components/restfull/VariablesManager';
import RequestBodyEditor from '@/components/restfull/RequestBodyEditor';
import ResponseContainer from '@/components/restfull/ResponseContainer';
import { saveHistory } from '@/methods/saveHistoryData';
import { getPageRoute } from '@/methods/graphql/urlConverter';
import NotFound from '@/app/not-found';

export default function RestFull() {
  const [urlToSend, setUrlToSend] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [responseBody, setResponseBody] = useState<string>('');
  const [status, setStatus] = useState<number>();
  const [requestBody, setRequestBody] = useState<string>('');
  const [headers, setHeaders] = useState<Array<{ [key: string]: string }>>([]);
  const [variables, setVariables] = useState<Array<{ key: string; value: string }>>([]);
  const [loading, setLoading] = useState(false);
  const languageData = useSelector((state: IState) => state.main.languageData);
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
        router.push('/');
      }
      setInitialLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const path = window.location.pathname;
    const [method, encodedUrl, encodedBody] = path.split('/').slice(1);
    const queryString = window.location.search;

    if (method && encodedUrl) {
      let decodedUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');

      if (encodedBody) {
        const decodedBody = Buffer.from(encodedBody, 'base64').toString('utf-8');

        if (decodedBody.trim().startsWith('{')) {
          setRequestBody(decodedBody);
        } else {
          decodedUrl = `${decodedUrl}?${decodedBody}`;
          setRequestBody('');
        }
      } else {
        setRequestBody('');
      }

      setMethod(method);
      setUrlToSend(decodedUrl);

      const headersFromQuery = new URLSearchParams(queryString);
      const headersArray: Array<{ [key: string]: string }> = [];
      headersFromQuery.forEach((value, key) => {
        headersArray.push({
          key: decodeURIComponent(key),
          value: decodeURIComponent(value),
        });
      });
      setHeaders(headersArray);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'restfullState',
      JSON.stringify({
        urlToSend,
        method,
        requestBody,
        headers,
      })
    );
  }, [urlToSend, method, requestBody, headers]);

  useEffect(() => {
    updateUrl();
  }, [method, headers, urlToSend]);

  const updateUrl = () => {
    const currentPathBasic = getPageRoute(window.location.href);
    const currentPath = currentPathBasic.split('/')[1];
    const validMethods = ['restfull', 'GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];
    if (!validMethods.includes(currentPath)) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
      const encodedUrl = Buffer.from(urlToSend).toString('base64');
      const encodedBody = requestBody ? Buffer.from(requestBody).toString('base64') : '';
      const queryString = new URLSearchParams(
        headers.map(({ key, value }) => [key, encodeURIComponent(value)])
      ).toString();
      const newUrl = `/${method}${encodedUrl ? `/${encodedUrl}` : ''}${encodedBody ? `/${encodedBody}` : ''}${queryString ? `?${queryString}` : ''}`;
      setUrl(newUrl);
      window.history.replaceState({}, '', newUrl);
    }
  };

  const onChangeEndpointHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlToSend(e.target.value);
  };

  const onChangeRequestBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestBody(e.target.value);
  };

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fetchHeaders = new Headers();

      for (const [key, value] of Object.entries(headers)) {
        if (key.trim() && String(value).trim()) {
          fetchHeaders.append(key, String(value));
        }
      }

      const fetchOption: RequestInit = {
        method: method,
        headers: fetchHeaders,
      };

      if (method === 'POST' || method === 'PUT') {
        fetchHeaders.set('Content-Type', 'application/json');
        fetchOption.body = requestBody;

        const combinedBody = requestBody ? JSON.parse(requestBody) : {};
        variables.forEach(({ key, value }) => {
          combinedBody[key] = value;
        });

        fetchOption.body = JSON.stringify(combinedBody);
      }

      const response = await fetch(urlToSend, fetchOption);
      const status = response.status;
      setStatus(status);

      if (!response.ok && response.statusText) {
        if (response.status === 400) {
          const errorText = await response.text();
          setResponseBody(`HTTP Error ${status}: ${response.statusText}\n${errorText}`);
        } else {
          setResponseBody(`HTTP Error ${status}: ${response.statusText}`);
        }
        return;
      }

      if (method === 'HEAD') {
        const dataHeaders = Array.from(response.headers.entries());
        setResponseBody(dataHeaders.join(''));
        return;
      }

      if (method === 'OPTIONS') {
        const allowMethods = response.headers.get('Allow');

        if (allowMethods) {
          setResponseBody(`Allowed methods: ${allowMethods}`);
        } else {
          setResponseBody('No allowed methods provided by the server.');
        }

        return;
      }

      const contentType = response.headers.get('Content-Type' || '');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        setResponseBody(JSON.stringify(data, null, 2));
      } else {
        const text = await response.text();
        setResponseBody(`Response is not JSON\n\n${text}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResponseBody(`Error: ${error.message}`);
      }
    }
    if (urlToSend) {
      saveHistory(urlToSend, method, url);
    }

    setLoading(false);
  };

  if (initialLoading) {
    return <Loader />;
  }

  if (!loginStatus) {
    return <Loader />;
  }
  return (
    <>
      {isNotFound && <NotFound />}
      {!isNotFound && (
        <main className="main">
          <div className="container">
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} width={600}>
              <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
                {languageData.restfullClient}
              </Typography>
              <Stack direction="column" spacing={3} sx={{ width: '100%' }}>
                <Box
                  component="form"
                  sx={{ display: 'flex', width: '100%', gap: 2, justifyContent: 'space-between' }}
                  onSubmit={onSubmitHandler}
                >
                  <MethodSelect method={method} setMethod={setMethod} />
                  <UrlInput
                    urlToSend={urlToSend}
                    onChangeEndpointHandler={onChangeEndpointHandler}
                    languageData={languageData}
                  />
                  {loading && status !== 404 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  )}
                </Box>
                <HeadersManager headers={headers} setHeaders={setHeaders} languageData={languageData} />
                <VariablesManager variables={variables} setVariables={setVariables} languageData={languageData} />
                <RequestBodyEditor
                  requestBody={requestBody}
                  onChangeRequestBody={onChangeRequestBody}
                  updateUrl={updateUrl}
                  languageData={languageData}
                />
              </Stack>
              <ResponseContainer status={status} responseBody={responseBody} languageData={languageData} />
            </Stack>
          </div>
        </main>
      )}
    </>
  );
}
