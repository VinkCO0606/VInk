'use client';
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
  Info,
} from 'lucide-react';

/* =======================
   UTILIDADES
======================= */
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/* =======================
   MODAL LEGAL
======================= */
const LegalModal = ({
  title,
  isOpen,
  onClose,
  content,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  content: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-emerald-950/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-emerald-700 hover:text-purple-700"
        >
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

/* =======================
   NOTIFICACIÓN
======================= */
const Notification = ({
  message,
  type,
  onClose,
}: {
  message: string | null;
  type: 'success' | 'error';
  onClose: () => void;
}) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl text-white flex items-center gap-3 ${bgColor}`}
    >
      <Icon size={20} />
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="ml-4 p-1 hover:bg-white/20 rounded">
        <X size={16} />
      </button>
    </div>
  );
};

/* =======================
   LANDING
======================= */
export default function VinkLanding() {
  const [activeTab, setActiveTab] = useState<'borrower' | 'lender' | null>(null);
  const [amount, setAmount] = useState<number>(500000);
  const [returnRate, setReturnRate] = useState<number>(15);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    text: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    if (activeTab) {
      document.getElementById('main-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const type =
      activeTab === 'borrower'
        ? 'Solicitud de préstamo'
        : 'Interés en prestar';

    setNotification({
      message: `Gracias. Hemos registrado tu ${type}. Esto es una demo.`,
      type: 'success',
    });

    setTimeout(() => setNotification(null), 5000);
  };

  const openLegalModal = (
    type: 'privacy' | 'terms' | 'cookies'
  ) => {
    const texts = {
      privacy:
        'POLÍTICA DE PRIVACIDAD\n\nVINK actúa como conector tecnológico.',
      terms:
        'TÉRMINOS Y CONDICIONES\n\nVINK NO ES UNA ENTIDAD FINANCIERA.',
      cookies:
        'POLÍTICA DE COOKIES\n\nUtilizamos cookies para mejorar la experiencia.',
    };

    setModalContent({
      title:
        type === 'privacy'
          ? 'Política de Privacidad'
          : type === 'terms'
          ? 'Términos y Condiciones'
          : 'Cookies',
      text: texts[type],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white py-16 text-center">
        <h1 className="text-5xl font-bold text-purple-700 mb-4">VINK</h1>
        <p className="text-emerald-900">
          Conectamos personas para prestar o recibir dinero
        </p>
      </header>

      <section id="main-form" className="py-16">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow"
        >
          <input
            type="range"
            min="100000"
            max="3000000"
            step="50000"
            value={amount}
            onChange={handleSliderChange}
            className="w-full"
          />

          <p className="text-center text-purple-700 font-bold my-4">
            {formatCurrency(amount)}
          </p>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold"
          >
            Enviar
          </button>
        </form>
      </section>

      <Notification
        message={notification?.message ?? null}
        type={notification?.type ?? 'success'}
        onClose={() => setNotification(null)}
      />

      <LegalModal
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title ?? ''}
        content={modalContent?.text ?? ''}
      />
    </div>
  );
}
