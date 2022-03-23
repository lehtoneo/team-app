const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/graphql'
    : '/graphql';

export { API_URL };
