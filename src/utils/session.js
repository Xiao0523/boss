export function setSession(key, value) {
  if (typeof value === 'string') {
    sessionStorage.setItem(key, value)
  } else {
    sessionStorage.setItem(key, JSON.stringify(value))
  }
}

export function getSession(key) {
  const str = sessionStorage.getItem(key)
  // console.log('key,fangfa',str);
  if (typeof str === 'string') {
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  }
  return
}

export function clearOneSession(key) {
  window.sessionStorage.removeItem(key)
}

export function clearAllSession() {
  window.sessionStorage.clear()
}

