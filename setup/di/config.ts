export const config = {
  /** set default languahe */
  locale: 'en-EN',
  /** set Api based url for API repository */
  // apiBaseURL: `${process.env.cosoApiURL}api/`,
  apiBaseURL: 'http://localhost:13619/',

  /** set Api Image url for Profile images  */
  // apiImageURL: `${process.env.cosoApiURL}api/`,
  apiImageURL: 'http://localhost:13619/',

  /** set Auth based url for Auth repository */
  authApiBaseURL: `${process.env.cosoApiURL}prime-auth-api/`,
  /** set Prime Auth based url for Auth repository */
  primeApiURL: `${process.env.primeApiURL}`,
  /** set Auth localstorage key name in Auth repository */
  authLocalStorageName: 'AUTH',
  /** set Prime Api base url in Prime repository */
  primeApiBaseURL: `${process.env.primeApiURL}primeapi/v2/`,
  /** set Prime Api Upload url in Upload repository */
  primeApiUploadURL: `${process.env.primeApiURL}primeapi/v2/uploadSigner/`,
  /** set Prime Client Id in Prime repository */
  primeClientId: process.env.primeClientId,
};
