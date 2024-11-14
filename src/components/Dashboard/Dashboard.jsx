import { useState, useEffect } from 'react'
import PetDetail from '../PetDetail'
import PetList from '../PetList'
import PetForm from '../PetForm'
import * as petService from '../../services/petService'

const Dashboard = ({ user }) => {
  const [petList, setPetList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index()

        if (pets.error) {
          throw new Error(pets.error)
        }
        setPetList(pets)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPets()
  }, [])

  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = (pet) => {
    if (!pet.name) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData)
      if (newPet.error) {
        throw new Error(newPet.error)
      }
      setPetList([newPet, ...petList])
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdatePet = async (formData, id) => {
    try {
      const updatedPet = await petService.updatePet(formData, id)

      if (updatedPet.error) {
        throw new Error(updatedPet.error)
      }

      setPetList((prevState) =>
        prevState.map((pet) => (pet._id === id ? updatedPet : pet))
      )

      setIsFormOpen(false)
      setSelected(updatedPet)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemovePet = async (id) => {
    try {
      const deletedPet = await petService.deletePet(id)

      if (deletedPet.error) {
        throw new Error(deletedPet.error)
      }

      setPetList((prevState) =>
        prevState.filter((pet) => pet._id !== deletedPet._id)
      )
      setIsFormOpen(false)
      setSelected(null)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
      <PetList
        petList={petList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <PetForm
          handleAddPet={handleAddPet}
          selected={selected}
          handleUpdatePet={handleUpdatePet}
        />
      ) : (
        <PetDetail
          selected={selected}
          handleFormView={handleFormView}
          handleRemovePet={handleRemovePet}
        />
      )}
    </main>
  )
}

export default Dashboard
