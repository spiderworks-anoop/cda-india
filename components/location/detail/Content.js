import { motion } from 'framer-motion'
import { decodeHtml, hasHtmlContent } from '@/components/common/functions/htmlcontent'

// A headline over a long editorial body, for the copy that sits between the
// highlights and the sectors block.
//
// The CMS location page type has no field for this block - its content only
// defines title_1/description_1, which the banner already uses - so the copy
// below ships with the component. As soon as content.title_2 /
// content.description_2 exist in the dashboard they take over, per field, and
// this static copy drops out.
//
// The reveal is transform-only on purpose: an opacity fade that misses its
// whileInView leaves the whole block stuck invisible.

// --- static copy ----------------------------------------------------------
// Placeholder wording - edit here until the CMS fields exist.
const STATIC_BODY = [
  'Keeping accurate books is not simply a compliance exercise. Records that are current and properly reconciled are what let you see margin by product, spot a receivable drifting past its terms, and answer a lender or an auditor without a scramble. We handle the day to day bookkeeping, reconciliations and periodic reporting so your accounts stay clean and your filings stay on schedule.',
  'Every engagement starts with the state of your books as they actually are. We work through the existing ledgers, agree a chart of accounts that reflects how your business is really structured, and set a reporting rhythm that suits you - monthly for most, weekly where cash is tight or volumes are high. From there the work is steady and predictable, and you always know what has been done and what is coming.',
  'You deal with the same team throughout, so nobody has to be brought up to speed each time a question comes up. When something in your numbers needs a decision rather than an entry, we tell you while there is still time to act on it.'
]

const STATIC_POINTS = [
  'Day to day bookkeeping and ledger maintenance',
  'Bank, supplier and customer reconciliations',
  'Monthly management accounts you can actually read',
  'Year end preparation and support through the audit',
  'A named point of contact who knows your file'
]

const LocContent = ({ data }) => {
  // On a service page the parent is the city, so the heading can name both.
  const name = data?.title || data?.name
  const city = data?.parent?.title || data?.parent?.name

  const title =
    data?.content?.title_2 ||
    [name, city && `in ${city}`].filter(Boolean).join(' ') ||
    'How We Work'

  const body = data?.content?.description_2
  const hasCmsBody = hasHtmlContent(body)

  return (
    <section className='location_content pt-[40px] pb-[40px]'>
      <div className='container'>
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.15 }}
        >
          <h2 className='location_content_head'>{title}</h2>

          {hasCmsBody ? (
            <div
              className='location_content_body mt-[20px]'
              dangerouslySetInnerHTML={{ __html: decodeHtml(body) }}
            />
          ) : (
            <div className='location_content_body mt-[20px]'>
              {STATIC_BODY.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <ul className='location_content_points'>
                {STATIC_POINTS.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default LocContent
