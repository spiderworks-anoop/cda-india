import { motion } from 'framer-motion'
import { decodeHtml, hasHtmlContent } from '@/components/common/functions/htmlcontent'



const LocContent = ({ title, description }) => {

  return (
    <>
      {
        (title || description) &&
        <section section className='location_content pt-[40px] pb-[40px]'>
          <div className='container'>
            <motion.div
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.15 }}
            >
              {
                title &&
                <h2 className='location_content_head'>{title}</h2>
              }

              <div
                className='location_content_body location_content_points mt-[20px]'
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </motion.div>
          </div>
        </section >
      }
    </>

  )
}

export default LocContent
