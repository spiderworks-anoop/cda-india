import { SlugList } from "@/Datas/endpoints/SlugList";

//pages/sitemap.xml.js

const today = new Date();
const formattedDate = `${today.toISOString().slice(0, 19)}+00:00`

function generateSiteMap(baseUrl, posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${posts
    .map((obj) => {
      return `
      <url>
       <loc>${baseUrl}/company/${obj?.slug}</loc>
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
    const request = await SlugList.company_pages();

    // This endpoint answers with a bare array, not the usual { data: [...] }.
    const posts = Array.isArray(request?.data) ? request?.data : [];

    // Every entry renders at /company/<slug>, so one without a slug would
    // put a bare /company/ in the sitemap - drop those instead.
    const sanitizedPosts = posts
      .map(post => ({ slug: post?.slug || null }))
      .filter(post => post.slug);

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['host'];
    const baseUrl = `${protocol}://${host}`;

    const sitemap = generateSiteMap(baseUrl, sanitizedPosts);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
      props: { data: sanitizedPosts },
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
