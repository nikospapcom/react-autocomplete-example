import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "https://hn.algolia.com/api/v1/search";

export function getRequest(URL: string) {
  return axiosClient
    .get(`${URL}`)
    .then((response) => response)
    .catch((error) => error.response);
}
