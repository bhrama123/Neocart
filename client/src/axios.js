import axios from "axios";

const api = axios.create({
 baseURL: "https://neocart-sqeh.onrender.com/api"
});

export default api;