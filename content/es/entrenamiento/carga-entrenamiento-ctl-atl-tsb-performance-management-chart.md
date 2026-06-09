---
title: "CTL, ATL y TSB: cómo leer la carga de entrenamiento sin obsesionarse con los números"
subtitle: "El modelo impulso-respuesta de Banister cumple más de cincuenta años. Qué miden realmente estas métricas, qué no miden, y por qué el número más importante siempre será cómo te sientes"
section: "entrenamiento"
date: "2026-05-24"
author: "Tomás Herrera"
tags: ["carga de entrenamiento", "CTL", "ATL", "TSB", "Performance Management Chart", "TRIMP", "TSS", "periodización"]
sources:
  - title: "Busso T, Candau R, Lacour JR. Fatigue and fitness modelled from the effects of training on performance. Eur J Appl Physiol Occup Physiol. 1994;69(1):50-4."
    url: "https://pubmed.ncbi.nlm.nih.gov/7957156/"
    type: pubmed
  - title: "Foster C. Monitoring training in athletes with reference to overtraining syndrome. Med Sci Sports Exerc. 1998;30(7):1164-8."
    url: "https://pubmed.ncbi.nlm.nih.gov/9662690/"
    type: pubmed
  - title: "Busso T. Variable dose-response relationship between exercise training and performance. Med Sci Sports Exerc. 2003;35(7):1188-95."
    url: "https://pubmed.ncbi.nlm.nih.gov/12840641/"
    type: pubmed
  - title: "Gabbett TJ. The training-injury prevention paradox: should athletes be training smarter and harder? Br J Sports Med. 2016;50(5):273-80."
    url: "https://pubmed.ncbi.nlm.nih.gov/26758673/"
    type: pubmed
  - title: "Bourdon PC, Cardinale M, Murray A, et al. Monitoring Athlete Training Loads: Consensus Statement. Int J Sports Physiol Perform. 2017;12(Suppl 2):S2161-S2170."
    url: "https://pubmed.ncbi.nlm.nih.gov/28463642/"
    type: pubmed
  - title: "Impellizzeri FM, Tenan MS, Kempton T, Novak A, Coutts AJ. Acute:Chronic Workload Ratio: Conceptual Issues and Fundamental Pitfalls. Int J Sports Physiol Perform. 2020;15(6):907-913."
    url: "https://pubmed.ncbi.nlm.nih.gov/32502973/"
    type: pubmed
  - title: "Coggan A. The Science of the TrainingPeaks Performance Manager. TrainingPeaks Blog, 2003 (rev. 2019)."
    url: "https://www.trainingpeaks.com/learn/articles/the-science-of-the-performance-manager/"
    type: web
excerpt: "El Performance Management Chart —CTL, ATL y TSB— es la traducción práctica del modelo impulso-respuesta de Banister (1975). Cincuenta años después, la evidencia confirma su utilidad como brújula de planificación, pero también sus límites: son promedios de promedios que capturan carga externa, no el estrés fisiológico real. Este artículo explica la matemática, los rangos validados y los errores más comunes al interpretarlos."
coverImage: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
translationOf: "training-load-ctl-atl-tsb-performance-management-chart"
---

## El modelo que cumple cincuenta años y sigue vigente

En 1975, Eric Banister y sus colaboradores publicaron en la *Australian Journal of Sports Medicine* una propuesta que entonces parecía más ingeniería de control que fisiología del ejercicio: modelar el rendimiento humano como la diferencia entre dos señales exponenciales opuestas. La primera representaba la adaptación positiva al entrenamiento —lo que hoy llamamos condición o fitness—. La segunda representaba la fatiga acumulada. El rendimiento, según el modelo, era simplemente la adaptación menos la fatiga en cada momento del tiempo. Banister bautizó el método como "modelo impulso-respuesta", y su fórmula, aunque refinada varias veces, sigue siendo la base matemática del Performance Management Chart que aparece en TrainingPeaks, WKO, Garmin Connect y docenas de aplicaciones de entrenamiento.

Busso, Candau y Lacour publicaron en 1994 en el *European Journal of Applied Physiology* una de las primeras validaciones cuantitativas del modelo aplicado a datos reales de un lanzador de martillo a lo largo de una temporada. Sus resultados mostraron que la correlación entre el rendimiento predicho por el modelo y el rendimiento real alcanzaba r = 0.96 con solo diecinueve observaciones (PMID 7957156). El ajuste era bueno, pero la muestra pequeña ya apuntaba a un problema que persiste hasta hoy: el modelo es matemáticamente elegante y útil como marco conceptual, pero sus parámetros son individuales, variables en el tiempo y dependientes de cómo se cuantifique el "impulso" de entrenamiento en primer lugar.

## De TRIMP a TSS: cómo se mide el estrés de una sesión

El modelo de Banister necesita una entrada: una unidad que cuantifique cuánto estrés representa cada sesión. Banister propuso el TRIMP (*Training Impulse*), calculado como la duración de la sesión multiplicada por un factor ponderado de frecuencia cardíaca. La idea era capturar tanto el volumen como la intensidad en un único número. Para una sesión de tres horas en Zona 2 (55-75 % del FTP en términos de potencia), el TRIMP es relativamente bajo. Para un intervalo de cuarenta minutos con series en Zona 5 (106-120 % del FTP), el TRIMP se dispara por el peso que la fórmula asigna a las frecuencias cardíacas elevadas. El TRIMP es una medida de carga interna —refleja la respuesta fisiológica del organismo— y está publicado en decenas de estudios revisados por pares.

El TSS (*Training Stress Score*) es una derivación más reciente, desarrollada por Andrew Coggan y popularizada por TrainingPeaks. A diferencia del TRIMP, el TSS se construye a partir de potencia: una hora al umbral funcional (FTP, Zona 4, 91-105 % del FTP) equivale a 100 puntos de TSS. La fórmula es $TSS = \frac{t \cdot NP \cdot IF}{FTP \cdot 3600} \times 100$, donde $NP$ es la potencia normalizada, $IF$ es el factor de intensidad y $t$ es la duración en segundos. Es importante aclarar que el TSS no es una métrica revisada por pares en el sentido académico tradicional: es una construcción propietaria de TrainingPeaks, útil y ampliamente adoptada, pero cuya relación con el estrés fisiológico real depende de que el FTP esté bien establecido y de que la potencia sea el principal limitante de la sesión. Para trabajo técnico, de fuerza o en condiciones de calor extremo, el TSS puede infravalorar significativamente la carga real.

## La matemática del Performance Management Chart

Con una medida de carga diaria en mano —sea TRIMP, TSS u otra métrica de carga— el Performance Management Chart aplica dos medias móviles exponenciales con distintas constantes temporales. La CTL (*Chronic Training Load*, carga crónica) es la media móvil exponencial de los últimos 42 días. La ATL (*Acute Training Load*, carga aguda) es la media móvil exponencial de los últimos 7 días. El TSB (*Training Stress Balance*, balance de entrenamiento) es simplemente la diferencia: $TSB = CTL - ATL$.

La constante de 42 días para la CTL refleja el tiempo aproximado en que las adaptaciones fisiológicas positivas al entrenamiento de resistencia —cambios en el volumen mitocondrial, en la densidad capilar, en la economía de movimiento— se acumulan y se estabilizan, según el marco conceptual de Banister. Los 7 días de la ATL representan la ventana temporal en que la fatiga aguda de una carga elevada sigue siendo palpable en el rendimiento. Ambas constantes son estimaciones conceptuales, no valores derivados de un estudio clínico específico: el propio Coggan lo reconoce en la documentación de TrainingPeaks. Busso (2003), en *Medicine & Science in Sports & Exercise*, demostró matemáticamente que las constantes temporales óptimas varían entre individuos y entre períodos de entrenamiento (PMID 12840641), lo que limita la aplicabilidad universal de las constantes fijas de 42 y 7 días.

Cuando la ATL supera a la CTL, el TSB es negativo: el ciclista está más fatigado que adaptado. Cuando la CTL supera a la ATL —típicamente tras un período de recuperación o tapering—, el TSB es positivo: el atleta está descansado y la forma debería ser buena. En la práctica, un TSB entre −10 y −30 es habitual durante bloques de carga. Un TSB entre +5 y +25 en el día de la carrera es el objetivo de una buena puesta a punto.

<ChartLine
  title="CTL, ATL y TSB en un bloque de entrenamiento de 12 semanas"
  caption="Esquema ilustrativo del Performance Management Chart: construcción de carga (semanas 1-10) y tapering (semanas 11-12). Valores en unidades de TSS/día."
  data={[
    { x: "Sem 1", ctl: 62, atl: 70, tsb: -8 },
    { x: "Sem 2", ctl: 65, atl: 78, tsb: -13 },
    { x: "Sem 3", ctl: 68, atl: 85, tsb: -17 },
    { x: "Sem 4", ctl: 65, atl: 55, tsb: 10 },
    { x: "Sem 5", ctl: 68, atl: 75, tsb: -7 },
    { x: "Sem 6", ctl: 72, atl: 88, tsb: -16 },
    { x: "Sem 7", ctl: 76, atl: 95, tsb: -19 },
    { x: "Sem 8", ctl: 73, atl: 58, tsb: 15 },
    { x: "Sem 9", ctl: 78, atl: 90, tsb: -12 },
    { x: "Sem 10", ctl: 82, atl: 100, tsb: -18 },
    { x: "Sem 11", ctl: 79, atl: 68, tsb: 11 },
    { x: "Sem 12", ctl: 76, atl: 55, tsb: 21 }
  ]}
  xKey="x"
  lines={[
    { key: "ctl", color: "#0891B2", name: "CTL (condición)" },
    { key: "atl", color: "#E11D48", name: "ATL (fatiga)" },
    { key: "tsb", color: "#64748B", name: "TSB (forma)" }
  ]}
  unit=""
/>

## La rampa de CTL: cuánto construir por semana

La CTL sube lentamente, exactamente como la condición física real. Un ciclista que comienza una temporada con una CTL de 40 TSS/día no puede alcanzar 80 en tres semanas sin consecuencias. La tasa de incremento semanal recomendada —lo que en la jerga de TrainingPeaks se denomina "ramp rate"— oscila habitualmente entre 3 y 8 puntos de CTL por semana para ciclistas intermedios y avanzados. Subir más de 8 puntos semanales de forma sostenida durante varias semanas consecutivas se asocia con fatiga acumulada difícil de gestionar, mayor riesgo de lesión por sobreuso y, paradójicamente, estancamiento del rendimiento. Para ciclistas principiantes o en regreso de una lesión, la cifra razonable está entre 2 y 5 puntos semanales.

La lógica de la semana de recuperación —un concepto tan antiguo como el entrenamiento sistematizado— tiene una expresión directa en el PMC. Insertar una semana de reducción de carga cada tres o cuatro semanas de construcción permite que la ATL baje, que el TSB se recupere hacia valores menos negativos y que la CTL no decaiga demasiado. Foster (1998) demostró en *Medicine & Science in Sports & Exercise* que la monotonía del entrenamiento —repetir semanas muy similares sin ondulaciones— es tan perniciosa como la sobrecarga puntual, y que el índice de "tensión de entrenamiento" (carga × monotonía) predecía significativamente la incidencia de enfermedades e infecciones menores en atletas de resistencia (PMID 9662690). El PMC, bien usado, visualiza esa ondulación: la CTL sube en escalones, no en una línea recta.

## TSB positivo: la ventana de forma antes de una carrera

Cuando llegan los días previos a un objetivo de temporada, la tarea es reducir la ATL más rápido de lo que cae la CTL. El resultado es un TSB que cruza de negativo a positivo durante el tapering. Bourdon y colaboradores (2017) en el *International Journal of Sports Physiology and Performance* —consenso de más de veinte expertos internacionales— señalaron que la individualización de las respuestas a la carga es uno de los retos metodológicos más importantes en el monitoreo de atletas, precisamente porque los rangos "óptimos" de TSB para el día de la carrera varían según el historial de entrenamiento, la especialidad y la duración del evento (PMID 28463642).

La experiencia práctica —la mía como corredor, la de entrenadores con quienes he trabajado— sugiere que un TSB entre +5 y +20 en el día de la carrera produce resultados consistentes en ciclistas amateur con CTL entre 60 y 100. Valores superiores a +25 pueden indicar un desentrenamiento excesivo: la CTL ha caído demasiado y el atleta llega fresco pero desadaptado. Valores inferiores a 0 en el día de la prueba suelen reflejar un tapering insuficiente o un bloque de carga demasiado agresivo en las últimas dos semanas. Estos rangos son orientativos, no umbrales clínicos.

## El ratio ACWR y la paradoja que pone en duda las zonas seguras

El ratio carga aguda:crónica (ACWR, *Acute:Chronic Workload Ratio*) es una variante conceptualmente relacionada con el PMC: se calcula como ATL ÷ CTL. Gabbett (2016) publicó en el *British Journal of Sports Medicine* una revisión influyente —más de 2.000 citas— en la que propuso que un ACWR entre 0,8 y 1,3 constituye una "zona verde" de bajo riesgo de lesión, mientras que valores superiores a 1,5 multiplicarían el riesgo de forma sustancial (PMID 26758673). La paradoja que da nombre al artículo es que los atletas más entrenados —con mayor carga crónica— toleran mejor los picos de carga aguda que los atletas menos preparados: entrenar mucho protege, hasta cierto punto, frente a los efectos nocivos de entrenar demasiado de golpe.

Sin embargo, el marco del ACWR ha recibido críticas metodológicas serias que conviene conocer antes de aplicarlo como si fuera una ley. Impellizzeri y colaboradores (2020) en el *International Journal of Sports Physiology and Performance* señalaron que el ACWR sufre de un problema estadístico fundamental: el denominador (ATL, carga crónica) contiene aritméticamente al numerador (ATL aguda), lo que genera autocorrelaciones espurias que distorsionan las asociaciones con la lesión (PMID 32502973). Dicho de otra forma: parte de la asociación entre ACWR elevado y mayor riesgo de lesión puede ser un artefacto matemático, no una relación causal real. Esto no invalida el valor heurístico del concepto —subidas bruscas de carga siguen siendo una señal de alerta razonable—, pero debería impedir que ningún entrenador o deportista trate los umbrales de 0,8, 1,3 o 1,5 como fronteras precisas.

## Carga externa frente a carga interna: la limitación que el PMC no puede resolver

El TSS mide kilovatios y tiempo: es carga externa, lo que el ciclista produce. No mide lo que esa carga le cuesta al organismo en un día concreto, que depende del sueño de la noche anterior, del nivel de hidratación, de un resfriado incipiente, del estrés laboral acumulado o de si viajó en avión el día antes. Dos sesiones con el mismo TSS pueden representar esfuerzos fisiológicos completamente distintos dependiendo del estado del atleta. El PMC, por construcción, es ciego a esta variabilidad interna. Por eso los investigadores que trabajan con monitoreo de carga insisten en combinar métricas externas como el TSS con indicadores de carga interna: la RPE de sesión (la percepción de esfuerzo según la escala de Borg multiplicada por la duración, método validado por Foster en 1998), la variabilidad de la frecuencia cardíaca (HRV) y la calidad del sueño.

Bourdon y colaboradores (2017) destacaron en su consenso que la combinación de indicadores externos e internos —junto con el seguimiento diario del bienestar subjetivo— es el enfoque con mayor respaldo para la monitorización de atletas en la práctica real. Un CTL de 90 no te dice si estás sobreentrenado. Un CTL de 90 con un HRV sostenidamente deprimido, dos semanas de sueño fragmentado y una sensación de piernas de plomo desde hace diez días sí lo dice.

## Cómo usarlos sin que te controlen

El Performance Management Chart es una herramienta de navegación, no un árbitro. Sirve para visualizar la dirección general de la temporada, identificar semanas donde la carga se disparó en exceso, verificar que el tapering está funcionando matemáticamente y tener conversaciones más precisas con un entrenador. No sirve para decidir si una sesión concreta fue suficientemente dura, para comparar tu CTL con la de otro ciclista como si fuera un marcador de capacidad, ni para ignorar sensaciones de fatiga persistente porque "el TSB todavía está en negativo y eso es normal".

La versión más útil del PMC es aquella en que el deportista entiende lo que mide y lo que no mide, y lo usa como una referencia más junto con el diario de entrenamiento, los resultados de las sesiones de referencia y la autoobservación. Banister propuso en 1975 un modelo matemático del atleta humano. Cincuenta años después, el modelo sigue en pie, con sus límites, porque captura algo verdadero sobre cómo funcionamos: la condición tarda en construirse, la fatiga llega rápido y la forma es la diferencia entre las dos. El resto son parámetros.