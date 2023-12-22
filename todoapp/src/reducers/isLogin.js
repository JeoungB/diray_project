const initialLogin = {
    isLogin: false,
}

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const login = data => ({type: LOGIN, data});
export const logout = data => ({type: LOGOUT, data});

const loginReducer = (state=initialLogin, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                isLogin: action.data,
            };

            case LOGOUT:
                return {
                    ...state,
                    isLogin: action.data,
                }
            default:
                return state;
    };
};

export default loginReducer;