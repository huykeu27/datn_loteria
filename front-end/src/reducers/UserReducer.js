const initState = {
  user: null,
};
// const userReducer = (state => initState, action) =>{
//     switch (action.key) {
//         case "USER_LOGIN":

//     return {
//         ...state
//                 "user": action.payload
//             }

//         default:
//             break;
//     }
// }
const userReducer = (state = initState, action) => {
  switch (action.key) {
    case "USER_LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
