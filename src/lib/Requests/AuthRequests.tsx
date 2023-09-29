
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_ROUTE, routesName } from '../RoutesName/Routes';

const baseURL = BASE_API_ROUTE;

const privateAgent = axios.create({
  baseURL,
});

const publicAgent = axios.create({
  baseURL,
});

privateAgent.interceptors.request.use(
  async (config:any) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken')
      if (accessToken && config.headers){
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      config.headers['Content-Type'] = 'application/json'
      return config;

      } catch (error) {
        Promise.reject(error);
      }

  },
  (error: any) => {
    Promise.reject(error);
  }
);

privateAgent.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  const refreshToken = await AsyncStorage.getItem('refreshToken')
  if (error.response.status === 401 && !originalRequest._retry) {
    try {

      originalRequest._retry = true;
    if(!refreshToken)
      return;

    const response = await axios.post(routesName.AuthRoute({}).refreshToken,{token:`${refreshToken}`});
    if(response.status == 200){
      const token = response.data.result.jwtToken;
      const refreshToken = response.data.result.refreshToken
      // authContext.setAuthState({
      //   ...authContext.authState,
      //   refreshToken
      // });
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return privateAgent(originalRequest);

    } catch (error) {
      return Promise.reject(error);
    }

  }

});

export { privateAgent, publicAgent };
