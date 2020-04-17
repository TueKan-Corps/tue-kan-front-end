
export const setProfile =(data = {})=> ({
    type: 'SET_PROFILE',
    data
})

export const setLoading =(data = false)=> ({
    type: 'SET_LOADING',
    data
})

export const setStatus =(data = 'user')=> ({
    type: 'SET_STATUS',
    data
})

export const coinOps =(data = 0, isAdd = true)=> ({
    type: 'COIN_OPS',
    data,
    isAdd
}) 