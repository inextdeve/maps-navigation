class FetchError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

const fetcher = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(response.statusText, response.status);
        }
        resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export default fetcher;
