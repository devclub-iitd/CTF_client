import axios from "axios";

const instance = axios.create({
  baseURL: "https://ctf-apis.firebaseio.com/",
});

export default instance;
