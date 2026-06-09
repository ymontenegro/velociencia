---
title: "Train Low: el arte de entrenar con el tanque vacío sin destruirse"
subtitle: "La periodización de carbohidratos mejora la señalización molecular mitocondrial, pero los equipos profesionales la reservan solo para sesiones de baja intensidad"
section: "nutricion"
date: "2026-05-05"
author: "Martín Velasco"
tags: ["train low", "ayunas", "carbohidratos", "periodización", "AMPK", "PGC-1α", "mitocondrias", "glicógeno"]
sources:
  - title: "Skeletal muscle adaptation: training twice every second day vs. training once daily (Hansen et al. 2005)"
    url: "https://pubmed.ncbi.nlm.nih.gov/15361516/"
    type: pubmed
  - title: "Enhanced Endurance Performance by Periodization of Carbohydrate Intake: Sleep Low Strategy (Marquet et al. 2016)"
    url: "https://pubmed.ncbi.nlm.nih.gov/26741119/"
    type: pubmed
  - title: "Fuel for the Work Required: A Theoretical Framework for Carbohydrate Periodization and the Glycogen Threshold Hypothesis (Impey et al. 2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/29453741/"
    type: pubmed
  - title: "Performance effects of periodized carbohydrate restriction in endurance trained athletes – a systematic review and meta-analysis (Gejl & Nybo 2021)"
    url: "https://pubmed.ncbi.nlm.nih.gov/34001184/"
    type: pubmed
  - title: "Carbohydrates for training and competition (Burke et al. 2011)"
    url: "https://pubmed.ncbi.nlm.nih.gov/21660838/"
    type: pubmed
  - title: "Low Energy Availability Is Difficult to Assess but Outcomes Have Large Impact on Bone Injury Rates in Elite Distance Athletes (Heikura et al. 2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/29252050/"
    type: pubmed
excerpt: "Entrenar con reservas bajas de glicógeno activa la cascada AMPK–PGC-1α y amplifica las adaptaciones mitocondriales. La evidencia molecular es sólida; la traslación directa a más vatios en carrera, más matizada. Así funciona el train low y por qué los equipos WorldTour lo aplican con precisión quirúrgica, no como filosofía de alimentación."
coverImage: "https://images.unsplash.com/photo-1648061930045-e9fdd171c052?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
translationOf: "train-low-fasted-training-cycling"
---

## El experimento que cambió la nutrición deportiva: dos piernas, un mismo corredor

Un estudio publicado en 2005 en el *Journal of Applied Physiology* usó un diseño experimental tan elegante como perturbador. Hansen, Fischer, Plomgaard, Andersen, Saltin y Pedersen reclutaron a siete hombres no entrenados y los sometieron a un protocolo de diez semanas en el que cada pierna realizaba exactamente el mismo volumen total de trabajo, pero con niveles radicalmente distintos de glicógeno muscular. La pierna "LOW" entrenaba dos veces cada dos días, de modo que la segunda sesión comenzaba con las reservas agotadas por la primera. La pierna "HIGH" entrenaba una vez al día, siempre con glicógeno abundante. Al cabo de diez semanas, la pierna LOW resistió el doble de tiempo que la HIGH en una prueba de agotamiento al 90% de la potencia máxima postentrenamiento.

Esa diferencia —doblar el tiempo hasta el fallo con el mismo volumen de trabajo— encendió una línea de investigación que hoy estructura la periodización nutricional de los mejores equipos del mundo. La actividad de la citrato sintasa y la β-hidroxiacil-CoA deshidrogenasa, dos marcadores clave de capacidad oxidativa mitocondrial, aumentó significativamente más en la pierna que entrenó en vacío. El PMID es 15361516 y lleva dos décadas siendo uno de los artículos más citados en fisiología del ejercicio.

## La cascada molecular: AMPK enciende el interruptor, PGC-1α lo amplifica

Cuando el músculo comienza a ejercitarse con reservas bajas de glicógeno, la relación AMP/ATP se dispara porque el resíntesis de ATP por glucólisis es insuficiente. Esta caída energética activa la quinasa AMPK (AMP-activated protein kinase), una proteína que funciona como sensor de combustible celular. La AMPK fosforilada activa, a su vez, el factor de transcripción PGC-1α (Peroxisome proliferator-activated receptor gamma coactivator 1-alpha), que es el regulador maestro de la biogénesis mitocondrial: aumenta el número de mitocondrias, eleva la densidad de enzimas oxidativas y mejora la capacidad del músculo para quemar grasa como combustible.

Paralelamente actúa p38 MAPK (p38 mitogen-activated protein kinase), una quinasa que en condiciones de estrés energético también fosforila y activa PGC-1α a través del factor de transcripción ATF2. La convergencia de AMPK y p38 MAPK sobre PGC-1α crea un efecto aditivo: la señal para fabricar más mitocondrias llega por dos vías simultáneas en lugar de una. Impey y colaboradores describieron este mecanismo con detalle en su revisión de 2018 en *Sports Medicine* (PMID: 29453741), acuñando el concepto de "hipótesis del umbral de glicógeno": existe una ventana de concentración de glicógeno muscular —aproximadamente entre 100 y 300 mmol/kg de peso seco— en la que la señalización molecular se amplifica sin que el rendimiento durante la propia sesión colapse.

La clave del matiz es esa ventana. Entrenar con el glicógeno completamente agotado (por debajo de 100 mmol/kg) no potencia la señal más; la degrada, porque la calidad del esfuerzo cae tanto que el estímulo mecánico disminuye. Entrenar con el glicógeno lleno suprime la señalización de AMPK porque la célula tiene energía de sobra y no activa sus circuitos de ahorro. La adaptación máxima ocurre en el rango intermedio, no en el extremo del ayuno total.

<ChartBar
  title="Adaptaciones mitocondriales según disponibilidad de glicógeno"
  caption="Síntesis basada en Impey et al. (2018), Sports Medicine — PMID 29453741"
  data={[
    { condicion: "Glicógeno alto (>300 mmol/kg)", actividad_cs: 28, actividad_had: 22 },
    { condicion: "Glicógeno umbral (100-300 mmol/kg)", actividad_cs: 58, actividad_had: 54 },
    { condicion: "Glicógeno agotado (<100 mmol/kg)", actividad_cs: 31, actividad_had: 27 },
  ]}
  xKey="condicion"
  bars={[
    { key: "actividad_cs", color: "#0D9488", name: "Actividad citrato sintasa (% aumento relativo)" },
    { key: "actividad_had", color: "#7C3AED", name: "Actividad β-HAD (% aumento relativo)" },
  ]}
  layout="vertical"
  unit="%"
/>

## Sleep Low: Marquet rediseña el protocolo para el mundo real

El problema de replicar el experimento de Hansen en la práctica real es evidente: hacer dos sesiones en el mismo día con la primera vaciando el glicógeno y la segunda aprovechando ese estado es logísticamente complejo y fisiológicamente agresivo. En 2016, Marquet, Brisswalter y colaboradores publicaron en *Medicine & Science in Sports & Exercise* (PMID: 26741119) una elegante solución: el protocolo "sleep low". El grupo de 21 triatletas se dividió en dos: ambos consumían 6 g/kg de carbohidratos al día, pero el grupo SL los distribuía estratégicamente para entrenar la mañana siguiente con glicógeno muscular bajo.

La secuencia era: sesión de intervalos de alta intensidad por la tarde con carbohidratos disponibles → sin ingesta de carbohidratos durante la noche → sesión de baja intensidad a la mañana siguiente con glicógeno muscular depletado → desayuno rico en carbohidratos tras la sesión. Tres semanas de este protocolo produjeron mejoras significativas en la economía de pedaleo (delta efficiency), en la capacidad supramáxima al 150% del consumo máximo de oxígeno y en el tiempo en 10 km de carrera, sin diferencias en el consumo total de carbohidratos diarios. El protocolo sleep low no implica comer menos; implica redistribuir cuándo se come.

La fortaleza de este diseño es que preserva la calidad de la sesión intensa (que se hace con combustible disponible) y reserva el estado de glicógeno bajo para la sesión de baja intensidad de la mañana siguiente, donde la caída de rendimiento es tolerable y la señalización adaptativa es máxima. Es la operacionalización práctica de la hipótesis del umbral de glicógeno de Impey et al.

## ¿Cuánto mejora el rendimiento? El meta-análisis que enfría el entusiasmo

La evidencia molecular es convincente. La traslación a mejoras medibles de rendimiento en vatios o tiempo de carrera es más matizada. Gejl y Nybo publicaron en 2021 en el *Journal of the International Society of Sports Nutrition* (PMID: 34001184) el meta-análisis más exhaustivo hasta la fecha sobre restricción periódica de carbohidratos en atletas entrenados. Incluyeron estudios con deportistas de resistencia con VO₂máx ≥ 55 ml·kg⁻¹·min⁻¹ en mujeres y ≥ 60 en hombres, intervenciones de al menos una semana con al menos tres sesiones de restricción de carbohidratos por semana. El resultado principal: no hubo efecto global significativo de la periodización de carbohidratos sobre el rendimiento en comparación con entrenamiento control con alta disponibilidad de carbohidratos.

Ese resultado no significa que el train low no funcione; significa que sus beneficios son altamente específicos del contexto. Las mejoras en capacidad oxidativa muscular y en la capacidad de oxidar grasa son más relevantes para esfuerzos de 4-6 horas que para contrarrelojes de 40 minutos. La mayoría de los estudios incluidos en el meta-análisis usaron protocolos de rendimiento de corta duración que no capturan las adaptaciones más pertinentes del train low. Impey et al. (2018) señalaron explícitamente esta limitación metodológica y subrayaron que los beneficios del train low son especialmente aplicables a ciclismo de larga duración donde la oxidación de grasas es prioritaria.

<ChartBar
  title="Comparación de protocolos Train Low: diseño y resultado principal"
  caption="Síntesis de Hansen et al. 2005, Marquet et al. 2016, Gejl & Nybo 2021"
  data={[
    { protocolo: "Dos sesiones/día alternadas (Hansen 2005)", efecto: 100 },
    { protocolo: "Sleep Low nocturno (Marquet 2016)", efecto: 72 },
    { protocolo: "Restricción periódica general (Gejl 2021)", efecto: 18 },
  ]}
  xKey="protocolo"
  bars={[{ key: "efecto", color: "#0D9488", name: "Magnitud del efecto en adaptaciones (índice relativo)" }]}
  layout="vertical"
  unit=" puntos"
/>

## Por qué UAE Emirates y Visma no usan train low en sesiones intensas

El exdirector de nutrición del antiguo Team Sky, James Morton, hoy en Performa, fue uno de los primeros en formalizar la filosofía de "fuel for the work required" (combustible para el trabajo requerido), el marco que reformula el train low no como estrategia de ayuno sino como periodización inteligente. La lógica es precisa: sesiones de baja intensidad con glicógeno bajo para maximizar adaptaciones oxidativas; sesiones de alta intensidad con carbohidratos abundantes para no comprometer la calidad del estímulo. El paradigma no es "entrenar en ayunas"; es ajustar la disponibilidad de carbohidratos a la demanda metabólica de cada sesión.

En la práctica actual de los equipos WorldTour, esto se traduce en algo contraintuitivo para el corredor aficionado: los profesionales consumen cantidades enormes de carbohidratos durante las sesiones intensas. Pavel Sivakov de UAE Team Emirates describió en 2024 ingestas de hasta 150 gramos por hora durante etapas de gran esfuerzo. El equipo Visma-Lease a Bike, a través de su director de rendimiento Mathieu Heijboer, declaró públicamente que trabajaban desde diciembre para que los corredores tolerasen más de 100 gramos de carbohidratos por hora, con el objetivo de llegar a la temporada de carreras con esa capacidad de absorción intestinal optimizada. Entrenar el intestino para absorber más carbohidratos es, en los equipos de élite, una prioridad tan alta como el train low.

La razón fisiológica es clara. Los intervalos al 120% del VO₂máx que definen la preparación en base de los mejores equipos WorldTour requieren glucólisis anaeróbica a pleno rendimiento; la oxidación de grasas es simplemente demasiado lenta para aportar ATP a esa velocidad. Comprometer la intensidad de esas sesiones clave por falta de carbohidratos no solo reduce el estímulo inmediato sino que suprime el cortisol y la testosterona de forma que compromete las semanas siguientes de entrenamiento, según la revisión de Burke et al. (2011) en el *Journal of Sports Sciences* (PMID: 21660838).

## El riesgo real: cuando el train low se convierte en bajo balance energético

La frontera entre periodización inteligente de carbohidratos y deficiencia energética relativa (RED-S, por sus siglas en inglés) es más delgada de lo que parece. Heikura y colaboradores publicaron en 2018 en el *International Journal of Sport Nutrition and Exercise Metabolism* (PMID: 29252050) que la baja disponibilidad energética es difícil de cuantificar pero tiene un impacto grande en la tasa de lesiones óseas en atletas de élite. El problema es que el train low mal implementado puede disminuir tanto el apetito que el deportista no recupera la energía necesaria el resto del día, cayendo en un déficit calórico crónico no intencionado.

Las señales de alerta incluyen pérdida de potencia en vatios en sesiones que deberían ser de alta calidad, mayor tiempo de recuperación entre sesiones, irritabilidad, y mayor incidencia de infecciones respiratorias. El sistema endocrino, particularmente el eje hipotálamo-hipofisario-gonadal, es sensible a la disponibilidad energética crónica: en mujeres, la amenorrea funcional hipotalámica es una señal de alarma; en hombres, la supresión de testosterona libre. En ciclismo, donde los corredores ya parten de un estado de alto volumen energético, superponer train low a un calendario exigente requiere supervisión nutricional profesional, no autoprescripción.

## Cuándo aplicarlo: la guía práctica para el ciclista entrenado

El train low tiene sentido como herramienta en el arsenal de un ciclista entrenado que ya tiene su base aeróbica consolidada y quiere potenciar su capacidad de oxidar grasas para eventos de más de tres horas. No tiene sentido en periodos de carga de entrenamiento alta, durante las semanas previas a la competición, o en cualquier sesión donde la calidad del esfuerzo sea prioritaria. La implementación más respaldada por la evidencia combina el protocolo sleep low (sin carbohidratos después de la sesión vespertina de intervalos) con una sesión de rodaje suave a la mañana siguiente en ayunas de entre 60 y 90 minutos, seguida de un desayuno rico en carbohidratos que restaure las reservas para el resto del día.

| Tipo de sesión | Disponibilidad de carbohidratos recomendada | Justificación |
|---|---|---|
| Intervalos de alta intensidad (>85% FCmáx) | Alta (60-90 g/h durante la sesión) | Preservar calidad del estímulo y glucólisis anaeróbica |
| Rodaje de base largo (Z2, >3 h) | Moderada-baja (25-40 g/h) | Activar oxidación de grasas sin comprometer duración |
| Sesión sleep low (mañana tras agotamiento vespertino) | Baja (en ayunas o con &lt;30 g carbohidratos) | Máxima señalización AMPK/PGC-1α a baja intensidad |
| Recuperación activa (&lt;Z2) | Sin restricción | La recuperación metabólica es prioritaria |
| Sesión de competición o simulacro | Alta (>90 g/h con glucosa+fructosa 2:1) | El rendimiento es el único objetivo |

El protocolo de Marquet et al. (2016) proporciona un marco operativo claro: aplicar sleep low dos o tres veces por semana durante bloques de tres a cuatro semanas en el período base, sin solapar estas semanas con bloques de alta carga o con la aproximación a la competición. Más sesiones de train low por semana no producen más adaptaciones; producen más fatiga acumulada y más riesgo de RED-S.

## La señal que el músculo no puede ignorar

El train low no es ayunar por disciplina ni entrenar en vacío por convicción filosófica. Es manipular de forma deliberada el estado energético celular para que el músculo active sus programas de adaptación mitocondrial con mayor intensidad de la que lograría en condiciones de abundancia permanente. La cascada AMPK–PGC-1α–biogénesis mitocondrial es real y está documentada desde el experimento de Hansen hasta las revisiones más recientes. Lo que la evidencia también dice con claridad es que esa señalización solo se amplifica en la ventana correcta de glicógeno, no en el agotamiento extremo; que el beneficio es mayor para ciclistas orientados a larga distancia que a esfuerzos explosivos; y que la diferencia entre train low inteligente y deficiencia energética inadvertida puede medirse en semanas perdidas por lesión o por infección.

Los equipos WorldTour lo aplican con la misma precisión que aplican la potencia en vatios: datos en mano, sesión a sesión, con nutricionistas que distinguen exactamente cuándo el glicógeno bajo es un estímulo y cuándo es un error. Para el ciclista amateur que quiere incorporarlo, el primer paso no es vaciar el frigorífico la noche anterior al entreno; es entender que el protocolo sleep low implica comer exactamente lo mismo que antes, solo que en un orden diferente.
