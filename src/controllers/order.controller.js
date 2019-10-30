'use strict'

const repository = require('../repositories/order.repository')
const guid = require('guid');
const authService = require('../services/auth.service')

exports.post = async (req, res, next) => {
    try {
        //pega o token que a gente sabe que existe, pois passou pelo authenticate do customer controller
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica o token
        var data = await authService.decodeToken(token)

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({ 
            message: 'Pedido cadastrado com sucesso' 
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }


}


