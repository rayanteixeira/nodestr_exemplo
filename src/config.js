global.SALT_KEY = 'f5b99242-6504-4ca3-90-f2-05e78e5761ef'; // chave do servidor
global.EMAIL_TMPL = '<strong>Olá {0} seja bem vindo ao meu Node MongoDB teste. </strong>';

module.exports = {
    connectionString: 'STRING DE CONEXAO COM MONGODB', // uso o mongodb web
    sendgridKey: 'CHAVE AQUI', // entrar no sendgrid e gerar uma nova chave
    containerConnectionString: 'MINHA CHAVE AQUI' //chave do storage. Salva imagens no storage e a url no banco do servidor.
}