import { useRef } from "react";
import Base from "@/components/layout/Base";  
import Process from "@/components/home/Process"; 
import Footercontent from "@/components/common/Footercontent";
import PackageHead from "@/components/packages/head";
import CommBanner from "@/components/common/banner";
import PackageListing from "@/components/packages/package";
import TeamManagement from "@/components/team/management";
import TeamMeat from "@/components/team/meetteam";
import TeamGallery from "@/components/team/gallery";
import { TeamApi } from "@/Datas/endpoints/team";
import { GeneralApi } from "@/Datas/endpoints/general";
import { WidgetApi } from "@/Datas/endpoints/widget";

export default function Team({data, members, general, process}) {
 

 

  return (
    <Base general={general} data={data} bottomContent={"Bottom Content"}>

       <div className="Small_banner">
            
            <CommBanner  
              title={data?.title}
              discription={data?.content?.description_1} 
              short_description={data?.content?.short_description_1} 
              bnrimg={data?.content?.media_id_1?.file_path}

         />
       </div>
        
      
 

        <TeamManagement data={data}    />

        <TeamMeat data={data} />

        <TeamGallery data={data}/>


      
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
    const TeamPageData = await TeamApi.page()
    const MembersData = await TeamApi.members()
    const GeneralData = await GeneralApi.general() 
    const ProcessData = await WidgetApi.process()
    return{
      props:{
        data:TeamPageData?.data?.data,
        members:MembersData?.data?.data,
        general:GeneralData?.data?.data,
        process:ProcessData?.data?.data
      },
      revalidate: 10,
    }
  }  catch (error) {
    console.log('www', error);
    throw error;
  }


 
  
}

