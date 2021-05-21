const proxy = {
  target: "http://localhost:8083/",
  ws: true,
  changeOrigin: true
};

module.exports = {
  devServer: {
    proxy: {
      "/v1": proxy
    }
  }
};
