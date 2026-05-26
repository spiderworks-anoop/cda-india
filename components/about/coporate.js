import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Abt2 from "../../public/images/ab6.webp";
import {
  BlueBtn,
  Bluecircleicon,
  CircleArrowicon,
  CurveLargeArrowicon,
  WhiteBtn,
} from "../common/svgicon";
import Noise from "../common/Noise";

const AboutCoporate = ({ data }) => {
  return (
    <section className="ser-det-finance  ">
      <div className="container relative z-[1]">
        <div className="grid md:grid-cols-2 gap-[15px] items-center">
          <div className="h-full">
            <Image
              src={data?.content?.media_id_5?.file_path}
              alt=""
              width={500}
              height={500}
              className="h-full object-cover cutom-height"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:flex justify-center items-center"
          >
            <div className="max-w-[610px]">
              <h4
                dangerouslySetInnerHTML={{ __html: data?.content?.title_5 }}
              />

              <div className=" pt-[25] pb-[55px] md:hidden">
                <Image src={Abt2} alt="" width={500} height={500} />
              </div>

              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{
                  __html: data?.content?.description_5,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutCoporate;
