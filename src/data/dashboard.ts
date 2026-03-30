import { Lang } from './translations';

export const onboardingFunnel = [
  { stage: { en: 'Applications', es: 'Solicitudes' }, value: 15000, fill: '#276EF1' },
  { stage: { en: 'Verified', es: 'Verificados' }, value: 9800, fill: '#276EF1CC' },
  { stage: { en: 'First Delivery', es: 'Primera Entrega' }, value: 6200, fill: '#276EF1AA' },
  { stage: { en: '30-Day Active', es: 'Activos 30 Días' }, value: 4100, fill: '#276EF188' },
];

export const retentionData = [
  { period: { en: '30 days', es: '30 días' }, rate: 68 },
  { period: { en: '60 days', es: '60 días' }, rate: 52 },
  { period: { en: '90 days', es: '90 días' }, rate: 41 },
  { period: { en: '180 days', es: '180 días' }, rate: 29 },
  { period: { en: '365 days', es: '365 días' }, rate: 18 },
];

export const supportTickets = [
  { category: { en: 'Earnings/Payments', es: 'Ganancias/Pagos' }, count: 3200, fill: '#276EF1' },
  { category: { en: 'Account Issues', es: 'Problemas de Cuenta' }, count: 2100, fill: '#06C167' },
  { category: { en: 'App Technical', es: 'Técnico de App' }, count: 1800, fill: '#FF6937' },
  { category: { en: 'Tax/CFDI', es: 'Fiscal/CFDI' }, count: 1400, fill: '#F5A623' },
  { category: { en: 'Safety Incidents', es: 'Incidentes de Seguridad' }, count: 900, fill: '#E11D48' },
  { category: { en: 'Deactivation Appeals', es: 'Apelaciones de Desactivación' }, count: 750, fill: '#6B7280' },
];

export const churnReasons = [
  { reason: { en: 'Low earnings', es: 'Bajas ganancias' }, percentage: 34 },
  { reason: { en: 'Found other work', es: 'Encontró otro empleo' }, percentage: 22 },
  { reason: { en: 'Safety concerns', es: 'Preocupaciones de seguridad' }, percentage: 15 },
  { reason: { en: 'Tax/compliance confusion', es: 'Confusión fiscal/cumplimiento' }, percentage: 12 },
  { reason: { en: 'App frustration', es: 'Frustración con la app' }, percentage: 9 },
  { reason: { en: 'Vehicle issues', es: 'Problemas de vehículo' }, percentage: 8 },
];

export const kpiCards: { label: Record<Lang, string>; value: string; subtext: Record<Lang, string> }[] = [
  {
    label: { en: 'Avg. Onboarding Time', es: 'Tiempo Prom. de Incorporación' },
    value: '4.2',
    subtext: { en: 'days (target: <3)', es: 'días (objetivo: <3)' },
  },
  {
    label: { en: 'IMSS Compliance Rate', es: 'Tasa de Cumplimiento IMSS' },
    value: '73%',
    subtext: { en: 'of qualifying partners enrolled', es: 'de socios que califican inscritos' },
  },
  {
    label: { en: 'Partner NPS', es: 'NPS de Socios' },
    value: '+18',
    subtext: { en: 'score (industry avg: +12)', es: 'puntuación (promedio industria: +12)' },
  },
  {
    label: { en: 'Monthly Active Partners', es: 'Socios Activos Mensuales' },
    value: '42.3K',
    subtext: { en: 'Mexico City metro', es: 'zona metropolitana CDMX' },
  },
];
