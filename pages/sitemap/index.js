import { SlugList } from "@/Datas/endpoints/SlugList";
import { LOCATION_PAGES_INDEXABLE } from "@/Datas/seo";

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = "https://jsonplaceholder.typicode.com/posts";

const today = new Date();
const formattedDate = `${today.toISOString().slice(0, 19)}+00:00`;

// The location module is listed only once its pages are indexable - while the
// switch is off they carry a robots noindex, and submitting those would be
// reported as an error. See Datas/seo.js.
const locationSitemaps = (baseUrl) =>
  LOCATION_PAGES_INDEXABLE
    ? `  <sitemap>
      <loc>${baseUrl}/sitemap/locations</loc>
      <lastmod>${formattedDate}</lastmod>
  </sitemap>
  <sitemap>
      <loc>${baseUrl}/sitemap/location-pages</loc>
      <lastmod>${formattedDate}</lastmod>
  </sitemap>
`
    : "";

function generateSiteMap(baseUrl, posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <sitemap>
      <loc>${baseUrl}/sitemap/static-pages</loc>
      <lastmod>${formattedDate}</lastmod>
  </sitemap>   
  <sitemap>
      <loc>${baseUrl}/sitemap/blog</loc>
      <lastmod>${formattedDate}</lastmod>
  </sitemap>
  <sitemap>
      <loc>${baseUrl}/sitemap/services</loc>
      <lastmod>${formattedDate}</lastmod>
  </sitemap>
  <sitemap>
      <loc>${baseUrl}/sitemap/company-pages</loc>
      <lastmod>${formattedDate}</lastmod>
  </sitemap>
${locationSitemaps(baseUrl)}</sitemapindex>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ req, res }) {
  try {
    const request = {}
    const posts = request?.data || [];

    // Ensure no undefined values in the posts array
    const sanitizedPosts = "test";

    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["host"];
    const baseUrl = `${protocol}://${host}`;

    const sitemap = generateSiteMap(baseUrl, sanitizedPosts);

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
      props: { data: sanitizedPosts },
    };
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Fallback in case of error
    res.setHeader("Content-Type", "text/xml");
    res.write("");
    res.end();

    return {
      props: { data: [] },
    };
  }
}

export default SiteMap;
