import axios from 'axios'

const ReadableAPI = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: { 'Authorization': 'whatever-you-want' }
})

export default ReadableAPI
