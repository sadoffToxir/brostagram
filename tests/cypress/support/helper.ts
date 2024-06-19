export const transformCookie = (token: string) => {
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 1)
  return decodeURIComponent(`{"token":"${token}","expiryDate":"${expiryDate.toISOString()}"}`)
}
