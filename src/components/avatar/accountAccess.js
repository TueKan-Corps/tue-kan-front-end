/*
    .add in 10-Apr-20
        -- add accountAccess to getAccountId, setAccountId and clearAccountId.
*/

const accountAccess =()=> {    
    
    /// create static variable name 'accountId'.
    /// 36 is temp guest account id.
    let isFirstTime = accountAccess.accountId === 36;  

    const setAccountId =(id)=> {
        if (isFirstTime === true) 
            accountAccess.accountId = id; 
    }

    const getAccountId =()=> { 
        return accountAccess.accountId;
    }

    /// cleatAccountId => set accountId to 36 (guest account id).
    const clearAccountId =()=> {
        accountAccess.accountId = 36;
    }

    return {
        setAccountId: setAccountId,
        getAccountId: getAccountId,
        clearAccountId: clearAccountId
    };
}

export default accountAccess;