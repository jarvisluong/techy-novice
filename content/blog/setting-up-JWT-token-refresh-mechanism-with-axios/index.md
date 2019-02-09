---
title: 'Setting up JWT token refresh mechanism with axios'
date: '2019-01-14T05:26:22.392Z'
tags: ['how-to', 'javascript']
---

> This blog post requires the reader having knowledge in JWT authentication, and the [axios](https://github.com/axios/axios) HTTP library of Javascript

Authentication and security is one crucial part of an application. In a RESTful API service, authentication is provided with [JWT token](https://jwt.io/) as a popular solution. We can see this token in the header of API requests such as:

```
Authentication: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NjYwYmQifQ.-xN_h82PHVTCMA9vdoHrcZxH-x5mb11y1537t3rGzcM
```

Using the token will help the server to know who is requesting. It can be
dangerous if this token is stolen since the attacker can pretend to be the
victim
(as explained [here](https://security.stackexchange.com/questions/119371/is-refreshing-an-expired-jwt-token-a-good-strategy)).
That's why JWT token strategy can be strengthened by making it expired after
some duration, then a new one can be obtained by refreshing it. The lifetime of
a JWT token can be 30 minutes, 1 hour depends on the decision of the API server.
Example of JWT token refresh flow can be found in [this link](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)

Consuming APIs that use this authentication method will require handling the token refresh gracefully so that user experience is not affected. Imagine when a user is logged in, we save the JWT token and the refresh key to user's device, then we can allow that user to interact with your app. For a while after that, the JWT token is expired so all the API resources from that server will deny access (and we need to refresh the token before continuing the app flow). Therefore, handling the refresh flow on the background without affecting the app behavior is a critical requirement. This can be done with the [axios](https://github.com/axios/axios) library. What `axios` does is abstracting HTTP requests in different Javascript platforms (node, browser) so that we can have a unified way of making HTTP requests. `axios` also provide nice features such as [interceptor](https://github.com/axios/axios#interceptors), which is what we will be using to handle the token refresh flow .

Interceptors are the functions we provide for axios to run before a request is sent (request interceptor) or a response is received (response interceptor). In this case, we are interested in the response interceptor since the server will response an error to tell us to renew the JWT token, normally a 401-code error. By using the interceptor, we can handle the token refresh, then retry the request before sending the result back to the real function call. For example, we have an API service that requests user's profile data:

```javascript
// This will return a Promise
axios.get('https://example.com/me', {
  headers: {
    Authentication: 'Bearer <JWT token>',
  },
})
```

Normally, if the server returns an error response, the Promise will throw an error. However, when being fed with the interceptor that can refresh the JWT token, and retry the request afterward, we don't have to deal with the error mentioned above, and the request runs smoothly as normal. Let's start to the code!

First, I encourage to make a new `axios` instance, so that we don't pollute the global `axios` object:

```javascript
const customAxios = axios.create({
  ...yourConfig,
})
```

Then we register the response error interceptor:

```javascript
customAxios.interceptors.response.use(
  function(response) {
    // If the request succeeds, we don't have to do anything and just return the response
    return response
  },
  function(error) {
    const errorResponse = error.response
    if (isTokenExpiredError(errorResponse)) {
      return resetTokenAndReattemptRequest(error)
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error)
  }
)
function isTokenExpiredError(errorResponse) {
  // Your own logic to determine if the error is due to JWT token expired returns a boolean value
}
```

Then we continue to implement the `resetTokenAndReattemptRequest` function:

```javascript
let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

function resetTokenAndReattemptRequest(error) {
  try {
    const { response: errorResponse } = error;
    const resetToken = await TokenUtils.getResetToken(); // Your own mechanism to get the refresh token to refresh the JWT token
    if (!resetToken) {
      // We can't refresh, throw the error anyway
      return Promise.reject(error);
    }
    /* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise(resolve => {
    /* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
      addSubscriber(access_token => {
        errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const response = await axios({
        method: 'post',
        url: `<YOUR TOKEN REFREH ENDPOINT>`,
        data: {
          token: resetToken // Just an example, your case may vary
        }
      });
      if (!response.data) {
        return Promise.reject(error);
      }
      const newToken = response.data.token;
      TokenUtils.saveRefreshToken(newToken); // save the newly refreshed token for other requests to use
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(newToken);
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(access_token) {
	// When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach(callback => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

```

Please let me know if there are any confusions you have in mind so that I can
update this blog post. To discuss about this post, you can click to the `Discuss On Twitter` link below and tweet a reply to me :). You can also suggest an edit
to improve this post directly by clicking `Edit on Github` button below to
create a pull request!

Happy hacking!
