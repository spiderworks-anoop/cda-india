import { useEffect, useState } from 'react'
import Image from 'next/image'
import Map1 from '../../public/images/Map.png'
import Map2 from '../../public/images/falg2.png'

import { MapDot1icon } from '../common/svgicon';


import CountUp from '../../components/common/Count'




const Associates = ({associateTitle, associateSubTitle, satisfiedClientsCount, satisfiedClients, associateLocations, experienceCount, experienceText, sectorCount, sectorText }) => {

    const associateLocationsstyle = [
        { right: '27%', top: '45%'},
        { right: '34%', top: '30%' },
        { left: '60%', top: '41%' },
        { left: '62%', top: '36%' },
        { right: '34%', top: '42%' },
        { left: '46%', top: '15%' },
        { right: '18%', bottom: '42%' },

        
      ];
      
    
  return (
    <section className='home-associates' data-aos="fade-up">
      <div className='container' data-aos="fade-up">
      
        <h3>  {associateTitle} </h3>
        <h5> {associateSubTitle} </h5>
        

        <div className='max-w-[300px] md:max-w-[910px] mx-auto relative associates_cntr'>
  <Image src={Map1} alt='' width={910} height={315} />

  {associateLocations&&associateLocations.map((loc, index) => (
    <div
      key={index}
      className='absolute cursor-pointer associates_list'
      style={associateLocationsstyle[index]}
    >
      <MapDot1icon />
      <div className='absolute left-[-36px] md:left-0 top-[100%] bg-white p-[10px] rounded-[15px] associates_list_opt'>
        { loc?.media_id?.file_path && <Image src={loc?.media_id?.file_path} alt='' width={910} height={315} />

        }
        
        <h4 dangerouslySetInnerHTML={{__html:loc?.title}}/>  
      </div>
    </div>
  ))}
</div>


<div className='associates_count'>

    <div className='grid md:grid-cols-3 gap-[25px] md:gap-[0] max-w-[300px] md:max-w-[unset] mx-auto'>

        <div className='border-r-0 md:border-r-1 border-dashed border-[#fff] flex items-center justify-center gap-[35px] pr-[10px]'> 
            <h4><CountUp
  from={0}
  to={satisfiedClientsCount}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>
 +</h4>
            <p>{satisfiedClients}</p> 
        </div>

        <div className='px-[10px] py-[25px] border-b md:border-b-0 border-t md:border-t-0 border-r-0 md:border-r border-dashed border-[#fff] flex items-center justify-center gap-[35px]'> 
            <h4><CountUp
  from={0}
  to={experienceCount}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/> </h4>
            <p>{experienceText}</p> 
        </div>


        <div className='flex items-center justify-center gap-[35px]  pl-[10px]'> 
            <h4><CountUp
  from={0}
  to={sectorCount}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>+ </h4>
            <p> {sectorText}</p> 
        </div>

    </div>


</div>
      

      </div>
    </section>
  )
}

export default Associates
