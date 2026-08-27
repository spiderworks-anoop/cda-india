import LocationDetailScreen from '@/components/location/detail/Screen'
import { LocationApi } from '@/Datas/endpoints/location'
import {
  getLocationSharedProps,
  getAllLocations,
  buildLocationIndex,
  withLocationUrls
} from '@/Datas/pageData/location'

// /location/dubai/accounting-services-in-dubai - a service inside a city.
// `params.slug` is the city, `params.child` is the service the page renders.
export default function LocationService(props) {
  return <LocationDetailScreen {...props} />
}

export const getStaticPaths = async () => {
  try {
    const locations = await getAllLocations()

    const paths = locations.flatMap(city =>
      (city?.children || [])
        .map(service => service?.slug)
        .filter(Boolean)
        .map(child => ({ params: { slug: city?.slug, child } }))
    )

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.log('location service paths error', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    // Every city segment matches this route, so /location/abu-dhabi/<a Dubai
    // service> would otherwise serve the same page from a second address. The
    // nested endpoint checks the pairing itself and 404s when the service does
    // not sit under that city, which the catch below turns into a 404 page.
    const [LocationPageData, sharedProps, locations] = await Promise.all([
      LocationApi.location_service_detail({ slug: params.slug, child: params.child }),
      getLocationSharedProps(),
      getAllLocations()
    ])

    const index = buildLocationIndex(locations)
    const locationDetail = LocationPageData?.data?.data

    if (!locationDetail) {
      return { notFound: true }
    }

    return {
      props: {
        ...sharedProps,
        locationDetail: {
          ...locationDetail,
          related_listing: withLocationUrls(locationDetail?.related_listing, index)
        }
      },
      revalidate: 10
    }
  } catch (error) {
    console.log('location service page error', error)
    if (error?.error == 'Not found' || error?.error == 'Page not Found!') {
      return {
        notFound: true
      }
    }
    throw error
  }
}
