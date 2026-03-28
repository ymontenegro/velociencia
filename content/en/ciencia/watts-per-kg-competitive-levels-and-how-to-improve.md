---
title: "W/kg: Competitive Level Ranges and How to Improve Them"
subtitle: "The universal metric of performance cycling, explained with real data"
section: "ciencia"
date: "2026-03-25"
author: "Sofía Müller"
tags: ["W/kg", "relative power", "FTP", "Coggan levels", "cycling performance"]
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
excerpt: "Watts per kilogram is the metric that levels the playing field between cyclists of different sizes. Coggan's table popularized the reference ranges, but the physiological reality behind those numbers is more nuanced than it appears."
coverImage: "https://images.unsplash.com/photo-1592182811189-87f6ae2f3407?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## Why weight matters as much as power

A 90 kg cyclist producing 360 watts at threshold and a 60 kg cyclist producing 270 watts generate very different absolute power figures. But both produce exactly 4.0 W/kg, and on an 8% gradient they will reach the summit at virtually the same time. Power relative to body weight is the metric that eliminates the size variable and enables direct comparisons between cyclists of any build.

Lucia et al. (2001) documented that professional Tour de France cyclists maintained between 5.9 and 6.4 W/kg at threshold during decisive mountain stages. That figure establishes the reference ceiling. But between that ceiling and the weekend recreational rider lies a broad and well-documented spectrum.

## The Coggan table: the standard reference

Andrew Coggan, exercise physiologist and co-creator of TrainingPeaks, published the first systematic classification of relative power by competitive level. The original table was based on data collected from thousands of cyclists using power meters and has become the most widely used benchmark in performance cycling.

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

The values in the table represent FTP (Functional Threshold Power) normalized to body weight. FTP estimates the maximum power sustainable for approximately one hour, although Allen and Coggan (2010) clarified that it is more a practical approximation than a strict physiological definition. The jump between each level is not linear: moving from recreational to trained requires months of consistency, but progressing from elite to WorldTour can require years of optimal training combined with favorable genetics.

## Full ranges by sex

The complete Coggan table includes ranges for men and women. The differences between sexes are consistent with the physiological literature: women produce on average 10-15% fewer W/kg at threshold, a difference attributable primarily to differences in muscle mass, hemoglobin levels, and body composition according to Joyner (2017).

| Level | Men (W/kg) | Women (W/kg) |
|-------|----------------|-----------------|
| Untrained | 1.5–2.0 | 1.2–1.7 |
| Recreational | 2.0–2.8 | 1.7–2.4 |
| Trained | 2.8–3.5 | 2.4–3.1 |
| Competitive | 3.5–4.2 | 3.1–3.7 |
| Elite Cat 1-2 | 4.2–5.0 | 3.7–4.4 |
| Pro Continental | 5.0–5.6 | 4.4–5.0 |
| WorldTour | 5.6–6.4 | 5.0–5.6 |

These ranges are indicative. A cyclist at the upper end of one level can function competitively in the next category. Moreover, FTP is not everything: a cyclist with 3.8 W/kg FTP but excellent anaerobic capacity (high W') can win criteriums against rivals with 4.2 W/kg who lack a sprint.

## Beyond FTP: relative power by duration

FTP captures only a single point on the power curve. For a complete profile, it is necessary to examine W/kg across multiple durations. Sanders and Heijboer (2019) documented relative power ranges in professional cyclists for efforts from 5 seconds to 60 minutes. The differences between durations reveal the cyclist's metabolic profile.

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

The gap between levels widens at shorter durations. In a 5-second sprint, a WorldTour cyclist nearly doubles a recreational rider. At 20 minutes, the difference is a factor of 2.5. This reflects the fact that maximal neuromuscular power has a significant genetic component (type II fiber proportion, neural activation), while sustained power responds more to accumulated training.

## What determines your W/kg ceiling

Relative power is the result of two variables: the absolute power you produce and your body weight. Improving W/kg means acting on one or both. Lucia et al. (2001) identified three physiological factors that determine sustainable power: VO2max, pedaling efficiency (or economy), and the fraction of VO2max utilization at threshold.

VO2max sets the upper limit. It is determined 50-70% by genetics according to Bouchard et al. (1999), although training can improve it 15-25% from baseline values. Pedaling efficiency, measured as the percentage of metabolic energy converted into mechanical work, varies between 18% and 25% among cyclists. Coyle et al. (1992) found that the most efficient cyclists produced more watts for the same oxygen consumption. The fraction of utilization at threshold -- that is, what percentage of VO2max can be sustained without lactate accumulation -- is the most trainable factor and the one that most differentiates intermediate levels.

![Cyclist on a training ride — improving W/kg requires consistency on the bike](https://images.unsplash.com/photo-1575995330221-c20326537393?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## How to improve your W/kg

The first lever is aerobic training. Seiler and Kjerland (2006) demonstrated that polarized intensity distribution (80% of time at low intensity, 20% at high intensity) produced the best adaptations in lactate threshold and VO2max in already-trained cyclists. For beginner cyclists, virtually any increase in volume generates significant W/kg improvements during the first 12 to 18 months.

The second lever is body composition. Reducing body fat without losing muscle mass directly improves W/kg. Mujika and Padilla (2001) documented that Tour de France cyclists reached their peak performance at 6-8% body fat in men. However, pushing caloric restriction too far compromises recovery, immune function, and performance. Mountjoy et al. (2018) described RED-S (Relative Energy Deficiency in Sport) as a frequent consequence of the obsessive pursuit of lightness in cyclists.

The third lever is mechanical efficiency. Proper bike fitting, optimal cadence, and refined pedaling technique can improve efficiency by 1% to 3% according to Bini et al. (2011). That sounds modest, but at 300 watts, a 2% improvement in efficiency means producing those 300 watts at a 2% lower metabolic cost, which over the course of an hour translates into less accumulated fatigue.

## The single-number trap

Reducing cycling performance to a single W/kg figure is tempting but misleading. Two cyclists with 4.0 W/kg FTP can have radically different profiles: one might be an 85 kg sprinter with 340 watts at threshold and another a 58 kg climber with 232 watts. The first will dominate on flat terrain and in sprints. The second will be unbeatable on long climbs where aerodynamics matter less than gravity.

Mujika and Padilla (2001) analyzed the physiological demands of different specialties within the professional peloton and concluded that W/kg only predicts performance well on climbs. On flat roads, absolute power and CdA (coefficient of aerodynamic drag) are more determinant. In a sprint, peak neuromuscular power and acceleration capacity matter more than sustained power.

W/kg is a powerful tool for evaluating personal progression and situating your relative level within the cycling population. But it must always be interpreted in context: what type of cycling you practice, what terrain you race on, and what the specific demands of your objectives are. Coggan's table is a starting point, not a verdict.
