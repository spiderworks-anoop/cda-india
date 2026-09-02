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
import { HTMLParser } from '@/utils/HTMLParser';

const Whychoose = ({ data }) => {

  const testimonials = data?.related_function?.testimonial ?? [];
  const hasTestimonials = testimonials.length > 0;

  const list = data?.content?.why_choose_cda_listing_id ?? [];
  const hasList = list.length > 0;

  // With testimonials the list sits under the copy in the left column. Without
  // them it takes over the right column, so the card keeps its two column
  // shape and the divider still has something to divide.
  const listMarkup = hasList && (
    <ul
      className={hasTestimonials
        ? 'grid grid-cols-2 gap-[25px]'
        : 'grid grid-cols-1 md:grid-cols-2 gap-[14px] why_choose_list'}
    >
      {list.map((obj, index) => (
        <li key={index}> {obj?.title} </li>
      ))}
    </ul>
  );

  // Nothing to put on the right at all - drop the column and the divider.
  const hasRightColumn = hasTestimonials || hasList;

  return (
    <div className='why_choose_cntr pt-[80px] pb-[80px]'>
      <div className='container'>

        <h3> {data?.content?.title_2}</h3>

        <div className='why_choose md:flex items-center'>

          <div
            className={`w-[100%] pt-[20px] pb-[20px] ${hasRightColumn
              ? 'max-w-[750px] md:pr-[50px] border-b md:border-b-0 md:border-r border-[#F0D7BD]'
              : 'max-w-full'
              }`}
          >

            <div>{HTMLParser(data?.content?.description_2)}</div>

            {hasTestimonials && listMarkup}

          </div>

          {hasRightColumn && (
            <div className='md:w-[45%] md:pl-[25px] pt-[30px]   pb-[30px]  '>

              {hasTestimonials ? (
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

                    {testimonials.map((obj, index) => (
                      <SwiperSlide key={index}>
                        <div className='text_testimonials'>
                          <Quateicon />
                          <h5> {obj?.comment} </h5>
                          <h4>{obj?.name} </h4>
                          <span>{obj?.designation}</span>
                        </div>
                      </SwiperSlide>
                    ))}

                  </Swiper>

                </div>
              ) : (
                listMarkup
              )}

            </div>
          )}

        </div>

      </div>


    </div>
  );
};

export default Whychoose;
