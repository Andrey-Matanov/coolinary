import axios from "axios";
import { baseURL } from ".";

const config = {
    baseURL: `${baseURL}/api`,
};

const configuredAxios = axios.create(config);

export default configuredAxios;
