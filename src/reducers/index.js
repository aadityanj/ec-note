const initialState = {
    user : { 
        firstName : '',
        lastName : '',
        emailId:''
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'setUser':
        console.log("Your choice is setUser!", action)
        return Object.assign({}, state, {
          user : action.payload
        })
        default:
        return state
    }
}