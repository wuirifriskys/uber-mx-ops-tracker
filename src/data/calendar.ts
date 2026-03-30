import { Lang } from './translations';

export interface ComplianceEvent {
  id: string;
  date: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  agency: string;
  action: Record<Lang, string>;
  risk: Record<Lang, string>;
  category: 'imss' | 'infonavit' | 'sat' | 'labor';
}

export const complianceEvents: ComplianceEvent[] = [
  {
    id: 'enforcement-start',
    date: '2026-01-01',
    title: { en: 'Full Mandatory Enforcement Begins', es: 'Inicio de Cumplimiento Obligatorio Total' },
    description: {
      en: 'Chapter XVIII-BIS of LFT enters full enforcement after pilot. All qualifying platform workers must have formal employment rights.',
      es: 'Capítulo XVIII-BIS de la LFT entra en cumplimiento total después del piloto. Todos los trabajadores de plataforma que califican deben tener derechos laborales formales.',
    },
    agency: 'STPS',
    action: {
      en: 'Ensure all workers earning ≥1 minimum salary/month are classified as digital platform workers with full labor rights.',
      es: 'Asegurar que todos los trabajadores que ganan ≥1 salario mínimo/mes estén clasificados como trabajadores de plataformas digitales con derechos laborales plenos.',
    },
    risk: {
      en: 'Penalties up to MXN 25,000 × UMA per worker. Potential class-action lawsuits and STPS enforcement actions.',
      es: 'Multas de hasta MXN 25,000 × UMA por trabajador. Posibles demandas colectivas y acciones de cumplimiento de la STPS.',
    },
    category: 'labor',
  },
  {
    id: 'isr-iva-rates',
    date: '2026-01-01',
    title: { en: 'New ISR/IVA Withholding Rates', es: 'Nuevas Tasas de Retención ISR/IVA' },
    description: {
      en: 'ISR withholding increases to 2.5% (from 1%) for partners with RFC. 20% for those without RFC. IVA at 8% (50% of 16%).',
      es: 'Retención de ISR aumenta a 2.5% (desde 1%) para socios con RFC. 20% para los que no tienen RFC. IVA al 8% (50% del 16%).',
    },
    agency: 'SAT',
    action: {
      en: 'Update payroll systems with new withholding rates. Communicate changes to partners. Update CFDI generation templates.',
      es: 'Actualizar sistemas de nómina con nuevas tasas de retención. Comunicar cambios a socios. Actualizar plantillas de generación de CFDI.',
    },
    risk: {
      en: 'Incorrect withholding = SAT penalties + partner confusion. Partners without RFC face 20% withholding — drives RFC registration urgency.',
      es: 'Retención incorrecta = multas del SAT + confusión de socios. Socios sin RFC enfrentan retención del 20% — impulsa urgencia de registro de RFC.',
    },
    category: 'sat',
  },
  {
    id: 'imss-q1',
    date: '2026-03-17',
    title: { en: 'IMSS/INFONAVIT Bimonthly Payment (Jan-Feb)', es: 'Pago Bimestral IMSS/INFONAVIT (Ene-Feb)' },
    description: {
      en: 'Bimonthly employer contributions to IMSS (24-38% of salary) and INFONAVIT (5% housing fund) due for Jan-Feb period.',
      es: 'Contribuciones patronales bimestrales al IMSS (24-38% del salario) e INFONAVIT (5% fondo de vivienda) correspondientes al período Ene-Feb.',
    },
    agency: 'IMSS / INFONAVIT',
    action: {
      en: 'Calculate contributions for all enrolled partners. Submit payment via SUA (Sistema Único de Autodeterminación) before deadline.',
      es: 'Calcular contribuciones para todos los socios inscritos. Enviar pago vía SUA (Sistema Único de Autodeterminación) antes de la fecha límite.',
    },
    risk: {
      en: 'Late payment surcharges (recargos) of 1.47% monthly. IMSS can suspend partner healthcare coverage.',
      es: 'Recargos por pago tardío de 1.47% mensual. IMSS puede suspender cobertura de salud del socio.',
    },
    category: 'imss',
  },
  {
    id: 'sat-data-access',
    date: '2026-04-01',
    title: { en: 'SAT Real-Time Data Access Mandate', es: 'Mandato de Acceso a Datos en Tiempo Real del SAT' },
    description: {
      en: 'Platforms must provide SAT real-time access to operational data. New transparency requirement under 2026 fiscal reform.',
      es: 'Las plataformas deben proporcionar al SAT acceso en tiempo real a datos operativos. Nuevo requisito de transparencia bajo reforma fiscal 2026.',
    },
    agency: 'SAT',
    action: {
      en: 'Implement API endpoints or data feeds for SAT. Ensure partner transaction data is structured per SAT specifications.',
      es: 'Implementar endpoints API o feeds de datos para el SAT. Asegurar que los datos de transacciones de socios estén estructurados según especificaciones del SAT.',
    },
    risk: {
      en: 'Non-compliance with data access mandate = potential platform suspension + SAT audit trigger.',
      es: 'Incumplimiento del mandato de acceso a datos = potencial suspensión de plataforma + activación de auditoría del SAT.',
    },
    category: 'sat',
  },
  {
    id: 'sat-annual',
    date: '2026-04-30',
    title: { en: 'Annual Tax Declaration Deadline (FY2025)', es: 'Fecha Límite de Declaración Anual (Ejercicio 2025)' },
    description: {
      en: 'Partners must file individual annual tax returns for FY2025. Platform must issue annual CFDI de retenciones.',
      es: 'Los socios deben presentar declaración anual individual del ejercicio 2025. La plataforma debe emitir CFDI de retenciones anual.',
    },
    agency: 'SAT',
    action: {
      en: 'Issue all annual CFDIs by March 15. Launch partner education campaign on tax filing. Staff up support for April volume.',
      es: 'Emitir todos los CFDIs anuales antes del 15 de marzo. Lanzar campaña educativa para socios sobre declaración fiscal. Reforzar soporte para volumen de abril.',
    },
    risk: {
      en: 'Partner penalties for non-filing cascade to platform reputation. High support ticket volume in April without preparation.',
      es: 'Multas a socios por no declarar impactan reputación de la plataforma. Alto volumen de tickets de soporte en abril sin preparación.',
    },
    category: 'sat',
  },
  {
    id: 'sat-data-submission',
    date: '2026-04-30',
    title: { en: 'SAT Data Access Submission Deadline', es: 'Fecha Límite de Envío de Acceso a Datos del SAT' },
    description: {
      en: 'Formal written request with technical access details must be submitted to SAT.',
      es: 'Solicitud formal por escrito con detalles técnicos de acceso debe ser presentada al SAT.',
    },
    agency: 'SAT',
    action: {
      en: 'Submit formal documentation package to SAT with API specs, data dictionary, and access credentials.',
      es: 'Presentar paquete de documentación formal al SAT con especificaciones de API, diccionario de datos y credenciales de acceso.',
    },
    risk: {
      en: 'Missing deadline triggers enhanced audit scrutiny and potential operational restrictions.',
      es: 'Incumplir la fecha límite activa escrutinio de auditoría intensificado y posibles restricciones operativas.',
    },
    category: 'sat',
  },
  {
    id: 'imss-q2',
    date: '2026-05-17',
    title: { en: 'IMSS/INFONAVIT Bimonthly Payment (Mar-Apr)', es: 'Pago Bimestral IMSS/INFONAVIT (Mar-Abr)' },
    description: {
      en: 'Bimonthly employer contributions due for Mar-Apr period.',
      es: 'Contribuciones patronales bimestrales correspondientes al período Mar-Abr.',
    },
    agency: 'IMSS / INFONAVIT',
    action: {
      en: 'Calculate and submit bimonthly contributions via SUA. Reconcile with partner enrollment changes.',
      es: 'Calcular y enviar contribuciones bimestrales vía SUA. Reconciliar con cambios de inscripción de socios.',
    },
    risk: {
      en: 'Late surcharges + coverage gaps for partners.',
      es: 'Recargos por mora + brechas de cobertura para socios.',
    },
    category: 'imss',
  },
  {
    id: 'imss-q3',
    date: '2026-07-17',
    title: { en: 'IMSS/INFONAVIT Bimonthly Payment (May-Jun)', es: 'Pago Bimestral IMSS/INFONAVIT (May-Jun)' },
    description: {
      en: 'Bimonthly employer contributions due for May-Jun period.',
      es: 'Contribuciones patronales bimestrales correspondientes al período May-Jun.',
    },
    agency: 'IMSS / INFONAVIT',
    action: {
      en: 'Calculate and submit bimonthly contributions via SUA.',
      es: 'Calcular y enviar contribuciones bimestrales vía SUA.',
    },
    risk: {
      en: 'Late surcharges + potential IMSS enforcement actions.',
      es: 'Recargos por mora + posibles acciones de cumplimiento del IMSS.',
    },
    category: 'imss',
  },
  {
    id: 'imss-q4',
    date: '2026-09-17',
    title: { en: 'IMSS/INFONAVIT Bimonthly Payment (Jul-Aug)', es: 'Pago Bimestral IMSS/INFONAVIT (Jul-Ago)' },
    description: {
      en: 'Bimonthly employer contributions due for Jul-Aug period.',
      es: 'Contribuciones patronales bimestrales correspondientes al período Jul-Ago.',
    },
    agency: 'IMSS / INFONAVIT',
    action: {
      en: 'Calculate and submit bimonthly contributions via SUA.',
      es: 'Calcular y enviar contribuciones bimestrales vía SUA.',
    },
    risk: {
      en: 'Late surcharges + coverage suspension risk.',
      es: 'Recargos por mora + riesgo de suspensión de cobertura.',
    },
    category: 'imss',
  },
  {
    id: 'imss-q5',
    date: '2026-11-17',
    title: { en: 'IMSS/INFONAVIT Bimonthly Payment (Sep-Oct)', es: 'Pago Bimestral IMSS/INFONAVIT (Sep-Oct)' },
    description: {
      en: 'Bimonthly employer contributions due for Sep-Oct period.',
      es: 'Contribuciones patronales bimestrales correspondientes al período Sep-Oct.',
    },
    agency: 'IMSS / INFONAVIT',
    action: {
      en: 'Calculate and submit bimonthly contributions via SUA.',
      es: 'Calcular y enviar contribuciones bimestrales vía SUA.',
    },
    risk: {
      en: 'Year-end enforcement typically stricter. Late payments more likely to trigger audits.',
      es: 'Cumplimiento de fin de año típicamente más estricto. Pagos tardíos más propensos a activar auditorías.',
    },
    category: 'imss',
  },
  {
    id: 'plataformas-review',
    date: '2026-06-22',
    title: { en: '1-Year Anniversary of Platform Worker Reform', es: 'Primer Aniversario de la Reforma de Trabajadores de Plataformas' },
    description: {
      en: 'One year since Chapter XVIII-BIS entered into force. Expected regulatory review and potential amendments based on first year data.',
      es: 'Un año desde que el Capítulo XVIII-BIS entró en vigor. Revisión regulatoria esperada y posibles enmiendas basadas en datos del primer año.',
    },
    agency: 'STPS / Congress',
    action: {
      en: 'Prepare compliance report. Monitor legislative activity for amendments. Engage with industry associations on policy feedback.',
      es: 'Preparar informe de cumplimiento. Monitorear actividad legislativa para enmiendas. Participar con asociaciones del sector en retroalimentación de política.',
    },
    risk: {
      en: 'New regulations could expand scope or increase obligations. Being unprepared means reactive compliance.',
      es: 'Nuevas regulaciones podrían expandir alcance o aumentar obligaciones. No estar preparado significa cumplimiento reactivo.',
    },
    category: 'labor',
  },
];

export const categoryColors: Record<string, string> = {
  imss: '#276EF1',
  infonavit: '#06C167',
  sat: '#FF6937',
  labor: '#000000',
};

export const categoryLabels: Record<string, Record<Lang, string>> = {
  imss: { en: 'IMSS', es: 'IMSS' },
  infonavit: { en: 'INFONAVIT', es: 'INFONAVIT' },
  sat: { en: 'SAT', es: 'SAT' },
  labor: { en: 'Labor Law', es: 'Ley Laboral' },
};
