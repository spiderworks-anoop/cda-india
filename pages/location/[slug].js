import Base from '@/components/layout/Base'
import LocBanner from '@/components/location/banner'
import LocContent from '@/components/location/content'
import LocServices from '@/components/location/services'
import LocHighlights from '@/components/location/highlights'
import LocRelated from '@/components/location/related'
import SerSolution from '@/components/services/Servsolution'
import Certificate from '@/components/home/Certificate'
import Testimonials from '@/components/home/Testimonials'
import Associates from '@/components/home/Associates'
import Faq from '@/components/home/Faq'
import Process from '@/components/home/Process'
import Footercontent from '@/components/common/Footercontent'
import { hasHtmlContent } from '@/components/common/functions/htmlcontent'
import { LocationApi } from '@/Datas/endpoints/location'
import { GeneralApi } from '@/Datas/endpoints/general'
import { WidgetApi } from '@/Datas/endpoints/widget'

export default function LocationDetail({
  locationDetail,
  general,
  process,
  financialSolutions,
  certifications,
  ourassociates,
  faqrigthtext,
  testimonials
}) {
  return (
    <Base general={general} data={locationDetail} bottomContent={'Bottom Content'}>
      <LocBanner data={locationDetail} />

      <LocContent data={locationDetail} />

      <LocServices data={locationDetail} />

      <LocHighlights data={locationDetail} />

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

      {locationDetail?.faq?.length > 0 && (
        <Faq
          servfaqs={locationDetail?.faq}
          faqrighttitle={faqrigthtext?.content?.title}
          faqrightdiscription={faqrigthtext?.content?.text}
          faqrightbtn={faqrigthtext?.content?.btn_text}
        />
      )}

      <LocRelated data={locationDetail} />

      <Process
        prosTitle={process?.content?.title_1}
        procesList={process?.content?.smart_accounting_listing_id}
        ProsImg={process?.content?.media_id_3?.file_path}
      />

      {hasHtmlContent(locationDetail?.bottom_description) && (
        <Footercontent
          footerContentTitle={locationDetail?.bottom_text}
          footerContentDiscription={locationDetail?.bottom_description}
        />
      )}
    </Base>
  )
}

// Locations and the service pages nested under them are both served by the
// same endpoint, so the paths have to cover parents and children alike.
export const getStaticPaths = async () => {
  try {
    const LocationListData = await LocationApi.listpage()
    const list = LocationListData?.data?.data || []

    const slugs = list.flatMap(location => [
      location?.slug,
      ...(location?.children?.map(child => child?.slug) || [])
    ])

    const paths = slugs
      .filter(Boolean)
      .map(slug => ({ params: { slug } }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.log('location paths error', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    const LocationPageData = await LocationApi.locationDetail({
      slug: params.slug
    })
    const GeneralData = await GeneralApi.general()
    const ProcessData = await WidgetApi.process()
    const WidgetData = await WidgetApi.financialSolutions()
    const CertificationsData = await WidgetApi.certifications()
    const OurassociatesData = await WidgetApi.ourassociates()
    const FaqrigthtextData = await WidgetApi.faqrigthtext()
    const TestimonialsData = await WidgetApi.testimonials()

    return {
      props: {
        locationDetail: LocationPageData?.data?.data,
        general: GeneralData?.data?.data,
        process: ProcessData?.data?.data,
        financialSolutions: WidgetData?.data?.data,
        certifications: CertificationsData?.data?.data,
        ourassociates: OurassociatesData?.data?.data,
        faqrigthtext: FaqrigthtextData?.data?.data,
        testimonials: TestimonialsData?.data?.data
      },
      revalidate: 10
    }
  } catch (error) {
    console.log('location detail page error', error)
    if (error?.error == 'Not found' || error?.error == 'Page not Found!') {
      return {
        notFound: true
      }
    }
    throw error
  }
}
