import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-tactical-gray border-t border-tactical-lightgray py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="/emergency-tools" className="text-white hover:text-red-500 text-xs uppercase font-bold transition-colors">
            🚨 Emergency
          </Link>
          <Link href="/faq" className="text-white hover:text-tactical-orange text-xs uppercase font-bold transition-colors">
            FAQ
          </Link>
          <Link href="/settings" className="text-white hover:text-tactical-orange text-xs uppercase font-bold transition-colors">
            Settings
          </Link>
          <a href="mailto:support@rebuildthemanprotocol.com" className="text-white hover:text-tactical-orange text-xs uppercase font-bold transition-colors">
            Contact
          </a>
        </div>
        <p className="text-white text-xs mb-2 text-center">
          © 2026 Rebuild The Man Protocol. All rights reserved.
        </p>
        <p className="text-white text-xs max-w-4xl mx-auto leading-relaxed text-center">
          <span className="text-tactical-orange font-bold">Disclaimer:</span> This app is not a substitute for professional mental health care. Results vary based on individual circumstances and commitment. If you&apos;re experiencing a mental health crisis, thoughts of self-harm, or symptoms interfering with daily functioning, seek immediate professional help from a qualified mental health professional or call emergency services.
        </p>
      </div>
    </footer>
  );
}


