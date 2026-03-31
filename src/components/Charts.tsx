'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

const UBER_BLUE = '#276EF1';
const DIDI_GRAY = '#6B7280';
const UBER_ORANGE = '#FF6937';
const UBER_GREEN = '#06C167';

const tooltipStyle = {
  contentStyle: { borderRadius: '8px', border: '1px solid #e5e7eb' },
};

const gridProps = {
  strokeDasharray: '3 3',
  stroke: '#f0f0f0',
};

type MonthlyRatingsProps = {
  data: Array<{ month: string; uber_driver: number; didi_driver?: number }>;
};

type KeywordComparisonProps = {
  data: Array<{ word: string; uber: number; didi: number }>;
};

type PilotEnrollmentProps = {
  data: Array<{ month: string; qualifying: number }>;
};

type BreakEvenChartProps = {
  data: Array<{ hours: number; car: number; motorcycle: number; bicycle: number }>;
  thresholds: { car: number; motorcycle: number; bicycle: number };
};

type CompetitiveRatingsProps = {
  data: Array<{ platform: string; avg_rating: number; one_star_pct: number }>;
};

export const Charts = {
  MonthlyRatings: function MonthlyRatings({ data }: MonthlyRatingsProps) {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis domain={[1, 5]} fontSize={12} />
          <Tooltip {...tooltipStyle} />
          <Legend fontSize={12} />
          <ReferenceLine
            x="Jan 2026"
            stroke="#EF4444"
            strokeDasharray="4 4"
            label={{ value: 'Enforcement begins', position: 'top', fontSize: 12, fill: '#EF4444' }}
          />
          <Line
            type="monotone"
            dataKey="uber_driver"
            name="Uber Driver"
            stroke={UBER_BLUE}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="didi_driver"
            name="DiDi Driver"
            stroke={DIDI_GRAY}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  },

  KeywordComparison: function KeywordComparison({ data }: KeywordComparisonProps) {
    const top10 = data.slice(0, 10);
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={top10} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
          <CartesianGrid {...gridProps} />
          <XAxis type="number" fontSize={12} />
          <YAxis dataKey="word" type="category" fontSize={12} width={70} />
          <Tooltip {...tooltipStyle} />
          <Legend />
          <Bar dataKey="uber" name="Uber Driver" fill={UBER_BLUE} barSize={12} />
          <Bar dataKey="didi" name="DiDi Driver" fill={DIDI_GRAY} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    );
  },

  PilotEnrollment: function PilotEnrollment({ data }: PilotEnrollmentProps) {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" fontSize={12} />
          <YAxis
            fontSize={12}
            tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value) => [Number(value).toLocaleString(), 'Qualifying']}
          />
          <Bar dataKey="qualifying" name="Qualifying Drivers">
            {data.map((entry) => (
              <Cell
                key={entry.month}
                fill={entry.month === 'Jan 2026' ? UBER_ORANGE : UBER_BLUE}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  },

  BreakEvenChart: function BreakEvenChart({ data, thresholds }: BreakEvenChartProps) {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="hours" fontSize={12} label={{ value: 'Weekly Hours', position: 'insideBottom', offset: -5, fontSize: 12 }} />
          <YAxis fontSize={12} tickFormatter={(value: number) => `$${value.toLocaleString()}`} />
          <Tooltip
            {...tooltipStyle}
            formatter={(value) => [`$${Number(value).toLocaleString()} MXN`, undefined]}
            labelFormatter={(label) => `${label} hrs/week`}
          />
          <Legend />
          <ReferenceLine
            y={thresholds.car}
            stroke="#000"
            strokeDasharray="6 4"
            label={{ value: 'Car threshold', position: 'right', fontSize: 10, fill: '#000' }}
          />
          <ReferenceLine
            y={thresholds.motorcycle}
            stroke={UBER_BLUE}
            strokeDasharray="6 4"
            label={{ value: 'Moto threshold', position: 'right', fontSize: 10, fill: UBER_BLUE }}
          />
          <ReferenceLine
            y={thresholds.bicycle}
            stroke={UBER_GREEN}
            strokeDasharray="6 4"
            label={{ value: 'Bike threshold', position: 'right', fontSize: 10, fill: UBER_GREEN }}
          />
          <Line
            type="monotone"
            dataKey="car"
            name="Car"
            stroke="#000"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="motorcycle"
            name="Motorcycle"
            stroke={UBER_BLUE}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="bicycle"
            name="Bicycle"
            stroke={UBER_GREEN}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  },

  CompetitiveRatings: function CompetitiveRatings({ data }: CompetitiveRatingsProps) {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="platform" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip {...tooltipStyle} />
          <Legend />
          <Bar dataKey="avg_rating" name="Avg Rating" fill={UBER_BLUE} barSize={20} />
          <Bar dataKey="one_star_pct" name="1-Star %" fill={UBER_ORANGE} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    );
  },
};
