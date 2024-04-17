/* eslint-disable @typescript-eslint/no-explicit-any */
// Define TypeScript types

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Add other HTTP methods if needed
export type HttpResponseData = any; // Define a type for the response data if needed

export interface HttpClientResponse<T> {
  isLoading: boolean;
  error: Error | null;
  sendRequest: (
    url: string,
    method?: HttpMethod,
    body?: any,
    headers?: Record<string, string>
  ) => Promise<T>;
  clearError: () => void;
}

export interface Category {
  id: string;
  name: string;
  imageSrc: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  postedOn: Date;
  imageSrc?: string;
  showroom?: string;
  trim?: string;
  year?: number;
  kilometers?: number;
  regionalSpecs?: string;
  doors?: number;
  bodyType?: string;
  sellerType?: string;
  transmissionType?: string;
  horsepower?: number;
  numberOfCylinders?: number;
  warranty?: boolean;
  exteriorColor?: string;
  interiorColor?: string;
  targetMarket?: string;
  tags?: string[];
}
