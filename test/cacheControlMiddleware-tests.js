'use strict';

var cacheControlMiddleware = require('../index');

describe('the cache control middleware', function () {
	describe('the create method', function () {
    	var expressResponse = { header: function () {} };
    	var next = function() { };
    	var mockResponse;

    	beforeEach(function () {
    		mockResponse = sinon.mock(expressResponse);
    	});

    	afterEach(function () {
    		mockResponse.restore();
    	});

		it('should create a middleware function that prevents caching', function () {
			var preventCaching = cacheControlMiddleware.create();
			var expectedCacheControlHeader = 'no-cache, no-store, must-revalidate';
			
			mockResponse.expects('header').once().withArgs('Cache-Control', expectedCacheControlHeader);
			mockResponse.expects('header').once().withArgs('User-Cache-Control', expectedCacheControlHeader);
			mockResponse.expects('header').once().withArgs('Pragma', 'no-cache');
			mockResponse.expects('header').once().withArgs('Expires', '0');

			preventCaching(null, expressResponse, next);

			mockResponse.verify();
		});

		it('should create a middleware function that allows caching when a config is passed', function () {
			var cacheControlConfig = {
				maxAge: 600,
				staleWhileRevalidate: 86400
			};

			var allowCaching = cacheControlMiddleware.create(cacheControlConfig);
			var expectedCacheControlHeader = 'max-age=600, stale-while-revalidate=86400';
			
			mockResponse.expects('header').once().withArgs('Cache-Control', expectedCacheControlHeader);
			mockResponse.expects('header').once().withArgs('User-Cache-Control', expectedCacheControlHeader);

			allowCaching(null, expressResponse, next);

			mockResponse.verify();
		});
	});

	describe('the buildCacheControlHeader method', function () {
		it('should return a Cache-Control header value that prohibits caching', function () {
			var headerValue = cacheControlMiddleware.buildCacheControlHeader();

			expect(headerValue).to.equal('no-cache, no-store, must-revalidate');
		});

		it('should return a Cache-Control header value that permits caching when a config is passed', function () {
			var cacheControlConfig = {
				maxAge: 600,
				staleWhileRevalidate: 86400
			};

			var headerValue = cacheControlMiddleware.buildCacheControlHeader(cacheControlConfig);

			expect(headerValue).to.equal('max-age=600, stale-while-revalidate=86400');
		});
	});
});