
 const initialUser = {
    user: '',
    contents: [],
  };

  const GEUST_USER = "SET_USER";
  const ADD_LIST = "ADD_LIST";
  const UPDATE_LIST = "UPDATE_LIST";
  const DELETE = "DELETE";
  const LOGOUT = "LOGOUT";
  const NULLCONTENT = "NULLCONTENT";

  export const getGestUser = data => ({type: GEUST_USER, data});
  export const addList = data => ({type: ADD_LIST, data});
  export const updateList = data => ({type: UPDATE_LIST, data});
  export const deleteList = data => ({type: DELETE, data});
  export const logout = () => ({type: LOGOUT});

  const userReducer = (state = initialUser, action) => {

      const importantMemo = state.contents.filter((newData) => newData.important === true);
      const notImportantMemo = state.contents.filter((newData) => newData.important === false);
      notImportantMemo.sort((a, b) => new Date(a.timestemp) - new Date(b.timestemp))
      const newDatas = importantMemo.concat(notImportantMemo);
      const newMemos = new Set(newDatas);
    
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
            timestemp : action.data.timestemp,
            datetime : action.data.datetime,
            important: action.data.important,
          })
        };

        case UPDATE_LIST:
          return {
            ...state,
            contents: [...newMemos],
          };

          case DELETE:
           return {
            ...state,
            contents : state.contents.filter(contents => contents.id !== action.data),
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

