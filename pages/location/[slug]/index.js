import LocationDetailScreen from '@/components/location/detail/Screen'
import { LocationApi } from '@/Datas/endpoints/location'
import {
  getLocationSharedProps,
  getAllLocations,
  buildLocationIndex,
  withLocationUrls
} from '@/Datas/pageData/location'

// /location/dubai - a city. `params.slug` is the city.
export default function LocationCity(props) {
  return <LocationDetailScreen {...props} />
}

export const getStaticPaths = async () => {
  try {
    const locations = await getAllLocations()

    const paths = locations
      .map(city => city?.slug)
      .filter(Boolean)
      .map(slug => ({ params: { slug } }))

    return { paths, fallback: 'blocking' }
  } catch (error) {
    console.log('location city paths error', error)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    const [LocationPageData, sharedProps, locations] = await Promise.all([
      LocationApi.locationDetail({ slug: params.slug }),
      getLocationSharedProps(),
      getAllLocations()
    ])

    const index = buildLocationIndex(locations)
    const parentSlug = index.get(params.slug)

    // Services used to live at /location/<service-slug>. Those URLs still
    // resolve here, so send them on to their nested home instead of serving
    // the same page from two addresses.
    if (parentSlug) {
      return {
        redirect: {
          destination: `/location/${parentSlug}/${params.slug}`,
          permanent: true
        }
      }
    }

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
    console.log('location city page error', error)
    if (error?.error == 'Not found' || error?.error == 'Page not Found!') {
      return {
        notFound: true
      }
    }
    throw error
  }
}
