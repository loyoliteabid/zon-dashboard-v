/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";

import {
  HttpClientResponse,
  HttpMethod,
  HttpResponseData,
} from "../definitions/datatypes";
import { REACT_APP_SERVER_URL } from "../configs";

export const useHttpClient = (): HttpClientResponse<HttpResponseData> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(
    async (
      url: string,
      method: HttpMethod = "GET",
      body: any = null,
      headers: Record<string, string> = {}
    ) => {
      setIsLoading(true);

      try {
        const response = await fetch(`${REACT_APP_SERVER_URL}${url}`, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
