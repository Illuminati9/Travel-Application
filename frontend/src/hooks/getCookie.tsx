import Cookies from 'js-cookie';

export const getCookie = (key: string) => {
  const cookie = Cookies.get(key);
  return cookie;
};
