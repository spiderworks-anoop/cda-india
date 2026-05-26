import { useEffect, useState } from "react";
import Image from "next/image";
import Pros1 from "../../public/images/pros1.png";
import Pros2 from "../../public/images/pros2.png";
import Pros3 from "../../public/images/pros3.png";
import { LongArrowicon } from "../common/svgicon";
import Link from "next/link";

const Process = ({ prosTitle, procesList, ProsImg  }) => {
  return (
    <section className="home-process">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-[76px] md:gap-[20px] xl:gap-[76px]">
          <div className="pros_left">
            <Image src={ProsImg || Pros1} alt="" width={250} height={250} />
            <h4> {prosTitle}</h4>
          </div>

          <div className="flex items-center gap-[25px] flex-wrap">
            {procesList?.map((items, index) => (
              <div key={index} className="pros_list img-zoom">
                <Image
                  src={items?.media_id?.file_path}
                  alt=""
                  width={272}
                  height={101}
                />
                <div className="flex items-center mt-[34px] gap-[15px]">
                  <h4> {items?.title} </h4>
                  <Link href={`/${items?.url || "#"}`}>
                    <LongArrowicon />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
