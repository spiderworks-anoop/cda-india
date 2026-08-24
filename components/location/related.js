import { motion } from 'framer-motion'
import LocCard from './card'

const LocRelated = ({ data }) => {
  if (!data?.related_listing?.length) return null

  return (
    <section className='ser-det-more location_related pt-[10px] pb-[50px]'>
      <div className='container relative z-[1]'>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          Other <b>Locations</b> We Serve
        </motion.h3>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[25px] md:gap-[35px] mt-[30px]'>
          {data?.related_listing?.map((item, index) => (
            <LocCard
              key={item?.id || index}
              item={item}
              index={index}
              linktext='View Location'
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocRelated
