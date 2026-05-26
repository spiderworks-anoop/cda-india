import { useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  CircleArrow2icon,
  CircleArrowicon,
  UpArrowicon,
} from "../common/svgicon";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

// Dynamically import DecayCard with SSR disabled
const DecayCard = dynamic(() => import("@/components/common/DecayCard"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

const About = ({ data }) => {
  const textRef = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    const textElement = textRef.current;
    const section = sectionRef.current;

    // Split characters for text animation
    const characters = textElement?.textContent?.split("") || [];
    textElement.innerHTML = "";
    characters.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      textElement.appendChild(span);
    });

    // Animate characters
    gsap.to(textElement.children, {
      color: "#000",
      duration: 0.2,
      scrollTrigger: {
        trigger: textElement,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      stagger: {
        each: 0.2,
        from: "start",
      },
    });

    // Fade-in section animation
    gsap.from(section, {
      opacity: 0,
      y: 150,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="home-about">
      <div className="container md:sticky md:top-[50px] ">
        <div className="relative max-w-[1006px] mx-auto flex flex-col items-center justify-center">
          <div className="animate-bounce text-[#000] popover rounded-tl-[24px] rounded-tr-[2px] rounded-bl-[24px] rounded-br-[24px] absolute left-[25px] top-[-50px] md:top-0">
            <div className="absolute top-[-20px] right-[-20px]">
              <UpArrowicon />
            </div>
            Ready to Grow
          </div>

          <div className="animate-bounce text-[#000] popover rounded-tl-[2px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[24px] absolute right-[25px]  top-[-50px] md:top-0">
            <div className="absolute top-[-20px] left-[-20px] rotate-280">
              <UpArrowicon />
            </div>
            Innovate
          </div>

          <h3 dangerouslySetInnerHTML={{ __html: data?.content?.title_3 }} />
          <h5> {data?.content?.short_title_3} </h5>

          <div className="animate-bounce popover text-[#fff] rounded-tl-[24px] rounded-tr-[2px] rounded-bl-[24px] rounded-br-[24px] absolute left-0 bottom-[30px] md:bottom-0 bg-[#6A7796]">
            <div className="absolute top-[-20px] right-[-20px]">
              <UpArrowicon />
            </div>
            Let’s Partner Up!
          </div>

          <div className="animate-bounce popover text-[#000] rounded-tl-[2px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[24px] absolute right-0 bottom-[30px] md:bottom-0 bg-[#F7D158]">
            <div className="absolute top-[-20px] left-[-20px] rotate-280">
              <UpArrowicon />
            </div>
            Succeed
          </div>
        </div>

        <div className="grid md:grid-cols-3 items-center gap-[45px] xl:gap-[98px] mt-[50px]">
          <div className="hidden md:flex gap-[20px]">
            <h2>#1</h2>
            <div className="relative">
              <h4>{data?.content?.text_1}</h4>
              <span className="county-tag">{data?.content?.text_2}</span>
            </div>
          </div>

          <div className="md:hidden">
            <p
              ref={textRef}
              dangerouslySetInnerHTML={{ __html: data?.content?.description_4 }}
            />
          </div>

          <div>
            <DecayCard
              width={422}
              height={422}
              image={data?.content?.media_id_3?.file_path}
            />
          </div>

          <div className="hidden md:block">
            <p
              ref={textRef}
              dangerouslySetInnerHTML={{ __html: data?.content?.description_4 }}
            />
          </div>

          <div className="flex md:hidden gap-[20px]">
            <h2>#1</h2>
            <div className="relative">
              <h4>{data?.content?.text_1}</h4>
              <span className="county-tag">{data?.content?.text_2}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-[60px] md:mt-[30px]">
          <Link
            href={data?.content?.button_link_4 || "#"}
            className="btn flex items-center gap-[32px]"
          >
            {data?.content?.button_text_4} <CircleArrow2icon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
