import tgCookie from '@/utils/cookie'
import config from '@/utils/config'

const cookieKey = config.cookieKey.USER

export function getToken() {
  var token = tgCookie.get(cookieKey.AUTH_TOKEN)
  if (!token) return token
  return JSON.parse(token).access_token
}

export function getRefreshToken() {
  var token = tgCookie.get(cookieKey.REFRESH_TOKEN)
  if (!token) return token
  return JSON.parse(token).refresh_token
}

export function removeToken() {
  tgCookie.remove({ key: cookieKey.REFRESH_TOKEN })
  return tgCookie.remove({ key: cookieKey.AUTH_TOKEN })
}
