
var initia_state = {
  fromPerson: "sandy",
  secretSauce : "secret",
            toPerson: "who wants it",
            error: "No errors"
}
export default (state = initia_state, action) => {
    switch (action.type) {
      case "MAKE_SANDWICH":
        return {
            forPerson : action.forPerson,
            secretSauce : action.secretSauce
        };
        case "APOLOGIZE":
          return {
            fromPerson: action.fromPerson,
            toPerson: action.toPerson,
            error: action.error
          }
      default:
        return state;
    }
  };

