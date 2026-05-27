'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { protocols } from '@/data/protocols';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import ActiveProtocolBlocker from './ActiveProtocolBlocker';
import BrandShieldIcon from '@/components/BrandShieldIcon';
import { BRAND_ORANGE_HEX } from '@/lib/protocolVisualTheme';

/** Tailwind `md` breakpoint — keep in sync with tailwind.config */
const MD_MIN_PX = 768;

export default function Navigation() {
  const pathname = usePathname();
  const { activeProtocol } = useProgress();
  const { user, signOut, hasPaid } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProtocolsSubMenuOpen, setIsProtocolsSubMenuOpen] = useState(false);
  const [showBlocker, setShowBlocker] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const navRootRef = useRef<HTMLDivElement>(null);
  /** After closing via click on desktop, ignore hover-open until the pointer leaves the menu root (avoids stuck-closed while still hovered). */
  const suppressHoverOpenRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MD_MIN_PX}px)`);
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProtocolsSubMenuOpen(false);
  };

  useEffect(() => {
    if (isDesktop || !isMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRootRef.current && !navRootRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, [isMenuOpen, isDesktop]);

  const handleProtocolClick = (e: React.MouseEvent, protocolId: string) => {
    if (activeProtocol && activeProtocol.protocolId !== protocolId) {
      e.preventDefault();
      setShowBlocker(true);
      closeMenu();
    }
  };

  const hoverRootHandlers = isDesktop
    ? {
        onMouseEnter: () => {
          if (suppressHoverOpenRef.current) return;
          setIsMenuOpen(true);
        },
        onMouseLeave: () => {
          suppressHoverOpenRef.current = false;
          setIsMenuOpen(false);
          setIsProtocolsSubMenuOpen(false);
        },
      }
    : {};

  const protocolsHoverHandlers = isDesktop
    ? {
        onMouseEnter: () => setIsProtocolsSubMenuOpen(true),
        onMouseLeave: () => setIsProtocolsSubMenuOpen(false),
      }
    : {};

  const menuItemClass = `
    flex items-center min-h-[44px] px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all
  `;

  return (
    <>
      <nav className="bg-tactical-darkgray border-b border-tactical-lightgray relative z-[60]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div ref={navRootRef} className="relative" {...hoverRootHandlers}>
              <button
                type="button"
                className="flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] md:min-w-0 px-3 md:px-4 bg-tactical-gray hover:bg-tactical-orange text-white font-bold uppercase text-sm transition-colors border border-tactical-lightgray"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen((open) => {
                    const next = !open;
                    if (!next) {
                      setIsProtocolsSubMenuOpen(false);
                      if (isDesktop) suppressHoverOpenRef.current = true;
                    } else if (isDesktop) {
                      suppressHoverOpenRef.current = false;
                    }
                    return next;
                  });
                }}
                aria-expanded={isMenuOpen}
                aria-controls="site-nav-menu"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span className="md:hidden flex flex-col justify-center gap-1.5 w-6 shrink-0" aria-hidden>
                  <span className="h-0.5 w-full bg-white rounded-full" />
                  <span className="h-0.5 w-full bg-white rounded-full" />
                  <span className="h-0.5 w-full bg-white rounded-full" />
                </span>
                <span className="hidden md:inline">Menu</span>
                <span
                  className={`hidden md:inline transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>

              {isMenuOpen && !isDesktop && (
                <div
                  className="fixed inset-0 top-16 z-40 bg-black/50 md:hidden"
                  aria-hidden
                  onClick={closeMenu}
                />
              )}

              {isMenuOpen && (
                <div
                  id="site-nav-menu"
                  className={`
                    z-50 animate-fade-in
                    fixed left-0 right-0 top-16 max-h-[min(calc(100dvh-4rem),80vh)] overflow-y-auto px-3 pb-6
                    md:max-h-none md:overflow-visible md:px-0 md:pb-0
                    md:absolute md:left-0 md:top-full md:pt-2 md:w-56
                  `}
                  role="navigation"
                  aria-label="Main menu"
                >
                  <div className="bg-tactical-darkgray border-2 border-tactical-orange shadow-2xl md:border-2">
                    <div className="md:hidden flex items-center justify-between gap-2 border-b border-tactical-lightgray px-2 min-h-[48px]">
                      <span className="text-white font-bold uppercase text-sm tracking-wide pl-2">Menu</span>
                      <button
                        type="button"
                        onClick={closeMenu}
                        className="min-h-[44px] min-w-[44px] shrink-0 flex items-center justify-center text-white text-2xl leading-none hover:text-tactical-orange transition-colors"
                        aria-label="Close menu"
                      >
                        ×
                      </button>
                    </div>

                    <div className="py-2">
                      <div className="relative" {...protocolsHoverHandlers}>
                        <Link
                          href="/"
                          onClick={closeMenu}
                          className={`
                            ${menuItemClass}
                            hidden md:flex
                            ${pathname === '/'
                              ? 'bg-tactical-orange text-white'
                              : 'text-white hover:bg-tactical-gray hover:text-tactical-orange'
                            }
                          `}
                        >
                          <span className="flex items-center justify-between w-full">
                            <span>All Protocols</span>
                            <span className="text-xs ml-2">→</span>
                          </span>
                        </Link>

                        <button
                          type="button"
                          className={`
                            ${menuItemClass}
                            md:hidden w-full text-left justify-between
                            text-white hover:bg-tactical-gray hover:text-tactical-orange
                          `}
                          onClick={() => setIsProtocolsSubMenuOpen((v) => !v)}
                          aria-expanded={isProtocolsSubMenuOpen}
                        >
                          <span>All Protocols</span>
                          <span className="text-xs shrink-0" aria-hidden>
                            {isProtocolsSubMenuOpen ? '▲' : '▼'}
                          </span>
                        </button>

                        {isProtocolsSubMenuOpen && (
                          <div
                            className="
                              md:absolute md:left-full md:top-0 md:pl-2 md:w-64
                              w-full
                            "
                          >
                            <div className="bg-tactical-gray border-2 border-tactical-green shadow-2xl max-h-64 md:max-h-96 overflow-y-auto">
                              <div className="py-1 md:py-2">
                                <Link
                                  href="/"
                                  onClick={closeMenu}
                                  className={`${menuItemClass} text-tactical-green-bright hover:bg-tactical-darkgray text-xs md:text-sm`}
                                >
                                  <span className="w-full">View protocol library (home)</span>
                                </Link>
                                {protocols.map((protocol) => (
                                  <Link
                                    key={protocol.id}
                                    href={`/protocol/${protocol.id}`}
                                    onClick={(e) => {
                                      handleProtocolClick(e, protocol.id);
                                      if (!activeProtocol || activeProtocol.protocolId === protocol.id) {
                                        closeMenu();
                                      }
                                    }}
                                    className={`
                                      ${menuItemClass} text-xs md:text-sm
                                      ${activeProtocol && activeProtocol.protocolId !== protocol.id
                                        ? 'text-gray-500 hover:bg-tactical-darkgray hover:text-tactical-orange'
                                        : 'text-white hover:bg-tactical-darkgray hover:text-tactical-green-bright'
                                      }
                                    `}
                                  >
                                    <span className="w-full">
                                      {protocol.title}
                                      {activeProtocol && activeProtocol.protocolId === protocol.id && (
                                        <span className="ml-2 text-tactical-green-bright">✓</span>
                                      )}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <Link
                        href="/emergency-tools"
                        onClick={closeMenu}
                        className={`
                          ${menuItemClass}
                          ${pathname?.startsWith('/emergency-tools')
                            ? 'bg-red-900 text-white'
                            : 'text-gray-300 hover:bg-red-900/30 hover:text-red-400'
                          }
                        `}
                      >
                        <span className="emergency-light inline-block">🚨</span>&nbsp;Emergency
                      </Link>

                      <Link
                        href="/stats"
                        onClick={closeMenu}
                        className={`
                          ${menuItemClass}
                          ${pathname === '/stats'
                            ? 'bg-tactical-orange text-white'
                            : 'text-white hover:bg-tactical-gray hover:text-tactical-orange'
                          }
                        `}
                      >
                        📊 Stats
                      </Link>

                      <Link
                        href="/faq"
                        onClick={closeMenu}
                        className={`
                          ${menuItemClass}
                          ${pathname === '/faq'
                            ? 'bg-tactical-orange text-white'
                            : 'text-white hover:bg-tactical-gray hover:text-tactical-orange'
                          }
                        `}
                      >
                        FAQ
                      </Link>

                      <Link
                        href="/settings"
                        onClick={closeMenu}
                        className={`
                          ${menuItemClass}
                          ${pathname === '/settings'
                            ? 'bg-tactical-orange text-white'
                            : 'text-white hover:bg-tactical-gray hover:text-tactical-orange'
                          }
                        `}
                      >
                        ⚙️ Settings
                      </Link>

                      <div className="border-t border-tactical-lightgray my-2" />

                      {user ? (
                        <>
                          <Link
                            href="/account"
                            onClick={closeMenu}
                            className={`
                              ${menuItemClass}
                              ${pathname === '/account'
                                ? 'bg-tactical-orange text-white'
                                : 'text-white hover:bg-tactical-gray hover:text-tactical-orange'
                              }
                            `}
                          >
                            👤 Account
                            {!hasPaid && (
                              <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-tactical-orange-bright">
                                Free
                              </span>
                            )}
                          </Link>
                          <button
                            type="button"
                            onClick={async () => {
                              closeMenu();
                              await signOut();
                            }}
                            className={`${menuItemClass} w-full text-left text-gray-300 hover:bg-tactical-gray hover:text-tactical-orange`}
                          >
                            ↩ Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/login"
                            onClick={closeMenu}
                            className={`
                              ${menuItemClass}
                              ${pathname === '/login'
                                ? 'bg-tactical-orange text-white'
                                : 'text-white hover:bg-tactical-gray hover:text-tactical-orange'
                              }
                            `}
                          >
                            → Log In
                          </Link>
                          <Link
                            href="/signup"
                            onClick={closeMenu}
                            className={`
                              ${menuItemClass}
                              ${pathname === '/signup'
                                ? 'bg-tactical-orange text-white'
                                : 'text-tactical-orange-bright hover:bg-tactical-gray hover:text-tactical-orange'
                              }
                            `}
                          >
                            ★ Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/"
              className="flex items-center gap-3 group relative z-10 cursor-pointer min-h-[44px]"
              aria-label="Rebuild The Man Protocol home"
              onClick={closeMenu}
            >
              <span className="text-2xl leading-none" aria-hidden>
                <BrandShieldIcon title="" strokeColor={BRAND_ORANGE_HEX} />
              </span>
              <div>
                <div className="font-brand">
                  <span
                    className="block text-lg font-bold uppercase tracking-tight leading-none group-hover:text-tactical-orange transition-colors"
                    style={{ color: '#faf9f5' }}
                  >
                    Rebuild The Man
                  </span>
                  <span
                    className="block text-[10px] font-semibold uppercase tracking-[0.25em] leading-tight"
                    style={{ color: '#cc6119' }}
                  >
                    Protocol
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </nav>

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
