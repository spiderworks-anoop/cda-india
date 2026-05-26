import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Sec1 from '../../public/images/sec1.svg'
import {
  BlueBtn,
  Bluecircleicon,
  CircleArrowicon,
  CurveLargeArrowicon,
  Eye2icon,
  Eyeicon,
  WhiteBtn
} from '../common/svgicon'
import Noise from '../common/Noise'
import Popup from '../common/Popup'

 

const SerDetSectors = ({data}) => {

   const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <>

    {data?.explore_sectors_list?.length > 0 && (
<>


               {
    isPopupOpen && 
  <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
  }

<section className='ser-det-sector pt-[50px] pb-[50px] '>
<div className='container relative z-[1]'>
  <div className='sector_bg'>
    <div className='md:flex items-center justify-between'>
      <div className='max-w-[550px]'>
        <h3> {data?.content?.title_5}  </h3>
        <h5>  {data?.content?.short_title_5}</h5>   
      </div>

      <div className='hidden md:block'>
        <a onClick={() => setPopupOpen(true)} className='cursor-pointer'>
        <BlueBtn btntext={data?.content?.button_text_5} /></a>
      </div>
    </div>

    <div className='grid md:grid-cols-3 xl:grid-cols-3 mt-[58px] gap-[65px] md:gap-[37px]'>

 

    {data?.explore_sectors_list?.map((section , index) => (
          <motion.div key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }} className='sect_list'>
         
          <Image
  src={section?.icon_image?.file_path || Sec1}
  alt={section?.icon_image?.alt_text  || ''}
  width={32}
  height={32}
/>

          <h4>{section?.title}</h4> 
          <p>{section?.short_description}</p>
          </motion.div> 
      ))}


     

    </div>


    <div className='md:hidden mt-[60px]'>
        <BlueBtn btntext={'Contact Us'} />
      </div>


  </div>
</div>
</section>


</>
    )}
    

    </>
  )
}

export default SerDetSectors
