import { get, post } from '../config'

export const ContactApi = {
  page: data => get(`page/contact-Us`, { params: data }),
  career: data =>
    post(`jobs/apply`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  contact: data =>
    post(`contact/save`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}
