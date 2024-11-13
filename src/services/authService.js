const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`
import axios from 'axios'

const signup = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/signup`, formData)
    const data = await res.data
    if (data.err) {
      throw new Error(data.err)
    }
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export { signup }
