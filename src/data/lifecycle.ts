import { Lang } from './translations';

export interface LifecycleStep {
  id: string;
  title: Record<Lang, string>;
  icon: string;
  action: Record<Lang, string>;
  teams: string[];
  friction: Record<Lang, string[]>;
  time: Record<Lang, string>;
}

export interface LifecycleStage {
  id: string;
  title: Record<Lang, string>;
  color: string;
  steps: LifecycleStep[];
}

export const lifecycleStages: LifecycleStage[] = [
  {
    id: 'registration',
    title: { en: 'Registration', es: 'Registro' },
    color: '#276EF1',
    steps: [
      {
        id: 'ine',
        title: { en: 'INE Verification', es: 'Verificación de INE' },
        icon: '🪪',
        action: { en: 'Validate INE (National Electoral ID) via government API. Cross-check name, CURP, and photo match.', es: 'Validar INE (credencial de elector) vía API gubernamental. Verificar nombre, CURP y coincidencia de foto.' },
        teams: ['Product', 'Legal'],
        friction: {
          en: ['Expired INE causes rejection — partner must renew at INE office', 'Name mismatches between INE and bank account delay onboarding'],
          es: ['INE vencida causa rechazo — socio debe renovar en oficina del INE', 'Discrepancias de nombre entre INE y cuenta bancaria retrasan incorporación'],
        },
        time: { en: '1-2 business days', es: '1-2 días hábiles' },
      },
      {
        id: 'rfc',
        title: { en: 'RFC Tax ID', es: 'RFC (Registro Federal de Contribuyentes)' },
        icon: '📋',
        action: { en: 'Validate RFC format and registration with SAT. Ensure partner is registered under correct tax regime (Plataformas Tecnológicas).', es: 'Validar formato de RFC y registro ante el SAT. Asegurar que el socio esté registrado bajo el régimen fiscal correcto (Plataformas Tecnológicas).' },
        teams: ['Legal', 'Support'],
        friction: {
          en: ['Many partners lack RFC — must register at SAT office (1-3 hour wait)', 'Wrong tax regime requires amendment at SAT before proceeding'],
          es: ['Muchos socios no tienen RFC — deben registrarse en oficina del SAT (1-3 horas de espera)', 'Régimen fiscal incorrecto requiere modificación en SAT antes de continuar'],
        },
        time: { en: '2-5 business days', es: '2-5 días hábiles' },
      },
      {
        id: 'bank',
        title: { en: 'Bank Account Setup', es: 'Configuración de Cuenta Bancaria' },
        icon: '🏦',
        action: { en: 'Collect CLABE (18-digit interbank code) and validate with banking partner. Ensure account holder name matches INE.', es: 'Recopilar CLABE (código interbancario de 18 dígitos) y validar con socio bancario. Asegurar que el nombre del titular coincida con INE.' },
        teams: ['Product', 'Support'],
        friction: {
          en: ['Partners without bank accounts must open one (fintech options: Nu, Mercado Pago)', 'CLABE entry errors cause failed payouts requiring re-verification'],
          es: ['Socios sin cuenta bancaria deben abrir una (opciones fintech: Nu, Mercado Pago)', 'Errores al ingresar CLABE causan pagos fallidos que requieren re-verificación'],
        },
        time: { en: '1-3 business days', es: '1-3 días hábiles' },
      },
    ],
  },
  {
    id: 'onboarding',
    title: { en: 'Onboarding', es: 'Incorporación' },
    color: '#06C167',
    steps: [
      {
        id: 'training',
        title: { en: 'App Training', es: 'Capacitación en la App' },
        icon: '📱',
        action: { en: 'Complete in-app tutorial covering: accepting orders, navigation, delivery confirmation, earnings tracking.', es: 'Completar tutorial en la app: aceptar pedidos, navegación, confirmación de entrega, seguimiento de ganancias.' },
        teams: ['Product', 'Ops'],
        friction: {
          en: ['Low completion rate — many partners skip and learn by trial', 'Content not optimized for low-bandwidth connections in outer colonias'],
          es: ['Baja tasa de finalización — muchos socios omiten y aprenden por ensayo', 'Contenido no optimizado para conexiones de baja velocidad en colonias periféricas'],
        },
        time: { en: '30-45 minutes', es: '30-45 minutos' },
      },
      {
        id: 'first-delivery',
        title: { en: 'First Delivery', es: 'Primera Entrega' },
        icon: '🛵',
        action: { en: 'Monitor first delivery completion. Trigger welcome bonus if completed within 48h of activation.', es: 'Monitorear finalización de primera entrega. Activar bono de bienvenida si se completa dentro de 48h de activación.' },
        teams: ['Ops', 'Support'],
        friction: {
          en: ['First delivery anxiety — partner unfamiliar with flow', 'Restaurant pickup confusion (entrance vs. delivery entrance)'],
          es: ['Ansiedad de primera entrega — socio no familiarizado con el flujo', 'Confusión en recolección en restaurante (entrada principal vs. entrada de repartidores)'],
        },
        time: { en: '1-48 hours', es: '1-48 horas' },
      },
      {
        id: 'safety',
        title: { en: 'Safety Modules', es: 'Módulos de Seguridad' },
        icon: '🛡️',
        action: { en: 'Complete mandatory safety training: road safety, food handling, personal safety, emergency contacts.', es: 'Completar capacitación obligatoria: seguridad vial, manejo de alimentos, seguridad personal, contactos de emergencia.' },
        teams: ['Legal', 'Ops', 'Support'],
        friction: {
          en: ['Mandatory but often completed late — need reminder system', 'Safety content perceived as generic rather than Mexico-specific'],
          es: ['Obligatorio pero frecuentemente completado tarde — necesita sistema de recordatorios', 'Contenido de seguridad percibido como genérico en lugar de específico para México'],
        },
        time: { en: '20-30 minutes', es: '20-30 minutos' },
      },
    ],
  },
  {
    id: 'active',
    title: { en: 'Active Operations', es: 'Operaciones Activas' },
    color: '#00A862',
    steps: [
      {
        id: 'earnings',
        title: { en: 'Weekly Earnings', es: 'Ganancias Semanales' },
        icon: '💰',
        action: { en: 'Process weekly payout via SPEI transfer. Apply ISR withholding (2.5% with RFC, 20% without). Generate CFDI.', es: 'Procesar pago semanal vía transferencia SPEI. Aplicar retención de ISR (2.5% con RFC, 20% sin RFC). Generar CFDI.' },
        teams: ['Product', 'Legal'],
        friction: {
          en: ['Payout delays on banking holidays cause partner frustration', 'Partners confused by ISR withholding differences (with/without RFC)'],
          es: ['Retrasos en pagos por días festivos bancarios causan frustración', 'Socios confundidos por diferencias en retención ISR (con/sin RFC)'],
        },
        time: { en: 'Weekly cycle', es: 'Ciclo semanal' },
      },
      {
        id: 'incentives',
        title: { en: 'Tips & Incentives', es: 'Propinas e Incentivos' },
        icon: '⭐',
        action: { en: 'Manage surge pricing zones, quest incentives, and tip distribution. Ensure 100% tip passthrough compliance.', es: 'Gestionar zonas de tarifa dinámica, incentivos de misiones y distribución de propinas. Asegurar cumplimiento de 100% de traspaso de propinas.' },
        teams: ['Ops', 'Product'],
        friction: {
          en: ['Surge zone perception — partners feel zones are unpredictable', 'Quest completion tracking errors cause support tickets'],
          es: ['Percepción de zonas dinámicas — socios sienten que las zonas son impredecibles', 'Errores en seguimiento de misiones causan tickets de soporte'],
        },
        time: { en: 'Ongoing', es: 'Continuo' },
      },
    ],
  },
  {
    id: 'compliance',
    title: { en: 'Compliance Events', es: 'Eventos de Cumplimiento' },
    color: '#FF6937',
    steps: [
      {
        id: 'imss',
        title: { en: 'IMSS Social Security', es: 'IMSS Seguro Social' },
        icon: '🏥',
        action: { en: 'Register qualifying partners (earning ≥1 min. salary/month) with IMSS within 5 business days. Process bimonthly contributions.', es: 'Registrar socios que califican (ganando ≥1 salario mín./mes) ante el IMSS dentro de 5 días hábiles. Procesar contribuciones bimestrales.' },
        teams: ['Legal', 'Ops', 'Product'],
        friction: {
          en: ['Income threshold creates two-tier system — partners game hours to qualify/avoid', 'IMSS registration requires CURP + RFC + address — data quality issues'],
          es: ['Umbral de ingreso crea sistema de dos niveles — socios manipulan horas para calificar/evitar', 'Registro IMSS requiere CURP + RFC + domicilio — problemas de calidad de datos'],
        },
        time: { en: '5 business days (registration)', es: '5 días hábiles (registro)' },
      },
      {
        id: 'infonavit',
        title: { en: 'INFONAVIT Contributions', es: 'Aportaciones INFONAVIT' },
        icon: '🏠',
        action: { en: 'Calculate and remit 5% housing fund contributions bimonthly for enrolled partners. Sync with IMSS enrollment status.', es: 'Calcular y remitir aportaciones de 5% al fondo de vivienda bimestralmente para socios inscritos. Sincronizar con estatus de inscripción IMSS.' },
        teams: ['Legal', 'Ops'],
        friction: {
          en: ['Must sync with IMSS enrollment — delays cascade between agencies', 'Partners unaware of INFONAVIT housing credit benefit'],
          es: ['Debe sincronizar con inscripción IMSS — retrasos se propagan entre agencias', 'Socios desconocen el beneficio de crédito de vivienda INFONAVIT'],
        },
        time: { en: 'Bimonthly cycle', es: 'Ciclo bimestral' },
      },
      {
        id: 'sat-tax',
        title: { en: 'Annual Tax Declarations', es: 'Declaraciones Fiscales Anuales' },
        icon: '📊',
        action: { en: 'Issue annual CFDI de retenciones. Support partners with tax filing guidance. Report aggregate platform data to SAT.', es: 'Emitir CFDI de retenciones anual. Apoyar socios con guía para declaración fiscal. Reportar datos agregados de plataforma al SAT.' },
        teams: ['Legal', 'Support'],
        friction: {
          en: ['Partners unfamiliar with tax filing process — high support volume in April', 'CFDI format errors require reissuance — manual process'],
          es: ['Socios no familiarizados con proceso de declaración fiscal — alto volumen de soporte en abril', 'Errores de formato en CFDI requieren re-emisión — proceso manual'],
        },
        time: { en: 'Annual (deadline: April 30)', es: 'Anual (fecha límite: 30 de abril)' },
      },
    ],
  },
  {
    id: 'contract',
    title: { en: 'Contract Events', es: 'Eventos Contractuales' },
    color: '#F5A623',
    steps: [
      {
        id: 'termination',
        title: { en: 'Terminations', es: 'Terminaciones' },
        icon: '⚠️',
        action: { en: 'Process account deactivations per LFT Art. 291-H. Document cause, notify partner, initiate final settlement.', es: 'Procesar desactivaciones de cuenta según Art. 291-H LFT. Documentar causa, notificar al socio, iniciar liquidación final.' },
        teams: ['Legal', 'Support', 'Ops'],
        friction: {
          en: ['Deactivation reasons unclear to partners — drives disputes', 'LFT requires specific documentation that legacy systems lack'],
          es: ['Razones de desactivación poco claras para socios — genera disputas', 'LFT requiere documentación específica que los sistemas legados carecen'],
        },
        time: { en: '5-10 business days', es: '5-10 días hábiles' },
      },
      {
        id: 'reactivation',
        title: { en: 'Reactivations', es: 'Reactivaciones' },
        icon: '🔄',
        action: { en: 'Review reactivation requests. Verify updated documents. Re-enroll in IMSS if income threshold met.', es: 'Revisar solicitudes de reactivación. Verificar documentos actualizados. Re-inscribir en IMSS si se cumple umbral de ingreso.' },
        teams: ['Ops', 'Support', 'Legal'],
        friction: {
          en: ['Reactivation requires full re-verification — partners expect instant return', 'IMSS gap coverage uncertainty during inactive periods'],
          es: ['Reactivación requiere re-verificación completa — socios esperan retorno inmediato', 'Incertidumbre de cobertura IMSS durante períodos inactivos'],
        },
        time: { en: '3-7 business days', es: '3-7 días hábiles' },
      },
    ],
  },
  {
    id: 'offboarding',
    title: { en: 'Offboarding', es: 'Desvinculación' },
    color: '#6B7280',
    steps: [
      {
        id: 'final-pay',
        title: { en: 'Final Payments', es: 'Pagos Finales' },
        icon: '💳',
        action: { en: 'Calculate and issue final settlement: pending earnings, proportional aguinaldo, vacation days, any pending tips.', es: 'Calcular y emitir liquidación final: ganancias pendientes, aguinaldo proporcional, días de vacaciones, propinas pendientes.' },
        teams: ['Legal', 'Ops'],
        friction: {
          en: ['Aguinaldo calculation disputes — pro-rata methodology unclear to partners', 'Final SPEI transfer delays if bank account closed'],
          es: ['Disputas de cálculo de aguinaldo — metodología proporcional poco clara para socios', 'Retrasos en transferencia SPEI final si la cuenta bancaria fue cerrada'],
        },
        time: { en: '5-15 business days', es: '5-15 días hábiles' },
      },
      {
        id: 'benefit-settlement',
        title: { en: 'Benefit Settlements', es: 'Liquidación de Prestaciones' },
        icon: '📑',
        action: { en: 'Notify IMSS of termination. Process final INFONAVIT contribution. Issue closing CFDI de retenciones.', es: 'Notificar al IMSS de la baja. Procesar aportación final de INFONAVIT. Emitir CFDI de retenciones de cierre.' },
        teams: ['Legal', 'Ops'],
        friction: {
          en: ['IMSS deregistration delays affect partner\'s future employer registration', 'Cross-agency coordination needed (IMSS + INFONAVIT + SAT)'],
          es: ['Retrasos en baja del IMSS afectan registro con futuro empleador del socio', 'Coordinación inter-agencia necesaria (IMSS + INFONAVIT + SAT)'],
        },
        time: { en: '10-20 business days', es: '10-20 días hábiles' },
      },
    ],
  },
];
