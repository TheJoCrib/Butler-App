import { CREATE_CHATROOM, GET_CATEGORIES, UPLOAD_FILE } from "./endpoints";
import {
  getRequest,
  postRequest,
  RNFetchBlobPostRequest,
  RNFetchBlobPutRequest,
} from "./api";
import { handleError } from "../utils/error";
import RNFetchBlob from "react-native-blob-util";
import { Platform } from "react-native";

export async function getCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest(GET_CATEGORIES);
      // console.log('getCategories response is', response);

      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function uploadAttachment(attachment = {}, ext = "") {
  return new Promise(async (resolve, reject) => {
    try {
      let reqData = [];
      reqData.push({
        name: "file",
        data: RNFetchBlob.wrap(
          Platform.OS === "ios"
            ? decodeURIComponent(attachment.uri.replace("file://", ""))
            : attachment.uri
        ),
        filename: attachment.name
          ? attachment.name
          : "attachment_" + Date.now() + ext,
      });
      console.log(reqData, UPLOAD_FILE);
      RNFetchBlobPostRequest(reqData, UPLOAD_FILE)
        .then((data) => {
          console.log("uploadAttachment data", data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}
