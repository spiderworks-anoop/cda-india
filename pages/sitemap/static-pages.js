import { SlugList } from "@/Datas/endpoints/SlugList";

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

// using static page instead of dynamic maping


{/*
  below <lastmod>
   <changefreq>daily</changefreq>
          <priority>1.0</priority> */}

const today = new Date();
const formattedDate = `${today.toISOString().slice(0, 19)}+00:00`

function generateSiteMap(baseUrl, posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${posts
    .map((obj) => {
  
      return `
      <url>
       <loc>${baseUrl}${obj?.slug == 'index' ? '' : '/' + obj?.slug}</loc>
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
    const request = await SlugList.index();
    const posts = request?.data || [];

    // Ensure no undefined values in the posts array
    const sanitizedPosts = posts.map(post => ({
      slug: post?.slug || null
    }));

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


//  <url>
//      <loc>${`${EXTERNAL_DATA_URL}/${obj?.url}`}</loc>
//  </url>