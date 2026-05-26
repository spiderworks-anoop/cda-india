import { useState } from 'react';
import { BlueBtn } from '../common/svgicon';
import Accordion from '../common/Accordion';
import Tm1 from '../../public/images/tm1.jpg' 
import Image from 'next/image';

const Teamlist = ({manImg, manName, manDesig,  }) => {
 

  return (
   <div className='teamlist'>
     <Image src={manImg} alt='' width={450} height={550}  />
     <div className="teamlist-cap">
        <h4 className="name"><a href="#"> { manName }</a></h4>
        <span className="designation"> {manDesig}</span>                     
    </div>

   </div>
  );
};

export default Teamlist;
