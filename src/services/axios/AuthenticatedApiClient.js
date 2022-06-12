
import axios from 'axios';


const AuthenticatedApiClient = () => {
  const defaultOptions = {
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    headers: { 
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const data = {}; //await getSession();
    let token = undefined;
    if (data && data.token) {
      token = data.token;
    }
    if (token && request.headers) {
      request.headers.Authorization = `Bearer ${token.token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const {response: {status}} = error;
      if(Number(status) === 401) {
        //signOut();
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export {AuthenticatedApiClient};