import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { LongArrowicon } from '@/components/common/svgicon'

// A service lives at /location/<city>/<service>, a city at /location/<city>,
// and the item on its own does not say which it is. Callers that know the city
// pass `href`; `related_listing` items carry a `url` resolved at build time.
const LocCard = ({ item, href, index = 0, linktext = 'View Details' }) => {
  if (!item?.slug) return null

  const image = item?.featured_image?.file_path || item?.banner_image?.file_path

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <Link href={href || item?.url || `/location/${item?.slug}`} className='location_card flex flex-col h-full'>
        {image && (
          <div className='location_card_img'>
            <Image
              src={image}
              alt={item?.featured_image?.alt_text || item?.title || ''}
              width={440}
              height={240}
              sizes='(max-width: 767px) 90vw, 33vw'
            />
          </div>
        )}

        <div className='location_card_cap flex flex-col h-full'>
          <h4>{item?.title || item?.name}</h4>

          {item?.short_description && <p>{item?.short_description}</p>}

          <span className='btn flex items-center gap-[10px] mt-auto'>
            {linktext} <LongArrowicon />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default LocCard
