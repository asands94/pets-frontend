import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import * as petService from './services/petService'
import PetList from './components/PetList'
import PetDetail from './components/PetDetail'
import PetForm from './components/PetForm'

import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import Dashboard from './components/Dashboard/Dashboard'
import SignupForm from './components/SignupForm/SignupForm'

const App = () => {
  const [petList, setPetList] = useState([])
  const [selected, setSelected] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [user, setUser] = useState(null)

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
  }, [selected])

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
      console.log(petList)

      setSelected(null)
      setIsFormOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavBar user={user} />
      <Routes>
        {user ? (
          <Route path='/' element={<Dashboard user={user} />} />
        ) : (
          <Route path='/' element={<Landing />} />
        )}
      </Routes>
      {/* <PetList
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
      )} */}
    </>
  )
}

export default App
