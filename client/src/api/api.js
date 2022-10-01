import axios from "axios";

const instance = axios.create({
    baseURL : "http://localhost:8000/"
})

export const GetPublicAPI = (search) => {
    return instance.get("/public-api", {params : {search : search}}).then(response => response.data)
}