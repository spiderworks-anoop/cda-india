import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Pinicon, ArrowSmicon } from '@/components/common/svgicon'
import LocCard from '@/components/location/shared/Card'

// `related_listing` holds sibling services on a service page and other cities
// on a city page, so the one field feeds two very different lists. `parent` is
// what separates them - only a service has one (the same test the city route
// uses to redirect a service to its nested URL).
//
//   service page -> sibling services, shown as the LocServices picture cards,
//                   which that page has no other use for since it has no
//                   children of its own
//   city page    -> other cities, shown as compact signpost rows: a place name
//                   is something you recognise or you don't, and it should not
//                   compete with the service cards sitting above it
const LocRelated = ({ data }) => {
  if (!data?.related_listing?.length) return null

  const parent = data?.parent
  const cityName = parent?.title || parent?.name
  const isService = Boolean(parent?.slug)

  return (
    <section className='ser-det-more location_related pt-[50px] pb-[50px]'>
      <div className='container relative z-[1]'>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {isService ? (
            <>
              Other <b>Services</b> We Offer{cityName ? ` In ${cityName}` : ''}
            </>
          ) : (
            <>
              Other <b>Locations</b> We Serve
            </>
          )}
        </motion.h3>

        {isService ? (
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[25px] md:gap-[35px] mt-[30px] md:mt-[45px]'>
            {data?.related_listing?.map((item, index) => (
              <LocCard
                key={item?.id || index}
                item={item}
                index={index}
                linktext='View Service'
              />
            ))}
          </div>
        ) : (
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[16px] md:gap-[20px] mt-[30px] md:mt-[40px]'>
            {data?.related_listing?.map((item, index) => {
              if (!item?.slug) return null

              const image = item?.featured_image?.file_path || item?.banner_image?.file_path

              return (
                <motion.div
                  key={item?.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={item?.url || `/${item?.slug}`}
                    className='location_pin_card flex items-center gap-[16px] h-full'
                  >
                    <div className='location_pin_thumb'>
                      {image ? (
                        <Image
                          src={image}
                          alt={item?.featured_image?.alt_text || item?.title || ''}
                          width={160}
                          height={160}
                          sizes='80px'
                        />
                      ) : (
                        <Pinicon />
                      )}
                    </div>

                    <div className='location_pin_txt flex-1'>
                      <h4>{item?.title || item?.name}</h4>
                      {item?.short_description && <p>{item?.short_description}</p>}
                    </div>

                    <div className='location_pin_arrow'>
                      <ArrowSmicon />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default LocRelated
