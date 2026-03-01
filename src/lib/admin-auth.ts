const ADMIN_COOKIE_NAME = 'rf_admin'
const ADMIN_COOKIE_VALUE = '1'
const ADMIN_COOKIE_MAX_AGE = 60 * 60

function parseCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) {
    return new Map<string, string>()
  }

  return new Map(
    cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [name, ...valueParts] = part.split('=')
        return [name, valueParts.join('=')]
      })
  )
}

export function isAdminAuthorized(req: Request) {
  const cookies = parseCookieHeader(req.headers.get('cookie'))
  if (cookies.get(ADMIN_COOKIE_NAME) === ADMIN_COOKIE_VALUE) {
    return true
  }

  const password = req.headers.get('x-admin-password')
  return Boolean(password && password === process.env.ADMIN_PASSWORD)
}

export function createAdminSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${ADMIN_COOKIE_NAME}=${ADMIN_COOKIE_VALUE}; HttpOnly; Path=/; Max-Age=${ADMIN_COOKIE_MAX_AGE}; SameSite=Lax${secure}`
}

export function clearAdminSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${ADMIN_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`
}
