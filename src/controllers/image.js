import logger from "../config/logger.js"

export default async function uploadImg (req, res) {
    try {
        logger.info({imagen: req.file.filename})
        res.status(201).json({imagen: req.file.filename})
    } catch (error) {
        logger.error(error)
        res.status(400).json({Error: error.message})
    }
}