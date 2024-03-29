import jwt_decode from "jwt-decode";
import axios from "axios";

const setJwtToSession = token => {
  axios.defaults.headers.common['Authorization'] = token;
  localStorage.setItem("Authorization", token);
};

const getJwtFromSession = () => {
  return localStorage.getItem("Authorization");
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

const redirectToLogin = () => {
  if(getJwtFromSession()!=="null"){
    let currentTime = Date.now() / 1000;
    let expTime = decodeToken(getJwtFromSession()).exp;
    if(expTime<currentTime){
      return true;
    }
    return false;
  }
  return true;
}

export { setJwtToSession, getJwtFromSession, getHeader, decodeToken,redirectToLogin };
