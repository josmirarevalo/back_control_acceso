const UsuarioImagenes = require('../models/usuarioimagenes.model');
const sequelize       = require('../utils/database');

//-----------------------------------------------------------------------------------------------------------//
//                                 Método para obtener todos los registros de Imagenes por Usuario
//-----------------------------------------------------------------------------------------------------------//
exports.getList = (request, response) => {
    const { id_usuario } = request.params;
    UsuarioImagenes.findAll({
        where: {id_usuario : id_usuario},
        order: [['id', 'ASC']]
    })
     .then(records => {
         if(records)
            response.status(200).send({
                ok:true,
                message: '',
                result: records
            });
         else
            response.status(400).send({
                ok: false,
                message: 'No se localizaron Imágenes asociadas al Usuario',
                result: records
            });
    });
};

//-----------------------------------------------------------------------------------------------------------//
//                                 Método para obtener un registro de Imagen por Usuario
//-----------------------------------------------------------------------------------------------------------//
exports.getOne = (request, response) => {
    const { id } = request.params; 
    UsuarioImagenes.findOne({
        where: {id: id}
    }).then(record => {
        if(record)
            response.status(200).send({
                ok: true,
                message: 'Imágen encontrada',
                result: record
            });
         else
            response.status(400).send({
                ok: false,
                message: 'Imágen no encontrada',
                result: record
            });
        }).catch(error=>{
            console.log("Error",error)
            response.status(500).send({
                ok: false,
                message: 'Error al tratar de buscar Imágen',
                result: error
            });
        });
}

//-----------------------------------------------------------------------------------------------------------//
//                                 Método para crear un registro de Imagen por Usuario
//-----------------------------------------------------------------------------------------------------------//
exports.create = (request, response) => {
    const { id_usuario,            
            imagen_usuario} = request.body;
        UsuarioImagenes.create({ id_usuario,
                                imagen_usuario})
        .then(record=>{
            return response.status(201).json({
                ok: true,
                message: 'Imágen de Usuario creada exitosamente.', 
                result: record
            });
        }).catch(err=>{
        return response.status(500).json({
            ok: false,
            message: 'Error al crear Imágen',
            err
        });
    });
}

//-----------------------------------------------------------------------------------------------------------//
//                                 Método para Modificar un registro de Imagen por Usuario
//-----------------------------------------------------------------------------------------------------------//
exports.update = (request, response) => {
    const {id}   = request.params;
    const { id_usuario,            
            imagen_usuario} = request.body;
    UsuarioImagenes.update(
           { id_usuario,
            imagen_usuario 
           },
           { where : {id} }
         )
    .then(result=>{
        response.status(200).json({
            ok: true,
            message: 'Imágen actualizada exitosamente.',
            result: result
        });
    })
    .catch(err=>{
        response.status(500).json({
            ok: false,
            message: 'No se pudo actualizar Imágen.',
            err
        });
    });
}


//-----------------------------------------------------------------------------------------------------------//
//                                  Método para Eliminar Registros de Imagen asociada a un Usuario
//-----------------------------------------------------------------------------------------------------------//
exports.delete = (request, response) => {
    const {id} = request.params;
    UsuarioImagenes.findOne({
        where: {id}
    })
    .then(record=>{
        record.destroy();
        response.status(200).json({
            ok: true,
            message: 'Imágen de Usuario eliminada exitosamente.',
            result: record
        });
    })
    .catch(error=>{
        response.status(500).json({
        ok: false,
        message: 'No se pudo eliminar la Imágen del Usuario.',
        result: error
        });
    });
    }