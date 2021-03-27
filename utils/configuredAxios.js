import axios from "axios";
import { baseURL } from ".";

const configuredAxios = axios.create({
    baseURL: `${baseURL}/api`,
});

export default configuredAxios;
