import Base from '@/components/layout/Base'
import CommBanner from '@/components/common/banner'
import LocList from '@/components/location/list'
import SerSolution from '@/components/services/Servsolution'
import Certificate from '@/components/home/Certificate'
import Testimonials from '@/components/home/Testimonials'
import Associates from '@/components/home/Associates'
import Process from '@/components/home/Process'
import Footercontent from '@/components/common/Footercontent'
import { LocationApi } from '@/Datas/endpoints/location'
import { GeneralApi } from '@/Datas/endpoints/general'
import { WidgetApi } from '@/Datas/endpoints/widget'

export default function Location({
  listdata,
  general,
  process,
  financialSolutions,
  certifications,
  ourassociates,
  testimonials
}) {
  const pageData = {
    title: 'Locations',
    browser_title: 'Locations We Serve | CDA',
    meta_description:
      'CDA delivers accounting, auditing, tax and advisory services across the locations we operate in. Find the office and the services closest to your business.'
  }

  return (
    <Base general={general} data={pageData} bottomContent={'Bottom Content'}>
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
        shorttitle={'Our Presence'}
        title={'Find CDA In Your City'}
        discription={
          '<p>Every location has its own regulatory demands. Choose a city to explore the accounting, auditing and compliance services our specialists deliver on the ground.</p>'
        }
      />

      <SerSolution
        soluVideo={financialSolutions?.content?.media_id_1?.file_path}
        soluHead={financialSolutions?.content?.title}
      />

      <Certificate
        certificatHead={certifications?.content?.title}
        certificatSubHead={certifications?.content?.sub_title}
        certificatLogo={certifications?.content?.media_id_2?.file_path}
        certificatLogoList={certifications?.content?.our_certifications_listing_id}
      />

      <Testimonials data={testimonials} />

      <Associates
        associateTitle={ourassociates?.content?.title}
        associateSubTitle={ourassociates?.content?.short_title}
        satisfiedClientsCount={ourassociates?.content?.satisfied_clients_count}
        satisfiedClients={ourassociates?.content?.satisfied_clients}
        experienceCount={ourassociates?.content?.experience_count}
        experienceText={ourassociates?.content?.experience}
        sectorCount={ourassociates?.content?.industry_sectors_count}
        sectorText={ourassociates?.content?.industry_sectors}
        associateLocations={ourassociates?.content?.our_associates_listing_id}
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
    const LocationListData = await LocationApi.listpage()
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    const WidgetData = await WidgetApi.financialSolutions()
    const CertificationsData = await WidgetApi.certifications()
    const OurassociatesData = await WidgetApi.ourassociates()
    const TestimonialsData = await WidgetApi.testimonials()

    return {
      props: {
        listdata: LocationListData?.data?.data || [],
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data,
        financialSolutions: WidgetData?.data?.data,
        certifications: CertificationsData?.data?.data,
        ourassociates: OurassociatesData?.data?.data,
        testimonials: TestimonialsData?.data?.data
      },
      revalidate: 10
    }
  } catch (error) {
    console.log('location listing page error', error)
    throw error
  }
}
