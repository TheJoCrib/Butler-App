import { combineReducers } from "redux";

import { authReducer } from "./modules/auth/reducer";
import commonReducer from "./modules/common/reducer";
import { general } from "./modules/general/reducer";
import { cardsReducer, jobsReducer } from "./modules/jobsCards.js/reducer";
import chatsReducer from "./modules/chat/reducer";

/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducers = combineReducers({
	auth: authReducer,
	common: commonReducer,
	general: general,
	cards: cardsReducer,
	jobs: jobsReducer,
	chats: chatsReducer,
});

export default rootReducers;
