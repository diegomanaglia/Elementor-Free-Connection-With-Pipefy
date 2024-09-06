const axios = require("axios");

module.exports = async (req, res) => {

    const nome = req.body["name_1"];
    const email = req.body["email_1"];
    const telefone = req.body["phone_1"];

    const tokenPipefy = process.env.PIPEFY_TOKEN;
    const idPipe = "304660401";

    try {
        // Fazendo a requisição para a API do Pipefy
        const response = await axios.post(
            'https://api.pipefy.com/graphql',
            {
                query: `
          mutation {
            createCard(input: {
              pipe_id: ${idPipe},
              title: "${nome}",
              fields_attributes: [
                {field_id: "nome", field_value: "${nome}"},
                {field_id: "e_mail", field_value: "${email}"},
                {field_id: "telefone", field_value: "${telefone}"}
              ]
            }) {
              card {
                id
                title
              }
            }
          }
        `
            },
            {
                headers: {
                    Authorization: `Bearer ${tokenPipefy}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Retorna a resposta da API do Pipefy para o cliente
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Erro ao criar o card:', error);
        res.status(500).json({ error: 'Erro ao criar o card no Pipefy' });
    };

}