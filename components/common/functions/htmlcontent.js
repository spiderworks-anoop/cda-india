// The CMS stores some location bodies with their markup escaped once too many
// (`<div>&lt;h2&gt;Title&lt;/h2&gt;</div>`), so dropping the string straight
// into dangerouslySetInnerHTML prints the tags as text. Decode only when the
// string actually carries escaped tags - plain copy such as "A &lt; B" has to
// stay as it is.
const ENTITIES = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#039;': "'",
  '&amp;': '&'
}

const ESCAPED_TAG = /&lt;\/?[a-z][a-z0-9]*(\s[^&]*)?\/?&gt;/i

const decodeOnce = html =>
  html.replace(/&(?:lt|gt|quot|#0?39|amp);/gi, match => ENTITIES[match.toLowerCase()] ?? match)

export const decodeHtml = html => {
  if (typeof html !== 'string') return ''

  let output = html
  // Two passes is enough for the double-encoded content the API returns; the
  // guard stops it from ever chewing through legitimate text.
  for (let i = 0; i < 2 && ESCAPED_TAG.test(output); i++) {
    output = decodeOnce(output)
  }

  return output
}

// `<p><br></p>` is what an empty rich text field looks like coming back from
// the CMS, and rendering it leaves a stray gap in the page.
export const hasHtmlContent = html => {
  if (typeof html !== 'string') return false

  return (
    decodeHtml(html)
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .trim().length > 0
  )
}
