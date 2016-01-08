# Connect Cache Control Middleware

A Connect/Express middleware for consistently setting Cache-Control headers


## Installing

`npm i --save connect-cache-control-middleware`


## Usage

```
var cacheControlMiddleware = require('connect-cache-control-middleware');

// creates a middleware instance that prevents caching
var preventCaching = cacheControlMiddleware.create();

// creates a middleware instance that caches routes
var allowCaching = cacheControlMiddleware.create({
	maxAge: 600,
	staleWhileRevalidate: 86400
});

app.get('/dont-cache-me', [preventCaching], someHandlerFunction);
app.use(allowCaching);
```


## API

### `cacheControlMiddleware.create([cacheControlConfig])`

Returns a new instance of the middleware handler which can be passed to Connect.

If `cacheControlConfig` is omitted, then the middleware sets the following headers on each request:

* `Cache-Control: 'no-cache, no-store, must-revalidate'`
* `User-Cache-Control: 'no-cache, no-store, must-revalidate'`
* `Pragma: 'no-cache'`
* `Expires: '0'`

Otherwise, it will set `Cache-Control` and `User-Cache-Control` to:
	
* `max-age=<cacheControlConfig.maxAge>`
* `stale-while-revalidate=<cacheControlConfig.staleWhileRevalidate>`

### `cacheControlMiddleware.buildCacheControlHeader(cacheControlConfig)`

A helper function, used internally, to consistently build `Cache-Control` headers. This is exposed publicly if one requires to set headers outside of the middleware chain e.g. `express-remote-handlebars`.

As with the `create` method, `cacheControlConfig` should be an object exposing respective `maxAge` and `staleWhileRevalidate` properties.

This method returns a `String`.


## Unit tests

* `npm i`
* `npm test`

## Releasing

* Bump version number in `package.json` (semver please!)
* `git tag version-<version number>`
* `git push origin --tags`