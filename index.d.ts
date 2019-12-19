export type Method =
	| 'GET'
	| 'DELETE'
	| 'HEAD'
	| 'OPTIONS'
	| 'POST'
	| 'PUT'
	| 'PATCH'
	| 'JSONP';

export type ResponseType =
	| 'arraybuffer'
	| 'blob'
	| 'document'
	| 'json'
	| 'text'
	| 'stream';

export type Mode = 'same-origin' | 'no-cors' | 'cors';

export type Credentials = 'include' | 'same-origin' | 'omit';

export type Redirect = 'follow' | 'error' | 'manual';

export interface FetchsConfig {
	url?: string;
	method?: Method;
	baseURL?: string;
	dataType?: ResponseType;
	origin?: string;
	mode?: Mode;
	credentials?: Credentials;
	redirect?: Redirect;
	headers?: object;
	timeout?: number;
	cache?: boolean;
	data?: any;
}

export interface FetchsResponse<T = any> {
	data: T;
	status: number;
	statusText: string;
	headers: any;
	config: FetchsConfig;
	request?: any;
}

export interface FetchsInterceptor<V> {
	use(
		onFulfilled?: (value: V) => V | Promise<V>,
		onRejected?: (error: any) => any
	): number;
	eject(id: number): void;
}

export interface FetchsPromise<T = any> extends Promise<FetchsResponse<T>> { }

export interface FetchsInstance {
	(config: FetchsConfig): FetchsPromise;
	defaults: FetchsConfig;
	interceptors: {
		request: FetchsInterceptor<FetchsConfig>;
		response: FetchsInterceptor<FetchsResponse>;
	};
	request(config: FetchsConfig): Promise<FetchsResponse>;
	get(url: string, config?: FetchsConfig): Promise<FetchsResponse>;
	post(
		url: string,
		data?: object,
		config?: FetchsConfig
	): Promise<FetchsResponse>;
	jsonp(url: string, config?: FetchsConfig): Promise<FetchsResponse>;
}

export interface FetchsStatic extends FetchsInstance {
	create(config?: FetchsConfig): FetchsInstance;
	all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
	race<T>(values: (T | Promise<T>)[]): Promise<T[]>;
}

declare const Fetchs: FetchsStatic;

export default Fetchs;
