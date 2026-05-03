'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { protocols } from '@/data/protocols';
import { useProgress } from '@/contexts/ProgressContext';
import ActiveProtocolBlocker from './ActiveProtocolBlocker';
import BrandShieldIcon from '@/components/BrandShieldIcon';
import { BRAND_ORANGE_HEX } from '@/lib/protocolVisualTheme';

export default function Navigation() {
  const pathname = usePathname();
  const { activeProtocol } = useProgress();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProtocolsSubMenuOpen, setIsProtocolsSubMenuOpen] = useState(false);
  const [showBlocker, setShowBlocker] = useState(false);

  const handleProtocolClick = (e: React.MouseEvent, protocolId: string) => {
    // Only block if there's an active protocol AND it's a different protocol
    if (activeProtocol && activeProtocol.protocolId !== protocolId) {
      e.preventDefault();
      setShowBlocker(true);
      setIsMenuOpen(false);
      setIsProtocolsSubMenuOpen(false);
    }
    // If it's the same protocol, allow navigation (user is just viewing their current protocol)
  };

  return (
    <>
      <nav className="bg-tactical-darkgray border-b border-tactical-lightgray relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Collapsible Menu Button */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setIsMenuOpen(true);
              }}
              onMouseLeave={() => {
                setIsMenuOpen(false);
                setIsProtocolsSubMenuOpen(false);
              }}
            >
              <button
                className="flex items-center gap-2 px-4 py-2 bg-tactical-gray hover:bg-tactical-orange text-white font-bold uppercase text-sm transition-colors border border-tactical-lightgray"
              >
                <span>Menu</span>
                <span className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-tactical-darkgray border-2 border-tactical-orange shadow-2xl animate-fade-in">
                    <div className="py-2">
                      {/* All Protocols with Sub-Menu */}
                      <div
                        className="relative"
                        onMouseEnter={() => setIsProtocolsSubMenuOpen(true)}
                        onMouseLeave={() => setIsProtocolsSubMenuOpen(false)}
                      >
                        <Link
                          href="/"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsProtocolsSubMenuOpen(false);
                          }}
                          className={`
                            block px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all
                            ${pathname === '/' 
                              ? 'bg-tactical-orange text-white' 
                              : 'text-white hover:bg-tactical-gray hover:text-tactical-orange hover:pl-8'
                            }
                          `}
                        >
                          <span className="flex items-center justify-between">
                            <span>All Protocols</span>
                            <span className="text-xs ml-2">→</span>
                          </span>
                        </Link>

                        {/* Protocols Sub-Menu */}
                        {isProtocolsSubMenuOpen && (
                          <div className="absolute left-full top-0 pl-2 w-64">
                            <div className="bg-tactical-gray border-2 border-tactical-green shadow-2xl animate-fade-in max-h-96 overflow-y-auto">
                              <div className="py-2">
                                {protocols.map((protocol) => (
                                  <Link
                                    key={protocol.id}
                                    href={`/protocol/${protocol.id}`}
                                    onClick={(e) => {
                                      handleProtocolClick(e, protocol.id);
                                      // Only close menu if not blocked
                                      if (!activeProtocol || activeProtocol.protocolId === protocol.id) {
                                        setIsMenuOpen(false);
                                        setIsProtocolsSubMenuOpen(false);
                                      }
                                    }}
                                    className={`
                                      block px-6 py-3 text-xs font-bold uppercase tracking-wide transition-all
                                      ${activeProtocol && activeProtocol.protocolId !== protocol.id
                                        ? 'text-gray-500 hover:bg-tactical-darkgray hover:text-tactical-orange hover:pl-8 cursor-pointer'
                                        : 'text-white hover:bg-tactical-darkgray hover:text-tactical-green-bright hover:pl-8'
                                      }
                                    `}
                                  >
                                    {protocol.title}
                                    {activeProtocol && activeProtocol.protocolId === protocol.id && (
                                      <span className="ml-2 text-tactical-green-bright">✓</span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    
                    <Link
                      href="/emergency-tools"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsProtocolsSubMenuOpen(false);
                      }}
                      className={`
                        block px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all
                        ${pathname?.startsWith('/emergency-tools')
                          ? 'bg-red-900 text-white' 
                          : 'text-gray-300 hover:bg-red-900/30 hover:text-red-400 hover:pl-8'
                        }
                      `}
                    >
                      <span className="emergency-light inline-block">🚨</span> Emergency
                    </Link>

                    <Link
                      href="/stats"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsProtocolsSubMenuOpen(false);
                      }}
                      className={`
                        block px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all
                        ${pathname === '/stats' 
                          ? 'bg-tactical-orange text-white' 
                          : 'text-white hover:bg-tactical-gray hover:text-tactical-orange hover:pl-8'
                        }
                      `}
                    >
                      📊 Stats
                    </Link>
                    
                    <Link
                      href="/faq"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsProtocolsSubMenuOpen(false);
                      }}
                      className={`
                        block px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all
                        ${pathname === '/faq' 
                          ? 'bg-tactical-orange text-white' 
                          : 'text-white hover:bg-tactical-gray hover:text-tactical-orange hover:pl-8'
                        }
                      `}
                    >
                      FAQ
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsProtocolsSubMenuOpen(false);
                      }}
                      className={`
                        block px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all
                        ${pathname === '/settings' 
                          ? 'bg-tactical-orange text-white' 
                          : 'text-white hover:bg-tactical-gray hover:text-tactical-orange hover:pl-8'
                        }
                      `}
                    >
                      ⚙️ Settings
                    </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Logo/Brand */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group relative z-10 cursor-pointer"
              aria-label="Rebuild The Man Protocol home"
              onClick={() => {
                setIsMenuOpen(false);
                setIsProtocolsSubMenuOpen(false);
              }}
            >
              <span className="text-2xl leading-none" aria-hidden>
                <BrandShieldIcon title="" strokeColor={BRAND_ORANGE_HEX} />
              </span>
              <div>
                <div className="font-brand">
                  <span className="block text-lg font-bold uppercase tracking-tight leading-none group-hover:text-tactical-orange transition-colors" style={{ color: '#faf9f5' }}>Rebuild The Man</span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] leading-tight" style={{ color: '#cc6119' }}>Protocol</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Active Protocol Blocker */}
      {activeProtocol && (
        <ActiveProtocolBlocker
          isOpen={showBlocker}
          onClose={() => setShowBlocker(false)}
          activeProtocolId={activeProtocol.protocolId}
          activeProtocolDay={activeProtocol.currentDay}
          activeProtocolDuration={activeProtocol.duration}
        />
      )}
    </>
  );
}

