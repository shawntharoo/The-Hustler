export default (state = { color : 'red' }, action) => {
    switch(action.type){
        case 'color':
            return {
                color : action.payload
            };
        default : 
            return state;
    }
}