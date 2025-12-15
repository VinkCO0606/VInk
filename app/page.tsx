'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  Link as LinkIcon,
  MessageSquare,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
} from 'lucide-react';

/* =======================
   UTILIDAD MONEDA
======================= */
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

/* =======================
   MODAL LEGAL
======================= */
function LegalModal({
  open,
  onClose,
  title,
  content,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <pre className="text-sm whitespace-pre-wrap">{content}</pre>
      </div>
    </div>
  );
}

/* =======================
   LANDING
======================= */
export default function Page() {
  const [mode, setMode] = useState<'borrow' | 'lend' | null>(null);
  const [amount, setAmount] = useState<number>(500000);
  const [menu, setMenu] = useState(false);
  const [legal, setLegal] = useState<null | 'terms' | 'privacy'>(null);

  useEffect(() => {
    if (mode) {
      document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* NAV */}
      <nav className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <span className="font-bold text-2xl text-purple-700">VINK</span>
          <button onClick={() => setMenu(!menu)} className="md:hidden">
            <Menu />
          </button>
          <div className="hidden md:flex gap-6">
            <button onClick={() => setMode('borrow')}>Quiero que me presten</button>
            <button onClick={() => setMode('lend')}>Quiero prestar</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="py-20 text-center bg-white">
        <h1 className="text-5xl font-extrabold mb-6">
          Conecta personas para <span className="text-purple-700">prestar o recibir</span>
        </h1>
        <p className="text-lg mb-10">
          Finanzas entre personas. Sin bancos. Sin intermediarios.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setMode('borrow')}
            className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold"
          >
            Quiero que me presten
          </button>
          <button
            onClick={() => setMode('lend')}
            className="px-8 py-4 border rounded-xl font-bold"
          >
            Quiero prestar
          </button>
        </div>
      </header>

      {/* CÓMO FUNCIONA */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {[
          { icon: Users, title: 'Crea tu perfil' },
          { icon: LinkIcon, title: 'Conecta con personas' },
          { icon: MessageSquare, title: 'Hablen y decidan' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
            <s.icon className="mx-auto mb-4 text-purple-600" size={32} />
            <h3 className="font-bold">{s.title}</h3>
          </div>
        ))}
      </section>

      {/* FORMULARIO */}
      {mode && (
        <section id="form" className="py-16">
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {mode === 'borrow'
                ? '¿Cuánto dinero necesitas?'
                : '¿Cuánto prestarías por persona?'}
            </h3>

            <p className="text-center text-3xl font-extrabold text-purple-700 mb-4">
              {amount >= 3000000 ? 'Más de $3.000.000' : formatCurrency(amount)}
            </p>

            <input
              type="range"
              min={100000}
              max={3000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mb-6"
            />

            <input
              type="email"
              required
              placeholder="Correo electrónico"
              className="w-full border p-3 rounded mb-4"
            />

            <label className="text-sm flex gap-2 items-start mb-4">
              <input type="checkbox" required />
              Acepto los{' '}
              <button
                type="button"
                className="underline"
                onClick={() => setLegal('terms')}
              >
                Términos
              </button>{' '}
              y la{' '}
              <button
                type="button"
                className="underline"
                onClick={() => setLegal('privacy')}
              >
                Política de Privacidad
              </button>
            </label>

            <button className="w-full bg-purple-600 text-white py-3 rounded font-bold">
              Enviar
            </button>
          </div>
        </section>
      )}

      {/* DISCLAIMER */}
      <section className="bg-gray-100 py-10 text-center text-sm px-4">
        <AlertCircle className="mx-auto mb-2" />
        VINK es una plataforma de conexión. No presta dinero, no administra fondos
        y no es una entidad financiera.
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center text-sm">
        © {new Date().getFullYear()} VINK · Colombia
      </footer>

      <LegalModal
        open={legal === 'terms'}
        onClose={() => setLegal(null)}
        title="Términos y Condiciones"
        content="VINK no presta dinero ni intermedia financieramente."
      />
      <LegalModal
        open={legal === 'privacy'}
        onClose={() => setLegal(null)}
        title="Política de Privacidad"
        content="Datos tratados según Ley 1581 de 2012."
      />
    </div>
  );
}
