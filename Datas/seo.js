// One switch for the whole location module.
//
// While this is false the location pages ship a robots noindex and their
// sitemaps are withheld: /sitemap does not list them and the sitemap routes
// themselves 404. Flipping it to true lifts both at once, so a sitemap can
// never end up advertising a page that tells crawlers to stay away.
//
// Read by:
//   pages/[slug]/index.js            the city pages
//   pages/[slug]/[child].js          the services under a city
//   pages/sitemap/index.js           the sitemap index
//   pages/sitemap/locations.js       the city URLs
//   pages/sitemap/location-pages.js  index of the per-city sitemaps
//   pages/sitemap/[city].js          one city's service URLs
export const LOCATION_PAGES_INDEXABLE = true
