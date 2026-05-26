import { useEffect, useRef, useState } from "react";
import Base from "@/components/layout/Base";
import CommBanner from "@/components/common/banner";
import Aboutabout from "@/components/about/about";
import AboutWho from "@/components/about/who";
import AboutCoporate from "@/components/about/coporate";
import Mission from "@/components/home/Mission";
import SerSolution from "@/components/services/Servsolution";
import Certificate from "@/components/home/Certificate";
import Testimonials from "@/components/home/Testimonials";
import Ourclients from "@/components/home/Clients";
import Associates from "@/components/home/Associates";
import Faq from "@/components/home/Faq";
import Process from "@/components/home/Process";
import Footercontent from "@/components/common/Footercontent";
import { AboutUsApi } from "@/Datas/endpoints/aboutus";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";

export default function Home({ data, general, process, testimonials }) {
  const aboutRef = useRef(null); // Create ref for About section

  const scrollToSection = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Base general={general} data={data} bottomContent={"Bottom Content"}>
      <CommBanner
        title={data?.title}
        discription={data?.content?.description_1}
        short_description={data?.content?.short_description_1}
        bnrimg={data?.content?.media_id_1?.file_path}
        btntext="Read More"
        ButtonClick={scrollToSection}
      />

      <div ref={aboutRef}>
        <Aboutabout data={data} />
      </div>

      <AboutWho data={data} />

      <div className="about-miss pb-[80px]">
        <Mission
          misstitle_1={data?.content?.title_3}
          missdescription_1={data?.content?.description_3}
          misstitle_2={data?.content?.title_4}
          missdescription_2={data?.content?.description_4}
        />
      </div>

      <AboutCoporate data={data} />

      <Process
        prosTitle={process?.content?.title_1}
        procesList={process?.content?.smart_accounting_listing_id}
      />
      {/* <Footercontent /> */}
    </Base>
  );
}

export async function getStaticProps() {
  try {
    const AboutPageData = await AboutUsApi.page();
    const GeneralData = await GeneralApi.general();
    const ProcessData = await WidgetApi.process();
    const TestimonialsData = await WidgetApi.testimonials();
    return {
      props: {
        data: AboutPageData?.data?.data,
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data,
        testimonials: TestimonialsData?.data?.data,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log("www", error);
    throw error;
    // return{
    //   notFound:true
    // }
  }
}
