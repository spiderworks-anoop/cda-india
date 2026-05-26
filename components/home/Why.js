import { useEffect, useRef } from "react";
import Image from "next/image";
import PixelTransition from "../common/PixelTransition";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Why = ({ data }) => {
  const textRef = useRef();

  useEffect(() => {
    const section = document.querySelector(".home-why");
    const textElement = textRef.current;

    // Section fade + slide up reveal
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
        },
      }
    );

    // Split text content into spans for each character
    const characters = textElement.textContent.split("");
    textElement.innerHTML = "";
    characters.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces
      textElement.appendChild(span);
    });

    // Animate letters: fade up + stagger on reveal
    gsap.fromTo(
      textElement.children,
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section className="home-why overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-[20px]">
          <div>
            <div className="md:max-w-[520px] max-w-[300px]">
              <h3
                dangerouslySetInnerHTML={{ __html: data?.content?.title_4 }}
              />
            </div>
          </div>

          <div className="flex md:justify-end">
            <div className="md:max-w-[560px] max-w-[330px]">
              <p
                ref={textRef}
                dangerouslySetInnerHTML={{ __html: data?.content?.content_4 }}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 mt-[60px] md:mt-[80px] border border-[#E4E4E4] hm-why-list">
          {data?.content?.balance_your_financial_future_listing_id?.map(
            (item, index) => (
              <div
                key={index}
                className={`${index !== 0 ? "border-t md:border-t-0" : ""} ${
                  index < 3 ? "md:border-r" : ""
                } border-[#E4E4E4] px-[33px] pb-[40px] ${
                  index % 2 == 1
                    ? "md:pb-[20px] pt-[40px] md:pt-[60px]"
                    : "md:pb-[90px] pt-[40px] md:pt-[20px]"
                }`}
              >
                {/* Desktop Image if mobileImage true */}
                {index % 2 == 1 && (
                  <div className="hidden md:block w-[177px] h-[265px] custom-h m-auto mb-[25px] img-zoom">
                  
                        <Image
                          src={item?.media_id?.file_path}
                          alt={item?.media_id?.alt_text}
                          width={177}
                          height={265}
                          className="hidden md:block w-[177px] h-[265px] object-cover mx-auto"
                        />
                    
                  </div>
                )}

                {/* Tag number */}
                <span className={item.mobileImage ? "county-tag" : ""}>
                  {index + 1 < 10 && 0} {index + 1}
                </span>

                {/* Title */}
                <h4
                  className={`md:mb-[78px] mb-[30px] md:max-w-[200px] ${index % 2 == 1 ? "md:mb-[0]" : ""}`}
                >
                  {item?.title}
                </h4>

                {/* Image (mobile or full width) */}
                {index % 2 == 1 ? (
                  <div className="md:hidden w-[177px] h-full custom-h m-auto img-zoom">
                  
                        <Image
                          src={item?.media_id?.file_path}
                          alt={item?.media_id?.alt_text}
                          width={177}
                          height={186}
                          className="md:hidden w-full h-full object-cover mx-auto"
                        />
                  
                  </div>
                ) : (
                  <div className="md:block block w-full h-[186px] overflow-hidden img-zoom">
                   
                        <Image
                          src={item?.media_id?.file_path}
                          alt={item?.media_id?.alt_text}
                          width={280}
                          height={186}
                          className="w-full h-[186px] object-cover"
                        />
                     
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Why;
