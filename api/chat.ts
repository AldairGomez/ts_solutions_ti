import OpenAI from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'La variable de entorno GROQ_API_KEY no está configurada en Vercel. Por favor, añádela en Vercel Dashboard > Project Settings > Environment Variables.' 
    });
  }

  try {
    const { message, history, language } = req.body;
    
    // Configuramos el SDK de OpenAI para apuntar a la API de Groq
    const groq = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const systemPrompt = language === 'en' 
      ? "Your name is Batito. You are a helpful IT consultant for TS Solutions. Services: Web Development, PC repair, CCTV. CRITICAL RULE: Give extremely short, direct, and concise answers. Maximum 2-3 sentences. Do not use fluff. Speak in the first person. If the user asks for contact info, phone, or email, DO NOT invent or type any phone numbers or emails in text. Just say 'You can contact us using the buttons below:' and append exactly [CONTACT_CARDS] at the end of your message."
      : "Tu nombre es Batito y eres un consultor de TI de TS Solutions. Servicios: Desarrollo Web, Reparación de PC, CCTV. REGLA CRÍTICA: Da respuestas extremadamente cortas, efectivas y concisas. Máximo 2 o 3 oraciones. Ve directo al grano sin relleno. Responde en primera persona. Si el usuario pide información de contacto, correo o teléfono, NUNCA escribas números de teléfono ni correos en texto. Solo di 'Puedes contactarnos usando los botones de abajo:' y añade exactamente [CONTACT_CARDS] al final de tu respuesta.";

    const messages = [
      { role: "system", content: systemPrompt }
    ];

    // Añadir historial
    if (Array.isArray(history)) {
      history.forEach((msg: any) => {
        messages.push({
          role: msg.role === 'bot' ? 'assistant' : 'user',
          content: msg.text || msg.textKey || ''
        });
      });
    }

    // Añadir el mensaje actual
    messages.push({ role: "user", content: message });

    // Lista de modelos activos y soportados en Groq con fallback
    const fallbackModels = [
      "openai/gpt-oss-20b",         // Ultrarrápido (~1000 tps), sustituto oficial moderno
      "llama-3.3-70b-versatile",    // Muy capaz y preciso (128k contexto)
      "llama-3.1-8b-instant",       // Rápido tradicional
      "openai/gpt-oss-120b"         // Respaldo de alta capacidad
    ];

    let reply = "";
    const errors: string[] = [];

    // Intentamos procesar el mensaje iterando por los modelos disponibles
    for (const currentModel of fallbackModels) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: messages as any,
          model: currentModel,
          temperature: 0.7,
          max_tokens: 150, // Mantener respuestas concisas
        });

        reply = chatCompletion.choices[0]?.message?.content || "";
        if (reply) {
          // Si hubo éxito, rompemos el bucle
          break;
        }
      } catch (error: any) {
        console.warn(`El modelo ${currentModel} falló:`, error?.message);
        errors.push(`${currentModel}: ${error?.message || error}`);
      }
    }

    // Si pasamos por todos los modelos y reply sigue vacío, enviamos los errores detallados
    if (!reply) {
      throw new Error(`Todos los modelos de respaldo fallaron. Detalles: ${errors.join(" | ")}`);
    }
    
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}
