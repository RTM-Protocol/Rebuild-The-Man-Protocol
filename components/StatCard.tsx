'use client';

import { MentalHealthStat } from '@/data/mentalHealthStats';
import { useEffect, useState } from 'react';

interface StatCardProps {
  stats: MentalHealthStat[];
  title?: string;
}

export default function StatCard({ stats, title = "You're Not Alone" }: StatCardProps) {
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    const savedShowStats = localStorage.getItem('show_stats');
    if (savedShowStats !== null) {
      setShowStats(savedShowStats === 'true');
    }
  }, []);

  if (!stats || stats.length === 0 || !showStats) return null;

  return (
    <div className="bg-tactical-darkgray border border-tactical-lightgray p-6">
      <h3 className="text-white font-bold uppercase text-sm mb-4 flex items-center gap-2">
        <span>📊</span>
        <span>{title}</span>
      </h3>
      
      <div className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-tactical-gray border-l-4 border-tactical-orange/50 p-4">
            <p className="text-white font-bold text-lg mb-3 leading-relaxed">
              {stat.statistic}
            </p>
            
            <p className="text-gray-300 leading-relaxed mb-3">
              {stat.context}
            </p>
            
            <div className="text-gray-500 text-xs font-mono">
              Source: {stat.source} ({stat.year})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

