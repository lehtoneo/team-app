import jwt_decode from 'jwt-decode';

export const isTokenExpired = (token: any) => {
  if (!token) {
    return true;
  }
  try {
    const decoded = jwt_decode<any>(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const dateNow = new Date();
    const expNumber = Number(decoded.exp);
    if (isNaN(expNumber)) {
      return true;
    }
    const expDate = new Date(expNumber * 1000);

    return expDate < dateNow;
  } catch (e) {
    return true;
  }
};
