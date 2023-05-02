const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
  try {
    res.status(200).json({
      message: 'Nico nico'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.message
    })
  }
})

router.get('/dogs', async (req, res) => {
  try {
    const dogsList = await getAllDogs()
    if (!dogsList.length > 0) {
      res.status(404).send({
        error: 'No dogs were found in the database'
      })
    } else {
      res.status(200).json(dogsList)
    }

  } catch (error) {
    console.error(error)
    res.status(500).send({
      error: error.message
    })
  }
})


router.get('/dogs/search', async (req, res) => {
  try {
    const { name } = req.query
    const dog = await getDogByName(name)
    if (!dog.length > 0) {
      res.status(404).send({
        error: `The search found no results`
      })
    } else {
      res.status(200).json(dog)
    }

  } catch (error) {
    console.error(error)
    res.status(500).send({
      error: error.message
    })
  }
})


router.get('/dogs/:idRaza', async (req, res) => {
  try {
    const { idRaza } = req.params
    const dog = await getdog(idRaza)
    if (!dog) {
      res.status(404).send({
        error: `A dog with the id was not found ${idRaza}`
      })
    } else {
      res.status(200).json(dog)
    }

  } catch (error) {
    console.error(error)
    res.status(500).send({
      error: error.message
    })
  }
})

router.post('/dogs', async (req, res) => {
  try {
    const { name, height, weight, years, dogId } = req.body
    const dog = await postDog({ name, height, weight, years, dogId })
    if (!dog) {
      throw new Error(`DogId ${dogId} not valid`)
    } else {
      res.status(201).json(dog)
    }
  } catch (error) {
    console.error(error)
    res.status(404).json({
      error: error.message
    })
  }
})

router.get('/temperaments', async (req, res) => {

  try {
    const temperamentsList = await getAlltemperaments()
    if (!temperamentsList.length > 0) {
      res.status(404).send({
        error: 'No temperaments were found in the database'
      })
    } else {
      res.status(200).json(temperamentsList)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({
      error: error.message
    })
  }
})
module.exports = router;
