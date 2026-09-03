import React, { useEffect } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from 'next/router';
import SEO from './Seo';

// The bottom content block sits at the top of the footer on every page, so it
// is rendered from here rather than remembered page by page. It defaults to the
// CMS fields carried on `data`; the two pages whose copy lives under different
// keys pass footerContentTitle/footerContentDiscription explicitly.
const Base = ({
    children,
    general,
    data,
    footerContentTitle,
    footerContentDiscription,
}) => {

    const router = useRouter()

    return (
        <>
            <SEO data={data} />

            <Header general={general} />
            {children}
            <Footer
                general={general}
                footerContentTitle={footerContentTitle ?? data?.h1_title}
                footerContentDiscription={
                    footerContentDiscription ?? data?.bottom_description
                }
            />
        </>
    );
};

export default Base;
