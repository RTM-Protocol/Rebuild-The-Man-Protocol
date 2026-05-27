import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-tactical-gray border-t border-tactical-lightgray py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-4">
          <Link
            href="/emergency-tools"
            className="text-tactical-orange hover:text-tactical-orange-bright text-xs uppercase font-bold transition-colors"
          >
            🚨 Emergency
          </Link>
          <Link
            href="/faq"
            className="text-tactical-orange hover:text-tactical-orange-bright text-xs uppercase font-bold transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/settings"
            className="text-tactical-orange hover:text-tactical-orange-bright text-xs uppercase font-bold transition-colors"
          >
            Settings
          </Link>
          <Link
            href="/privacy"
            className="text-tactical-orange hover:text-tactical-orange-bright text-xs uppercase font-bold transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-tactical-orange hover:text-tactical-orange-bright text-xs uppercase font-bold transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-tactical-orange hover:text-tactical-orange-bright text-xs uppercase font-bold transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/support"
            className="text-tactical-orange hover:text-tactical-orange-bright text-xs uppercase font-bold transition-colors"
          >
            Support
          </Link>
          <Link
            href="/sitemap-page"
            className="text-tactical-orange hover:text-tactical-orange-bright text-xs uppercase font-bold transition-colors"
          >
            Sitemap
          </Link>
        </div>
        <p className="font-brand text-xs mb-2 text-center">
          © 2026 <span style={{ color: '#faf9f5' }}>Rebuild The Man</span> <span style={{ color: '#cc6119' }}>Protocol</span>. All rights reserved.
        </p>
        <p className="text-white text-xs max-w-4xl mx-auto leading-relaxed text-center">
          <span className="text-tactical-orange font-bold">Disclaimer:</span> This app is not a substitute for professional mental health care. Results vary based on individual circumstances and commitment. If you&apos;re experiencing a mental health crisis, thoughts of self-harm, or symptoms interfering with daily functioning, seek immediate professional help from a qualified mental health professional or call emergency services.
        </p>
      </div>
    </footer>
  );
}


