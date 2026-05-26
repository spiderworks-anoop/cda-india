import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react'
import parse from 'html-react-parser';

function SEO({ data, settings }) {



    const router = useRouter();
    // const domain = typeof window !== "undefined" ? window.location.origin : ''
    const domain = process.env.NEXT_PUBLIC_FRONT_END_DOMAIN

    const canonicalPathname = router?.asPath.split('?')[0];

    const extrajs = parse(typeof data?.extra_js === 'string'
        ? data?.extra_js
        : '');

    return (
        <Head>
            <script dangerouslySetInnerHTML={{ __html: settings?.google_tag_manager_head }}>
            </script>
            <meta name="google-site-verification" content="dghu7IaS1_edNpNrqGVUwJKvGzPld5lFGJG5JD0y_QE" />
            <link rel="canonical" href={`${domain}${canonicalPathname == '/index' ? '' : canonicalPathname == '/' ? '' : canonicalPathname}`} />
            <link rel="icon" href={settings?.fav_icon} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />

            {
                data &&
                <>
                    {extrajs}
                    <title>{data?.browser_title || data?.title || data?.name}</title>
                    <meta name="keywords" content={data?.meta_keywords} />
                    <meta name="description" content={data?.meta_description} />

                    {/* Open Graph Meta Tags for Social Sharing */}
                    <meta property="og:title" content={data?.og_title || data?.browser_title} />
                    <meta property="og:description" content={data?.og_description || data?.meta_description} />
                    <meta property="og:image" content={data?.og_image?.file_path || data?.banner_image?.file_path} />
                    <meta property="og:image:alt" content={data?.og_image?.alt_text || 'Alt Text for Image'} />

                    <meta name="twitter:card" content={'summary_large_image'} />
                    <meta name="twitter:image:alt" content={data?.og_image?.alt_text || data?.banner_image?.alt_text || 'Alt Text for Image'} />
                    <meta name="twitter:title" content={data?.og_title ? data?.og_title : data?.browser_title} />
                    <meta name="twitter:description" content={data?.og_description ? data?.og_description : data?.meta_description} />
                    <meta name="twitter:image" content={data?.og_image?.file_path || data?.banner_image?.file_path}></meta>
                </>
            }
            <meta name="google-site-verification" content="bmPRZB5hkAHp9r73BCtvCuz9MTjs1m8YWseClrkgmM0" />
        </Head>
    )
}

export default SEO
