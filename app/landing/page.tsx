'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { protocols } from '@/data/protocols';

export default function LandingPage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Intersection Observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-tactical-black">
      {/* Navigation */}
      <nav className="bg-tactical-darkgray border-b border-tactical-lightgray sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔨</span>
              <div>
                <div className="font-brand">
                  <span className="block text-lg font-bold uppercase tracking-tight leading-none" style={{ color: '#faf9f5' }}>Rebuild The Man</span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] leading-tight" style={{ color: '#cc6119' }}>Protocol</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/emergency-tools"
                className="text-gray-400 hover:text-red-500 text-sm font-bold uppercase transition-colors"
              >
                🚨 Emergency
              </Link>
              <Link
                href="/"
                className="btn-primary text-sm py-2 px-6"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative bg-tactical-black overflow-hidden">
        {/* Technical grid background */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-4xl">
            <div className="text-tactical-orange font-mono text-sm mb-4 uppercase tracking-wider">
              [ SYSTEM DIAGNOSTICS ]
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white uppercase leading-tight mb-6">
              You Don&apos;t Need Therapy.<br />
              You Need a <span className="text-tactical-orange">Repair Manual</span>.
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
              Step-by-step protocols to fix what&apos;s broken. Built by therapists. 
              Designed for men who <span className="text-tactical-green-bright font-bold">do</span>, not talk.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/"
                className="btn-primary text-lg py-4 px-8 text-center"
              >
                Start Your Rebuild →
              </Link>
              <a
                href="#how-it-works"
                className="btn-secondary text-lg py-4 px-8 text-center"
              >
                How It Works
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-tactical-green-bright" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-tactical-green-bright" />
                <span>10-30 minutes per day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-tactical-green-bright" />
                <span>Results in 7-30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Angled bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-tactical-darkgray" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }} />
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="bg-tactical-darkgray py-20 sm:py-32 fade-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase mb-4">
              Traditional Mental Health <span className="text-red-500">Wasn&apos;t Built for You</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              If you&apos;re here, the touchy-feely approach isn&apos;t working.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '💬',
                title: 'Not Your Style',
                description: 'Sitting on a couch talking about feelings? That&apos;s not how you operate.'
              },
              {
                icon: '❓',
                title: 'Too Abstract',
                description: 'Abstract advice like "be mindful" doesn&apos;t tell you what to actually do.'
              },
              {
                icon: '🔄',
                title: 'Endless Loops',
                description: 'You want solutions, not endless conversations that go nowhere.'
              },
              {
                icon: '⚙️',
                title: 'No System',
                description: 'You fix problems. You need a system that works the same way you do.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-tactical-gray border-l-4 border-red-700 p-6 hover:border-tactical-orange transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white uppercase mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOLUTION SECTION */}
      <section className="bg-tactical-black py-20 sm:py-32 fade-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-tactical-orange font-mono text-sm mb-4 uppercase tracking-wider">
                [ SOLUTION DEPLOYED ]
              </div>
              
              <h2 className="font-brand text-4xl sm:text-5xl font-bold uppercase mb-6">
                <span style={{ color: '#faf9f5' }}>Introducing</span><br />
                <span style={{ color: '#faf9f5' }}>Rebuild The Man</span><br />
                <span className="text-2xl sm:text-3xl font-semibold tracking-[0.25em]" style={{ color: '#cc6119' }}>Protocol</span>
              </h2>
              
              <p className="text-xl text-tactical-green-bright mb-6 font-semibold">
                Your mental health, treated like any other system that needs maintenance.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Choose what&apos;s broken. Get a clear protocol. Complete daily missions. 
                Track your progress. <span className="text-white font-bold">That&apos;s it.</span>
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'No abstract concepts. Concrete daily tasks.',
                  'No endless talking. Time-boxed protocols.',
                  'No guessing. Track measurable progress.',
                  'No judgment. Your rebuild, your pace.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-tactical-orange flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-gray-300 text-lg">{item}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/"
                className="btn-primary inline-block"
              >
                Get Started Now
              </Link>
            </div>

            {/* App Interface Preview */}
            <div className="relative">
              <div className="bg-tactical-darkgray border-2 border-tactical-lightgray p-8 relative">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-tactical-orange" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-tactical-orange" />
                
                <div className="bg-tactical-black p-6 border border-tactical-lightgray mb-4">
                  <div className="text-tactical-orange font-mono text-xs mb-2">ACTIVE PROTOCOL</div>
                  <div className="text-white font-bold text-xl mb-2 uppercase">System Overload Protocol</div>
                  <div className="text-tactical-green-bright text-sm font-mono">DAY 3 OF 14</div>
                  <div className="progress-bar mt-4">
                    <div className="progress-fill" style={{ width: '21%' }} />
                  </div>
                </div>

                <div className="bg-tactical-black p-6 border border-tactical-lightgray">
                  <div className="text-white font-bold uppercase mb-4">Today&apos;s Mission</div>
                  <div className="space-y-2 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span>Morning system check</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-tactical-green">✓</span>
                      <span>Execute breathing protocol</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">○</span>
                      <span>Complete stress audit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-tactical-darkgray py-20 sm:py-32 fade-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase mb-4">
              3 Steps to Rebuild
            </h2>
            <p className="text-xl text-gray-400">
              Simple. Direct. Effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Diagnose',
                description: 'Pick your issue from the protocol library. Stress? Anger? Burnout? Porn addiction? Imposter syndrome? We have protocols for the problems men actually face.',
                icon: '🔍'
              },
              {
                step: '02',
                title: 'Execute',
                description: 'Follow daily missions. 10-30 minutes. Specific tasks, not abstract concepts. Each mission is designed to rewire the system, one action at a time.',
                icon: '⚡'
              },
              {
                step: '03',
                title: 'Track',
                description: 'See measurable progress. Maintain your streak. Complete the rebuild. Your check-ins show objective improvement over time.',
                icon: '📊'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-tactical-black border-2 border-tactical-lightgray p-8 hover:border-tactical-orange transition-all duration-300 relative group"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-tactical-gray opacity-20 group-hover:opacity-40 transition-opacity">
                  {item.step}
                </div>
                
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-white uppercase mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="bg-tactical-black py-20 sm:py-32 fade-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase mb-4">
              Built Different. <span className="text-tactical-green-bright">For Men Who Think Different.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Traditional Therapy */}
            <div className="bg-tactical-darkgray border-2 border-red-700 p-8">
              <h3 className="text-2xl font-bold text-red-500 uppercase mb-6 text-center">
                Traditional Therapy
              </h3>
              <div className="space-y-4">
                {[
                  'Endless sessions with no clear end',
                  'Abstract concepts and feelings focus',
                  'Passive: talk about problems',
                  'Progress is subjective',
                  'Expensive, time-consuming',
                  'Social stigma and discomfort'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-gray-400">
                    <span className="text-red-500 text-xl">✗</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rebuild The Man Protocol */}
            <div className="bg-tactical-darkgray border-2 border-tactical-green p-8">
              <h3 className="font-brand text-center mb-6">
                <span className="block text-2xl font-bold uppercase" style={{ color: '#faf9f5' }}>Rebuild The Man</span>
                <span className="block text-sm font-semibold uppercase tracking-[0.25em]" style={{ color: '#cc6119' }}>Protocol</span>
              </h3>
              <div className="space-y-4">
                {[
                  'Time-boxed: 7-30 day protocols',
                  'Concrete actions and specific tasks',
                  'Active: execute daily missions',
                  'Track measurable progress',
                  'Free to start, low commitment',
                  'Private. No social features.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-gray-200">
                    <span className="text-tactical-green-bright text-xl">✓</span>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-tactical-orange font-bold uppercase">
              Therapist-Designed. Coach-Delivered.
            </p>
          </div>
        </div>
      </section>

      {/* PROTOCOL SHOWCASE */}
      <section className="bg-tactical-darkgray py-20 sm:py-32 fade-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-tactical-orange font-mono text-sm mb-4 uppercase tracking-wider">
              [ SELECT YOUR PROTOCOL ]
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase mb-4">
              What Needs Fixing?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose your protocol. Execute the missions. Rebuild the system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protocols.slice(0, 6).map((protocol) => (
              <div
                key={protocol.id}
                className="protocol-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-5xl mb-4 breathe-animation">
                  {protocol.icon}
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-2 group-hover:text-tactical-orange transition-colors">
                  {protocol.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {protocol.tagline}
                </p>
                <div className="flex items-center gap-2 text-xs text-tactical-green-bright font-mono">
                  <span>⏱</span>
                  <span>{protocol.durations.join(', ')} days</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/"
              className="btn-primary inline-block text-lg py-4 px-8"
            >
              View All Protocols →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Optional - Using placeholder) */}
      <section className="bg-tactical-black py-20 sm:py-32 fade-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase mb-4">
              Men Who Rebuilt
            </h2>
            <p className="text-xl text-gray-400">
              Real results. Real men. Real progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Fixed my anger in 2 weeks. Actually gave me steps to follow instead of just talking.',
                name: 'Marcus T.',
                protocol: 'Pressure Valve Protocol'
              },
              {
                quote: 'No BS. Just work. Helped me reset after burnout. Back to operating at 100%.',
                name: 'David K.',
                protocol: 'System Overhaul Protocol'
              },
              {
                quote: 'Finally something that treats mental health like an engineering problem. It works.',
                name: 'Alex R.',
                protocol: 'Confidence Calibration'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-tactical-darkgray border-l-4 border-tactical-green p-6"
              >
                <div className="text-4xl text-tactical-orange mb-4">&ldquo;</div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  {testimonial.quote}
                </p>
                <div className="border-t border-tactical-lightgray pt-4">
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-tactical-green-bright text-sm font-mono">
                    {testimonial.protocol}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-tactical-darkgray py-20 sm:py-32 border-t-4 border-tactical-orange fade-on-scroll">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase mb-6">
            Ready to Start Your Rebuild?
          </h2>
          <p className="text-2xl text-gray-300 mb-8">
            No fluff. No endless talking. Just the work.
          </p>
          
          <Link
            href="/"
            className="btn-primary inline-block text-xl py-5 px-12 mb-6"
          >
            Launch the Protocol
          </Link>
          
          <p className="text-gray-400">
            Free to start. No credit card required. Start rebuilding today.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-tactical-black border-t border-tactical-lightgray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Nav */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🔨</span>
                <div>
                  <div className="font-brand">
                    <span className="block text-sm font-bold uppercase tracking-tight leading-none" style={{ color: '#faf9f5' }}>Rebuild The Man</span>
                    <span className="block text-[8px] font-semibold uppercase tracking-[0.25em] leading-tight" style={{ color: '#cc6119' }}>Protocol</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Action-driven mental health protocols designed for men who do, not talk.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase text-sm mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/" className="hover:text-tactical-orange transition-colors">All Protocols</Link></li>
                <li><Link href="/emergency-tools" className="hover:text-red-500 transition-colors">Emergency Tools</Link></li>
                <li><Link href="/stats" className="hover:text-tactical-orange transition-colors">Track Progress</Link></li>
                <li><Link href="/settings" className="hover:text-tactical-orange transition-colors">Settings</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase text-sm mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/faq" className="hover:text-tactical-orange transition-colors">FAQ</Link></li>
                <li><a href="#about" className="hover:text-tactical-orange transition-colors">About</a></li>
                <li><a href="mailto:feedback@rebuildthemanprotocol.com" className="hover:text-tactical-orange transition-colors">Contact</a></li>
                <li><a href="mailto:feedback@rebuildthemanprotocol.com" className="hover:text-tactical-orange transition-colors">Feedback</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#disclaimer" className="hover:text-tactical-orange transition-colors">Disclaimer</a></li>
                <li><Link href="/privacy" className="hover:text-tactical-orange transition-colors">Privacy Policy</Link></li>
                <li><a href="#terms" className="hover:text-tactical-orange transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-tactical-lightgray pt-8 mb-8">
            <div className="bg-tactical-darkgray border-l-4 border-tactical-orange p-6">
              <h4 className="text-white font-bold uppercase text-sm mb-3 flex items-center gap-2">
                <span>⚠️</span>
                <span>Important Disclaimer</span>
              </h4>
              <p className="text-white text-xs leading-relaxed mb-3">
                Rebuild The Man Protocol is a self-help tool designed to complement, not replace, professional mental health care. 
                Results vary based on individual circumstances, commitment, and the nature of challenges faced. No outcomes are guaranteed. 
                This app does not provide medical advice, diagnosis, or treatment.
              </p>
              <p className="text-white text-xs leading-relaxed">
                <span className="text-white font-bold">If you are experiencing a mental health crisis, thoughts of self-harm, or symptoms that interfere with daily functioning, please seek immediate help from a qualified mental health professional, call your local emergency services, or contact a crisis hotline.</span> By using this app, you acknowledge that you understand these limitations and agree to use it as a supplementary resource only.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">© 2026 Rebuild The Man Protocol. All rights reserved.</p>
            <p className="text-xs">
              This app is not a substitute for professional mental health care. Results vary. If you&apos;re in crisis, seek immediate professional help.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

