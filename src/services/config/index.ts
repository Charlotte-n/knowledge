let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8888'
} else {
  BASE_URL = 'http://localhost:8888'
}

export default BASE_URL