import axios from "axios";

const api = axios.create({ baseURL: "https://api.example.com" });

export const login = async (credentials) => {
    const { data } = await api.post("/login", credentials);
    return data;
};

export const register = async (userData) => {
    const { data } = await api.post("/register", userData);
    return data;
};
