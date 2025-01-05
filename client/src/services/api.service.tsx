import axios from "axios";

const api = axios.create({
  baseURL: "https://test.unifillai.com/api",
  withCredentials: true, 
});

export default api;
