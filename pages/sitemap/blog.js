import { SlugList } from "@/Datas/endpoints/SlugList";


//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

const today = new Date();
const formattedDate = `${today.toISOString().slice(0, 19)}+00:00`

function generateSiteMap(baseUrl, posts) {
  // console.log(baseUrl);
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
      .map((obj) => {
        return `
       <url>
       <loc>${baseUrl}/e-mag${obj?.url == 'index' ? '' : '/' + obj?.slug}</loc>
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
  // We make an API call to gather the URLs for our site
  const request = await SlugList.blog();
  // console.log(request.data);
  const posts = await request?.data

  // req.headers['x-forwarded-proto'] ||
  const protocol =  'https';
  const host = req.headers['host'];

  const baseUrl = `${protocol}://${host}`;
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(baseUrl, posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: { data: request?.data },
  };
}

export default SiteMap;


//  <url>
//      <loc>${`${EXTERNAL_DATA_URL}/${obj?.url}`}</loc>
//  </url>