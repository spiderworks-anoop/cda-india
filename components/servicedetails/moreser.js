import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

import Ser1 from "../../public/images/serdet4.png";
import Ser2 from "../../public/images/serdet5.jpg";
import Ser3 from "../../public/images/serdet6.jpg";
import Ser4 from "../../public/images/serdet7.jpg";

import {
  BlueBtn,
  Bluecircleicon,
  CircleArrowicon,
  CurveLargeArrowicon,
  Eye2icon,
  Eyeicon,
  WhiteBtn,
} from "../common/svgicon";
import Noise from "../common/Noise";

const SerDetMore = ({ data }) => {
  return (
    <>
      {data?.more_services?.length > 0 && (
        <section className="ser-det-more pt-[10px] pb-[50px]">
          <div className="container relative z-[1]">
            <h3>
              More <b>Services</b> You May Need
            </h3>

            <div className="flex flex-col md:flex-row mt-[30px] gap-[37px]">
              <div className="hidden md:block min-w-[220px] lg:min-w-[300px]">
                <Image src={Ser1} alt="" width={220} height={280} />
              </div>

              <div className="w-[100%] md:w-[calc(100%-257px)] lg:w-[calc(100%-337px)]">
                <Swiper
                  navigation={true}
                  modules={[Autoplay, Navigation]}
                  spaceBetween={30}
                  slidesPerView={3}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  breakpoints={{
                    400: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {data?.more_services?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Link
                        href={`/services/${item?.slug}`}
                        className="flex justify-start w-full "
                      >
                        <div className="more_list img-zoom">
                          <div className="more_cap flex items-center justify-center">
                            <h4>{item?.title}</h4>
                          </div>
                          <div className=" z-[-1] block relative">
                            <Image
                              src={item?.featured_image?.file_path}
                              alt={
                                item?.featured_image?.alt_text ||
                                "Service image"
                              }
                              width={313}
                              height={280}
                            />
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SerDetMore;
