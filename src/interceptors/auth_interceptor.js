export default function authConfig(Vue) {    
    Vue.http.interceptors.push((request, next) => {
        var token, headers;
        token = sessionStorage.getItem('jwt_token');
        headers = request.headers || (request.headers = {});        
        if (token !== null && token !== 'undefined') {                       
            request.headers.set('Authorization', 'Bearer ' + token);           
        } 
        next((response) => {
            if (response.status && response.status.code === 401) {
                sessionStorage.removeItem('jwt_token');
            }
            if (response.headers && response.headers.Authorization) {
                sessionStorage.setItem('jwt_token', response.headers.Authorization);              
            }
            if (response.entity && response.entity.token && response.entity.token.length > 10) {
                sessionStorage.setItem('jwt_token', 'Bearer ' + response.entity.token);                
            }
            return response;
        })
    });
}