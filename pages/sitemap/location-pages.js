import { SlugList } from "@/Datas/endpoints/SlugList";
import { LOCATION_PAGES_INDEXABLE } from "@/Datas/seo";

//pages/sitemap.xml.js

const today = new Date();
const formattedDate = `${today.toISOString().slice(0, 19)}+00:00`

function generateSiteMap(baseUrl, citySlugs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${citySlugs
    .map((slug) => {
      return `
      <sitemap>
       <loc>${baseUrl}/sitemap/${slug}</loc>
         <lastmod>${formattedDate}</lastmod>

     </sitemap>
   `;
    })
    .join('')}
 </sitemapindex>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

// Points at one sitemap per city rather than listing the service URLs itself,
// so /sitemap/calicut carries the services under /calicut. The city URLs
// themselves belong to /sitemap/locations.
export async function getServerSideProps({ req, res }) {
  try {
    // Withheld while the location pages are noindexed - see Datas/seo.js.
    if (!LOCATION_PAGES_INDEXABLE) {
      return { notFound: true };
    }

    const request = await SlugList.locations();

    // This endpoint answers with a bare array, not the usual { data: [...] }.
    const cities = Array.isArray(request?.data) ? request?.data : [];
    const citySlugs = cities.map(city => city?.slug).filter(Boolean);

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['host'];
    const baseUrl = `${protocol}://${host}`;

    const sitemap = generateSiteMap(baseUrl, citySlugs);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: { data: citySlugs },
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
