const axios = require('axios');
const { Dog, Temper} = require('../db.js');

const getApi = async () => {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds')
    const data = await api.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height?.metric,
            weight: el.weight?.metric,
            age: el.life_span,
            temperament: el.temperament,
            image: `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg`,
        };
    });
    return data;
}

const getDB = async () => {
    const dogs = await Dog.findAll({include: Temper});
    return dogs.map(el => {
        return {
            id: el.id,
            name: el.name,
            height_min: el.height_min,
            height_max: el.height_max,
            weight_min: el.weight_min,
            weight_max: el.weight_max,
            age: el.age,
            image: el.image,
            temperament: el.tempers.map(el => el.name).join(", "),
            createdDb: el.createdDb,
        };
    });
};

const getDogs = async () => {
    const apiData = await getApi();
    const apiDB = await getDB();
    const allDogs = apiData.concat(apiDB);
    return allDogs;
}

module.exports = {

    dogs: async (req,res) => {

        try {

            const dogs = await getDogs();
            let { name } = req.query;
            
            if(name) {
                const consulta = await dogs.filter(el => {
                    return el.name.toLowerCase().includes(name.toLowerCase())
                });
                consulta.length ? res.send(consulta) : res.send('No se encontró la raza especificada.');
            }
            else res.send(dogs)
        } 
        
        catch (error) {
            res.send({error: error.message});
            
        }
    },

    dogsID: async(req,res) => {
        
        try {
            const dogs = await getDogs();
            let { idDog } = req.params;
            const dog = await dogs.filter(el => {
                return el.id == idDog
            })
            
            dog.length ? res.send(dog) : res.send('No se encontró la raza especificada.');
            
        } catch (error) {
            res.send({error: error.message});
        }
    },

    temper: async(req,res) => {

        try {
            const DB = await Temper.findAll();
            if(!DB.length) {
                const apiTemper = await axios.get('https://api.thedogapi.com/v1/breeds')

                const tempers = apiTemper.data.map(el => {
                    return el.temperament?.split(", ")
                }).flat()

                const tempersObj = tempers.map(el => {
                    return {
                        name: el,
                    }
                })


                for(let i = 0; i < tempersObj.length; i++) {
                    if(tempersObj[i].name) {
                        await Temper.findOrCreate({
                            where: tempersObj[i],
                        })
                    }
                }
                const allTempers = await Temper.findAll();
                res.send(allTempers);

            }

            else res.send(DB);
        } 
        
        catch (error) {
            res.send({error: error.message});
        }
    },

    dogsPost: async(req,res) => {

        try {
            let { name, height_min, height_max, weight_min, weight_max, age, image, temper } = req.body;
            const aux = await Dog.create({name, height_min, height_max, weight_min, weight_max, age, image});
            for(let i = 0; i < temper.length; i++) {
                const temperament = await Temper.findAll({where: {name: temper[i]}});
                aux.addTemper(temperament[0].dataValues.id)
            }
            res.send(aux);

        } catch (error) {
            res.send({error: error.message});
        }
    }
}