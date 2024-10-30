import axios from "axios";
import { ResponseGetImgs } from "../types";

export async function getImgs(
  requestImgs: string,
  numberPage: number
): Promise<ResponseGetImgs> {
  axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
  const option = {
    params: {
      client_id: "OiJXlg_POGkPLgP6qu235zjz5HBEBnqGp_TqAX3K9wE",
      query: requestImgs,
      page: numberPage,
      per_page: 12,
      orientation: "landscape",
    },
  };
  
  const { data } = await axios.get<ResponseGetImgs>("", option);
  return data;
}
