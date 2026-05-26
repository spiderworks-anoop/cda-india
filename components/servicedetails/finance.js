import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Ser2 from '../../public/images/serdet2.png';
import { BlueBtn, Bluecircleicon, CircleArrowicon, CurveLargeArrowicon, WhiteBtn } from '../common/svgicon';
import Noise from '../common/Noise';
import Link from 'next/link';

const SerDetFinance = ({data}) => {
  return (
   
      <section className='ser-det-finance  '>



 
       
        <div className='container relative z-[1]'>
          <div className='grid md:grid-cols-2 gap-[15px]'>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }}
            className='md:flex justify-center items-center'>
              <div className='max-w-[610px]'>
               
                <h4 dangerouslySetInnerHTML={{__html:data?.content?.title_2}}/>  


                <div className=' pt-[25] pb-[55px] md:hidden'>
            <Image src={data?.content?.media_id_2?.file_path} alt='' width={1920} height={773} />
            </div>
                
                <p dangerouslySetInnerHTML={{__html:data?.content?.description_2}}/> 
                <Link href={`/contact-us`}><BlueBtn btntext={data?.content?.button_text_2}/> </Link>
              </div>
          
         
              
            </motion.div>


            <div className='hidden md:block'>
            <Image src={data?.content?.media_id_2?.file_path} alt='' width={1920} height={773} />
            </div>

           
           
           
          </div>
        </div>
 
      </section>
    
  );
};

export default SerDetFinance;
