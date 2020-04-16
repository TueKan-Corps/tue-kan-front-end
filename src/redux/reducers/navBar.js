const initState = {
    loading: true,
    profileData: { first_name: 'firstName', last_name: 'lastName' },
    status: 'guest'
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'SET_STATE':
            return {
                state: action.data
            }
        case 'SET_PROFILE':
            return {
                ...state,
                profileData: action.data
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.data
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.data
            } 
        case 'COIN_OPS':
            if (action.isAdd === false)
                action.data *= -1;
            
            let newData = state.profileData
            newData['coin_amount'] = parseInt(newData['coin_amount']) + action.data;

            return {
                ...state,
                profileData: newData
            } 
        default:
            return state
    }
}