import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LoadBtn, LongArrowicon } from '@/components/common/svgicon'
import LocCard from '@/components/location/shared/Card'
import { LocationApi } from '@/Datas/endpoints/location'
import { HTMLParser } from '@/utils/HTMLParser'

const LocList = ({ shorttitle, title, description, listdata, metadata }) => {
  const [list, setList] = useState(listdata || [])
  const [meta, setMeta] = useState(metadata || null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // Keep in sync when the page is re-rendered with fresh ISR props.
  useEffect(() => {
    setList(listdata || [])
    setMeta(metadata || null)
    setPage(1)
  }, [listdata, metadata])

  useEffect(() => {
    if (page <= 1) return

    let cancelled = false

    const loadMoreLocations = async () => {
      try {
        setLoading(true)

        const response = await LocationApi.listpage({ page })
        if (cancelled) return

        setList((prev) => [...prev, ...(response?.data?.data || [])])
        setMeta(response?.data?.meta || null)
      } catch (error) {
        console.error('location load more error', error)
        // Roll back so the button stays usable and retries the same page.
        if (!cancelled) setPage((prev) => Math.max(1, prev - 1))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadMoreLocations()

    return () => {
      cancelled = true
    }
  }, [page])

  const loadMore = () => setPage((prev) => prev + 1)

  const hasMore = Boolean(meta) && meta?.current_page < meta?.last_page

  if (!list?.length) return null

  return (
    <section className='ser-offer-sec location_list_sec pt-[60px] pb-[50px] md:pb-[100px]'>
      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className='flex flex-col md:flex-row gap-[25px] md:gap-[10px] items-end justify-between ser-offer-head'
        >
          <div>
            <div className='max-w-[528px]'>
              {shorttitle && <h5>{shorttitle}</h5>}
              <h2>{title}</h2>
            </div>
          </div>

          {description && (
            <div>
              <div className='max-w-[506px]'>
                <div className='p'>{HTMLParser(description)}</div>
              </div>
            </div>
          )}
        </motion.div>

        <hr />

        <div className='flex flex-col gap-[50px] md:gap-[80px]'>
          {list?.map((location, index) => (
            <div className='location_group' key={location?.id || index}>
              <div className='flex flex-col md:flex-row md:items-end justify-between gap-[20px] location_group_head'>
                <div className='flex items-start gap-[18px] md:gap-[30px]'>
                  <h5>{String(index + 1).padStart(2, '0')}</h5>

                  <div className='max-w-[620px]'>
                    <h3>{location?.title || location?.name}</h3>
                    {location?.short_description && <p>{location?.short_description}</p>}
                  </div>
                </div>

                <Link
                  href={`/${location?.slug}`}
                  className='btn flex items-center gap-[10px] whitespace-nowrap'
                >
                  Explore {location?.title || location?.name} <LongArrowicon />
                </Link>
              </div>

              {location?.children?.length > 0 && (
                <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-[25px] md:gap-[35px] mt-[30px] md:mt-[45px]'>
                  {location?.children?.map((service, childIndex) => (
                    <LocCard
                      key={service?.id || childIndex}
                      item={service}
                      href={`/${location?.slug}/${service?.slug}`}
                      index={childIndex}
                      linktext='View Service'
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {hasMore && (
          <div className='flex justify-center pt-[40px] md:pt-[60px]'>
            <LoadBtn
              loadtext={loading ? 'Loading...' : 'Load More'}
              onClick={loadMore}
              disabled={loading}
            />
          </div>
        )}

      </div>
    </section>
  )
}

export default LocList
