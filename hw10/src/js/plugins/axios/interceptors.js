const isTokenKey = "my_app_token";
// denis.m.pcspace@gmail.com dmgame12345
function setTokenOnLogin(res) {
    const isLoginUrl = res.config.url.includes('login');
    if (isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(isTokenKey, token);
    }
    return res;
}

function getCleanResponse(res) {
    return res.data;
}

function setToken(req) {
    console.log(req);
    const isAuthUrl = req.url.includes('auth');
    if (isAuthUrl) {
        const token = localStorage.getItem(isTokenKey);
        req.headers['x-access-token'] = token;
    }
    return req;
}

export default function (axios) {
    axios.interceptors.request.use(setToken);
    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getCleanResponse);
}