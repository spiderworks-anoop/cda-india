import { useState } from 'react';
import { BlueBtn, Quateicon } from '../common/svgicon';
import Accordion from '../common/Accordion';
import Dir1 from '../../public/images/dir.jpg' 
import Image from 'next/image';

const DMessage = ({data}) => {
 

  return (
   <div className='director-messages'> 
     <div className='max-w-[1050px] mx-auto pl-[15px] pr-[15px]'>

    <div className='flec justify-center'>
    <Quateicon/> </div> 

        <h2> {data?.content?.title_1} </h2>

        <div className='flex flex-col md:flex-row items-center md:gap-[30px] lg:gap-[70px]'>

            <div className='max-w-[466px] w-full flex justify-center'>
                <div>
                <Image src={Dir1} alt='' width={450} height={550}  />
                <h4> {data?.content?.name} </h4>
                <h5> {data?.content?.designation}</h5>
                </div>
               
            </div>


            <div className='mt-[25px] md:mt-[0] md:w-[80%]'>
              
                <p dangerouslySetInnerHTML={{__html:data?.content?.description_2}}/>   
                
            </div>

        </div>



     </div>
 

   </div>
  );
};

export default DMessage;
