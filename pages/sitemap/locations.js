import { SlugList } from "@/Datas/endpoints/SlugList";
import { LOCATION_PAGES_INDEXABLE } from "@/Datas/seo";

//pages/sitemap.xml.js

const today = new Date();
const formattedDate = `${today.toISOString().slice(0, 19)}+00:00`

function generateSiteMap(baseUrl, paths) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${paths
    .map((path) => {
      return `
      <url>
       <loc>${baseUrl}/${path}</loc>
         <lastmod>${formattedDate}</lastmod>

     </url>
   `;
    })
    .join('')}
 </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ req, res }) {
  try {
    // Withheld while the location pages are noindexed - see Datas/seo.js.
    if (!LOCATION_PAGES_INDEXABLE) {
      return { notFound: true };
    }

    const request = await SlugList.locations();

    // This endpoint answers with a bare array, not the usual { data: [...] }.
    const cities = Array.isArray(request?.data) ? request?.data : [];

    // Cities only - the services nested under them are their own sitemap,
    // /sitemap/location-pages.
    const paths = cities.map(city => city?.slug).filter(Boolean);

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['host'];
    const baseUrl = `${protocol}://${host}`;

    const sitemap = generateSiteMap(baseUrl, paths);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: { data: paths },
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Fallback in case of error
    res.setHeader('Content-Type', 'text/xml');
    res.write('');
    res.end();

    return {
      props: { data: [] },
    };
  }
}

export default SiteMap;
