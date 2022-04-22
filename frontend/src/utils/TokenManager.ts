import { isTokenExpired } from './jwt-token';
import { Tokens } from '../graphql/commonTypes';
import { fetchNewAccessToken } from './FetchNewAccessToken';

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const getAccessToken = async () => {
  const token = localStorage.getItem('accessToken');
  const isAccessTokenExpired = isTokenExpired(token);

  if (!token || token === 'undefined' || isAccessTokenExpired) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return null;
    }
    const newAccessToken = await fetchNewAccessToken(refreshToken);
    if (newAccessToken) {
      setAccessToken(newAccessToken);
    } else {
      removeTokens();
    }
    return newAccessToken;
  } else {
    return token;
  }
};

const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
};

const setTokens = (tokens: Tokens) => {
  setAccessToken(tokens.accessToken);
  setRefreshToken(tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const getTokens = async () => {
  return {
    accessToken: await getAccessToken(),
    refreshToken: getRefreshToken()
  };
};

const tokenManager = {
  setAccessToken,
  setRefreshToken,
  getTokens,
  setTokens,
  removeTokens
};

export default tokenManager;
