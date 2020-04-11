/*
    .add in 10-Apr-20
        -- add accountAccess to getAccountId, setAccountId and clearAccountId.
*/

import Cookies from 'universal-cookie';
  
const cookies = new Cookies();

const accountAccess =()=> {    
    
    /// create static variable name 'accountId'.
    /// 36 is temp guest account id. 

    if (typeof(cookies.get('account_id')) === 'undefined') {
        accountAccess.accountId = 36;
    } 

    const setAccountId =(id)=> {
        accountAccess.accountId = id;  
        cookies.set('account_id', id, { path: '/' }); 
        console.log('set cookies here');
        console.log(cookies.get('account_id'));
    }

    const getAccountId =()=> {   
        if (typeof (cookies.get('account_id')) !== 'undefined')
            accountAccess.accountId = cookies.get('account_id');

        return accountAccess.accountId;
    }

    /// cleatAccountId => set accountId to 36 (guest account id).
    const clearAccountId =()=> { 
        cookies.remove('account_id', { path: '/' });
    }

    const clearCookie =()=> {
        
    }

    return {
        setAccountId: setAccountId,
        getAccountId: getAccountId,
        clearAccountId: clearAccountId
    };
}

export default accountAccess;