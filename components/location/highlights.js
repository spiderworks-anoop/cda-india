import Image from 'next/image'
import { motion } from 'framer-motion'
import Sec1 from '../../public/images/sec1.svg'
import { BlueBtn } from '../common/svgicon'
import { useState } from 'react'
import Popup from '../common/Popup'

const LocHighlights = ({ data }) => {
  const [isPopupOpen, setPopupOpen] = useState(false)

  if (!data?.location_listing?.length) return null

  const name = data?.title || data?.name

  return (
    <>
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
      )}

      <section className='ser-det-sector pt-[50px] pb-[50px]'>
        <div className='container relative z-[1]'>
          <div className='sector_bg'>
            <div className='md:flex items-center justify-between'>
              <div className='max-w-[550px]'>
                <h3>What You Get With CDA</h3>
                <h5>{name}</h5>
              </div>

              <div className='hidden md:block'>
                <a onClick={() => setPopupOpen(true)} className='cursor-pointer'>
                  <BlueBtn btntext={'Talk To Us'} />
                </a>
              </div>
            </div>

            <div className='grid md:grid-cols-2 xl:grid-cols-3 mt-[58px] gap-[65px] md:gap-[37px]'>
              {data?.location_listing?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className='sect_list'
                >
                  <Image
                    src={item?.icon_image?.file_path || Sec1}
                    alt={item?.icon_image?.alt_text || ''}
                    width={32}
                    height={32}
                  />

                  <h4>{item?.title}</h4>
                  <p>{item?.short_description}</p>
                </motion.div>
              ))}
            </div>

            <div className='md:hidden mt-[60px]'>
              <a onClick={() => setPopupOpen(true)} className='cursor-pointer'>
                <BlueBtn btntext={'Talk To Us'} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LocHighlights
