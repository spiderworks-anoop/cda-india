import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Ser1 from "../../public/images/serdet1.png";
import AuthDef from "../../public/images/author.jpg";
import {
  Bluecircleicon,
  CircleArrowicon,
  CurveLargeArrowicon,
  WhiteBtn,
} from "../common/svgicon";
import Noise from "../common/Noise";
import Link from "next/link";

const CommBanner = ({
  data,
  ButtonClick,
  title,
  discription,
  short_description,
  btntext,
  btnlink,
  bnrimg,
  Authimg
}) => {
  console.log(data);
  return (
    <section className="ser-det-banner  relative mb-[45px] inner-banner">
      <Image src={bnrimg || Ser1} alt="" width={1920} height={773} />

      <div className="absolute top-0 left-0 w-full h-full z-[2] flex items-end pb-[60px] com_bnr_cap">
        <div className="container relative z-[1]">
          <div className="">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className=""
            >
              <div>
                {Authimg &&
                      <Image src={Authimg || AuthDef} alt="" width={150} height={150} className="author-img" />
                }
               

                <h2>{title}</h2>
                {/* <CurveLargeArrowicon /> */}

                <p className="max-w-[800px]"
                  dangerouslySetInnerHTML={{
                    __html: (short_description || "")
                      .substring(0, 200),
                  }}
                />

                {/* {
                  btntext &&
                  (
                    data?.buttonUrl ?  
                    <Link href={btnlink || "#"} ><WhiteBtn btn2text={btntext}/> </Link>
                    :
                    <a onClick={ButtonClick} ><WhiteBtn btn2text={btntext}/>  </a>
                  )
                  
                } */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommBanner;
