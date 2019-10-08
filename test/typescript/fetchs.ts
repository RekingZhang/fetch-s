import fetchs, { FetchsConfig, FetchsResponse, FetchsInstance } from '../../';

fetchs.interceptors.request.use(
    function(config: FetchsConfig) {
        // Do something before request is sent
        return config;
    },
    function(error: any) {
        // Do something with request error
        return Promise.reject(error);
    }
);

fetchs.interceptors.response.use(
    function(response: FetchsResponse) {
        // Do something with response data
        return response.data;
    },
    function(error: any) {
        // Do something with response error
        return Promise.reject(error);
    }
);
fetchs
    .request({
        method: 'GET',
        timeout: 23,
        credentials: 'include'
    })
    .then((response: FetchsResponse) => {
        response;
    });

fetchs.post('/user', {
    a: 1
});

fetchs.get('/user', {
    data: {
        a: 1
    }
});

fetchs.jsonp('/user', {
    cache: false,
    data: {
        a: 1
    }
});

const instance: FetchsInstance = fetchs.create({
    origin: 'https://www.example.com'
});

instance
    .get('/user?ID=12345')
    .then(function(response: FetchsConfig) {
        console.log(response);
    })
    .catch(function(error: any) {
        console.log(error);
    });
