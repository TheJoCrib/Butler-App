import { postRequest } from '../../network/api';
import { USER_LOGIN, USER_SIGNUP } from '../../network/endpoints';

export const loginWithEmail = data => postRequest(USER_LOGIN, data);

export const signupWithEmail = data => postRequest(USER_SIGNUP, data);
