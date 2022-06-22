const Usuario = require('../models/usuario.model');
const OtherUtils = require('../utils/otherutils');
const jwt = require('jsonwebtoken');

//-----------------------------------------------------------------------------------------------------------//
//                                 Método para obtener todos los registros de Usuario
//-----------------------------------------------------------------------------------------------------------//
exports.getList = (request, response) => {
    Usuario.findAll({
        order: [['username', 'ASC']],        
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
                message: 'No se localizaron Usuarios',
                result: records
            });
    });
};

//-----------------------------------------------------------------------------------------------------------//
//                                Método para obtener un Usuario.
//-----------------------------------------------------------------------------------------------------------//
exports.getOne = (request, response) => {    
    const { username } = request.params; 
    Usuario.findOne({
        where: {username: username}
    }).then(record => {
        if(record)
            response.status(200).send({
                ok: true,
                message: 'Usuario encontrado',
                result: record
            });
         else
            response.status(400).send({
                ok: false,
                message: 'Usuario no encontrado',
                result: record
            });
        }).catch(error=>{           
            response.status(500).send({
                ok: false,
                message: 'Error al tratar de buscar Usuario',
                result: error
            });
        });
};

//-----------------------------------------------------------------------------------------------------------//
//                                  Método para Crear Registros de Usuario.
//-----------------------------------------------------------------------------------------------------------//
exports.create = (request, response) => {
    const {
            firstname,
            lastname,
            email,
            username,
            password,
            active
        } = request.body;
    Usuario.create({
            firstname,
            lastname,
            email,
            username,
            password,
            active
            })
        .then(record=>{
            return response.status(201).json({
                ok: true,
                message: 'Usuario fué creado exitosamente.', 
                result: record
            });
    }).catch(err=>{       
        return response.status(200).json({
            ok: false,
            message: 'Error al crear Usuario',
            result: err
        })
    })
}
//-----------------------------------------------------------------------------------------------------------//
//                                  Método para Modificar Registros de Usuarios
//-----------------------------------------------------------------------------------------------------------//
// exports.update = async (request, response) => {
//     try {
//         const {id}   = request.params;
//         const { firstname,
//             lastname,
//             email,
//             username,
//             password,
//             active} = request.body;
//         const updateUsuario = await Usuario.update({
//             firstname,
//             lastname,
//             email,
//             username,
//             password,
//             active
//         }, {where: {id}})

//             if(updateUsuario) {
//                 await Usuario.findOne({
//                     where: {id : id }                   
//                 }).then(user => {
//                     return response.status(200).json({
//                         ok: true,
//                         message: 'Dominio actualizado exitosamente.',
//                         result: user
//                     });
//                 }).catch(err => {
//                     return response.status(500).json({
//                         ok: false,
//                         message: 'No se pudo actualizar el Dominio',
//                         err
//                     });
//                 })

//             }

//     }
//     catch (e) {
//            return response.status(500).json({
//                 ok: false,
//                 message: 'No se pudo actualizar el Dominio',
//                 e
//             });
//     }
// }







exports.update = (request, response) => {
    const {id}   = request.params;
    console.log("estoy aca con el id", id)
    const { firstname,
            lastname,
            email,
            username,
            password,
            active} = request.body;
    Usuario.findByPk(id)
        .then(UsuarioUpdate=>{
            firstname = firstname,
            lastname  = lastname,
            email     = email,
            username  = username,
            password  = password,
            active    = active
         return UsuarioUpdate.save();
    })
    .then(result=>{       
        response.status(200).json({
            ok: true,
            message: 'Usuario actualizado exitosamente.',
            result: result
        });
    })
    .catch(err=>{        
        response.status(500).json({
            ok: false,
            message: 'No se pudo actualizar Usuario.',
            result: err
        });
    });
}

//-----------------------------------------------------------------------------------------------------------//
//                                  Método para Eliminar Registros de Usuarios
//-----------------------------------------------------------------------------------------------------------//
exports.delete = (request, response) => {
    const {id} = request.params;
    Usuario.findOne({
        where: {id}
    })
    .then(record=>{
        record.destroy();
        response.status(200).json({
            ok: true,
            message: 'Usuario eliminado exitosamente.',
            result: record
        });
    })
    .catch(error=>{
        response.status(500).json({
        ok: false,
        message: 'No se pudo eliminar el Usuario.',
        result: error
        });
    });
    }

//-----------------------------------------------------------------------------------------------------------//
//                                  Método para Validar Usuario que hace login
//-----------------------------------------------------------------------------------------------------------//
exports.validarUsuario = (request, response) => {
    const { username, passwordU } = request.body;     
    Usuario.findOne({       
        where:  {username: username}
    }).then(record => { 
        if(record){            
            if (!OtherUtils.comparePassword(request.body.passwordU, record.password)) {                
                return res.status(400).json({                    
                    ok: false,                   
                    message: 'Usuario o contraseña incorrectos',
                    result: ''
                });
            }else{   
                let token = jwt.sign({
                    username:   record.username,                                    
                    uservalid:  'YES',                   
                    active:     record.active,
                    name: record.firstname + " " + record.lastname
                }, process.env.SEED, { expiresIn: `${process.env.TOKEN_EXPIRATION}` });

                response.status(200).send({
                    ok: true,
                    message: 'Usuario encontrado',
                    result: {
                        token: token
                    }
                });
            }
        }else
            response.status(200).send({
                ok: false,
                message: 'Error en Usuario / Contraseña',
                result: {
                    uservalid: 'NO', 
                    username: username,
                    active: '',
                    token: ''
                }
            });
        }).catch(error=>{            
            response.status(500).send({
                ok: false,
                message: 'estoy aca en esta linea 200 catch error',
                message: 'Usuario o contraseña incorrectos',               
                result: error
            });
        });
}

//-----------------------------------------------------------------------------------------------------------//
//                                  Método para Generar Password de Usuario
//-----------------------------------------------------------------------------------------------------------//
exports.generarPassword = (request, response) =>{
    const { username } = request.body;
    Usuario.findOne({
        where: {username}
    }).then(record => {
        const passwordEncrypted = OtherUtils.encryptPassword(record.password);
        Usuario.update({
            password: passwordEncrypted
        }, { where : {username}})
        .then(result=>{
            response.status(500).send({
                ok: true,
                message: 'Password actualizado exitosamente',
                result: ''
            }); 
        }).catch(error=>{
            response.status(500).send({
                ok: false,
                message: 'Error actualizando password de usuario',
                result: ''
            });    
        });
    }).catch(error=>{
        response.status(500).send({
            ok: false,
            message: 'Error buscando Password de Usuario',
            result: error
        });
    });
}

// exports.csrftoken = (request, response) =>{
//     response.json({ csrfToken: request.csrfToken() });
// }