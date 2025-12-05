const { GoogleGenAI } = require("@google/genai");
const { apiKey } = require("../../app");

const chatIA = new GoogleGenAI({
    apiKey: apiKey
});

async function gerarResposta(req, res) {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await chatIA.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Responda em um parágrafo: ${pergunta}`
        });

        const resposta = resultado.text;

        res.json({ resultado: resposta });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao gerar resposta" });
    }
}

module.exports = { gerarResposta };
