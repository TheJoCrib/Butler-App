// import {showMessage} from 'react-native-flash-message';

export function handleSuccess(e) {
  // showMessage({
  //   message: e && e.message ? e.message : "",
  //   type: 'success',
  // });
  console.log("success==>", e && e.message ? e.message : "");
}
