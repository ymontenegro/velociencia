---
title: "Carga de Carbohidratos: Protocolos y Evidencia Científica"
subtitle: "De Bergström a Bussau — cómo la ciencia ha simplificado la supercompensación de glucógeno"
section: "nutricion"
date: "2026-03-24"
author: "Martín Velasco"
tags: ["carbohidratos", "glucógeno", "supercompensación", "nutrición carrera", "carga CHO"]
sources:
  - title: "The effect of exercise on muscle glycogen and electrolytes in normals"
    url: "https://pubmed.ncbi.nlm.nih.gov/5918669/"
    type: pubmed
  - title: "Carbohydrate-loading and exercise performance. An update"
    url: "https://pubmed.ncbi.nlm.nih.gov/9291549/"
    type: pubmed
  - title: "Carbohydrate loading in human muscle: an improved 1 day protocol"
    url: "https://pubmed.ncbi.nlm.nih.gov/12111292/"
    type: pubmed
  - title: "Nutrition and Supplement Update for the Endurance Athlete: Review and Recommendations"
    url: "https://pubmed.ncbi.nlm.nih.gov/31181616/"
    type: pubmed
  - title: "Carbohydrates for training and competition"
    url: "https://pubmed.ncbi.nlm.nih.gov/21660838/"
    type: pubmed
  - title: "Nutrition in Cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/34798997/"
    type: pubmed
excerpt: "Llenar los depósitos de glucógeno muscular antes de una competición es una de las estrategias nutricionales más estudiadas del deporte. Tres protocolos distintos logran el mismo objetivo, pero con tiempos y niveles de sufrimiento muy diferentes."
coverImage: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## El combustible que define la competición

Los depósitos de glucógeno muscular determinan cuánto tiempo un ciclista puede mantener una intensidad alta antes de que el rendimiento colapse. Bergström y Hultman (1966) demostraron por primera vez, mediante biopsias musculares, que el contenido de glucógeno previo al ejercicio correlacionaba directamente con el tiempo hasta el agotamiento. Un músculo con 500 mmol/kg de peso seco de glucógeno podía sostener un esfuerzo intenso casi el doble de tiempo que uno con 250 mmol/kg.

En ciclismo, donde las competiciones duran entre 3 y 6 horas, partir con los depósitos llenos no es una ventaja menor. Es la diferencia entre llegar a los kilómetros finales con capacidad de atacar o arrastrarse hasta la meta. Hawley et al. (1997) estimaron que un ciclista de 70 kg almacena entre 400 y 700 gramos de glucógeno entre músculos e hígado, suficiente para 90-120 minutos de esfuerzo al umbral. Todo lo que dure más que eso dependerá de la ingesta durante la carrera y de la eficiencia metabólica en la oxidación de grasas.

## El protocolo clásico de Bergström (1966)

El método original requería seis días. Los tres primeros días el ciclista realizaba ejercicio agotador seguido de una dieta muy baja en carbohidratos (menos de 10% de las calorías), con el objetivo de vaciar los depósitos de glucógeno. Los tres días finales invertían la estrategia: reposo relativo combinado con una dieta muy alta en carbohidratos (más del 70% de las calorías, equivalente a 8-10 g/kg/día).

El resultado era contundente. Las biopsias mostraban niveles de glucógeno muscular que superaban en un 150-200% los valores normales, alcanzando 800-900 mmol/kg de peso seco. Bergström y Hultman lo llamaron "supercompensación". El problema era que la fase de depleción producía síntomas significativos: fatiga extrema, irritabilidad, dificultad de concentración y mayor susceptibilidad a infecciones respiratorias en los días previos a la competición. Para un ciclista profesional en vísperas de una gran vuelta, esas tres jornadas de vaciamiento eran incompatibles con la preparación táctica y mental.

## El protocolo modificado de Sherman (1981)

Sherman et al. (1981) simplificaron el proceso eliminando la fase de depleción. Su protocolo comenzaba seis días antes de la competición con un entrenamiento progresivamente reducido (taper), manteniendo una dieta con 50% de carbohidratos los tres primeros días y aumentando a 70% (8-10 g/kg/día) los tres últimos.

Los resultados de las biopsias mostraron que este protocolo alcanzaba niveles de glucógeno de 700-800 mmol/kg de peso seco, un 85-90% de los valores logrados con el método clásico, pero sin los efectos negativos de la depleción. El ciclista llegaba a la competición descansado, bien alimentado y mentalmente fresco. Este protocolo se convirtió en la recomendación estándar durante dos décadas.

![Ciclista profesional en competición — partir con los depósitos de glucógeno llenos define los kilómetros finales](https://images.unsplash.com/photo-1504025468847-0e438279542c?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## El protocolo rápido de Bussau (2002)

Bussau et al. (2002) demostraron que la supercompensación podía lograrse en un solo día. Su protocolo consistía en una sesión breve de ejercicio de alta intensidad (2 minutos y 30 segundos de sprint en cicloergómetro) seguida de 24 horas con una dieta extremadamente alta en carbohidratos (10-12 g/kg/día). Las biopsias 24 horas después mostraron niveles de glucógeno comparables a los del protocolo clásico de seis días.

La explicación fisiológica es que el ejercicio de alta intensidad activa la enzima glucógeno sintasa de forma potente y rápida, creando una "ventana de supercompensación" que permite al músculo absorber glucosa a tasas muy elevadas durante las horas siguientes. No es necesario vaciar completamente los depósitos; basta con activar la señalización molecular correcta.

<ChartLine
  title="Glucógeno muscular por protocolo de carga (mmol/kg peso seco)"
  caption="Fuente: Adaptado de Bergström (1966), Sherman (1981), Bussau (2002)"
  data={[
    { dia: "Día -6", clasico: 450, modificado: 450, rapido: 450 },
    { dia: "Día -5", clasico: 280, modificado: 430, rapido: 450 },
    { dia: "Día -4", clasico: 180, modificado: 400, rapido: 450 },
    { dia: "Día -3", clasico: 150, modificado: 420, rapido: 450 },
    { dia: "Día -2", clasico: 450, modificado: 550, rapido: 450 },
    { dia: "Día -1", clasico: 700, modificado: 700, rapido: 820 },
    { dia: "Carrera", clasico: 850, modificado: 780, rapido: 810 }
  ]}
  xKey="dia"
  lines={[
    { key: "clasico", color: "#E11D48", name: "Clásico (Bergström 1966)" },
    { key: "modificado", color: "#7C3AED", name: "Modificado (Sherman 1981)" },
    { key: "rapido", color: "#0D9488", name: "Rápido (Bussau 2002)" }
  ]}
  unit=" mmol/kg"
/>

El gráfico muestra la evolución del glucógeno muscular para cada protocolo. El método clásico produce un valle profundo antes de la supercompensación. El modificado mantiene niveles estables y sube progresivamente. El rápido permanece en niveles normales hasta el día previo a la carrera, cuando sube abruptamente gracias a la combinación de ejercicio intenso y carga masiva.

## Cuántos carbohidratos según la duración del evento

No todas las competiciones requieren la misma carga previa. Burke et al. (2011) establecieron recomendaciones escalonadas según la duración del evento. Para esfuerzos menores a 60 minutos, los depósitos normales de glucógeno son suficientes y no se justifica una carga formal. A medida que la duración aumenta, la cantidad de carbohidratos en las 24-48 horas previas debe incrementarse proporcionalmente.

<ChartBar
  title="Carbohidratos recomendados pre-competición según duración del evento"
  caption="Fuente: Burke et al. (2011), Jeukendrup (2014)"
  data={[
    { duracion: "< 1 hora", cho: 5 },
    { duracion: "1–2.5 horas", cho: 7 },
    { duracion: "2.5–4 horas", cho: 10 },
    { duracion: "> 4 horas", cho: 12 }
  ]}
  xKey="duracion"
  bars={[{ key: "cho", color: "#0D9488", name: "g/kg/día (últimas 24-48h)" }]}
  colors={["#0891B2", "#0D9488", "#7C3AED", "#E11D48"]}
  unit=" g/kg"
/>

Para una etapa de montaña de gran vuelta que puede durar 4-6 horas, un ciclista de 65 kg necesitaría ingerir 650-780 gramos de carbohidratos en las 24 horas previas. En términos prácticos, eso equivale a aproximadamente 2.5 kg de arroz cocido o 1.5 kg de pasta más varias porciones de pan y fruta. Es un volumen de comida considerable, y muchos ciclistas recurren a bebidas deportivas y geles concentrados para alcanzar esas cantidades sin molestias gastrointestinales.

![Nutrición deportiva — la elección de fuentes de carbohidratos impacta directamente en la reposición de glucógeno](https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Fuentes de carbohidratos: no todo da igual

La velocidad de reposición de glucógeno depende del tipo de carbohidrato y del momento de ingesta. Burke et al. (2004) demostraron que los carbohidratos de alto índice glucémico (arroz blanco, pan blanco, patata, bebidas con maltodextrina) reponen glucógeno muscular más rápido que los de bajo índice glucémico (avena, legumbres, frutas enteras) durante las primeras 6 horas post-ejercicio.

En las 24-48 horas previas a la competición, la diferencia entre alto y bajo índice glucémico se diluye, porque hay tiempo suficiente para que el glucógeno se sintetice independientemente de la velocidad de absorción. Lo que importa es la cantidad total. Sin embargo, la fibra puede ser un problema. Una dieta muy alta en fibra produce hinchazón y malestar gastrointestinal que ningún ciclista quiere experimentar en la línea de salida. Por eso la recomendación práctica es priorizar fuentes refinadas (arroz blanco, pasta, pan blanco) y reducir vegetales, legumbres y cereales integrales durante los dos días previos.

## Errores frecuentes en la carga

El error más común es confundir carga de carbohidratos con comer en exceso. El objetivo es aumentar la proporción de carbohidratos en la dieta, no las calorías totales. Un ciclista que simplemente añade pasta a su dieta habitual sin reducir grasas y proteínas proporcionalmente puede terminar con un exceso calórico que produce pesadez, retención hídrica excesiva e incomodidad digestiva.

Otro error frecuente es cargar demasiado pronto. Jeukendrup (2014) señaló que la supercompensación de glucógeno es transitoria. Si la carga se hace cuatro días antes de la carrera y luego el ciclista vuelve a una dieta mixta, los niveles de glucógeno habrán bajado significativamente para el día de la competición. La ventana óptima es de 24 a 48 horas antes del evento.

El tercer error es no practicar. La tolerancia gastrointestinal a ingestas altas de carbohidratos es entrenable. Un ciclista que nunca ha intentado consumir 10 g/kg/día no debería hacerlo por primera vez antes de su carrera objetivo. Thomas et al. (2016) recomendaron ensayar el protocolo durante el entrenamiento, al menos dos o tres veces, para identificar qué alimentos y cantidades tolera cada individuo.

## Glucógeno hepático: el tanque olvidado

La mayoría de los ciclistas se enfocan en el glucógeno muscular, pero el hepático es igualmente importante. El hígado almacena entre 80 y 120 gramos de glucógeno, cuya función principal es mantener la glucemia estable durante el ejercicio. Cuando el glucógeno hepático se agota, la glucosa sanguínea cae y aparecen los síntomas clásicos de la "pájara": mareo, confusión, debilidad generalizada y colapso del rendimiento.

Gonzalez et al. (2016) demostraron que el glucógeno hepático se repone de forma más eficiente con una combinación de glucosa y fructosa que con glucosa sola. La fructosa se metaboliza preferentemente en el hígado, donde se convierte en glucógeno hepático, mientras que la glucosa se dirige prioritariamente al músculo. Esto tiene implicaciones prácticas: durante la carga previa, incluir fructosa (fruta, miel, bebidas con mezcla de glucosa y fructosa) optimiza la reposición de ambos depósitos simultáneamente.

![Preparación de nutrición deportiva — incluir fructosa junto con glucosa optimiza la reposición de glucógeno hepático y muscular](https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## La carga en la práctica profesional

En el pelotón profesional, la carga de carbohidratos está integrada en la planificación nutricional de cada etapa. Los equipos WorldTour emplean nutricionistas que calculan las necesidades específicas según el perfil de la etapa del día siguiente: una etapa llana con llegada al sprint requiere menos carga que una etapa de montaña con tres puertos de categoría especial.

La periodización de carbohidratos durante las grandes vueltas es un acto de equilibrio. Stellingwerff (2012) documentó que los ciclistas del Tour de Francia consumían entre 6 y 12 g/kg/día dependiendo de la etapa, con los valores más altos reservados para las jornadas de montaña y contrarreloj. En los días de descanso, la ingesta bajaba a 4-6 g/kg/día para evitar ganancia de peso innecesaria.

Para el ciclista amateur que prepara su granfondo o su carrera por etapas, la estrategia más práctica y respaldada por la evidencia es el protocolo rápido de Bussau modificado: una sesión de intervalos de alta intensidad el día previo (como parte del último entrenamiento del taper), seguida de 10-12 g/kg de carbohidratos durante las siguientes 24 horas. Sin sufrimiento, sin planificación de una semana y con resultados equivalentes a los protocolos más elaborados.
