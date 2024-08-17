import { ActionTypes } from "./types";

var initState = {
	supportChats: [],
	discussionChats: [],
	activeChats: [],
};

function chatsReducer(state = initState, action) {
	switch (action.type) {
		case ActionTypes.SET_SUPPORT_CHATS:
			return { ...state, supportChats: action.data };
		case ActionTypes.SET_DISCUSSION_CHATS:
			return { ...state, discussionChats: action.data };
		case ActionTypes.SET_ACTIVE_CHATS:
			return { ...state, activeChats: action.data };
		default:
			return state;
	}
}

export default chatsReducer;
