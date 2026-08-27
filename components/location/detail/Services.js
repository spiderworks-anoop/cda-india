import { motion } from 'framer-motion'
import LocCard from '@/components/location/shared/Card'

const LocServices = ({ data }) => {
  if (!data?.children?.length) return null

  const name = data?.title || data?.name

  return (
    <section className='ser-offer-sec location_list_sec pt-[50px] pb-[50px]'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='ser-offer-head'
        >
          <div className='max-w-[720px]'>
            <h5>Our Services</h5>
            <h2>Services We Offer In {name}</h2>
          </div>
        </motion.div>

        <hr />

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[25px] md:gap-[35px] mt-[30px] md:mt-[45px]'>
          {data?.children?.map((service, index) => (
            <LocCard
              key={service?.id || index}
              item={service}
              href={`/${data?.slug}/${service?.slug}`}
              index={index}
              linktext='View Service'
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LocServices
