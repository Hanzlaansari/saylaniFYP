let userReducer = (state = [], action) => {

    switch (action.type) {
        case "user":
            return [...action.payload]
        default:
            return state;
    }
}
export default (userReducer);