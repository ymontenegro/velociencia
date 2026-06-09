---
title: "Bicarbonato de sodio en ciclismo: el buffer que retrasa la acidosis muscular"
subtitle: "Con 0.3 g/kg en el timing correcto, el NaHCO₃ puede recortar 54 segundos en una contrarreloj de 40 km — y las nuevas formulaciones en hidrogel eliminan el principal obstáculo: los efectos gastrointestinales"
section: "nutricion"
date: "2026-04-24"
author: "Martín Velasco"
tags: ["bicarbonato de sodio", "NaHCO3", "acidosis", "buffer", "suplementación", "ciclismo", "rendimiento"]
excerpt: "Un meta-análisis específico en ciclismo y tres estudios de 2024 con formulaciones en hidrogel confirman que el bicarbonato de sodio mejora el rendimiento en esfuerzos de 1 a 10 minutos. La clave está en la dosis, el timing individualizado y la forma de administración."
coverImage: "https://images.unsplash.com/photo-1704650311140-aba27da8623d?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "International Society of Sports Nutrition position stand: sodium bicarbonate and exercise performance"
    url: "https://pubmed.ncbi.nlm.nih.gov/34503527/"
    type: pubmed
  - title: "Acute effects of sodium bicarbonate ingestion on cycling time-trial performance: A systematic review and meta-analysis"
    url: "https://pubmed.ncbi.nlm.nih.gov/35633035/"
    type: pubmed
  - title: "The effect of sodium bicarbonate mini-tablets ingested in a carbohydrate hydrogel system on 40 km cycling time trial performance"
    url: "https://pubmed.ncbi.nlm.nih.gov/39068627/"
    type: pubmed
  - title: "The Effects of a Novel Sodium Bicarbonate Ingestion System on Repeated 4 km Cycling Time Trial Performance in Well-Trained Male Cyclists"
    url: "https://pubmed.ncbi.nlm.nih.gov/39122982/"
    type: pubmed
  - title: "The Effects of a Carbohydrate Hydrogel System for the Delivery of Bicarbonate Mini-Tablets on Acid–Base Buffering and Gastrointestinal Symptoms"
    url: "https://pubmed.ncbi.nlm.nih.gov/38356036/"
    type: pubmed
  - title: "Effects of acute and multi-day low-dose sodium bicarbonate intake on high-intensity endurance exercise performance in male recreational cyclists"
    url: "https://pubmed.ncbi.nlm.nih.gov/38421429/"
    type: pubmed
  - title: "Enhancing exercise performance and recovery through sodium bicarbonate supplementation: introducing the ingestion recovery framework"
    url: "https://pubmed.ncbi.nlm.nih.gov/39177769/"
    type: pubmed
  - title: "Sodium bicarbonate and beta-alanine supplementation: Is combining both better than either alone? A systematic review and meta-analysis"
    url: "https://pubmed.ncbi.nlm.nih.gov/38952910/"
    type: pubmed
translationOf: "sodium-bicarbonate-cycling"
---

## Cincuenta y cuatro segundos en 40 kilómetros

Shannon y colaboradores publicaron en 2024 en el *European Journal of Applied Physiology* un ensayo cruzado con 14 ciclistas entrenados donde el bicarbonato de sodio mejoró el rendimiento en una contrarreloj de 40 kilómetros en un promedio de 54.14 segundos (± 18.16 s; p = 0.002). La mejora vino acompañada de un incremento de 5.6 mmol/L en la concentración de bicarbonato plasmático antes del ejercicio, lo que confirma que el mecanismo fisiológico funcionó según lo esperado. El protocolo usó minitabletas de NaHCO₃ dentro de un sistema de hidrogel de carbohidratos, y no registró diferencias en síntomas gastrointestinales respecto al placebo. Para un ciclista que combate décimas de segundo en una contrarreloj, 54 segundos es una cifra que llama la atención.

El bicarbonato de sodio lleva más de 90 años en la literatura científica del deporte, pero en los últimos dos años ha vuelto a la agenda de la nutrición de alto rendimiento. La irrupción de formulaciones que resuelven su mayor problema práctico —los efectos gastrointestinales— ha renovado el interés de equipos profesionales y, con ello, la investigación en ciclismo específicamente. Entender cuándo funciona, cuándo no y cómo se toma correctamente requiere leer la evidencia reciente con cuidado.

## Cómo el bicarbonato frena la caída del pH muscular

Durante un esfuerzo de alta intensidad —un ataque en un puerto, una persecución de 4 kilómetros, una serie de intervalos 30/30—, el músculo produce iones de hidrógeno (H⁺) como subproducto del metabolismo anaeróbico. La acumulación de H⁺ reduce el pH intracelular, interfiere con la contracción muscular y, en última instancia, provoca la caída de potencia que los ciclistas experimentan como "tocar la pared" en un sprint sostenido. El sistema tampón más importante para compensar esta acidosis en el espacio extracelular es el bicarbonato plasmático (HCO₃⁻).

Ingerir NaHCO₃ eleva artificialmente la reserva de bicarbonato en sangre antes del esfuerzo. Según la posición oficial de la International Society of Sports Nutrition liderada por Grgic y colaboradores (2021) en el *Journal of the International Society of Sports Nutrition*, dosis de entre 0.2 y 0.5 g/kg de masa corporal producen una alcalosis metabólica transitoria que amplía la capacidad de tamponamiento extracelular. El mecanismo es bidireccional: el HCO₃⁻ en sangre capta los H⁺ que se exportan desde el músculo, y el CO₂ resultante se elimina por ventilación pulmonar. El resultado práctico es que el pH muscular se mantiene en rangos más funcionales durante más tiempo, retrasando el inicio de la fatiga en esfuerzos donde la acidosis es el factor limitante primario.

<ChartLine
  title="Concentración de bicarbonato plasmático tras 0.3 g/kg de NaHCO₃"
  caption="Curva representativa basada en Gurton et al. (2024) y Shannon et al. (2024). La franja sombreada indica la ventana óptima de esfuerzo (60-180 min post-ingesta)."
  data={[
    { tiempo: "0 min", bicarbonato: 24.5 },
    { tiempo: "30 min", bicarbonato: 26.0 },
    { tiempo: "60 min", bicarbonato: 28.5 },
    { tiempo: "90 min", bicarbonato: 30.2 },
    { tiempo: "120 min", bicarbonato: 30.8 },
    { tiempo: "150 min", bicarbonato: 29.5 },
    { tiempo: "180 min", bicarbonato: 28.0 },
    { tiempo: "210 min", bicarbonato: 26.5 },
    { tiempo: "240 min", bicarbonato: 25.5 },
  ]}
  xKey="tiempo"
  lines={[
    { key: "bicarbonato", color: "#0D9488", name: "HCO₃⁻ plasmático" },
  ]}
  unit=" mmol/L"
/>

## La dosis que funciona: 0.3 g/kg como punto de referencia

La posición de la ISSN establece que el rango eficaz se sitúa entre 0.2 y 0.5 g/kg, con el mayor cuerpo de evidencia concentrado en 0.3 g/kg. Para un ciclista de 70 kilogramos, eso equivale a 21 gramos de bicarbonato —aproximadamente cuatro cucharaditas rasas— antes de cada sesión o competición relevante. Dosis inferiores a 0.2 g/kg generalmente no alcanzan el umbral de alcalosis necesario para producir un efecto ergogénico consistente; dosis cercanas a 0.5 g/kg ofrecen el máximo efecto buffer pero también incrementan de forma marcada la probabilidad y severidad de los efectos gastrointestinales, por lo que la mayor parte de la evidencia práctica se concentra en el subrango 0.2-0.4 g/kg.

Lopes-Silva y Correia-Oliveira (2023) publicaron en el *European Journal of Sport Science* el primer meta-análisis centrado exclusivamente en contrarrelojes ciclistas, analizando ensayos controlados aleatorizados con suplementación de NaHCO₃ versus placebo. Sus resultados confirmaron un beneficio estadísticamente significativo del NaHCO₃ sobre el rendimiento en contrarreloj ciclista. La especificidad del análisis en ciclismo —y no en una mezcla de deportes— lo convierte en una referencia especialmente relevante para interpretar la utilidad del suplemento en este deporte.

## El timing es tan importante como la dosis

El bicarbonato de sodio no alcanza su concentración máxima en sangre de forma inmediata. Según el marco de ingesta-recuperación propuesto por Gurton y colaboradores (2024) en el *European Journal of Applied Physiology*, el pico de alcalosis metabólica se produce en una ventana que típicamente oscila entre 60 y 180 minutos tras la ingesta, con alta variabilidad interindividual. Esto significa que dos ciclistas que toman la misma dosis al mismo tiempo pueden llegar al inicio del esfuerzo con concentraciones de HCO₃⁻ muy distintas. El ciclista que entra en la crono exactamente en su pico alcalótico obtiene el máximo beneficio; quien compite demasiado pronto o demasiado tarde ve el efecto amortiguado.

La estrategia de individualización del timing —probar en entrenamiento cuándo se alcanza el pico personal— aparece consistentemente en los estudios con mejores resultados. Shannon et al. (2024) utilizaron un protocolo donde cada ciclista determinó su propio tiempo al pico de bicarbonato en una sesión previa, y los administraron la suplementación de forma personalizada entre 90 y 240 minutos antes del esfuerzo. Esta es la diferencia entre tomar bicarbonato "como dice el bote" y optimizar su uso de verdad.

## Qué esfuerzos se benefician y cuáles no

La evidencia converge en que el NaHCO₃ produce su mayor efecto ergogénico en esfuerzos de alta intensidad que duran entre 1 y 10 minutos, donde la contribución del metabolismo anaeróbico láctico es máxima y la acidosis muscular es el factor limitante principal. En ciclismo, esto incluye las persecuciones en pista, los finales de subida de 3 a 8 minutos, los ataques explosivos y, especialmente, las series de intervalos repetidos de alta intensidad separadas por recuperaciones parciales. Grgic et al. (2021) en la posición de la ISSN clasificaron la evidencia para ciclismo de alta intensidad como de calidad moderada, lo que en términos prácticos significa que el efecto es real pero su magnitud varía entre individuos.

Gurton et al. (2024) identificaron que el escenario donde el bicarbonato muestra mayor utilidad estratégica es precisamente cuando el atleta compite en múltiples esfuerzos con recuperaciones de 30 a 90 minutos entre ellos —exactamente el patrón de una contrarreloj por equipos, una persecución por rondas o una competición de omnium en pista. En estas condiciones, el bicarbonato actúa tanto en el primer esfuerzo como acelerando la recuperación ácido-base entre intentos. Para rodajes aeróbicos largos a intensidad submáxima, donde el sistema oxidativo gestiona la mayor parte de la demanda energética, el beneficio es marginal o inexistente: el NaHCO₃ no mejora la eficiencia aeróbica ni la economía de pedaleo.

## El talón de Aquiles: los efectos gastrointestinales

La mayor barrera para el uso del bicarbonato de sodio no es su precio ni su disponibilidad, sino su impacto gastrointestinal. Aktitiz y colaboradores (2024) en el *European Journal of Applied Physiology* documentaron que el 33% de los ciclistas experimentaron diarrea y distensión abdominal con una dosis aguda estándar, y eso con tan solo 0.2 g/kg —no los 0.3 g/kg habitualmente recomendados. Los síntomas incluyen náuseas, retortijones, urgencia defecatoria y vómitos en los casos más graves, y pueden aparecer entre 30 y 90 minutos tras la ingesta, exactamente cuando el ciclista debería estar calentando o en la salida. Una diarrea a 20 minutos de una contrarreloj importante puede ser más perjudicial para el rendimiento que cualquier beneficio fisiológico del buffer.

Los síntomas gastrointestinales del NaHCO₃ siguen un patrón dosis-dependiente y están relacionados con la reacción del bicarbonato con el ácido gástrico, que genera CO₂ en el estómago antes de que el compuesto pueda absorberse. Las estrategias que han demostrado reducir esta incidencia incluyen fraccionar la dosis en varias tomas (protocolo split) administradas con 3-4 horas de antelación, co-ingerir el bicarbonato junto a una comida con carbohidratos (~1.5 g/kg), o cambiar a protocolos de carga multi-día con dosis menores. Aktitiz et al. (2024) observaron que el protocolo multi-día de 0.2 g/kg durante cuatro días redujo los síntomas al 16.7% con molestias leves únicamente en los días de suplementación, no en el día del esfuerzo.

## Las formulaciones en hidrogel cambian la ecuación

En 2024 se publicaron dos ensayos controlados que evaluaron un sistema de minitabletas de NaHCO₃ embebidas en un hidrogel de carbohidratos —el Maurten Bicarb System— específicamente diseñado para eludir el problema gastrointestinal. Gough y Sparks (2024) documentaron en *Sports Medicine - Open* que este sistema reduce la molestia gastrointestinal agregada en 79 unidades arbitrarias (p < 0.001) respecto a la administración tradicional en cápsulas vegetarianas, eliminando la diarrea de forma completa. El mecanismo propuesto es que las minitabletas —de 3 mm de diámetro— atraviesan el píloro directamente sin disolverse en el estómago, donde el NaHCO₃ generaría CO₂ al reaccionar con el ácido clorhídrico.

Los resultados de rendimiento con esta formulación son los más sólidos publicados hasta la fecha en ciclismo. Shannon et al. (2024) documentaron la mejora de 54.14 segundos en 40 kilómetros sin diferencias en síntomas GI respecto al placebo. Gough y Sparks (2024) en un segundo estudio publicado en *Sports Medicine* reportaron que el mismo sistema mejoró la primera contrarreloj de 4 kilómetros en 5.1 segundos (1.6%) y la segunda, separada por 45 minutos de recuperación, en 4.4 segundos, también con mínima sintomatología gastrointestinal. El efecto sobre la recuperación del equilibrio ácido-base entre esfuerzos —documentado por las mediciones de pH y lactato post-esfuerzo— sugiere que el bicarbonato no solo actúa durante el ejercicio sino que acelera el retorno al estado basal para el siguiente intento.

## Protocolos comparados: qué usar según el contexto

| Protocolo | Dosis | Timing pre-esfuerzo | Ventajas | Limitaciones |
|-----------|-------|---------------------|---------|-------------|
| Dosis aguda estándar (polvo/cápsulas) | 0.3 g/kg | 60-90 min | Simple, económico | ~33% con síntomas GI moderados o severos |
| Carga split (3-4 tomas fraccionadas) | 0.3 g/kg total | 3-4 h antes | Reduce frecuencia de síntomas GI | Requiere anticipación logística |
| Multi-día baja dosis | 0.2 g/kg/día x 4 días | Última toma el día del esfuerzo | Solo 17% con síntomas leves (ninguno el día del esfuerzo) | Eficacia algo menor que 0.3 g/kg agudo |
| Minitabletas en hidrogel | 0.3 g/kg | 90-240 min (individualizado) | Mínimos síntomas GI, elimina diarrea | Costo elevado; requiere determinar timing personal |

## Bicarbonato frente a beta-alanina y fosfato de sodio

El NaHCO₃ actúa en el espacio extracelular; la beta-alanina actúa en el intracelular. La carnosina muscular que genera la suplementación crónica con beta-alanina (3.2-6.4 g/día durante 4-12 semanas) tamponea el H⁺ directamente dentro del músculo, mientras que el bicarbonato lo capta en la sangre cuando sale de la célula. Curran-Bowen y colaboradores (2024) publicaron en *Biology of Sport* un meta-análisis de 10 estudios (243 participantes) que encontró que la combinación de ambos produce un efecto significativamente mayor (SMD = 0.32; p = 0.02) que cada suplemento por separado, donde ninguno de los dos resultó estadísticamente significativo de forma aislada en ese análisis. La sinergia es fisiológicamente coherente: atacan la acidosis desde dos compartimentos diferentes.

El fosfato de sodio opera por un mecanismo distinto: incrementa las concentraciones de 2,3-difosfoglicerato en los eritrocitos, favoreciendo la entrega de oxígeno al músculo. Su utilidad es más clara para el rendimiento aeróbico que para la capacidad anaeróbica, y la evidencia en ciclismo es más heterogénea —un estudio de 2023 no encontró mejoras en contrarrelojes de 30 kilómetros con dosis estándar. A diferencia del bicarbonato, que tiene un efecto agudo medible con una sola dosis, el fosfato de sodio requiere una carga de 3-6 días (50 mg/kg/día) y sus resultados son menos consistentes entre estudios.

| Suplemento | Mecanismo | Dosis estándar | Tiempo hasta efecto | Mejor indicación |
|------------|-----------|----------------|---------------------|-----------------|
| Bicarbonato de sodio | Buffer extracelular (HCO₃⁻) | 0.3 g/kg agudo | 60-180 min | Esfuerzos 1-10 min, series repetidas |
| Beta-alanina | Buffer intracelular (carnosina) | 3.2-6.4 g/día | 4-12 semanas de carga | Esfuerzos 60-240 segundos |
| Fosfato de sodio | Aumento de 2,3-DPG; O₂ delivery | 50 mg/kg/día x 3-6 días | Carga de días | Eventos aeróbicos de resistencia |

## Aplicación práctica: quién debería usarlo y cuándo

El perfil de ciclista que más se beneficia del bicarbonato de sodio es el que compite o entrena en esfuerzos repetidos de alta intensidad: criteriums con sprints continuos, pruebas de ómnium, series de VO₂máx de 3-5 minutos, persecuciones en equipo o finales de etapa con subidas de 5-8 minutos. Los ciclistas de contrarreloj también son candidatos razonables, especialmente en pruebas de menos de 30 minutos donde la intensidad media es alta. Los datos de Aktitiz et al. (2024) sobre ciclistas recreativos con dosis bajas muestran que la eficacia es más consistente en ciclistas entrenados con las dosis estándar de 0.3 g/kg, lo que sugiere que la adherencia al protocolo correcto es determinante.

El punto de partida práctico es probar el protocolo en al menos dos sesiones de entrenamiento antes de usarlo en competición, para identificar la respuesta gastrointestinal personal y determinar el timing óptimo de pico alcalótico. Los efectos del bicarbonato tienen alta variabilidad interindividual —algunos ciclistas los toleran perfectamente en polvo con agua, otros necesitan la formulación en hidrogel, y un porcentaje relevante presenta síntomas gastrointestinales independientemente del protocolo. Usar el suplemento por primera vez en el día de una carrera importante es, con los datos disponibles, una apuesta de riesgo desproporcionado al potencial beneficio.
