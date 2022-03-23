import jwt_decode from 'jwt-decode';

export const isTokenExpired = (token: any) => {
  const decoded = jwt_decode<any>(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  var dateNow = new Date();
  const expNumber = Number(decoded.exp);
  if (isNaN(expNumber)) {
    return true;
  }
  return expNumber < dateNow.getTime();
};
