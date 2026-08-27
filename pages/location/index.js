import Base from '@/components/layout/Base'
import CommBanner from '@/components/common/banner'
import LocList from '@/components/location/listing/List'
import LocCommonSections from '@/components/location/shared/CommonSections'
import Process from '@/components/home/Process'
import Footercontent from '@/components/common/Footercontent'
import { LocationApi } from '@/Datas/endpoints/location'
import { getLocationSharedProps } from '@/Datas/pageData/location'





export async function getStaticProps() {
  try {
    const [pageRes, LocationListData, sharedProps] = await Promise.all([
      LocationApi.page(),
      LocationApi.listpage(),
      getLocationSharedProps()
    ])

    return {
      props: {
        ...sharedProps,
        page: pageRes?.data?.data || [],
        listdata: LocationListData?.data?.data || [],
        metadata: LocationListData?.data?.meta || null
      },
      revalidate: 10
    }
  } catch (error) {
    console.log('location listing page error', error)
    throw error
  }
}


export default function Location({
  page,
  listdata,
  metadata,
  general,
  process,
  financialSolutions,
  certifications,
  ourassociates,
  testimonials
}) {

  console.log(page)
  return (
    <Base general={general} data={page} bottomContent={page?.bottom_description}>
      <div className='Small_banner h-[100dvh] bg-white '>
        <CommBanner
          title={page?.content?.title_1}
          short_description={page?.content?.short_description_1}
          bnrimg={page?.content?.media_id_1?.file_path}
        />
      </div>

      <LocList
        listdata={listdata}
        metadata={metadata}
        shorttitle={page?.content?.tag_text_2}
        title={page?.content?.title_2}
        description={page?.content?.short_description_2}
      />

      <LocCommonSections
        financialSolutions={financialSolutions}
        certifications={certifications}
        testimonials={testimonials}
        ourassociates={ourassociates}
      />

      <Process
        prosTitle={process?.content?.title_1}
        procesList={process?.content?.smart_accounting_listing_id}
        ProsImg={process?.content?.media_id_3?.file_path}
      />

      <Footercontent />
    </Base>
  )
}
