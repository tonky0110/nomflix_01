import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "b409d39420f2e330804cb8995568ad92",
    language: "en-US"
  }
});

api.get("tv/popular");

export default api;
