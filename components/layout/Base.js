import React, { useEffect } from 'react';
import Header from "@/components/layout/Header";
 import Footer from "@/components/layout/Footer";
import { useRouter } from 'next/router';
import SEO from './Seo';

const Base = ({ children, bottomContent, hideFooter, general, data }) => {
    const router = useRouter()

  
 

    return (
        <>
<SEO data={data} />

            <Header general={general}  /> 
             {children}
            <Footer general={general}  bottomContent={bottomContent} hideFooter={hideFooter } />   
        </>
    );
};

export default Base;