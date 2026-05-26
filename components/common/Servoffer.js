import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Ser1 from '../../public/images/ser2.png'
import Ser2 from '../../public/images/ser3.png'
import Ser3 from '../../public/images/ser4.png'
import Ser4 from '../../public/images/ser5.png'
import { CircleArrowicon, CurveLargeArrowicon, LoadBtn, LongArrowicon } from './svgicon'
import Link from 'next/link'

 

const SerOffer = ({ IsServiceDetails, shorttitle, title, discription, listdata }) => {

  return (

  
    <>

    
      
    {listdata?.length > 0 &&  <section className='ser-offer-sec pt-[100px] pb-[50px] md:pb-[100px] '>
        <div className='container  '>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className='flex flex-col md:flex-row gap-[25px] md:gap-[10px] items-end justify-between ser-offer-head  '
          >
            <div>
              <div className='max-w-[528px]'>
                <h5> {shorttitle}</h5>
                <h2> {title}
                  
                </h2>
              </div>
            </div>

            <div>
              <div className='max-w-[506px]'>
                <p dangerouslySetInnerHTML={{__html:discription}}/> 
                 
              </div>
            </div>
          </motion.div>

          <hr />

          <div>
            {listdata?.map((service, index) => (  
              <Link href={`/services/${service?.slug}`} 
                key={index}
                className={`ser-offer-list flex flex-col md:flex-row items-center  ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } gap-[40px] md:gap-[20px] lg:gap-[40px]`}
              >
                <div className='flex items-center gap-[40px] md:gap-[20px] lg:gap-[40px]'>
                  <h5>{index + 1}</h5>
                  <Image src={service?.featured_image?.file_path} alt='' width={633} height={633} unoptimized/>
                </div>

                <p>{service?.short_description}</p>

                <div className='w-full md:max-w-[225px] flex items-center justify-between md:block'>
                  <h3>{service?.title}</h3>
                  <Link href={`/services/${service?.slug}`} className='btn flex items-center gap-[10px]'>
                    View Service{console.log("ser", service?.slug)} <LongArrowicon />
                  </Link>
                </div>
              </Link>
            ))}
          </div>


          <>
        
{listdata?.children?.length > 3 && (
<>

{IsServiceDetails && <div className='flex justify-center pt-[30px]'> <a href='#' className='cursor-pointer'> <LoadBtn loadtext={"Load More"}/>  </a> </div>}
          
</>
 
)}
          
</>          


        </div>
      </section>}
    </>
    
  )
}

export default SerOffer
