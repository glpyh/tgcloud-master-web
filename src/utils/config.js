const cookieConfig = {
  host: 'http://passport.tgcloud.net',
  key_prefix: 'TGCLOUD_',
  secret_key: '^#rwd6Ffz$X5alRN',
  domain: '.tgcloud.net',
  secret: {
    key_str: '^#rwd6Ffz$X5alRN',
    iv_str: '^#rwd6Ffz$X5alRN'
  }
}

if (process.env.NODE_ENV === 'production') {
  cookieConfig.domain = '.tgcloud.net'
} else {
  cookieConfig.domain = '.tgcloud.net'
  cookieConfig.lockr_prefix += 'DEV_'
}

const cookieKey = {
  USER: {
    LOGIN_NAME: 'LOGIN_NAME',
    MENU_LIST: 'MENU_LIST',
    REMEMBER_ME: 'REMEMBER_ME',
    AUTH_TOKEN: 'AUTH_TOKEN',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    REDIRECT_URI: 'REDIRECT_URI'
  }
}

// 状态
const userStatus = [
  { key: -1, display_name: '删除' },
  { key: 0, display_name: '正常' },
  { key: 1, display_name: '锁定' }
]

// arr to obj
const userStatusValue = userStatus.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

const genderEnum = [
  { key: 0, display_name: '女' },
  { key: 1, display_name: '男' }
]

// arr to obj
const userGenderValue = genderEnum.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default
{
  cookieConfig,
  cookieKey,
  userStatus,
  userStatusValue,
  genderEnum,
  userGenderValue
}
