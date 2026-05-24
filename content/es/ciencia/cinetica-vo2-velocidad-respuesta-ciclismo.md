---
title: "Mismo VO₂max, distinto coste: la cinética del VO₂ decide cuánto pagas en cada arranque"
subtitle: "La constante temporal τ separa a ciclistas entrenados (~25 s) de desentrenados (>45 s) — esa diferencia determina el déficit de oxígeno acumulado en cada aceleración, independientemente del techo aeróbico"
section: "ciencia"
date: "2026-05-24"
author: "Sofía Müller"
tags: ["cinética del VO₂", "VO₂max", "constante temporal tau", "déficit de oxígeno", "componente lento", "priming exercise", "intervalos cortos", "fisiología del ejercicio"]
sources:
  - title: "Whipp BJ, Wasserman K. Oxygen uptake kinetics for various intensities of constant-load work. J Appl Physiol. 1972;33(3):351-6"
    url: "https://pubmed.ncbi.nlm.nih.gov/5056210/"
    type: pubmed
  - title: "Poole DC, Jones AM. Oxygen Uptake Kinetics. Compr Physiol. 2012;2(2):933-996"
    url: "https://pubmed.ncbi.nlm.nih.gov/23798293/"
    type: pubmed
  - title: "Jones AM, Burnley M. Oxygen uptake kinetics: an underappreciated determinant of exercise performance. Int J Sports Physiol Perform. 2009;4(4):524-32"
    url: "https://pubmed.ncbi.nlm.nih.gov/20029103/"
    type: pubmed
  - title: "Xu F, Rhodes EC. Oxygen uptake kinetics during exercise. Sports Med. 1999;27(5):313-27"
    url: "https://pubmed.ncbi.nlm.nih.gov/10368878/"
    type: pubmed
  - title: "Bailey SJ, Vanhatalo A, Wilkerson DP, DiMenna FJ, Jones AM. Optimizing the 'priming' effect: influence of prior exercise intensity and recovery duration on O2 uptake kinetics and severe-intensity exercise tolerance. J Appl Physiol. 2009;107(6):1743-56"
    url: "https://pubmed.ncbi.nlm.nih.gov/19797685/"
    type: pubmed
  - title: "Rønnestad BR, Hansen J, Vegge G, Tønnessen E, Slettaløkken G. Short intervals induce superior training adaptations compared with long intervals in cyclists - an effort-matched approach. Scand J Med Sci Sports. 2015;25(2):143-51"
    url: "https://pubmed.ncbi.nlm.nih.gov/24382021/"
    type: pubmed
  - title: "Rønnestad BR, Hansen J, Nygaard H, Lundby C. Superior performance improvements in elite cyclists following short-interval vs effort-matched long-interval training. Scand J Med Sci Sports. 2020;30(5):849-857"
    url: "https://pubmed.ncbi.nlm.nih.gov/31977120/"
    type: pubmed
excerpt: "El VO₂max fija el techo aeróbico, pero la cinética del VO₂ determina cuán rápido llegas a ese techo. En ciclistas entrenados la constante temporal τ se sitúa entre 20 y 30 segundos; en no entrenados supera con frecuencia los 45 segundos. Esa brecha define el coste anaeróbico de cada arranque, aceleración e inicio de intervalo — y es modificable con entrenamiento."
coverImage: "https://images.unsplash.com/photo-1709601415546-dcd24c912e56?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## Mismo techo, diferente velocidad de respuesta

Dos ciclistas con un $\dot{V}O_2$max idéntico de 72 ml·kg⁻¹·min⁻¹ pueden pagar costes fisiológicos radicalmente distintos al salir de una curva a máxima potencia. Uno activa su metabolismo aeróbico con una constante temporal de 25 segundos; el otro necesita casi el doble de tiempo para alcanzar el mismo porcentaje de respuesta. Durante ese intervalo en que el aporte de oxígeno no cubre la demanda, el músculo tira de fosfocreatina (PCr) y de la vía glucolítica anaeróbica —reservas finitas que no se reponen gratis. El $\dot{V}O_2$max fija el techo de lo que el sistema aeróbico puede entregar; la cinética del $\dot{V}O_2$ determina cuán rápido llega a ese techo tras cada transición de intensidad. Jones y Burnley escribieron en *International Journal of Sports Physiology and Performance* en 2009 que la cinética del $\dot{V}O_2$ es "un determinante del rendimiento subestimado" que los perfiles fisiológicos estándar rara vez cuantifican (PMID 20029103).

## El déficit de oxígeno al inicio del ejercicio

En el instante en que un ciclista pasa de zona 2 a un esfuerzo por encima del umbral, la demanda metabólica sube en milisegundos pero el sistema oxidativo tarda decenas de segundos en ajustarse. La diferencia entre lo que el músculo necesita y lo que el metabolismo aeróbico entrega se denomina déficit de oxígeno, y debe cubrirse con sustratos anaeróbicos: principalmente las reservas de fosfocreatina y, en menor medida, la glucólisis rápida con producción de lactato. Whipp y Wasserman demostraron en 1972, en un estudio publicado en *Journal of Applied Physiology* con sujetos realizando trabajo a distintas intensidades constantes, que el $\dot{V}O_2$ asciende de forma exponencial tras el inicio del ejercicio y que la velocidad de ese ascenso varía con la intensidad de carga y con el estado de entrenamiento (PMID 5056210). Cuanto más lento es el ascenso —es decir, cuanto mayor es la constante temporal τ— mayor es el área bajo la curva del déficit, y mayor el desgaste sobre las reservas anaeróbicas que el ciclista necesitará para los esfuerzos siguientes.

## Las tres fases de la respuesta: un arco de cuatro minutos

La respuesta del $\dot{V}O_2$ al inicio del ejercicio no es una sola exponencial, sino un proceso estructurado en tres fases con orígenes fisiológicos distintos. La Fase I, o componente cardiodinámico, dura entre 10 y 20 segundos: refleja el aumento brusco del gasto cardíaco y el mayor retorno de sangre venosa desoxigenada al pulmón; el $\dot{V}O_2$ sube rápido en esta fase, pero no porque los músculos estén extrayendo más oxígeno, sino porque hay más flujo sanguíneo pasando por el intercambio pulmonar. La Fase II, denominada componente primario, es el ascenso exponencial que describe la activación real del metabolismo oxidativo muscular y que se modela matemáticamente como:

$$\dot{V}O_2(t) = \dot{V}O_{2,\text{base}} + A \cdot \left(1 - e^{-(t - t_0)/\tau}\right)$$

donde $A$ es la amplitud de la respuesta, $t_0$ es el inicio de la fase y $\tau$ es la constante temporal que determina la velocidad del ajuste. La Fase III corresponde al estado estable —o, si la intensidad supera la potencia crítica, a la deriva ascendente conocida como componente lento del $\dot{V}O_2$. Poole y Jones caracterizaron en detalle esta arquitectura de tres fases en su revisión de 2012 en *Comprehensive Physiology*, que integra décadas de evidencia sobre el control del metabolismo oxidativo durante el ejercicio (PMID 23798293).

## τ: la cifra que distingue al entrenado del sedentario

La constante temporal $\tau$ es el tiempo necesario para que el $\dot{V}O_2$ alcance el 63% de su respuesta final en la Fase II. En ciclistas bien entrenados, $\tau$ se sitúa típicamente entre 20 y 30 segundos; en personas con bajo nivel cardiorrespiratorio o desentrenadas, los valores superan con frecuencia los 45 segundos, llegando en algunos casos a 60-70 segundos. Xu y Rhodes revisaron la literatura en *Sports Medicine* en 1999 y documentaron que el entrenamiento aeróbico sostenido es el principal factor que reduce $\tau$, a través de la mayor densidad mitocondrial, el mejor acoplamiento oxidativo y la mejora en el aporte de oxígeno a la mitocondria en el músculo activo (PMID 10368878). El efecto práctico de esa diferencia es concreto: con $\tau$ = 25 s, a los 75 segundos de esfuerzo el ciclista ya opera al 95% de su $\dot{V}O_2$ objetivo; con $\tau$ = 45 s, el mismo 95% no se alcanza hasta pasados los 135 segundos —sesenta segundos más de trabajo parcialmente cubierto por metabolismo anaeróbico.

<ChartLine
  title="Cinética del VO₂: entrenado vs. desentrenado"
  caption="Esquema basado en Poole & Jones, Comprehensive Physiology (2012). Valores expresados como porcentaje de la demanda de VO₂ cubierta por el metabolismo aeróbico."
  data={[
    { x: "0 s", entrenado: 0, desentrenado: 0 },
    { x: "15 s", entrenado: 20, desentrenado: 15 },
    { x: "30 s", entrenado: 45, desentrenado: 28 },
    { x: "45 s", entrenado: 70, desentrenado: 49 },
    { x: "60 s", entrenado: 83, desentrenado: 63 },
    { x: "90 s", entrenado: 95, desentrenado: 81 },
    { x: "120 s", entrenado: 99, desentrenado: 90 },
    { x: "180 s", entrenado: 100, desentrenado: 97 }
  ]}
  xKey="x"
  lines={[
    { key: "entrenado", color: "#7C3AED", name: "Entrenado (τ ≈ 25 s)" },
    { key: "desentrenado", color: "#64748B", name: "Desentrenado (τ ≈ 45 s)" }
  ]}
  unit="%"
/>

## El componente lento: la eficiencia que se disuelve por encima del umbral

A intensidades dentro del dominio pesado —entre el umbral de lactato y la potencia crítica— y especialmente en el dominio severo, por encima de la potencia crítica, el $\dot{V}O_2$ no se estabiliza al final de la Fase II: continúa ascendiendo lentamente durante varios minutos adicionales. Este fenómeno, el componente lento del $\dot{V}O_2$, significa que para mantener la misma potencia de pedaleo se necesita progresivamente más oxígeno, lo que equivale a una caída continua de la eficiencia bruta. El mecanismo principal apunta al reclutamiento progresivo de fibras musculares de tipo II: conforme las fibras tipo I se fatigan, el sistema nervioso central recluta fibras de reserva que consumen más ATP por unidad de trabajo externo producido. Poole y Jones cuantificaron en su revisión de 2012 que el componente lento puede añadir hasta 500-600 ml·min⁻¹ al $\dot{V}O_2$ en ejercicio severo (PMID 23798293), equivalente a subir un escalón completo en la escala de esfuerzo percibido sin haber cambiado nada en el pedal.

## El calentamiento no es un ritual: es fisiología

Un calentamiento que incluya al menos un segmento de intensidad moderada-alta —denominado en la literatura "priming exercise" o ejercicio de imprimación— reduce el déficit de oxígeno al inicio del esfuerzo principal de forma mensurable. Bailey et al. investigaron en el *Journal of Applied Physiology* de 2009 la dosis óptima de este estímulo previo en ocho ciclistas: encontraron que ejercicio a aproximadamente el 70% del rango entre el umbral de lactato y el $\dot{V}O_2$max, seguido de una recuperación de 9 a 20 minutos, aceleraba la cinética del $\dot{V}O_2$ y mejoraba la tolerancia al esfuerzo severo en hasta un 30% (PMID 19797685). La recuperación insuficiente —3 minutos— anulaba el beneficio e incluso empeoraba el rendimiento, porque la deuda metabólica del calentamiento todavía pesaba sobre el inicio del esfuerzo principal. Los mecanismos propuestos incluyen mayor temperatura muscular, elevación residual del $\dot{V}O_2$ basal que reduce el escalón que hay que subir, y posiblemente mejoras en la activación enzimática oxidativa. Sin ese calentamiento específico, los primeros 60-90 segundos de un intervalo de alta intensidad transcurren parcialmente en deuda, erosionando las reservas de W' que serán necesarias cuando la carrera se decida.

## Intervalos cortos y el aprovechamiento de la cinética rápida

Cuando la cinética del $\dot{V}O_2$ es rápida y las recuperaciones son cortas, el $\dot{V}O_2$ no cae completamente entre repeticiones: cada intervalo siguiente empieza desde un nivel elevado de consumo de oxígeno, minimizando el déficit y maximizando el tiempo en zona de estímulo aeróbico alto. Rønnestad et al. compararon en *Scandinavian Journal of Medicine & Science in Sports* de 2015 el efecto de diez semanas de entrenamiento con intervalos cortos (13 × 30 s / 15 s recuperación) frente a intervalos largos de esfuerzo equivalente en dieciséis ciclistas: el grupo de intervalos cortos mejoró el $\dot{V}O_2$max un 8.7% frente al 2.6% del grupo largo, con tamaños del efecto moderados a grandes (PMID 24382021). En un estudio posterior de 2020 del mismo grupo con ciclistas de élite —$\dot{V}O_2$max aproximado de 73 ml·kg⁻¹·min⁻¹—, solo tres semanas de intervención bastaron para demostrar mejoras del 4.7% en el test de 20 minutos para los intervalos cortos, frente a −1.4% en los largos (PMID 31977120). La interpretación fisiológica unifica lo que parecían hallazgos empíricos dispersos: los protocolos 30/15 mantienen al ciclista cerca del $\dot{V}O_2$max durante una fracción mayor del tiempo total de sesión precisamente porque la cinética rápida del ciclista entrenado hace que la recuperación de 15 segundos sea insuficiente para que el $\dot{V}O_2$ caiga a niveles basales.

## Lo que significa para el ciclista que no trabaja en laboratorio

La cinética del $\dot{V}O_2$ no aparece en el archivo de la salida ni en el informe del potenciómetro, pero su efecto es tangible cada vez que el grupo acelera en un repecho, cada vez que la carrera explota en los primeros kilómetros o cada vez que un intervalo comienza sin el calentamiento adecuado. Tres conclusiones prácticas tienen respaldo directo en la evidencia revisada. Un calentamiento con al menos 10 minutos de intensidad moderada-alta seguido de recuperación pasiva no es tiempo perdido antes del esfuerzo principal: es la diferencia entre empezar cubriendo el 70% de la demanda aeróbica o el 90%. Los intervalos cortos con recuperaciones incompletas no son "más fáciles" que los intervalos largos: son un método para acumular más tiempo con el $\dot{V}O_2$ elevado por sesión, precisamente porque la cinética entrenada mantiene el sistema aeróbico activo entre repeticiones. Y la reducción de τ con entrenamiento aeróbico sistemático es uno de los efectos más documentados en las primeras semanas de adaptación, lo que explica por qué el umbral percibido de esfuerzo cae tan rápido al comenzar un bloque de entrenamiento. El techo del $\dot{V}O_2$ acapara la conversación; la velocidad a la que se llega a él mueve los resultados en cada arranque, cada puerto y cada final de etapa.
