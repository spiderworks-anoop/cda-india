import { GeneralApi } from '../endpoints/general'
import { WidgetApi } from '../endpoints/widget'
import { LocationApi } from '../endpoints/location'

// Both /location and the detail pages render the same trailing widget sections,
// so they share one fetch. Running them in parallel instead of awaiting one by
// one keeps the build/revalidate cost of these pages down.
export const getLocationSharedProps = async () => {
  const [
    GeneralData,
    ProcessData,
    WidgetData,
    CertificationsData,
    OurassociatesData,
    FaqrigthtextData,
    TestimonialsData
  ] = await Promise.all([
    GeneralApi.general(),
    WidgetApi.process(),
    WidgetApi.financialSolutions(),
    WidgetApi.certifications(),
    WidgetApi.ourassociates(),
    WidgetApi.faqrigthtext(),
    WidgetApi.testimonials()
  ])

  return {
    general: GeneralData?.data?.data || null,
    process: ProcessData?.data?.data || null,
    financialSolutions: WidgetData?.data?.data || null,
    certifications: CertificationsData?.data?.data || null,
    ourassociates: OurassociatesData?.data?.data || null,
    faqrigthtext: FaqrigthtextData?.data?.data || null,
    testimonials: TestimonialsData?.data?.data || null
  }
}

// The listing endpoint is paginated, so walking every page is the only way to
// know the full set of cities and the services nested under them.
export const getAllLocations = async () => {
  const locations = []
  let page = 1
  let lastPage = 1

  // The cap is a runaway guard, not a real limit - the CMS returns 10 per page.
  while (page <= lastPage && page <= 50) {
    const response = await LocationApi.listpage({ page })

    locations.push(...(response?.data?.data || []))
    lastPage = response?.data?.meta?.last_page || 1
    page += 1
  }

  return locations
}

// slug -> the city it belongs to. Cities map to null; services map to their
// parent city's slug, which is the segment their URL needs.
export const buildLocationIndex = (locations = []) => {
  const index = new Map()

  locations.forEach(city => {
    if (!city?.slug) return

    index.set(city.slug, null)

    city?.children?.forEach(service => {
      if (service?.slug) index.set(service.slug, city.slug)
    })
  })

  return index
}

// Locations sit at the root of the site, not under a /location prefix:
//   city    -> /dubai
//   service -> /dubai/accounting-services-in-dubai
export const locationUrl = (slug, citySlug) => {
  if (!slug) return '/'

  return citySlug && citySlug !== slug ? `/${citySlug}/${slug}` : `/${slug}`
}

// `related_listing` mixes cities and services with nothing on the item saying
// which it is, so the URLs are resolved against the index at build time and
// travel with the data rather than being guessed in the component.
export const withLocationUrls = (items, index) =>
  (items || []).map(item => ({
    ...item,
    url: locationUrl(item?.slug, index?.get(item?.slug) || null)
  }))
