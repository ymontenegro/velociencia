---
title: "W/kg: Rangos por Nivel Competitivo y Cómo Mejorarlos"
subtitle: "La métrica universal del ciclismo de rendimiento, explicada con datos reales"
section: "ciencia"
date: "2026-03-25"
author: "Sofía Müller"
tags: ["W/kg", "potencia relativa", "FTP", "niveles Coggan", "rendimiento ciclismo"]
sources:
  - title: "Physiological and performance characteristics of male professional road cyclists"
    url: "https://pubmed.ncbi.nlm.nih.gov/11428685/"
    type: pubmed
  - title: "Power profiling and the power-duration relationship in cycling: a narrative review"
    url: "https://pubmed.ncbi.nlm.nih.gov/34708276/"
    type: pubmed
  - title: "Predicting High-Power Performance in Professional Cyclists"
    url: "https://pubmed.ncbi.nlm.nih.gov/27248365/"
    type: pubmed
  - title: "Physiology of professional road cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/11347684/"
    type: pubmed
  - title: "The Physiological Profile of a Multiple Tour de France Winning Cyclist"
    url: "https://pubmed.ncbi.nlm.nih.gov/27508883/"
    type: pubmed
  - title: "The critical power and related whole-body bioenergetic models"
    url: "https://pubmed.ncbi.nlm.nih.gov/16284785/"
    type: pubmed
excerpt: "Los vatios por kilogramo son la métrica que iguala el campo de juego entre ciclistas de distinto tamaño. La tabla de Coggan popularizó los rangos de referencia, pero la realidad fisiológica detrás de esos números es más matizada de lo que parece."
coverImage: "https://images.unsplash.com/photo-1592182811189-87f6ae2f3407?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## Por qué el peso importa tanto como la potencia

Un ciclista de 90 kg que produce 360 vatios al umbral y uno de 60 kg que produce 270 vatios generan potencias absolutas muy diferentes. Pero ambos producen exactamente 4.0 W/kg, y en una subida del 8% llegarán a la cima prácticamente al mismo tiempo. La potencia relativa al peso corporal es la métrica que elimina la variable del tamaño y permite comparaciones directas entre ciclistas de cualquier complexión.

Lucia et al. (2001) documentaron que los ciclistas profesionales del Tour de Francia mantenían entre 5.9 y 6.4 W/kg al umbral durante las etapas de montaña decisivas. Ese dato establece el techo de referencia. Pero entre ese techo y el ciclista que sale a rodar los fines de semana existe un espectro amplio y bien documentado.

## La tabla de Coggan: el estándar de referencia

Andrew Coggan, fisiólogo del ejercicio y co-creador de TrainingPeaks, publicó la primera clasificación sistemática de potencia relativa por niveles competitivos. La tabla original se basó en datos recopilados de miles de ciclistas con potenciómetro y se ha convertido en la referencia más utilizada del ciclismo de rendimiento.

<ChartBar
  title="FTP en W/kg por nivel competitivo (hombres)"
  caption="Fuente: Adaptado de la clasificación de Coggan, valores medios del rango"
  data={[
    { nivel: "Sin entrenar", ftp: 1.8 },
    { nivel: "Recreativo", ftp: 2.5 },
    { nivel: "Entrenado", ftp: 3.2 },
    { nivel: "Competitivo", ftp: 3.9 },
    { nivel: "Elite Cat 1-2", ftp: 4.6 },
    { nivel: "Pro Continental", ftp: 5.3 },
    { nivel: "WorldTour", ftp: 6.0 }
  ]}
  xKey="nivel"
  bars={[{ key: "ftp", color: "#7C3AED", name: "FTP (W/kg)" }]}
  unit=" W/kg"
/>

Los valores de la tabla representan el FTP (Functional Threshold Power) normalizado al peso corporal. El FTP estima la potencia máxima sostenible durante aproximadamente una hora, aunque Allen y Coggan (2010) aclararon que es más una aproximación práctica que una definición fisiológica estricta. El salto entre cada nivel no es lineal: pasar de recreativo a entrenado requiere meses de consistencia, pero pasar de elite a WorldTour puede requerir años de entrenamiento óptimo combinado con una genética favorable.

## Rangos completos por sexo

La tabla completa de Coggan incluye rangos para hombres y mujeres. Las diferencias entre sexos son consistentes con la literatura fisiológica: las mujeres producen en promedio un 10-15% menos de W/kg al umbral, una diferencia atribuible principalmente a diferencias en masa muscular, niveles de hemoglobina y composición corporal según Joyner (2017).

| Nivel | Hombres (W/kg) | Mujeres (W/kg) |
|-------|----------------|-----------------|
| Sin entrenar | 1.5–2.0 | 1.2–1.7 |
| Recreativo | 2.0–2.8 | 1.7–2.4 |
| Entrenado | 2.8–3.5 | 2.4–3.1 |
| Competitivo | 3.5–4.2 | 3.1–3.7 |
| Elite Cat 1-2 | 4.2–5.0 | 3.7–4.4 |
| Pro Continental | 5.0–5.6 | 4.4–5.0 |
| WorldTour | 5.6–6.4 | 5.0–5.6 |

Estos rangos son orientativos. Un ciclista puede estar en el extremo superior de un nivel y funcionar competitivamente en la categoría siguiente. Además, el FTP no lo es todo: un ciclista con 3.8 W/kg de FTP pero excelente capacidad anaeróbica (alto W') puede ganar criteriums contra rivales con 4.2 W/kg que carecen de sprint.

![Dashboard de análisis de datos deportivos — los W/kg cobran sentido cuando se comparan entre niveles y duraciones](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Más allá del FTP: potencia relativa por duración

El FTP captura solo un punto de la curva de potencia. Para un perfil completo, es necesario examinar los W/kg en múltiples duraciones. Sanders y Heijboer (2019) documentaron los rangos de potencia relativa en ciclistas profesionales para esfuerzos de 5 segundos a 60 minutos. Las diferencias entre duraciones revelan el perfil metabólico del ciclista.

<ChartBar
  title="Potencia relativa (W/kg) por duración y nivel"
  caption="Fuente: Sanders y Heijboer (2019), Pinot y Grappe (2015)"
  layout="vertical"
  data={[
    { duracion: "5 seg", recreativo: 12.0, competitivo: 17.0, worldtour: 22.0 },
    { duracion: "1 min", recreativo: 5.5, competitivo: 8.0, worldtour: 10.5 },
    { duracion: "5 min", recreativo: 3.0, competitivo: 5.0, worldtour: 6.8 },
    { duracion: "20 min", recreativo: 2.5, competitivo: 4.2, worldtour: 6.2 }
  ]}
  xKey="duracion"
  bars={[
    { key: "recreativo", color: "#0D9488", name: "Recreativo" },
    { key: "competitivo", color: "#7C3AED", name: "Competitivo" },
    { key: "worldtour", color: "#E11D48", name: "WorldTour" }
  ]}
  unit=" W/kg"
/>

La brecha entre niveles se amplifica en las duraciones cortas. En el sprint de 5 segundos, un ciclista WorldTour casi duplica a un recreativo. A 20 minutos, la diferencia es de factor 2.5. Esto refleja que la potencia neuromuscular máxima tiene un componente genético importante (proporción de fibras tipo II, activación neural), mientras que la potencia sostenida responde más al entrenamiento acumulado.

## Qué determina tu techo de W/kg

La potencia relativa es el resultado de dos variables: la potencia absoluta que produces y tu peso corporal. Mejorar W/kg implica actuar sobre una o ambas. Lucia et al. (2001) identificaron tres factores fisiológicos que determinan la potencia sostenible: el VO2max, la eficiencia de pedaleo (o economía) y la fracción de utilización del VO2max al umbral.

El VO2max establece el límite superior. Está determinado en un 50-70% por la genética según Bouchard et al. (1999), aunque el entrenamiento puede mejorarlo un 15-25% desde valores iniciales. La eficiencia de pedaleo, medida como el porcentaje de energía metabólica convertida en trabajo mecánico, varía entre un 18% y un 25% entre ciclistas. Coyle et al. (1992) encontraron que los ciclistas más eficientes producían más vatios para el mismo consumo de oxígeno. La fracción de utilización al umbral, es decir, qué porcentaje del VO2max se puede sostener sin acumulación de lactato, es el factor más entrenable y el que más diferencia a los niveles intermedios.

![Ciclista en ruta de entrenamiento — mejorar los W/kg requiere consistencia sobre la bicicleta](https://images.unsplash.com/photo-1575995330221-c20326537393?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Cómo mejorar tus W/kg

La primera palanca es el entrenamiento aeróbico. Seiler y Kjerland (2006) demostraron que la distribución polarizada de intensidad (80% del tiempo a baja intensidad, 20% a alta intensidad) producía las mejores adaptaciones en el umbral de lactato y el VO2max en ciclistas ya entrenados. Para ciclistas principiantes, prácticamente cualquier aumento de volumen genera mejoras significativas en W/kg durante los primeros 12 a 18 meses.

La segunda palanca es la composición corporal. Reducir grasa corporal sin perder masa muscular mejora directamente los W/kg. Mujika y Padilla (2001) documentaron que los ciclistas del Tour de Francia alcanzaban su pico de rendimiento con un 6-8% de grasa corporal en hombres. Sin embargo, llevar la restricción calórica demasiado lejos compromete la recuperación, la función inmune y el rendimiento. Mountjoy et al. (2018) describieron el síndrome RED-S (Relative Energy Deficiency in Sport) como una consecuencia frecuente de la búsqueda obsesiva de ligereza en ciclistas.

La tercera palanca es la eficiencia mecánica. Un bike fitting adecuado, una cadencia óptima y una técnica de pedaleo depurada pueden mejorar la eficiencia entre un 1% y un 3% según Bini et al. (2011). Parece poco, pero a 300 vatios, un 2% de mejora en eficiencia equivale a producir esos 300 vatios con un costo metabólico un 2% menor, lo que a lo largo de una hora se traduce en menor fatiga acumulada.

![Ciclista profesional escalando un puerto — en subida, los W/kg son el factor determinante del rendimiento](https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## La trampa del número único

Reducir el rendimiento ciclista a un solo número de W/kg es tentador pero engañoso. Dos ciclistas con 4.0 W/kg de FTP pueden tener perfiles radicalmente distintos: uno puede ser un sprinter de 85 kg con 340 vatios al umbral y otro un escalador de 58 kg con 232 vatios. El primero dominará en terreno llano y sprints. El segundo será imbatible en puertos largos donde la aerodinámica pesa menos que la gravedad.

Mujika y Padilla (2001) analizaron las demandas fisiológicas de diferentes especialidades dentro del pelotón profesional y concluyeron que el W/kg solo predice bien el rendimiento en subida. En llano, la potencia absoluta y el CdA (coeficiente de arrastre aerodinámico) son más determinantes. En un sprint, la potencia pico neuromuscular y la capacidad de aceleración importan más que la potencia sostenida.

El W/kg es una herramienta poderosa para evaluar la progresión personal y situar tu nivel relativo respecto a la población ciclista. Pero debe interpretarse siempre en contexto: qué tipo de ciclismo practicas, en qué terreno compites y cuáles son las demandas específicas de tus objetivos. La tabla de Coggan es un punto de partida, no un veredicto.
