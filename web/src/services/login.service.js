export function loginAs(userId){
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('loggedAs', userId);
    localStorage.setItem('loggedWhen', JSON.stringify(new Date()));
}

export function logout(){
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('loggedAs');
}

export function isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn')) ?? false;
}

export function loggedAs() {
    return localStorage.getItem('loggedAs');
}
