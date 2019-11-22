import config from '../config';

const tokenService = {
    saveToken(token) {
        window.localStorage.setItem(config.JWT_TOKEN, token)
    },
    getToken() {
        return window.localStorage.getItem(config.JWT_TOKEN);
    },
    clearToken() {
        window.localStorage.removeItem(config.JWT_TOKEN);
    },
    hasToken() {
        return !!tokenService.getToken();
    }
};

export default tokenService;