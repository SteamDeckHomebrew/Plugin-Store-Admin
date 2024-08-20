import { fetchUtils } from 'react-admin';
import { apiUrl } from "./pluginDataProvider";

const httpClient = fetchUtils.fetchJson;

let lastToken;
let lastCheckResult;

const authProvider = {
    // called when the user attempts to log in
    login: ({ key }) => {
        localStorage.setItem('key', key);
        return authProvider.checkAuth();
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('key');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('key');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: async () => {
        if (lastToken === authProvider.getAuth()) {
            if (lastCheckResult) return true;
            throw new Error("Unauthorized")
        }
        lastToken = authProvider.getAuth();
        const res = await httpClient(`${apiUrl}/__auth`, {
            method: 'POST',
            headers: new Headers({
                "Authorization": authProvider.getAuth()
            })
        })
        lastCheckResult = res.status !== 401 && res.status !== 403;
        if (!lastCheckResult) throw new Error("Unauthorized");
        return res;
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
    getAuth: () => localStorage.getItem('key')
};

export default authProvider;
