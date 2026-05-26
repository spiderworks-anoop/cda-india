import { useState } from 'react'
import { BlueBtn } from '../common/svgicon'
import Accordion from '../common/Accordion'
import Popup from '../common/Popup'
import parse from 'html-react-parser'
import PackPopup from '../common/PackPopup'

const PackageListing = ({ listing, data }) => {
  const [popUp, setPopUp] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)

  const [packageData, setPackageData] = useState()

  const handlePopupOpen = ({ pData }) => {
    setPackageData(pData)
    setPopUp(true)
  }
  const handlePopupClose = () => {
    setPackageData()
    setPopUp(false)
  }

  const toggleAccordion = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const parseContent = datas => {
    const content = parse(typeof datas === 'string' ? datas : '')

    return content
  }

  return (
    <>
      {popUp && <PackPopup serData={data} packageData={packageData} onClose={handlePopupClose} />}
      <section className='pack-listing pt-[0px] pb-[80px]'>
        <div className='container relative z-[1]'>
          <div className='grid md:grid-cols-2 gap-[20px] pack-listing_head mt-[80px] mb-[25px]'>
            <div className='max-w-[500px]'>
              <h3 dangerouslySetInnerHTML={{ __html: data?.title }} />
            </div>
            <div className='flex md:justify-end max-w-[560px]'>
              <p
                dangerouslySetInnerHTML={{ __html: data?.short_description }}
              />
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-[30px] md:gap-[20px] xl:gap-[76px]'>
            {listing?.map((Pakdata, i) => (
              <div
                key={i}
                className='package-list-item flex flex-col justify-between'
              >
                <div>
                  <h3>{Pakdata.title}</h3>
                  <div className='package-list-titile'>
                    <h5>Starting from</h5>
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: Pakdata?.content?.value_per_month_1
                      }}
                    />
                    <h5>{Pakdata?.content?.transactions}</h5>
                  </div>

                  <div className='package-list-content'>
                    {Pakdata?.content?.title_2 && (
                      <div className='package-list-content-checkbox'>
                        <h3>{Pakdata?.content?.title_2}</h3>
                      </div>
                    )}

                    {Pakdata?.content?.points_2 && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Pakdata?.content?.points_2
                        }}
                      />
                    )}

                    {Pakdata?.addons?.map((addOn, j) => (
                      <>
                        <div key={j} className='package-list-content-checkbox'>
                          <h3>{addOn?.title}</h3>
                          <input
                            id={`switch-reg-${i}-${j}`}
                            className='check'
                            type='checkbox'
                          />
                          <label htmlFor={`switch-reg-${i}-${j}`}>Toggle</label>
                        </div>
                        {parseContent(addOn?.extra_description)}
                        {/* <div dangerouslySetInnerHTML={{__html:addOn?.extra_description}}/> */}
                      </>
                    ))}

                    {Pakdata?.content?.title_5 && (
                      <div className='package-list-content-checkbox'>
                        <h3>{Pakdata?.content?.title_5}</h3>
                        <div></div>
                        <input
                          id={`switch-reg-${i}`}
                          className='check'
                          type='checkbox'
                        />
                        <label htmlFor={`switch-reg-${i}`}>Toggle</label>
                      </div>
                    )}

                    {Pakdata?.content?.points_5 && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: Pakdata?.content?.points_5
                        }}
                      />
                    )}

                    {Pakdata?.content?.discount && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: Pakdata?.content?.discount
                        }}
                      />
                    )}

                    <div className='activities-section mt-[20px] mb-[20px]'>
                      {Pakdata?.account_features?.map((faq, j) => (
                        <Accordion
                          showicon={true}
                          key={i}
                          title={faq.title}
                          content={faq.extra_description}
                          isOpen={openIndex === `${i}-${j}`}
                          onToggle={() => toggleAccordion(`${i}-${j}`)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <a onClick={() => handlePopupOpen({pData:Pakdata})} href='#'>
                    <BlueBtn btntext='Book Now' />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* 
        <div className="grid md:grid-cols-2 gap-[20px] pack-listing_head mt-[80px] mb-[25px]"> 
          <div className='max-w-[500px]'>
            <h3>Packages for <b>Accounting and Tax</b></h3> 
          </div> 
          <div className='flex md:justify-end max-w-[560px]'>
            <p>Select the ideal package tailored for your accounting and tax requirements, ensuring comprehensive support and value.</p>
          </div>
        </div> */}

          {/* <div className='grid md:grid-cols-3 gap-[30px] md:gap-[40px] xl:gap-[76px]'>
        {listing?.map((data, i) => (
            <div
              key={i}
              className="package-list-item flex flex-col justify-between"
            >
              <div>
                <h3>{data.title}</h3>
                <div className="package-list-titile">
                  <h5>Starting from</h5>
                  <h2 dangerouslySetInnerHTML={{__html: data?.content?.value_per_month_1}}/>
                  <h5>{data?.content?.transactions}</h5>
                </div>
                <div className="package-list-content">
                  <div className="package-list-content-checkbox">
                    <div>
                      <h5>{data?.content?.title_3}</h5>
                      <h3>{data?.content?.account}</h3>
                    </div>
                    <input
                      id={`switch-reg-${i}`}
                      className="check"
                      type="checkbox"
                    />
                    <label htmlFor={`switch-reg-${i}`}>Toggle</label>
                  </div>

                  <ul>
                    <li>{data?.content?.employees} </li>
                    <li>{data?.content?.value_per_month_1}</li>
                  </ul>
                  {
                    data?.addons?.map((addOn, j) => (
                      <>
                  <div key={j} className='package-list-content-checkbox'>
                  <h3>{addOn?.title}</h3>
                  <input id={`switch-reg-${i}-${j}`} className='check' type='checkbox' />
                  <label htmlFor={`switch-reg-${i}-${j}`}>Toggle</label>
                  </div>
                  <div dangerouslySetInnerHTML={{__html: addOn?.extra_description}}/>
                      </>
                    ))
                  }
                  <div className='package-list-content-checkbox'>
                      <h3>{data?.content?.title_4}</h3>
                    <div>
                    </div>
                    <input id={`switch-reg-${i}`} className='check' type='checkbox' />
                    <label htmlFor={`switch-reg-${i}`}>Toggle</label>
                  </div>
                  <ul>
                    {pkg.registration.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                  <div className="activities-section mt-[20px] mb-[20px]">
                    {data?.account_features?.map((faq, j) => (
                      <Accordion
                        showicon={true}
                        key={i}
                        title={faq.title}
                        content={faq.extra_description}
                        isOpen={openIndex === `${i}-${j}`}
                        onToggle={() => toggleAccordion(`${i}-${j}`)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <a href="#">
                  <BlueBtn btntext="Book Now" />
                </a>
              </div>
            </div>
          ))}
        </div> */}
        </div>
      </section>
    </>
  )
}

export default PackageListing
