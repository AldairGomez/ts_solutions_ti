import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface Message {
  role: 'bot' | 'user';
  textKey?: string;
  text?: string;
}

export default function CustomChatbot() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', textKey: 'initialMessage' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [bubbleState, setBubbleState] = useState('greeting'); // 'greeting', 'help', 'proactive', 'none'
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceModeSession, setIsVoiceModeSession] = useState(false);
  
  const messagesEndRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-restart listening if in voice session and not busy
  useEffect(() => {
    if (isVoiceModeSession && !isSpeaking && !isListening && !isLoading) {
      startListening();
    }
  }, [isVoiceModeSession, isSpeaking, isListening, isLoading]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Lógica de la viñeta emergente
  useEffect(() => {
    if (isOpen) {
      setBubbleState('none');
      return;
    }

    // El primer estado es 'greeting' por defecto.
    // 2. Cambiar mensaje después de 3 segundos
    const timer1 = setTimeout(() => {
      setBubbleState('help');
    }, 3000);

    // 3. Mensaje proactivo a los 30 segundos si el usuario no ha abierto el chat
    const timer2 = setTimeout(() => {
      setBubbleState('proactive');
    }, 30000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setBubbleState('none');
    } else {
      // If closing, stop speaking and exit voice mode
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      setIsVoiceModeSession(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    }
  };

  const handleSendMessage = async (e: any, forcedText: string | null = null, fromVoice = false) => {
    e?.preventDefault();
    const textToSend = forcedText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage = textToSend.trim();
    
    // Add user message to UI
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    if (!forcedText) setInputValue('');
    setIsLoading(true);

    // ==========================================
    // INTEGRACIÓN CON API SERVERLESS (VERCEL)
    // ==========================================
    try {
      // Usamos ruta relativa porque en Vercel el backend y frontend conviven en el mismo dominio
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos el mensaje actual y el historial previo
        body: JSON.stringify({ 
          message: userMessage,
          history: messages.slice(-6), // Enviamos los últimos 6 mensajes para contexto
          language: language // Pasamos el idioma actual ('en' o 'es') al backend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Error en el servidor');
      }

      // Agregamos la respuesta real del bot
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);

      // Si venía de voz, el bot responde hablando
      if (fromVoice) {
        speakText(data.reply);
      }
    } catch (error: any) {
      console.error('Error al enviar el mensaje:', error);
      // Mostramos el error real en pantalla para poder diagnosticar el problema en Vercel
      setMessages((prev) => [
        ...prev, 
        { role: 'bot', text: `⚠️ Error de conexión: ${error.message}. Por favor revisa los Logs en Vercel o la consola de tu navegador.` },
        { role: 'bot', textKey: 'fallbackMessage' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // FUNCIONES DE VOZ (Web Speech API)
  // ==========================================
  const startListening = () => {
    const SpeechRecognition: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'en' ? "Voice recognition not supported in this browser." : "El reconocimiento de voz no está soportado en este navegador.");
      return;
    }

    // Stop speaking if it was speaking
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    setIsVoiceModeSession(true);

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = language === 'en' ? 'en-US' : 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      // Enviamos el mensaje automáticamente al terminar de hablar
      handleSendMessage(null, transcript, true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech error", event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Detener si estaba hablando

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : 'es-ES';
    
    // Intentar buscar una voz nativa buena
    const voices = window.speechSynthesis.getVoices();
    const targetLang = language === 'en' ? 'en' : 'es';
    const preferredVoice = voices.find(v => v.lang.startsWith(targetLang) && (v.name.includes('Google') || v.name.includes('Natural')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleOverlayClick = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleCopyEmail = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText('tssolutionsti@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const exitVoiceMode = (e: any) => {
    e.stopPropagation();
    setIsVoiceModeSession(false);
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Helper para obtener el saludo basado en la hora actual y el idioma
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 19) return t.chatbot.greetingAfternoon;
    if (hour >= 19 || hour < 5) return t.chatbot.greetingEvening;
    return t.chatbot.greetingMorning;
  };

  // Helper para obtener el texto actual de la viñeta
  const getBubbleMessage = () => {
    if (bubbleState === 'greeting') return getGreeting();
    if (bubbleState === 'help') return t.chatbot.helpOffer;
    if (bubbleState === 'proactive') return t.chatbot.proactiveHelp;
    return '';
  };

  const currentBubbleMessage = getBubbleMessage();

  return (
    <>
      {/* Viñeta Flotante (Speech Bubble) */}
      {!isOpen && currentBubbleMessage && (
        <div className="fixed bottom-10 right-24 bg-white/80 dark:bg-[#111318]/80 backdrop-blur-md text-slate-800 dark:text-white px-4 py-3 rounded-2xl shadow-xl border border-gray-200/50 dark:border-[#282e39]/50 text-sm font-bold z-40 max-w-[250px] animate-in fade-in slide-in-from-right-4 duration-500">
          {currentBubbleMessage}
          {/* Triángulo apuntando al botón del robot */}
          <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white/80 dark:border-l-[#111318]/80 drop-shadow-md"></div>
        </div>
      )}

      {/* Botón flotante para abrir el chat */}
      <button
        onClick={handleToggleChat}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label={t.chatbot.openChatAria}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Círculo de pulso animado para llamar la atención */}
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
          {/* Robot animado rebotando suavemente */}
          <span className="material-symbols-outlined text-[32px] animate-[bounce_2s_infinite]">smart_toy</span>
        </div>
      </button>

      {/* Ventana de Chat */}
      <div 
        className={`fixed bottom-6 right-6 w-[90vw] sm:w-[380px] h-[500px] max-h-[85vh] bg-white/70 dark:bg-[#111318]/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-[#282e39]/50 flex flex-col z-50 overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header del Chat */}
        <div className="bg-primary/90 backdrop-blur-sm px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{t.chatbot.botTitle}</h3>
              <p className="text-xs text-white/80">{t.chatbot.botSubtitle}</p>
            </div>
          </div>
          <button 
            onClick={handleToggleChat}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* OVERLAY DE VOZ MÓVIL (Visible en sm/celulares cuando hay sesión de voz activa) */}
        {isVoiceModeSession && (
          <div 
            onClick={handleOverlayClick}
            className="sm:hidden absolute inset-0 top-[72px] bg-white/95 dark:bg-[#111318]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center cursor-pointer rounded-b-2xl"
          >
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              {(isSpeaking || isListening) && (
                <div className={`absolute inset-0 rounded-full ${isSpeaking ? 'animate-voice-pulse' : 'animate-pulse bg-red-500/30'}`}></div>
              )}
              <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${isSpeaking ? 'bg-primary' : (isListening ? 'bg-red-500' : 'bg-gray-400')}`}>
                <span className="material-symbols-outlined text-white text-[40px]">
                  {isSpeaking ? 'graphic_eq' : (isListening ? 'mic' : 'more_horiz')}
                </span>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-gray-300 font-bold mb-8 animate-pulse text-lg text-center px-4">
              {isSpeaking ? t.chatbot.voiceSpeaking : (isListening ? t.chatbot.voiceListening : t.chatbot.voiceThinking)}
            </p>
            
            <button 
              onClick={exitVoiceMode}
              className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-40"
            >
              <span className="material-symbols-outlined text-[28px]">close</span>
            </button>
          </div>
        )}

        {/* Área de Mensajes */}
        <div className="relative flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-gray-50/50 dark:bg-[#1a1d24]/50">
          {messages.map((msg, idx) => {
            let messageContent = msg.textKey ? t.chatbot[msg.textKey as keyof typeof t.chatbot] : msg.text;
            const hasContactCards = typeof messageContent === 'string' && messageContent.includes('[CONTACT_CARDS]');
            if (hasContactCards) {
               messageContent = messageContent.replace('[CONTACT_CARDS]', '').trim();
            }
            
            return (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/20' 
                      : 'bg-white/90 dark:bg-[#282e39]/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 shadow-sm border border-gray-200/50 dark:border-transparent rounded-tl-sm'
                  }`}
                >
                  {/* Parseamos la respuesta simulada para mostrar el enlace de whatsapp y correo */}
                  {msg.textKey === 'fallbackMessage' || hasContactCards ? (
                    <div className="flex flex-col gap-3">
                      <span>{messageContent}</span>
                      <div className="flex flex-col gap-2">
                        <a href="https://wa.me/51968094072" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#20b858] transition-colors font-bold self-start shadow-sm">
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                          </svg>
                          WhatsApp
                        </a>
                        <button onClick={handleCopyEmail} className="inline-flex items-center justify-center gap-2 bg-[#1b61f2] text-white px-4 py-2 rounded-lg hover:bg-[#1448b8] transition-colors font-bold self-start shadow-sm">
                          <span className="material-symbols-outlined text-lg">{copiedEmail ? 'check' : 'mail'}</span>
                          {copiedEmail ? t.chatbot.emailCopied : 'tssolutionsti@gmail.com'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    messageContent
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Indicador de "Escribiendo..." */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/90 dark:bg-[#282e39]/90 backdrop-blur-sm shadow-sm border border-gray-200/50 dark:border-transparent rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Área */}
        <div className="p-3 bg-white/50 dark:bg-[#111318]/50 backdrop-blur-md border-t border-gray-200/50 dark:border-[#282e39]/50">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.chatbot.inputPlaceholder}
              disabled={isLoading}
              className="flex-1 bg-gray-100 dark:bg-[#1a1d24] text-slate-900 dark:text-white text-sm rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            />
            <button 
              type="button"
              onClick={(e) => {
                if (isVoiceModeSession) {
                  exitVoiceMode(e);
                } else {
                  startListening();
                }
              }}
              disabled={!isVoiceModeSession && isLoading}
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                isVoiceModeSession 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-200 dark:bg-[#282e39] text-slate-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isVoiceModeSession ? 'stop' : 'mic'}
              </span>
            </button>
            <button 
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
