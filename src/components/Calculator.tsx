'use client';

import { useState, useMemo } from 'react';
import calculator_params from '@/data/calculator_params.json';

type VehicleType = 'car' | 'motorcycle' | 'bicycle';

const vehicles: { type: VehicleType; label: string; icon: string }[] = [
  { type: 'car', label: 'Car', icon: '🚗' },
  { type: 'motorcycle', label: 'Motorcycle', icon: '🛵' },
  { type: 'bicycle', label: 'Bicycle', icon: '🚲' },
];

const fmt = new Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const fmtPct = (v: number) => `${v.toFixed(1)}%`;

export function Calculator() {
  const [vehicleType, setVehicleType] = useState<VehicleType>('motorcycle');
  const [weeklyHours, setWeeklyHours] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(100);
  const [hasRFC, setHasRFC] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const params = calculator_params;

  const computed = useMemo(() => {
    const grossMonthly = weeklyHours * hourlyRate * params.weeks_per_month;
    const exclusionRate = params.exclusion_rates[vehicleType];
    const taxableIncome = grossMonthly * (1 - exclusionRate);
    const isrRate = hasRFC ? params.isr.with_rfc : params.isr.without_rfc;
    const isrDeduction = grossMonthly * isrRate;
    const threshold = params.income_thresholds_mxn[vehicleType];
    const crossesThreshold = taxableIncome >= threshold;
    const imssContrib = crossesThreshold
      ? taxableIncome * params.imss_worker_contribution
      : 0;
    const infonavitEmployer = crossesThreshold
      ? taxableIncome * params.infonavit_employer
      : 0;
    const totalDeductions = isrDeduction + imssContrib;
    const netIncome = grossMonthly - totalDeductions;
    const effectiveTaxRate = grossMonthly > 0 ? totalDeductions / grossMonthly : 0;
    const preReformTakeHome = grossMonthly;
    const incomeChange = netIncome - preReformTakeHome;
    const incomeChangePct =
      preReformTakeHome > 0 ? (incomeChange / preReformTakeHome) * 100 : 0;

    return {
      grossMonthly,
      exclusionRate,
      taxableIncome,
      isrRate,
      isrDeduction,
      threshold,
      crossesThreshold,
      imssContrib,
      infonavitEmployer,
      totalDeductions,
      netIncome,
      effectiveTaxRate,
      preReformTakeHome,
      incomeChange,
      incomeChangePct,
    };
  }, [vehicleType, weeklyHours, hourlyRate, hasRFC, params]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* --- INPUTS --- */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6 shadow-sm">
        <h2 className="text-lg font-semibold text-black">Configure Scenario</h2>

        {/* Vehicle type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-600">
            Vehicle Type
          </label>
          <div className="flex gap-3">
            {vehicles.map((v) => (
              <button
                key={v.type}
                onClick={() => setVehicleType(v.type)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
                  vehicleType === v.type
                    ? 'bg-black text-white border-black shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="text-xl block mb-1">{v.icon}</span>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly hours */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium text-gray-600">
              Weekly Hours
            </label>
            <span className="text-sm font-semibold text-black tabular-nums">
              {weeklyHours}h / week
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={60}
            step={5}
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#276EF1]"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>10h</span>
            <span>60h</span>
          </div>
        </div>

        {/* Gross hourly rate */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium text-gray-600">
              Gross Hourly Rate
            </label>
            <span className="text-sm font-semibold text-black tabular-nums">
              ${hourlyRate} MXN/hr
            </span>
          </div>
          <input
            type="range"
            min={50}
            max={200}
            step={10}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#276EF1]"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>$50</span>
            <span>$200</span>
          </div>
        </div>

        {/* Has RFC toggle */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Has RFC (Tax ID)
              </label>
              <p className="text-xs text-gray-400 mt-0.5">
                RFC reduces ISR withholding from 20% to 2.5%
              </p>
            </div>
            <button
              onClick={() => setHasRFC(!hasRFC)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 cursor-pointer ${
                hasRFC ? 'bg-[#276EF1]' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={hasRFC}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                  hasRFC ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* --- METRIC CARDS --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Gross Monthly"
          value={`$${fmt.format(computed.grossMonthly)} MXN`}
        />
        <MetricCard
          label="Net Monthly"
          value={`$${fmt.format(computed.netIncome)} MXN`}
          valueColor={
            computed.crossesThreshold ? 'text-green-600' : 'text-amber-600'
          }
        />
        <MetricCard
          label="Effective Rate"
          value={fmtPct(computed.effectiveTaxRate * 100)}
          subtitle="of gross → deductions"
        />
        <MetricCard
          label="Income Change"
          value={fmtPct(computed.incomeChangePct)}
          valueColor="text-red-600"
          subtitle="vs. pre-reform (informal)"
        />
      </div>

      {/* --- THRESHOLD STATUS --- */}
      {computed.crossesThreshold ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-semibold text-sm">
              ✓ Formal employment status — Full IMSS + INFONAVIT benefits
            </span>
          </div>
          <ul className="text-sm text-green-800 space-y-1.5 ml-1">
            <li>
              <strong>IMSS covers:</strong> healthcare, maternity, disability,
              retirement, childcare
            </li>
            <li>
              <strong>INFONAVIT:</strong> employer contributes $
              {fmt.format(computed.infonavitEmployer)} MXN/month to your housing
              fund
            </li>
            <li>
              <strong>Additional rights:</strong> aguinaldo, vacation,
              profit-sharing
            </li>
          </ul>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-700 font-semibold text-sm">
              ⚠ Below formal threshold — Occupational risk coverage only
            </span>
          </div>
          <div className="text-sm text-amber-800 space-y-1">
            <p>
              Taxable income:{' '}
              <strong>${fmt.format(computed.taxableIncome)} MXN</strong> vs.
              threshold:{' '}
              <strong>${fmt.format(computed.threshold)} MXN</strong>
            </p>
            <p>
              Need{' '}
              <strong>
                ${fmt.format(computed.threshold - computed.taxableIncome)} MXN
              </strong>{' '}
              more in taxable income to qualify for full benefits.
            </p>
          </div>
        </div>
      )}

      {/* --- DEDUCTIONS BREAKDOWN --- */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full flex items-center justify-between p-5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-semibold text-black">
            Deductions Breakdown
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              showBreakdown ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showBreakdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
            <BreakdownRow
              label={`ISR withholding (${fmtPct(computed.isrRate * 100)})`}
              value={`-$${fmt.format(computed.isrDeduction)}`}
            />
            {computed.crossesThreshold && (
              <BreakdownRow
                label="IMSS worker contribution (2.5%)"
                value={`-$${fmt.format(computed.imssContrib)}`}
              />
            )}
            <div className="border-t border-gray-200 pt-3">
              <BreakdownRow
                label="Total deductions"
                value={`-$${fmt.format(computed.totalDeductions)}`}
                bold
              />
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-800">
              <strong>Note:</strong> INFONAVIT ($
              {fmt.format(computed.infonavitEmployer)} MXN) is paid by the
              employer, not deducted from your earnings.
            </div>
          </div>
        </div>
      </div>

      {/* --- METHODOLOGY --- */}
      <p className="text-xs text-gray-400 leading-relaxed px-1">
        Calculations use official 2026 rates from DOF and SAT. ISR applies to
        gross income (Art. 113-A LISR). Exclusion rates from DOF Dec 2025
        revision.
      </p>
    </div>
  );
}

/* ---- Sub-components ---- */

function MetricCard({
  label,
  value,
  valueColor = 'text-black',
  subtitle,
}: {
  label: string;
  value: string;
  valueColor?: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <p
        className={`text-xl font-bold mt-1 tabular-nums transition-all duration-300 ${valueColor}`}
      >
        {value}
      </p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className={bold ? 'font-semibold text-black' : 'text-gray-600'}>
        {label}
      </span>
      <span
        className={`tabular-nums ${bold ? 'font-semibold text-black' : 'text-gray-800'}`}
      >
        {value}
      </span>
    </div>
  );
}
