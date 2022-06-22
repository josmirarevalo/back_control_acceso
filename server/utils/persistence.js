const sequelize = require('../utils/database');
const fs = require('fs');
const path = require('path');

const getOne = async (id, query) => {
    return await sequelize
        .query(
            query,
            {
                replacements: {
                    id,
                },
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            },
            {
                mapToModel: false,
            },
        )
        .then((record) => {
            return JSON.parse(record[0].result);
        });
};

// Permite traer la lista de todos los registros de la tabla que se está consultando
const getList = async (query) => {
    return await sequelize
        .query(
            query,
            {
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            },
            {
                mapToModel: false,
            },
        )
        .then((records) => {
            return JSON.parse(records[0].result);
        });
};

// Metodo que permite traer una lista o un solo registro con un filtro o varios.
const getListArray = async (params, query) => {
    return await sequelize
        .query(
            query,
            {
                replacements: params,
                type: sequelize.QueryTypes.SELECT,
                raw: true,
            },
            {
                mapToModel: false,
            },
        )
        .then((record) => {
            return JSON.parse(record[0].result);
        });
};

const createImageByProcess = async (imageRecord) => {
    const { entity_type_id, entity_id, order, filename, mime_type, image } = imageRecord;
    try {
        const base64Data = image
            .replace(/^data:image\/png;base64,/, '')
            .replace(/^data:image\/jpeg;base64,/, '');
        const newUpload = path.resolve(__dirname, '../../public');
        fs.writeFile(`${newUpload}/images/${filename}`, base64Data, 'base64', (err) => {
            if (err) console.error(err); // writes out file without error, but it's not a valid image
        });
    } catch (error) {
        console.error(error);
    }

    await ImageByProcess.create({
        entity_type_id,
        entity_id,
        order,
        filename,
        mime_type,
        image: null,
    })
        .then((record) => {
            return true;
        })
        .catch((err) => {
            return false;
        });
};

const createImageByProcessIfNotExists = async (imageRecord) => {
    const { entity_type_id, entity_id, order, filename, mime_type, image, id } = imageRecord;
    try {
        const validImage = await ImageByProcess.findOne({
            where: { id },
        });
        if (validImage) {
            console.info('Ya esta imagen que se intenta registrar existe');
            return false;
        }

        const base64Data = image
            .replace(/^data:image\/png;base64,/, '')
            .replace(/^data:image\/jpeg;base64,/, '');
        const newUpload = path.resolve(__dirname, '../../public');
        if (!fs.existsSync(`${newUpload}/images`)) {
            fs.mkdirSync(`${newUpload}/images`);
        }
        fs.writeFile(`${newUpload}/images/${filename}`, base64Data, 'base64', (err) => {
            if (err) console.error(err); // writes out file without error, but it's not a valid image
        });
    } catch (error) {
        console.error(error);
    }

    ImageByProcess.create({ entity_type_id, entity_id, order, filename, mime_type, image: null })
        .then((record) => {
            return true;
        })
        .catch((err) => {
            console.error(err);
            return false;
        });
};

module.exports = {
    getOne,
    getList,
    getListArray,
    createImageByProcess,
    createImageByProcessIfNotExists,
};
