export type Lang = 'en' | 'es';

export const translations = {
  nav: {
    lifecycle: { en: 'Partner Lifecycle', es: 'Ciclo del Socio' },
    calendar: { en: 'Compliance Calendar', es: 'Calendario de Cumplimiento' },
    dashboard: { en: 'KPI Dashboard', es: 'Panel de KPIs' },
  },
  header: {
    title: {
      en: 'Uber Eats Mexico — Delivery Partner Operations',
      es: 'Uber Eats México — Operaciones de Socios Repartidores',
    },
    subtitle: {
      en: 'Interactive Operations Tracker',
      es: 'Rastreador Interactivo de Operaciones',
    },
  },
  about: {
    title: { en: 'About This Project', es: 'Acerca de Este Proyecto' },
    body: {
      en: 'This interactive web application was built to demonstrate understanding of Uber Mexico\'s delivery partner operations challenges — from partner lifecycle management and Mexican regulatory compliance to operational KPI tracking. It showcases the kind of data-driven, cross-functional operational thinking required for the Strategy & Operations Manager role.',
      es: 'Esta aplicación web interactiva fue construida para demostrar comprensión de los desafíos operativos de socios repartidores de Uber México — desde la gestión del ciclo de vida del socio y el cumplimiento regulatorio mexicano hasta el seguimiento de KPIs operativos. Muestra el pensamiento operativo basado en datos y multifuncional requerido para el rol de Gerente de Estrategia y Operaciones.',
    },
    builtBy: {
      en: 'Built by Alex Friedlander',
      es: 'Construido por Alex Friedlander',
    },
  },
  lifecycle: {
    title: { en: 'Partner Lifecycle Workflow', es: 'Flujo del Ciclo de Vida del Socio' },
    action: { en: 'Operational Action', es: 'Acción Operativa' },
    teams: { en: 'Teams Involved', es: 'Equipos Involucrados' },
    friction: { en: 'Friction Points', es: 'Puntos de Fricción' },
    time: { en: 'Estimated Time', es: 'Tiempo Estimado' },
    clickToExpand: { en: 'Click any stage to see details', es: 'Haz clic en cualquier etapa para ver detalles' },
  },
  calendar: {
    title: { en: '2026 Regulatory Compliance Calendar', es: 'Calendario de Cumplimiento Regulatorio 2026' },
    what: { en: 'What', es: 'Qué' },
    when: { en: 'When', es: 'Cuándo' },
    operationalAction: { en: 'Operational Action Required', es: 'Acción Operativa Requerida' },
    riskIfMissed: { en: 'Risk if Missed', es: 'Riesgo si se Incumple' },
    agency: { en: 'Agency', es: 'Agencia' },
  },
  dashboard: {
    title: { en: 'Operations KPI Dashboard', es: 'Panel de KPIs Operativos' },
    disclaimer: {
      en: 'Illustrative data — not real Uber metrics',
      es: 'Datos ilustrativos — no son métricas reales de Uber',
    },
    onboardingFunnel: { en: 'Onboarding Funnel', es: 'Embudo de Incorporación' },
    retentionRate: { en: 'Retention Rate', es: 'Tasa de Retención' },
    supportTickets: { en: 'Support Tickets by Category', es: 'Tickets de Soporte por Categoría' },
    churnReasons: { en: 'Churn Reasons', es: 'Razones de Deserción' },
    onboardingTime: { en: 'Avg. Onboarding Time', es: 'Tiempo Prom. de Incorporación' },
    complianceRate: { en: 'IMSS Compliance Rate', es: 'Tasa de Cumplimiento IMSS' },
    nps: { en: 'Partner NPS', es: 'NPS de Socios' },
    days: { en: 'days', es: 'días' },
  },
} as const;