import { ActionTypes } from "./types";

export function setSupportChats(data) {
	return {
		type: ActionTypes.SET_SUPPORT_CHATS,
		data,
	};
}
export function setDiscussionChats(data) {
	return {
		type: ActionTypes.SET_DISCUSSION_CHATS,
		data,
	};
}
export function setActiveChats(data) {
	return {
		type: ActionTypes.SET_ACTIVE_CHATS,
		data,
	};
}
