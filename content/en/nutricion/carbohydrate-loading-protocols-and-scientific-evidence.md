---
title: "Carbohydrate Loading: Protocols and Scientific Evidence"
subtitle: "From Bergstrom to Bussau — how science has simplified glycogen supercompensation"
section: "nutricion"
date: "2026-03-24"
author: "Martín Velasco"
tags: ["carbohydrates", "glycogen", "supercompensation", "race nutrition", "carb loading"]
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
excerpt: "Filling muscle glycogen stores before competition is one of the most studied nutritional strategies in sport. Three distinct protocols achieve the same goal, but with vastly different timelines and levels of suffering."
coverImage: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## The fuel that defines the race

Muscle glycogen stores determine how long a cyclist can sustain a high intensity before performance collapses. Bergstrom and Hultman (1966) demonstrated for the first time, through muscle biopsies, that pre-exercise glycogen content correlated directly with time to exhaustion. A muscle carrying 500 mmol/kg of dry weight in glycogen could sustain intense effort nearly twice as long as one with 250 mmol/kg.

In cycling, where races last between 3 and 6 hours, starting with full stores is not a marginal advantage. It is the difference between reaching the final kilometers with the capacity to attack and crawling to the finish line. Hawley et al. (1997) estimated that a 70 kg cyclist stores between 400 and 700 grams of glycogen across muscles and liver, enough for 90-120 minutes of threshold effort. Anything beyond that duration depends on in-race fueling and metabolic efficiency in fat oxidation.

## The classic Bergstrom protocol (1966)

The original method required six days. During the first three, the cyclist performed exhaustive exercise followed by a very low-carbohydrate diet (less than 10% of calories), with the goal of depleting glycogen stores. The final three days reversed the strategy: relative rest combined with a very high-carbohydrate diet (more than 70% of calories, equivalent to 8-10 g/kg/day).

The result was decisive. Biopsies showed muscle glycogen levels that exceeded normal values by 150-200%, reaching 800-900 mmol/kg of dry weight. Bergstrom and Hultman called it "supercompensation." The problem was that the depletion phase produced significant symptoms: extreme fatigue, irritability, difficulty concentrating, and increased susceptibility to respiratory infections in the days before competition. For a professional cyclist on the eve of a grand tour, those three days of depletion were incompatible with tactical and mental preparation.

## The modified Sherman protocol (1981)

Sherman et al. (1981) simplified the process by eliminating the depletion phase. Their protocol began six days before competition with progressively reduced training (taper), maintaining a diet with 50% carbohydrates for the first three days and increasing to 70% (8-10 g/kg/day) for the final three.

Biopsy results showed that this protocol achieved glycogen levels of 700-800 mmol/kg of dry weight, approximately 85-90% of the values achieved with the classic method, but without the negative effects of depletion. The cyclist arrived at competition rested, well-fueled, and mentally sharp. This protocol became the standard recommendation for two decades.

![Professional cyclist racing — starting with full glycogen stores defines the final kilometers](https://images.unsplash.com/photo-1504025468847-0e438279542c?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## The rapid Bussau protocol (2002)

Bussau et al. (2002) demonstrated that supercompensation could be achieved in a single day. Their protocol consisted of a brief session of high-intensity exercise (2 minutes and 30 seconds of sprint on a cycle ergometer) followed by 24 hours on an extremely high-carbohydrate diet (10-12 g/kg/day). Biopsies taken 24 hours later showed glycogen levels comparable to those of the classic six-day protocol.

The physiological explanation is that high-intensity exercise activates the enzyme glycogen synthase in a potent and rapid manner, creating a "supercompensation window" that allows the muscle to absorb glucose at very high rates during the following hours. There is no need to fully deplete the stores; it is enough to activate the correct molecular signaling.

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

The chart shows the evolution of muscle glycogen for each protocol. The classic method produces a deep valley before supercompensation. The modified version maintains stable levels and rises progressively. The rapid protocol stays at normal levels until the day before the race, when it surges abruptly thanks to the combination of intense exercise and massive carbohydrate loading.

## How many carbohydrates depending on event duration

Not all races require the same pre-event loading. Burke et al. (2011) established tiered recommendations based on event duration. For efforts lasting less than 60 minutes, normal glycogen stores are sufficient and a formal loading protocol is not warranted. As duration increases, carbohydrate intake in the 24-48 hours before the event should increase proportionally.

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

For a mountain stage of a grand tour that may last 4-6 hours, a 65 kg cyclist would need to consume 650-780 grams of carbohydrates in the preceding 24 hours. In practical terms, that amounts to approximately 2.5 kg of cooked rice or 1.5 kg of pasta plus several servings of bread and fruit. It is a considerable volume of food, and many cyclists rely on sports drinks and concentrated gels to reach those quantities without gastrointestinal distress.

![Sports nutrition — the choice of carbohydrate sources directly impacts glycogen replenishment](https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Carbohydrate sources: not all are equal

The speed of glycogen replenishment depends on the type of carbohydrate and the timing of intake. Burke et al. (2004) demonstrated that high glycemic index carbohydrates (white rice, white bread, potatoes, maltodextrin drinks) replenish muscle glycogen faster than low glycemic index options (oats, legumes, whole fruits) during the first 6 hours post-exercise.

In the 24-48 hours before competition, the difference between high and low glycemic index diminishes, because there is sufficient time for glycogen to be synthesized regardless of absorption speed. What matters is total quantity. However, fiber can be a problem. A very high-fiber diet produces bloating and gastrointestinal discomfort that no cyclist wants to experience at the start line. This is why the practical recommendation is to prioritize refined sources (white rice, pasta, white bread) and reduce vegetables, legumes, and whole grains during the two days before a race.

## Common loading mistakes

The most frequent error is confusing carbohydrate loading with overeating. The goal is to increase the proportion of carbohydrates in the diet, not total calories. A cyclist who simply adds pasta to their usual diet without proportionally reducing fats and proteins can end up with a caloric surplus that produces heaviness, excessive water retention, and digestive discomfort.

Another common mistake is loading too early. Jeukendrup (2014) noted that glycogen supercompensation is transient. If loading is done four days before the race and the cyclist then returns to a mixed diet, glycogen levels will have dropped significantly by race day. The optimal window is 24 to 48 hours before the event.

The third error is failing to practice. Gastrointestinal tolerance to high carbohydrate intakes is trainable. A cyclist who has never attempted consuming 10 g/kg/day should not try it for the first time before their target race. Thomas et al. (2016) recommended rehearsing the protocol during training, at least two or three times, to identify which foods and quantities each individual tolerates.

## Liver glycogen: the forgotten tank

Most cyclists focus on muscle glycogen, but hepatic glycogen is equally important. The liver stores between 80 and 120 grams of glycogen, whose primary function is to maintain stable blood glucose during exercise. When liver glycogen is depleted, blood glucose drops and the classic symptoms of the "bonk" appear: dizziness, confusion, generalized weakness, and performance collapse.

Gonzalez et al. (2016) demonstrated that liver glycogen is replenished more efficiently with a combination of glucose and fructose than with glucose alone. Fructose is preferentially metabolized in the liver, where it is converted to hepatic glycogen, while glucose is directed primarily to muscle. This has practical implications: during the pre-race loading phase, including fructose (fruit, honey, drinks with a glucose-fructose blend) optimizes the replenishment of both stores simultaneously.

![Sports nutrition preparation — including fructose alongside glucose optimizes both hepatic and muscle glycogen replenishment](https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Loading in professional practice

In the professional peloton, carbohydrate loading is integrated into the nutritional planning for each stage. WorldTour teams employ nutritionists who calculate specific requirements based on the next day's stage profile: a flat sprint stage requires less loading than a mountain stage with three hors categorie climbs.

Carbohydrate periodization during grand tours is a balancing act. Stellingwerff (2012) documented that Tour de France cyclists consumed between 6 and 12 g/kg/day depending on the stage, with the highest values reserved for mountain stages and time trials. On rest days, intake dropped to 4-6 g/kg/day to avoid unnecessary weight gain.

For the amateur cyclist preparing for a granfondo or stage race, the most practical and evidence-backed strategy is the modified Bussau rapid protocol: a high-intensity interval session the day before (as part of the final taper workout), followed by 10-12 g/kg of carbohydrates over the next 24 hours. No suffering, no week-long planning, and results equivalent to the most elaborate protocols.
