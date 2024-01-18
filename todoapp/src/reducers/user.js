
  const initialUser = {
    user: '',
    contents: [],
  };

  const GEUST_USER = "SET_USER";
  const ADD_LIST = "ADD_LIST";
  const UPDATE_LIST = "UPDATE_LIST";
  const DELETE = "DELETE";
  const LOGOUT = "LOGOUT";

  export const getGestUser = data => ({type: GEUST_USER, data});
  export const addList = data => ({type: ADD_LIST, data});
  export const updateList = data => ({type: UPDATE_LIST, data});
  export const deleteList = data => ({type: DELETE, data});
  export const logout = () => ({type: LOGOUT});

  const userReducer = (state = initialUser, action) => {
    switch(action.type) {
      case GEUST_USER:
        return {
          ...state,
          user: action.data,
        };

      case ADD_LIST:
        return {
          ...state,
          contents: state.contents.concat({
            id: action.data.id,
            title: action.data.title,
            content: action.data.content,
            important: action.data.important,
          })
        };

        case UPDATE_LIST:
          return {
            ...state,
            contents: action.data,
          };

          case DELETE:
            return {
              ...state,
              contents: action.data,
            };

          case LOGOUT:
            return {
              user : '',
              contents : [],
            }
        default:
          return state;
    };
  };

  export default userReducer;

