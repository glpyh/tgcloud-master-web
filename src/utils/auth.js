import Cookies from 'js-cookie'

const TokenKey = 'TGCLOUD_AUTH_TOKEN'
const RefreshToken = 'REFRESH_TOKEN'

export function getToken() {
  var token = Cookies.get(TokenKey)
  if (!token) return token
  return JSON.parse(token).access_token
}

export function getRefreshToken() {
  var token = Cookies.get(TokenKey)
  if (!token) return token
  return JSON.parse(token).refresh_token
}

export function removeToken() {
  Cookies.remove(RefreshToken)
  return Cookies.remove(TokenKey)
}
