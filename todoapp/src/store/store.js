import { combineReducers, createStore } from "redux";
import userReducer from "../reducers/user";
import loginReducer from "../reducers/isLogin";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session"; 
import { persistStore, persistReducer } from "redux-persist";
import memberUserReducer from "../reducers/memberUser";

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

const memberUserPersistConfigs = {
    key: 'member',
    storage,
    whitelist : ["name", "contents"]
}

const rootReducer = combineReducers({
    user : persistReducer(persistConfig, userReducer),
    login : persistReducer(authPersistConfigs, loginReducer),
    memberUSer : persistReducer(memberUserPersistConfigs, memberUserReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);