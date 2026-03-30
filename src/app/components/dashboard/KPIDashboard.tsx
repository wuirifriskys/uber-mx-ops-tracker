'use client';

import { useState, useEffect } from 'react';
import { useLang } from '../LanguageContext';
import { translations } from '../../../data/translations';
import {
  onboardingFunnel,
  retentionData,
  supportTickets,
  churnReasons,
  kpiCards,
} from '../../../data/dashboard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const CHURN_COLORS = ['#276EF1', '#06C167', '#FF6937', '#F5A623', '#E11D48', '#6B7280'];

export default function KPIDashboard() {
  const { lang } = useLang();
  const t = translations.dashboard;
  const [mounted, setMounted] = useState(false);
  const tooltipStyle = { borderRadius: '8px', border: '1px solid #e5e7eb' };

  useEffect(() => {
    setMounted(true);
  }, []);

  const funnelData = onboardingFunnel.map((d) => ({
    name: d.stage[lang],
    value: d.value,
    fill: d.fill,
  }));

  const retData = retentionData.map((d) => ({
    name: d.period[lang],
    rate: d.rate,
  }));

  const ticketData = supportTickets.map((d) => ({
    name: d.category[lang],
    count: d.count,
    fill: d.fill,
  }));

  const churnData = churnReasons.map((d, i) => ({
    name: d.reason[lang],
    value: d.percentage,
    fill: CHURN_COLORS[i % CHURN_COLORS.length],
  }));

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900">{t.title[lang]}</h2>

      {/* Disclaimer */}
      <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
        <p className="text-sm text-amber-800">{t.disclaimer[lang]}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-medium text-gray-500">{card.label[lang]}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{card.value}</p>
            <p className="mt-1 text-xs text-gray-400">{card.subtext[lang]}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      {mounted && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Onboarding Funnel */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t.onboardingFunnel[lang]}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={funnelData}
                layout="vertical"
                margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) => Number(value).toLocaleString()}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Retention Rate */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t.retentionRate[lang]}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={retData}
                margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(value) => `${Number(value)}%`}
                  contentStyle={tooltipStyle}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#276EF1"
                  strokeWidth={2}
                  dot={{ r: 5, fill: '#276EF1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Support Tickets */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t.supportTickets[lang]}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={ticketData}
                margin={{ top: 0, right: 20, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => Number(value).toLocaleString()}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {ticketData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Churn Reasons */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {t.churnReasons[lang]}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={churnData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {churnData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${Number(value)}%`}
                  contentStyle={tooltipStyle}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '12px', lineHeight: '20px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
