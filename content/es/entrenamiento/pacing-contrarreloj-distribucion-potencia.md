---
title: "Pacing en contrarreloj: cómo distribuir la potencia para no romperse"
subtitle: "El ciclista medio sale un 15-20% por encima de su potencia sostenible y paga el precio en el kilómetro 15. Tres décadas de investigación explican cómo evitarlo con datos concretos"
section: "entrenamiento"
date: "2026-05-05"
author: "Tomás Herrera"
tags: ["contrarreloj", "pacing", "potencia", "FTP", "zonas de entrenamiento", "estrategia", "CRI", "umbral"]
excerpt: "Foster y sus colegas documentaron en 1993 que la salida perfecta en una CRI de 2 km utiliza exactamente el 51% del tiempo total en la primera mitad. Treinta años de evidencia confirman la misma conclusión: la contención inicial produce el mejor tiempo final."
coverImage: "https://images.unsplash.com/photo-1764067521927-41a4d9062b07?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "Effect of pacing strategy on cycle time trial performance"
    url: "https://pubmed.ncbi.nlm.nih.gov/8455455/"
    type: pubmed
  - title: "Describing and understanding pacing strategies during athletic competition"
    url: "https://pubmed.ncbi.nlm.nih.gov/18278984/"
    type: pubmed
  - title: "Distribution of power output during cycling: impact and mechanisms"
    url: "https://pubmed.ncbi.nlm.nih.gov/17645369/"
    type: pubmed
  - title: "Pacing strategy and the occurrence of fatigue in 4000-m cycling time trials"
    url: "https://pubmed.ncbi.nlm.nih.gov/16888463/"
    type: pubmed
  - title: "Exercise intensity during competition time trials in professional road cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/10776906/"
    type: pubmed
  - title: "Variable versus constant power strategies during cycling time-trials: prediction of time savings using an up-to-date mathematical model"
    url: "https://pubmed.ncbi.nlm.nih.gov/17497402/"
    type: pubmed
  - title: "Relative importance of pacing strategy and mean power output in 1500-m self-paced cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/19850573/"
    type: pubmed
translationOf: "pacing-time-trial-power-distribution"
---

## El error que se repite en cada salida

La contrarreloj produce un comportamiento predecible en los ciclistas no especializados: la adrenalina del inicio empuja a pedalear un 15-20% por encima de la potencia sostenible, y diez minutos después el marcador de potencia cae en picado mientras las piernas se llenan de lactato. Foster y sus colaboradores documentaron este patrón en 1993 con una elegancia experimental difícil de superar: nueve ciclistas entrenados realizaron cinco pruebas de 2 km en rodillo, con la potencia de la primera mitad controlada experimentalmente desde muy lenta hasta muy rápida. La prueba uniformemente repartida produjo el mejor tiempo, y la relación entre ritmo de salida y tiempo final describió una curva en U cuyo nadir se situó exactamente en el 51% del tiempo total empleado en la primera mitad. Salir demasiado rápido era tan perjudicial como salir demasiado lento —pero los atletas cometían consistentemente el primer error.

Treinta años después, la ciencia del pacing en contrarreloj ha madurado considerablemente y el error sigue igual de frecuente. Abbiss y Laursen publicaron en 2008 en *Sports Medicine* (PMID 18278984) la taxonomía más completa de los perfiles de pacing deportivo, identificando seis patrones distintos —uniforme, positivo, negativo, parabólico, en U y variable— y concluyendo que el pacing uniforme era el óptimo teórico para pruebas de duración media en condiciones estables. La contrarreloj ciclista de 20-40 km, la prueba que define el ranking general en el Tour o en los Campeonatos del Mundo, es exactamente ese tipo de evento. No hay matices: la evidencia apunta en una dirección única.

## Seis perfiles, una sola respuesta óptima

Abbiss y Laursen definen el pacing positivo como aquel donde la potencia decrece a lo largo del esfuerzo —es el patrón del ciclista que sale explosivo y termina arrastrándose— y el negativo como el que aumenta progresivamente hasta el final. El perfil en U describe una salida rápida, un cuerpo de carrera más controlado y un sprint final; el parabólico inverso hace lo contrario, con un pico de intensidad en la parte central. Para una CRI plana o ligeramente ondulada, la evidencia señala el perfil uniforme —o muy ligeramente negativo con un 1-2% más de potencia en el tramo final— como el más eficiente energéticamente.

La razón central es física y metabólica: el costo energético del ciclismo no es lineal respecto a la potencia. La resistencia aerodinámica aumenta con el cubo de la velocidad, lo que significa que pedalear un 20% más rápido cuesta mucho más del 20% adicional en términos calóricos. Atkinson y sus colegas publicaron en *Sports Medicine* (2007, PMID 17645369) la revisión más citada sobre distribución de potencia en ciclismo, demostrando que la variación excesiva de potencia penaliza el rendimiento total precisamente por este efecto no lineal. Distribuir el mismo trabajo total de forma más uniforme reduce el costo energético neto y permite mantener una potencia media más alta durante todo el recorrido.

<ChartLine
  title="Perfil de potencia en una CRI de 40 km: ideal vs. típico aficionado"
  caption="Basado en Foster et al. (1993, PMID 8455455) y Atkinson et al. (2007, PMID 17645369). Datos ilustrativos."
  data={[
    { km: "km 2", ideal: 93, tipico: 118 },
    { km: "km 5", ideal: 95, tipico: 108 },
    { km: "km 10", ideal: 97, tipico: 98 },
    { km: "km 15", ideal: 99, tipico: 93 },
    { km: "km 20", ideal: 100, tipico: 90 },
    { km: "km 25", ideal: 100, tipico: 89 },
    { km: "km 30", ideal: 101, tipico: 88 },
    { km: "km 35", ideal: 102, tipico: 90 },
    { km: "km 40", ideal: 106, tipico: 94 },
  ]}
  xKey="km"
  lines={[
    { key: "ideal", color: "#0891B2", name: "Perfil ideal" },
    { key: "tipico", color: "#E11D48", name: "Perfil típico aficionado" },
  ]}
  unit="% FTP"
/>

## La física que penaliza al ansioso

El cálculo es despiadado. Hettinga y colaboradores (2006) estudiaron este mecanismo en una contrarreloj de 4.000 metros en pista (PMID 16888463), comparando perfiles conservadores, uniformes y agresivos en ciclistas de alta competición. La contribución anaeróbica al esfuerzo fue significativamente mayor en el grupo agresivo desde los primeros 500 metros, lo que generó un descenso de potencia en la segunda mitad incompatible con el rendimiento óptimo. La integración electromiográfica reveló que la fatiga era periférica —el músculo fallaba— más que central, lo cual significa que el daño estaba hecho mucho antes de que el ciclista percibiera el deterioro.

Los datos de Padilla y colaboradores (2000) sobre las contrarrelojes profesionales del World Tour (PMID 10776906) añaden el contexto competitivo necesario. En su estudio con dieciocho ciclistas de élite, las contrarrelojes cortas —menos de 30 minutos— se disputaron a intensidades muy cercanas al umbral de acumulación de lactato en sangre, aproximadamente 4 mmol/L, mientras que las largas —más de 40 km— se corrieron al umbral aeróbico-anaeróbico. La traducción práctica es que la CRI profesional se corre a Z4 (91-105% FTP) durante prácticamente todo el recorrido, con excursiones breves a Z5 (106-120% FTP) en los tramos finales de las pruebas cortas o en los remates de ascenso. Salir a Z5 durante los primeros kilómetros equivale a tirar la carrera.

## Cursos ondulados: la excepción necesaria

La regla del pacing uniforme tiene una excepción bien documentada: los cursos con variaciones de pendiente o de viento significativas. Atkinson y su grupo (2007, PMID 17497402) demostraron mediante modelado matemático que variar la potencia en paralelo con los cambios de pendiente —más vatios en los repechos, menos en las bajadas— produce ahorros de tiempo considerables respecto a la potencia constante. Con una potencia media de 289 W, una variación del ±10% sincronizada con el gradiente produjo un ahorro de 126 segundos en un circuito ondulado simulado —más de dos minutos en una CRI típica.

El principio es contraintuitivo: al reducir potencia en los descensos, donde la velocidad ya es alta de forma natural y donde cada vatio adicional tiene escaso efecto sobre el tiempo por la resistencia aerodinámica, el ciclista reserva energía para los repechos donde cada vatio extra se traduce directamente en velocidad ganada. La estrategia concreta es sencilla en concepto pero exige medición en tiempo real: subir los repechos a Z4 alto o Z5 temprano (95-108% FTP), bajar los descensos a Z3 (76-85% FTP) y mantener Z4 en los tramos planos. Sin potenciómetro, esta estrategia es imposible de ejecutar con precisión —el RPE no detecta las variaciones de potencia del 5-10% con suficiente resolución.

## El protocolo numérico: potencia por tramos

Para una CRI de 40 km en circuito neutro, la distribución óptima que emerge de la literatura tiene una estructura definida. Los primeros 3-5 km requieren contención activa: la potencia objetivo es el extremo inferior de Z4 (91-93% FTP), aunque el ciclista tenga sensación de poder ir más rápido. Esta auto-restricción compensa el costo metabólico del arranque —los primeros 30-60 segundos siempre involucran contribución anaeróbica— y establece la frecuencia cardíaca en el rango sostenible antes de comprometer las reservas glucolíticas de alta intensidad.

Entre el kilómetro 5 y el 35, la potencia debe mantenerse en la banda Z4 media-alta: 95-100% FTP en pruebas de 40 km, hasta 103-105% FTP en pruebas de 20 km o menos. Hettinga y colaboradores (2009, PMID 19850573) demostraron que la potencia media absoluta explica la mayor parte de la varianza en el tiempo de llegada —más que la estrategia de pacing en sí—, pero que para una potencia media dada, la distribución uniforme optimiza ese potencial. En otras palabras: la potencia media importa más que la estrategia, pero la estrategia decide si esa potencia media se aprovecha o se desperdicia en los primeros kilómetros.

| Tramo | Distancia | Zona | % FTP objetivo | Sensación subjetiva |
|-------|-----------|------|----------------|---------------------|
| Arranque | 0-3 km | Z4 bajo | 91-93% | Contenida, "demasiado fácil" |
| Construcción | 3-10 km | Z4 medio | 93-97% | Ritmo exigente pero sostenible |
| Cuerpo | 10-35 km | Z4 alto | 97-102% | Al límite, controlado |
| Remate | 35-38 km | Z4-Z5 | 102-108% | Máximo esfuerzo sostenible |
| Sprint final | 38-40 km | Z5-Z6 | 108-115% | Vaciamiento total |

El tramo final permite una elevación gradual porque se conservó energía anaeróbica glucolítica durante todo el esfuerzo mediante el inicio controlado. Si el ciclista llega al kilómetro 35 con potencia por debajo del 90% FTP, la estrategia fue incorrecta desde mucho antes —no en los últimos kilómetros.

## Ganna y la hora perfecta

Filippo Ganna estableció el récord de la hora UCI el 8 de octubre de 2022 en el velódromo de Grenchen, cubriendo 56,792 km a una potencia media de 470 W durante 60 minutos completos. Lo que hace científicamente notable su actuación no es solo la potencia absoluta sino la distribución: sus tiempos de vuelta mostraron una progresión casi perfectamente negativa, con las primeras vueltas deliberadamente más lentas que el ritmo del récord de Dan Bigham (55,548 km, agosto de 2022) y las finales progresivamente más rápidas. Ganna comenzó con contención, igualó el ritmo de referencia en torno al minuto 25-30, y mantuvo una cadencia y potencia crecientes hasta el cierre.

Este perfil levemente negativo es la versión de élite del pacing óptimo que describe la investigación de Foster y de Abbiss & Laursen. Para el ciclista amateur, la moraleja es que incluso el mejor especialista en CRI del mundo eligió comenzar con contención, no con agresividad. La diferencia entre Ganna y el aficionado no es solo la potencia media —470 W durante una hora representa aproximadamente el doble de lo que puede sostener un ciclista bien entrenado sin ser profesional— sino la capacidad de ejecutar un plan que la psicología de la competición tira a la basura en los primeros metros de salida.

## Plan de entrenamiento: cinco semanas hacia la CRI

El entrenamiento específico para la contrarreloj tiene tres objetivos fisiológicos distintos: elevar el FTP (el denominador del porcentaje de potencia), mejorar la capacidad de sostener la potencia cerca del umbral durante el tiempo exacto de la prueba, y desarrollar la conciencia de pacing necesaria para no cometer el error del arranque explosivo. Este tercer objetivo es el más ignorado en los planes estándar y paradójicamente es el que más directamente afecta al resultado en pruebas de menos de una hora.

| Semana | Martes | Miércoles | Jueves | Sábado |
|--------|--------|-----------|--------|--------|
| 1 | 3×10 min Z4 (91-95% FTP), 5 min rec Z2 | 90 min Z2 | 20 min CRI simulada al 93% FTP | 2,5h Z2-Z3 |
| 2 | 3×12 min Z4 (93-97% FTP), 4 min rec Z2 | 90 min Z2 | 25 min CRI simulada al 95% FTP | 3h Z2-Z3 |
| 3 | 4×10 min Z4 (95-100% FTP), 4 min rec Z2 | 90 min Z2 | 30 min CRI simulada al 96% FTP | 3h Z2-Z3 |
| 4 | 4×12 min Z4-Z5 (97-105% FTP), 4 min rec Z2 | 90 min Z2 | 35 min CRI simulada al 98% FTP | 3h Z2-Z3 |
| 5 (descarga) | 2×10 min Z4 (91-95% FTP), 5 min rec Z2 | 75 min Z2 | 20 min CRI simulada al 93% FTP | 2h Z2 |

La sesión de CRI simulada del jueves es la más específica del plan. El protocolo tiene una estructura deliberada: salir al 90-91% FTP durante los primeros 3-5 minutos aunque la sensación sea de poder ir más rápido, construir progresivamente hacia el 97-98% FTP y terminar los últimos 5 minutos por encima del 100% FTP. El objetivo es registrar la potencia normalizada (NP) y el Variability Index (VI) de cada sesión: un VI inferior a 1,05 en terreno plano indica pacing bien ejecutado; un VI superior a 1,10 señala picos de potencia que costarán caro en la prueba real.

## Las señales que avisan a tiempo

El marcador más fiable de que el pacing fue incorrecto no aparece durante el primer tramo de la prueba: aparece entre los kilómetros 15 y 20, cuando ya es demasiado tarde para recuperar. La señal que sí llega a tiempo es la frecuencia cardíaca: si en el kilómetro 3-5 ya alcanzó el 95% de la FC máxima con la potencia objetivo, el esfuerzo es insostenible. La FC tarda 3-5 minutos en estabilizarse a una potencia dada; si sigue subiendo más allá de ese punto sin estabilizarse, la potencia debe reducirse inmediatamente, no en cinco kilómetros.

El RPE —la escala de percepción de esfuerzo de Borg— proporciona otra señal temprana que los ciclistas mal preparados ignoran por exceso de optimismo. En una CRI bien ejecutada, el RPE al inicio debería ser 4-5 sobre 10. Una sensación de esfuerzo de 7-8 en los primeros kilómetros es incompatible con llegar en condiciones óptimas al kilómetro 30. La psicología del inicio de carrera lleva a interpretar ese 7-8 inicial como señal de rendimiento máximo; la fisiología del pacing lo lee como una garantía de capitulación a mitad de recorrido.

El entrenamiento de contrarreloj no es únicamente un entrenamiento físico: es un entrenamiento cognitivo para resistir el impulso de salir explosivo y para confiar en que la contención inicial produce un resultado final superior. Esa confianza solo se adquiere acumulando datos propios —sesiones registradas, tiempos comparados, VI analizados sesión a sesión— y no puede comprarse con vatios de laboratorio ni con ningún dispositivo GPS de última generación. Los datos convencen a la cabeza cuando la adrenalina del pelotón empuja en dirección contraria.
