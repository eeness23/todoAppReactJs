import jwt_decode from "jwt-decode";
import axios from "axios";

const setJwtToSession = token => {
  axios.defaults.headers.common['Authorization'] = token;
  sessionStorage.setItem("Authorization", token);
};

const getJwtFromSession = () => {
  return sessionStorage.getItem("Authorization");
};

const getHeader = token => {
  let header = {
    headers: {
      "Authorization": token
    }
  };
  return header;
};

const decodeToken = token => {
  return jwt_decode(token);
};

export { setJwtToSession, getJwtFromSession, getHeader, decodeToken };
