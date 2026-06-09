---
title: "VLamax: La Variable Que Clasifica a los Ciclistas Antes de Que Empiece la Carrera"
subtitle: "Los equipos WorldTour miden la tasa máxima de producción de lactato porque define si un corredor puede ganar un sprint o una montaña. La ciencia detrás del número."
section: "ciencia"
date: "2026-04-24"
author: "Sofía Müller"
tags: ["VLamax", "fisiología", "glucólisis", "lactato", "WorldTour", "VO2max", "entrenamiento", "INSCYD"]
excerpt: "La VLamax mide cuánto lactato puede producir el músculo por segundo en un esfuerzo máximo. Un sprinter supera los 0.7 mmol/L/s; un escalador de Grand Tour rara vez pasa de 0.4. Ese único número reconfigura cómo los equipos planifican el entrenamiento y seleccionan roles de carrera."
coverImage: "https://images.unsplash.com/photo-1709601415546-dcd24c912e56?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "A Theory of the Metabolic Origin of 'Anaerobic Threshold' — Mader & Heck (1986)"
    url: "https://pubmed.ncbi.nlm.nih.gov/3744647/"
    type: pubmed
  - title: "Is the vLamax for Glycolysis What the VO2max is for Oxidative Phosphorylation? — Wackerhage et al. (2025)"
    url: "https://pubmed.ncbi.nlm.nih.gov/40676393/"
    type: pubmed
  - title: "VLamax Correlates Strongly With Glycolytic Performance — Clark & Macdermid (2025)"
    url: "https://pubmed.ncbi.nlm.nih.gov/40249379/"
    type: pubmed
  - title: "Reliability of the 15-s Maximal Lactate Accumulation Rate (VLamax) Test for Cycling — Harnish et al. (2023)"
    url: "https://doi.org/10.3390/physiologia3040040"
    type: doi
  - title: "INSCYD Physiological Software is Valid to Determine MLSS in Cyclists — Poffé et al. (2024)"
    url: "https://pubmed.ncbi.nlm.nih.gov/38774278/"
    type: pubmed
  - title: "Lactate Thresholds and the Simulation of Human Energy Metabolism — Frontiers in Physiology (2022)"
    url: "https://doi.org/10.3389/fphys.2022.899670"
    type: doi
  - title: "Reliability of Estimating Maximal Glycolytic Power Using VLamax: A Systematic Review — Fernandez Jarillo & Lomero-Arenas (2025)"
    url: "https://doi.org/10.47197/retos.v66.110040"
    type: doi
translationOf: "vlamax-glycolytic-capacity-cycling"
---

## El número que define quién puede ganar qué

Un escalador de la talla de un contendiente al Tour de Francia presenta una VLamax de entre 0.25 y 0.40 mmol/L/s. Un sprinter de alta velocidad supera con comodidad los 0.70 mmol/L/s. Esa diferencia de tres décimas en una unidad que la mayoría de ciclistas nunca ha oído nombrar separa a los corredores que deciden las etapas llanas en el Champs-Élysées de los que ganan en el Col de la Loze. Los equipos WorldTour como Visma-Lease a Bike, UAE Team Emirates-XRG y INEOS Grenadiers han incorporado la medición de la VLamax a sus protocolos de pretemporada precisamente porque ese único valor les dice, con una sola analítica de sangre y quince segundos de esfuerzo máximo, en qué tipo de carrera puede marcar diferencias cada corredor del plantel.

VLamax (del alemán *maximale Laktatbildungsrate*) se define como la tasa máxima a la que el músculo esquelético puede producir lactato durante un esfuerzo supramáximo de muy corta duración. La unidad es milimoles de lactato por litro de sangre por segundo (mmol/L/s). El valor no mide cuánto lactato se acumula en una carrera larga, sino qué tan rápido puede encender la glucólisis a plena potencia. Es, por analogía, lo que el VO₂max representa para el sistema oxidativo: la capacidad techo del sistema anaeróbico glucolítico.

## El modelo matemático de Mader, cuatro décadas después

Alois Mader, fisiólogo deportivo de la Universidad de Colonia, publicó en 1986 junto a Hermann Heck el artículo que sentó las bases matemáticas de toda esta área. En *A Theory of the Metabolic Origin of "Anaerobic Threshold"* (Int. J. Sports Med., PMID 3744647), Mader describió la glucólisis como un sistema regulado principalmente por la fosfofrutocinasa (PFK), enzima clave que activa el paso de fructosa-6-fosfato a fructosa-1,6-bisfosfato. El modelo establece que la PFK responde de forma sigmoidea a la concentración de ADP y AMP —productos de la hidrólisis del ATP durante el ejercicio—, lo que implica que la tasa de producción de lactato crece rápidamente al inicio de un esfuerzo máximo y alcanza su pico entre los 15 y los 30 segundos antes de declinar a medida que el pH muscular baja y la propia acidez inhibe la PFK.

La fórmula simplificada del balance de lactato en estado estacionario según el modelo de Mader puede expresarse como:

$$\dot{V}_{La_{eq}} = \frac{VLa_{max} \cdot \left(\frac{\dot{V}O_2}{\dot{V}O_{2max}}\right)^n}{1 + \left(\frac{\dot{V}O_2}{\dot{V}O_{2max}}\right)^n}$$

donde $\dot{V}_{La_{eq}}$ es la tasa de producción de lactato en equilibrio a una intensidad dada, $n$ es un exponente empírico (aproximadamente 3, reflejando la cinética sigmoide de la PFK), y el cociente $\dot{V}O_2 / \dot{V}O_{2max}$ representa la fracción de capacidad aeróbica utilizada. Lo que este modelo predice es que para una misma fracción de VO₂max, un ciclista con VLamax alta produce mucho más lactato que uno con VLamax baja. Y esa producción elevada de lactato depleta el piruvato disponible para la mitocondria, lo que simultáneamente suprime la oxidación de grasas y eleva el consumo de glucógeno.

Wackerhage, Kabasakalis, Seiler y Heck publicaron en 2025 en *Sports Medicine* (PMID 40676393) una revisión que explicitó esta analogía: si el VO₂max es el techo del sistema aeróbico, la VLamax es el techo del glucolítico. Ninguno de los dos opera de forma aislada. El rendimiento real surge de la interacción entre ambos: la potencia que un ciclista puede mantener en estado estable —el umbral de lactato— es el punto donde la tasa de producción de lactato (determinada en gran medida por la VLamax) iguala la tasa de eliminación y oxidación del lactato (que depende del VO₂max y de la masa mitocondrial).

## Cómo se mide: quince segundos y un lactatómetro

El test de VLamax consiste en un esfuerzo supramáximo de 10 a 20 segundos —habitualmente 15 s— realizado en ergómetro a cadencia constante. El corredor llega al test con las piernas descansadas y una muestra de lactato capilar basal tomada en reposo. Inmediatamente después del sprint se recogen muestras de sangre cada minuto durante cuatro a seis minutos para identificar el pico de lactato. La VLamax se calcula a partir de la diferencia entre el pico de lactato y el valor basal, dividida por el tiempo efectivo de trabajo glucolítico (tiempo total menos el tiempo aláctico aproximado de 5-7 s correspondiente a la fase de creatina fosfato).

$$VLa_{max} = \frac{[La]_{peak} - [La]_{rest}}{t_{glycolytic}}$$

donde $t_{glycolytic} = t_{sprint} - t_{alactic}$. La sencillez del test es uno de sus puntos fuertes: solo requiere un cicloergómetro, una lanceta y un analizador portátil de lactato. Harnish, Swensen y King (2023) evaluaron la fiabilidad del test en 30 ciclistas (18 hombres y 12 mujeres) durante dos sesiones separadas por una semana, publicando sus resultados en *Physiologia* (DOI: 10.3390/physiologia3040040). El coeficiente de variación de la potencia del sprint fue aceptable (~5%), pero el de la propia VLamax resultó moderado (CV = 18.6%). Las principales fuentes de variación fueron el lactato basal (CV = 45.6%) y el tiempo aláctico (CV = 38.3%), dos elementos que dependen de la preparación del corredor y la estandarización del protocolo. La revisión sistemática de Fernandez Jarillo y Lomero-Arenas (2025), publicada en *Retos* (DOI: 10.47197/retos.v66.110040), analizó ocho estudios y encontró coeficientes de correlación intraclase entre 0.66 y 0.96, una horquilla amplia que refleja que la fiabilidad del test es muy sensible al rigor del protocolo de aplicación.

<ChartBar
  title="Perfil VLamax por especialidad de ciclista (valores de referencia)"
  caption="Valores orientativos basados en datos publicados por INSCYD y equipos WorldTour. Fuente: Weber (INSCYD) y literatura aplicada."
  data={[
    { especialidad: "Sprinter puro", vlamax: 0.80 },
    { especialidad: "Clásicómano / Puncheur", vlamax: 0.55 },
    { especialidad: "Breakaway / Rodador", vlamax: 0.45 },
    { especialidad: "Escalador / GC", vlamax: 0.32 },
    { especialidad: "Contrarrelojista puro", vlamax: 0.28 }
  ]}
  xKey="especialidad"
  bars={[{ key: "vlamax", color: "#7C3AED", name: "VLamax (mmol/L/s)" }]}
  unit=" mmol/L/s"
  layout="vertical"
/>

## El software que lo popularizó: INSCYD

Sebastian Weber, entrenador alemán que trabajó con Peter Sagan, Tony Martin e Ivan Basso, desarrolló el sistema INSCYD precisamente para industrializar la aplicación del modelo de Mader a la práctica deportiva. El protocolo INSCYD incluye cuatro esfuerzos a máxima intensidad con duraciones de 20 s, 3 min, 6 min y 10-12 min; el sprint de 20 segundos sirve para derivar la VLamax, mientras que los esfuerzos más largos permiten calcular el VO₂max y los umbrales. Con estos seis valores de entrada el software resuelve el sistema de ecuaciones del modelo de Mader y entrega un perfil metabólico completo: tasa de oxidación de grasas a cada intensidad (FatMax), potencia en el umbral de lactato, equivalente al MLSS, consumo de carbohidratos por hora y VLamax.

Poffé, Van Dael y Van Schuylenbergh (2024) validaron este enfoque en un estudio con 22 ciclistas (11 hombres, 11 mujeres), publicado en *Frontiers in Sports and Active Living* (PMID 38774278). La correlación de Pearson entre el MLSS medido experimentalmente y el calculado por INSCYD fue de r = 0.992 (p < 0.001) para la muestra completa. La diferencia media fue de 4.6 W en hombres, dentro del error típico del MLSS experimental. Los autores concluyeron que el software puede sustituir los laboriosos tests escalonados de MLSS, siempre que el protocolo de medición de VLamax y VO₂max sea riguroso. La limitación principal del estudio es su tamaño de muestra reducido y la ausencia de atletas de élite de primer nivel entre los participantes.

## Lo que el cociente VLamax/VO₂max revela sobre el rol de un corredor

La interacción entre VLamax y VO₂max determina tres capacidades distintas que el ciclismo de carretera exige en momentos diferentes. Un escalador de Grand Tour necesita un VO₂max muy alto y una VLamax baja para poder pedalear a una fracción elevada de su VO₂max durante horas sin acumular lactato de forma progresiva. Un sprinter necesita la VLamax más alta posible para generar una potencia anaeróbica punta brutal en los últimos 200 metros, aunque ese mismo valor alto garantiza que acumulará lactato rápidamente si intenta aguantar una escapada durante 20 minutos. Un puncheur como un clásicómano de Flandes o Lieja vive en el espacio intermedio: necesita suficiente VLamax para explosionar en el Mur de Huy, pero no tanta como para vaciarse de glucógeno tres horas antes de llegar.

Clark y Macdermid (2025) cuantificaron la relación entre VLamax y rendimiento glucolítico en 11 ciclistas de nivel nacional-internacional (VO₂max medio de 70.7 ± 5.9 mL/kg/min) en *Research Quarterly for Exercise and Sport* (PMID 40249379). Encontraron correlaciones de r = 0.83 (p = 0.002) entre VLamax y la potencia media absoluta en el sprint de 15 s, y de r = 0.88 (p = 0.0004) para la potencia media relativa. La correlación se debilitaba pero seguía siendo significativa en esfuerzos de un minuto. El estudio, con su muestra pequeña, confirma que VLamax predice bien el rendimiento glucolítico corto, aunque los autores advierten que la métrica per se ofrece información adicional limitada respecto a simplemente usar la potencia punta del sprint.

<ChartLine
  title="Relación entre VLamax y umbral de lactato (% VO₂max)"
  caption="Simulación basada en el modelo de Mader-Heck. Muestra cómo una VLamax alta desplaza el umbral hacia intensidades menores del VO₂max."
  data={[
    { vlamax: "0.20", umbral_pct: 88 },
    { vlamax: "0.30", umbral_pct: 84 },
    { vlamax: "0.40", umbral_pct: 79 },
    { vlamax: "0.50", umbral_pct: 74 },
    { vlamax: "0.60", umbral_pct: 68 },
    { vlamax: "0.70", umbral_pct: 62 },
    { vlamax: "0.80", umbral_pct: 56 }
  ]}
  xKey="vlamax"
  lines={[
    { key: "umbral_pct", color: "#7C3AED", name: "Umbral de lactato (% VO₂max)" }
  ]}
  unit="%"
/>

## Cómo el entrenamiento modifica la VLamax

La VLamax no es fija. A diferencia del VO₂max, que responde de forma más lenta a estímulos de entrenamiento a largo plazo, la VLamax puede modificarse en semanas con los estímulos correctos, aunque la evidencia directa de ensayos controlados es todavía escasa. El mecanismo propuesto para reducirla pasa por aumentar la capacidad oxidativa mitocondrial: más mitocondrias implican mayor capacidad para oxidar el piruvato en lugar de convertirlo en lactato, lo que reduce la tasa neta de acumulación de lactato incluso cuando la glucólisis trabaja a alta intensidad. El entrenamiento en zona 2 —pedaleo a baja intensidad sostenido durante 60-180 minutos por sesión— es el estímulo que los entrenadores del WorldTour asocian con una reducción progresiva de la VLamax a lo largo de la pretemporada.

Para elevar la VLamax, la lógica fisiológica apunta en la dirección opuesta: se necesitan estímulos que activen repetidamente la vía glucolítica a máxima potencia. Los sprints repetidos de 10-20 segundos con recuperación completa, los esfuerzos supramáximos con deuda de oxígeno alta y la fuerza máxima en piernas son los métodos que mayor efecto tienen sobre la densidad enzimática de la glucólisis, en particular sobre la actividad de la PFK y la glucógeno fosforilasa. El riesgo para un ciclista de fondo que incorpora demasiado trabajo de alta intensidad sin suficiente base aeróbica es desplazar la VLamax hacia arriba, lo que eleva el piso de producción de lactato a toda intensidad y comprime el umbral hacia abajo, degradando exactamente la métrica que más impacta en el rendimiento sobre largas distancias.

## La aplicación práctica para el ciclista promedio

La VLamax no es solo una herramienta de equipos con presupuesto de 30 millones de euros. Un lactatómetro de calidad cuesta menos de 500 euros y los test se pueden realizar en cualquier rodillo con medición de potencia. El protocolo importa más que el equipamiento. El corredor debe llegar al test con al menos 48 horas sin trabajo intenso, debe estandarizar la cafeína y la alimentación previa, y debe garantizar que el lactato basal está por debajo de 1.5 mmol/L antes de iniciar el sprint. La interpretación de los resultados requiere repetir el test dos veces con las mismas condiciones para tener confianza en el valor, dado el coeficiente de variación descrito por Harnish et al. Un resultado único tiene un margen de error suficiente como para dar perfiles equivocados.

Desde el punto de vista del entrenamiento, conocer la VLamax propia permite responder preguntas concretas. Si un ciclista tiene una VLamax de 0.55 y un VO₂max de 68 mL/kg/min, el modelo de Mader predice que su umbral de lactato se sitúa alrededor del 70-73% del VO₂max. Si ese mismo ciclista reduce su VLamax a 0.40 manteniendo el VO₂max constante —algo alcanzable con un bloque de doce semanas de volumen en zona baja—, el modelo predice un umbral desplazado hacia el 78-80% del VO₂max. Esa mejora de cinco a ocho puntos porcentuales en el umbral relativo puede traducirse en 25-40 W adicionales de potencia sostenible en una subida larga sin ningún cambio en el motor aeróbico.

## Las limitaciones que la ciencia todavía no ha resuelto

La VLamax tiene adherentes entusiastas y críticos legítimos dentro de la fisiología del ejercicio. El principal argumento crítico es que el test de 15 segundos captura la tasa de acumulación de lactato en sangre periférica, no directamente el flujo glucolítico intramuscular. Entre ambas magnitudes existen pasos intermedios —transporte de lactato fuera de la célula muscular, equilibración con el torrente sanguíneo, cinética de distribución— que introducen variabilidad no controlada. Además, la cadencia elegida para el sprint afecta el valor resultante: a cadencias más altas, la demanda de oxígeno por vatio aumenta y el pico de lactato puede subestimarse si no se ajusta el protocolo. El artículo de Wackerhage et al. (2025) plantea que la VLamax todavía carece de validación suficiente como estimador preciso del flujo glucolítico, aunque concluye que es la mejor herramienta accesible en campo para aproximarse a ese parámetro.

El tamaño de muestra de los estudios disponibles es otra limitación transversal. Casi ninguno supera los 25 participantes, y los datos en ciclistas de élite WorldTour son escasos en la literatura abierta porque los equipos no publican sus datos internos. La figura del entrenador con acceso a estos valores —como Mathieu Heijboer de Visma-Lease a Bike, quien ha hablado públicamente del uso de VLamax en su plantel— habla de una adopción de práctica que va por delante de la validación científica formal. No es una situación inusual en el ciclismo de alta competición, donde la ciencia aplicada avanza más rápido que los ensayos controlados.

## Por qué los equipos ya no pueden ignorarla

El VLamax ha pasado de concepto de laboratorio a herramienta de selección de corredores porque responde una pregunta que el VO₂max solo no puede responder: dado que este corredor tiene un motor aeróbico de determinado tamaño, ¿qué tipo de esfuerzos puede hacer de forma repetida sin destruir su capacidad de recuperarse para el día siguiente? Un corredor con VO₂max de 80 mL/kg/min y VLamax de 0.65 puede ganar llegadas reducidas pero no puede escalar Alpe d'Huez en cabeza de carrera. Ese mismo VO₂max con VLamax de 0.30 produce un perfil de escalador puro que se vacía antes de llegar al final de un sprint de 200 m. El cociente entre ambos no es un diagnóstico de calidad, es un mapa de especialización fisiológica.

Para el ciclista amateur que entrena con medidor de potencia, conocer la propia VLamax añade una dimensión que los datos de potencia solos no dan. Saber si la limitación en la subida larga viene de un VO₂max bajo o de una VLamax alta que comprime el umbral dirige el entrenamiento hacia estímulos distintos. No es una métrica para monitorizar cada mes, pero una medición anual al inicio de la temporada y otra al término de un bloque de volumen puede cuantificar si la base aeróbica construida ha desplazado el perfil metabólico en la dirección deseada.
