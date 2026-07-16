'use client';

import Link from 'next/link';
import { protocols } from '@/data/protocols';
import ProtocolIcon from '@/components/ProtocolIcon';
import { getProtocolVisualTheme } from '@/lib/protocolVisualTheme';

interface DiagnosticRecommendationProps {
  primaryIssue: string;
  onBrowseAll: () => void;
}

export default function DiagnosticRecommendation({ primaryIssue, onBrowseAll }: DiagnosticRecommendationProps) {
  // Map primary issue to protocol ID
  const getRecommendedProtocol = () => {
    const mapping: Record<string, string> = {
      'stress': 'system-overload',
      'anger': 'pressure-valve',
      'burnout': 'system-overhaul',
      'confidence': 'confidence-calibration',
      'porn': 'reset-rewire',
      'relationship': 'communication-upgrade',
      'depression': 'engine-restart',
      'anxiety': 'control-systems',
      'multiple': 'rebuild-the-man' // Foundation protocol
    };

    return mapping[primaryIssue] || 'rebuild-the-man';
  };

  const recommendedId = getRecommendedProtocol();
  const protocol = protocols.find(p => p.id === recommendedId);

  const accentHex = protocol
    ? getProtocolVisualTheme(protocol.id)?.hex ?? '#ff6b35'
    : '#ff6b35';

  if (!protocol) {
    // Fallback to browsing all
    onBrowseAll();
    return null;
  }

  // Get reason based on issue
  const getRecommendationReason = () => {
    const reasons: Record<string, string> = {
      'stress': 'Your stress response system is overloaded. This protocol installs pressure release mechanisms and recalibrates your tolerance.',
      'anger': "Quick reactive anger means your pressure valve is broken. This protocol rebuilds your response system so you control the anger—it doesn't control you.",
      'burnout': "When focus is gone and you're running on empty, you need a complete system overhaul. This protocol rebuilds your energy management from the ground up.",
      'confidence': "Confidence isn't built by thinking—it's built by doing. This protocol recalibrates your self-assessment system through action.",
      'porn': "This is a wiring issue. The reset protocol breaks the patterns and rewires your reward system. Clinical, tactical, effective.",
      'relationship': "Communication breakdowns need systematic repair. This protocol upgrades how you process, express, and receive in relationships.",
      'depression': "When the engine won't start, you need a manual ignition sequence. This protocol gets core systems back online, one component at a time.",
      'anxiety': "Overthinking is a control system malfunction. This protocol recalibrates your threat assessment and teaches your brain to differentiate real problems from noise.",
      'multiple': "Multiple issues or unsure where to start? The Foundation Protocol covers fundamentals. Think of it as basic training before specialized missions."
    };

    return reasons[primaryIssue] || reasons['multiple'];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tactical-gray overflow-y-auto">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Content */}
      <div className="relative max-w-3xl w-full py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-tactical-green-bright font-mono text-sm uppercase mb-4">
            [ DIAGNOSTIC COMPLETE ]
          </div>
          <h1 className="text-4xl font-bold text-white uppercase tracking-tight mb-4">
            Based On Your Answers,<br />Start Here:
          </h1>
        </div>

        {/* Recommended Protocol Card */}
        <div
          className="bg-tactical-darkgray border-4 p-8 mb-6"
          style={{ borderColor: accentHex }}
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="text-7xl breathe-animation">
              <ProtocolIcon protocolId={protocol.id} />
            </div>
            <div className="flex-1">
              <div className="text-tactical-orange font-mono text-xs uppercase mb-2">
                Recommended Protocol
              </div>
              <h2 className="text-3xl font-bold text-white uppercase mb-2">
                {protocol.title}
              </h2>
              <p className="text-tactical-green-bright font-mono text-sm mb-4">
                {protocol.tagline}
              </p>
            </div>
          </div>

          <div
            className="bg-tactical-gray border-l-4 p-6 mb-6"
            style={{ borderLeftColor: accentHex }}
          >
            <h3 className="text-white font-bold uppercase text-sm mb-3">
              Why This Protocol:
            </h3>
            <p className="text-gray-200 leading-relaxed">
              {getRecommendationReason()}
            </p>
          </div>

          {/* Protocol Details */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-tactical-gray p-4">
              <div className="text-tactical-orange font-mono text-xs mb-1">DURATION OPTIONS</div>
              <div className="text-white font-bold">{protocol.durations.join(', ')} days</div>
            </div>
            <div className="bg-tactical-gray p-4">
              <div className="text-tactical-orange font-mono text-xs mb-1">TIME/DAY</div>
              <div className="text-white font-bold">10-30 min</div>
            </div>
            <div className="bg-tactical-gray p-4">
              <div className="text-tactical-orange font-mono text-xs mb-1">APPROACH</div>
              <div className="text-white font-bold">Action-Based</div>
            </div>
          </div>

          {/* Primary CTA */}
          <Link
            href={`/protocol/${protocol.id}`}
            className="btn-primary w-full text-center text-xl py-4 mb-4 block"
          >
            Start This Protocol
          </Link>

          {/* Secondary CTA */}
          <button
            onClick={onBrowseAll}
            className="w-full text-center text-tactical-green-bright hover:text-tactical-orange font-bold uppercase text-sm transition-colors py-3"
          >
            Browse All Protocols Instead →
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-tactical-darkgray border border-tactical-lightgray p-6 text-center">
          <p className="text-gray-400 text-sm">
            This recommendation is based on your diagnostic answers. You can always switch protocols later.
          </p>
        </div>
      </div>
    </div>
  );
}







