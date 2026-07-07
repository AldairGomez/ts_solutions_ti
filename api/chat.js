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
    let modelsToTry = [];

    if (hasGemini) {
      apiKey = process.env.GEMINI_API_KEY;
      baseURL = 'https://generativelanguage.googleapis.com/v1beta/openai/';
      modelsToTry = ['gemini-1.5-flash'];
    } else if (hasGroq) {
      apiKey = process.env.GROQ_API_KEY;
      baseURL = 'https://api.groq.com/openai/v1';
      modelsToTry = [
        'llama-3.3-70b-versatile',
        'llama-3.1-8b-instant',
        'qwen/qwen3-32b',
        'meta-llama/llama-4-scout-17b-16e-instruct',
        'openai/gpt-oss-120b',
        'allam-2-7b'
      ];
    } else {
      apiKey = process.env.OPENAI_API_KEY;
      baseURL = 'https://api.openai.com/v1';
      modelsToTry = ['gpt-4o-mini'];
    }

    const client = new OpenAI({ apiKey, baseURL });

    const languageRule = language === 'en' 
      ? "\n\nREGLA DE IDIOMA OBLIGATORIA: El usuario está utilizando la interfaz en INGLÉS. Debes responder a TODAS sus preguntas única y exclusivamente en INGLÉS. Traduce toda tu información al inglés antes de responder."
      : "\n\nREGLA DE IDIOMA OBLIGATORIA: El usuario está utilizando la interfaz en ESPAÑOL. Debes responder a TODAS sus preguntas única y exclusivamente en ESPAÑOL.";

    const systemPrompt = {
      role: 'system',
      content: COMPANY_KNOWLEDGE + languageRule + "\n\nREGLA MUY IMPORTANTE 1: Tus respuestas deben ser EXTREMADAMENTE CORTAS Y PRECISAS. Máximo 15 a 20 palabras por mensaje. Ve directo al grano simulando una respuesta rápida por chat. No des explicaciones largas ni listas detalladas.\nREGLA MUY IMPORTANTE 2: SOLO si el usuario SOLICITA explícitamente comunicarse con un asesor o pide contactos, NUNCA escribas el número o correo en texto, sino que añade EXACTAMENTE la palabra [CONTACT_CARDS] al final de tu respuesta. NO incluyas esta palabra si no piden contacto.\nREGLA MUY IMPORTANTE 3: Limítate ESTRICTAMENTE a la información pública de la empresa. Si te hacen preguntas ajenas a TS Solutions TI, obvia la pregunta indicando respetuosamente que solo puedes brindar información relevante sobre la empresa y sus servicios."
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

    let response = null;
    let lastError = null;

    for (const currentModel of modelsToTry) {
      try {
        response = await client.chat.completions.create({
          model: currentModel,
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
        });
        break; // Éxito! Salimos del bucle
      } catch (error) {
        lastError = error;
        // Si el error es 429 (Rate Limit / Tokens agotados), intentamos con el siguiente modelo
        if (error.status === 429) {
          console.warn(`[Fallback] Límite 429 alcanzado en el modelo ${currentModel}. Cambiando al siguiente...`);
          continue;
        }
        // Si es cualquier otro tipo de error, detenemos el proceso
        throw error;
      }
    }

    if (!response) {
      throw lastError || new Error("Se agotaron todos los modelos y no se obtuvo respuesta.");
    }

    const reply = response.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
