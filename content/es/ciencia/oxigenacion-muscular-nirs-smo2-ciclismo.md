---
title: "Oxigenación Muscular en Ciclismo: Qué Mide Realmente un Sensor NIRS"
subtitle: "El SmO₂ promete una ventana directa al metabolismo muscular, pero la ley de Beer-Lambert y el tejido adiposo subcutáneo tienen algo importante que decir antes de confiar en los números"
section: "ciencia"
date: "2026-06-21"
author: "Sofía Müller"
tags: ["NIRS", "SmO2", "oxigenación muscular", "fisiología", "umbrales", "Moxy", "espectroscopía", "ciencia del entrenamiento"]
sources:
  - title: "Muscle Oximetry in Sports Science: A Systematic Review — Perrey & Ferrari (2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/29177977/"
    type: pubmed
  - title: "Near-infrared spectroscopy and skeletal muscle oxidative function in vivo in health and disease — Grassi & Quaresima (2016)"
    url: "https://pubmed.ncbi.nlm.nih.gov/27443955/"
    type: pubmed
  - title: "Muscle Oxygen Saturation Breakpoints Reflect Ventilatory Thresholds in Both Cycling and Running — Feldmann et al. (2022)"
    url: "https://pubmed.ncbi.nlm.nih.gov/36157967/"
    type: pubmed
  - title: "Near infrared brain and muscle oximetry: from the discovery to current applications — Ferrari & Quaresima (2012)"
    url: "https://journals.sagepub.com/doi/10.1255/jnirs.973"
    type: doi
  - title: "Validity and reliability of the Moxy oxygen monitor during incremental cycling exercise — Crum et al. (2017)"
    url: "https://pubmed.ncbi.nlm.nih.gov/28557670/"
    type: pubmed
  - title: "Near-infrared spectroscopy-derived muscle oxygen saturation on a 0% to 100% scale: reliability and validity of the Moxy Monitor — Feldmann, Schmitz & Erlacher (2019)"
    url: "https://pubmed.ncbi.nlm.nih.gov/31741352/"
    type: pubmed
excerpt: "Un sensor del tamaño de una moneda pegado al cuádriceps puede medir la saturación de oxígeno muscular en tiempo real. La espectroscopía de infrarrojo cercano (NIRS) lleva más de una década en laboratorios de fisiología del ejercicio y hoy está disponible en dispositivos de consumo como el Moxy. Pero antes de interpretar esos números, hay que entender qué mide realmente, bajo qué condiciones falla, y qué puede —y qué no puede— decirle a un ciclista sobre su entrenamiento."
coverImage: "https://images.unsplash.com/photo-1709601415546-dcd24c912e56?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
translationOf: "muscle-oxygenation-nirs-smo2-cycling"
---

## Un sensor adherido al cuádriceps

Durante un test incremental en cicloergómetro, el sensor NIRS registra un dato cada dos segundos sobre el vasto lateral: cuánto oxígeno transporta la hemoglobina local en ese preciso volumen de músculo. La espectroscopía de infrarrojo cercano (NIRS, del inglés *near-infrared spectroscopy*) trabaja en longitudes de onda de 700 a 900 nanómetros, una región del espectro donde la luz penetra el tejido biológico —piel, grasa y músculo— varios centímetros antes de ser absorbida o dispersada de vuelta hacia el detector. A diferencia de un pulsioxímetro de dedo, que mide la saturación arterial sistémica de la sangre, el sensor NIRS interroga directamente el tejido muscular: registra lo que ocurre en el extremo distal del suministro de oxígeno, donde la mitocondria lo consume. Perrey y Ferrari describieron el método en su revisión sistemática de 2018 en *Sports Medicine* (PMID 29177977) como una herramienta que proporciona información sin precedentes sobre el metabolismo muscular en condiciones deportivas reales.

## El principio físico: la ley de Beer-Lambert modificada

La base matemática del método es la ley de Beer-Lambert, que en su formulación clásica relaciona la absorbancia de la luz con la concentración del soluto y la longitud del trayecto óptico. En tejido biológico, donde la luz no viaja en línea recta sino que se dispersa repetidamente por las membranas celulares, el modelo clásico debe modificarse para incorporar ese efecto de dispersión:

$$\Delta A_\lambda = \varepsilon_\lambda \cdot \Delta c \cdot d \cdot DPF$$

En esta expresión, $\Delta A_\lambda$ es el cambio en la absorbancia a la longitud de onda $\lambda$; $\varepsilon_\lambda$ es el coeficiente de extinción molar del cromóforo (una constante conocida); $\Delta c$ es el cambio en la concentración del cromóforo; $d$ es la separación física entre el emisor y el detector (la distancia inter-optodo); y $DPF$ es el factor de longitud de trayecto diferencial, que corrige empíricamente cuánto más largo es el recorrido real de la luz respecto a la distancia geométrica entre los optodos. El $DPF$ varía según el tejido, el individuo y la longitud de onda: en músculo esquelético adulto se sitúa entre 4 y 6, pero su valor exacto no se mide en cada caso; se asume un valor promedio de la literatura, lo que introduce una fuente de imprecisión que afecta a la calibración absoluta.

## Qué mide exactamente: SmO₂ y tHb

Los dos cromóforos que dominan la absorción de luz infrarroja en el músculo son la oxihemoglobina ($[HbO_2]$) y la desoxihemoglobina ($[HHb]$). A partir de sus señales, el dispositivo calcula dos parámetros principales: la saturación de oxígeno muscular (SmO₂) y la hemoglobina total (tHb):

$$\text{SmO}_2 = \frac{[HbO_2]}{[HbO_2] + [HHb]} \times 100\%$$

$$\text{tHb} = [HbO_2] + [HHb]$$

Aquí aparece un matiz técnico que la literatura divulgativa suele omitir: la mioglobina —la proteína transportadora de oxígeno alojada en las propias fibras musculares— tiene un espectro de absorción casi idéntico al de la hemoglobina en la ventana del infrarrojo cercano. El sensor no puede distinguir la señal de una proteína frente a la de la otra, por lo que el SmO₂ reportado incluye en realidad la contribución conjunta de hemoglobina y mioglobina. Grassi y Quaresima señalaron en su revisión de 2016 en *Journal of Biomedical Optics* (PMID 27443955) que la proporción relativa de cada proteína en la señal sigue siendo objeto de controversia, y que en condiciones de alta intensidad la mioglobina podría dominar la desaturación registrada. El parámetro tHb, por su parte, refleja los cambios en el volumen sanguíneo local: aumenta cuando llega sangre al músculo y disminuye cuando la contracción colapsa los capilares, con una dinámica que complementa la información del SmO₂.

## SmO₂ como indicador de umbrales fisiológicos

La aplicación más estudiada del NIRS en ciclismo es la identificación de umbrales fisiológicos a partir de cambios de pendiente en la curva de SmO₂ durante un test incremental. Feldmann et al. (2022) publicaron en *Journal of Human Kinetics* (PMID 36157967) un estudio con 10 participantes (5 ciclistas y 5 corredores, nivel recreativo a moderadamente entrenado) que realizaron tests escalonados en cicloergómetro y cinta de correr con medición simultánea de gases espirados, lactato y NIRS en el vasto lateral. Identificaron dos puntos de ruptura en la curva de SmO₂ —SmO₂-BP1 y SmO₂-BP2— que mostraron concordancia moderada con el primer y segundo umbral ventilatorio (VT1 y VT2) según el análisis de Bland-Altman; el SmO₂ mínimo alcanzado durante el protocolo de ciclismo mostró una correlación de R² = 0,85 (r ≈ 0,92) con el VO₂pico, sustancialmente más débil en carrera (R² = 0,27). La concordancia fue más débil en carrera que en bicicleta, lo que los autores atribuyeron a la mayor variabilidad en el reclutamiento muscular durante la carrera frente al movimiento más restringido del pedaleo.

<ChartLine
  title="Desaturación de SmO₂ en test incremental: patrones representativos"
  caption="Esquemático basado en Feldmann et al. (2022) y valores típicos reportados en la literatura. BP1 y BP2 indican los puntos de ruptura aproximados que corresponden a VT1 y VT2."
  data={[
    { potencia: "100 W", entrenado: 70, recreativo: 70 },
    { potencia: "150 W", entrenado: 65, recreativo: 62 },
    { potencia: "200 W", entrenado: 58, recreativo: 50 },
    { potencia: "230 W", entrenado: 51, recreativo: 40 },
    { potencia: "260 W", entrenado: 42, recreativo: 29 },
    { potencia: "300 W", entrenado: 28, recreativo: 18 },
    { potencia: "340 W", entrenado: 18, recreativo: null }
  ]}
  xKey="potencia"
  lines={[
    { key: "entrenado", color: "#7C3AED", name: "Ciclista entrenado" },
    { key: "recreativo", color: "#0891B2", name: "Ciclista recreativo" }
  ]}
  unit=" %"
/>

En reposo, los valores de SmO₂ en ciclistas entrenados oscilan habitualmente entre 60 y 80 %, con alta variabilidad individual. Durante trabajo en zona 2 (aeróbica moderada), el músculo desatura hasta 50-65 %; a potencias cercanas al VT2 continúa descendiendo hasta 30-45 %; y en esfuerzos máximos sostenidos, ciclistas entrenados pueden alcanzar valores de 15-25 %. El patrón de resaturación post-esfuerzo —la velocidad con que SmO₂ recupera los valores basales tras el cese del pedaneo— ha sido propuesto como índice de capacidad aeróbica local, pero los protocolos de evaluación de esta cinética no están estandarizados entre laboratorios y su interpretación clínica es preliminar.

## Dispositivos vestibles: Moxy y Train.Red

El Moxy Monitor, desarrollado en Canadá y disponible en el mercado desde 2013, fue el primer dispositivo NIRS de consumo diseñado específicamente para el entrenamiento deportivo. Crum et al. (2017) evaluaron su validez y fiabilidad en *European Journal of Sport Science* (PMID 28557670) con 10 ciclistas altamente entrenados en un test incremental: el SmO₂ mostró fiabilidad de moderada a alta a intensidades bajas, pero esta disminuyó conforme aumentó la intensidad relativa, probablemente por artefactos de movimiento y variaciones en la presión del sensor contra la piel. Feldmann, Schmitz y Erlacher (2019) validaron el Moxy mediante el método de oclusión arterial en *Journal of Biomedical Optics* (PMID 31741352) y concluyeron que los cambios relativos dentro de una sesión son fiables para el seguimiento del entrenamiento, pero que las diferencias absolutas entre sesiones o entre dispositivos distintos pueden ser metodológicamente relevantes. Train.Red, lanzado más recientemente, ofrece conectividad Bluetooth con aplicaciones como Zwift y permite monitorizar múltiples músculos simultáneamente, aunque la evidencia peer-reviewed independiente sobre su precisión es hasta ahora más escasa que la disponible para el Moxy.

![Ciclista con analizador metabólico portátil VO2 Master durante test de campo en bicicleta](https://images.unsplash.com/photo-1709601414337-373519366406?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Tejido adiposo y artefactos de movimiento: las dos limitaciones del NIRS

El grosor del tejido adiposo subcutáneo (TTAS) es la limitación más documentada y más ignorada en el uso práctico del NIRS. La luz infrarroja debe atravesar la grasa subcutánea antes de llegar al músculo, y este tejido la atenúa y dispersa de forma proporcional a su grosor: Feldmann et al. (2019; PMID 31741352) encontraron que el TTAS explicaba hasta R² = 0,80 de la varianza en el SmO₂ mínimo alcanzado durante la oclusión arterial completa en el vasto lateral con el Moxy. En términos prácticos, un ciclista con 14 mm de grasa subcutánea en el muslo registrará una curva de SmO₂ sistemáticamente distinta a la de uno con 6 mm, aunque su estado fisiológico sea idéntico; el primero verá valores más altos en reposo y un rango de desaturación más estrecho durante el ejercicio. Este sesgo sistemático hace que la comparación de valores absolutos entre individuos sin ajustar por TTAS sea metodológicamente cuestionable, y es la razón por la que los datos normativos publicados en la literatura deben tomarse como referencia orientativa, no como rangos absolutos de diagnóstico.

Los artefactos de movimiento constituyen el segundo problema principal. La contracción cíclica del cuádriceps durante el pedaleo genera microvibraciones y cambios en la presión sensor-piel que se traducen en fluctuaciones espurias en la señal; los algoritmos de filtrado incluidos en los dispositivos de consumo reducen este ruido pero no lo eliminan. La variabilidad entre sitios de medición también es relevante: el SmO₂ registrado en el vasto lateral difiere del obtenido en el recto femoral, el gastrocnemio o el glúteo mayor, y los patrones de reclutamiento muscular cambian con la intensidad, la cadencia, la posición sobre la bicicleta y la fatiga acumulada. Por último, la ausencia de una calibración absoluta estandarizada entre fabricantes implica que 55 % en un Moxy y 55 % en un Train.Red no son valores necesariamente equivalentes; los cambios relativos dentro del mismo dispositivo y sesión —deltas, pendientes, breakpoints— son mucho más informativos que los valores crudos.

<ChartBar
  title="Coeficiente de variación de SmO₂ según grosor de tejido adiposo subcutáneo"
  caption="Valores representativos basados en la literatura NIRS. A mayor grosor adiposo, mayor ruido en la señal y menor fiabilidad de los valores absolutos de SmO₂."
  data={[
    { grupo: "< 7 mm (delgado)", cv: 3.1 },
    { grupo: "7–14 mm (medio)", cv: 6.4 },
    { grupo: "> 14 mm (grueso)", cv: 11.2 }
  ]}
  xKey="grupo"
  bars={[{ key: "cv", color: "#7C3AED", name: "CV (%)" }]}
  unit=" %"
  layout="vertical"
/>

## Seguimiento longitudinal y umbrales de campo: los usos con mayor respaldo

Para un ciclista con dispositivo NIRS, el uso con mayor respaldo es el seguimiento longitudinal de sus propios patrones de desaturación a intensidades controladas. Comparar el SmO₂ a 250 W en junio contra el mismo valor en septiembre —con el mismo dispositivo, en el mismo punto de medición, con la misma estrategia de fijación del sensor— aporta información sobre cambios en la capacidad oxidativa local que no depende de la comparación con tablas normativas. La detección de SmO₂-BP2 en un test de campo incremental es más reproducible que la estimación del VT2 solo por frecuencia cardíaca o percepción del esfuerzo, aunque requiere un protocolo estandarizado de potencia escalonada y una curva suavizada adecuada. Lo que el sensor no puede proporcionar, con la tecnología y los protocolos actuales, es un valor absoluto de SmO₂ con significado universal o un reemplazo de una prueba de esfuerzo con análisis de gases espirados cuando la precisión diagnóstica es lo que está en juego.

El NIRS es una herramienta de monitorización del entrenamiento, no un sistema de diagnóstico fisiológico de precisión. Cuando se entiende qué mide —la saturación local de hemoglobina y mioglobina en un volumen reducido de músculo, filtrada por el tejido adiposo y sujeta a variabilidad de calibración— y qué no mide —el metabolismo sistémico, el lactato, el consumo de oxígeno global— su uso se vuelve más riguroso y, paradójicamente, más útil.
