import API from "../index.ts";

// NOTE: a 401 wrong-password response will trigger the global 401 interceptor
// (redirect to /login + removeItem). This is expected behaviour for the shared instance.
// TODO: move JWT to HttpOnly cookie and add token-refresh mechanism (deferred).
export const fetchToken = async (email: string, password: string) => {
    const response = await API.post('/auth/login',
        {
            "email": email,
            "password": password
        }
    );
    return response.data;
};