import { useRef } from "react";
import Base from "@/components/layout/Base";  
import Process from "@/components/home/Process"; 
import Footercontent from "@/components/common/Footercontent"; 
import CommBanner from "@/components/common/banner";  
import ContactForm from "@/components/contact/getform";
import ContactList from "@/components/contact/list";
import { ContactApi } from "@/Datas/endpoints/contact";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";
export default function Contact({general, process, data}) {
 

 

  return (
    <Base data={data} general={general} bottomContent={"Bottom Content"}>

       <div className="Small_banner  ">
            <CommBanner  title={data?.title}
            discription={data?.content?.description_1} 
          />
       </div>

       <ContactList data={data}/>

       <ContactForm data={data} contact={true}/>
        
 

       <Process
      prosTitle={process?.content?.title_1}
      procesList={process?.content?.smart_accounting_listing_id}
       ProsImg={process?.content?.media_id_3?.file_path}
      />
      <Footercontent />
    </Base>
  );
}




export async function getStaticProps() {

  try {
    const ContactPageData = await ContactApi.page()  
    const GeneralData = await GeneralApi.general() 
    const ProcessData = await WidgetApi.process()
    return{
      props:{
        data:ContactPageData?.data?.data,
        general:GeneralData?.data?.data,
        process:ProcessData?.data?.data
      },
      revalidate: 10,
    }
  } catch (error) {
    console.log(error);
    
    return{
      notFound:true
    }
  }


 
  
}
