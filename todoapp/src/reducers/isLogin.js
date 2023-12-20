const initialLogin = {
    isLogin: false,
}

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const login = () => ({type: LOGIN});
export const logout = () => ({type: LOGOUT});

const loginReducer = (state=initialLogin, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                isLogin: true,
            };

            case LOGOUT:
                return {
                    ...state,
                    isLogin: false,
                }
            default:
                return state;
    };
};

export default loginReducer;