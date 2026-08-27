import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Loc1 from '@/public/images/serdet1.png'
import { WhiteBtn } from '@/components/common/svgicon'
import Popup from '@/components/common/Popup'

const LocBanner = ({ data }) => {

  const [isPopupOpen, setPopupOpen] = useState(false)

  const title = data?.content?.title_1 || data?.title || data?.name
  const description = data?.content?.description_1 || data?.short_description

  return (
    <>
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
      )}

      <section className='ser-det-banner relative  location_banner'>
        <Image
          src={data?.banner_image?.file_path || Loc1}
          alt={data?.banner_image?.alt_text || title || ''}
          width={1920}
          height={773}
        />

        <div className='absolute top-0 left-0 w-full h-full z-[2] flex items-end pb-[60px]'>
          <div className='container relative z-[1]'>
            <div className='grid md:grid-cols-2 gap-[15px]'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className='md:flex  items-center'
              >
                <div>
                  <h2>{title}</h2>

                  {description && (
                    <div
                      className='p'
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}

                  {data?.content?.button_text_1 && (
                    <a onClick={() => setPopupOpen(true)}>
                      <WhiteBtn btn2text={data?.content?.button_text_1} />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LocBanner
