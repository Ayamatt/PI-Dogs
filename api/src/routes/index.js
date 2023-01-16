const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { dogs, dogsID, dogsPost, temper } = require('../Controllers/controllers.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', dogs);

router.get('/dogs/:idDog', dogsID)

router.post('/dogs', dogsPost)

router.get('/temperaments', temper)


module.exports = router;
