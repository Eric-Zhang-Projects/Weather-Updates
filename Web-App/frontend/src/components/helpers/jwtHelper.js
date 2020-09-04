export const getJwt = () => {
    return localStorage.getItem('jwt');
}

export const isLoggedIn = () => {
    if (getJwt() == null){
        return false;
    }
    else{
        return true;
    }
}