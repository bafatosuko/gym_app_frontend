import {getCookie} from "@/utils/cookies.ts";

 export const authHeaders = () => {
  const token = getCookie("auth_data") ? JSON.parse(getCookie("auth_data")!).token : ""
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}