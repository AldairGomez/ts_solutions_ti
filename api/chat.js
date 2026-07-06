import OpenAI from 'openai';

export default async function handler(req, res) {
  // CORS configuration for local development and specific domains
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Configure the client dynamically. 
    // It prioritizes DeepSeek if the key exists, otherwise falls back to OpenAI
    const isDeepseek = !!process.env.DEEPSEEK_API_KEY;
    const apiKey = isDeepseek ? process.env.DEEPSEEK_API_KEY : process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API keys are not configured on the server.' });
    }

    const client = new OpenAI({
      apiKey: apiKey,
      baseURL: isDeepseek ? 'https://api.deepseek.com' : 'https://api.openai.com/v1',
    });

    const systemPrompt = {
      role: 'system',
      content: `Eres el asistente virtual oficial de TS Solutions TI. Tu tono debe ser profesional, amable y conciso. 
La empresa se dedica a soluciones de tecnología de la información, ciberseguridad, redes, infraestructura y desarrollo de software.
Responde de manera precisa a las consultas de los clientes y guíalos a contactar a un asesor humano si requieren algo muy específico o un presupuesto.
Nunca reveles que eres un modelo de lenguaje de inteligencia artificial, siempre preséntate como el asistente de TS Solutions TI.
Trata de que tus respuestas sean cortas y al punto (máximo 2-3 párrafos cortos) para que se lean bien en la pequeña ventana del chat.`
    };

    // Format previous history so the AI remembers the context of the conversation
    const formattedHistory = (history || []).map(msg => ({
      role: msg.role === 'bot' ? 'assistant' : 'user',
      content: msg.textKey ? "Mensaje del sistema: " + msg.textKey : msg.text
    }));

    const messages = [
      systemPrompt,
      ...formattedHistory,
      { role: 'user', content: message }
    ];

    const modelName = isDeepseek ? 'deepseek-chat' : 'gpt-4o-mini';

    const response = await client.chat.completions.create({
      model: modelName,
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
