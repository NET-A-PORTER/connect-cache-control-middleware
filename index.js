'use strict';

module.exports = {
	buildCacheControlHeader: function buildCacheControlHeader(cacheControl) {
		var maxAge;
		var staleWhileRevalidate;

		if (!cacheControl) {
			return 'no-cache, no-store, must-revalidate';
		}

		maxAge = cacheControl.maxAge;
		staleWhileRevalidate = cacheControl.staleWhileRevalidate;

		return 'max-age=' + maxAge + ', stale-while-revalidate=' + staleWhileRevalidate;
	},

	create: function create(cacheControl) {
		var cacheControlHeader = this.buildCacheControlHeader(cacheControl);

		return function (req, res, next) {
			if (!cacheControl) {
				res.header('Pragma', 'no-cache');
				res.header('Expires', '0');
			}

			res.header('Cache-Control', cacheControlHeader);
			res.header('User-Cache-Control', cacheControlHeader);

			next();
		};
	}
};