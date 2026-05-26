import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Logo1 from "../../public/images/logo.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import Noise from "../../components/common/Noise";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { WidgetApi } from "@/Datas/endpoints/widget";

const Testimonials = () => {
  const [videosTests, setvideosTests] = useState([]);
  const sectionRef = useRef(null);

  const fetchData = async () => {
    const response = await WidgetApi.testimonials();
    const items = response?.data?.data;
    setvideosTests(
      items?.filter((item) => item?.comment_type === "Video from Computer")
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (videosTests.length === 0) return;

    const section = sectionRef.current;
    gsap.fromTo(
      section,
      { autoAlpha: 0, y: 150 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
          id: "testimonialReveal",
        },
      }
    );

    return () => {
      ScrollTrigger.getById("testimonialReveal")?.kill();
    };
  }, [videosTests]);

  return (
    <>
      {videosTests?.length > 0 && (
        <section className="home-testimonials" ref={sectionRef}>
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />

          <div className="container">
            <h3>Voices of Trust And Satisfaction</h3>

            <div>
              <Swiper
                slidesPerView={1.5}
                spaceBetween={30}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                speed={800} // Smooth transition speed in ms
                effect="slide" // You can also try "fade", "cube", or "coverflow"
                modules={[Pagination, Navigation, EffectCoverflow]}
                className="custom-swiper"
              >
                {videosTests.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="vid_prv_cntr">
                      <div>
                        <video
                          src={item?.video?.file_path}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                        <h4>{item?.name}</h4>
                        <p>{item?.designation}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Testimonials;
