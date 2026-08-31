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

// One sitemap per city: /sitemap/calicut lists the services that live under
// /calicut. The named sitemaps in this folder (blog, services, ...) are static
// files, so Next matches those first and only a real city slug reaches here.
export async function getServerSideProps({ req, res, params }) {
  try {
    // Withheld while the location pages are noindexed - see Datas/seo.js.
    if (!LOCATION_PAGES_INDEXABLE) {
      return { notFound: true };
    }

    const request = await SlugList.location_services({ slug: params?.city });

    // A city the CMS does not know answers 200 with { error: "Page not Found!" }
    // rather than a status code, so the shape is what decides here. Anything
    // that is not a list is not a city, and gets the 404 page.
    if (!Array.isArray(request?.data)) {
      return { notFound: true };
    }

    const paths = request?.data
      .map(service => service?.slug)
      .filter(Boolean)
      .map(slug => `${params?.city}/${slug}`);

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
