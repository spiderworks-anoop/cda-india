// components/Popup.js
import React, { useEffect, useState } from 'react'
import { Closeicon } from './svgicon'
import { ContactApi } from '@/Datas/endpoints/contact'
import { set, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ServicesApi } from '@/Datas/endpoints/services'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PackPopup = ({ isOpen, onClose, serData, packageData }) => {
  // if (!isOpen) return null;
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const [successMessage, setSuccessMessage] = useState('')
  const [serviceId, setServiceId] = useState(null)
  const [open, setOpen] = useState(false)
  const [list, setList] = useState(null)
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(false)

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
  useEffect(() => {
    fetchList()
  }, [])
  const onSubmit = async data => {
    const phoneLength = phone.replace(/\D/g, '').length
    if (!phone || phoneLength < 5 || phoneLength > 13) {
      setPhoneError(true)
      return
    } else {
      setPhoneError(false)
    }
    console.log(data)
    let datatosubmit = {
      package_id: packageData?.id,
      ...data,
      phone_number: `+${phone}`,
      utm_source: sessionStorage.getItem('utmSource') || '',
      utm_medium: sessionStorage.getItem('utmMedium') || '',
      utm_campaign: sessionStorage.getItem('utmCampaign') || '',
      source_url: sessionStorage.getItem('source_url') || '',
      lead_type:`package : ${serData?.title} - ${packageData?.title}`
    }

    // if (ifBrochure) {
    //   datatosubmit.lead_type = 'Download Brochure Form'
    // }

    try {
      const response = await ContactApi.contact(datatosubmit)
      reset()
      if (response?.status === 200) {
        router.push('/thank-you')
      }
      setSuccessMessage('Your message has been submitted successfully! ✅')
    //   if (ifBrochure) {
    //     window.open('/doc/COMPANY-PROFILE-CDA.pdf', '_blank')
    //   }
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (err) {
      console.error('Submission error:', err)
    }
  }
  // Return null AFTER hooks
  console.log('object', list)
  return (
    <div className='aaaaa fixed inset-0 flex items-center justify-center z-10 popup_bg'>
      <div className='Packpopup Enquiry_popup  relative'>
        <button
          className='absolute top-[25px] right-[20px] cursor-pointer'
          onClick={onClose}
        >
          <Closeicon />
        </button>

        <div className='grid md:grid-cols-2 gap-[50px] items-center'>
          <div>
            <h2> {serData?.title} </h2>

            <hr />
            <h4>{packageData?.title}</h4>
            <div className='flex items-center gap-[15px]'>
              <h6>Starting from</h6>
              <h3
                dangerouslySetInnerHTML={{
                  __html: packageData?.content?.value_per_month_1
                }}
              />
            </div>
          </div>

          <div>
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
              </div>

              <div className='mt-[20px]'>
                <label>Number</label>
                <PhoneInput
                  country={'sa'}
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
                    fontSize: '14px'
                  }}
                />
              </div>

              {successMessage && (
                <div className='mt-4 text-green-600'>{successMessage}</div>
              )}

              <div className='mt-6'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackPopup
