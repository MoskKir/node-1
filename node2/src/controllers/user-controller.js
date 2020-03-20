const service = require('../services/user-service')
class UserController {
    constructor() {}

    addUser = (req, res) => {
        try {
            const result = service.add(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    deleteUser = (req, res) => {
        try {
            const result = service.del(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    updateUser = (req, res) => {
        try {
            const result = service.update(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    getUser = async (req, res) => {
        try {
            const result = await service.get()
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
}

module.exports = UserController;