class Network {
  constructor({ baseURL, initOptions, networkError }) {
    this.baseURL = baseURL;
    this.initOptions = initOptions;
    this.networkError = networkError;

    console.log('🔥 ~ Network 생성');
  }

  async fetchWithBaseURL(endPoint, requestOptions) {
    try {
      const path = this.baseURL + endPoint;
      const options = {
        ...this.initOptions,
        ...requestOptions,
      };
      const response = await fetch(path, options);

      // Error Handling
      if (!response.ok)
        return await this.networkError.handleHTTPError(response, {
          path,
          options,
        });

      return await response.json();
    } catch (error) {
      console.log('🚨 fetch Error! : ', error.message);
    }
  }

  async get(endPoint, options = {}) {
    return this.fetchWithBaseURL(endPoint, { method: 'GET', ...options });
  }

  async post(endPoint, options = {}) {
    return this.fetchWithBaseURL(endPoint, { method: 'POST', ...options });
  }

  async delete(endPoint, options = {}) {
    return this.fetchWithBaseURL(endPoint, { method: 'DELETE', ...options });
  }
}

export default Network;
