import React from 'react';
import { NeuCard } from './NeuCard';
import { NeuIconWell } from './NeuIconWell';
import { TrendingUp } from 'lucide-react';

/**
 * NeuMetricCard - Tactile KPI Metric Display
 * 
 * Features:
 * - Nested Depth Architecture: Extruded Card -> Inset Well -> Tactile Icon
 * - Monochromatic clay backdrop with teal & violet accents
 * - 32px hyper-rounded container
 * - Responsive, interactive hover feedback
 */
export const NeuMetricCard = ({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'neutral' | 'accent'
  period = 'vs last month',
  icon: Icon,
  badgeText,
  onClick,
  className = '',
}) => {
  const isPositive = changeType === 'positive';
  const badgeColor = isPositive 
    ? 'text-[#38B2AC]' 
    : changeType === 'accent' 
      ? 'text-[#6C63FF]' 
      : 'text-[#6B7280]';

  return (
    <NeuCard
      onClick={onClick}
      className={`p-6 sm:p-7 flex flex-col justify-between gap-5 relative overflow-hidden group ${className}`}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-4">
        {Icon && (
          <NeuIconWell size="md" depth="deep" className="group-hover:scale-105">
            <Icon className="w-5 h-5 text-[#6C63FF] transition-transform duration-300 group-hover:rotate-6" />
          </NeuIconWell>
        )}

        {badgeText && (
          <div className="px-3 py-1 rounded-full bg-[#E0E5EC] shadow-neu-inset-sm text-xs font-semibold text-[#6B7280] uppercase tracking-wider">
            {badgeText}
          </div>
        )}
      </div>

      {/* Main Metric Value */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-display block">
          {title}
        </span>
        <div className="text-3xl sm:text-4xl font-extrabold text-[#3D4852] tracking-tight font-display">
          {value}
        </div>
      </div>

      {/* Bottom Trend Pill */}
      {change && (
        <div className="pt-2 flex items-center gap-2 border-t border-transparent">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#E0E5EC] shadow-neu-inset-sm text-xs font-bold font-body">
            <TrendingUp className={`w-3.5 h-3.5 ${badgeColor}`} />
            <span className={badgeColor}>{change}</span>
          </div>
          <span className="text-xs text-[#6B7280] font-body">
            {period}
          </span>
        </div>
      )}
    </NeuCard>
  );
};

export default NeuMetricCard;
