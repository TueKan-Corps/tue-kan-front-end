/*
    .add in 10-Apr-20
        -- add accountAccess to getAccountId, setAccountId and clearAccountId.
    .edit in 11-Apr-20
        -- edit to use webbrowser cookies.
*/

import Cookies from 'universal-cookie';
  
const cookies = new Cookies();
const guestAccountId = 36;

const accountAccess =()=> {    
    
    /// create static variable name 'accountId'.
    /// 36 is temp guest account id. 

    if (typeof(cookies.get('account_id')) === 'undefined') {
        accountAccess.accountId = guestAccountId;
    } 

    const setAccountId =(id)=> {
        accountAccess.accountId = id;  
        cookies.set('account_id', id, { path: '/' });  
    }

    const getAccountId =()=> {   
        if (typeof (cookies.get('account_id')) !== 'undefined')
            accountAccess.accountId = cookies.get('account_id');

        /// if cookies is 'undefined' -> return guest account id (36).
        return accountAccess.accountId;
    }

    /// clearAccountId => set accountId to guest account id (36).
    const clearAccountId =()=> { 
        cookies.remove('account_id', { path: '/' });
    } 

    return {
        setAccountId: setAccountId,
        getAccountId: getAccountId,
        clearAccountId: clearAccountId
    };
}

export default accountAccess;