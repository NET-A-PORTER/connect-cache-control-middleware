'use strict';

module.exports = {
	buildCacheControlHeader: function buildCacheControlHeader(cacheControl) {
		var maxAge = cacheControl.maxAge;
		var staleWhileRevalidate = cacheControl.staleWhileRevalidate;

		return 'max-age=' + maxAge + ', stale-while-revalidate=' + staleWhileRevalidate;
	}

	create: function create(cacheControl) {
		var cacheControlHeader;

		return function (req, res, next) {
			if (!cacheControl) {
				res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
				res.header('User-Cache-Control', 'no-cache, no-store, must-revalidate');
				res.header('Pragma', 'no-cache');
				res.header('Expires', '0');
			} else {
				cacheControlHeader = this.buildCacheHeader(cacheControl);

				res.header('Cache-Control', cacheControlHeader);
				res.header('User-Cache-Control', cacheControlHeader);
			}

			next();
		};
	}
};