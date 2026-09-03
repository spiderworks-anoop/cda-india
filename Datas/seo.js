// One switch for the location module's sitemaps.
//
// While this is false the location URLs are withheld from the sitemap:
// /sitemap does not list them and the sitemap routes themselves 404. Flipping
// it to true publishes both.
//
// The pages' own robots directive is no longer tied to this - components/layout/Seo.js
// holds the whole site out of the index, location pages included - so a sitemap
// here can never end up advertising a page that tells crawlers to stay away.
//
// Read by:
//   pages/sitemap/index.js           the sitemap index
//   pages/sitemap/locations.js       the city URLs
//   pages/sitemap/location-pages.js  index of the per-city sitemaps
//   pages/sitemap/[city].js          one city's service URLs
export const LOCATION_PAGES_INDEXABLE = false
