import { useState } from 'react'

const PetForm = (props) => {
  const initialState = {
    name: '',
    age: '',
    breed: '',
    isAdoptable: false,
  }
  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  )

  const handleChange = (event) => {
    // const { name, value, checked, type } = event.target
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    const name = event.target.name

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    if (props.selected) {
      props.handleUpdatePet(formData, props.selected._id)
    } else {
      props.handleAddPet(formData)
    }
  }

  console.log(formData)

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor='age'>Age</label>
        <input
          type='number'
          id='age'
          name='age'
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor='breed'>Breed</label>
        <input
          id='breed'
          name='breed'
          value={formData.breed}
          onChange={handleChange}
          required
        />

        <label htmlFor='isAdoptable'>Check box to make pet Adoptable:</label>
        <input
          id='isAdoptable'
          name='isAdoptable'
          type='checkbox'
          checked={formData.isAdoptable}
          onChange={handleChange}
        />
        <button type='submit'>
          {props.selected ? 'Update Pet' : 'Add New Pet'}
        </button>
      </form>
    </div>
  )
}

export default PetForm
