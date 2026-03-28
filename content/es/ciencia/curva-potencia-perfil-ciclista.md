---
title: "Curva de Potencia: Qué Revela Tu Perfil de Ciclista"
subtitle: "El mapa completo de tus capacidades neuromusculares y metabólicas en una sola gráfica"
section: "ciencia"
date: "2026-03-28"
author: "Sofía Müller"
tags: ["curva de potencia", "potencia crítica", "W prime", "perfil ciclista", "power profiling"]
sources:
  - title: "Power-duration relationship: Physiology, fatigue, and the limits of human performance"
    url: "https://pubmed.ncbi.nlm.nih.gov/27806677/"
    type: pubmed
  - title: "Critical Power: An Important Fatigue Threshold in Exercise Physiology"
    url: "https://pubmed.ncbi.nlm.nih.gov/27031742/"
    type: pubmed
  - title: "Power profiling and the power-duration relationship in cycling: a narrative review"
    url: "https://pubmed.ncbi.nlm.nih.gov/34708276/"
    type: pubmed
  - title: "Physical demands and power profile of different stage types within a cycling grand tour"
    url: "https://pubmed.ncbi.nlm.nih.gov/30589390/"
    type: pubmed
  - title: "The critical power and related whole-body bioenergetic models"
    url: "https://pubmed.ncbi.nlm.nih.gov/16284785/"
    type: pubmed
  - title: "Determination of critical power using a 3-min all-out cycling test"
    url: "https://pubmed.ncbi.nlm.nih.gov/17473782/"
    type: pubmed
excerpt: "La curva de potencia-duración es la herramienta más completa para identificar las fortalezas y debilidades de un ciclista. Desde el sprint de 5 segundos hasta el esfuerzo sostenido de una hora, cada punto de la curva refleja un sistema energético distinto."
coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## Tu huella dactilar fisiológica

Cada ciclista tiene una curva de potencia única. Es la representación gráfica de la máxima potencia que puedes sostener para cada duración de esfuerzo, desde un sprint explosivo de cinco segundos hasta un esfuerzo prolongado de sesenta minutos o más. Pinot y Grappe (2011) la describieron como una "huella dactilar fisiológica" porque revela con precisión dónde residen las fortalezas y debilidades de cada corredor.

La curva no es un invento teórico. Cada punto corresponde a un récord personal real, registrado con potenciómetro. Cuando un ciclista acumula meses de datos, la envolvente superior de todos sus esfuerzos máximos dibuja una curva hiperbólica que desciende rápidamente en los primeros segundos y se aplana progresivamente hacia las duraciones largas. Esa forma hiperbólica no es casual. Refleja la transición entre los sistemas energéticos que dominan cada rango de duración.

## Los cuatro perfiles clásicos

No todos los ciclistas dibujan la misma curva. Schabort et al. (2000) y más recientemente Pinot y Grappe (2015) clasificaron los perfiles de rendimiento en categorías según la distribución relativa de potencia a lo largo de la curva. Un sprinter genera valores extraordinarios en los primeros 5 a 15 segundos pero decae marcadamente en esfuerzos de más de 3 minutos. Un escalador muestra la imagen inversa: valores moderados en el sprint pero una curva que se mantiene elevada en duraciones de 5 a 60 minutos.

El rodador o especialista en contrarreloj presenta una curva relativamente plana, sin picos extremos pero con valores consistentemente altos desde el minuto hasta la hora. El todoterreno, frecuente entre ciclistas de gran vuelta como Pogačar o Roglič, combina capacidades razonables en todo el espectro sin un déficit marcado en ningún rango.

<ChartArea
  title="Curvas de potencia por perfil de ciclista (nivel elite)"
  caption="Fuente: Adaptado de Pinot y Grappe (2015), valores en W/kg para ciclistas profesionales"
  data={[
    { duracion: "5s", sprinter: 23.5, escalador: 16.0, rodador: 18.5, todoterreno: 19.0 },
    { duracion: "15s", sprinter: 17.0, escalador: 12.5, rodador: 14.0, todoterreno: 14.5 },
    { duracion: "30s", sprinter: 12.5, escalador: 10.0, rodador: 11.0, todoterreno: 11.2 },
    { duracion: "1min", sprinter: 9.5, escalador: 8.5, rodador: 8.8, todoterreno: 9.0 },
    { duracion: "3min", sprinter: 6.5, escalador: 7.2, rodador: 7.0, todoterreno: 7.0 },
    { duracion: "5min", sprinter: 5.5, escalador: 6.8, rodador: 6.5, todoterreno: 6.5 },
    { duracion: "10min", sprinter: 4.8, escalador: 6.4, rodador: 6.2, todoterreno: 6.1 },
    { duracion: "20min", sprinter: 4.2, escalador: 6.2, rodador: 6.0, todoterreno: 5.9 },
    { duracion: "60min", sprinter: 3.5, escalador: 5.8, rodador: 5.7, todoterreno: 5.5 }
  ]}
  xKey="duracion"
  areas={[
    { key: "sprinter", color: "#E11D48", name: "Sprinter" },
    { key: "escalador", color: "#7C3AED", name: "Escalador" },
    { key: "rodador", color: "#0891B2", name: "Rodador" },
    { key: "todoterreno", color: "#0D9488", name: "Todoterreno" }
  ]}
  unit=" W/kg"
/>

La diferencia es notable en los extremos. En el sprint de 5 segundos, un sprinter profesional puede superar los 23 W/kg mientras un escalador apenas alcanza 16 W/kg. Pero en esfuerzos de 20 a 60 minutos la relación se invierte: el escalador sostiene 6.0-5.8 W/kg donde el sprinter puro cae a 4.2-3.5 W/kg. Son dos máquinas fisiológicas radicalmente distintas.

![Test de VO2max en laboratorio — la fisiología detrás de cada punto de la curva de potencia](https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## El modelo de potencia crítica

Detrás de la curva hay un modelo matemático con casi un siglo de evolución. Monod y Scherrer (1965) propusieron originalmente el concepto de potencia crítica (CP), y desde entonces se ha convertido en una de las herramientas más robustas de la fisiología del ejercicio. Jones et al. (2019) lo describieron como un "umbral fisiológico fundamental" que separa los dominios de intensidad pesada y severa.

El modelo tiene dos parámetros. La potencia crítica (CP) representa la máxima potencia que teóricamente se puede sostener de forma indefinida sin acumulación progresiva de metabolitos. En la práctica, corresponde aproximadamente a un esfuerzo sostenible entre 30 y 60 minutos en ciclistas entrenados. El segundo parámetro es W' (W prima), una cantidad finita de trabajo que se puede realizar por encima de CP antes de alcanzar el agotamiento. Poole et al. (2016) demostraron que W' refleja principalmente la capacidad anaeróbica y las reservas de fosfocreatina y glucógeno disponibles para esfuerzos por encima del umbral.

La relación entre ambos parámetros es sencilla. Para cualquier potencia por encima de CP, el tiempo hasta el agotamiento se calcula dividiendo W' entre la diferencia entre la potencia de trabajo y CP. Si tu CP es 300 W y tu W' es 20 kJ, a 400 W aguantarás exactamente 200 segundos (20.000 J dividido entre 100 W). A 350 W, aguantarás 400 segundos. La curva hiperbólica emerge naturalmente de esta ecuación.

## W' como reserva táctica

En competición, W' funciona como un depósito de energía que se gasta y se recarga. Skiba et al. (2012) desarrollaron un modelo de reconstitución de W' que permite estimar en tiempo real cuánta reserva queda disponible. Cada aceleración por encima de CP consume W'. Cada período por debajo de CP lo recarga parcialmente.

Un ciclista con un W' grande (25-30 kJ) puede permitirse múltiples ataques en un puerto porque tiene más "cerillas" que quemar. Uno con un W' pequeño (10-15 kJ) pero un CP muy alto preferirá imponer un ritmo sostenido que agote las reservas anaeróbicas de sus rivales. El primero gana con explosividad repetida. El segundo gana por desgaste. La estrategia óptima depende de conocer ambos parámetros.

## Cómo determinar tu CP y W'

Existen varios protocolos validados. El método clásico requiere entre 3 y 5 esfuerzos máximos de diferente duración (típicamente 2, 5, 10 y 20 minutos) realizados en días separados. Se ajusta la curva hiperbólica a los datos y se extraen CP y W'. Vanhatalo et al. (2007) validaron un protocolo más práctico: el test de 3 minutos "all-out", donde el ciclista pedalea a máxima intensidad durante 3 minutos. La potencia media de los últimos 30 segundos estima CP, y el trabajo total por encima de esa potencia estima W'.

El test de 3 minutos tiene la ventaja de requerir una sola sesión, pero exige un esfuerzo verdaderamente máximo desde el primer segundo. Si el ciclista se dosifica, la estimación será errónea. Para quienes usan plataformas como WKO5 o Golden Cheetah, el modelado de la curva de potencia a partir de datos acumulados ofrece una estimación continua sin necesidad de tests formales.

## Valores de referencia por nivel

La siguiente tabla resume los rangos típicos de CP y W' según el nivel competitivo, basados en los datos recopilados por Pinot y Grappe (2015) y Sanders y Heijboer (2019).

| Nivel | CP (W/kg) | W' (kJ) | Potencia 5s (W/kg) | Potencia 5min (W/kg) |
|-------|-----------|---------|---------------------|----------------------|
| Recreativo | 2.0–2.8 | 8–15 | 10–14 | 2.5–3.2 |
| Entrenado | 2.8–3.5 | 12–20 | 14–17 | 3.2–4.0 |
| Competitivo | 3.5–4.5 | 15–25 | 16–20 | 4.0–5.2 |
| Elite | 4.5–5.5 | 18–28 | 18–22 | 5.2–6.2 |
| WorldTour | 5.5–6.5 | 20–32 | 19–24 | 6.2–7.0 |

Un dato que suele sorprender es la variabilidad de W'. Dos ciclistas con CP idéntica pueden tener W' que difieren en un factor de dos. Eso significa que uno aguanta el doble de tiempo que el otro a cualquier potencia supracrítica. Sanders y Heijboer (2019) documentaron esta variabilidad incluso entre ciclistas profesionales del WorldTour, lo que refuerza la idea de que CP y W' son parámetros complementarios e independientes.

## Qué zona de la curva entrenar

Conocer tu curva de potencia permite identificar la zona que más limita tu rendimiento. Un ciclista con buen CP pero bajo W' se beneficiará de incluir intervalos cortos de alta intensidad (30 segundos a 2 minutos) que estimulen las adaptaciones anaeróbicas. Uno con buen W' pero CP bajo necesita volumen aeróbico y trabajo al umbral para elevar su capacidad sostenible.

Sylta et al. (2014) encontraron que la distribución de intensidad óptima varía según el perfil individual. No existe una receta universal. Lo que la curva de potencia ofrece es un diagnóstico preciso: muestra exactamente dónde está el cuello de botella y, por tanto, dónde el entrenamiento tendrá el mayor retorno.

La curva también evoluciona con el tiempo. Comparar la curva actual con la de hace tres o seis meses permite evaluar si el entrenamiento está produciendo las adaptaciones deseadas en la zona correcta. Un aumento de CP con W' estable indica mejora aeróbica. Un aumento de W' con CP estable indica mejora anaeróbica. Ambos subiéndose simultáneamente es la señal de que el programa de entrenamiento está funcionando de forma integral.

## No es solo un número

La curva de potencia-duración trasciende el simple registro de récords personales. Es una ventana directa a la fisiología del ciclista, un mapa que muestra qué sistemas energéticos dominan, dónde están los puntos fuertes y dónde los déficits. Combinada con el modelo de potencia crítica, permite planificar estrategias de carrera, diseñar entrenamientos específicos y monitorizar adaptaciones con una precisión que ninguna otra herramienta iguala.

Morton (2006) argumentó que el modelo de potencia crítica es "el más validado y fisiológicamente fundamentado" de todos los modelos de rendimiento en ciencias del deporte. Décadas de investigación le dan la razón. Para el ciclista que entrena con potenciómetro, entender su curva no es un lujo académico. Es la base sobre la que se construyen todas las decisiones de entrenamiento y competición.
