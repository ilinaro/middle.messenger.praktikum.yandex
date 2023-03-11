enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

function queryStringify(data: Record<string, unknown>): string {
  const params = []

  for (const key in data) {
    if (typeof data[key] === 'object') {
      params.push(`${key}=${JSON.stringify(data[key])}`)
    } else {
      params.push(`${key}=${data[key]}`)
    }
  }

  return `?${params.join('&')}`
}

export default class HTTPTransport {
  request = (
    url: string,
    options: {
      method?: METHODS
      headers?: Record<string, string>
      data?: unknown
      timeout?: number
    } = {},
  ) => {
    const {
      method = METHODS.GET,
      headers = {},
      data = {},
      timeout = 5000,
    } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      xhr.timeout = timeout

      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value)
      }

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response)
        } else {
          reject(new Error(`Ошибка: ${xhr.status} ${xhr.statusText}`))
        }
      }

      xhr.onerror = function () {
        reject(new Error(`Ошибка сети`))
      }

      xhr.ontimeout = function () {
        reject(new Error(`Превышено время ожидания ответа сервера`))
      }

      if (method === METHODS.GET) {
        xhr.send()
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }

  get = (
    url: string,
    options: {
      params?: Record<string, unknown>
      headers?: Record<string, string>
      timeout?: number
    } = {},
  ) => {
    const { params = {}, ...restOptions } = options
    const queryString = queryStringify(params)
    return this.request(`${url}${queryString}`, {
      ...restOptions,
      method: METHODS.GET,
    })
  }

  post = (
    url: string,
    options: {
      headers?: Record<string, string>
      data?: unknown
      timeout?: number
    } = {},
  ) => {
    return this.request(url, { ...options, method: METHODS.POST })
  }

  put = (
    url: string,
    options: {
      headers?: Record<string, string>
      data?: unknown
      timeout?: number
    } = {},
  ) => {
    return this.request(url, { ...options, method: METHODS.PUT })
  }

  delete = (
    url: string,
    options: {
      headers?: Record<string, string>
      data?: unknown
      timeout?: number
    } = {},
  ) => {
    return this.request(url, { ...options, method: METHODS.DELETE })
  }
}
