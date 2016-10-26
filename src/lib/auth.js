const LOGIN_URL = 'login';
const LOGOUT_URL = 'logout';

export default {

    user: null,

    authenticated: false,

    login(context, creds) {

        return new Promise(function (resolve, reject) {
            let error_result = {flag: false, msg: "登陆失败"};
            context.$http.post(LOGIN_URL, creds).then((result) => {
                let data = result.data;
                if (data.flag === true) {
                    sessionStorage.setItem('jwt_token', data.jwt_token);
                    sessionStorage.setItem('jwt_user', JSON.stringify(data.data));
                    this.authenticated = true;
                    this.user = data.data;
                    resolve(result);
                } else {                  
                    reject(data);
                }

            }, (error) => {
                reject(error_result);
            });

        }.bind(this));

    },

    logout(context) {

        return new Promise(function (resolve, reject) {

            context.$http.post(LOGOUT_URL).then((result)=> {
                let data = result.data;
                if (data.flag === true) {
                    sessionStorage.removeItem('jwt_token');
                    sessionStorage.removeItem('jwt_user');
                    this.authenticated = false;
                    this.user = null;
                    resolve();
                } else {
                    reject();
                }
            }, (error)=> {
                reject(error);
            });

        }.bind(this));

    },

    checkAuth() {
        let jwt = sessionStorage.getItem('jwt_token');
        if (jwt) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
    },

    getToken() {
        return sessionStorage.getItem('jwt_token');
    }
};
