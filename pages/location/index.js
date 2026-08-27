import Base from '@/components/layout/Base'
import CommBanner from '@/components/common/banner'
import LocList from '@/components/location/listing/List'
import LocCommonSections from '@/components/location/shared/CommonSections'
import Process from '@/components/home/Process'
import Footercontent from '@/components/common/Footercontent'
import { LocationApi } from '@/Datas/endpoints/location'
import { getLocationSharedProps } from '@/Datas/pageData/location'

const pageData = {
  title: 'Locations',
  browser_title: 'Locations We Serve | CDA',
  meta_description:
    'CDA delivers accounting, auditing, tax and advisory services across the locations we operate in. Find the office and the services closest to your business.'
}

export default function Location({
  listdata,
  metadata,
  general,
  process,
  financialSolutions,
  certifications,
  ourassociates,
  testimonials
}) {
  return (
    <Base general={general} data={pageData} bottomContent={pageData?.bottom_description}>
      <div className='Small_banner'>
        <CommBanner
          title={'Locations We Serve'}
          short_description={
            'From Dubai to Abu Dhabi, our teams work close to your business - pick a location to see the services we deliver there.'
          }
        />
      </div>

      <LocList
        listdata={listdata}
        metadata={metadata}
        shorttitle={'Our Presence'}
        title={'Find CDA In Your City'}
        description={
          '<p>Every location has its own regulatory demands. Choose a city to explore the accounting, auditing and compliance services our specialists deliver on the ground.</p>'
        }
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

export async function getStaticProps() {
  try {
    const [LocationListData, sharedProps] = await Promise.all([
      LocationApi.listpage(),
      getLocationSharedProps()
    ])

    return {
      props: {
        ...sharedProps,
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
