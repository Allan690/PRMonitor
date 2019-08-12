const axiosHelper = query => ({
  url: '',
  method: 'post',
  data: {
    query: `${query}`
  }
});

export default axiosHelper;
