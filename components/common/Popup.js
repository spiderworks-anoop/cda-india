// components/Popup.js
import React, { useEffect, useRef, useState } from 'react'
import { Callicon, Closeicon, WhatsAppicon } from './svgicon'
import { ContactApi } from '@/Datas/endpoints/contact'
import { set, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ServicesApi } from '@/Datas/endpoints/services'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { GeneralApi } from '@/Datas/endpoints/general'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const Popup = ({ isOpen, onClose, ifBrochure }) => {
  // if (!isOpen) return null;
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const { executeRecaptcha } = useGoogleReCaptcha()

  const [errorMessage, setErrorMessage] = useState('')
  const [serviceId, setServiceId] = useState(null)
  const [open, setOpen] = useState(false)
  const [list, setList] = useState(null)
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [general, setGeneral] = useState()
  const serviceRef = useRef(null)

  // stop the page behind the popup from scrolling
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // close the service dropdown on outside click / Escape
  useEffect(() => {
    if (!open) return

    const handleOutside = e => {
      if (serviceRef.current && !serviceRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleKey = e => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const onPhoneChange = value => {
    setPhone(value)
    const numericLength = value.replace(/\D/g, '').length

    if (numericLength >= 5 && numericLength <= 13) {
      setPhoneError(false)
    } else {
      setPhoneError(true)
    }
  }

  const handleService = data => {
    setServiceId(data)
    setOpen(false)
  }
  const fetchList = async () => {
    try {
      const res = await ServicesApi.listpage()
      setList(res?.data?.data)
    } catch (error) {
      console.log('error fetching services', error)
    }
  }
  const fetchGeneral = async () => {
    try {
      const res = await GeneralApi.general()
      setGeneral(res?.data?.data)
    } catch (error) {
      console.log('error fetching services', error)
    }
  }
  useEffect(() => {
    fetchList()
    fetchGeneral()
  }, [])
  const onSubmit = async data => {
    setErrorMessage('')

    const phoneLength = phone.replace(/\D/g, '').length
    if (!phone || phoneLength < 5 || phoneLength > 13) {
      setPhoneError(true)
      return
    } else {
      setPhoneError(false)
    }

    if (!executeRecaptcha) {
      setErrorMessage('reCAPTCHA not ready')
      return
    }

    const token = await executeRecaptcha('contact_form_submit')

    // console.log(data)
    let datatosubmit = {
      service_id: serviceId?.id,
      ...data,
      phone_number: `+${phone}`,
      recaptcha_token: token,
      utm_source: sessionStorage.getItem('utmSource') || '',
      utm_medium: sessionStorage.getItem('utmMedium') || '',
      utm_campaign: sessionStorage.getItem('utmCampaign') || '',
      source_url: sessionStorage.getItem('source_url') || '',
      lead_type: `service : ${serviceId?.title}`
    }

    if (ifBrochure) {
      datatosubmit.lead_type = 'Download Brochure Form'
    }

    try {
      const response = await ContactApi.contact(datatosubmit)
      reset()
      if (response?.status === 200) {
        router.push('/thank-you')
      }
      if (ifBrochure) {
        window.open('/doc/COMPANY-PROFILE-CDA.pdf', '_blank')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setErrorMessage('Something went wrong. Please try again.')
    }
  }
  // Return null AFTER hooks
  // console.log(general)
  return (
    <div
      className='fixed inset-0 z-10 popup_bg overflow-y-auto overscroll-contain'
    >
      <div className='flex min-h-full items-center justify-center p-[12px] md:p-[20px]'>
        <div className='Enquiry_popup relative'>
          <button
            className='absolute top-[10px] right-[10px] md:top-[25px] md:right-[20px] p-[5px] cursor-pointer z-[2]'
            onClick={onClose}
          >
            <Closeicon />
          </button>

          <h2>
            Simplify <br /> Your Finances <br /> with Expert Help
          </h2>
          <p>
            Get expert guidance and tailored solutions for your business needs!
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid md:grid-cols-2 md:gap-[34px] gap-[10px] md:mt-[26px] mt-[10px]'>
              <div>
                <label>Name</label>
                <input
                  type='text'
                  {...register('name', { required: 'Name is required' })}
                  placeholder='Enter your name'
                  className={`w-full p-2 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  type='text'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Enter a valid email'
                    }
                  })}
                  placeholder='Enter your email'
                  className={`w-full p-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label>Number</label>
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={onPhoneChange}
                  enableSearch
                  inputClass={`w-full ${
                    phoneError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  inputStyle={{
                    width: '100%',
                    height: '40px',
                    paddingLeft: '48px',
                    borderColor: phoneError ? '#f87171' : '#d1d5db',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div className='relative' ref={serviceRef}>
                <label>Service</label>
                {/* <input
                type="text"
                {...register("subject")}
                placeholder="Select the Service"
                className="w-full p-2 border border-gray-300"
              /> */}
                <div
                  onClick={() => setOpen(!open)}
                  className={`service_select ${open ? 'is-open' : ''}`}
                >
                  <span className={serviceId ? '' : 'placeholder'}>
                    {serviceId ? serviceId?.title : 'Select Service'}
                  </span>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path d='M12 15L17 10H7L12 15Z' fill='#101828'></path>
                  </svg>
                </div>
                {open && (
                  <div className='service_dropdown'>
                    {list?.length ? (
                      list.map((data, i) => (
                        <div
                          onClick={() => handleService(data)}
                          key={i}
                          className={`service_option ${
                            serviceId?.id === data?.id ? 'is-selected' : ''
                          }`}
                        >
                          {data?.title}
                        </div>
                      ))
                    ) : (
                      <div className='service_option is-empty'>
                        No services found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {errorMessage && (
              <p className='form_error mt-4' role='alert'>
                {errorMessage}
              </p>
            )}

            <div className='md:mt-6 mt-[20px]'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={`btn ripple-button px-6 py-2 text-white rounded ${
                  isSubmitting ? 'bg-gray-400' : 'bg-black'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Now'}
              </button>
            </div>
          </form>

          <hr className='md:mt-[25px] mt-[20px] border-[#fff]' />

          <div className='md:pt-[25px] pt-[20px] flex items-center gap-[12px] md:gap-[20px] justify-center'>
            <a
              href={`tel:${general?.all_settings?.contact_number}`}
              className='call-back flex items-center gap-[15px] justify-between flex-1 max-w-[140px] md:flex-none'
            >
              {' '}
              Call <Callicon />{' '}
            </a>
            <a
              className='chat-back flex items-center gap-[15px] justify-between flex-1 max-w-[140px] md:flex-none'
              href={`https://wa.me/${general?.all_settings?.whatsapp_number}`}
              target='_blank'
            >
              {' '}
              Chat <WhatsAppicon />{' '}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup


