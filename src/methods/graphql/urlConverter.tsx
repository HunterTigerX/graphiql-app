import { IHeaders, IResults } from '@/interfaces/interfaces';
import { Base64 } from 'js-base64';

export function urlConverter(endpointUrl: string, headers: IHeaders[], query: string, variables: string | object) {
  Base64.extendString();
  let resultUrl = '';
  if (endpointUrl) {
    try {
      resultUrl += Base64.btoa(endpointUrl);
    } catch {
      resultUrl += Base64.encode(endpointUrl);
    }
  }
  if (variables || query) {
    const body = {
      query,
      variables,
    };
    if (endpointUrl) {
      resultUrl += '/';
    }
    try {
      resultUrl += Base64.btoa(JSON.stringify(body));
    } catch {
      resultUrl += Base64.encode(JSON.stringify(body));
    }
  }
  if (headers) {
    const headersList = [];
    for (let i = 0; i < headers.length; i += 1) {
      headersList.push(`${headers[i].key.replaceAll(/\//gi, '%2F')}=${headers[i].value.replaceAll(/\//gi, '%2F')}`);
    }
    const headersResult = headersList.join('&');
    resultUrl += `?${headersResult}`;
  }

  return resultUrl;
}

export function dataFromUrl(data: string) {
  const dataSplitted = data.split('/');

  const encodedData = dataSplitted.slice(4, dataSplitted.length);
  const results: IResults = {
    headers: [],
    query: '',
    endpointUrl: '',
    variables: '',
  };

  for (let i = 0; i < encodedData.length; i += 1) {
    if (encodedData[i].includes('?')) {
      // this is header
      const bodyAndHeadersCodes = encodedData[i].split('?');
      const headersCoded = bodyAndHeadersCodes[1];
      const headersCodedMerged = headersCoded.replaceAll(/%2F/gi, '/');
      const headersCodedArray = headersCodedMerged.split('&');
      const headersObjArray: IHeaders[] = [];
      for (let i = 0; i < headersCodedArray.length; i += 1) {
        const values = headersCodedArray[i].split('=');
        headersObjArray.push({
          key: values[0],
          value: values[1],
        });
      }
      results.headers = headersObjArray;
      const bodyEncoded = Base64.decode(bodyAndHeadersCodes[0]);
      try {
        const isBody = JSON.parse(bodyEncoded);
        // Это был Body
        results.query = isBody.query;
        results.variables = typeof isBody.variables === 'string' ? isBody.variables : JSON.stringify(isBody.variables);
      } catch {
        // Ошибочные данные были переданы в url или были только endpoint и headers
        results.endpointUrl = bodyEncoded;
      }
    } else {
      const QueryOrEndpoint = Base64.decode(encodedData[i]);
      try {
        const isBody = JSON.parse(QueryOrEndpoint);
        // Это был Body
        results.query = isBody.query;
        results.variables = isBody.variables;
      } catch {
        // Это был endpointUrl
        results.endpointUrl = QueryOrEndpoint;
      }
    }
  }
  return results;
}

export function makeNewUrl(currentUrl: string, convertedDataToUrl: string) {
  const currentUrlParsed = new URL(currentUrl);
  const protocol = `${currentUrlParsed.protocol ? currentUrlParsed.protocol + '//' : 'https://'}`;
  const hostname = currentUrlParsed.hostname;
  const port = currentUrlParsed.port ? ':' + currentUrlParsed.port : '';
  const newUrl = `${protocol}${hostname}${port}/GRAPHQL/${convertedDataToUrl}`;
  return newUrl;
}

export function getPageRoute(fullUrl: string) {
  const url = new URL(fullUrl);
  const pathWithParams = `${url.pathname}${url.search}`;
  return pathWithParams;
}
