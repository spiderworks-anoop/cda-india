export const Urlredirect = url => {
  if (!url) {
    console.warn('URL not given');  
    return '#';
  }
  if (url.startsWith('/')) {
    return url
  } else {
    const name = '/' + url
    return name
  }
}
