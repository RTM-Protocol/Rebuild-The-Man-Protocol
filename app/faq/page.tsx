'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  questions: FAQItem[];
}

export default function FAQPage() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const faqCategories: FAQCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          question: 'What is Rebuild The Man Protocol?',
          answer: "It's a self-help app designed specifically for men who find traditional therapy uncomfortable. Instead of endless talking, you get step-by-step protocols to address specific challenges like stress, anger, burnout, or imposter syndrome. Think of it as a repair manual for your mental state."
        },
        {
          question: 'Who is this for?',
          answer: "Men who want practical, action-oriented solutions to mental health challenges. If you're the type who fixes things rather than talks about them, this is for you. It's for guys who feel stuck, overwhelmed, or off-track and want clear steps to rebuild."
        },
        {
          question: 'Is this therapy?',
          answer: "No. This is a structured self-help tool. It's designed by therapists but delivered like a tactical manual. We don't diagnose conditions or provide treatment. If you need therapy, seek a licensed professional. This is for guys who want to work on themselves independently with a clear system."
        },
        {
          question: 'Do I need to have a diagnosed mental health condition to use this?',
          answer: "No. Most users don't have diagnoses. They just know something's off—stress is high, motivation is low, anger is quick, or confidence is shot. This is preventive maintenance as much as it is repair work."
        },
        {
          question: 'How much does it cost?',
          answer: "The app is free to use. All protocols are available at no cost. We built this to be accessible—mental health tools shouldn't have paywalls. If you find value in it, you can support the project through donations, but it's not required."
        }
      ]
    },
    {
      id: 'how-it-works',
      title: 'How It Works',
      questions: [
        {
          question: 'How do I get started?',
          answer: "Choose a protocol that matches your challenge (stress, anger, burnout, etc.). Pick your duration (7, 14, or 30 days). Start Day 1. Complete the daily mission. Check it off. Repeat. That's it."
        },
        {
          question: 'How long are the daily missions?',
          answer: "10-30 minutes each. Some days it's 10 minutes of focused work. Others might take 30. We respect your time—no mission requires more than 30 minutes."
        },
        {
          question: 'What if I miss a day?',
          answer: "Life happens. You can mark it as a setback and keep going. Your protocol doesn't reset unless you want it to. We track consistency but don't punish you for being human. The goal is progress, not perfection."
        },
        {
          question: 'Can I do multiple protocols at once?',
          answer: "Not recommended. Focus on one rebuild at a time. Trying to fix everything at once usually means fixing nothing. Complete one protocol, then start another if needed."
        },
        {
          question: "What if the protocol isn't working for me?",
          answer: "First, make sure you're actually doing the work, not just reading it. If you've genuinely completed 5-7 days and see zero benefit, switch protocols. Different issues need different approaches. If nothing helps after trying multiple protocols, it might be time to talk to a professional."
        },
        {
          question: 'Do I need to do the missions in order?',
          answer: "Yes. The protocols build progressively. Day 1 sets up Day 2, which sets up Day 3. Skipping around defeats the purpose. Trust the system."
        },
        {
          question: 'What happens after I complete a protocol?',
          answer: "You'll have built new habits and skills. You can restart the same protocol, choose a new one, or take what you've learned and run with it. Some guys do periodic \"maintenance runs\" of protocols every few months."
        }
      ]
    },
    {
      id: 'safety-limitations',
      title: 'Safety & Limitations',
      questions: [
        {
          question: 'Is this app safe to use?',
          answer: "Yes, as a self-help tool. But understand what it is and isn't. This app provides structured guidance for common challenges. It does NOT diagnose, treat, or cure mental health conditions. It does NOT replace professional care."
        },
        {
          question: 'When should I NOT use this app?',
          answer: "If you're experiencing:\n\n• Thoughts of self-harm or suicide\n• Severe depression where you can't function\n• Psychosis, hallucinations, or losing touch with reality\n• Symptoms from trauma that overwhelm you\n• Addiction that's out of control\n• Any crisis situation\n\nIn those cases, seek immediate professional help. This app is for self-improvement, not crisis intervention."
        },
        {
          question: 'Can this replace my therapist?',
          answer: "No. If you're seeing a therapist, this can complement that work. Some guys use protocols between sessions or to maintain progress after therapy ends. But this doesn't replace professional care if you need it."
        },
        {
          question: 'What if I\'m in crisis while using the app?',
          answer: "Stop. Put the app down. Get help immediately:\n\n• Call emergency services (911 in US, 999 in UK)\n• Contact a crisis helpline (988 Suicide & Crisis Lifeline in US, 116 123 Samaritans in UK)\n• Go to your nearest emergency room\n• Call your therapist if you have one\n\nThis app cannot help you in a crisis. Humans can."
        },
        {
          question: 'Are there any risks to using this app?',
          answer: "The main risk is using it when you actually need professional help. Some guys try to \"tough it out\" with self-help when they need more. Be honest with yourself. If things are getting worse or you're not functioning, see a professional."
        },
        {
          question: 'Who created the protocols?',
          answer: "Licensed therapists and mental health professionals designed the protocols. They're based on evidence-based approaches like CBT, behavioral activation, and exposure therapy—but delivered in plain language with action-oriented tasks instead of therapy-speak."
        }
      ]
    },
    {
      id: 'results-effectiveness',
      title: 'Results & Effectiveness',
      questions: [
        {
          question: 'Will this actually work?',
          answer: "Depends on you. The protocols are based on proven therapeutic techniques. If you do the work consistently, most guys see improvement. If you just read the missions and don't do them, nothing changes. Results require action."
        },
        {
          question: 'How quickly will I see results?',
          answer: "Most users notice shifts within 5-7 days of consistent work. Significant change usually happens around days 10-14. Long-term transformation takes completing full protocols and maintaining the habits. This isn't magic—it's cumulative effort."
        },
        {
          question: 'What kind of results can I expect?',
          answer: "That's individual. You might notice:\n\n• Better stress management\n• Less reactive anger\n• More focus and energy\n• Improved confidence\n• Better sleep\n• Clearer thinking\n• More control over impulses\n\nBut results vary based on your situation, consistency, and the nature of your challenge. No guarantees—just a solid system."
        },
        {
          question: 'What if it doesn\'t work for me?',
          answer: "First, evaluate honestly: Did you actually complete the daily missions or just think about them? Were you consistent or sporadic? If you genuinely did the work and saw no improvement, you might need a different approach or professional help. Not every tool works for everyone."
        },
        {
          question: 'Can I track my progress?',
          answer: "Yes. The app tracks:\n\n• Days completed\n• Current streak\n• Protocol completion percentage\n• Mission check-ins (before/after ratings)\n\nYou'll see objective data on your rebuild progress."
        }
      ]
    },
    {
      id: 'technical-account',
      title: 'Technical & Account',
      questions: [
        {
          question: 'What devices can I use this on?',
          answer: "Any device with a web browser—phone, tablet, desktop. The app is fully responsive and works on all modern browsers."
        },
        {
          question: 'Do I need an internet connection?',
          answer: "Yes, for now. You need internet to load missions and sync your progress. We're exploring offline capability for future versions, but currently an active connection is required."
        },
        {
          question: 'Is my data saved if I close the app?',
          answer: "Yes. Your progress is saved automatically to your device. You can close the app and come back anytime—your streak, completed missions, and current protocol are all stored locally in your browser."
        },
        {
          question: 'Can I reset my progress?',
          answer: "Yes. Go to Settings > Reset Protocol. This clears your current protocol and lets you start fresh. Use this if you want to restart or switch protocols. There's also an option to clear all data if you want a complete reset."
        },
        {
          question: 'Can I access this on multiple devices?',
          answer: "Currently, progress is stored locally on each device. If you use multiple devices, you'll have separate progress on each. Cloud sync is on our roadmap for future versions."
        },
        {
          question: 'What if I have technical issues?',
          answer: "Contact us at support@rebuildthemanprotocol.com. We'll help you troubleshoot. Common issues are usually browser-related—try updating your browser or clearing cache first. Make sure JavaScript is enabled."
        }
      ]
    },
    {
      id: 'privacy-data',
      title: 'Privacy & Data',
      questions: [
        {
          question: 'Is my data private?',
          answer: "Yes. Your protocol progress, check-ins, and usage data stay on your device in local browser storage. We don't collect, sell, or share your personal data. See our Privacy Policy for full details."
        },
        {
          question: 'Do you share my information with anyone?',
          answer: "No. Your rebuilding journey is your business, not ours to share. We don't sell data to advertisers, share with insurance companies, or give access to employers. No third-party tracking beyond basic anonymous analytics to improve the app."
        },
        {
          question: 'Can other people see my progress?',
          answer: "No. There are no social features. No sharing, no public profiles, no \"friends\" seeing your activity. This is completely private."
        },
        {
          question: 'What data do you collect?',
          answer: "We collect minimal data: protocols you've started, missions you've completed, check-in ratings, and basic usage analytics to improve the app. Everything is stored locally on your device. We don't collect messages, journal entries, or personal identifying information."
        },
        {
          question: 'Can I delete my data?',
          answer: "Yes. Go to Settings > Clear All Data. This permanently deletes all your progress, protocols, and check-ins from your device. This action cannot be undone, so make sure you're certain before clicking."
        }
      ]
    },
    {
      id: 'additional',
      title: 'Additional Questions',
      questions: [
        {
          question: 'I have feedback or suggestions. How do I share them?',
          answer: "We want to hear from you. Email us at feedback@rebuildthemanprotocol.com. We read everything and use it to improve the protocols. Your input directly shapes future updates."
        },
        {
          question: 'Why specifically for men?',
          answer: "Because most mental health resources use communication styles and approaches designed with women in mind. Men often need different language, different framing, and more action-oriented methods. We're not saying men can't do traditional therapy—many do successfully. We're saying there's a gap for guys who think differently, and we built this to fill it."
        },
        {
          question: 'Can I gift this to someone?',
          answer: "Since the app is free, you can simply share the link with anyone who might benefit. If you want to support someone's rebuild journey, send them the link and check in on their progress (if they're comfortable sharing)."
        },
        {
          question: 'Are you hiring or looking for contributors?',
          answer: "We're a small team focused on building the best possible protocols. If you're a licensed therapist, content creator, or developer interested in contributing, email us at team@rebuildthemanprotocol.com with your background and what you'd like to help with."
        }
      ]
    }
  ];

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenQuestion(openQuestion === key ? null : key);
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-tactical-black">
      <Navigation />

      {/* Header */}
      <header className="bg-tactical-darkgray border-b-2 border-tactical-orange">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="mb-4">
            <Link
              href="/"
              className="text-tactical-orange hover:text-tactical-orange-bright text-sm font-bold uppercase transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight mb-4">
            Questions? Answered.
          </h1>
          <p className="text-xl text-gray-300">
            Everything you need to know about <span className="font-brand"><span style={{ color: '#faf9f5' }}>Rebuild The Man</span> <span style={{ color: '#cc6119' }}>Protocol</span></span>
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Category Navigation */}
        <nav className="mb-12 bg-tactical-darkgray border border-tactical-lightgray p-6">
          <h2 className="text-white font-bold uppercase text-sm mb-4 flex items-center gap-2">
            <span>📑</span>
            <span>Jump to Section</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="text-left text-tactical-green-bright hover:text-tactical-orange text-sm font-bold uppercase transition-colors py-2 px-3 bg-tactical-gray hover:bg-tactical-lightgray"
              >
                {category.title}
              </button>
            ))}
          </div>
        </nav>

        {/* FAQ Categories */}
        {faqCategories.map((category) => (
          <section key={category.id} id={category.id} className="mb-12 scroll-mt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 bg-tactical-orange" />
              <h2 className="text-2xl font-bold text-white uppercase">
                {category.title}
              </h2>
            </div>

            <div className="space-y-3">
              {category.questions.map((item, index) => {
                const key = `${category.id}-${index}`;
                const isOpen = openQuestion === key;

                return (
                  <div
                    key={index}
                    className="bg-tactical-darkgray border border-tactical-lightgray overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(category.id, index)}
                      className="w-full text-left p-6 flex items-center justify-between hover:bg-tactical-gray transition-colors group"
                    >
                      <span className="text-white font-bold text-lg pr-4 group-hover:text-tactical-orange transition-colors">
                        {item.question}
                      </span>
                      <span className={`text-tactical-orange text-2xl flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-tactical-lightgray">
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="mt-16 bg-tactical-darkgray border-2 border-tactical-orange p-8 text-center">
          <h2 className="text-2xl font-bold text-white uppercase mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-300 mb-6 text-lg">
            Email us at <a href="mailto:support@rebuildthemanprotocol.com" className="text-tactical-orange hover:text-tactical-orange-bright font-bold">support@rebuildthemanprotocol.com</a>
          </p>
          <div className="border-t border-tactical-lightgray pt-6 mt-6">
            <p className="text-white font-bold text-xl mb-4 uppercase">
              Ready to Start Your Rebuild?
            </p>
            <Link
              href="/"
              className="btn-primary inline-block text-lg py-4 px-8"
            >
              Browse Protocols
            </Link>
          </div>
        </section>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-tactical-orange hover:bg-tactical-orange-bright text-white p-4 border-2 border-tactical-lightgray transition-all hover:scale-110 hidden md:block"
          aria-label="Scroll to top"
        >
          <span className="text-xl">↑</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}


