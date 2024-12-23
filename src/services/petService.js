const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`
import axios from 'axios'

const index = async () => {
  try {
    const res = await axios.get(BASE_URL)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const create = async (formData) => {
  try {
    const res = await axios.post(BASE_URL, formData)
    return res.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

const updatePet = async (formData, id) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, formData)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

const deletePet = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

export { index, create, updatePet, deletePet }
