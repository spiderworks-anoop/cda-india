import { useEffect, useRef } from "react";
import Image from "next/image";
import PixelTransition from "../common/PixelTransition";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
        <div className="grid md:grid-cols-2 gap-[20px]">
          <div>
            <div className="md:max-w-[520px] max-w-[300px]">
              <div
                className="text-[#454d5c] "
                dangerouslySetInnerHTML={{ __html: data?.content?.title_4 }}
              />
            </div>
          </div>

          <div className="flex md:justify-end">
            <div className="md:max-w-[560px] max-w-[330px]">
              <div
                ref={textRef}
                className="text-[#454d5c] "
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
                className={`${index !== 0 ? "border-t md:border-t-0" : ""} ${index < 3 ? "md:border-r" : ""
                  } border-[#E4E4E4] px-[33px] pb-[40px] ${index % 2 == 1
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
                <span className={item?.mobileImage ? "county-tag" : ""}>
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
