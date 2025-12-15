'use client';

git status
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ArrowRightLeft, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Menu,
  X,
  Link as LinkIcon,
  Info
} from 'lucide-react';

// Utility para formateo de moneda colombiana
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};


// Componente para el modal legal
type LegalModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  content: string;
};

const LegalModal = ({ title, isOpen, onClose, content }: LegalModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-emerald-950/60 z-50 flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-2xl transform transition-transform duration-300 scale-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-emerald-700 hover:text-purple-700 transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold text-emerald-950 mb-4">{title}</h3>
        <div className="text-emerald-900 text-sm whitespace-pre-wrap leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

// Componente de notificación flotante (reemplazo de alert())
const Notification = ({ message, type, onClose }) => {
  if (!message) return null;
  
  const bgColor = type === 'success' ? 'bg-lime-500' : 'bg-red-500'; // Se usa el nuevo verde lima
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl text-white flex items-center gap-3 ${bgColor} transition-all duration-300 transform animate-slide-in-down`}>
      <Icon size={20} />
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors shrink-0">
        <X size={16} />
      </button>
    </div>
  );
};

// Componente principal de la landing page
export default function VinkLanding() {
  const [activeTab, setActiveTab] = useState(null); // 'borrower' | 'lender' | null
  const [amount, setAmount] = useState(500000);
  const [returnRate, setReturnRate] = useState(15.0); // Tasa de retorno E.A.
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [notification, setNotification] = useState(null); // Nuevo estado para la notificación

  // Scroll al formulario cuando se selecciona un modo
  useEffect(() => {
    if (activeTab) {
      const element = document.getElementById('main-form');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleSliderChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const isMaxAmount = amount >= 3000000;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío
    const type = activeTab === 'borrower' ? 'Solicitud de préstamo' : 'Interés en prestar';
    const finalAmount = isMaxAmount ? '3.000.000+' : formatCurrency(amount);
    const rateInfo = activeTab === 'lender' ? ` (Tasa de Retorno E.A. deseada: ${returnRate.toFixed(1)}%)` : '';
    
    // Muestra la notificación de éxito en lugar de alert()
    setNotification({ 
        message: `Gracias. Hemos registrado tu ${type} por un valor de ${finalAmount}${rateInfo}. Esto es una demo.`, 
        type: 'success' 
    });

    // Desaparece la notificación después de 5 segundos
    setTimeout(() => {
        setNotification(null);
    }, 5000); 
  };

  const openLegalModal = (type) => {
    const texts = {
      privacy: "POLÍTICA DE PRIVACIDAD\n\nEn cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, VINK informa que los datos personales recolectados serán tratados de manera segura y confidencial. VINK actúa únicamente como un conector tecnológico. Sus datos serán utilizados exclusivamente para:\n\n1. Validar su identidad.\n2. Conectar con potenciales contrapartes.\n3. Análisis estadístico y de mercado.\n\nUsted tiene derecho a conocer, actualizar y rectificar sus datos personales.",
      terms: "TÉRMINOS Y CONDICIONES\n\nVINK NO ES UNA ENTIDAD FINANCIERA.\n\n1. Naturaleza del Servicio: VINK es una plataforma tecnológica que facilita el contacto entre personas. VINK no presta dinero, no capta recursos, no define tasas de interés y no garantiza el pago de las obligaciones.\n2. Responsabilidad: Cualquier acuerdo económico es responsabilidad exclusiva de los usuarios (prestamista y prestatario).\n3. Costos: El uso de la plataforma puede estar sujeto a tarifas de servicio por uso de tecnología, las cuales serán informadas claramente.\n\nVINK no participa en la negociación, desembolso, verificación de pagos, cobros ni resolución de conflictos entre usuarios.", // <-- FRANCIA DE BLINDAJE LEGAL AÑADIDA
      cookies: "POLÍTICA DE COOKIES\n\nUtilizamos cookies propias y de terceros para mejorar la experiencia de navegación y obtener estadísticas de uso. Al continuar navegando, usted acepta su uso."
    };
    setModalContent({ title: type === 'privacy' ? 'Política de Privacidad' : type === 'terms' ? 'Términos y Condiciones' : 'Cookies', text: texts[type] });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-emerald-950 selection:bg-purple-200">
      
      {/* Definición de animación para la notificación */}
      <style jsx="true">{`
        @keyframes slide-in-down {
          0% { transform: translate(-50%, -100%); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slide-in-down {
          animation: slide-in-down 0.3s ease-out forwards;
        }
      `}</style>

      {/* Navegación */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              {/* Logo Placeholder */}
              <div className="w-8 h-8 bg-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="font-bold text-2xl tracking-tight text-emerald-950">VINK</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#como-funciona" className="text-emerald-800 hover:text-purple-700 font-medium transition-colors">Cómo funciona</a>
              <a href="#beneficios" className="text-emerald-800 hover:text-purple-700 font-medium transition-colors">Beneficios</a>
              <button onClick={() => setActiveTab('lender')} className="text-purple-700 font-medium hover:bg-purple-50 px-3 py-1 rounded-md transition-colors">
                Quiero prestar
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-emerald-900 transition-colors">
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3 shadow-lg transition-all duration-300">
             <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="block text-emerald-800 hover:text-purple-700 transition-colors">Cómo funciona</a>
             <a href="#beneficios" onClick={() => setMenuOpen(false)} className="block text-emerald-800 hover:text-purple-700 transition-colors">Beneficios</a>
             <button onClick={() => { setActiveTab('lender'); setMenuOpen(false); }} className="block text-purple-700 w-full text-left py-1 hover:bg-purple-50 rounded px-2 transition-colors">
                Quiero prestar
              </button>
          </div>
        )}
      </nav>

      {/* SECCIÓN 1: HERO */}
      <header className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent opacity-50 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold mb-6 shadow-sm border border-purple-200 animate-pulse-slow">
            <LinkIcon size={16} className="text-purple-600" />
            <span>Tu VINKulo Financiero Seguro</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-emerald-950 tracking-tight leading-tight mb-6">
            Conecta con personas reales para <br className="hidden md:block"/>
            <span className="text-purple-700">prestar o recibir un préstamo.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-emerald-900 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Finanzas entre personas. Sin bancos. Sin complicaciones. <br />
            Creamos el <span className="font-bold text-purple-700">VINKulo</span> directo entre oferta y demanda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Botón 1: Animación en hover mejorada */}
            <button 
              onClick={() => setActiveTab('borrower')}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] ${activeTab === 'borrower' ? 'bg-purple-800 text-white ring-4 ring-purple-200' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            >
              Quiero que me presten
            </button>
            {/* Botón 2: Animación en hover mejorada */}
            <button 
              onClick={() => setActiveTab('lender')}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 border-2 transform hover:-translate-y-0.5 hover:scale-[1.01] ${activeTab === 'lender' ? 'bg-purple-50 border-purple-600 text-purple-700 ring-4 ring-purple-100' : 'bg-white border-gray-200 text-emerald-900 hover:border-purple-300 hover:text-purple-700'}`}
            >
              Quiero prestar
            </button>
          </div>
        </div>
      </header>

      {/* SECCIÓN 2: CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-950">Cómo funciona VINK</h2>
            <p className="text-emerald-800 mt-2">Tecnología simple para crear VINKulos de valor.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>

            {[
              { icon: Users, title: "Crea tu perfil", desc: "Regístrate como solicitante o prestamista en segundos." },
              { icon: LinkIcon, title: "Crea el VINKulo", desc: "Nuestro algoritmo conecta personas compatibles. Un match financiero real." },
              { icon: MessageSquare, title: "Hablen y decidan", desc: "Acuerden los términos directamente. El dinero fluye entre ustedes." }
            ].map((step, idx) => (
              // Tarjeta: Añadida animación de levantamiento y sombra al hacer hover
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative group hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1">
                {/* Icono: Añadida animación de escala y color al hacer hover */}
                <div className="w-16 h-16 bg-purple-50 text-purple-700 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm transform group-hover:scale-110">
                  <step.icon size={30} />
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-emerald-950">{step.title}</h3>
                <p className="text-emerald-900/80 text-center text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            {/* Aviso de Conexión: Añadida animación de escala sutil en hover */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-full border border-purple-100 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="bg-purple-100 p-1.5 rounded-full">
                 <Info size={18} className="text-purple-700" />
              </div>
              <p className="text-sm font-semibold text-emerald-900">
                VINK solo conecta. <span className="text-purple-700 font-bold">El acuerdo es directo</span> entre usuarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIONES 3 y 4: FORMULARIOS (CONDICIONALES) */}
      <section id="main-form" className={`py-16 transition-all duration-500`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          {!activeTab ? (
             <div className="text-center p-12 bg-emerald-100 rounded-3xl shadow-lg border border-emerald-300 transition-colors">
               <div className="bg-white inline-block p-4 rounded-full shadow-sm mb-4 animate-bounce-slow">
                  <ArrowRightLeft className="text-purple-600" size={32} />
               </div>
               <p className="text-emerald-950 font-bold text-lg">
                 ¿Listo para empezar tu VINKulo?
               </p>
               <p className="text-emerald-800 mt-2">
                 Selecciona arriba si deseas <strong className="text-purple-700 bg-purple-200 px-2 py-0.5 rounded">prestar</strong> o <strong className="text-purple-700 bg-purple-200 px-2 py-0.5 rounded">pedir prestado</strong> para habilitar el formulario.
               </p>
             </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100 animate-fade-in">
              <div className="bg-purple-700 p-6 text-white text-center">
                <h3 className="text-2xl font-bold">
                  {activeTab === 'borrower' ? 'Solicitud de Conexión' : 'Registro de Interés'}
                </h3>
                <p className="text-purple-200 text-sm mt-1">
                  {activeTab === 'borrower' ? 'Cuéntanos qué necesitas' : 'Define tus preferencias de préstamo'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                
                {/* SLIDER COMPONENT (Monto) */}
                <div className="space-y-4">
                  <label className="block text-emerald-900 font-bold mb-2">
                    {activeTab === 'borrower' ? '¿Cuánto dinero necesitas?' : '¿Cuánto es lo máximo que prestarías por persona?'}
                  </label>
                  
                  <div className="flex items-center justify-between text-3xl font-extrabold text-purple-700 mb-2">
                    <span>{isMaxAmount ? 'Más de' : ''} {formatCurrency(amount)}</span>
                    {isMaxAmount && <span className="text-sm font-normal text-gray-400 ml-2">COP</span>}
                  </div>

                  <input 
                    type="range" 
                    min="100000" 
                    max="3000000" 
                    step="50000" 
                    value={amount} 
                    onChange={handleSliderChange}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>$100.000</span>
                    <span>$3.000.000+</span>
                  </div>
                  
                  {/* Micro-copy anti-miedo (Change 2) */}
                  <p className="text-sm text-purple-600/80 font-medium bg-purple-50 p-3 rounded-lg mt-4">
                    Este valor es solo referencial. No es una solicitud aprobada ni te obliga a nada.
                  </p>
                </div>

                {/* FORM FIELDS */}
                <div className="grid gap-6">
                  {activeTab === 'borrower' ? (
                    // CAMPOS PRESTATARIO
                    <>
                      {/* Urgencia del prestatario (Change 3) */}
                      <div>
                        <label className="block text-sm font-medium text-emerald-900 mb-1">¿Qué tan urgente es tu necesidad?</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow text-emerald-950" required>
                          <option value="">Selecciona la urgencia...</option>
                          <option>Inmediata (1–3 días)</option>
                          <option>Pronto (1–2 semanas)</option>
                          <option>Flexible</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-emerald-900 mb-1">¿Para qué usarías el préstamo?</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow text-emerald-950" required>
                          <option value="">Selecciona una opción...</option>
                          <option>Gastos personales imprevistos</option>
                          <option>Educación</option>
                          <option>Negocio / Emprendimiento</option>
                          <option>Compra de vehículo</option>
                          <option>Pagar otras deudas</option>
                          <option>Entretenimiento</option>
                          <option>Ropa / Moda</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-emerald-900 mb-1">¿En cuánto tiempo podrías pagarlo?</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow text-emerald-950" required>
                          <option value="">Selecciona plazo...</option>
                          <option>1 mes</option>
                          <option>3 meses</option>
                          <option>6 meses</option>
                          <option>12 meses</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    // CAMPOS PRESTAMISTA
                    <>
                       <div>
                        <label className="block text-sm font-medium text-emerald-900 mb-1">¿Para qué estarías dispuesto a prestar?</label>
                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow text-emerald-950" required>
                          <option value="">Selecciona preferencia...</option>
                          <option>Apoyo a emprendedores</option>
                          <option>Libre inversión</option>
                          <option>Estudiantes</option>
                          <option>Cualquier destino (evaluando perfil)</option>
                        </select>
                      </div>
                      
                      {/* SLIDER COMPONENT (Retorno E.A. / Rentabilidad) */}
                      <div className="space-y-4">
                        <label className="block text-emerald-900 font-bold mb-2">
                          ¿Qué rango de rentabilidad te gustaría negociar? {/* <-- Change 1 */}
                        </label>
                        
                        <div className="flex items-center justify-between text-3xl font-extrabold text-purple-700 mb-2">
                          <span>{returnRate.toFixed(1)}% E.A.</span>
                        </div>

                        <input 
                          type="range" 
                          min="1.0" 
                          max="30.0" 
                          step="0.5" 
                          value={returnRate} 
                          onChange={(e) => setReturnRate(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600 hover:accent-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-medium">
                          <span>1.0% E.A.</span>
                          <span>30.0% E.A.</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">VINK no define tasas. Es un valor de referencia para tu VINKulo.</p>
                      </div>
                    </>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-900 mb-1">Correo electrónico</label>
                      <input type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-emerald-950 transition-shadow" placeholder="tu@email.com"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-900 mb-1">Teléfono (Opcional)</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-emerald-950 transition-shadow" placeholder="300 000 0000"/>
                    </div>
                  </div>
                </div>

                {/* LEGAL CHECKBOXES */}
                <div className="bg-emerald-50/50 p-4 rounded-lg space-y-3">
                  <div className="max-h-32 overflow-y-auto text-xs text-emerald-800 mb-2 p-2 bg-white border border-emerald-100 rounded">
                    <strong className="block text-emerald-950 mb-1">Aviso de Privacidad</strong>
                    Autorizo a VINK para recolectar y tratar mis datos personales con fines de validación de identidad, conexión con otros usuarios y análisis de mercado, conforme a la Ley 1581 de 2012. Entiendo que VINK no es una entidad financiera.
                  </div>
                  
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-1 w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"/>
                    <span className="text-sm text-emerald-900">
                      He leído y acepto los <button type="button" onClick={() => openLegalModal('terms')} className="text-purple-700 underline hover:text-purple-900 transition-colors">Términos y Condiciones</button> y la <button type="button" onClick={() => openLegalModal('privacy')} className="text-purple-700 underline hover:text-purple-900 transition-colors">Política de Privacidad</button> y la <button type="button" onClick={() => openLegalModal('cookies')} className="text-purple-700 underline hover:text-purple-900 transition-colors">Política de Cookies</button>.
                    </span>
                  </label>
                </div>

                {/* Botón de Enviar: Animación en hover con escala */}
                <button type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all duration-300 transform hover:scale-[1.005] hover:shadow-xl flex items-center justify-center gap-2">
                  {activeTab === 'borrower' ? 'Enviar Solicitud' : 'Registrar Interés'}
                  <ChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-center text-gray-400 mt-4">
                  Este formulario es para fines de estudio de mercado y validación de usuarios.
                </p>

              </form>
            </div>
          )}
        </div>
      </section>

      {/* SECCIÓN 5: BENEFICIOS */}
      <section id="beneficios" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Prestatarios */}
            <div className="space-y-6 group">
              {/* Icono: Animación de escala en hover */}
              <div className="inline-block p-3 bg-purple-100 rounded-2xl mb-4 transition-all duration-300 group-hover:bg-purple-200 transform group-hover:scale-110">
                <Zap className="text-purple-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-emerald-950">Para quienes necesitan dinero</h3>
              <ul className="space-y-4">
                {[
                  "Respuesta rápida sin filas bancarias.",
                  "Sin papeleo físico excesivo.",
                  "Contacto directo con personas dispuestas a prestar.",
                  "Transparencia total desde el primer momento."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start hover:text-purple-700 transition-colors">
                    {/* Checkmark ahora usa un verde lima brillante */}
                    <CheckCircle2 className="text-lime-500 shrink-0 mt-1" size={20} />
                    <span className="text-emerald-900/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prestamistas */}
            <div className="space-y-6 group">
              {/* Icono: Animación de escala en hover */}
              <div className="inline-block p-3 bg-purple-100 rounded-2xl mb-4 transition-all duration-300 group-hover:bg-purple-200 transform group-hover:scale-110">
                <ShieldCheck className="text-purple-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-emerald-950">Para quienes quieren prestar</h3>
              <ul className="space-y-4">
                {[
                  "Control total: Tú decides a quién prestarle.",
                  "Montos flexibles y ajustados a tu capacidad.",
                  "Ayudas a personas reales con necesidades reales.",
                  "Sin intermediación financiera de la plataforma."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start hover:text-purple-700 transition-colors">
                    {/* Prestamistas mantienen el morado para diferenciación */}
                    <CheckCircle2 className="text-purple-500 shrink-0 mt-1" size={20} />
                    <span className="text-emerald-900/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: DISCLAIMER LEGAL (MANDATORY) */}
      <section className="bg-lime-50 py-12 border-t border-lime-100"> {/* Fondo verde más claro */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-col items-center justify-center gap-4 text-lime-700 mb-4"> {/* Icono verde */}
            <AlertCircle size={32} className="animate-wiggle" />
            <h4 className="font-bold text-lime-800 uppercase tracking-widest text-sm">Aviso Importante</h4> {/* Título verde */}
          </div>
          <p className="text-emerald-900 font-medium leading-relaxed text-sm md:text-base border-l-4 border-purple-500 pl-4 md:pl-0 md:border-l-0">
            VINK es una plataforma de conexión. No presta dinero, no administra fondos, no define tasas de interés y no es una entidad financiera. Todas las negociaciones y transferencias de dinero ocurren directamente entre los usuarios.
          </p>
        </div>
      </section>

      {/* SECCIÓN 7: FOOTER */}
      <footer className="bg-emerald-950 text-emerald-200/60 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-white font-bold text-2xl tracking-tight mb-4 block">VINK</span>
              <p className="text-sm max-w-xs text-emerald-100/70">
                La comunidad de conexión financiera persona a persona más transparente de Colombia.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => openLegalModal('terms')} className="hover:text-white transition-colors">Términos y Condiciones</button></li>
                <li><button onClick={() => openLegalModal('privacy')} className="hover:text-white transition-colors">Política de Privacidad</button></li>
                <li><button onClick={() => openLegalModal('privacy')} className="hover:text-white transition-colors">Tratamiento de Datos</button></li>
                <li><button onClick={() => openLegalModal('cookies')} className="hover:text-white transition-colors">Cookies</button></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Contacto</h5>
              <ul className="space-y-2 text-sm">
                <li>soporte@vink.co</li>
                <li>Bogotá, Colombia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} VINK. Todos los derechos reservados.</p>
            <p className="mt-2 md:mt-0">Diseñado con enfoque en cumplimiento legal.</p>
          </div>
        </div>
      </footer>

      <Notification 
        message={notification?.message} 
        type={notification?.type} 
        onClose={() => setNotification(null)} 
      />

      <LegalModal 
        isOpen={!!modalContent} 
        onClose={() => setModalContent(null)} 
        title={modalContent?.title} 
        content={modalContent?.text} 
      />
    </div>
  );
}