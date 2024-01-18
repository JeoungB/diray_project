import { combineReducers, createStore } from "redux";
import userReducer from "../reducers/user";
import loginReducer from "../reducers/isLogin";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session"; 
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ["user", "contents"]
};

const authPersistConfigs = {
    key: 'auth',
    storage,
    whitelist: ["isLogin"],
};

const rootReducer = combineReducers({
    user : persistReducer(persistConfig, userReducer),
    login : persistReducer(authPersistConfigs, loginReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);