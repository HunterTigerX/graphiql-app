export const saveHistory = (url: string, client: string, sdlUrl: string) => {
  if (typeof window !== 'undefined') {
    let savedState = localStorage.getItem('history_data');
    if (savedState) {
      try {
        const historyArray = JSON.parse(savedState);
        const newData = {
          url,
          client,
          sdlUrl,
        };
        const mergedArray = [newData].concat(historyArray);
        localStorage.setItem('history_data', JSON.stringify(mergedArray));
      } catch {
        savedState = null;
      }
    } else {
      localStorage.setItem('history_data', JSON.stringify([{ url, client, sdlUrl }]));
    }
  }
};
