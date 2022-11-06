export default function reducer(state = {
    user: {}
}, action) {
    switch (action.type) {
        case "ADD_DATA":
            return {
                ...state,
                user: action.payload
            };
        case "LOGOUT":
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
}