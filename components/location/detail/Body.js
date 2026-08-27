import Link from 'next/link'
import { motion } from 'framer-motion'
import { Backicon } from '@/components/common/svgicon'
import { decodeHtml, hasHtmlContent } from '@/components/common/functions/htmlcontent'

const LocBody = ({ data }) => {
  const body = data?.content?.description_2
  // Only a service has somewhere to go back to - its city. A city page is
  // already the top of this branch, so it gets no back link.
  const parent = data?.parent

  return (
    <section className='location_content pt-[20px] pb-[40px]'>
      <div className='container'>
        {parent?.slug && (
          <Link href={`/${parent?.slug}`} className='back_btn flex items-center gap-[10px]'>
            <Backicon /> All Services In {parent?.title || parent?.name}
          </Link>
        )}

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

export default LocBody
