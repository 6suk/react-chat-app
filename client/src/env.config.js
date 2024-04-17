const http = 'http://localhost:';
const port = import.meta.env.VITE_SERVER_PORT || 5173;

const url = {
  base: http + port,
  api: `${http}${port}/api`,
};

export default url;
