import Image from 'next/image'
import { motion } from 'framer-motion'

// The service_sectors widget - the industries a service is delivered into.
// Only the service pages fetch it, so on a city page `data` is undefined and
// the section drops out.
//
// Deliberately not the .sector_bg / .sect_list treatment: LocHighlights renders
// that boxed card grid immediately above, and sharing it made the two sections
// read as one repeated block. This one is an open grid on the page background.
const LocSectors = ({ data }) => {
  const sectors = data?.content?.services_sectors_listing_id

  if (!sectors?.length) return null

  return (
    <section className='location_sectors pt-[50px] pb-[50px]  md:pb-[80px]'>
      <div className='container'>
        {data?.content?.title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className='location_sectors_head max-w-[620px]'
          >
            <h3>{data?.content?.title}</h3>
          </motion.div>
        )}

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-x-[40px] gap-y-[40px] md:gap-y-[50px] mt-[40px] md:mt-[55px]'>
          {sectors?.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: 'easeOut' }}
              viewport={{ once: true }}
              className='location_sectors_item'
            >
              <div className='flex items-center gap-[12px]'>
                {/* Every sector currently comes back with a null icon, so the
                    slot only appears once the CMS actually fills one in. */}
                {sector?.icon_image?.file_path && (
                  <Image
                    src={sector?.icon_image?.file_path}
                    alt={sector?.icon_image?.alt_text || ''}
                    width={28}
                    height={28}
                  />
                )}

                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>

              <h4>{sector?.title}</h4>
              <p>{sector?.short_description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocSectors
