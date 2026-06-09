---
title: "Cardiovascular Drift in Cycling: Why Your Heart Rate Climbs When Power Doesn't"
subtitle: "During 60 minutes of Zone 2 riding, heart rate can rise 5–15 bpm while power stays flat. The mechanism is cardiovascular, thermoregulatory, and partly preventable"
section: "ciencia"
date: "2026-05-19"
author: "Sofía Müller"
tags: ["cardiovascular drift", "heart rate", "zone 2", "hydration", "aerobic decoupling", "durability", "thermoregulation", "cardiac drift"]
sources:
  - title: "Cardiovascular drift during prolonged exercise: new perspectives"
    url: "https://pubmed.ncbi.nlm.nih.gov/11337829/"
    type: pubmed
  - title: "Dehydration markedly impairs cardiovascular function in hyperthermic endurance athletes during exercise"
    url: "https://pubmed.ncbi.nlm.nih.gov/9104860/"
    type: pubmed
  - title: "Separate and combined influences of dehydration and hyperthermia on cardiovascular responses to exercise"
    url: "https://pubmed.ncbi.nlm.nih.gov/9694413/"
    type: pubmed
  - title: "Cardiovascular drift and cerebral and muscle tissue oxygenation during prolonged cycling at different pedalling cadences"
    url: "https://pubmed.ncbi.nlm.nih.gov/22509808/"
    type: pubmed
  - title: "Ingestion of sodium plus water improves cardiovascular function and performance during dehydrating cycling in the heat"
    url: "https://pubmed.ncbi.nlm.nih.gov/23253191/"
    type: pubmed
  - title: "The Importance of 'Durability' in the Physiological Profiling of Endurance Athletes"
    url: "https://pubmed.ncbi.nlm.nih.gov/33886100/"
    type: pubmed
excerpt: "During 60 minutes of Zone 2 riding, heart rate can climb 5–15 bpm while power stays constant. Cardiovascular drift is not sensor noise — it precisely reflects the competition between working muscle and skin for the same cardiac output. Measuring the Pw:HR ratio turns every long ride into an aerobic durability test."
coverImage: "https://images.unsplash.com/photo-1754546326803-994b2d510168?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
translationOf: "drift-cardiaco-ciclismo-frecuencia-cardiaca"
---

## Your head unit isn't lying — it's just telling a different story

Ninety minutes into a summer base ride, you glance at your computer and see 158 bpm. Power is sitting at 195 W, unchanged since the first pedal stroke. Nothing has varied — except the heat radiating off the asphalt, the thirst you've been half-ignoring since kilometer 40, and something invisible happening inside your cardiovascular system. That quiet heart rate rise without any change in power output has a name: *cardiovascular drift*. It is not a sensor glitch or a sign of deception from your chest strap; it is a precise, measurable readout of a physiological cascade that every cyclist should understand.

Coyle and González-Alonso described in *Exercise and Sport Sciences Reviews* (2001) that this gradual rise typically begins between 10 and 20 minutes into sustained exercise and can reach 5–15 beats per minute over the first hour, depending on ambient temperature and hydration status (PMID 11337829). The common misread is to assume the perceived effort must have increased — a concealed gradient, a headwind that picked up — when in reality the engine is still at the same power but the system distributing fuel has rearranged its internal geometry. Understanding the mechanism is the starting point for interpreting the number on the screen.

## The heart solves a volume problem with frequency

Cardiac output — the volume of blood the heart pumps per minute — equals heart rate multiplied by stroke volume:

$$\dot{Q} = HR \times SV$$

During prolonged constant-intensity exercise, stroke volume falls. To prevent cardiac output from collapsing and keep the working muscle supplied with oxygen, the heart compensates by beating more frequently. The observable result is exactly what the head unit shows: HR rises with no change in power. The critical question is what causes stroke volume to drop in the first place.

Two mechanisms act simultaneously and amplify each other. The first is progressive dehydration through sweating: as plasma volume shrinks, less blood is available to fill the ventricles during each diastolic cycle. González-Alonso, Mora-Rodríguez, Below and Coyle demonstrated in *Journal of Applied Physiology* (1997) that when dehydration is superimposed on hyperthermia, stroke volume falls by approximately 26 ml per beat and cardiac output drops 13% compared to the hydrated condition (PMID 9104860). That study enrolled 15 trained cyclists who exercised in heat until they lost 4% of body weight through sweat, and showed that combining both stressors produces cardiovascular impairment that neither produces independently at the same magnitude.

## Skin competes with muscle for every litre of blood

The second mechanism is cutaneous vasodilation. As core temperature rises during exercise, the autonomic nervous system dilates skin capillaries to dissipate heat into the environment. That blood flow redistribution is not free: locomotor muscle and skin compete for the same available volume in a fixed circulatory system. González-Alonso showed in *International Journal of Sports Medicine* (1998) the separate and combined effects of dehydration and hyperthermia on cardiovascular responses during exercise, finding that hyperthermia alone reduces stroke volume even when plasma volume remains stable — precisely through that cutaneous redistribution of flow (PMID 9694413). The skin functions as a biological radiator that diverts resources from the engine.

Both mechanisms explain why drift is larger in summer than in winter, and why the performance gap between a well-hydrated and a dehydrated cyclist on a hot stage goes far beyond the subjective sensation of thirst. Cadence adds a third variable to the equation. Kounalakis and Geladas studied cardiovascular drift in 12 cyclists who pedaled 90 minutes at 60% of VO₂max at cadences of 40 and 80 rpm, and found that the higher cadence generated greater cardiac output decline (1.0 L·min⁻¹) and greater stroke volume reduction (9 ml per beat), likely because elevated ventilatory demand increases intrathoracic pressure and reduces venous return (PMID 22509808).

<ChartLine
  title="Typical HR and power evolution during 60 min of Z2 (moderate heat)"
  caption="Schematic pattern based on Coyle & González-Alonso (2001) and González-Alonso et al. (1997)"
  data={[
    { x: "0 min", hr: 130, power: 195 },
    { x: "10 min", hr: 132, power: 195 },
    { x: "20 min", hr: 135, power: 195 },
    { x: "30 min", hr: 138, power: 194 },
    { x: "40 min", hr: 141, power: 194 },
    { x: "50 min", hr: 144, power: 193 },
    { x: "60 min", hr: 147, power: 193 }
  ]}
  xKey="x"
  lines={[
    { key: "hr", color: "#7C3AED", name: "HR (bpm)" },
    { key: "power", color: "#0891B2", name: "Power (W)" }
  ]}
  unit=""
/>

## The magnitude shifts with context

Cardiovascular drift is not a fixed quantity. In cool conditions — 18 to 22 °C — with optimal hydration, drift can stay below 3–5 beats per minute over 60 minutes, a change most cyclists would dismiss as background noise. In moderate heat with progressive dehydration, it can exceed 12–15 beats and begin to compromise the ability to sustain target power without crossing into a higher metabolic zone. In extreme heat with 3–4% body mass loss through sweat, the cardiovascular system can deteriorate to a point that no pacing strategy resolves without either cutting power or stopping to drink.

<ChartBar
  title="HR drift in 60 min by temperature and hydration condition"
  caption="Estimates based on González-Alonso et al. (1997, 1998) and Coyle & González-Alonso (2001)"
  data={[
    { condition: "Cool + hydrated", drift: 4 },
    { condition: "Heat + hydrated", drift: 8 },
    { condition: "Cool + dehydrated", drift: 7 },
    { condition: "Heat + dehydrated", drift: 14 }
  ]}
  xKey="condition"
  bars={[{ key: "drift", color: "#7C3AED", name: "HR increase (bpm over 60 min)" }]}
  layout="vertical"
  unit=" bpm"
/>

## Aerobic decoupling: drift as an aerobic base metric

TrainingPeaks popularised the concept of *aerobic decoupling* under the label Pw:HR, which quantifies as a percentage how far the power-to-heart-rate relationship drifts between the first and second halves of a sustained aerobic effort. The formula compares the efficiency ratio in each half:

$$\text{Pw:HR drift} = \frac{(P_{\text{1st half}}/HR_{\text{1st half}}) - (P_{\text{2nd half}}/HR_{\text{2nd half}})}{P_{\text{1st half}}/HR_{\text{1st half}}} \times 100\%$$

A value at or below 5% during a 60–90 minute Zone 2 effort is interpreted as a marker of solid aerobic base: the heart maintains the same relative efficiency — the same power per beat — throughout the effort. A value above 5% under controlled temperature conditions with adequate hydration signals that the power-to-cardiac-cost relationship is deteriorating over time. That deterioration can reflect insufficient aerobic base, residual fatigue from preceding days, or simply that the ride intensity was above the cyclist's actual Zone 2 threshold.

The Pw:HR connects directly to the scientific concept of *durability*, which Maunder, Seiler, Mildenhall, Kilding and Plews defined in *Sports Medicine* (2021) as "the time of onset and magnitude of deterioration in physiological-profiling characteristics during prolonged exercise" (PMID 33886100). A durable cyclist maintains threshold power, aerobic capacity, and cardiovascular efficiency for hours rather than watching them erode progressively. Low Pw:HR is one of the observable markers of high durability, and tracking it longitudinally through a base training block reveals with more precision than a single FTP test whether high-volume training is doing what it is supposed to do.

## How to measure it from a ride file

Measuring cardiovascular drift in the field requires only a power meter, a heart rate monitor, and 60–90 minutes on flat or gently rolling terrain. The standard protocol is to hold constant power in Zone 2 — approximately 55–72% of FTP — throughout the effort, avoiding significant climbs, stop lights, or power variations greater than 10%. At the end, calculate average HR for the first half and the second half, apply the Pw:HR formula, and read the drift percentage for that specific combination of temperature and hydration.

Analysis platforms calculate Pw:HR automatically from the activity file. The most important condition for the number to be meaningful across sessions is standardising the context: same time of day, similar ambient temperature, comparable hydration at the start, and the same intake strategy during the ride. Comparing a July Pw:HR to a February one without correcting for temperature is equivalent to comparing two time trials on different circuits without accounting for elevation gain — the number is accurate, but the interpretation can lead somewhere wrong.

## Sodium plus water: the most effective lever against drift

Hamouti, Fernández-Elías, Ortega and Mora-Rodríguez published in *Scandinavian Journal of Medicine & Science in Sports* (2014) a study that quantified the effect of hydration strategy on cardiovascular drift during heat cycling (PMID 23253191). Ten trained cyclists pedaled 120 minutes in the heat drinking water alone or water with sodium at two concentrations, then completed a time trial. The sodium groups maintained higher plasma volume, preserved stroke volume, and exhibited less heart rate drift than the water-only group. Time trial performance improved 7.4% compared to no-sodium hydration.

The mechanism explains the difference. Sodium retains water in the plasma space rather than letting it redistribute into the intracellular compartment or subcutaneous tissue. By keeping plasma volume higher during exercise, the ventricles have more blood available in each diastole, stroke volume falls less steeply, and the heart does not need to compensate with as much additional frequency. For cyclists racing in hot stages or training through summer, adding sodium to the bottle — between 400 and 800 mg per litre — has a direct physiological rationale that goes beyond replacing sweat losses.

## Acute drift versus multi-day accumulated fatigue

The cardiovascular drift that occurs within a single session has a different origin from the elevated heart rate that accumulates across consecutive days of training with incomplete recovery. The former is acute, thermoregulatory and haemodynamic: it reverses completely with rehydration and rest within a few hours, once plasma volume is restored and core temperature returns to baseline. The latter reflects systemic fatigue accumulation that the autonomic nervous system expresses as a persistently elevated sympathetic tone.

A cyclist three weeks into a heavy training block may show elevated Pw:HR during Zone 2 rides not because their aerobic base has deteriorated, but because plasma volume is chronically reduced by the combination of accumulated load and insufficient recovery. Distinguishing between the two requires looking at the trend across multiple sessions: if Pw:HR normalises after 48 hours of active recovery with good hydration, the source is acute. If it persists across weeks under controlled and comparable conditions, the data points to a genuine aerobic base deficit — or an overreaching state that warrants reduced load.

## Heat acclimation cuts drift at the source

Cardiovascular drift decreases with heat acclimation because the adaptation process produces exactly the physiological changes that counteract drift mechanisms. Acclimation expands plasma volume — typically 5–10% after 10 days of controlled heat exposure — which increases the blood available to fill the ventricles and reduces the magnitude of stroke volume decline during prolonged exercise. It also advances the onset and increases the rate of sweating, which slows the accumulation of core heat and attenuates the demand for cutaneous vasodilation.

For the cyclist preparing a summer gran fondo or monitoring their base training, periodic Pw:HR measurement using the same protocol acts as a thermometer of cardiovascular adaptation over time. A Pw:HR that falls from 9% to 4% between May and July under comparable temperature conditions does not reflect a dramatic FTP improvement. It indicates that the heart learned to maintain the power-per-beat relationship stable for longer. That gain — quiet, invisible in the app's headline metrics — is precisely what separates a cyclist with a solid aerobic base from one who has spent the whole season training without building one.

## A tool, not a problem to solve

Cardiovascular drift is an expected and largely unavoidable physiological response to prolonged exercise in heat or with progressive dehydration. Its value lies not in eliminating it — which would require training in a cold chamber with continuous intravenous fluid replacement — but in measuring, contextualising, and using it as a signal. Zone 2 rides with simultaneous power and HR monitoring become functional durability tests with a simple Pw:HR calculation that any cyclist can repeat monthly on the same familiar circuit. The thermometer, the water bottle with sodium, and the ride file are the three instruments that transform drift from an uncomfortable number in the second half of the activity graph into genuinely useful data.
