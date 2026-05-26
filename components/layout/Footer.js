import { useState, useEffect } from 'react'
import {
  Arrowlineicon,
  Callicon,
  CircleArrowicon,
  Downicon,
  Envelopicon,
  Faceicon,
  FaceXicon,
  FooterLogoicon,
  Instaicon,
  InstaXicon,
  Linkicon,
  RightLgicon,
  WhatsAppicon,
  Xicon,
  Youicon
} from '../common/svgicon'

import Noise from '../../components/common/Noise'
import Image from 'next/image'
import Foot1 from '../../public/images/foot.png'

import Foot2 from '../../public/images/logo.svg'

import Foot3 from '../../public/images/loca.png'
import Link from 'next/link'
import { Urlredirect } from '../common/functions/urlnavigate'
import Popup from '../common/Popup'
import { IoLogoWhatsapp } from 'react-icons/io5'

const FooterSection = ({ items }) => {
  const [isActive, setIsActive] = useState(false)

   
  return (
    <div className='border-b md:border-b-0 border-[#3A3A3A]'>
      <div
        onClick={() => setIsActive(!isActive)}
        className='flex items-center justify-between'
      >
        <h3>{items?.title}</h3>
        <div className='block md:hidden'>
          <Downicon />
        </div>
      </div>
      <ul className={isActive ? 'active' : ''}>
        {items?.children?.map((childitem, idx) => (
          <li key={idx}>
            <Link href={Urlredirect(childitem?.url)}>{childitem?.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FooterColumn = ({ title, items }) => {
  const [showAll, setShowAll] = useState(false)
  const [isActive, setIsActive] = useState(false)
  console.log('gddjdjd', items)
  return (
    <div className='border-b md:border-b-0 border-[#E5E5E5]'>
      <div
        onClick={() => setIsActive(!isActive)}
        className='flex items-center justify-between'
      >
        <h4>{title}</h4>
        <div className='block md:hidden'>
          <Downicon />
        </div>
      </div>

      <ul className={isActive ? 'active' : ''}>
        {items?.slice(0, 5)?.map((item, idx) => (
          <li key={idx}>
            <Link href={`/${item?.url}`} className='link'>
              {item?.title}
            </Link>
          </li>
        ))}

        {showAll &&
          items?.slice(5)?.map((item, idx) => (
            <li key={idx}>
              <a className='link'>{item?.title}</a>
            </li>
          ))}

        {items?.length > 5 && !showAll && (
          <li>
            <a
              className='view-btn flex items-center gap-[20px]'
              onClick={() => setShowAll(true)}
            >
              View All <Arrowlineicon />
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

const Footer = ({ general }) => {
  const [isPopupOpen, setPopupOpen] = useState(false)

   const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      const footer = document.getElementById('footer')
      const footerTop = footer?.getBoundingClientRect().top

      const windowHeight = window.innerHeight

      // Show after scroll
      if (scrollY > 100) {
        setShow(true)
      } else {
        setShow(false)
      }

      // Hide when footer visible
      if (footerTop && footerTop < windowHeight) {
        setShow(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          ifBrochure={true}
        />
      )}

      <footer id="footer">
        {/* <div className='footer1'>
                <div className='container'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-[25px] md:gap-[60px]'>

                


                        {general?.all_menus?.Extra_Footer_menu?.map ((list, indexitems) =>(

                            <FooterColumn key={indexitems} title={list?.title} items={list?.children} />

                        )) }
                        
                    </div>
                </div>
            </div> */}

        <div className='footer2'>
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
          <div className='container relative z-[5]'>
            <div className='grid md:grid-cols-3 gap-[50px] xl:gap-[100px] mb-[55px] '>
              <div>
                <Image
                  src={general?.all_settings?.logo}
                  alt=''
                  width={166}
                  height={84}
                />

                <h4> {general?.all_settings?.footer_content}</h4>

                <h5>Follow us</h5>

                <div className='flex items-center gap-[24px] mt-[22px]'>
                  {general?.all_settings?.['twitter-link'] && (
                    <Link
                      target='_blank'
                      href={general?.all_settings['twitter-link']}
                    >
                      <Xicon />{' '}
                    </Link>
                  )}

                  {general?.all_settings?.['facebook-link'] && (
                    <Link
                      target='_blank'
                      href={general?.all_settings['facebook-link']}
                    >
                      <Faceicon />{' '}
                    </Link>
                  )}

                  {general?.all_settings?.['instagram-link'] && (
                    <Link
                      target='_blank'
                      href={general?.all_settings['instagram-link']}
                    >
                      <Instaicon />{' '}
                    </Link>
                  )}

                  {general?.all_settings?.['youtube-link'] && (
                    <Link
                      target='_blank'
                      href={general?.all_settings['youtube-link']}
                    >
                      <Youicon />{' '}
                    </Link>
                  )}

                  {general?.all_settings?.['linkedin-link'] && (
                    <Link
                      target='_blank'
                      href={general?.all_settings['linkedin-link']}
                    >
                      <Linkicon />{' '}
                    </Link>
                  )}
                </div>
              </div>

              <div className='grid md:grid-cols-2 md:gap-[40px] xl:gap-[90px] border-t md:border-t-0 border-[#3A3A3A]'>
                {general?.all_menus?.Footer_Menu?.map((item, index) => (
                  <FooterSection key={index} items={item} />
                ))}
              </div>

              <div className='flex flex-col'>
                <div>
                  <span>reach to us</span>

                  <p> {general?.all_settings?.contact_address1}</p>

                  <div className='mt-[22px]'>
                    <Link
                      href={general?.all_settings?.google_map_link}
                      target='_blank'
                      className='link flex items-center gap-[10px]'
                    >
                      {' '}
                      <Image
                        src={Foot3}
                        alt=''
                        width={22}
                        height={22}
                      /> Maps <RightLgicon />{' '}
                    </Link>
                  </div>
                </div>

                <div className='mt-[50px] md:mt-auto'>
                  <a
                    onClick={() => setPopupOpen(true)}
                    className='btn flex items-center justify-between gap-[20px]'
                  >
                    {' '}
                    Download Brochure <CircleArrowicon />{' '}
                  </a>
                </div>
              </div>
            </div>

            <hr />

            <div className='grid  md:grid-cols-2 mt-[40px] gap-[15px] md:justify-between '>
              <p className='text-center md:text-left'>
                Copyright © 2026 Charles&Darwish. All rights reserved.{' '}
              </p>
              <div className='flex justify-center md:justify-end items-center'>
                <Link
                  href={`https://www.spiderworks.ae/`}
                  target='_blank'
                  rel='nofollow'
                >
                  {' '}
                  <p className='flex items-center gap-[10px]'>
                    Built for growth{' '}
                    <Image src={Foot1} alt='' width={27} height={31} />
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <hr />

          <div className="grid  grid-cols-2 mt-[40px] gap-[15px] justify-between">
            <p>Copyright © 2025 Charles&Darwish. All rights reserved. </p>
            <div className="flex justify-end items-center">
              <p className="flex items-center gap-[10px]">
                Built for growth{" "}
                <Image src={Foot1} alt="" width={27} height={31} />
              </p>
            </div>
          </div> */}
      </footer>

     <div className={`main-contact-icon-right-sd ${show ? 'show' : 'hide'}`}>
        <div className='main-contact-icon-wrap'>
          <div className='call-right quick-contact flex items-center justify-center'>
            <Callicon />
            <a
              className='slide-left'
              href={`tel:${general?.all_settings?.contact_number}`}
            >
              <span>
                <b> {general?.all_settings?.contact_number} </b>
              </span>
            </a>
          </div>

          <div className='mail-right quick-contact flex items-center justify-center'>
            <Envelopicon />
            <a
              href={`mailto:${general?.all_settings?.contact_email}`}
              target='_blank'
              className='slide-left'
            >
              <span>
                {' '}
                <b> {general?.all_settings?.contact_email} </b>
              </span>
            </a>
          </div>

          <div className='whatsapp-right quick-contact flex items-center justify-center'>
            <WhatsAppicon />

            <a
              className='slide-left'
              href={`https://wa.me/${general?.all_settings?.whatsapp_number}`}
              target='_blank'
            >
              <span>
                <b> {general?.all_settings?.whatsapp_number} </b>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
