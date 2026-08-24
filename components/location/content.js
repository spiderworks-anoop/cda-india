import Link from 'next/link'
import { motion } from 'framer-motion'
import { Backicon } from '../common/svgicon'
import { decodeHtml, hasHtmlContent } from '../common/functions/htmlcontent'

const LocContent = ({ data }) => {
  const body = data?.content?.description_2

  return (
    <section className='location_content pt-[20px] pb-[40px]'>
      <div className='container'>
        <Link href='/location' className='back_btn flex items-center gap-[10px]'>
          <Backicon /> All Locations
        </Link>

        {hasHtmlContent(body) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className='location_content_body mt-[30px]'
            dangerouslySetInnerHTML={{ __html: decodeHtml(body) }}
          />
        )}
      </div>
    </section>
  )
}

export default LocContent
