import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Ser1 from '../../public/images/ser6.png' 
import { BlueBtn, CircleArrow2icon, CircleArrowicon, CurveLargeArrowicon, LargeArrowicon, LongArrowicon, UpArrowicon } from '../common/svgicon' 
import Link from 'next/link'

const SerSolution = ({soluVideo, soluHead }) => {
  return (
    <>
      <section className=' pt-[85px] pb-[85px] '>
      
        <div className='container  '>  

            <div className='ser-solution md:flex md:flex-row-reverse items-center justify-between gap-[22px]'>

            <div>
                <video
        src={soluVideo} // Replace with your actual video file
        autoPlay
        loop
        muted
        playsInline 
         
      />
           
                </div>
                <motion.div  initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              viewport={{ once: true }} className='pt-[40px] md:pt-[0] pl-[40px] md:pl-[0]' >
                    <h4> {soluHead} </h4>
                   <Link href='/contact-us'> <LargeArrowicon/> </Link> 
                </motion.div>

                

            </div>


 
         
           
        </div>
      </section>
    </>
  )
}

export default SerSolution
