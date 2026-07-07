import OpenAI from 'openai';
import { COMPANY_KNOWLEDGE } from './knowledge.js';

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
    const { message, history, language } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Detectar qué API Key configuró el usuario en Vercel
    const hasGemini = !!process.env.GEMINI_API_KEY;
    const hasGroq = !!process.env.GROQ_API_KEY;
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    
    if (!hasGemini && !hasGroq && !hasOpenAI) {
      return res.status(500).json({ error: 'API keys are not configured on the server.' });
    }

    // Configurar el cliente dependiendo del servicio elegido
    let apiKey = '';
    let baseURL = '';
    let modelName = '';

    if (hasGemini) {
      apiKey = process.env.GEMINI_API_KEY;
      baseURL = 'https://generativelanguage.googleapis.com/v1beta/openai/';
      modelName = 'gemini-1.5-flash';
    } else if (hasGroq) {
      apiKey = process.env.GROQ_API_KEY;
      baseURL = 'https://api.groq.com/openai/v1';
      modelName = 'llama-3.3-70b-versatile'; // Modelo actualizado (el anterior fue retirado)
    } else {
      apiKey = process.env.OPENAI_API_KEY;
      baseURL = 'https://api.openai.com/v1';
      modelName = 'gpt-4o-mini';
    }

    const client = new OpenAI({ apiKey, baseURL });

    const languageRule = language === 'en' 
      ? "\n\nREGLA DE IDIOMA OBLIGATORIA: El usuario está utilizando la interfaz en INGLÉS. Debes responder a TODAS sus preguntas única y exclusivamente en INGLÉS. Traduce toda tu información al inglés antes de responder."
      : "\n\nREGLA DE IDIOMA OBLIGATORIA: El usuario está utilizando la interfaz en ESPAÑOL. Debes responder a TODAS sus preguntas única y exclusivamente en ESPAÑOL.";

    const systemPrompt = {
      role: 'system',
      content: COMPANY_KNOWLEDGE + languageRule + "\n\nREGLA MUY IMPORTANTE 1: Tus respuestas deben ser cortas, directas y concisas. Máximo 1 o 2 oraciones. Ve directo al grano simulando una conversación hablada rápida.\nREGLA MUY IMPORTANTE 2: SOLO si el usuario SOLICITA explícitamente comunicarse con un asesor o pide contactos, NUNCA escribas el número o correo en texto, sino que añade EXACTAMENTE la palabra [CONTACT_CARDS] al final de tu respuesta. NO incluyas esta palabra si no piden contacto.\nREGLA MUY IMPORTANTE 3: Limítate ESTRICTAMENTE a la información pública de la empresa. Si te hacen preguntas ajenas a TS Solutions TI, obvia la pregunta indicando respetuosamente que solo puedes brindar información relevante sobre la empresa y sus servicios."
    };

    const formattedHistory = (history || []).map(msg => ({
      role: msg.role === 'bot' ? 'assistant' : 'user',
      content: msg.textKey ? "Mensaje del sistema: " + msg.textKey : msg.text
    }));

    const messages = [
      systemPrompt,
      ...formattedHistory,
      { role: 'user', content: message }
    ];

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
