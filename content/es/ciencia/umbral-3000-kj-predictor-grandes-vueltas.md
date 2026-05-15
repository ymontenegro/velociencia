---
title: "El umbral de los 3000 kJ: por qué los vatios acumulados predicen las grandes vueltas mejor que el FTP"
subtitle: "Dos corredores con FTP idéntico llegan a la última subida con capacidades fisiológicas radicalmente distintas. La diferencia depende de un número que ningún test estándar mide"
section: "ciencia"
date: "2026-05-15"
author: "Sofía Müller"
tags: ["durabilidad", "fatigue resistance", "FTP", "kilojulios", "potencia crítica", "WorldTour", "grandes vueltas"]
sources:
  - title: "Maintaining Power Output with Accumulating Levels of Work Done Is a Key Determinant for Success in Professional Cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/33731651/"
    type: pubmed
  - title: "The Importance of 'Durability' in the Physiological Profiling of Endurance Athletes"
    url: "https://pubmed.ncbi.nlm.nih.gov/33886100/"
    type: pubmed
  - title: "The Record Power Profile of Male Professional Cyclists: Fatigue Matters"
    url: "https://pubmed.ncbi.nlm.nih.gov/35240578/"
    type: pubmed
  - title: "Impact of prior accumulated work and intensity on power output in elite/international level road cyclists – a pilot study"
    url: "https://doi.org/10.1007/s12662-022-00818-x"
    type: doi
  - title: "Durability in Professional Cyclists: A Field Study"
    url: "https://pubmed.ncbi.nlm.nih.gov/36521188/"
    type: pubmed
  - title: "The relationship between training characteristics and durability in professional cyclists across a competitive season"
    url: "https://pubmed.ncbi.nlm.nih.gov/35239466/"
    type: pubmed
excerpt: "Tras 3000 kJ acumulados, corredores con FTP idéntico llegan a los puertos decisivos con capacidades de 5 a 9 puntos porcentuales distintas. El FTP en fresco no mide eso."
coverImage: "https://images.unsplash.com/photo-1545575439-3261931f52f1?w=1600&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

Dos ciclistas arrancan el Tour de Francia con un FTP de 6.0 W/kg medido en laboratorio el mes anterior. Al kilómetro 155 de la etapa del Galibier, con 3100 kilojulios acumulados en las piernas, uno ataca por encima de 5.8 W/kg durante diecisiete minutos. El otro gestiona a 5.0 W/kg y llega con el grupo de seguimiento. La diferencia entre ambos no estaba en el FTP. Estaba en lo que quedaba de ese FTP después de tres horas y cuarto de carrera.

La fisiología del ejercicio dispone desde 2021 de un marco conceptual robusto para explicar esta divergencia: la durabilidad, definida por Maunder et al. en *Sports Medicine* como "el tiempo de aparición y la magnitud del deterioro de las características fisiológicas durante el ejercicio prolongado" (PMID 33886100). Lo que ese marco no siempre explicita con suficiente precisión es el umbral cuantitativo donde ocurre la divergencia. En las grandes vueltas, los datos de campo publicados sitúan ese umbral entre los 2500 y los 3500 kilojulios absolutos acumulados. Ahí es exactamente donde los rankings se reordenan, y ningún test estándar de FTP mide lo que ocurre en esa zona.

## El momento donde el ranking se reordena

Una etapa de montaña típica en el Tour de Francia acumula entre 3500 y 5000 kilojulios para un corredor de 68-72 kg. Los puertos decisivos —el Col de la Loze, el Alpe d'Huez, el Hautacam— aparecen en las dos últimas horas de carrera, cuando ya se han gastado el 70-85% de la energía total del día. Para un corredor de 68 kg que acumula 4200 kJ en una etapa de cinco horas, el ataque en el puerto final ocurre después de 2940-3570 kJ, dependiendo del ritmo. Ese rango de 2800-3500 kJ es la zona donde la literatura científica documenta la mayor divergencia de rendimiento entre ciclistas.

El problema estructural del FTP es que se mide antes de esos kilojulios. Un test de veinte minutos realizado en fresco captura la capacidad del corredor en la condición donde todos están más iguales. Maunder et al. (2021) formularon el problema con precisión: los modelos de perfil fisiológico clásicos asumen que el ranking entre atletas se mantiene estable bajo fatiga. Los datos de campo del WorldTour demuestran que ese supuesto es falso. El ranking no se mantiene. Se reordena, y se reordena en la ventana de kilojulios donde se decide la carrera.

## El estudio que puso números al umbral

Van Erp, Sanders y Lamberts publicaron en 2021 en *Medicine & Science in Sports & Exercise* el análisis que estableció la metodología de referencia para cuantificar ese reordenamiento (PMID 33731651). Recopilaron datos de potencia de 26 ciclistas profesionales a lo largo de 85 temporadas completas, entre 2012 y 2019. Clasificaron a los corredores como escaladores o sprinters y en dos categorías de éxito según puntos en ProCyclingStats: exitosos (CAT.1, ≥ 400 puntos) y menos exitosos (CAT.2, < 400 puntos). Midieron la potencia máxima media (MMP) para esfuerzos de 10 segundos, 1 minuto, 5 minutos y 20 minutos a seis niveles de trabajo acumulado: 0, 10, 20, 30, 40 y 50 kJ·kg⁻¹.

Para un escalador de 68 kg, esos 40-50 kJ·kg⁻¹ equivalen a entre 2720 y 3400 kilojulios totales. El hallazgo fue directo: a 0 kJ·kg⁻¹, en fresco, las diferencias en MMP entre exitosos y menos exitosos eran marginales en todas las duraciones. La divergencia aparecía bajo fatiga. A 45-50 kJ·kg⁻¹, los escaladores exitosos mantenían una MMP a 20 minutos un 4.0% inferior a su valor en fresco. Los escaladores menos exitosos caían un 9.0%. Cinco puntos porcentuales que, en un corredor con 390 W en fresco, representan la diferencia entre llegar al último puerto con 374 W o con 354 W. En un ascenso de cuarenta minutos, esa diferencia cierra más de un minuto.

<ChartLine
  title="Declive de la MMP a 20 min con kilojulios acumulados (corredor de 68 kg)"
  caption="Estimación normalizada a partir de Van Erp et al. (2021, MSSE). Valores expresados como porcentaje del valor en fresco. Umbral de referencia: ≈ 3000 kJ."
  data={[
    { kJ: "0", exitoso: 100, menos_exitoso: 100 },
    { kJ: "680", exitoso: 99.3, menos_exitoso: 98.5 },
    { kJ: "1360", exitoso: 98.4, menos_exitoso: 97.0 },
    { kJ: "2040", exitoso: 97.8, menos_exitoso: 95.2 },
    { kJ: "2720", exitoso: 97.1, menos_exitoso: 93.1 },
    { kJ: "3400", exitoso: 96.0, menos_exitoso: 91.0 }
  ]}
  xKey="kJ"
  lines={[
    { key: "exitoso", color: "#7C3AED", name: "Corredor exitoso (CAT.1)" },
    { key: "menos_exitoso", color: "#0891B2", name: "Corredor menos exitoso (CAT.2)" }
  ]}
  unit="%"
/>

## 112 corredores, ocho temporadas

El estudio más amplio disponible sobre el deterioro del perfil de potencia bajo fatiga lo publicaron Mateo-March, Valenzuela, Muriel y colaboradores en 2022 en el *International Journal of Sports Physiology and Performance* (PMID 35240578). Analizaron a 112 ciclistas profesionales masculinos —46 de categoría ProTeam y 66 de WorldTour— usando datos de ocho temporadas completas (2013-2021) de un equipo de élite. Midieron la MMP para esfuerzos de 10 segundos a 120 minutos a cargas de 0, 15, 25, 35 y 45 kJ·kg⁻¹. Para el mismo corredor de 68 kg, esos umbrales equivalen a 0, 1020, 1700, 2380 y 3060 kilojulios.

El deterioro fue progresivo y comenzó antes de lo que muchos modelos asumían: ya a 15 kJ·kg⁻¹ (~1020 kJ) se observaba una caída media de entre el 1.6% y el 3.0% en todas las duraciones. A 45 kJ·kg⁻¹ (~3060 kJ), el deterioro alcanzaba entre el 6.0% y el 9.7% según duración y corredor. La comparativa por categoría reveló lo más operativo para entender las grandes vueltas: a 35 kJ·kg⁻¹ (~2380 kJ), la diferencia en deterioro entre WorldTour y ProTeam se volvía estadísticamente significativa. A 45 kJ·kg⁻¹, los ciclistas ProTeam mostraban una caída significativamente mayor en MMP a 5 y 20 minutos que sus homólogos WorldTour. En fresco, ambos grupos arrancaban desde posiciones similares. Bajo tres mil kilojulios, el WorldTour se separaba.

## Por qué el FTP fresco sobreestima la capacidad decisiva

El modelo clásico de potencia-duración describe la relación entre intensidad y tiempo de sostenimiento mediante la ecuación $$P = CP + \frac{W'}{t}$$ donde $CP$ es la potencia crítica, $W'$ es la capacidad anaeróbica disponible y $t$ el tiempo. Ambos parámetros se miden habitualmente en fresco, con el corredor descansado. Ese procedimiento asume que $CP$ y $W'$ son constantes a lo largo del día de carrera. No lo son.

Con trabajo acumulado suficiente, la $CP$ desciende. Spragg, Leo y Swart documentaron este fenómeno en corredores profesionales sub-23 en un seguimiento de temporada completa (PMID 35239466): el perfil de potencia fatigado variaba de forma estadísticamente significativa entre fases de la temporada, mientras el perfil en fresco se mantenía relativamente estable. La $CP$ medida en fresco sobreestima la $CP$ disponible en el kilómetro 155 de una etapa de montaña. Cuánto sobreestima depende precisamente de la durabilidad individual, que el test en fresco no captura.

Valenzuela y colaboradores cuantificaron esa sobreestimación en campo (PMID 36521188). Doce ciclistas profesionales masculinos con un VO₂max medio de 83 ml·kg⁻¹·min⁻¹ realizaron un test de veinte minutos en fresco y otro inmediatamente tras cuatro horas de pedaleo submáximo (~40 kJ·kg⁻¹, ~2720 kJ totales). La potencia media cayó de 386 W a 375 W, una reducción promedio del 2.9%. Pero la variabilidad individual era lo más informativo: algunos corredores perdían hasta el 8.5% de su potencia; otros no perdían ningún watt. Ninguna variable del laboratorio en fresco —VO₂max, umbral ventilatorio, potencia pico— predecía qué corredor caía y cuál se mantenía. El FTP en fresco era idéntico entre corredores con durabilidades opuestas.

<ChartBar
  title="Caída de MMP a 20 min en corredores exitosos vs menos exitosos a 3400 kJ acumulados"
  caption="Datos de Van Erp et al. (2021, MSSE). N=26 ciclistas, 85 temporadas. Corredor de 68 kg, 50 kJ/kg acumulados."
  data={[
    { grupo: "Escalador exitoso (CAT.1)", caida: 4.0 },
    { grupo: "Escalador menos exitoso (CAT.2)", caida: 9.0 }
  ]}
  xKey="grupo"
  bars={[{ key: "caida", color: "#7C3AED", name: "Caída de MMP 20 min (%)" }]}
  unit="%"
/>

## Los kJ acumulados y la trampa del volumen sin intensidad

Acumular kilojulios no es condición suficiente para predecir el deterioro fisiológico: importa la intensidad a la que se generaron. Leo, Spragg y colaboradores publicaron en 2022 en el *German Journal of Exercise and Sport Research* un estudio piloto con 9 ciclistas profesionales de categoría UCI ProTeam (DOI: 10.1007/s12662-022-00818-x). Cada corredor completó dos protocolos de prefatiga de 2.5 horas igualados en kilojulios totales: uno de intensidad moderada continua (MIC, por debajo del 70% de la frecuencia cardíaca máxima) y otro de simulación de carrera con ráfagas de alta intensidad intermitente (HII, por encima del 80%). Tras el protocolo MIC, el test de potencia de doce minutos posterior no mostraba deterioro estadísticamente significativo. Tras el HII, sí.

La implicación metodológica es directa. Dos corredores que acumulan 3000 kJ en la misma etapa pueden llegar al puerto final con estados fisiológicos radicalmente distintos si uno distribuyó esos kilojulios siguiendo rueda en zona 2 durante horas y el otro soportó quince aceleraciones por encima de su $CP$ en los repechos intermedios. El kilojulio es una unidad de energía, no de estrés fisiológico. Su valor predictivo para el rendimiento en los puertos decisivos mejora sustancialmente cuando se combina con la distribución de intensidades dentro de ese trabajo total: no solo cuántos kJ, sino cuántos kJ por encima del umbral.

## Cómo medir la durabilidad sin salir del campo

El protocolo de campo estándar para cuantificar la durabilidad requiere dos tests de potencia en condiciones distintas: uno en fresco y otro tras una carga de prefatiga estandarizada. El diseño más usado en la literatura (Valenzuela et al., 2023) consiste en cuatro horas de pedaleo submáximo que acumulen entre 38 y 42 kJ·kg⁻¹, seguidas inmediatamente de un test de veinte minutos a esfuerzo máximo. La diferencia porcentual entre la potencia en el test fatigado y la del test en fresco es el índice de durabilidad individual.

Este diseño tiene limitaciones evidentes. Requiere dos días distintos con condiciones controladas, medición de potencia calibrada, y disponibilidad para un esfuerzo máximo real al final de cuatro horas de trabajo. En su forma más rigurosa, la carga de prefatiga debería replicar la distribución de intensidades de la competición objetivo, lo que añade complejidad logística. Una aproximación práctica para ciclistas no profesionales consiste en realizar el test de veinte minutos al final de una salida de cuatro a cinco horas en zona 2 —acumulando los habituales 35-45 kJ·kg⁻¹ en trabajo moderado— y comparar ese valor con el test en fresco realizado en otra sesión. La diferencia entre ambos, aunque no esté estandarizada en la misma escala que los estudios de laboratorio, proporciona una primera estimación operativa del índice personal de durabilidad. El 95% de los ciclistas amateurs nunca ha realizado este test.

## Entrenar para retener vatios después de 3000 kJ

El volumen de entrenamiento por debajo del primer umbral ventilatorio es el predictor más consistente de durabilidad que la literatura ha identificado hasta la fecha. Spragg, Leo y Swart, en su estudio con 30 corredores profesionales sub-23 seguidos durante una temporada completa (PMID 35239466), encontraron que el tiempo de entrenamiento en zona 1 correlacionaba positivamente con la retención de potencia en condiciones fatigadas. La MMP a 2 minutos en estado fatigado mostraba mejora progresiva en los corredores con mayor proporción de entrenamiento bajo el umbral aeróbico. El perfil en fresco, mientras tanto, permanecía relativamente invariante.

El mecanismo plausible es la densificación mitocondrial y la mejora en la eficiencia oxidativa. Un corredor con mayor capacidad para oxidar sustratos a baja intensidad llega a los esfuerzos decisivos con reservas de glucógeno menos agotadas, lo que protege la capacidad de sostener potencias altas cuando los kilojulios superan el umbral crítico de los 2500-3000. Desde esta perspectiva, el entrenamiento en zona 2 no construye el FTP directamente, pero construye el sustrato que protege ese FTP bajo fatiga acumulada.

La traducción práctica más específica es la secuencia de las cargas dentro de las sesiones largas. Un corredor que sitúa sus intervalos de potencia crítica en el kilómetro 30 de una salida de cuatro horas entrena la capacidad en fresco. Uno que sitúa esos mismos intervalos en el kilómetro 140 —cuando ya lleva 2600-2800 kJ acumulados— replica las condiciones fisiológicas exactas de los puertos decisivos. El estrés metabólico no es el mismo aunque el interval en papel sea idéntico. La nutrición durante el esfuerzo actúa como modulador: tasas de ingesta de 80-120 gramos de carbohidrato por hora reducen el agotamiento de glucógeno en las horas finales y protegen la MMP en el rango de 2500-3500 kJ, atenuando parcialmente las diferencias de durabilidad intrínseca entre corredores.

## El número que faltaba en el perfil fisiológico

Un perfil fisiológico estándar incluye VO₂max, umbral ventilatorio, eficiencia bruta y FTP. Todos se miden en la condición donde los corredores están más iguales: en fresco. Ninguno captura el comportamiento de esas variables después de 3000 kilojulios, que es la condición donde las grandes vueltas se deciden. Los datos de Van Erp et al. (2021) y Mateo-March et al. (2022) demuestran que añadir el índice de durabilidad —la caída porcentual de MMP a 5 y 20 minutos tras prefatiga estandarizada— diferencia a los corredores que ganan clasificaciones generales de los que no las ganan, incluso cuando sus FTP en laboratorio son virtualmente idénticos.

Para el ciclista amateur que completa gran fondos de 140-200 kilómetros en montaña, la implicación es análoga aunque en escala diferente. Una marcha de 170 kilómetros acumula entre 30 y 45 kJ·kg⁻¹ de trabajo. La última subida —la que se recuerda— ocurre cuando ya se han gastado el 85-90% de los kilojulios del día. Quien llega a ese puerto con un índice de durabilidad del 97% todavía puede correr. Quien llega al 91% gestiona. La diferencia entre ambos no se mide en el laboratorio. Se mide en la montaña, pasados los 2800 kJ, en los vatios que quedan cuando los vatios son lo único que importa.
