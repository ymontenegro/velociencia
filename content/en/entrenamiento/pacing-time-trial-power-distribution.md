---
title: "Time Trial Pacing: How to Distribute Power Without Blowing Up"
subtitle: "The average cyclist goes out 15-20% above their sustainable power and pays the price at kilometer 15. Three decades of research explain how to avoid it with concrete data"
section: "entrenamiento"
date: "2026-05-05"
author: "Tomás Herrera"
tags: ["time trial", "pacing", "power", "FTP", "training zones", "strategy", "TT", "threshold"]
excerpt: "Foster and colleagues documented in 1993 that the perfect start in a 2 km TT uses exactly 51% of total time in the first half. Thirty years of evidence confirm the same conclusion: controlled early pacing produces the best finishing time."
coverImage: "https://images.unsplash.com/photo-1764067521927-41a4d9062b07?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "Effect of pacing strategy on cycle time trial performance"
    url: "https://pubmed.ncbi.nlm.nih.gov/8455455/"
    type: pubmed
  - title: "Describing and understanding pacing strategies during athletic competition"
    url: "https://pubmed.ncbi.nlm.nih.gov/18278984/"
    type: pubmed
  - title: "Distribution of power output during cycling: impact and mechanisms"
    url: "https://pubmed.ncbi.nlm.nih.gov/17645369/"
    type: pubmed
  - title: "Pacing strategy and the occurrence of fatigue in 4000-m cycling time trials"
    url: "https://pubmed.ncbi.nlm.nih.gov/16888463/"
    type: pubmed
  - title: "Exercise intensity during competition time trials in professional road cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/10776906/"
    type: pubmed
  - title: "Variable versus constant power strategies during cycling time-trials: prediction of time savings using an up-to-date mathematical model"
    url: "https://pubmed.ncbi.nlm.nih.gov/17497402/"
    type: pubmed
  - title: "Relative importance of pacing strategy and mean power output in 1500-m self-paced cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/19850573/"
    type: pubmed
translationOf: "pacing-contrarreloj-distribucion-potencia"
---

## The mistake that repeats at every start line

The time trial produces a predictable behavior in non-specialized cyclists: the adrenaline of the start pushes them to pedal 15-20% above their sustainable power, and ten minutes later the power meter drops sharply as lactate floods the legs. Foster and colleagues documented this pattern in 1993 with experimental elegance that is hard to match: nine trained cyclists performed five 2 km trials on an ergometer, with power during the first half experimentally controlled from very slow to very fast. The evenly paced trial produced the best time, and the relationship between starting pace and final time described a U-shaped curve whose nadir fell exactly at 51% of total time spent in the first half. Going out too fast was just as damaging as going too slow — but athletes consistently committed the first error.

Thirty years later, the science of time trial pacing has matured considerably and the error remains equally common. Abbiss and Laursen published in 2008 in *Sports Medicine* (PMID 18278984) the most comprehensive taxonomy of pacing profiles in sport, identifying six distinct patterns — even, positive, negative, parabolic, U-shaped, and variable — and concluding that even pacing was the theoretical optimum for mid-duration events in stable conditions. The 20-40 km cycling time trial, the discipline that defines the overall standings at the Tour or the World Championships, is exactly that kind of event. There are no nuances: the evidence points in one direction.

## Six profiles, one optimal answer

Abbiss and Laursen define positive pacing as a pattern where power decreases over the course of the effort — the pattern of the cyclist who starts explosively and finishes dragging — and negative pacing as one that progressively increases to the finish. The U-shaped profile describes a fast start, a more controlled middle section, and a final sprint; the inverted parabola does the opposite, peaking in the central portion. For a flat or gently rolling TT, the evidence points to even pacing — or a very slightly negative profile with 1-2% more power in the final stretch — as the most energetically efficient strategy.

The fundamental reason is physical and metabolic: the energy cost of cycling is not linear with respect to power. Aerodynamic drag increases with the cube of velocity, meaning that riding 20% faster costs proportionally far more than 20% additional energy. Atkinson and colleagues published in *Sports Medicine* (2007, PMID 17645369) the most cited review on power distribution in cycling, demonstrating that excessive power variation penalizes overall performance precisely because of this non-linear effect. Distributing the same total work more evenly reduces net energy cost and allows a higher average power to be maintained throughout the entire course.

<ChartLine
  title="Power profile in a 40 km TT: ideal vs. typical amateur"
  caption="Based on Foster et al. (1993, PMID 8455455) and Atkinson et al. (2007, PMID 17645369). Illustrative data."
  data={[
    { km: "km 2", ideal: 93, tipico: 118 },
    { km: "km 5", ideal: 95, tipico: 108 },
    { km: "km 10", ideal: 97, tipico: 98 },
    { km: "km 15", ideal: 99, tipico: 93 },
    { km: "km 20", ideal: 100, tipico: 90 },
    { km: "km 25", ideal: 100, tipico: 89 },
    { km: "km 30", ideal: 101, tipico: 88 },
    { km: "km 35", ideal: 102, tipico: 90 },
    { km: "km 40", ideal: 106, tipico: 94 },
  ]}
  xKey="km"
  lines={[
    { key: "ideal", color: "#0891B2", name: "Ideal profile" },
    { key: "tipico", color: "#E11D48", name: "Typical amateur profile" },
  ]}
  unit="% FTP"
/>

## The physics that punishes the impatient

The math is merciless. Hettinga and colleagues (2006) studied this mechanism in a 4,000-meter track time trial (PMID 16888463), comparing conservative, even, and aggressive power profiles in competitive cyclists. The anaerobic contribution to the effort was significantly greater in the aggressive group from the first 500 meters, producing a power decline in the second half that was incompatible with optimal performance. Electromyographic data revealed that the resulting fatigue was peripheral — the muscle was failing — rather than central, meaning the damage was done long before the cyclist perceived any deterioration.

Data from Padilla and colleagues (2000) on professional World Tour time trials (PMID 10776906) adds the competitive context that theory alone cannot provide. In their study of eighteen elite cyclists, short time trials — under 30 minutes — were raced at intensities very close to the blood lactate accumulation threshold, approximately 4 mmol/L, while longer events — above 40 km — were raced at the aerobic-anaerobic threshold. The practical translation is that the professional TT is ridden in Z4 (91-105% FTP) for virtually the entire course, with brief excursions into Z5 (106-120% FTP) at the closing stages of shorter events or at hilltop finishes. Starting in Z5 for the first few kilometers is equivalent to throwing the race away.

## Hilly courses: the necessary exception

The even-pacing rule has one well-documented exception: courses with significant gradient or wind variation. Atkinson and colleagues (2007, PMID 17497402) demonstrated through mathematical modeling that varying power in parallel with slope changes — more watts on climbs, less on descents — produces considerable time savings compared to constant power. With an average power of 289 W, a ±10% variation synchronized with gradient produced a 126-second saving on a simulated rolling course — more than two minutes in a typical TT.

The principle is counterintuitive: by reducing power on descents, where speed is already naturally high and where each additional watt has little effect on time due to large aerodynamic drag forces, the cyclist conserves energy for the climbs where each extra watt translates directly into speed gained. The specific strategy is simple in concept but demands real-time measurement: climb the gradients at upper Z4 to early Z5 (95-108% FTP), roll the descents at Z3 (76-85% FTP), and maintain Z4 on the flat sections. Without a power meter, this strategy is impossible to execute with the necessary precision — RPE cannot detect 5-10% power variations with sufficient resolution.

## The numerical protocol: power by segment

For a 40 km TT on a neutral course, the optimal distribution that emerges from the literature has a well-defined structure. The first 3-5 km require active restraint: the target power is the lower end of Z4 (91-93% FTP), even if the cyclist feels capable of going harder. This self-imposed restriction compensates for the metabolic cost of the start — the first 30-60 seconds always involve an anaerobic contribution — and establishes heart rate in the sustainable range before committing the high-intensity glycolytic reserves.

Between kilometers 5 and 35, power should be maintained in the mid-to-high Z4 band: 95-100% FTP for 40 km events, up to 103-105% FTP for events of 20 km or less. Hettinga and colleagues (2009, PMID 19850573) showed that absolute mean power explains the majority of variance in finishing time — more than the pacing strategy itself — but that for a given mean power, even distribution optimizes that potential. In other words: mean power matters more than strategy, but strategy determines whether that mean power is used efficiently or squandered in the opening kilometers.

| Segment | Distance | Zone | Target % FTP | Subjective feel |
|---------|----------|------|--------------|-----------------|
| Launch | 0-3 km | Z4 low | 91-93% | Restrained, "too easy" |
| Build | 3-10 km | Z4 mid | 93-97% | Demanding but sustainable |
| Body | 10-35 km | Z4 high | 97-102% | At the limit, controlled |
| Finish | 35-38 km | Z4-Z5 | 102-108% | Maximum sustainable effort |
| Final sprint | 38-40 km | Z5-Z6 | 108-115% | Complete emptying |

The final stretch allows a gradual elevation precisely because glycolytic anaerobic energy was conserved throughout the effort by the controlled start. If the cyclist arrives at kilometer 35 with power below 90% FTP, the strategy was wrong from much earlier — not in the closing kilometers.

## Ganna and the perfect hour

Filippo Ganna set the UCI Hour Record on October 8, 2022 at the Grenchen velodrome, covering 56.792 km at an average power of 470 W for 60 complete minutes. What makes his performance scientifically notable is not just the absolute power but the distribution: his lap times showed a nearly perfectly negative progression, with the opening laps deliberately slower than Dan Bigham's record pace (55.548 km, August 2022) and the final laps progressively faster. Ganna began with restraint, matched the reference pace around minutes 25-30, and maintained a rising cadence and power output through the finish.

This slightly negative profile is the elite version of the optimal pacing that Foster and Abbiss & Laursen describe in the literature. For the amateur cyclist, the lesson is that even the world's best TT specialist of recent years chose to start with restraint, not aggression. The difference between Ganna and a club racer is not just average power — 470 W for one hour is roughly double what a well-trained non-professional can sustain — but the ability to execute a plan that the psychology of competition typically discards within the first few meters of the start ramp.

## Training plan: five weeks toward the TT

Specific time trial training has three distinct physiological objectives: raise FTP (the denominator of the power percentage), improve the ability to sustain power near threshold for the exact duration of the target event, and develop the pacing awareness necessary to avoid the explosive start error. This third objective is the most neglected in standard plans and paradoxically the one that most directly affects results in events under one hour.

| Week | Tuesday | Wednesday | Thursday | Saturday |
|------|---------|-----------|----------|---------|
| 1 | 3×10 min Z4 (91-95% FTP), 5 min rec Z2 | 90 min Z2 | 20 min TT sim. at 93% FTP | 2.5h Z2-Z3 |
| 2 | 3×12 min Z4 (93-97% FTP), 4 min rec Z2 | 90 min Z2 | 25 min TT sim. at 95% FTP | 3h Z2-Z3 |
| 3 | 4×10 min Z4 (95-100% FTP), 4 min rec Z2 | 90 min Z2 | 30 min TT sim. at 96% FTP | 3h Z2-Z3 |
| 4 | 4×12 min Z4-Z5 (97-105% FTP), 4 min rec Z2 | 90 min Z2 | 35 min TT sim. at 98% FTP | 3h Z2-Z3 |
| 5 (taper) | 2×10 min Z4 (91-95% FTP), 5 min rec Z2 | 75 min Z2 | 20 min TT sim. at 93% FTP | 2h Z2 |

The Thursday TT simulation session is the most specific in the plan. The protocol has a deliberate structure: start at 90-91% FTP for the first 3-5 minutes even if it feels too easy, build progressively to 97-98% FTP, and finish the final 5 minutes above 100% FTP. The goal is to record normalized power (NP) and Variability Index (VI) for each session: a VI below 1.05 on flat terrain indicates well-executed pacing; a VI above 1.10 signals power spikes that will be costly in the actual race.

## Warning signs that arrive in time

The most reliable indicator that pacing has gone wrong does not appear in the opening stretch of the race — it appears between kilometers 15 and 20, when recovery is already impossible. The signal that does arrive in time is heart rate: if by km 3-5 it has already reached 95% of maximum HR at the target power, the effort is unsustainable. Heart rate takes 3-5 minutes to stabilize at a given power; if it keeps rising beyond that point without plateauing, power must be reduced immediately — not in five more kilometers.

RPE — Borg's rating of perceived exertion — provides another early warning that underprepared cyclists ignore through excess optimism. In a well-executed TT, the RPE at the start should be 4-5 out of 10. A perceived exertion of 7-8 in the early kilometers is incompatible with arriving in good shape at kilometer 30. The psychology of the race start leads athletes to interpret that early 7-8 as a sign of peak performance; the physiology of pacing reads it as a guarantee of collapse at the midpoint.

Time trial training is not purely a physical endeavor: it is a cognitive training process to resist the impulse to start explosively and to trust that early restraint produces a superior final result. That trust only comes from accumulating personal data — sessions recorded, times compared, VI analyzed session by session — and it cannot be purchased with laboratory watts or the latest GPS computer. Data convinces the mind when race-day adrenaline pushes in the opposite direction.
