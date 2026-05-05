---
title: "Cadencia Óptima en Ciclismo: La Fisiología Detrás de la Elección de RPM"
subtitle: "Por qué los profesionales pedalean a 90 RPM aunque no sea lo más eficiente, y qué dice la ciencia sobre la cadencia ideal para cada ciclista"
section: "ciencia"
date: "2026-05-05"
author: "Sofía Müller"
tags: ["cadencia", "RPM", "fisiología", "eficiencia", "fibras musculares", "rendimiento"]
sources:
  - title: "Linear increase in optimal pedal rate with increased power output in cycle ergometry"
    url: "https://pubmed.ncbi.nlm.nih.gov/4039261/"
    type: pubmed
  - title: "Preferred pedalling cadence in professional cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/11474339/"
    type: pubmed
  - title: "Effect of cycling experience, aerobic power, and power output on preferred and most economical cycling cadences"
    url: "https://pubmed.ncbi.nlm.nih.gov/9309635/"
    type: pubmed
  - title: "The effect of pedaling frequency on glycogen depletion rates in type I and type II quadriceps muscle fibers during submaximal cycling exercise"
    url: "https://pubmed.ncbi.nlm.nih.gov/1385118/"
    type: pubmed
  - title: "The most economical cadence increases with increasing workload"
    url: "https://pubmed.ncbi.nlm.nih.gov/15232702/"
    type: pubmed
  - title: "Muscle fibre type, efficiency, and mechanical optima affect freely chosen pedal rate during cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/12392498/"
    type: pubmed
  - title: "Effect of cycling cadence on contractile and neural properties of knee extensors"
    url: "https://pubmed.ncbi.nlm.nih.gov/11689739/"
    type: pubmed
excerpt: "En etapas llanas del Tour de Francia, los profesionales mantienen 89-92 RPM. En los puertos de montaña caen a 71 RPM. Pero los estudios metabólicos apuntan a cadencias de 60-80 RPM como las más eficientes en términos de oxígeno. La paradoja lleva décadas en la literatura científica y su resolución tiene implicaciones concretas para cualquier ciclista."
coverImage: "https://images.unsplash.com/photo-1741649897268-ac29908a9a91?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## La paradoja de los 90 RPM

En etapas llanas del Tour de Francia, los ciclistas profesionales mantienen una cadencia promedio de 89 a 92 RPM. Lucía et al. (2001) monitorizaron la cadencia de corredores del WorldTour durante tres grandes vueltas —Tour, Giro y Vuelta— y registraron ese rango en carreteras planas y contrarrelojes, frente a apenas 71 RPM en los grandes puertos de montaña. El dato resulta desconcertante cuando se contrasta con la evidencia metabólica: los estudios de consumo de oxígeno indican sistemáticamente que pedalear a 60-65 RPM a potencias submáximas requiere menos oxígeno por vatio producido que hacerlo a 90 RPM. Si los profesionales conocen su oficio mejor que nadie, ¿por qué eligen una cadencia que, en papel, resulta menos eficiente?

La respuesta no es sencilla y ha ocupado a la fisiología del ejercicio durante cuatro décadas. Detrás de la elección de cadencia operan al menos tres sistemas que compiten por imponer su óptimo particular: el metabólico, el neuromuscular y el biomecánico. El punto donde estos tres sistemas llegan a un compromiso no es fijo ni universal: depende de la potencia, de la fatiga acumulada, del perfil de fibras musculares de cada ciclista y de los años de experiencia sobre la bicicleta. Entender cómo interactúan estos factores permite tomar decisiones más fundamentadas sobre el entrenamiento y la estrategia en competición.

## El primer mapa: cadencia óptima y potencia

Coast y Welch (1985) publicaron el estudio que dio el primer marco matemático al problema. Cinco ciclistas entrenados realizaron pruebas progresivas hasta el agotamiento a cinco cadencias distintas: 40, 60, 80, 100 y 120 RPM. El análisis de los datos mostró que la cadencia a la que se obtenía la menor tasa metabólica para una potencia dada no era constante, sino que aumentaba linealmente con la potencia de trabajo. A 100 W, la cadencia más económica rondaba los 50-55 RPM; a 250 W, había ascendido a 75-80 RPM. La variación era lineal y estadísticamente robusta.

Foss y Hallén (2004) confirmaron y extendieron ese hallazgo con seis ciclistas de elite en un protocolo que incluyó pruebas submáximas y máximas a 60, 80, 100 y 120 RPM. La cadencia más económica —definida como la que producía el menor consumo de oxígeno para una potencia dada— se desplazaba de 60 RPM a potencias cercanas a cero hasta 80 RPM a 350 W. Publicado en *European Journal of Applied Physiology*, el estudio añadía un matiz importante: a potencias máximas, una cadencia más alta permitía a los ciclistas desarrollar mayor potencia pico, incluso cuando el coste metabólico por vatio era ligeramente superior.

<ChartLine
  title="Cadencia más económica según potencia de trabajo"
  caption="Fuente: Adaptado de Coast & Welch (1985) y Foss & Hallén (2004)"
  data={[
    { potencia: "100 W", economica: 52, preferida_rec: 68, preferida_pro: 82 },
    { potencia: "150 W", economica: 58, preferida_rec: 74, preferida_pro: 86 },
    { potencia: "200 W", economica: 65, preferida_rec: 78, preferida_pro: 89 },
    { potencia: "250 W", economica: 71, preferida_rec: 82, preferida_pro: 91 },
    { potencia: "300 W", economica: 77, preferida_rec: 85, preferida_pro: 93 },
    { potencia: "350 W", economica: 80, preferida_rec: 87, preferida_pro: 95 }
  ]}
  xKey="potencia"
  lines={[
    { key: "economica", color: "#7C3AED", name: "Cadencia más económica (menor VO₂)" },
    { key: "preferida_rec", name: "Cadencia preferida — recreativo", color: "#0891B2" },
    { key: "preferida_pro", name: "Cadencia preferida — profesional", color: "#E11D48" }
  ]}
  unit=" RPM"
/>

La implicación práctica es clara: no existe una cadencia óptima única. Cualquier afirmación del tipo "90 RPM es el valor correcto" ignora que ese número solo tiene sentido en relación con la potencia que se está produciendo. A 150 W la cadencia más económica es sustancialmente diferente a la que corresponde a 300 W para el mismo ciclista.

## Lo que hacen los profesionales frente a lo que dice el metabolismo

El estudio de Lucía et al. (2001) con ciclistas profesionales en competición reveló una brecha sistemática entre la cadencia metabólicamente óptima y la cadencia elegida libremente. En etapas llanas, los corredores mantenían 89.3 RPM de media; en contrarrelojes, 92.4 RPM; en los grandes puertos de montaña, 71.0 RPM. El trabajo se publicó en *Medicine & Science in Sports & Exercise* y analizó miles de kilómetros de carrera real, con 7 ciclistas de elite distribuidos en los tres grandes tours.

A las potencias que los profesionales producen en etapas llanas —entre 300 y 380 W para corredores de elite— la cadencia más económica según los datos de Foss y Hallén ronda los 77-80 RPM, no los 89-92 que observó Lucía. La diferencia es de 10-15 RPM y no se explica por el metabolismo energético. Marsh y Martin (1997), publicando en *Medicine & Science in Sports & Exercise* con 32 sujetos divididos en grupos por experiencia, potencia aeróbica y potencia de trabajo, encontraron que los ciclistas más entrenados preferían cadencias sistemáticamente más altas que los recreativos para idénticas condiciones de potencia y que esa preferencia no coincidía con su cadencia más económica. La experiencia desplazaba el sistema hacia cadencias más altas de forma progresiva e independiente del metabolismo.

![Ciclista profesional en rodaje intenso sobre carretera alpina](https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## El papel de las fibras musculares

La distribución de fibras musculares actúa como un segundo determinante de la cadencia preferida. Ahlquist et al. (1992) pusieron a ocho sujetos a pedalear durante 30 minutos al 85% de su VO₂max a dos cadencias: 50 RPM y 100 RPM. El análisis de biopsias del músculo vasto lateral mostró que la cadencia alta (100 RPM) deplecionaba selectivamente el glucógeno de las fibras tipo I, las lentas y oxidativas, mientras que la cadencia baja (50 RPM) forzaba un mayor reclutamiento de fibras tipo II, las rápidas y glucolíticas. Publicado en *European Journal of Applied Physiology*, el estudio indicaba que la cadencia no es fisiológicamente neutra respecto al tipo de fibra que se recluta.

Hansen et al. (2002) midieron la cadencia elegida libremente en un grupo de ciclistas cuya composición de fibras había sido determinada mediante biopsia muscular. La cadencia libre oscilaba entre 56 y 88 RPM según el sujeto, y esa variabilidad correlacionaba significativamente con el porcentaje de cadena pesada de miosina tipo I (%MHC I) en el vasto lateral. A mayor proporción de fibras lentas, mayor cadencia preferida. El mecanismo fisiológico es coherente: las fibras tipo I alcanzan su eficiencia mecánica máxima a velocidades de contracción más altas que las fibras tipo II. Un músculo dominado por fibras lentas extrae más potencia útil por ciclo a cadencias elevadas, lo que empuja la preferencia hacia RPM más altos incluso cuando el coste metabólico se incrementa.

La implicación es directa para la variabilidad individual: dos ciclistas con el mismo VO₂max y el mismo FTP pueden tener cadencias óptimas muy distintas si difieren en su proporción de fibras tipo I. El ciclista con perfil muscular más aeróbico —más frecuente en escaladores puros— tenderá a funcionar mejor a cadencias altas aunque consuma más oxígeno por vatio. El perfil con mayor proporción de fibras rápidas —más común en rodadores y sprinters— obtendrá mayor eficiencia muscular a cadencias más moderadas.

## La hipótesis neuromuscular: por qué los pros eligen cadencias altas

La explicación que mejor resuelve la paradoja de los 90 RPM profesionales no viene del metabolismo sino de la fatiga neuromuscular. Lepers, Millet y Maffiuletti (2001) evaluaron a ocho triatletas que completaron 30 minutos al 80% de su potencia aeróbica máxima a tres cadencias distintas: su cadencia libremente elegida, esa cadencia menos un 20%, y esa cadencia más un 20%. Antes y después de cada prueba, midieron las propiedades contráctiles y neurales del cuádriceps mediante electroestimulación del nervio femoral. La publicación en *Medicine & Science in Sports & Exercise* mostró que la cadencia más alta producía menos fatiga en los parámetros de fuerza contráctil del cuádriceps al final del esfuerzo, a pesar de tener un coste metabólico marginalmente superior.

El mecanismo subyacente es mecánico: a cadencias más altas, la fuerza que el músculo debe ejercer en cada pedalazo para mantener la misma potencia es menor. La potencia es el producto de fuerza por velocidad, y si la velocidad angular del pedal sube, la fuerza necesaria baja proporcionalmente. Pedalear a 90 RPM en lugar de 60 RPM con la misma potencia reduce la fuerza por ciclo en un tercio. Esa reducción de fuerza disminuye el estrés mecánico sobre las fibras musculares, atenúa la coactivación de antagonistas y preserva la capacidad contráctil para las fases finales del esfuerzo. En una carrera de cinco horas con ataques en los últimos 40 kilómetros, el músculo que ha acumulado menos estrés mecánico responde mejor en los momentos decisivos.

Esta hipótesis explica también por qué los profesionales bajan a 71 RPM en los grandes puertos de montaña. Las pendientes pronunciadas fuerzan potencias absolutas más bajas —incluso ciclistas de alto nivel producen entre 350 y 450 W en una subida, comparado con potencias más variables en etapas llanas— y en ese rango la cadencia más económica desciende hacia el umbral de los 70-75 RPM según los modelos de Coast y Welch. Además, la posición inclinada sobre la bicicleta en pendiente altera la geometría muscular y reduce la capacidad de generar velocidad angular alta de forma eficiente. Las montañas empujan la cadencia hacia abajo por factores tanto metabólicos como biomecánicos.

## La cadencia no es universal: qué significa para el ciclista promedio

Marsh y Martin (1997) detectaron una diferencia media de 8-10 RPM entre ciclistas sin experiencia y ciclistas con varios años de entrenamiento estructurado, para idénticas condiciones de potencia y eficiencia aeróbica. Los ciclistas noveles tendían a elegir cadencias más bajas, cercanas al valor metabólicamente óptimo para esa potencia. Los experimentados optaban por cadencias más altas, priorizando implícitamente la economía neuromuscular sobre la economía metabólica. El estudio incluyó 32 sujetos de tres grupos distintos y sugería que la adaptación hacia cadencias más altas ocurre de forma progresiva con el entrenamiento, posiblemente como resultado de una optimización de los patrones motores y del reclutamiento muscular.

<ChartBar
  title="Cadencia promedio en profesionales según tipo de etapa (Tour, Giro, Vuelta)"
  caption="Fuente: Lucía et al. (2001), Med Sci Sports Exerc 33:1361–1366"
  data={[
    { etapa: "Contrarreloj", cadencia: 92.4 },
    { etapa: "Etapa llana", cadencia: 89.3 },
    { etapa: "Alta montaña", cadencia: 71.0 }
  ]}
  xKey="etapa"
  bars={[{ key: "cadencia", color: "#7C3AED", name: "Cadencia media (RPM)" }]}
  unit=" RPM"
  layout="vertical"
/>

Para un ciclista recreativo que produce entre 150 y 200 W en sus salidas habituales, la cadencia metabólicamente óptima según los datos de Foss y Hallén se sitúa entre 60 y 70 RPM. Sin embargo, mantener 80-85 RPM en ese rango de potencia, aunque cueste un 3-5% más de oxígeno, puede representar una inversión metabólica razonable si el objetivo es preservar la capacidad muscular para la segunda mitad de una salida larga o el último repecho del recorrido. El coste metabólico adicional de pedalear a cadencia alta a potencias bajas es pequeño; el beneficio en fatiga muscular acumulada puede ser significativo en esfuerzos de más de 90 minutos.

En cambio, ciclistas que hacen esfuerzos cortos e intensos en terreno plano, como critérium o pruebas de contrarreloj corta, tienen incentivos distintos. A 350-400 W, la cadencia metabólicamente óptima ya ronda los 80-85 RPM y la brecha entre eficiencia metabólica y neuromuscular se estrecha. En esas condiciones, las diferencias entre 85 y 95 RPM en términos de coste de oxígeno son pequeñas y la elección puede guiarse principalmente por la biomecánica individual y el comfort motor.

## Limitaciones del conocimiento actual

La mayor parte de los estudios fundamentales sobre cadencia óptima utilizó muestras pequeñas —entre cinco y treinta sujetos— en laboratorio con ergómetros de freno electromagnético, condiciones que no reproducen perfectamente la variabilidad de la carretera real. Foss y Hallén trabajaron con seis ciclistas; Ahlquist con ocho; Lepers con ocho triatletas. Los efectos del terreno irregular, del pedaleo en grupo y de la variación táctica de la intensidad sobre la cadencia preferida están poco estudiados en condiciones ecológicas. Lucía et al. aportaron el mayor dataset con datos de competición real, pero su análisis era observacional y no podía controlar la interacción entre cadencia, potencia y pendiente de forma experimental.

La composición de fibras musculares es en gran parte de origen genético y difícil de modificar sustancialmente con entrenamiento, lo que limita hasta dónde puede desplazarse el óptimo individual de cadencia con la práctica. El consejo práctico más robusto que emerge de la literatura es que la cadencia preferida debe adaptarse a la potencia de trabajo, que los ciclistas con más años de entrenamiento tienden naturalmente hacia cadencias más altas, y que ningún valor único aplica a todos los contextos de intensidad y duración.

## Lo que dice la ciencia para pedalear mejor

La cadencia óptima en ciclismo no es un número sino una función. Depende de la potencia, de la duración del esfuerzo, del perfil muscular individual y del tipo de competición o entrenamiento. Coast y Welch establecieron en 1985 que la cadencia más económica sube linealmente con la potencia, y Foss y Hallén confirmaron casi dos décadas después que ese desplazamiento es consistente incluso en ciclistas de elite. Lucía demostró que los mejores del mundo eligen cadencias 10-15 RPM más altas que las metabólicamente óptimas para sus potencias de carrera, probablemente porque preservar el músculo es más valioso que ahorrar unos mililitros de oxígeno por minuto.

Para un ciclista que entrena con medidor de potencia y registra su cadencia, la recomendación más directa que se desprende de la evidencia disponible es calibrar los RPM según la potencia producida y el terreno. Cadencias de 75-85 RPM tienen sentido en esfuerzos de zona 3 y 4; subir a 85-95 RPM en esfuerzos por encima del umbral de lactato en terreno llano puede reducir la fatiga muscular acumulada sin un coste metabólico prohibitivo. Las subidas pronunciadas empujarán la cadencia hacia abajo de forma natural: resistirse a ese descenso con una marcha demasiado corta es tan poco productivo como pedalear innecesariamente lento en llano.

Dos ciclistas con el mismo FTP pueden diferir entre 10 y 15 RPM en su cadencia óptima si su composición de fibras es opuesta. Un ciclista con fibras predominantemente lentas no debería forzarse a pedalear a 70 RPM por razones de eficiencia metabólica si su sistema neuromuscular rinde mejor a 90. Otro con perfil más rápido puede encontrar que cadencias de 75-80 RPM le resultan más sostenibles en etapas largas. Los datos del potenciómetro, el medidor de frecuencia cardíaca y la percepción de fatiga al final de las salidas largas son los mejores instrumentos para encontrar ese punto de equilibrio individual.
