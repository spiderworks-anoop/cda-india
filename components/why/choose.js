import { useState } from 'react';
import { BlueBtn, Quateicon } from '../common/svgicon';
import Accordion from '../common/Accordion';
import Why1 from '../../public/images/why.jpg' 
import Image from 'next/image';


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Whychoose = ({data}) => {

 

  return (
   <div className='why_choose_cntr pt-[80px] pb-[80px]'> 
     <div className='container'>

        <h3> {data?.content?.title_2}</h3>

        <div className='why_choose md:flex items-center'>

            <div className='max-w-[750px] w-[100%] md:pr-[50px] border-b md:border-b-0 md:border-r border-[#F0D7BD] pt-[20px] pb-[20px]'>

              <div dangerouslySetInnerHTML={{__html:data?.content?.description_2}}/>
                 

                       <ul className='grid grid-cols-2 gap-[25px]'>


                           {data?.content?.why_choose_cda_listing_id?.map((obj, index) => (
                                          
                                          
                                         
                                         <li key={index}> {obj?.title} </li>
                                           
                                        ))}
                        
 
 
                        

                       </ul>
 
            </div>

            <div className='md:w-[45%] md:pl-[25px] pt-[30px]   pb-[30px]  '>


                <div className='mx-auto max-w-[400px]'>


                <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }} 
        modules={[Pagination]}
        className="mySwiper"
      >

 

{data?.related_function?.testimonial?.map((obj, index) => (

                                          <SwiperSlide key={index}> 
                                         
                                          <div className='text_testimonials'>
                                              <Quateicon/>
                                              <h5> {obj?.comment} </h5> 
                                                  <h4>{obj?.name} </h4>  
                                                  <span>{obj?.designation}</span>
 
                              
                                          </div>
                                      </SwiperSlide>


                                            
                                         ))}


     


     


      





      </Swiper>
 
                </div>

            </div>

        </div>

 
  


     </div>
 

   </div>
  );
};

export default Whychoose;
