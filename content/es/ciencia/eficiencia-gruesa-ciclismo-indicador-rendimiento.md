---
title: "Eficiencia gruesa: el indicador que separa a los ganadores sin aparecer en el marcador"
subtitle: "Dos ciclistas con el mismo VO₂max, el mismo umbral de lactato y el mismo FTP pueden rendir de forma radicalmente distinta en carrera. La variable que falta en esa ecuación se llama eficiencia gruesa, y la ciencia la lleva treinta años intentando comprender y modificar."
section: "ciencia"
date: "2026-05-19"
author: "Sofía Müller"
tags: ["eficiencia gruesa", "gross efficiency", "fisiología", "VO2max", "fibras tipo I", "calorimetría indirecta", "rendimiento", "biomecánica"]
excerpt: "La eficiencia gruesa mide qué fracción de la energía metabólica se convierte en trabajo mecánico en los pedales. En ciclistas profesionales alcanza el 24-26%, frente al 18-22% de los amateurs. Su fuerte base genética y su modesta respuesta al entrenamiento la convierten en el predictor de rendimiento más difícil de alterar con horas de pedaleo."
coverImage: "https://images.unsplash.com/photo-1709601415546-dcd24c912e56?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "Physiological and biomechanical factors associated with elite endurance cycling performance — Coyle et al. (1991)"
    url: "https://pubmed.ncbi.nlm.nih.gov/1997818/"
    type: pubmed
  - title: "Cycling efficiency is related to the percentage of type I muscle fibers — Coyle, Sidossis, Horowitz, Beltz (1992)"
    url: "https://pubmed.ncbi.nlm.nih.gov/1501563/"
    type: pubmed
  - title: "Improved muscular efficiency displayed as Tour de France champion matures — Coyle (2005)"
    url: "https://pubmed.ncbi.nlm.nih.gov/15774697/"
    type: pubmed
  - title: "Inverse relationship between VO2max and economy/efficiency in world-class cyclists — Lucía et al. (2002)"
    url: "https://pubmed.ncbi.nlm.nih.gov/12471319/"
    type: pubmed
  - title: "In professional road cyclists, low pedaling cadences are less efficient — Lucía et al. (2004)"
    url: "https://pubmed.ncbi.nlm.nih.gov/15179176/"
    type: pubmed
  - title: "Physiological differences of elite and professional road cyclists — Sallet et al. (2006)"
    url: "https://pubmed.ncbi.nlm.nih.gov/16998438/"
    type: pubmed
  - title: "Endurance exercise performance: the physiology of champions — Joyner & Coyle (2008)"
    url: "https://pubmed.ncbi.nlm.nih.gov/17901124/"
    type: pubmed
  - title: "The effects of training on gross efficiency in cycling: a review — Hopker et al. (2009)"
    url: "https://pubmed.ncbi.nlm.nih.gov/19941249/"
    type: pubmed
  - title: "Changes in cycling efficiency during a competitive season — Hopker, Coleman, Passfield (2009)"
    url: "https://pubmed.ncbi.nlm.nih.gov/19276841/"
    type: pubmed
  - title: "Inverse relationship between VO2max and gross efficiency — Hopker, Coleman, Jobson, Passfield (2012)"
    url: "https://pubmed.ncbi.nlm.nih.gov/22562732/"
    type: pubmed
  - title: "The Relationship between Physiological Characteristics and Durability in Male Professional Cyclists — Spragg, Leo, Swart (2023)"
    url: "https://pubmed.ncbi.nlm.nih.gov/35977108/"
    type: pubmed
translationOf: "gross-efficiency-cycling-performance-indicator"
---

## El tercer pilar que nadie mira

Cuando Edward Coyle publicó en 2008 junto a Michael Joyner su revisión "Endurance exercise performance: the physiology of champions" en *The Journal of Physiology* (PMID 17901124), el mensaje era preciso: el rendimiento de fondo está determinado por tres factores fisiológicos interrelacionados. El primero es el VO₂max, que fija el techo de consumo de oxígeno. El segundo es el umbral de lactato, que determina a qué fracción de ese techo se puede pedalear de forma sostenida. El tercero es la eficiencia, que define cuánta potencia mecánica genera el músculo por cada litro de oxígeno consumido. Los dos primeros llevan décadas en el radar de entrenadores y ciclistas. El tercero sigue siendo, en buena medida, el gran olvidado en el análisis del rendimiento cotidiano.

La razón de ese olvido no es que la eficiencia sea menor. Es que no aparece en ningún marcador de ciclocomputador, no se refleja directamente en el FTP y requiere calorimetría de laboratorio para medirse con precisión. Pero su impacto es concreto: un ciclista con un VO₂max de 75 ml/kg/min y una eficiencia gruesa (GE, del inglés *gross efficiency*) de 24% produce aproximadamente 16 vatios por kilogramo en condiciones de umbral. Otro ciclista con el mismo VO₂max pero una GE de 21% produce unos 14 vatios por kilogramo. La diferencia de 3 puntos porcentuales en eficiencia representa, en términos de vatios por kilo, una brecha que ningún bloque de entrenamiento en altura puede cerrar fácilmente.

## Qué es y cómo se calcula

La eficiencia gruesa expresa el porcentaje de la energía metabólica total consumida durante el ejercicio que se convierte en trabajo mecánico. Su fórmula es:

$$GE(\%) = \frac{W_{mec} \times 60}{\dot{V}O_2 \times EE_{O_2} \times 1000} \times 100$$

donde $W_{mec}$ es la potencia mecánica en vatios, $\dot{V}O_2$ es el consumo de oxígeno en L/min, y $EE_{O_2}$ es el equivalente energético del oxígeno en kJ/L (aproximadamente 20.1–21.1 kJ/L según la mezcla de sustratos). En la práctica, la energía metabólica se calcula con la ecuación de Brouwer (1957), que usa los flujos respiratorios de forma directa:

$$\dot{E}_{kJ/min} = 16.18 \cdot \dot{V}O_2 + 5.02 \cdot \dot{V}CO_2$$

Sustituyendo en la expresión de GE se obtiene:

$$GE(\%) = \frac{6 \cdot W_{mec}}{16.18 \cdot \dot{V}O_2 + 5.02 \cdot \dot{V}CO_2}$$

donde los flujos respiratorios se expresan en L/min. Esta ecuación incorpora el cociente respiratorio implícitamente a través de los coeficientes diferenciales de VO₂ y VCO₂, lo que la hace válida para cualquier mezcla de sustratos entre grasa pura (RER = 0.70) y carbohidratos puros (RER = 1.00).

La GE no es el único índice de eficiencia utilizado en ciclismo. La *eficiencia neta* sustrae el metabolismo basal del denominador —resultando en valores más altos, típicamente 22-30%— para aislar el coste energético del ejercicio propiamente dicho. La *eficiencia delta* calcula la pendiente de la relación entre potencia mecánica y potencia metabólica a lo largo de un rango de intensidades, capturando así la eficiencia marginal de producir potencia adicional. Los fisiologistas del ejercicio prefieren la GE en estudios aplicados porque no requiere medir el metabolismo basal por separado y porque su reproducibilidad entre sesiones es mayor. Cuando los textos hablan de que los profesionales "son más eficientes", se refieren casi siempre a la GE.

## El protocolo de medición

Medir la GE requiere calorimetría indirecta: el ciclista pedalea en un ergómetro mientras respira a través de una mascarilla conectada a un analizador de gases que registra VO₂ y VCO₂ en tiempo real. El protocolo más habitual consiste en estadios de potencia constante de 4 a 6 minutos —suficientes para alcanzar el estado estacionario en intensidades submáximas— con mediciones a 2 o 3 potencias distintas dentro del rango de 100 a 300 W, dependiendo del nivel del ciclista. La GE se calcula para cada estadio como la razón entre la potencia mecánica y la potencia metabólica derivada de los gases. Para garantizar reproducibilidad, los tests se realizan en estado de ayuno o con ingesta nutricional estandarizada, a una temperatura controlada, y siempre a la misma cadencia de referencia, ya que la cadencia influye de forma significativa en el resultado.

El estado nutricional importa porque el RER y, por tanto, la mezcla de sustratos cambian la $EE_{O_2}$. Un mismo ciclista pedaleando tras una carga de carbohidratos muestra un RER más alto (más próximo a 1.0) y, consecuentemente, una $EE_{O_2}$ más alta, lo que eleva levemente la GE calculada. La diferencia entre mediciones en ayunas y en estado alimentado puede alcanzar 0.5-1.0 puntos porcentuales de GE, suficiente para alterar comparaciones entre sesiones si no se controla. Este detalle metodológico es una de las razones por las que estudios con diseños distintos han llegado a conclusiones aparentemente contradictorias sobre la capacidad del entrenamiento para modificar la GE.

## Los rangos reales en distintos niveles

Los datos de la literatura convergen en rangos bastante consistentes según el nivel ciclista. Sallet et al. publicaron en 2006 en *Journal of Sports Medicine and Physical Fitness* (PMID 16998438) el análisis de 71 ciclistas agrupados en profesionales y elite, encontrando una GE media de 25.6 ± 2.6% en los profesionales y de 24.4 ± 2.0% en los elite. Lucía et al. (PMID 12471319) reportaron una GE media de 24.5 ± 0.7% en 11 ciclistas de clase mundial. En estudios con ciclistas bien entrenados pero no profesionales, los valores típicos oscilan entre 20 y 23%. Los recreativos y desentrenados quedan por debajo de 20%.

<ChartBar
  title="Eficiencia gruesa por nivel ciclista (valores medios de la literatura)"
  caption="Fuentes: Sallet et al. (2006), Lucía et al. (2002), Hopker et al. (2009). La variabilidad individual dentro de cada categoría es sustancial."
  layout="vertical"
  data={[
    { nivel: "Recreativo / Desentrenado", ge: 18.5 },
    { nivel: "Amateur entrenado", ge: 21.0 },
    { nivel: "Amateur competidor", ge: 22.5 },
    { nivel: "Elite sub-23", ge: 23.5 },
    { nivel: "Profesional WorldTour", ge: 25.2 }
  ]}
  xKey="nivel"
  bars={[{ key: "ge", color: "#7C3AED", name: "GE media (%)" }]}
  unit="%"
/>

La dispersión dentro de cada categoría es amplia. Coyle et al. en su estudio de 1992 (PMID 1501563) midieron la eficiencia delta —un indicador relacionado— en 19 ciclistas altamente entrenados y encontraron un rango de 18.3 a 25.6%, con todos los sujetos perteneciendo al mismo nivel de entrenamiento. Esta variabilidad no se explicaba por el volumen de entrenamiento ni por el VO₂max, sino principalmente por la composición muscular. El dato de fondo es que dos ciclistas con cargas de entrenamiento prácticamente idénticas pueden separarse por más de 7 puntos porcentuales de eficiencia.

## El papel de las fibras musculares

La relación entre composición muscular y eficiencia es uno de los hallazgos más robustos de la fisiología del ejercicio en ciclismo. Coyle et al. (PMID 1501563) demostraron en 19 ciclistas altamente entrenados que el porcentaje de fibras tipo I del vasto lateral correlacionaba con la GE con r = 0.75 y con la eficiencia delta con r = 0.85 (p < 0.001 en ambos casos). Los sujetos con mayor proporción de fibras lentas de contracción —que variaba entre 32 y 76% en la muestra— eran sistemáticamente más eficientes en la conversión de energía química en trabajo mecánico. La explicación bioquímica reside en la cinética de la ATPasa de la cadena pesada de miosina: la isoforma lenta (MHC-I), expresada en fibras tipo I, hidroliza el ATP a una tasa más baja y genera más trabajo por mol de ATP que la isoforma rápida (MHC-II). Dicho de forma más directa: el músculo lento produce más potencia mecánica por unidad de energía química consumida.

La densidad mitocondrial y el grado de acoplamiento de la fosforilación oxidativa contribuyen también a la GE, aunque de forma más compleja. Las mitocondrias altamente entrenadas presentan menor *proton leak* a través de la membrana interna —es decir, menos desacoplamiento entre el gradiente de protones y la síntesis de ATP— lo que se traduce en mayor eficiencia del proceso de fosforilación oxidativa. Sin embargo, el componente mitocondrial es más entrenable que el fenotipo de fibras musculares: la biogénesis mitocondrial mediada por PGC-1α responde bien al entrenamiento de resistencia, mientras que la conversión de fibras tipo II a tipo I es mucho más lenta y limitada en adultos.

## La relación inversa con el VO₂max

Lucía et al. publicaron en 2002 en *Medicine & Science in Sports & Exercise* (PMID 12471319) un hallazgo que parecía contradictorio: en 11 ciclistas de élite mundial, la relación entre VO₂max y GE era inversa y significativa (r = -0.72, p < 0.05). Los ciclistas con mayor capacidad aeróbica tendían a tener menor eficiencia gruesa, y viceversa. El grupo tenía un VO₂max medio de 72 ml/kg/min, con GE media de 24.5%. Los autores concluyeron que "una CE/GE alta parece compensar un VO₂max relativamente bajo en ciclistas profesionales", sugiriendo que la eficiencia funciona como variable compensatoria: un ciclista con VO₂max moderado pero GE excepcional puede competir con otro de mayor VO₂max pero menor eficiencia. En 2012, Hopker et al. (PMID 22562732) confirmaron esta relación inversa en estudios longitudinales: cuando el entrenamiento eleva el VO₂max, tiende a descender ligeramente la GE, y viceversa.

Esta relación inversa tiene una explicación fisiológica plausible. Los ciclistas con alto VO₂max suelen tener mayor proporción de fibras tipo IIa —reclutadas ante demandas aeróbicas intensas— que, aunque más oxidativas que las tipo IIx, siguen siendo menos eficientes que las tipo I. Adicionalmente, el músculo de alta capacidad aeróbica puede operar con cierto nivel de desacoplamiento mitocondrial que, aunque reduce la eficiencia energética, actúa como termostato frente a la acumulación excesiva de temperatura. El resultado es que el ciclista con el mayor motor no siempre es el que usa el combustible de forma más económica.

## Cadencia y eficiencia: el efecto concreto

Lucía et al. (PMID 15179176) probaron en 2004 a ocho ciclistas profesionales pedaleando a 366 W —su potencia de competencia habitual— a tres cadencias distintas. Los resultados fueron claros: la GE mejoró sistemáticamente con cadencias más altas. A 60 rpm la GE media fue 22.4 ± 1.7%; a 80 rpm subió a 23.6 ± 1.8%; a 100 rpm alcanzó 24.2 ± 2.0%. La diferencia entre 60 y 100 rpm fue estadísticamente significativa. La misma potencia mecánica se produce con menos coste metabólico cuando la cadencia es alta, porque el torque requerido por pedalada disminuye y con él el reclutamiento de fibras rápidas de baja eficiencia. Esto explica fisiológicamente la preferencia de los grandes escaladores —Pantani, Contador, Froome— por cadencias de 90-100 rpm sobre pendientes elevadas donde la potencia requerida es alta pero la velocidad de desplazamiento es baja.

<ChartLine
  title="Eficiencia gruesa según cadencia en ciclistas profesionales"
  caption="Fuente: Lucía et al. (2004), PMID 15179176. Ocho ciclistas profesionales a 366 W de potencia fija."
  data={[
    { rpm: "60 rpm", ge: 22.4 },
    { rpm: "80 rpm", ge: 23.6 },
    { rpm: "100 rpm", ge: 24.2 }
  ]}
  xKey="rpm"
  lines={[
    { key: "ge", color: "#7C3AED", name: "Eficiencia gruesa (%)" }
  ]}
  unit="%"
/>

## ¿Se puede entrenar la GE?

Esta es la pregunta más debatida de la fisiología aplicada al ciclismo. Hopker et al. publicaron en 2009 en *International Journal of Sports Medicine* (PMID 19941249) una revisión de la evidencia disponible y concluyeron que "el entrenamiento tiene una influencia positiva sobre la eficiencia gruesa", aunque con importantes matices metodológicos. Los estudios transversales que comparaban ciclistas entrenados con no entrenados no mostraban diferencias significativas —un resultado que los autores atribuyen a limitaciones de diseño— mientras que los estudios longitudinales bien controlados sí detectaban mejoras. Los mecanismos propuestos incluyen la transformación de fibras tipo IIa hacia un fenotipo más similar al tipo I, cambios en la velocidad de acortamiento de las fibras y adaptaciones mitocondriales que reducen el proton leak.

El mismo grupo longitudinal mostró en *Medicine & Science in Sports & Exercise* (PMID 19276841) que la GE varía a lo largo de la temporada en ciclistas competidores: mejoró de 19.6% a 20.6% durante la fase de precompetición, se mantuvo estable durante la competencia y descendió a 19.4% al final de temporada. Un punto porcentual de variación puede parecer pequeño, pero a 300 vatios de potencia mecánica representa aproximadamente 12-15 vatios de diferencia en el coste metabólico. El estudio más extremo en este sentido fue el de Coyle (PMID 15774697) con un ciclista de Tour de France: una mejora del 8% en eficiencia muscular documentada a lo largo de 7 años, de los 21 a los 28 años, en paralelo con una estabilidad relativa del VO₂max. El estudio fue posteriormente objeto de controversia metodológica, pero ningún investigador disputó que el ciclista en cuestión era excepcionalmente eficiente.

La conclusión que emerge de la literatura es que la GE responde al entrenamiento, pero modestamente y con gran variabilidad inter-individual en la respuesta. Dos ciclistas con el mismo volumen de entrenamiento y la misma distribución de intensidades pueden terminar la temporada con diferencias de 2-3 puntos de GE que se explican principalmente por su composición muscular de base. Eso es lo que hace a la GE el indicador "menos entrenable" del perfil fisiológico: no que sea completamente fija, sino que su techo está determinado en gran parte por factores genéticos que el entrenamiento puede acercar pero raramente alcanzar.

## Eficiencia gruesa y durabilidad: la conexión

La GE no cae de forma lineal durante un esfuerzo prolongado. Existe evidencia de que la acumulación de trabajo —medida en kilojulios por kilogramo— deteriora la eficiencia antes de que lo haga la potencia de umbral. Spragg et al. demostraron en su estudio con ciclistas profesionales (*Medicine & Science in Sports & Exercise*, PMID 35977108) que la eficiencia bruta a 200 W medida en fresco correlacionaba con la durabilidad con r = 0.792: los ciclistas más eficientes en estado descansado mostraban mejor resistencia al deterioro de la potencia tras acumular trabajo intenso. El mecanismo probablemente incluye el ahorro de glucógeno que produce una GE más alta —el músculo eficiente consume menos glucógeno por vatio producido— preservando el sustrato necesario para los esfuerzos de alta intensidad al final de la carrera.

Esta conexión entre GE y durabilidad añade una dimensión práctica importante: no basta con conocer la eficiencia de un ciclista en fresco. La pregunta relevante para la competencia es cómo cambia esa eficiencia con la fatiga acumulada, y ese dato es todavía más escaso en la literatura que la GE basal. Lo que sí está documentado es que la distribución de intensidades del entrenamiento influye en la durabilidad (mayor volumen sub-umbral correlaciona con mejor durabilidad), y que esa misma distribución es la que produce las mejoras más consistentes de GE estacional. El paralelismo sugiere mecanismos compartidos: la base mitocondrial construida con volumen en zona 2 mejora a la vez la eficiencia y la resistencia al deterioro de esa eficiencia bajo fatiga.

## Lo que no aparece en el monitor de potencia

La implicación práctica más directa de la GE es esta: el vatio que aparece en la pantalla del ciclocomputador es el mismo independientemente de si lo produce un ciclista con GE de 24% o de 21%. Pero para producir ese vatio, el ciclista eficiente consume entre un 12 y un 15% menos de energía metabólica. En una etapa de cinco horas, esa diferencia se acumula en cientos de kilocalorías. La estrategia nutricional, la gestión del glucógeno, la capacidad de mantener la intensidad en el último puerto —todo esto está condicionado por la GE, pero ningún dato del ciclocomputador lo revela directamente. Dos ciclistas con potencia normalizada idéntica durante una etapa pueden llegar al último col con niveles de fatiga metabólica radicalmente distintos si su GE difiere en 3 puntos porcentuales.

Para un ciclista amateur que no tiene acceso a calorimetría de laboratorio, hay aproximaciones parciales. El consumo calórico estimado por los algoritmos de los ciclocomputadores asume una eficiencia de referencia —generalmente alrededor del 22-24%— que puede no corresponder a su realidad individual. Los ciclistas con VO₂max alto pero GE moderada tienden a consumir más de lo que el dispositivo estima; los ciclistas con GE alta pueden llegar al final de rutas largas con más reservas de las que el algoritmo predice. La única forma de conocer la propia GE es hacer un test de calorimetría en laboratorio, algo que solo algunos centros de fisiología del deporte ofrecen de forma rutinaria, pero que aporta un dato que ninguna prueba de potencia puede sustituir.
