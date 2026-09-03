import { useEffect, useRef } from "react";
import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { HTMLParser } from "@/utils/HTMLParser";

gsap.registerPlugin(ScrollTrigger);

const Why = ({ data }) => {
  const sectionRef = useRef();
  const textRef = useRef();

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
              span.style.display = "inline-block";
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
    const section = sectionRef.current;
    const textElement = textRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    const tweens = [];
    const originalHtml = textElement?.innerHTML;

    // Section fade + slide up reveal
    tweens.push(
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 80 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )
    );

    // The letter reveal is desktop only - elsewhere the copy fades in as a block.
    if (textElement && isDesktop && !reduceMotion) {
      const characters = splitCharacters(textElement);

      if (characters.length) {
        tweens.push(
          gsap.fromTo(
            characters,
            { yPercent: 60, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "power2.out",
              duration: 0.5,
              // amount (not each) keeps the total run at ~1.2s no matter how
              // long the CMS copy is.
              stagger: { amount: 1.2, from: "start" },
              scrollTrigger: {
                trigger: textElement,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          )
        );
      }
    } else if (textElement && !reduceMotion) {
      tweens.push(
        gsap.fromTo(
          textElement,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textElement,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      );
    }

    ScrollTrigger.refresh();

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });

      // Put the untouched CMS markup back so a re-run (data change, HMR,
      // StrictMode) splits from a clean slate instead of stacking spans.
      if (textElement && originalHtml !== undefined) {
        gsap.set(textElement, { clearProps: "all" });
        textElement.innerHTML = originalHtml;
      }
    };
  }, [data?.content?.content_4]);

  return (
    <section ref={sectionRef} className="home-why overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-[24px] lg:gap-[40px] lg:items-end">
          <div>
            <div className="lg:max-w-[560px] why-head">
              <h2>{HTMLParser(data?.content?.title_4)}</h2>
            </div>
          </div>

          <div className="flex lg:justify-end">
            <div className="lg:max-w-[560px]">
              <div
                ref={textRef}
                className="text-[#454d5c] ">{HTMLParser(data?.content?.content_4)}</div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-[60px] lg:mt-[80px] border border-[#E4E4E4] hm-why-list">
          {data?.content?.balance_your_financial_future_listing_id?.map((item, index) => {
            // Only the 4 up desktop grid runs the staggered layout, where every
            // other card leads with a tall image. At 1 and 2 columns there is
            // no zigzag to keep, so every card is number -> title -> image.
            const isAlt = index % 2 === 1;

            return (
              <div
                key={index}
                // Dividers between cells are drawn in CSS (.hm-why-list), so
                // they follow the column count instead of assuming 4 across.
                className={`px-[20px] sm:px-[26px] xl:px-[33px] pt-[40px] pb-[40px] ${isAlt
                  ? "lg:pt-[60px] lg:pb-[20px]"
                  : "lg:pt-[20px] lg:pb-[90px]"
                  }`}
              >
                {/* Tall lead image - only in the 4 up desktop grid */}
                {isAlt && (
                  <div className="hidden lg:block w-full max-w-[177px] h-[265px] m-auto mb-[25px] img-zoom">
                    <Image
                      src={item?.media_id?.file_path}
                      alt={item?.media_id?.alt_text || ""}
                      width={177}
                      height={265}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Tag number */}
                <span>{String(index + 1).padStart(2, "0")}</span>

                {/* Title */}
                <p
                  className={`mb-[30px] lg:max-w-[200px] ${isAlt ? "lg:mb-0" : "lg:mb-[78px]"}`}
                >
                  {item?.title}
                </p>

                {/* Bottom image - every card at 1 and 2 columns, and the
                    non-alternating cards in the 4 up grid */}
                <div
                  className={`w-full h-[339px] sm:h-[200px] lg:h-[186px] img-zoom ${isAlt ? "lg:hidden" : ""}`}
                >
                  <Image
                    src={item?.media_id?.file_path}
                    alt={item?.media_id?.alt_text || ""}
                    width={280}
                    height={186}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Why;
