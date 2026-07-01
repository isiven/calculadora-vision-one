export const SUPPORT_POLICY_OPTIONS = ["Bronze", "Silver", "Gold", "Platinum"];

export const normalizeSupportPolicy = (policyType) =>
  SUPPORT_POLICY_OPTIONS.includes(policyType) ? policyType : "Platinum";

const DEFAULT_NOTES =
  "El alcance puede variar según SKU, versión contratada, integraciones habilitadas, disponibilidad del fabricante y condiciones comerciales aprobadas.";

const buildScope = ({ title, summary, includes, businessValue, notes = DEFAULT_NOTES }) => ({
  title,
  summary,
  includes,
  businessValue,
  notes,
});

const textFor = (line) => {
  const product = line?.prod || line || {};
  return `${product.name || ""} ${product.sku || ""} ${product.cat || ""} ${product.id || ""}`.toLowerCase();
};

const byFamily = {
  endpointFallback: buildScope({
    title: "Endpoint Security",
    summary:
      "Protección para endpoints, laptops, servidores o cargas de trabajo incluidas en el alcance, orientada a prevenir malware, ransomware y actividad sospechosa.",
    includes: [
      "Protección contra amenazas en endpoints incluidos.",
      "Visibilidad centralizada de eventos y postura de seguridad.",
      "Contribución a la correlación de eventos dentro de Trend Vision One cuando aplique.",
    ],
    businessValue:
      "Reduce la exposición de endpoints y ayuda a contener amenazas antes de que se propaguen.",
  }),
  cloudFallback: buildScope({
    title: "Cloud Security",
    summary:
      "Capacidades de seguridad para entornos cloud, cargas modernas, contenedores, almacenamiento o servicios asociados a la postura de seguridad en nube.",
    includes: [
      "Cobertura de recursos cloud incluidos en el dimensionamiento.",
      "Soporte para mejorar visibilidad y control de riesgos cloud-native.",
      "Integración con el enfoque de seguridad de Trend Vision One cuando aplique.",
    ],
    businessValue:
      "Ayuda a reducir riesgos en ambientes cloud y a priorizar acciones sobre configuraciones o cargas críticas.",
  }),
  emailFallback: buildScope({
    title: "Email and Collaboration Security",
    summary:
      "Protección para correo y colaboración frente a phishing, malware, spam, enlaces maliciosos y amenazas asociadas al canal de email.",
    includes: [
      "Protección para usuarios de correo incluidos en el alcance.",
      "Controles contra amenazas comunes y avanzadas en email.",
      "Visibilidad de eventos para apoyar investigación y respuesta.",
    ],
    businessValue:
      "Disminuye el riesgo de compromiso por correo, uno de los vectores más frecuentes de ataque.",
  }),
};

const scopes = [
  {
    match: (raw) => raw.includes("trend vision one credits") || raw.includes("vorn0309"),
    scope: buildScope({
      title: "Trend Vision One Credits",
      summary:
        "Créditos flexibles para consumir capacidades de TrendAI / Trend Vision One según el dimensionamiento definido.",
      includes: [
        "Bolsa de créditos para habilitar capacidades elegibles de la plataforma.",
        "Flexibilidad para redistribuir consumo entre módulos según condiciones del fabricante.",
        "Base de dimensionamiento para licenciamiento, renovaciones o crecimiento futuro.",
      ],
      businessValue:
        "Permite adaptar el consumo de seguridad a la necesidad real del cliente sin comprar módulos aislados de forma rígida.",
      notes:
        "El uso de créditos depende de productos elegibles, reglas de consumo vigentes y condiciones comerciales del fabricante.",
    }),
  },
  {
    match: (raw) => raw.includes("cyber risk exposure management - core"),
    scope: buildScope({
      title: "Cyber Risk Exposure Management Core",
      summary:
        "Evalúa y visualiza la exposición de riesgo cibernético de la organización sobre endpoints, servidores o activos incluidos.",
      includes: [
        "Identificación de activos, brechas, debilidades y postura de seguridad.",
        "Priorización de riesgos y áreas de mitigación.",
        "Visibilidad ejecutiva para reducir exposición antes de explotación.",
      ],
      businessValue:
        "Ayuda a priorizar acciones de reducción de exposición con foco en los riesgos más relevantes.",
    }),
  },
  {
    match: (raw) => raw.includes("cyber risk exposure management - essentials"),
    scope: buildScope({
      title: "Cyber Risk Exposure Management Essentials",
      summary:
        "Cobertura ampliada para gestión de exposición, con mayor profundidad de evaluación, priorización y contexto de riesgo.",
      includes: [
        "Evaluación de dispositivos o activos de red incluidos.",
        "Contexto de riesgo para reducir superficie de ataque.",
        "Priorización comercial y técnica de iniciativas de mitigación.",
      ],
      businessValue:
        "Facilita decisiones de remediación basadas en exposición real y criticidad del activo.",
    }),
  },
  {
    match: (raw) => raw.includes("cloud risk management"),
    scope: buildScope({
      title: "Cloud Risk Management",
      summary:
        "Gestión de postura y riesgo en cuentas cloud según la cantidad de recursos o activos dimensionados.",
      includes: [
        "Evaluación de configuraciones riesgosas y exposición cloud.",
        "Visibilidad de cumplimiento y postura sobre recursos incluidos.",
        "Priorización de remediación en ambientes cloud.",
      ],
      businessValue:
        "Reduce riesgos operativos y de configuración en nube antes de que impacten aplicaciones o datos críticos.",
    }),
  },
  {
    match: (raw) => raw.includes("agentic siem"),
    scope: buildScope({
      title: "Agentic SIEM",
      summary:
        "Capacidades de ingesta o retención de datos de seguridad para análisis, investigación y correlación dentro del ecosistema Vision One.",
      includes: [
        "Ingesta o retención de datos según el tipo de línea seleccionada.",
        "Soporte para investigaciones y trazabilidad de eventos.",
        "Base para análisis operativo de seguridad y cumplimiento.",
      ],
      businessValue:
        "Mejora la capacidad de análisis y retención de señales de seguridad relevantes para operaciones SOC.",
    }),
  },
  {
    match: (raw) => raw.includes("forensics"),
    scope: buildScope({
      title: "Forensics",
      summary:
        "Capacidad de almacenamiento y análisis forense en warehouse para investigaciones, preservación de evidencias y análisis posterior de incidentes.",
      includes: [
        "Espacio de análisis forense según el volumen contratado.",
        "Apoyo a investigaciones posteriores a incidentes.",
        "Conservación de información relevante para análisis técnico.",
      ],
      businessValue:
        "Aumenta la capacidad de investigación y evidencia ante incidentes relevantes.",
    }),
  },
  {
    match: (raw) => raw.includes("data pipeline"),
    scope: buildScope({
      title: "Data Pipeline Outbound",
      summary:
        "Permite exportar telemetría de Trend Vision One hacia sistemas externos como SIEM, data lake u otras plataformas.",
      includes: [
        "Exportación de telemetría según volumen dimensionado.",
        "Integración con plataformas externas de análisis o retención.",
        "Soporte para correlación adicional fuera de Vision One.",
      ],
      businessValue:
        "Facilita integrar la visibilidad de Vision One con ecosistemas de seguridad y datos existentes.",
    }),
  },
  {
    match: (raw) => raw.includes("xdr for endpoints") || raw.includes("endpoint and server"),
    scope: buildScope({
      title: "XDR Endpoint and Server Sensor",
      summary:
        "Sensor para recolectar telemetría de endpoints y servidores con fines de detección, investigación y correlación dentro de Trend Vision One.",
      includes: [
        "Recolección de eventos y señales desde endpoints o servidores.",
        "Correlación con otras capas de seguridad cuando estén integradas.",
        "Apoyo a investigación y respuesta ante amenazas.",
      ],
      businessValue:
        "Aumenta la visibilidad sobre endpoints y ayuda a reducir tiempos de detección e investigación.",
    }),
  },
  {
    match: (raw) => raw.includes("xdr for email") || raw.includes("emdr") || raw.includes("email sensor"),
    scope: buildScope({
      title: "XDR Email Sensor",
      summary:
        "Recolecta y correlaciona eventos de correo para investigar campañas maliciosas, phishing, BEC, malware y amenazas relacionadas al vector email.",
      includes: [
        "Telemetría de eventos asociados al correo electrónico.",
        "Correlación con indicadores de compromiso y otros vectores.",
        "Apoyo a investigación de amenazas orientadas a usuarios.",
      ],
      businessValue:
        "Ayuda a responder más rápido ante ataques que ingresan por email y a reducir impacto en usuarios.",
    }),
  },
  {
    match: (raw) =>
      !raw.includes("sandbox analysis") &&
      (raw.includes("deep discovery inspector") ||
        raw.includes("network ddi") ||
        raw.includes("networks - ddi") ||
        (raw.includes("xdr for networks") && raw.includes("ddi"))),
    scope: buildScope({
      title: "XDR Network DDI",
      summary:
        "Sensor de red para visibilidad y detección basada en tráfico, orientado a entornos con capacidad medida en Gbps.",
      includes: [
        "Análisis de tráfico de red y comportamientos anómalos.",
        "Detección de amenazas, movimientos laterales y actividad sospechosa.",
        "Correlación de señales de red con otros eventos de seguridad.",
      ],
      businessValue:
        "Amplía la visibilidad de red y mejora la capacidad de detectar amenazas que no aparecen solo en endpoints.",
    }),
  },
  {
    match: (raw) =>
      !raw.includes("sandbox analysis") &&
      (raw.includes("xdr for networks") || raw.includes("network virtual appliance")),
    scope: buildScope({
      title: "XDR Network Virtual Appliance",
      summary:
        "Sensor o appliance virtual para análisis de tráfico de red por bloques de capacidad, útil para visibilidad, investigación y correlación.",
      includes: [
        "Monitoreo de tráfico según capacidad dimensionada.",
        "Detección de amenazas y actividad anómala en red.",
        "Integración con investigaciones XDR de múltiples capas.",
      ],
      businessValue:
        "Permite investigar eventos de red con mayor contexto y mejorar la cobertura de detección.",
    }),
  },
  {
    match: (raw) => raw.includes("xdr for cloud") || raw.includes("cdr"),
    scope: buildScope({
      title: "XDR for Cloud",
      summary:
        "Ingesta y análisis de telemetría cloud, como eventos de CloudTrail, para detectar actividad sospechosa, configuraciones riesgosas o eventos relevantes.",
      includes: [
        "Análisis de eventos cloud según volumen de datos dimensionado.",
        "Detección de actividad sospechosa en ambientes cloud.",
        "Correlación de señales cloud con incidentes de seguridad.",
      ],
      businessValue:
        "Mejora la detección de riesgos en nube y ayuda a responder ante actividad inusual en cuentas cloud.",
    }),
  },
  {
    match: (raw) => raw.includes("xdr for ot") && raw.includes("device"),
    scope: buildScope({
      title: "XDR for OT - Device",
      summary:
        "Visibilidad y monitoreo de dispositivos OT o industriales incluidos en el alcance para detectar riesgos y comportamientos sospechosos.",
      includes: [
        "Monitoreo de dispositivos OT incluidos.",
        "Identificación de actividad inusual en ambientes operacionales.",
        "Contexto para investigaciones de seguridad industrial.",
      ],
      businessValue:
        "Extiende la visibilidad de seguridad a tecnología operacional y activos industriales críticos.",
    }),
  },
  {
    match: (raw) => raw.includes("xdr for ot") && raw.includes("network"),
    scope: buildScope({
      title: "XDR for OT - Network",
      summary:
        "Monitoreo de segmentos o appliances de red OT para ampliar visibilidad sobre tráfico y eventos de tecnología operacional.",
      includes: [
        "Observación de tráfico en segmentos OT incluidos.",
        "Detección de comportamientos anómalos en red operacional.",
        "Apoyo a investigación de incidentes en ambientes industriales.",
      ],
      businessValue:
        "Aumenta la capacidad de detectar riesgos en redes OT donde la disponibilidad operativa es crítica.",
    }),
  },
  {
    match: (raw) => raw.includes("sandbox analysis - manual"),
    scope: buildScope({
      title: "Sandbox Analysis - Manual Submission",
      summary:
        "Capacidad para enviar muestras manualmente a sandbox para análisis de comportamiento, detección de malware, archivos sospechosos y amenazas desconocidas.",
      includes: [
        "Envío manual de muestras para análisis.",
        "Evaluación de comportamiento de archivos sospechosos.",
        "Apoyo a investigación de malware y amenazas desconocidas.",
      ],
      businessValue:
        "Permite validar archivos sospechosos y enriquecer decisiones de respuesta ante amenazas no conocidas.",
    }),
  },
  {
    match: (raw) => raw.includes("sandbox analysis - auto") && raw.includes("ztsa"),
    scope: buildScope({
      title: "Sandbox Analysis - Automatic add-on for ZTSA Internet Access",
      summary:
        "Agrega análisis automático de sandbox para contenido asociado a usuarios de ZTSA Internet Access.",
      includes: [
        "Análisis automático de contenido asociado a navegación internet.",
        "Refuerzo de detección para amenazas descargadas o accedidas desde internet.",
        "Integración con la cobertura de Zero Trust Secure Access.",
      ],
      businessValue:
        "Fortalece la protección de navegación al analizar contenido sospechoso sin depender de envíos manuales.",
    }),
  },
  {
    match: (raw) => raw.includes("sandbox analysis - auto") && raw.includes("network"),
    scope: buildScope({
      title: "Sandbox Analysis - Automatic add-on for Vision One XDR for Networks",
      summary:
        "Agrega análisis sandbox automático para tráfico o archivos observados por sensores de red XDR.",
      includes: [
        "Análisis automático asociado a sensores de red.",
        "Mejora de detección para amenazas avanzadas observadas en tráfico.",
        "Enriquecimiento de investigaciones con resultados sandbox.",
      ],
      businessValue:
        "Aumenta la capacidad de detectar amenazas avanzadas que se manifiestan en tráfico o archivos de red.",
    }),
  },
  {
    match: (raw) => raw.includes("sandbox analysis - auto") && raw.includes("endpoint security"),
    scope: buildScope({
      title: "Sandbox Analysis - Automatic add-on for Endpoint Security",
      summary:
        "Agrega análisis automático de sandbox para contenido o archivos relacionados con endpoints incluidos en Endpoint Security.",
      includes: [
        "Análisis automático de archivos sospechosos en endpoints cubiertos.",
        "Detección de malware y amenazas desconocidas.",
        "Enriquecimiento de eventos para investigación y respuesta.",
      ],
      businessValue:
        "Mejora la detección de amenazas avanzadas en endpoints sin requerir análisis manual caso por caso.",
    }),
  },
  {
    match: (raw) =>
      (raw.includes("threat intelligence") && raw.includes("service providers")) ||
      raw.includes("v1 xsp"),
    scope: buildScope({
      title: "Threat Intelligence Feed for Service Providers",
      summary:
        "Feed de inteligencia de amenazas orientado a proveedores de servicio o cuentas partner para operaciones multi-cliente o servicios gestionados.",
      includes: [
        "Indicadores y contexto de amenazas para entornos de proveedor.",
        "Soporte para enriquecer operaciones de seguridad multi-cliente.",
        "Información útil para detección, investigación y priorización.",
      ],
      businessValue:
        "Permite a proveedores de servicio fortalecer operaciones gestionadas con inteligencia de amenazas actualizada.",
    }),
  },
  {
    match: (raw) => raw.includes("threat intelligence"),
    scope: buildScope({
      title: "Threat Intelligence Feed",
      summary:
        "Acceso a feed de inteligencia de amenazas para enriquecer defensas, investigaciones y procesos de detección.",
      includes: [
        "Indicadores y contexto de amenazas para un tenant Vision One.",
        "Enriquecimiento de alertas, investigaciones y procesos de detección.",
        "Apoyo a priorización de amenazas relevantes.",
      ],
      businessValue:
        "Mejora el contexto de seguridad disponible para tomar decisiones de detección y respuesta.",
    }),
  },
  {
    match: (raw) => raw.includes("threat insights"),
    scope: buildScope({
      title: "Threat Insights",
      summary:
        "Capacidad orientada a analistas para obtener contexto, tendencias, información de amenazas y apoyo a la priorización o investigación.",
      includes: [
        "Contexto de amenazas y tendencias relevantes.",
        "Apoyo a analistas para investigación y priorización.",
        "Información complementaria para entender exposición y actividad maliciosa.",
      ],
      businessValue:
        "Acelera el análisis al entregar contexto accionable sobre amenazas y su posible impacto.",
    }),
  },
  {
    match: (raw) => raw.includes("container security"),
    scope: buildScope({
      title: "Container Security",
      summary:
        "Protección para entornos de contenedores, nodos Kubernetes, Amazon ECS, pods o tareas serverless.",
      includes: [
        "Cobertura de nodos, instancias, pods o tareas según la línea seleccionada.",
        "Reducción de riesgos en cargas cloud-native y aplicaciones modernas.",
        "Visibilidad de seguridad para entornos de contenedores.",
      ],
      businessValue:
        "Ayuda a proteger aplicaciones modernas y a mejorar la postura de seguridad de cargas cloud-native.",
    }),
  },
  {
    match: (raw) => raw.includes("file security"),
    scope: buildScope({
      title: "File Security",
      summary:
        "Seguridad para análisis de archivos u objetos según volumen de escaneos, scanner, bucket o modalidad contratada.",
      includes: [
        "Análisis antimalware de archivos u objetos según modalidad seleccionada.",
        "Cobertura para flujos cloud, almacenamiento o procesos integrados.",
        "Apoyo a reducción de riesgo por contenido malicioso.",
      ],
      businessValue:
        "Permite inspeccionar archivos en procesos críticos y reducir riesgo antes de que contenido malicioso avance.",
    }),
  },
  {
    match: (raw) => raw.includes("endpoint security core"),
    scope: buildScope({
      title: "Endpoint Security Core",
      summary:
        "Protección base para endpoints, laptops, PCs, servidores o cargas de trabajo contra malware, ransomware y amenazas conocidas.",
      includes: [
        "Protección contra amenazas en endpoints incluidos en el alcance.",
        "Visibilidad centralizada de eventos y postura de seguridad.",
        "Reducción de exposición sobre estaciones o servidores cubiertos.",
      ],
      businessValue:
        "Reduce la superficie de ataque en endpoints y ayuda a contener amenazas antes de que se propaguen.",
    }),
  },
  {
    match: (raw) => raw.includes("endpoint security essentials"),
    scope: buildScope({
      title: "Endpoint Security Essentials",
      summary:
        "Capacidades superiores a Core, orientadas a mayor visibilidad, detección y respuesta sobre endpoints.",
      includes: [
        "Protección ampliada para endpoints incluidos.",
        "Mayor visibilidad y capacidades de detección sobre actividad sospechosa.",
        "XDR puede estar incluido según la calculadora; no debe duplicarse sensor XDR adicional para esos endpoints.",
      ],
      businessValue:
        "Fortalece la defensa endpoint con más contexto para detectar y responder ante amenazas avanzadas.",
      notes:
        "Validar el alcance exacto del SKU contratado. Si XDR está incluido, evitar duplicar sensores XDR para los mismos endpoints.",
    }),
  },
  {
    match: (raw) => raw.includes("endpoint security pro") && !raw.includes("sap scanner"),
    scope: buildScope({
      title: "Endpoint Security Pro",
      summary:
        "Cobertura avanzada de endpoint con capacidades extendidas de detección, respuesta, correlación y análisis.",
      includes: [
        "Protección avanzada para endpoints incluidos.",
        "Capacidades extendidas de investigación y respuesta.",
        "XDR incluido según la nota de la calculadora; no debe duplicarse sensor XDR para esos endpoints.",
      ],
      businessValue:
        "Mejora la capacidad de detectar, investigar y contener amenazas complejas sobre endpoints críticos.",
      notes:
        "Validar alcance por SKU y evitar doble conteo con sensores XDR si ya están incluidos en Endpoint Security Pro.",
    }),
  },
  {
    match: (raw) => raw.includes("sap scanner"),
    scope: buildScope({
      title: "SAP Scanner for Trend Vision One - Endpoint Security Pro",
      summary:
        "Evalúa endpoints detectados asociados a entornos SAP dentro de Trend Vision One Endpoint Security Pro.",
      includes: [
        "Revisión de endpoints o servidores SAP incluidos.",
        "Extensión de visibilidad y análisis de seguridad sobre activos SAP detectados.",
        "Apoyo a evaluación de postura en entornos SAP.",
      ],
      businessValue:
        "Ayuda a extender la cobertura de seguridad hacia activos SAP relevantes para el negocio.",
    }),
  },
  {
    match: (raw) => raw.includes("mobile security"),
    scope: buildScope({
      title: "Mobile Security",
      summary:
        "Protección de dispositivos móviles incluidos en el alcance, con capacidades de seguridad y visibilidad asociadas.",
      includes: [
        "Cobertura para dispositivos móviles incluidos.",
        "Protección frente a amenazas móviles y riesgos de acceso.",
        "XDR incluido según la calculadora; no debe agregarse sensor XDR adicional para esos dispositivos.",
      ],
      businessValue:
        "Reduce exposición en dispositivos móviles y ayuda a proteger usuarios que acceden a recursos corporativos.",
      notes:
        "Validar alcance exacto por SKU y evitar duplicar sensores XDR para dispositivos móviles ya cubiertos.",
    }),
  },
  {
    match: (raw) => raw.includes("email and collaboration security core"),
    scope: buildScope({
      title: "Email and Collaboration Security Core",
      summary:
        "Protección base para correo y colaboración frente a phishing, malware, spam, enlaces maliciosos y riesgos asociados al email.",
      includes: [
        "Protección para usuarios de correo incluidos.",
        "Mitigación de phishing, malware y enlaces maliciosos.",
        "Controles base para reducir incidentes originados por email.",
      ],
      businessValue:
        "Disminuye la probabilidad de compromiso de usuarios por ataques de correo y colaboración.",
    }),
  },
  {
    match: (raw) => raw.includes("email and collaboration security essentials"),
    scope: buildScope({
      title: "Email and Collaboration Security Essentials",
      summary:
        "Capacidades ampliadas de seguridad para email y colaboración, con mayor visibilidad, controles y protección contra amenazas avanzadas.",
      includes: [
        "Protección reforzada para usuarios incluidos.",
        "Mayor visibilidad sobre amenazas avanzadas en email.",
        "Controles adicionales para reducir exposición de usuarios.",
      ],
      businessValue:
        "Mejora la protección del canal de email frente a ataques sofisticados y reduce exposición operativa.",
    }),
  },
  {
    match: (raw) => raw.includes("email and collaboration security pro"),
    scope: buildScope({
      title: "Email and Collaboration Security Pro",
      summary:
        "Protección avanzada para email y colaboración con capacidades extendidas y cobertura de mayor profundidad.",
      includes: [
        "Protección avanzada para usuarios de email y colaboración.",
        "Mayor contexto y control ante amenazas sofisticadas.",
        "XDR incluido según la calculadora; no debe duplicarse sensor XDR para los mismos usuarios.",
      ],
      businessValue:
        "Reduce riesgo de ataques avanzados por correo y mejora la capacidad de investigación sobre usuarios afectados.",
      notes:
        "Validar alcance por SKU y evitar duplicar sensores XDR para usuarios ya cubiertos por Email and Collaboration Security Pro.",
    }),
  },
  {
    match: (raw) => raw.includes("internet + private access"),
    scope: buildScope({
      title: "Zero Trust Secure Access - Internet + Private Access",
      summary:
        "Combina protección para navegación internet y acceso seguro a aplicaciones privadas bajo una misma cobertura Zero Trust.",
      includes: [
        "Controles para navegación segura hacia internet.",
        "Acceso seguro a aplicaciones privadas sin exposición directa.",
        "Políticas basadas en identidad, contexto y postura.",
      ],
      businessValue:
        "Unifica controles de acceso para usuarios que requieren internet seguro y aplicaciones privadas.",
    }),
  },
  {
    match: (raw) => raw.includes("internet + ai service access"),
    scope: buildScope({
      title: "Zero Trust Secure Access - Internet + AI Service Access",
      summary:
        "Combina protección para navegación internet y control de acceso a servicios de IA bajo enfoque Zero Trust.",
      includes: [
        "Protección de navegación internet.",
        "Gobierno del acceso a servicios de IA.",
        "Reducción de riesgos por herramientas no autorizadas o exposición de datos.",
      ],
      businessValue:
        "Ayuda a controlar navegación e IA generativa sin frenar productividad de usuarios.",
    }),
  },
  {
    match: (raw) => raw.includes("ai service access"),
    scope: buildScope({
      title: "Zero Trust Secure Access - AI Service Access",
      summary:
        "Gobierna y controla el acceso de usuarios a servicios de IA para reducir uso no autorizado, exposición de datos o acceso a herramientas no aprobadas.",
      includes: [
        "Control de acceso a servicios de IA.",
        "Políticas para reducir exposición de datos.",
        "Visibilidad de uso de herramientas de IA según cobertura contratada.",
      ],
      businessValue:
        "Permite adoptar IA con mayor control, reduciendo riesgos de fuga de información o uso no gobernado.",
    }),
  },
  {
    match: (raw) => raw.includes("internet access"),
    scope: buildScope({
      title: "Zero Trust Secure Access - Internet Access",
      summary:
        "Controla y protege el acceso de usuarios hacia internet bajo enfoque Zero Trust, aplicando políticas, visibilidad y reducción de riesgos de navegación.",
      includes: [
        "Control de navegación internet para usuarios incluidos.",
        "Aplicación de políticas de acceso y reducción de riesgos web.",
        "Visibilidad del uso y eventos asociados a navegación.",
      ],
      businessValue:
        "Reduce exposición por navegación riesgosa y ayuda a controlar acceso a contenido o servicios no autorizados.",
    }),
  },
  {
    match: (raw) => raw.includes("private access"),
    scope: buildScope({
      title: "Zero Trust Secure Access - Private Access",
      summary:
        "Permite acceso seguro a aplicaciones privadas sin exponerlas directamente, complementando o reemplazando enfoques tradicionales de VPN.",
      includes: [
        "Acceso a aplicaciones privadas bajo políticas Zero Trust.",
        "Validación de identidad, contexto y postura antes de permitir conexión.",
        "Reducción de exposición directa de aplicaciones internas.",
      ],
      businessValue:
        "Mejora la seguridad de acceso remoto y reduce dependencia de exposición de red tradicional.",
    }),
  },
  {
    match: (raw) => raw.includes("outbound static ip"),
    scope: buildScope({
      title: "Zero Trust Secure Access - Outbound Static IP Add-on",
      summary:
        "Complemento para asignación de salida con IP estática en escenarios de acceso seguro que requieren identificación o control por origen.",
      includes: [
        "Capacidad de salida estática según ancho de banda dimensionado.",
        "Soporte para integraciones que requieren origen controlado.",
        "Complemento operativo para arquitectura Zero Trust.",
      ],
      businessValue:
        "Facilita controles de acceso basados en origen cuando aplicaciones o terceros requieren IP conocida.",
    }),
  },
  {
    match: (raw) => raw.includes("data security"),
    scope: buildScope({
      title: "Data Security - Endpoint",
      summary:
        "Capacidad de seguridad de datos en endpoints para ayudar a identificar, controlar o reducir exposición de información sensible.",
      includes: [
        "Cobertura de endpoints incluidos para controles de seguridad de datos.",
        "Apoyo a reducción de exposición de información sensible.",
        "Complemento a la postura de seguridad endpoint.",
      ],
      businessValue:
        "Ayuda a proteger datos sensibles en estaciones o equipos usados por la organización.",
    }),
  },
  {
    match: (raw) => raw.includes("ai application security"),
    scope: buildScope({
      title: "AI Application Security",
      summary:
        "Capacidad orientada a proteger aplicaciones o servicios de IA según la modalidad contratada, privada o SaaS.",
      includes: [
        "Cobertura de instancia o uso de API según la línea seleccionada.",
        "Controles de seguridad para aplicaciones de IA.",
        "Apoyo a visibilidad y reducción de riesgo en uso de IA.",
      ],
      businessValue:
        "Permite adoptar aplicaciones de IA con mejores controles de seguridad y gobernanza.",
    }),
  },
  {
    match: (raw) => raw.includes("ai security package"),
    scope: buildScope({
      title: "AI Security Package",
      summary:
        "Paquete de seguridad para usuarios o empleados, orientado a controles y protección asociados al uso de IA.",
      includes: [
        "Cobertura por empleado según dimensionamiento.",
        "Controles para reducir riesgos asociados a IA.",
        "Apoyo a gobernanza y visibilidad de seguridad.",
      ],
      businessValue:
        "Ayuda a proteger la adopción de IA dentro de la organización con controles más claros.",
    }),
  },
];

export function getVisionOneProductScope(line) {
  const raw = textFor(line);
  const matched = scopes.find(({ match }) => match(raw));
  if (matched) return matched.scope;

  if (raw.includes("endpoint security")) return byFamily.endpointFallback;
  if (raw.includes("cloud security")) return byFamily.cloudFallback;
  if (raw.includes("email and collaboration")) return byFamily.emailFallback;

  return buildScope({
    title: line?.prod?.name || line?.name || "Producto Vision One",
    summary:
      "Incluye el licenciamiento, suscripción o producto indicado en la propuesta, de acuerdo con la cantidad, vigencia y configuración seleccionada.",
    includes: [
      "Cobertura del producto indicado en la línea comercial.",
      "Aplicación según cantidad, vigencia y condiciones aprobadas.",
      "Uso sujeto a disponibilidad y reglas vigentes del fabricante.",
    ],
    businessValue:
      "Permite cubrir una necesidad específica del cliente dentro del ecosistema Trend Vision One.",
  });
}

export function getSupportPolicyScope(policyType) {
  const policy = normalizeSupportPolicy(policyType);
  const commonTicketing =
    "Los casos deben abrirse y gestionarse mediante la Plataforma de Solicitudes de Servicio y Reporte de Incidentes de Nextcom: https://servicios.nextcomsystems.com";
  const commonNote =
    "El alcance queda sujeto al nivel contratado, criticidad, información suministrada, accesos disponibles y condiciones comerciales aprobadas.";

  const scopesByPolicy = {
    Bronze: {
      label: "Bronze",
      bullets: [
        "Notificación de nuevas versiones.",
        "Notificaciones tecnológicas y alertas de seguridad.",
        "Soporte por email.",
        "Soporte por teléfono.",
        "Horario 5x8 lunes a viernes.",
        "Atención de incidencias críticas en horario 5x8.",
        "Tiempo máximo por criticidad: 8 horas.",
        "Tiempo máximo de primer contacto: 24 horas.",
        commonTicketing,
      ],
      note: commonNote,
    },
    Silver: {
      label: "Silver",
      bullets: [
        "Incluye las capacidades de notificación y alertas de la póliza Bronze.",
        "Instalación de parches y hotfixes cuando aplique.",
        "Actualización a nuevas versiones cuando aplique.",
        "Soporte por email y teléfono.",
        "Horario 5x8 lunes a viernes.",
        "Tiempo máximo por criticidad: 4 horas.",
        "Tiempo máximo de primer contacto: 12 horas.",
        commonTicketing,
      ],
      note: commonNote,
    },
    Gold: {
      label: "Gold",
      bullets: [
        "Incluye notificaciones, alertas y seminarios de actualización tecnológica.",
        "Instalación de parches y hotfixes cuando aplique.",
        "Actualización a nuevas versiones.",
        "Soporte por email y teléfono.",
        "Soporte remoto.",
        "Mantenimiento preventivo.",
        "Soporte en sitio para incidencias críticas.",
        "Horario 5x8 lunes a viernes.",
        "Tiempo máximo por criticidad: 2 horas.",
        "Tiempo máximo de primer contacto: 4 horas.",
        commonTicketing,
      ],
      note: commonNote,
    },
    Platinum: {
      label: "Platinum",
      bullets: [
        "Incluye notificaciones, alertas y seminarios de actualización tecnológica.",
        "Instalación de parches y hotfixes cuando aplique.",
        "Actualización a nuevas versiones.",
        "Soporte por email y teléfono.",
        "Soporte remoto.",
        "Soporte en sitio.",
        "Horario 24x7.",
        "Atención de incidencias críticas 24x7.",
        "Mantenimiento preventivo.",
        "Soporte en sitio para incidencias críticas.",
        "Instalación / reinstalación de productos.",
        "Cobertura nacional.",
        "Tiempo máximo por criticidad: 30 minutos.",
        "Tiempo máximo de primer contacto: 2 horas.",
        commonTicketing,
      ],
      note: commonNote,
    },
  };

  return scopesByPolicy[policy];
}
