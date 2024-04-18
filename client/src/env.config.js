const http = 'http://localhost:';
const port = import.meta.env.VITE_SERVER_PORT || 3000;

const url = {
  base: http + port,
  api: `${http}${port}/api`,
};

export default url;
