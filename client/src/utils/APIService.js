class APIService {
  baseURL = import.meta.env.VITE_API_BASE_URL;
  headers = {
    'Content-Type': 'application/json',
  };

  async fetchWithBaseURL(url, options) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers: this.headers,
        credentials: 'include',
      });

      const json = await response.json();

      if (json.error)
        throw new Error(json.error || 'Network response was not ok');

      return json;
    } catch (error) {
      console.log('🚨 Api Service Error! : ', error.message);
      throw error;
    }
  }

  async get(url, options = {}) {
    return this.fetchWithBaseURL(url, { method: 'GET', ...options });
  }

  async post(url, options = {}) {
    return this.fetchWithBaseURL(url, { method: 'POST', ...options });
  }

  async delete(url, options = {}) {
    return this.fetchWithBaseURL(url, { method: 'DELETE', ...options });
  }
}

export default APIService;
