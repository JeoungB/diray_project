const initialMemberUser = {
    name : '',
    contents : [],
};

const CREATE_LIST = "CREATE_LIST";

export const createList = data => ({type: CREATE_LIST, data})

const memberUserReducer = (state = initialMemberUser, action) => {
    switch(action.type) {
        case CREATE_LIST :
            return {
                ...state,
                contents : state.contents.concat(action.data),
            };

            default:
                return state;
    }
}

export default memberUserReducer;