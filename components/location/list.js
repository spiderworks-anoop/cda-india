import Link from 'next/link'
import { motion } from 'framer-motion'
import { LongArrowicon } from '../common/svgicon'
import LocCard from './card'

const LocList = ({ shorttitle, title, discription, listdata }) => {
  if (!listdata?.length) return null

  return (
    <section className='ser-offer-sec location_list_sec pt-[60px] md:pt-[100px] pb-[50px] md:pb-[100px]'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='flex flex-col md:flex-row gap-[25px] md:gap-[10px] items-end justify-between ser-offer-head'
        >
          <div>
            <div className='max-w-[528px]'>
              {shorttitle && <h5>{shorttitle}</h5>}
              <h2>{title}</h2>
            </div>
          </div>

          {discription && (
            <div>
              <div className='max-w-[506px]'>
                <div className='p' dangerouslySetInnerHTML={{ __html: discription }} />
              </div>
            </div>
          )}
        </motion.div>

        <hr />

        <div className='flex flex-col gap-[50px] md:gap-[80px]'>
          {listdata?.map((location, index) => (
            <div className='location_group' key={location?.id || index}>
              <div className='flex flex-col md:flex-row md:items-end justify-between gap-[20px] location_group_head'>
                <div className='flex items-start gap-[18px] md:gap-[30px]'>
                  <h5>{String(index + 1).padStart(2, '0')}</h5>

                  <div className='max-w-[620px]'>
                    <h3>{location?.title || location?.name}</h3>
                    {location?.short_description && <p>{location?.short_description}</p>}
                  </div>
                </div>

                <Link
                  href={`/location/${location?.slug}`}
                  className='btn flex items-center gap-[10px] whitespace-nowrap'
                >
                  Explore {location?.title || location?.name} <LongArrowicon />
                </Link>
              </div>

              {location?.children?.length > 0 && (
                <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[25px] md:gap-[35px] mt-[30px] md:mt-[45px]'>
                  {location?.children?.map((service, childIndex) => (
                    <LocCard
                      key={service?.id || childIndex}
                      item={service}
                      index={childIndex}
                      linktext='View Service'
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocList
