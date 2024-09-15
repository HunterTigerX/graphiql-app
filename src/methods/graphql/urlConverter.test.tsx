import { urlConverter, dataFromUrl, makeNewUrl } from './urlConverter';
import gqlPrettier from 'graphql-prettier';
import { describe, it, expect } from 'vitest';
import { Base64 } from 'js-base64';
import { mockEndpointUrlPoke, mockHeadersPoke, mockQueryPoke, mockVariablesPoke } from '@/__mocks__/graphQlMocks';

const receivedUrl =
  'aHR0cHM6Ly9iZXRhLnBva2VhcGkuY28vZ3JhcGhxbC92MWJldGE=/eyJxdWVyeSI6InF1ZXJ5IHBva2Vtb25fZGV0YWlscygkbmFtZTogU3RyaW5nKSB7XG4gIHNwZWNpZXM6IHBva2Vtb25fdjJfcG9rZW1vbnNwZWNpZXMod2hlcmU6IHtuYW1lOiB7X2VxOiAkbmFtZX19KSB7XG4gICAgbmFtZVxuICAgIGJhc2VfaGFwcGluZXNzXG4gICAgaXNfbGVnZW5kYXJ5XG4gICAgaXNfbXl0aGljYWxcbiAgICBnZW5lcmF0aW9uOiBwb2tlbW9uX3YyX2dlbmVyYXRpb24ge1xuICAgICAgbmFtZVxuICAgIH1cbiAgICBoYWJpdGF0OiBwb2tlbW9uX3YyX3Bva2Vtb25oYWJpdGF0IHtcbiAgICAgIG5hbWVcbiAgICB9XG4gICAgcG9rZW1vbjogcG9rZW1vbl92Ml9wb2tlbW9uc19hZ2dyZWdhdGUobGltaXQ6IDEpIHtcbiAgICAgIG5vZGVzIHtcbiAgICAgICAgaGVpZ2h0XG4gICAgICAgIG5hbWVcbiAgICAgICAgaWRcbiAgICAgICAgd2VpZ2h0XG4gICAgICAgIGFiaWxpdGllczogcG9rZW1vbl92Ml9wb2tlbW9uYWJpbGl0aWVzX2FnZ3JlZ2F0ZSB7XG4gICAgICAgICAgbm9kZXMge1xuICAgICAgICAgICAgYWJpbGl0eTogcG9rZW1vbl92Ml9hYmlsaXR5IHtcbiAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdGF0czogcG9rZW1vbl92Ml9wb2tlbW9uc3RhdHMge1xuICAgICAgICAgIGJhc2Vfc3RhdFxuICAgICAgICAgIHN0YXQ6IHBva2Vtb25fdjJfc3RhdCB7XG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHR5cGVzOiBwb2tlbW9uX3YyX3Bva2Vtb250eXBlcyB7XG4gICAgICAgICAgc2xvdFxuICAgICAgICAgIHR5cGU6IHBva2Vtb25fdjJfdHlwZSB7XG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldmVsVXBNb3ZlczogcG9rZW1vbl92Ml9wb2tlbW9ubW92ZXNfYWdncmVnYXRlKFxuICAgICAgICAgIHdoZXJlOiB7cG9rZW1vbl92Ml9tb3ZlbGVhcm5tZXRob2Q6IHtuYW1lOiB7X2VxOiBcImxldmVsLXVwXCJ9fX1cbiAgICAgICAgICBkaXN0aW5jdF9vbjogbW92ZV9pZFxuICAgICAgICApIHtcbiAgICAgICAgICBub2RlcyB7XG4gICAgICAgICAgICBtb3ZlOiBwb2tlbW9uX3YyX21vdmUge1xuICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3VuZEluQXNNYW55UGxhY2VzOiBwb2tlbW9uX3YyX2VuY291bnRlcnNfYWdncmVnYXRlIHtcbiAgICAgICAgICBhZ2dyZWdhdGUge1xuICAgICAgICAgICAgY291bnRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlyZVJlZEl0ZW1zOiBwb2tlbW9uX3YyX3Bva2Vtb25pdGVtcyhcbiAgICAgICAgICB3aGVyZToge3Bva2Vtb25fdjJfdmVyc2lvbjoge25hbWU6IHtfZXE6IFwiZmlyZXJlZFwifX19XG4gICAgICAgICkge1xuICAgICAgICAgIHBva2Vtb25fdjJfaXRlbSB7XG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBjb3N0XG4gICAgICAgICAgfVxuICAgICAgICAgIHJhcml0eVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZsYXZvclRleHQ6IHBva2Vtb25fdjJfcG9rZW1vbnNwZWNpZXNmbGF2b3J0ZXh0cyhcbiAgICAgIHdoZXJlOiB7cG9rZW1vbl92Ml9sYW5ndWFnZToge25hbWU6IHtfZXE6IFwiZW5cIn19LCBwb2tlbW9uX3YyX3ZlcnNpb246IHtuYW1lOiB7X2VxOiBcImZpcmVyZWRcIn19fVxuICAgICkge1xuICAgICAgZmxhdm9yX3RleHRcbiAgICB9XG4gIH1cbn0iLCJ2YXJpYWJsZXMiOnsibmFtZSI6InN0YXJtaWUifX0=?Content-Type=application%2Fjson&X-Method-Used=graphiql';

describe('cartReducer', () => {
  it('should handle urlConverter correctly', () => {
    const NewLink = urlConverter(mockEndpointUrlPoke, mockHeadersPoke, gqlPrettier(mockQueryPoke), mockVariablesPoke);
    expect(NewLink).to.equal(receivedUrl);
  });

  it('should correctly parse headers and body from URL', () => {
    const input = 'http://example.com/api/v1/someEndpoint/encodedBody?header1=value1&header2=value2';
    const expectedOutput = {
      headers: [
        { key: 'header1', value: 'value1' },
        { key: 'header2', value: 'value2' },
      ],
      query: 'someQuery',
      endpointUrl: 'someEndpoint',
      variables: 'someVariables',
    };

    const originalDecode = Base64.decode;
    Base64.decode = (str: string) => {
      if (str === 'encodedBody') return JSON.stringify({ query: 'someQuery', variables: 'someVariables' });
      return str;
    };

    const result = dataFromUrl(input);

    expect(result).toEqual(expectedOutput);

    Base64.decode = originalDecode;
  });

  it('should handle cases with only endpoint and headers', () => {
    const input = 'http://example.com/api/v1/some-endpoint/encodedBody?header1=value1';
    const expectedOutput = {
      headers: [{ key: 'header1', value: 'value1' }],
      query: '',
      endpointUrl: 'zw(u�A��',
      variables: '',
    };

    const result = dataFromUrl(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle cases with invalid JSON', () => {
    const input = 'http://example.com/api/v1/someEndpoint/invalidBody';

    const expectedOutput = {
      headers: [],
      query: '',
      endpointUrl: `�{ږ'A��`,
      variables: '',
    };

    const result = dataFromUrl(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle makeNewUrl', () => {
    const convertedDataToUrl = urlConverter(mockEndpointUrlPoke, mockHeadersPoke, mockQueryPoke, mockVariablesPoke);
    const url = `http://localhost:3000/GRAPHQL`;
    const expectedOutput =
      'http://localhost:3000/GRAPHQL/aHR0cHM6Ly9iZXRhLnBva2VhcGkuY28vZ3JhcGhxbC92MWJldGE=/eyJxdWVyeSI6IlxucXVlcnkgcG9rZW1vbl9kZXRhaWxzKCRuYW1lOiBTdHJpbmcpIHsgIHNwZWNpZXM6IHBva2Vtb25fdjJfcG9rZW1vbnNwZWNpZXMod2hlcmU6IHtuYW1lOiB7X2VxOiAkbmFtZX19KSB7ICAgICBuYW1lXG4gICAgYmFzZV9oYXBwaW5lc3MgICAgIGlzX2xlZ2VuZGFyeVxuICAgIGlzX215dGhpY2FsICAgIGdlbmVyYXRpb246IHBva2Vtb25fdjJfZ2VuZXJhdGlvbiB7XG4gICAgICBuYW1lXG4gICAgfVxuICAgIGhhYml0YXQ6IHBva2Vtb25fdjJfcG9rZW1vbmhhYml0YXQge1xuICAgICAgbmFtZVxuICAgIH1cbiAgICBwb2tlbW9uOiBwb2tlbW9uX3YyX3Bva2Vtb25zX2FnZ3JlZ2F0ZShsaW1pdDogMSkge1xuICAgICAgbm9kZXMge1xuICAgICAgICBoZWlnaHRcbiAgICAgICAgbmFtZVxuICAgICAgICBpZFxuICAgICAgICB3ZWlnaHRcbiAgICAgICAgYWJpbGl0aWVzOiBwb2tlbW9uX3YyX3Bva2Vtb25hYmlsaXRpZXNfYWdncmVnYXRlIHtcbiAgICAgICAgICBub2RlcyB7XG4gICAgICAgICAgICBhYmlsaXR5OiBwb2tlbW9uX3YyX2FiaWxpdHkge1xuICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0YXRzOiBwb2tlbW9uX3YyX3Bva2Vtb25zdGF0cyB7XG4gICAgICAgICAgYmFzZV9zdGF0XG4gICAgICAgICAgc3RhdDogcG9rZW1vbl92Ml9zdGF0IHtcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHlwZXM6IHBva2Vtb25fdjJfcG9rZW1vbnR5cGVzIHtcbiAgICAgICAgICBzbG90XG4gICAgICAgICAgdHlwZTogcG9rZW1vbl92Ml90eXBlIHtcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV2ZWxVcE1vdmVzOiBwb2tlbW9uX3YyX3Bva2Vtb25tb3Zlc19hZ2dyZWdhdGUod2hlcmU6IHtwb2tlbW9uX3YyX21vdmVsZWFybm1ldGhvZDoge25hbWU6IHtfZXE6IFwibGV2ZWwtdXBcIn19fSwgZGlzdGluY3Rfb246IG1vdmVfaWQpIHtcbiAgICAgICAgICBub2RlcyB7XG4gICAgICAgICAgICBtb3ZlOiBwb2tlbW9uX3YyX21vdmUge1xuICAgICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3VuZEluQXNNYW55UGxhY2VzOiBwb2tlbW9uX3YyX2VuY291bnRlcnNfYWdncmVnYXRlIHtcbiAgICAgICAgICBhZ2dyZWdhdGUge1xuICAgICAgICAgICAgY291bnRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlyZVJlZEl0ZW1zOiBwb2tlbW9uX3YyX3Bva2Vtb25pdGVtcyh3aGVyZToge3Bva2Vtb25fdjJfdmVyc2lvbjoge25hbWU6IHtfZXE6IFwiZmlyZXJlZFwifX19KSB7XG4gICAgICAgICAgcG9rZW1vbl92Ml9pdGVtIHtcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgIGNvc3RcbiAgICAgICAgICB9XG4gICAgICAgICAgcmFyaXR5XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZmxhdm9yVGV4dDogcG9rZW1vbl92Ml9wb2tlbW9uc3BlY2llc2ZsYXZvcnRleHRzKHdoZXJlOiB7cG9rZW1vbl92Ml9sYW5ndWFnZToge25hbWU6IHtfZXE6IFwiZW5cIn19LCBwb2tlbW9uX3YyX3ZlcnNpb246IHtuYW1lOiB7X2VxOiBcImZpcmVyZWRcIn19fSkge1xuICAgICAgZmxhdm9yX3RleHRcbiAgICB9XG4gIH1cbn1cbiIsInZhcmlhYmxlcyI6eyJuYW1lIjoic3Rhcm1pZSJ9fQ==?Content-Type=application%2Fjson&X-Method-Used=graphiql';
    const newUrl = makeNewUrl(url, convertedDataToUrl);

    expect(newUrl).toEqual(expectedOutput);
  });
});
