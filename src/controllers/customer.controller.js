'use strict'

const repository = require('../repositories/customer.repository')
const md5 = require('md5');
const emailService = require('../services/email.service')
const authService = require('../services/auth.service')

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ['user']
        });

        emailService.send(
            req.body.email,
            'Teste Node',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        //verifica se existe usuário
        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            })
            return;
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        //pega o token que a gente sabe que existe, pois passou pelo authenticate do customer controller
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        //decodifica o token
        var data = await authService.decodeToken(token)


        const customer = await repository.getById(data.id);

        //verifica se existe usuário
        if (!customer) {
            res.status(404).send({
                message: 'Cliente não encontrado'
            })
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};
