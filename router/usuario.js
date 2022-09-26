//importar Router desde express
const {Router} = require('express');
const { find } = require('../models/Usuario');
const router = Router();

//importar el modelo Usuario
const Usuario = require('../models/Usuario');

router.get('/', async function(req,res){
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send('hay un error');
    }
});

//___________________________________________________________________________________________________________

router.post('/', async function(req,res){
    try {
        const emailExistente = await Usuario.findOne({email: req.body.email});
        if(emailExistente){
            return res.status(400).send('usuario existente');
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date;
        usuario.fechaActualizacion = new Date;

        //guardar en bd
        usuario = await usuario.save();

        res.send(usuario);
    } catch (error) {
        res.status(500).send('error')
    }
});

//___________________________________________________________________________________________

router.put('/:usuarioId', async function(req,res){
    try {

        //se valida si el usuario no existe
        let usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario){
            return res.status(400).send('usuario no existe');
        }

        //si no entró en lo anterior, entonces si existe
        //entonces se valida que el nuevo email a poner, no lo tenga otro usuario
        const emailExistente = await Usuario.findOne({email: req.body.email, _id:{ $ne: usuario._id}});
        if(emailExistente){
            return res.status(400).send('el email ya está asignado a otro usuario distinto al que está intentando actualizar')
        }

        //setear los parámetros de la request a
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date;
        //guardar en bd
        usuario = await usuario.save();

        res.send(usuario);
    } catch (error) {
        res.status(500).send('error')
    }
});
//____________________________________________________________________________________________________________

module.exports = router;
