class fetchService {
  constructor({ url, initOptions, on401Error }) {
    this.url = url;
    this.initOptions = initOptions;
    this.on401Error = on401Error;

    console.log('🔥 ~ fetchService 생성:');
  }

  async fetchWithBaseURL(endPoint, requsetOptions) {
    try {
      const path = this.url + endPoint;
      const options = {
        ...this.initOptions,
        ...requsetOptions,
      };

      const response = await fetch(this.url + endPoint, {
        ...this.initOptions,
        ...requsetOptions,
      });
      const responseJSON = await response.json();

      if (!response.ok) {
        switch (response.status) {
          case 401: {
            const nextRequest = { path, options };
            return await this.on401Error(nextRequest);
          }
          default: {
            if (responseJSON.error) throw new Error(responseJSON.error);
          }
        }
      }

      return responseJSON;
    } catch (error) {
      console.log('🚨 fetch Error! : ', error.message);
      throw error;
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

  async refreshToken(endPoint, options) {
    const path = this.url + endPoint;
    const response = await fetch(path, {
      ...this.initOptions,
      ...options,
    });
    return response;
  }
}

export default fetchService;
