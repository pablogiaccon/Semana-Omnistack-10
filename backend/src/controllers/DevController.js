const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index, show, store, update, destroy
//mostrar lista, mostra 1, cria, atualizar, deletar

module.exports = {

    async index(req, res) {
        return res.json(await Dev.find());
    },

    async store(req, res) {

        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            //Usa `` pra em uma string anexar uma variável
            const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);

            //name = login => caso não tenha name ele pega o login
            const { name = login, avatar_url, bio } = apiRes.data;

            //console.log(apiRes)
            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        //console.log(dev);
        return res.json(dev);
    },

    async update(req, res) {
        //Não deixar a github_username ser atualizado

        const { id } = req.params;
        const { name, avatar_url, bio, techs, latitude, longitude } = req.body;

        let updateDev = {};

        if (name) updateDev.name = name;
        if (avatar_url) updateDev.avatar_url = avatar_url;
        if (bio) updateDev.bio = bio;
        if (techs) updateDev.techs = parseStringAsArray(techs);
        if (latitude && longitude) updateDev.location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        const findDev = await Dev.findByIdAndUpdate(id, { $set: updateDev }, { new: true });

        return res.json(findDev);
    },

    async destroy(req, res) {

        const { id } = req.params;

        await Dev.findByIdAndDelete( id );

        return res.json({message: "User deleted!"});
    },

};