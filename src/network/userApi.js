import { GET_CATEGORIES, RESET_PASSWORD, UPDATE_PROFILE } from "./endpoints";
import {
  getRequest,
  postRequest,
  putRequest,
  RNFetchBlobPutRequest,
} from "./api";
import { handleError } from "../utils/error";
import RNFetchBlob from "react-native-blob-util";
import { store } from "../../App";
import { API_ENDPOINT } from "../config/api";
import { Platform } from "react-native";
import axios from "axios";

export async function getAllCatagory() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest(GET_CATEGORIES);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function getCatagorySkills(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest("user/getSkills/" + id);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function updateCategorySkills(postBody) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postRequest("skillUpdateRequest/create", postBody);
      resolve(response);
    } catch (error) {
      console.log(error);
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function resetPassword(token, oldPassword, password) {
  const postBody = {
    token,
    password,
    oldPassword,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await postRequest(RESET_PASSWORD, postBody);
      resolve(response);
    } catch (error) {
      console.log(error);
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function updateProfile(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await putRequest(UPDATE_PROFILE, data);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function updateUserProfile(userData = {}) {
  if (userData?.type == "formdata") {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${store.getState().auth.token}`);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: userData.formdata,
      redirect: "follow",
    };

    return fetch(`${API_ENDPOINT}user/me`, requestOptions).then((response) =>
      response.text()
    );
  } else {
    return new Promise(async (resolve, reject) => {
      try {
        if (userData?.portfolio || userData?.resume) {
          let reqData = [];
          Object.keys(userData).forEach(function (key, index) {
            if (!["resume", "portfolio", "skills"].includes(key)) {
              reqData.push({
                name: key,
                data: userData[key],
              });
            }
          });
          userData?.portfolio.forEach((item, index) => {
            reqData.push({
              name: "portfolio",
              data: RNFetchBlob.wrap(
                decodeURIComponent(
                  Platform.OS === "ios"
                    ? item.uri.replace("file://", "")
                    : item.uri
                )
              ),
              filename: item.name ? item.name : "portfolio_" + Date.now(),
            });
          });

          userData?.resume.forEach((item, index) => {
            reqData.push({
              name: "resume",
              data: RNFetchBlob.wrap(
                decodeURIComponent(
                  Platform.OS === "ios"
                    ? item.uri.replace("file://", "")
                    : item.uri
                )
              ),
              filename: item.name ? item.name : "resume_" + Date.now(),
            });
          });
          userData?.skills.forEach((item, index) => {
            reqData.push({
              name: "skills",
              data: item,
            });
          });
          RNFetchBlobPutRequest(reqData, UPDATE_PROFILE)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          const response = await putRequest(UPDATE_PROFILE, userData);
          resolve(response);
        }
      } catch (error) {
        handleError(error?.response?.data || "");
        reject(error?.response?.data || "");
      }
    });
  }
}
