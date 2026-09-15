import React, { useState } from 'react';
import { 
  NeuCard, 
  NeuButton, 
  NeuInput, 
  NeuToggle, 
  NeuIconWell, 
  NeuMetricCard 
} from './index';
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  Percent, 
  DollarSign, 
  Hotel, 
  Sparkles, 
  ArrowRight,
  Zap,
  RotateCcw
} from 'lucide-react';

/**
 * NeuBookingCalculator - Interactive Tactile ROI & Direct Booking Engine
 * 
 * Showcases the complete Neumorphism (Soft UI) design system:
 * - Surface molded from `#E0E5EC`
 * - Dual opposing RGBA shadows
 * - Deep inset carved input wells
 * - Tactile toggles and interactive calculation physics
 * - Nested depth (Extruded Container -> Inset Wells -> Extruded Controls)
 * - WCAG AA/AAA compliant typography & contrast
 */
export const NeuBookingCalculator = ({ onOpenConsultation }) => {
  // Calculator States
  const [rooms, setRooms] = useState('45');
  const [adr, setAdr] = useState('220'); // Average Daily Rate ($)
  const [occupancy, setOccupancy] = useState('72'); // Percentage
  const [otaShare, setOtaShare] = useState('65'); // Current OTA %
  const [includeMetaAds, setIncludeMetaAds] = useState(true);
  const [includeVipLoyalty, setIncludeVipLoyalty] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState('custom');

  // Math: Calculate Annual Direct Booking Potential & Commission Recaptured
  const numRooms = Math.max(1, parseInt(rooms) || 1);
  const numAdr = Math.max(10, parseFloat(adr) || 10);
  const numOccupancy = Math.min(100, Math.max(10, parseFloat(occupancy) || 10)) / 100;
  const numOtaShare = Math.min(100, Math.max(0, parseFloat(otaShare) || 0)) / 100;

  // Annual total room nights sold
  const annualRoomNights = numRooms * 365 * numOccupancy;
  const grossRoomRevenue = annualRoomNights * numAdr;
  
  // Average OTA commission ~ 18%
  const otaCommissionRate = 0.18;
  const currentOtaRevenue = grossRoomRevenue * numOtaShare;
  const currentOtaCommissionsPaid = currentOtaRevenue * otaCommissionRate;

  // JJ Elevate typical direct booking lift: 35% to 55% reduction in OTA dependency
  const efficiencyMultiplier = (includeMetaAds ? 0.05 : 0) + (includeVipLoyalty ? 0.08 : 0) + 0.35;
  const recapturedOtaShare = numOtaShare * efficiencyMultiplier;
  const annualSavings = grossRoomRevenue * recapturedOtaShare * otaCommissionRate;
  const projectedDirectRevenueBoost = grossRoomRevenue * recapturedOtaShare;
  const estimatedRoas = includeMetaAds ? '9.4x' : '7.8x';

  const handleReset = () => {
    setRooms('45');
    setAdr('220');
    setOccupancy('72');
    setOtaShare('65');
    setIncludeMetaAds(true);
    setIncludeVipLoyalty(true);
    setSelectedPreset('custom');
  };

  const applyPreset = (presetName, r, a, o, s) => {
    setSelectedPreset(presetName);
    setRooms(r);
    setAdr(a);
    setOccupancy(o);
    setOtaShare(s);
  };

  return (
    <section 
      id="neu-roi-calculator" 
      className="py-24 sm:py-32 bg-[#E0E5EC] text-[#3D4852] transition-colors duration-500 overflow-hidden relative selection:bg-[#6C63FF]/20 selection:text-[#3D4852]"
    >
      {/* Tactile Ambient Concentric Physics Rings (Background Art) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full shadow-neu-pressed pointer-events-none opacity-40 animate-neu-float" />
      <div className="absolute -bottom-36 -right-36 w-[30rem] h-[30rem] rounded-full shadow-neu-pressed pointer-events-none opacity-40 animate-neu-float" style={{ animationDelay: '-1.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0E5EC] shadow-neu-flat text-xs font-bold text-[#6C63FF] uppercase tracking-widest font-display">
            <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
            <span>Neumorphic Growth Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#3D4852] tracking-tight font-display">
            Direct Booking & Commission Recapture Engine
          </h2>

          <p className="text-base sm:text-lg text-[#6B7280] font-body leading-relaxed">
            Molded from our tactile Soft UI design system. Adjust your hotel or luxury resort metrics in real-time to compute potential commission recaptured from OTAs.
          </p>
        </div>

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Interactive Tactile Control Console (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            <NeuCard className="p-6 sm:p-10 space-y-8">
              <div className="flex items-center justify-between border-b border-transparent pb-2">
                <div className="flex items-center gap-3">
                  <NeuIconWell size="md" depth="deep">
                    <Calculator className="w-5 h-5 text-[#6C63FF]" />
                  </NeuIconWell>
                  <div>
                    <h3 className="text-lg font-bold text-[#3D4852] font-display">Property Parameters</h3>
                    <p className="text-xs text-[#6B7280] font-body">Direct inputs with deep carved inset feedback</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset parameters"
                  className="p-2.5 rounded-xl bg-[#E0E5EC] text-[#6B7280] hover:text-[#6C63FF] shadow-neu-sm hover:shadow-neu-flat active:shadow-neu-pressed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* 2x2 Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <NeuInput
                  label="Total Key Count / Rooms"
                  type="number"
                  value={rooms}
                  onChange={(e) => { setRooms(e.target.value); setSelectedPreset('custom'); }}
                  placeholder="e.g. 45"
                  icon={Hotel}
                />

                <NeuInput
                  label="Average Daily Rate ($ ADR)"
                  type="number"
                  value={adr}
                  onChange={(e) => { setAdr(e.target.value); setSelectedPreset('custom'); }}
                  placeholder="e.g. 220"
                  icon={DollarSign}
                />

                <NeuInput
                  label="Average Occupancy (%)"
                  type="number"
                  value={occupancy}
                  onChange={(e) => { setOccupancy(e.target.value); setSelectedPreset('custom'); }}
                  placeholder="e.g. 72"
                  icon={Percent}
                />

                <NeuInput
                  label="Current OTA Share (%)"
                  type="number"
                  value={otaShare}
                  onChange={(e) => { setOtaShare(e.target.value); setSelectedPreset('custom'); }}
                  placeholder="e.g. 65"
                  icon={TrendingUp}
                />
              </div>

              {/* Tactile Toggles for Growth Levers */}
              <div className="space-y-4 pt-4 border-t border-transparent">
                <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider block pl-1">
                  Active Growth Accelerator Modules
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#E0E5EC] shadow-neu-inset-sm flex items-center justify-between">
                    <NeuToggle
                      checked={includeMetaAds}
                      onChange={setIncludeMetaAds}
                      label="Meta Hotel Ads"
                      description="Google Hotel Center sync"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E0E5EC] shadow-neu-inset-sm flex items-center justify-between">
                    <NeuToggle
                      checked={includeVipLoyalty}
                      onChange={setIncludeVipLoyalty}
                      label="VIP Direct Funnels"
                      description="Zero-friction checkout"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Preset Buttons with Active State Depth */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-xs font-semibold text-[#6B7280]">Presets:</span>
                
                <button
                  type="button"
                  onClick={() => applyPreset('boutique', '28', '340', '80', '60')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedPreset === 'boutique'
                      ? 'bg-[#E0E5EC] text-[#6C63FF] shadow-neu-pressed font-bold'
                      : 'bg-[#E0E5EC] text-[#3D4852] shadow-neu-sm hover:shadow-neu-flat active:shadow-neu-pressed'
                  }`}
                >
                  Boutique Luxury (28 Keys)
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('resort', '85', '195', '74', '70')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedPreset === 'resort'
                      ? 'bg-[#E0E5EC] text-[#6C63FF] shadow-neu-pressed font-bold'
                      : 'bg-[#E0E5EC] text-[#3D4852] shadow-neu-sm hover:shadow-neu-flat active:shadow-neu-pressed'
                  }`}
                >
                  Resort & Spa (85 Keys)
                </button>

                <button
                  type="button"
                  onClick={() => applyPreset('heritage', '160', '165', '76', '65')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedPreset === 'heritage'
                      ? 'bg-[#E0E5EC] text-[#6C63FF] shadow-neu-pressed font-bold'
                      : 'bg-[#E0E5EC] text-[#3D4852] shadow-neu-sm hover:shadow-neu-flat active:shadow-neu-pressed'
                  }`}
                >
                  Heritage Hotel (160 Keys)
                </button>
              </div>
            </NeuCard>
          </div>

          {/* Right Column: Computed Soft UI KPI Dashboard (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Highlight Metric: Annual OTA Commission Saved */}
            <NeuCard className="p-8 sm:p-10 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E0E5EC] shadow-neu-inset-sm text-xs font-bold text-[#38B2AC] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#38B2AC]" />
                  <span>Annual Recovery</span>
                </div>
                <NeuIconWell size="sm" depth="deep">
                  <Zap className="w-4 h-4 text-[#6C63FF]" />
                </NeuIconWell>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] font-display block">
                  Projected OTA Commissions Recaptured
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#3D4852] tracking-tight font-display">
                  ${Math.round(annualSavings).toLocaleString()}
                  <span className="text-lg font-medium text-[#6B7280] ml-1">/ year</span>
                </div>
                <p className="text-xs text-[#6B7280] font-body pt-1">
                  Profits directly returned to your bottom line instead of OTAs.
                </p>
              </div>

              {/* Inset Stats Well */}
              <div className="p-5 rounded-2xl bg-[#E0E5EC] shadow-neu-deep space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280] font-medium">Est. Direct Revenue Boost</span>
                  <span className="font-bold text-[#3D4852] font-display">
                    +${Math.round(projectedDirectRevenueBoost).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280] font-medium">Anticipated Blended ROAS</span>
                  <span className="font-bold text-[#38B2AC] font-display">{estimatedRoas}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B7280] font-medium">Current Commissions Paid to OTAs</span>
                  <span className="font-bold text-[#FF4D79] font-display">
                    ${Math.round(currentOtaCommissionsPaid).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <NeuButton
                  variant="primary"
                  size="lg"
                  className="w-full justify-between group"
                  onClick={onOpenConsultation}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Claim Direct Booking Audit
                </NeuButton>

                <NeuButton
                  variant="clay"
                  size="md"
                  className="w-full"
                  onClick={onOpenConsultation}
                >
                  Download Custom Strategy PDF
                </NeuButton>
              </div>
            </NeuCard>

            {/* Supplementary KPI Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <NeuMetricCard
                title="Direct Booking Lift"
                value={`+${Math.round(recapturedOtaShare * 100)}%`}
                change="3.2x vs benchmark"
                changeType="positive"
                period="within 90 days"
                icon={TrendingUp}
              />

              <NeuMetricCard
                title="Target ROAS"
                value={estimatedRoas}
                change="Guaranteed"
                changeType="accent"
                period="Omnichannel"
                icon={Zap}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default NeuBookingCalculator;
