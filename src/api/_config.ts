import axios from "axios";

const API = axios.create({
  baseURL: "https://api.bitbarg.me/api/v1/",
});

export default API;
