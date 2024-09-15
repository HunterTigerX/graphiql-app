import React from 'react';
import './jsonViewer.css';

interface CleanObject {
  [key: string]: string | number | object | null | undefined;
}

export function cleanObject(
  obj: string | null | undefined | object | number
): string | object | null | undefined | number {
  if (obj === null || obj === undefined) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(cleanObject);
  } else if (typeof obj === 'object') {
    const newObj: CleanObject = {};
    for (const key in obj) {
      if (key.startsWith('__')) {
        continue;
      }
      const copyObject = obj as CleanObject;
      const objValue = copyObject[key];
      newObj[key] = cleanObject(objValue);
    }
    return newObj;
  }
  return obj;
}

export const formatJson = (obj: object) => {
  if (!obj) {
    return;
  }
  const entries = Object.entries(obj);
  return entries
    .map(([key, value], index) => {
      if (key.startsWith('__')) {
        return null;
      }

      const isLastEntry = index === entries.length - 1;

      if (Array.isArray(value)) {
        return (
          <div key={`${key}-${index}-${value}`}>
            <div>
              <span className={'key_text_color'}>{key}:</span>
              <span className="black-text"> [</span>
            </div>
            <div className={'left-20'}>
              {value.map((item, itemIndex) => {
                if (typeof item === 'string') {
                  return (
                    <div key={`array-${key}-${index}-${item}-${itemIndex}-${value}`} className={'left-10 orange-text'}>
                      {item}
                    </div>
                  );
                }
                return (
                  <React.Fragment
                    key={`react-${key}-${index}-${value}-${Math.floor(Math.random() * 10000000000000) + 1}`}
                  >
                    <div>
                      <span className={'left-0'}>&#123;</span>
                    </div>
                    <div className={'left-10'}>{formatJson(item)}</div>
                    <div>
                      <span className="black-text curly-black left-0">&#125;</span>
                      {itemIndex === value.length - 1 ? '' : ','}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <span className="black-text">]</span>
          </div>
        );
      } else if (typeof value === 'object') {
        if (value === null) {
          return (
            <div key={`array-${key}-${index}-object-${value}`}>
              <span className={'key_text_color'}>{key}:</span>
              <span style={{ color: 'green' }}> null</span>
              {!isLastEntry ? ',' : ''}
            </div>
          );
        }
        return (
          <div key={`array-${key}-${index}-else-${value}`}>
            <span className={'key_text_color left-15'}>{key}:</span>
            <span className="black-text"> &#123;</span>
            <div className={'left-25'}>{formatJson(value)}</div>
            <div>
              <span className="black-text left-15">&#125;</span>
              {!isLastEntry ? ',' : ''}
            </div>
          </div>
        );
      } else {
        let valueColor;
        if (typeof value === 'string') {
          valueColor = { color: 'green' };
        } else if (/\d/.test(value! as string)) {
          valueColor = { color: 'orange' };
        } else {
          valueColor = { color: 'pink' };
        }
        return (
          <div key={`array-${key}-${index}-esda-${value}`}>
            <span className={'key_text_color'}>{key}:</span>
            <span style={valueColor}> {JSON.stringify(value)}</span>
            {!isLastEntry ? ',' : ''}
          </div>
        );
      }
    })
    .filter(Boolean);
};

const JsonViewer = (dirtyData: string | object | CleanObject | null | undefined) => {
  const data = cleanObject(dirtyData);
  return <div>{formatJson(data as object)}</div>;
};
export default JsonViewer;
