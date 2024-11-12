const PetDetail = ({ selected }) => {
  if (!selected)
    return (
      <div>
        <h1>NO DETAILS</h1>
      </div>
    )

  return (
    <div>
      <h1>{selected.name}</h1>
      <h2>Breed: {selected.breed}</h2>
      <h2>
        Age: {selected.age} year{selected.age > 1 ? 's' : ''} old
      </h2>
    </div>
  )
}

export default PetDetail
