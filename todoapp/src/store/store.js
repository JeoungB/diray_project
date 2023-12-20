import { createStore } from "redux";
import userReducer from "../reducers/user";
import loginReducer from "../reducers/isLogin";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session"; 
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ["user", "contents"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);