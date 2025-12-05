var { GoogleGenerativeAI } = require('@google/generative-ai');

var chatIA = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function GerarResposta(mensagem) {
  console.log(`ESTOU TENTANDO GERAR RESPOSTA IA\n \n\t\t >> `);

  try {
    var modeloIA = chatIA.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    var prompt = `Em um parágrafo responda: ${mensagem}`;

    var resultado = await modeloIA.generateContent(prompt);
    var resposta = resultado.response.text();
    var tokens = resultado.response.usageMetadata;

    console.log(resposta);
    console.log("Uso de Tokens:", tokens);

    return resposta;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  GerarResposta
};
