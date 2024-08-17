import { GET_JOBS, GET_JOB_INVITES } from "./endpoints";
import { getRequest, postRequest, putRequest } from "./api";
import { handleError } from "../utils/error";

export async function getJobDetail(jobID) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest(GET_JOB_INVITES + "/" + jobID);
      console.log("getJobDetail response is", response);

      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}
export async function getJobsList() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest(GET_JOBS);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}
export async function getHomeData() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest("user/getFreelancerHomepageData");
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function acceptJobInvite(jobID, acceptStatus) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await putRequest(
        "job/me/invites/" + jobID + `?accepted=${acceptStatus}`
      );
      console.log("acceptJobInvite response is", response);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}
