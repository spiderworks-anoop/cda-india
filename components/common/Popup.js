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

// `service`    - the record of the service the page is about, when the page
//                knows one. Preselects the dropdown so the lead is attributed
//                even if the visitor never opens it.
// `leadSource` - names the button/section that opened this popup, for the
//                placements that are not tied to a single service.
const Popup = ({ isOpen, onClose, ifBrochure, service, leadSource }) => {
  // if (!isOpen) return null;
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitted }
  } = useForm()

  const { executeRecaptcha } = useGoogleReCaptcha()

  const [errorMessage, setErrorMessage] = useState('')
  const [serviceId, setServiceId] = useState(null)
  const [open, setOpen] = useState(false)
  const [list, setList] = useState(null)
  const [phone, setPhone] = useState('')
  const [general, setGeneral] = useState()
  const serviceRef = useRef(null)

  const [utmSource, setUtmSource] = useState("")
  const [utmCamp, setUtmCamp] = useState("")
  const [utmMedium, setUtmMedium] = useState("")

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setUtmSource(searchParams.get("utm_source") || "")
    setUtmCamp(searchParams.get("utm_campaign") || "")
    setUtmMedium(searchParams.get("utm_medium") || "")
  }, [])


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

  // Seed the dropdown from the page, without overwriting a choice the visitor
  // has already made (this re-runs whenever the parent re-renders).
  useEffect(() => {
    // Title, not id: it is what the select renders and what the label uses, so
    // an id-only record would just blank the placeholder.
    if (!service?.title) return
    if (serviceId) return
    setServiceId(service)
    setValue('service', service.title)
  }, [service?.id, service?.title, serviceId, setValue])

  const onPhoneChange = value => {
    setPhone(value)
    // Only re-validate once a submit has already flagged it, so the error
    // does not appear while the visitor is still typing the number.
    setValue('phone_number', value, { shouldValidate: isSubmitted })
  }

  const handleService = data => {
    setServiceId(data)
    setValue('service', data?.title, { shouldValidate: isSubmitted })
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
  const onSubmit = async formValues => {
    setErrorMessage('')

    // `service` only backs the dropdown's required rule; the API takes the
    // service as `service_id` and as part of `lead_type`, so drop it here.
    const { service: selectedService, ...data } = formValues

    if (!executeRecaptcha) {
      setErrorMessage('reCAPTCHA not ready')
      return
    }

    const token = await executeRecaptcha('contact_form_submit')
    const pageUrl = typeof window !== 'undefined' ? window.location.origin + router.asPath : '';
    // This used to be `service : ${serviceId?.title}` unconditionally, so every
    // lead from a placement where no service was picked arrived as
    // "service : undefined". Resolve it from the most specific thing known:
    // the brochure form, then the selected or preselected service, then the
    // button that opened the popup. The page is already carried by source_url,
    // so the label only has to name the button.
    const leadType = ifBrochure
      ? 'Download Brochure Form'
      : serviceId?.title
        ? `Service : ${serviceId?.title}`
        : leadSource || 'General Enquiry'

    // console.log(data)
    let datatosubmit = {
      ...data,
      phone_number: `+${phone}`,
      recaptcha_token: token,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCamp,
      source_url: pageUrl,
      lead_type: leadType
    }

    // Omitted rather than sent as undefined when nothing is selected.
    if (serviceId?.id) {
      datatosubmit.service_id = serviceId?.id
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
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name && (
                  <span className='field_error' role='alert'>
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label>Email</label>
                <input
                  type='text'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+[.][^@\s]+$/,
                      message: 'Enter a valid email'
                    }
                  })}
                  placeholder='Enter your email'
                  className={`w-full p-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && (
                  <span className='field_error' role='alert'>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label>Number</label>
                {/* The visible control is PhoneInput, which is not a native
                    input react-hook-form can register. This hidden field mirrors
                    its value so the number is validated in the same submit pass
                    as the rest and reports its message the same way. */}
                <input
                  type='hidden'
                  {...register('phone_number', {
                    required: 'Phone number is required',
                    validate: value => {
                      const digits = String(value || '').replace(/[^0-9]/g, '').length
                      return (
                        (digits >= 5 && digits <= 13) ||
                        'Enter a valid phone number'
                      )
                    }
                  })}
                />
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={onPhoneChange}
                  enableSearch
                  inputClass={`w-full ${
                    errors.phone_number ? 'border-red-500' : 'border-gray-300'
                  }`}
                  inputProps={{ 'aria-invalid': errors.phone_number ? 'true' : 'false' }}
                  inputStyle={{
                    width: '100%',
                    height: '40px',
                    paddingLeft: '48px',
                    borderColor: errors.phone_number ? '#f87171' : '#d1d5db',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  buttonStyle={{
                    borderColor: errors.phone_number ? '#f87171' : '#cacaca'
                  }}
                />
                {errors.phone_number && (
                  <span className='field_error' role='alert'>
                    {errors.phone_number.message}
                  </span>
                )}
              </div>

              <div className='relative' ref={serviceRef}>
                <label>Service</label>
                {/* Same trick as the phone field: the dropdown is a div, so the
                    selected title is mirrored into a registered hidden input.
                    On a service detail page it is already seeded from the
                    `service` prop, so the field starts valid. */}
                <input
                  type='hidden'
                  {...register('service', {
                    required: 'Please select a service'
                  })}
                />
                <div
                  onClick={() => setOpen(!open)}
                  className={`service_select ${open ? 'is-open' : ''} ${
                    errors.service ? 'has-error' : ''
                  }`}
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
                {errors.service && (
                  <span className='field_error' role='alert'>
                    {errors.service.message}
                  </span>
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
                className={`btn ripple-button px-6 py-2 text-white rounded ${isSubmitting ? 'bg-gray-400' : 'bg-black'
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


