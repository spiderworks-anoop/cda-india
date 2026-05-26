import { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo1 from '../../public/images/logo.svg'

import Logo2 from '../../public/images/cl1.png'
import Logo3 from '../../public/images/cl2.png'
import Logo4 from '../../public/images/cl3.png'
import Logo5 from '../../public/images/cl4.png'





import { BlueBtn, LargeArrowicon, Lineicon, Medalicon } from '../common/svgicon'
import Accordion from '../common/Accordion'
import BlogListitems from './bloglist'

 

const BlogList = ({data}) => {


  
  return (
    <section className=' pt-[20px] md:pt-[80px] pb-[80px]'>
      <div className='container  '>


        <div className=' grid md:grid-cols-3 gap-[35px]'>

        
          {
            data?.map((item, index) =>(
    <BlogListitems key={index} title={item?.title} time={item?.published_by?.name} imgSrc={item?.featured_image?.file_path} date={item?.published_on} link={item?.slug}/> 
  

              
            )) }
          
        
 



   

        </div>

 
       

        


        


 
 

      </div>
    </section>
  )
}

export default BlogList
