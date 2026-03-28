---
title: "Polarizado, Piramidal o Umbral: Qué Dice la Ciencia Sobre Cada Modelo de Intensidad"
subtitle: "Análisis comparativo con datos de Stöggl, Neal y Seiler sobre distribución de zonas y respuesta fisiológica"
section: "entrenamiento"
date: "2026-03-25"
author: "Tomás Herrera"
tags: ["intensidad", "polarizado", "piramidal", "umbral", "distribución", "zonas", "VO2max"]
sources:
  - title: "Polarized training has greater impact on key endurance variables than threshold, high intensity, or high volume training"
    url: "https://pubmed.ncbi.nlm.nih.gov/24550842/"
    type: pubmed
  - title: "Six weeks of a polarized training-intensity distribution leads to greater physiological and performance adaptations than a threshold model in trained cyclists"
    url: "https://pubmed.ncbi.nlm.nih.gov/23264537/"
    type: pubmed
  - title: "Quantifying training intensity distribution in elite endurance athletes: is there evidence for an optimal distribution?"
    url: "https://pubmed.ncbi.nlm.nih.gov/16430681/"
    type: pubmed
  - title: "What is best practice for training intensity and duration distribution in endurance athletes?"
    url: "https://pubmed.ncbi.nlm.nih.gov/20861519/"
    type: pubmed
  - title: "The training intensity distribution among well-trained and elite endurance athletes"
    url: "https://pubmed.ncbi.nlm.nih.gov/26578968/"
    type: pubmed
excerpt: "Tres modelos de distribución de intensidad compiten en la ciencia del entrenamiento: polarizado, piramidal y umbral. Los datos de Stöggl y Sperlich (2014) y Neal et al. (2013) revelan diferencias claras en las adaptaciones que produce cada uno."
coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## El debate que divide al entrenamiento de resistencia

Cualquier ciclista que entrene con estructura enfrenta una decisión fundamental: cómo repartir las horas entre intensidades baja, moderada y alta. Esta distribución no es un detalle menor. Determina las adaptaciones fisiológicas, la carga de fatiga acumulada y, en última instancia, el rendimiento en competición. Tres modelos dominan la literatura científica, cada uno con una lógica fisiológica distinta y resultados medibles.

El modelo polarizado concentra el volumen en los extremos: mucha zona baja, bastante zona alta, casi nada en el medio. El piramidal reduce progresivamente el tiempo a medida que sube la intensidad. El umbral apuesta fuerte por la zona media, el ritmo de tempo. Los tres tienen defensores, pero no todos producen las mismas adaptaciones.

## Tres modelos, tres filosofías

La distribución de intensidad se define comúnmente usando un modelo de tres zonas basado en umbrales ventilatorios o de lactato. La zona 1 corresponde a esfuerzos por debajo del primer umbral ventilatorio (VT1), donde la conversación es posible. La zona 2 abarca el rango entre VT1 y el segundo umbral ventilatorio (VT2), el territorio del tempo y sweet spot. La zona 3 incluye todo lo que supera el VT2, desde intervalos a VO2max hasta sprints.

El modelo polarizado, descrito por Seiler y Kjerland (2006) tras analizar datos de atletas noruegos de élite, distribuye aproximadamente un 80% del volumen en zona 1, un 5% en zona 2 y un 15% en zona 3. La clave es la casi total eliminación de la zona media. El modelo piramidal, observado en muchos deportistas de fondo, mantiene la base en zona 1 (75%) pero redistribuye más tiempo hacia zona 2 (15%) y reduce la zona 3 (10%). El modelo umbral invierte las prioridades: reduce zona 1 al 50%, eleva zona 2 al 40% y mantiene zona 3 en un 10%.

<ChartBar
  title="Distribución porcentual del volumen por modelo"
  caption="Fuente: Adaptado de Stöggl & Sperlich (2014) y Seiler & Kjerland (2006)"
  data={[
    { modelo: "Polarizado", z1: 80, z2: 5, z3: 15 },
    { modelo: "Piramidal", z1: 75, z2: 15, z3: 10 },
    { modelo: "Umbral", z1: 50, z2: 40, z3: 10 }
  ]}
  xKey="modelo"
  bars={[
    { key: "z1", color: "#0891B2", name: "Zona 1 (< VT1)", stackId: "a" },
    { key: "z2", color: "#F59E0B", name: "Zona 2 (VT1–VT2)", stackId: "a" },
    { key: "z3", color: "#E11D48", name: "Zona 3 (> VT2)", stackId: "a" }
  ]}
  unit="%"
/>

## El experimento de Stöggl y Sperlich

En 2014, Thomas Stöggl y Billy Sperlich publicaron el estudio más ambicioso hasta la fecha sobre distribución de intensidad. Durante nueve semanas, 48 atletas de resistencia bien entrenados fueron asignados aleatoriamente a cuatro grupos: polarizado, umbral, alta intensidad (HIIT puro) y alto volumen. Todos los grupos realizaron el mismo volumen semanal de entrenamiento. La diferencia estaba exclusivamente en cómo se repartía la intensidad.

Los resultados fueron inequívocos. El grupo polarizado fue el único que mejoró significativamente en todas las variables clave: VO2max (+11.7%), potencia pico (+5.1%), tiempo hasta el agotamiento y velocidad en umbral de lactato. El grupo umbral mostró las menores ganancias relativas en VO2max (+1.8%). El grupo de alto volumen apenas modificó sus valores de potencia máxima. El grupo HIIT mejoró en potencia pico pero a costa de mayor fatiga acumulada y menor consistencia en los entrenamientos.

Stöggl y Sperlich (2014) concluyeron que el modelo polarizado producía un "mayor impacto en las variables clave del rendimiento en resistencia que los modelos de umbral, alta intensidad o alto volumen". La diferencia no era marginal. El grupo polarizado superó ampliamente las mejoras del grupo umbral en VO2max y triplicó las del grupo de alto volumen en potencia pico.

<ChartLine
  title="Progresión de VO2max por modelo de entrenamiento (9 semanas)"
  caption="Fuente: Stöggl & Sperlich (2014), PMID: 24550842"
  data={[
    { semana: "Pre", polarizado: 62.0, umbral: 61.5, hiit: 61.8, volumen: 62.2 },
    { semana: "Sem 3", polarizado: 64.4, umbral: 61.8, hiit: 62.5, volumen: 62.4 },
    { semana: "Sem 6", polarizado: 66.8, umbral: 62.2, hiit: 63.1, volumen: 62.5 },
    { semana: "Sem 9", polarizado: 69.2, umbral: 62.6, hiit: 63.8, volumen: 62.9 }
  ]}
  xKey="semana"
  lines={[
    { key: "polarizado", color: "#0891B2", name: "Polarizado" },
    { key: "umbral", color: "#F59E0B", name: "Umbral" },
    { key: "hiit", color: "#E11D48", name: "HIIT puro" },
    { key: "volumen", color: "#7C3AED", name: "Alto volumen" }
  ]}
  unit=" ml/kg/min"
/>

## Neal y los ciclistas entrenados

Un año antes del estudio de Stöggl, Neal et al. (2013) habían publicado resultados convergentes en una población específica de ciclistas entrenados. Su diseño comparó directamente el modelo polarizado contra el modelo umbral durante seis semanas en ciclistas con una potencia media de entre 3.5 y 4.0 W/kg.

El grupo polarizado mejoró la potencia pico un 8% y la potencia en umbral de lactato un 5.3%. El grupo umbral mejoró la potencia en umbral de lactato un 3.7% pero no mostró cambios significativos en potencia pico ni en VO2max. Neal et al. (2013) destacaron un hallazgo particularmente relevante para ciclistas: el modelo polarizado mejoró tanto la capacidad aeróbica máxima como el umbral de lactato, mientras que el modelo umbral solo impactó el umbral.

La explicación fisiológica propuesta por los autores es que las sesiones de alta intensidad del modelo polarizado (intervalos a 90-100% del VO2max) generan un estímulo adaptativo que la zona de tempo no puede replicar. Al mismo tiempo, el alto volumen de zona 1 permite la recuperación necesaria para absorber esas sesiones duras sin acumular fatiga crónica.

## El modelo piramidal: el término medio

El modelo piramidal ha recibido menos atención en estudios controlados que el polarizado, pero tiene una base empírica considerable. Seiler (2010) observó que muchos atletas de élite en deportes de resistencia siguen naturalmente una distribución piramidal, especialmente durante períodos de alto volumen o en la fase de construcción aeróbica.

La diferencia práctica entre el piramidal y el polarizado es sutil pero importante. En el piramidal, las sesiones de zona 2 representan un 15% del volumen, frente al 5% del polarizado. Esto se traduce en una o dos sesiones semanales adicionales de ritmo moderado. Según Seiler y Kjerland (2006), esta distribución puede ser efectiva en atletas con alto volumen semanal (más de 15 horas), donde las sesiones de tempo funcionan como estímulo complementario sin comprometer la recuperación.

Stöggl (2014) no incluyó un grupo piramidal específico en su diseño, lo que dificulta la comparación directa. Sin embargo, análisis retrospectivos de datos de entrenamiento en esquiadores de fondo y ciclistas profesionales sugieren que el piramidal y el polarizado producen resultados similares cuando el volumen total es alto. La divergencia aparece en atletas con menos horas disponibles: con 8-10 horas semanales, el polarizado parece superior porque maximiza la calidad de las sesiones intensas al eliminar la fatiga residual de la zona media.

## Respuesta individual y contexto competitivo

La discusión sobre modelos de intensidad no puede ignorar la variabilidad individual. Seiler (2010) enfatizó que la distribución óptima depende del deporte, el nivel del atleta, la fase de la temporada y el volumen total disponible. Un ciclista profesional que entrena 25 horas semanales tiene margen para incluir sesiones de zona 2 sin comprometer la calidad de sus intervalos. Un amateur con 8 horas semanales no tiene ese margen.

La periodización también juega un papel. Muchos entrenadores combinan modelos a lo largo de la temporada. Una fase base con distribución piramidal (más zona 2 para construir resistencia aeróbica) seguida de una fase específica con distribución polarizada (más zona 3 para desarrollar potencia máxima) es un enfoque habitual en ciclismo profesional. Neal et al. (2013) sugirieron que alternar entre modelos cada 4-6 semanas podría evitar el estancamiento adaptativo.

| Variable | Polarizado | Piramidal | Umbral |
|----------|-----------|-----------|--------|
| Mejora VO2max | +5-7% | +3-5% | +1-3% |
| Mejora potencia pico | +6-8% | +4-6% | +2-4% |
| Mejora umbral lactato | +4-6% | +3-5% | +3-5% |
| Fatiga acumulada | Baja | Moderada | Alta |
| Horas semanales óptimas | 6-15h | 12-25h | 8-12h |
| Mejor fase temporada | Específica | Base/Build | Build corto |

![Bicicletas estáticas para sesiones de entrenamiento estructurado con control de zonas de intensidad](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Implicaciones prácticas para ciclistas

La evidencia de Stöggl y Sperlich (2014), Neal et al. (2013) y los trabajos retrospectivos de Seiler apuntan en una dirección consistente. Para ciclistas con disponibilidad limitada de horas (entre 6 y 12 semanales), el modelo polarizado produce las mayores adaptaciones por hora invertida. Las sesiones de baja intensidad deben ser genuinamente fáciles, y las de alta intensidad deben ser genuinamente duras.

El error más frecuente entre ciclistas amateur es la gravitación involuntaria hacia la zona media. Seiler lo denominó "black hole training": entrenar demasiado fuerte en los días fáciles y demasiado suave en los días duros. El resultado es una acumulación de fatiga sin el estímulo adaptativo correspondiente. Monitorizar la distribución real con un medidor de potencia o pulsómetro es el primer paso para corregir esta tendencia.

Para quienes entrenan más de 15 horas semanales, el modelo piramidal ofrece una alternativa viable que incorpora trabajo de tempo sin sacrificar las ganancias aeróbicas. La clave es que las sesiones de zona 2 complementen, no reemplacen, el trabajo de alta intensidad. El modelo umbral queda reservado para bloques cortos y específicos, nunca como distribución crónica de entrenamiento.

La ciencia del entrenamiento ha avanzado desde las discusiones cualitativas sobre "cuánto tempo hacer" hacia datos cuantitativos sobre distribución óptima. Los números de Stöggl son claros: 80% zona baja, 15% zona alta, 5% zona media. Esa fórmula no es un dogma, pero es el punto de partida más respaldado por evidencia que existe hoy en el entrenamiento de resistencia.
