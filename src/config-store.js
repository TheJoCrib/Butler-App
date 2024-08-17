import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
// import { createLogger } from 'redux-logger';

// const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

console.disableYellowBox = true;
const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	whitelist: ["common", "auth", "jobs", "chats"],
};

const composeEnhancers =
	// process.env.NODE_ENV === "development"
	// 	? composeWithDevTools({ realtime: true })
	// 	:
		 compose;

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

	const store = createStore(persistedReducer, enhancer);
	let persistor = persistStore(store);

	// then run the saga
	sagaMiddleware.run(rootSaga);

	return { store, persistor };
};
