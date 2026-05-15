---
title: "Calor primero, altitud después: la secuencia que maximiza la hemoglobina"
subtitle: "Hacerlos a la vez no solo no suma — en algunos casos anula las adaptaciones de cada uno. La ciencia sobre cómo ordenar los dos estímulos más potentes del ciclismo de resistencia"
section: "entrenamiento"
date: "2026-05-15"
author: "Tomás Herrera"
tags: ["calor", "altitud", "hemoglobina", "volumen plasmático", "heat acclimation", "LHTL", "grandes vueltas", "periodización"]
excerpt: "Combinarlos simultáneamente no suma: puede cancelar las adaptaciones de cada uno. La evidencia apunta al orden y la separación temporal como los factores críticos."
coverImage: "https://images.unsplash.com/photo-1764150230797-53b7a25b0f1b?w=1600&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "McCleave EL et al. Temperate Performance Benefits after Heat, but Not Combined Heat and Hypoxic Training. Med Sci Sports Exerc. 2017"
    url: "https://pubmed.ncbi.nlm.nih.gov/27787334/"
    type: "pubmed"
  - title: "McCleave EL et al. Impaired Heat Adaptation From Combined Heat Training and Live High, Train Low Hypoxia. Int J Sports Physiol Perform. 2019"
    url: "https://pubmed.ncbi.nlm.nih.gov/30427243/"
    type: "pubmed"
  - title: "Rønnestad BR et al. Heat Training Efficiently Increases and Maintains Hemoglobin Mass and Temperate Endurance Performance in Elite Cyclists. Med Sci Sports Exerc. 2022"
    url: "https://pubmed.ncbi.nlm.nih.gov/35394464/"
    type: "pubmed"
  - title: "Rønnestad BR et al. Heat Suit Training Preserves the Increased Hemoglobin Mass after Altitude Camp in Elite Cyclists. Med Sci Sports Exerc. 2025"
    url: "https://pubmed.ncbi.nlm.nih.gov/39160765/"
    type: "pubmed"
  - title: "Girard O, Peeling P, Racinais S, Périard JD. Combining Heat and Altitude Training to Enhance Temperate, Sea-Level Performance. Int J Sports Physiol Perform. 2024"
    url: "https://pubmed.ncbi.nlm.nih.gov/38237571/"
    type: "pubmed"
  - title: "Nybo L, Rønnestad BR, Lundby C. High or Hot — Perspectives on altitude camps and heat-acclimation training as preparation for prolonged stage races. Scand J Med Sci Sports. 2024"
    url: "https://pubmed.ncbi.nlm.nih.gov/36350277/"
    type: "pubmed"
  - title: "Lundby C, Robach P. Altitude or heat training to increase haemoglobin mass and endurance exercise performance in elite sport. J Physiol. 2025"
    url: "https://pubmed.ncbi.nlm.nih.gov/41139221/"
    type: "pubmed"
  - title: "Cubel C et al. Haematological adaptations to high-altitude and heat acclimation training in elite male cyclists. Exp Physiol. 2026"
    url: "https://physoc.onlinelibrary.wiley.com/doi/full/10.1113/EP092968"
    type: "pubmed"
---

## La trampa del "dos es mejor que uno"

Dos estímulos ambientales dominan la preparación del ciclismo de alto rendimiento en la última década: el calor y la altitud. Ambos aumentan la capacidad de transporte de oxígeno, aunque por mecanismos distintos, y ambos tienen evidencia sólida de mejora del rendimiento en contrarreloj. La conclusión lógica —que combinarlos produce adaptaciones mayores que cualquiera por separado— se instaló en la práctica de equipos y atletas antes de que la ciencia pudiera validarla. Esa suposición resulta ser incorrecta.

En 2017, Erin McCleave y colaboradores de la Western Sydney University publicaron en *Medicine & Science in Sports & Exercise* el primer estudio que sometió esa lógica a prueba controlada. Veintiséis corredores bien entrenados completaron tres semanas en una de tres condiciones: calor solo (33 °C, por debajo de 600 m), calor combinado con *Live High-Train Low* (LHTL) a 3.000 metros simulados durante 13 horas al día, o condiciones templadas como grupo control. La contrarreloj de 3 km en condiciones templadas mejoró un 3,3% en el grupo de calor solo a tres semanas de terminar la intervención. En el grupo que combinó calor con LHTL: ninguna mejora estadísticamente significativa. Dos años después, el mismo grupo demostró en el *International Journal of Sports Physiology and Performance* (PMID: 30427243) que la combinación simultánea no solo no aportaba ventaja adicional sobre el calor aislado, sino que atenuaba las adaptaciones termorregulatorias que este producía.

## Por qué los mecanismos se interfieren

El conflicto no es accidental: emerge de la fisiología básica de cada adaptación. La aclimatación al calor necesita una expansión del volumen plasmático para funcionar. Ese aumento de plasma —que ocurre en los primeros cinco días de exposición y puede alcanzar un 6-10%— activa los sensores de oxígeno renales, que interpretan la hemodilución resultante como una reducción de la tensión de oxígeno y disparan la síntesis de eritropoyetina. Es un mecanismo indirecto pero eficaz: el calor usa la expansión del volumen plasmático como señal para fabricar más hemoglobina con el tiempo.

La exposición a la altitud produce el efecto contrario. Durante los primeros días en altura, el organismo reduce el volumen plasmático como respuesta a la hemoconcentración: los riñones excretan más líquido y el hematocrito sube de forma aguda. Ese aumento transitorio del hematocrito ayuda a mantener la saturación arterial con menos hemoglobina circulante, pero destruye exactamente la señal que el calor necesita para desencadenar su cascada eritropoyética. Girard, Peeling, Racinais y Périard lo formularon sin ambigüedad en su revisión de 2024 en el *International Journal of Sports Physiology and Performance* (DOI: 10.1123/ijspp.2023-0250): cuando se aplican ambos estímulos simultáneamente —o de forma concurrente, entrenando en calor y durmiendo en altitud— las mejoras en condiciones templadas al nivel del mar son, en general, de la misma magnitud que las obtenidas con calor o altitud por separado. No hay efecto sumatorio. En cuanto a las adaptaciones termorregulatorias, el efecto puede ser peor que el calor solo.

<ChartBar
  title="Mejora en contrarreloj 3 km (condiciones templadas) según protocolo"
  caption="Fuente: McCleave et al. (2017), Med Sci Sports Exerc. DOI: 10.1249/MSS.0000000000001138"
  data={[
    { protocolo: "Calor solo", mejora: 3.3 },
    { protocolo: "Calor + LHTL simultáneo", mejora: 0.2 },
    { protocolo: "Control (templado)", mejora: 0.1 }
  ]}
  xKey="protocolo"
  bars={[{ key: "mejora", color: "#0891B2", name: "Mejora TT (%)" }]}
  layout="vertical"
  unit="%"
/>

## Qué hace cada estímulo cuando actúa sin interferencia

La altitud opera principalmente sobre la masa de hemoglobina total (*total haemoglobin mass*, tHbmass): el estímulo hipóxico activa la vía HIF-1α, eleva la EPO circulante en horas y, tras tres a cuatro semanas de exposición a 2.000-2.500 metros, produce incrementos del 3,5-5% en tHbmass. Cubel, Klaris, Larsen, Faiss, Nybo y Lundby documentaron en *Experimental Physiology* (DOI: 10.1113/EP092968) que 12 ciclistas de élite que completaron un campamento LHTH de 21 días a 3.000 metros aumentaron su tHbmass de forma significativa, pero con una limitación crítica: al descender, la hemoglobina ganada se perdió con rapidez y el efecto sobre el rendimiento en contrarreloj al nivel del mar fue nulo. El estímulo es potente; la retención, frágil.

El calor, por su parte, actúa en dos fases bien definidas. La primera (días 1-5) expande el volumen plasmático y mejora las adaptaciones sudomotoras y cardiovasculares. La segunda, con protocolos de mayor duración, también incrementa la tHbmass. Rønnestad, Urianstad, Hamarsland, Hansen, Nygaard, Ellefsen, Hammarström y Lundby demostraron en *Medicine & Science in Sports & Exercise* en 2022 (PMID: 35394464, DOI: 10.1249/MSS.0000000000002928) que cinco semanas de entrenamiento con traje de calor en ciclistas de élite elevaron la tHbmass un 3% y mantuvieron el rendimiento en condiciones templadas. Lo que el calor añade y la altitud no puede proporcionar son las adaptaciones termorregulatorias: adelanta el inicio de la sudoración, reduce la temperatura central durante el ejercicio y disminuye la frecuencia cardíaca submáxima en calor. Esas adaptaciones tienen valor competitivo directo en las etapas de julio y agosto de las grandes vueltas.

## El argumento para calor primero, altitud después

La secuencia calor → altitud tiene una lógica fisiológica coherente, aunque aún carece de un ensayo controlado que la valide directamente frente a la secuencia inversa. Nybo, Rønnestad y Lundby la plantearon en su revisión de 2024 en el *Scandinavian Journal of Medicine & Science in Sports* (PMID: 36350277): un bloque previo de aclimatación al calor expande el volumen plasmático y "prepara" el sistema hematopoyético antes de subir a altitud. Cuando el ciclista asciende, la hemoconcentración producida por la altura tiene que contraer un volumen plasmático ya ampliado, dejando un margen mayor antes de que la señal eritropoyética se apague. En teoría, eso podría sustentar una respuesta EPO más robusta durante los primeros días del campamento.

La limitación práctica es que la mayor parte de la expansión del volumen plasmático inducida por el calor desaparece dentro de la primera semana en altitud, a medida que los riñones ajustan el balance hídrico al nuevo entorno. Lo que el bloque de calor sí preserva son las adaptaciones termorregulatorias, que tienen un decaimiento más lento. Daanen, Racinais y Périard mostraron en su metaanálisis de 2018 en *Sports Medicine* (PMID: 29129022) que las adaptaciones sudomotoras se mantienen mejor que las cardiovasculares durante las semanas post-aclimatación. Para un ciclista que prepara el Tour de France —donde las etapas de la Provenza y el Midi pueden superar los 38 °C en el asfalto— esas adaptaciones termorregulatorias tienen un valor competitivo que la altitud no proporciona.

El protocolo para esta secuencia sería: 10-14 días de aclimatación al calor (rodillo sin ventilador a 38-40 °C, 60-90 minutos en Z2) → 21-28 días de campamento LHTL (2.000-2.500 m) → regreso al nivel del mar 5-7 días antes de la carrera.

## El argumento para altitud primero, calor para conservar las ganancias

La evidencia más reciente y más sólida apoya una secuencia diferente: altitud primero, calor para mantener lo ganado al regresar. El estudio de Rønnestad y colaboradores publicado en *Medicine & Science in Sports & Exercise* en 2025 (PMID: 39160765, DOI: 10.1249/MSS.0000000000003542) es el más concluyente al respecto. Ciclistas de élite con un VO₂max de 76 ± 5 mL·min⁻¹·kg⁻¹ completaron un campamento de altitud de tres semanas en torno a los 2.100 metros. Al terminar, la tHbmass había aumentado un 4,1% respecto al valor basal.

El problema clásico del regreso es que esa ganancia se disipa. Sin ninguna intervención adicional, el organismo reduce su producción de eritrocitos porque el estímulo hipóxico ha desaparecido. Rønnestad dividió a los ciclistas en dos grupos al bajar del campamento: uno siguió su entrenamiento habitual durante 3,5 semanas; el otro incorporó tres sesiones semanales con traje de calor dentro de su rutina normal. Los resultados fueron categóricos: el grupo de calor mantuvo la tHbmass prácticamente intacta (+0,2%), mientras el grupo control perdió 3,3 puntos porcentuales de sus ganancias. El grupo de calor también registró un aumento del volumen plasmático del 11,6% y del volumen sanguíneo total del 5,8%, ampliando el efecto hematológico total.

<ChartLine
  title="Evolución de la masa de hemoglobina en el protocolo altitud → calor"
  caption="Fuente: Rønnestad et al. (2025), Med Sci Sports Exerc. PMID: 39160765"
  data={[
    { fase: "Pre-altitud", calor: 100, control: 100 },
    { fase: "Fin campamento", calor: 104.1, control: 104.1 },
    { fase: "Post 3.5 sem.", calor: 104.3, control: 100.8 }
  ]}
  xKey="fase"
  lines={[
    { key: "calor", color: "#0891B2", name: "Calor post-altitud" },
    { key: "control", color: "#E11D48", name: "Entrenamiento normal" }
  ]}
  unit="%"
/>

La implicación es directa: el calor actúa como mecanismo de retención de las ganancias eritrocitarias. La señal que el calor envía a los riñones —hemodilución transitoria que simula una reducción de tensión de oxígeno— mantiene activa la eritropoyesis suficiente para compensar la pérdida natural de glóbulos rojos al nivel del mar. Sin ese estímulo, el organismo considera que no hay razón para sostener una tHbmass por encima de su punto de ajuste habitual.

## ¿Efecto sumatorio o redundante?

La respuesta depende del orden y del objetivo. Cuando se aplican simultáneamente, los datos de McCleave son claros: no hay efecto sumatorio. Cuando se aplica de forma secuencial, la combinación puede ofrecer ventajas que ninguno de los dos estímulos proporciona por sí solo: la altitud construye hemoglobina con mayor potencia que el calor solo, y el calor posterior la conserva mientras añade las adaptaciones termorregulatorias que la altitud no produce. Lundby y Robach lo formularon en su revisión de 2025 en *The Journal of Physiology* (PMID: 41139221): el calor puede servir como alternativa a la altitud o como complemento secuencial, pero la variabilidad individual en la respuesta hipóxica es enorme — un mismo atleta puede aumentar su tHbmass un 5% en un campamento y apenas un 1% en el siguiente con protocolos similares — mientras que el calor produce respuestas más predecibles.

La distinción entre ambos estímulos en términos de magnitud también importa. La altitud sigue siendo el estímulo más potente para aumentar la tHbmass: tres semanas de LHTL bien ejecutado produce incrementos del 3,5-4,1%, frente al 3% que genera cinco semanas de calor. Pero el calor tiene dos ventajas que la altitud no puede igualar: la accesibilidad económica —un rodillo en casa y ropa de abrigo— y las adaptaciones termorregulatorias, que pueden marcar la diferencia entre controlar una etapa calurosa o sufrir una hipertermia que arruine la carrera.

## La dosis mínima eficaz

Para el bloque de calor, la evidencia converge en que 9-14 sesiones consecutivas son el mínimo para obtener adaptaciones hematológicas y cardiovasculares significativas. Cada sesión debe durar 60-90 minutos a una intensidad de Z2 (55-75% del FTP) en un ambiente de 38-42 °C, equivalente al rodillo con ventanas cerradas y capas adicionales de ropa o con traje térmico. Las sesiones de mantenimiento post-altitud —tres por semana de 45-60 minutos en Z2, como en el protocolo de Rønnestad 2025— son suficientes para retener las ganancias sin añadir carga fisiológica excesiva durante la puesta a punto.

Para el bloque de altitud, los requisitos son más exigentes: un mínimo de 21-28 días en la franja de 2.000-2.500 metros, con más de 14 horas diarias de exposición al ambiente hipóxico. El modelo LHTL —vivir en altura y bajar a entrenar en intensidad— sigue siendo el más respaldado para maximizar la calidad del trabajo sin sacrificar el estímulo eritropoyético. Altitudes superiores a 2.700-2.800 metros aumentan el estrés fisiológico, degradan el sueño y reducen la calidad del entrenamiento sin necesariamente producir más hemoglobina.

## Protocolo combinado de 8 semanas orientado a una gran vuelta de verano

| Semana | Bloque | Sesiones/semana | Zona / Intensidad | Objetivo |
|--------|--------|-----------------|-------------------|----------|
| 1 | Calor (inicio) | 5 sesiones, 60 min | Z2, 38-40 °C | Expansión PV, inicio adaptación termorregulación |
| 2 | Calor (consolidación) | 5 sesiones, 75-90 min | Z2-Z3, 38-40 °C | Consolidar PV, adaptar respuesta sudomotora |
| 3 | Altitud LHTL (2.000-2.500 m) | 8-9 sesiones | Z2 base + 1 sesión Z4 | Activar cascada EPO, inicio aumento tHbmass |
| 4 | Altitud LHTL | 9 sesiones | Z2 base + 1-2 sesiones Z4-Z5 | Consolidar señal eritropoyética |
| 5 | Altitud LHTL | 9 sesiones | Z2 base + 1-2 sesiones Z4-Z5 | Aumentar tHbmass; mantener calidad del entrenamiento |
| 6 | Altitud LHTL (última semana) | 8 sesiones | Z2 base + 1 sesión Z4 + 1 Z3 | Consolidar ganancias; empezar reducción de carga |
| 7 | Descenso + calor | 3 sesiones calor (45-60 min) + 4-5 normales | Z2 en calor; Z2-Z4 en entrenamiento | Mantener tHbmass post-descenso; recuperar PV |
| 8 | Pre-carrera + calor | 2-3 sesiones calor (45 min) + entrenamiento reducido | Z2 en calor; Z1-Z3 normal | Retener tHbmass; tapering |

El período de regreso al nivel del mar (semanas 7-8) es donde el calor actúa como seguro sobre la inversión de altitud. Sin esas sesiones, el organismo devuelve en dos semanas gran parte de lo que construyó en un mes de campamento. Con tres sesiones semanales de 45-60 minutos en Z2 con carga térmica, el ciclista llega a la semana del prólogo con la tHbmass intacta y el volumen plasmático ampliado.

## Riesgos que no aparecen en los protocolos de laboratorio

La deshidratación crónica es el error más común al encadenar estos dos bloques. Ambos estímulos aumentan las pérdidas de líquido —el calor por sudoración incrementada, la altitud por la respiración más rápida en un ambiente seco— y un déficit hídrico sostenido reduce el volumen plasmático que los dos protocolos intentan construir. La ingesta de líquido durante y después de cada sesión de calor no es opcional.

La depleción de hierro es un problema específico del bloque de altitud. La eritropoyesis acelerada consume hierro a un ritmo que puede superar la absorción dietética habitual, especialmente en atletas con depósitos basales ya ajustados. Subir con ferritina por debajo de 30-40 ng/mL sin suplementación equivale a desperdiciar el campamento: el organismo tiene la señal para fabricar hemoglobina pero le falta el sustrato. Un análisis de sangre con ferritina e índice de saturación de transferrina cuatro semanas antes del campamento es el paso más barato de toda la preparación. La transición entre el bloque de calor y el campamento de altitud también requiere dos a tres días de recuperación activa —Z1, sin carga térmica— para gestionar el cambio de estímulo sin acumular fatiga.

## Aplicación práctica para el Tour o la Vuelta

Las grandes vueltas de julio (Tour de France) y agosto (Vuelta a España) exponen a los ciclistas a dos exigencias simultáneas: las etapas de montaña necesitan máxima capacidad de transporte de oxígeno, y las etapas llanas de la Provenza, Andalucía o Murcia imponen temperaturas que pueden superar los 40 °C en el asfalto. La preparación óptima necesita las dos capas: la hematológica para las cimas y la termorreguladora para sobrevivir a las jornadas de calor.

Nybo, Rønnestad y Lundby, en su revisión de 2024 en *Scandinavian Journal of Medicine & Science in Sports* (PMID: 36350277), proponen un arco de 8-12 semanas antes de la primera etapa que integra ambos estímulos con lógica secuencial. El calor primero (2 semanas) construye las adaptaciones termorregulatorias con mayor tiempo de decaimiento y prepara la base para el bloque de altitud. El campamento de altitud (3-4 semanas en 2.000-2.500 m) maximiza la tHbmass. Las sesiones de calor post-altitud preservan esa tHbmass mientras el ciclista entra en la fase de puesta a punto. La ventana de rendimiento óptima —tHbmass máxima, adaptaciones de calor funcionales, organismo descansado— suele abrirse entre 7 y 14 días después del regreso de altitud si se ha seguido el protocolo de mantenimiento térmico.

Para un ciclista amateur que prepara una gran cicloturista estival, el protocolo se simplifica sin perder su lógica secuencial: dos semanas de rodillo en calor (sin ventilador, 60-75 minutos en Z2, cinco sesiones semanales) seguidas de vacaciones o escapada en montaña a 2.000-2.500 metros durante dos a tres semanas —con la actividad física que sea posible— y luego dos o tres sesiones de mantenimiento térmico por semana en la fase final. No es el protocolo de un equipo del WorldTour, pero sigue la misma lógica que la ciencia respalda.

## Lo que la investigación aún no ha resuelto

El vacío más evidente en la literatura es la ausencia de un ensayo controlado que compare directamente la secuencia calor → altitud con la secuencia altitud → calor en el mismo grupo de ciclistas, con criterios de rendimiento equiparables. Girard, Peeling, Racinais y Périard lo señalaron explícitamente en su revisión de 2024: la exposición secuencial en cualquiera de sus dos órdenes "merece una investigación más profunda". Los datos que existen provienen de estudios que no diseñaron esa comparación directa, sino que la sugieren como inferencia de sus hallazgos.

Lo que sí está claro es el principio que guía la decisión práctica: no es posible obtener lo mejor de ambos estímulos al mismo tiempo. La fisiología de la adaptación al calor y la fisiología de la adaptación a la hipoxia operan sobre los mismos sistemas —volumen sanguíneo, eritropoyesis, transporte de oxígeno— con señales que compiten cuando se aplican en paralelo. El orden, la dosis y la separación temporal no son detalles logísticos: son el protocolo en sí.
