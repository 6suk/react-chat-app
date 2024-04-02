class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_URL;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  async fetchData(url, options) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers: this.headers,
      });

      const json = await response.json();
      if (!response.ok)
        throw new Error(json.error || 'Network response was not ok');

      return json;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async fetchGet(url, options = {}) {
    return this.fetchData(url, { method: 'GET', ...options });
  }

  async fetchDelete(url, options = {}) {
    return this.fetchData(url, { method: 'DELETE', ...options });
  }

  async fetchPost(url, options = {}) {
    console.log('🚀 ~ ApiService ~ fetchPost ~ options:', options);
    return this.fetchData(url, { method: 'POST', ...options });
  }
}

export default ApiService;
