import OpenAI from 'openai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history, language } = req.body;
    
    // Configuramos el SDK de OpenAI para apuntar a la API ultrarrápida de Groq
    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
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

    // Lista de modelos de Groq con fallback
    const fallbackModels = [
      "llama-3.1-8b-instant",       // Rápido, 14.4K rpm, 6K tpm
      "qwen/qwen3.6-27b",           // Inteligente, 8K tpm
      "llama-3.3-70b-versatile",    // Más lento pero inteligente, 12K tpm
      "qwen/qwen3-32b"              // Alternativa extra
    ];

    let reply = "";
    let lastError = null;

    // Intentamos procesar el mensaje iterando por los modelos disponibles
    for (const currentModel of fallbackModels) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: messages as any,
          model: currentModel,
          temperature: 0.7,
          max_tokens: 80, // Mantener respuestas cortas
        });

        reply = chatCompletion.choices[0]?.message?.content || "";
        if (reply) {
          // Si hubo éxito, rompemos el bucle
          break;
        }
      } catch (error: any) {
        console.warn(`El modelo ${currentModel} falló (posible límite alcanzado). Saltando al siguiente... Error:`, error.message);
        lastError = error;
        // El bucle continuará con el siguiente modelo de la lista
      }
    }

    // Si pasamos por todos los modelos y reply sigue vacío, lanzamos el último error
    if (!reply) {
      throw lastError || new Error("Todos los modelos de respaldo fallaron por límites de velocidad o errores.");
    }
    
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}
