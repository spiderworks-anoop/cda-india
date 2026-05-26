import { useEffect, useRef } from "react";
import Image from "next/image";
import Miss1 from "../../public/images/miss1.png";
import { LargeArrowicon } from "../common/svgicon";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Squares from "../common/square";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Mission = ({
  misstitle_1,
  missdescription_1,
  misstitle_2,
  missdescription_2,
  maintitle,
  shorttitle,
  MisImg
}) => {
  const missionRef = useRef();
  const visionRef = useRef();

  useEffect(() => {
    const animateText = (textElement) => {
      if (!textElement) return;

      const characters = textElement.textContent.split("");
      textElement.innerHTML = ""; // Clear existing text

      characters.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        textElement.appendChild(span);
      });

      gsap.to(textElement.children, {
        color: "#000",
        duration: 0.5,
        scrollTrigger: {
          trigger: textElement,
          start: "top 40%",
          end: "bottom 40%",
          scrub: true,
        },
        stagger: {
          each: 0.3,
          from: "start",
        },
      });
    };

    animateText(missionRef.current);
    animateText(visionRef.current);
  }, []);

  return (
    <section className="home-mission" data-aos="fade-up">
      <div className="container sticky top-[80px]">
        <div className="flex flex-col md:flex-row items-center gap-[40px] xl:gap-[83px]">
          <div className="miss_bg ">
            <Squares
              speed={0.5}
              squareSize={30}
              direction="diagonal"
              borderColor="rgba(200, 200, 200, 0.36)"
              hoverFillColor="#222"
            />
            <div className="relative z-[1] flex flex-col justify-between h-full">
              <div>
                <h4> {maintitle || "Why CDA"} </h4>
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      shorttitle || "<b>100%</b> Corporate Finance Solutions",
                  }}
                ></span>
              </div>
              <Image src={MisImg || Miss1} alt="" width={445} height={350} />
            </div>

            <div className="absolute right-[30px] bottom-[30px] cursor-pointer z-[2] mission-arrow">
              <Link href={`/why-cda`}>
                <LargeArrowicon />
              </Link>
            </div>
          </div>

          <div className="mt-[100px] md:mt-0">
            <div className="md:mb-[114px] mb-[60px]">
              <h5> {misstitle_1} </h5>
              <p ref={missionRef}>{missdescription_1}</p>
            </div>

            <div>
              <h5> {misstitle_2} </h5>
              <p ref={visionRef}> {missdescription_2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
