import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  CircleArrow2icon,
  CircleArrowicon,
  UpArrowicon,
} from "../common/svgicon";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { HTMLParser } from "@/utils/HTMLParser";

gsap.registerPlugin(ScrollTrigger);

const About = ({ data }) => {
  const textRef = useRef();
  const sectionRef = useRef();

  // Wrap every character in a span without destroying the markup coming from
  // the CMS, so <p>/<b> styles survive and words never break mid-word.
  const splitCharacters = (element) => {
    const chars = [];

    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const fragment = document.createDocumentFragment();

          child.textContent.split(/(\s+)/).forEach((token) => {
            if (!token) return;

            if (/^\s+$/.test(token)) {
              fragment.appendChild(document.createTextNode(token));
              return;
            }

            const word = document.createElement("span");
            word.style.display = "inline-block";

            token.split("").forEach((char) => {
              const span = document.createElement("span");
              span.textContent = char;
              word.appendChild(span);
              chars.push(span);
            });

            fragment.appendChild(word);
          });

          child.replaceWith(fragment);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    };

    walk(element);
    return chars;
  };

  useEffect(() => {
    const textElement = textRef.current;
    const section = sectionRef.current;

    // The character reveal is desktop only - on mobile the text is shown as is.
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    const tweens = [];

    if (isDesktop && textElement && textElement.dataset.split !== "true") {
      const characters = splitCharacters(textElement);

      if (characters.length) {
        textElement.dataset.split = "true";

        tweens.push(
          gsap.to(characters, {
            color: "#000",
            duration: 0.2,
            scrollTrigger: {
              trigger: textElement,
              start: "top 85%",
              end: "bottom 40%",
              scrub: true,
            },
            stagger: {
              each: 0.2,
              from: "start",
            },
          })
        );
      }
    }

    // Fade-in section animation
    tweens.push(
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
      })
    );

    ScrollTrigger.refresh();

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [data?.content?.description_4]);

  return (
    <section ref={sectionRef} className="home-about">
      <div className="container md:sticky md:top-[50px] ">
        <div className="about-head relative max-w-[1006px] mx-auto flex flex-col items-center justify-center md:py-[60px]">
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

          <div className="text-black">{HTMLParser(data?.content?.title_3)}</div>
          <h5> {data?.content?.short_title_3} </h5>

          <div className="animate-bounce popover text-[#fff] rounded-tl-[24px] rounded-tr-[2px] rounded-bl-[24px] rounded-br-[24px] absolute left-0 bottom-[30px] md:bottom-0 bg-[#6A7796]">
            <div className="absolute top-[-20px] right-[-20px]">
              <UpArrowicon />
            </div>
            Let&apos;s Partner Up!
          </div>

          <div className="animate-bounce popover text-[#000] rounded-tl-[2px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-[24px] absolute right-0 bottom-[30px] md:bottom-0 bg-[#F7D158]">
            <div className="absolute top-[-20px] left-[-20px] rotate-280">
              <UpArrowicon />
            </div>
            Succeed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-[45px] lg:gap-[60px] xl:gap-[98px] mt-[50px]">
          <div className="flex gap-[20px] order-3 md:order-1 min-w-0">
            <span className="num-txt">#1</span>
            <div className="relative min-w-0">
              <h4 className="tagline-txt ">{data?.content?.text_1}</h4>
              <span className="county-tag">{data?.content?.text_2}</span>
            </div>
          </div>

          <div className="order-2 min-w-0">
            <div className="about-media relative w-full max-w-[422px] aspect-square mx-auto overflow-hidden rounded-[16px]">
              {data?.content?.media_id_3?.file_path && (
                <Image
                  src={data?.content?.media_id_3?.file_path}
                  alt={data?.content?.media_id_3?.alt_text || ""}
                  width={422}
                  height={422}
                  sizes="(max-width: 767px) 90vw, (max-width: 1279px) 33vw, 422px"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="order-1 md:order-3 min-w-0">
            <div
              ref={textRef}
              className="about-desc">{HTMLParser(data?.content?.description_4)}</div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-[60px] md:mt-[60px]">
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
