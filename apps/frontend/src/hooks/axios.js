import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "./storage";
import { config } from "../config";

// Used for network requests
export const useAxios = ({ url, method, data }) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { token, clearAll } = useLocalStorage();
    const { push } = useHistory();

    const redirect = () => {
        clearAll();
        push("/sign-in");
    };

    useEffect(() => {
        if (error && error.status === 401) redirect();
    }, [error]);

    const createRequest = (parameters) => {
        const { method, data, authToken, params, options } = parameters;
        return async (executeData) => {
            setLoading(true);
            setError("");
            const payload = data || executeData;
            const accessToken = authToken || token;

            if (!payload && ["post", "put", "delete"].includes(method)) {
                setError("Need to provide data");
                return;
            }

            try {
                const result = await axios.request({
                    url: parameters.url || url,
                    method,
                    params,
                    data: payload,
                    headers: { Authorization: `Bearer ${accessToken}` },
                    baseURL: config.apiUrl,
                    ...options,
                });
                setResponse(result.data);
            } catch (error) {
                setError(error.response);
            } finally {
                setLoading(false);
            }
        };
    };

    const resetState = () => {
        setError("");
        setResponse("");
    };

    return {
        response,
        error,
        loading,
        resetState,
        execute: createRequest({ url, method, data }),
        executeWithData: createRequest({ url, method }),
        executeWithParameters: (params) => createRequest({ ...params }),
        createRequest,
    };
};
