import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Base from "@/components/layout/Base";
import Banner from "@/components/home/Banner";
import Trust from "@/components/home/Trust";
import Service from "@/components/home/Service";
import About from "@/components/home/About";
import Why from "@/components/home/Why";
import Mission from "@/components/home/Mission";
import Certificate from "@/components/home/Certificate";
import Testimonials from "@/components/home/Testimonials";
import Ourclients from "@/components/home/Clients";
import Associates from "@/components/home/Associates";
import Faq from "@/components/home/Faq";
import Process from "@/components/home/Process";
import Footercontent from "@/components/common/Footercontent";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";
import { HomeApi } from "@/Datas/endpoints";
import { PrivacyPolicyApi } from "@/Datas/endpoints/privacypolicy";

export default function Home({
  data,
  process,
  general,
  certifications,
  ourassociates,
  faqrigthtext,
  exceptionalclients,
  privacy,
}) {
  console.log("GM", data);

  return (
    <Base general={general} data={data} bottomContent={"Bottom Content"}>
      <section
        id="TermsCondition-section"
        className="relative flex flex-col justify-end items-end min-h-[70vh]"
      >
        <div className="container">
          <div className="flex justify-center">
            <div className="md:w-10/12 w-full">
              <div className="TermsCondition-content-block">
                <h1>{privacy?.title || "Privacy Policy"}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-[80px]">
        <div className="flex justify-center">
          <div className="md:w-10/12 w-full">
            <div
              className="TermsCondition-content-block"
              dangerouslySetInnerHTML={{
                __html:
                  privacy?.content ||
                  "<p>Privacy Policy content is not available at this moment.</p>",
              }}
            />
          </div>
        </div>
      </div>
    </Base>
  );
}

export async function getStaticProps() {
  try {
    const GeneralData = await GeneralApi.general();
    // const WidgetData = await WidgetApi.financialSolutions();
    const ProcessData = await WidgetApi.process();
    const HomeData = await HomeApi.page();
    const OurassociatesData = await WidgetApi.ourassociates();
    const CertificationsData = await WidgetApi.certifications();
    const FaqrigthtextData = await WidgetApi.faqrigthtext();
    const exceptionalclientsData = await WidgetApi.exceptionalclients();
    const PrivacyData = await PrivacyPolicyApi.privacyPolicy();

    return {
      props: {
        general: GeneralData?.data?.data,
        // financialSolutions: WidgetData?.data?.data,
        process: ProcessData?.data?.data,
        data: HomeData?.data?.data,
        ourassociates: OurassociatesData?.data?.data,
        certifications: CertificationsData?.data?.data,
        faqrigthtext: FaqrigthtextData?.data?.data,
        exceptionalclients: exceptionalclientsData?.data?.data,
        privacy: PrivacyData?.data?.data,
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
