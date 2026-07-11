import axios from "axios";

const api = axios.create({
 baseURL: "https://neocart-backend-qnte.onrender.com/api"
});

export default api;