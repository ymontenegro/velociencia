---
title: "The 3000 kJ Threshold: Why Accumulated Watts Predict Grand Tours Better Than FTP"
subtitle: "Two riders with identical FTPs arrive at the final climb with radically different physiological capacities. The difference comes down to a number no standard test measures"
section: "ciencia"
date: "2026-05-15"
author: "Sofía Müller"
tags: ["durability", "fatigue resistance", "FTP", "kilojoules", "critical power", "WorldTour", "grand tours"]
sources:
  - title: "Maintaining Power Output with Accumulating Levels of Work Done Is a Key Determinant for Success in Professional Cycling"
    url: "https://pubmed.ncbi.nlm.nih.gov/33731651/"
    type: pubmed
  - title: "The Importance of 'Durability' in the Physiological Profiling of Endurance Athletes"
    url: "https://pubmed.ncbi.nlm.nih.gov/33886100/"
    type: pubmed
  - title: "The Record Power Profile of Male Professional Cyclists: Fatigue Matters"
    url: "https://pubmed.ncbi.nlm.nih.gov/35240578/"
    type: pubmed
  - title: "Impact of prior accumulated work and intensity on power output in elite/international level road cyclists – a pilot study"
    url: "https://doi.org/10.1007/s12662-022-00818-x"
    type: doi
  - title: "Durability in Professional Cyclists: A Field Study"
    url: "https://pubmed.ncbi.nlm.nih.gov/36521188/"
    type: pubmed
  - title: "The relationship between training characteristics and durability in professional cyclists across a competitive season"
    url: "https://pubmed.ncbi.nlm.nih.gov/35239466/"
    type: pubmed
excerpt: "After 3000 kJ of accumulated work, riders with identical FTPs arrive at decisive climbs with capacities 5 to 9 percentage points apart. Fresh FTP doesn't measure that."
coverImage: "https://images.unsplash.com/photo-1545575439-3261931f52f1?w=1600&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

Two cyclists start the Tour de France with an FTP of 6.0 W/kg, tested in the lab the month before. At kilometer 155 of the Galibier stage, with 3,100 kilojoules accumulated in their legs, one attacks above 5.8 W/kg for seventeen minutes. The other manages at 5.0 W/kg and arrives with the chasing group. The difference was not in their FTP. It was in what remained of that FTP after three and a quarter hours of racing.

Exercise physiology has had a conceptual framework for this divergence since 2021: durability, defined by Maunder et al. in *Sports Medicine* as "the time of onset and magnitude of deterioration in physiological-profiling characteristics during prolonged exercise" (PMID 33886100). What that framework does not always make explicit is the quantitative threshold where the divergence actually occurs. Published field data from grand tour racing places that threshold between 2,500 and 3,500 absolute kilojoules. That is exactly where rankings reorganize, and no standard FTP test measures what happens in that zone.

## Where Rankings Reorganize

A typical mountain stage at the Tour de France accumulates between 3,500 and 5,000 kilojoules for a 68–72 kg rider. The decisive climbs — Col de la Loze, Alpe d'Huez, Hautacam — appear in the final two hours of racing, after 70–85% of the day's total energy has already been spent. For a 68 kg rider accumulating 4,200 kJ over a five-hour stage, the final-climb attack occurs somewhere between 2,940 and 3,570 kJ into the day. That 2,800–3,500 kJ range is precisely where published science documents the largest divergence in performance between cyclists.

The structural problem with FTP is that it is measured before any of those kilojoules exist. A twenty-minute test performed fresh captures a rider's capacity under the conditions where everyone is most equal. Maunder et al. (2021) framed the issue precisely: classical physiological-profiling models assume that the ranking among athletes remains stable under fatigue. WorldTour field data show that assumption to be false. The ranking does not hold. It reorganizes — and it reorganizes in the exact kilojoule window where the race is decided.

## The Study That Quantified the Threshold

Van Erp, Sanders, and Lamberts published in 2021 in *Medicine & Science in Sports & Exercise* the analysis that established the methodological reference for quantifying that reorganization (PMID 33731651). They compiled power output data from 26 professional cyclists across 85 full seasons, between 2012 and 2019. Riders were classified as climbers or sprinters and into two success categories based on ProCyclingStats points: successful (CAT.1, ≥ 400 points) and less successful (CAT.2, < 400 points). They measured mean maximal power (MMP) for 10-second, 1-minute, 5-minute, and 20-minute efforts at six accumulated work levels: 0, 10, 20, 30, 40, and 50 kJ·kg⁻¹.

For a 68 kg climber, those 40–50 kJ·kg⁻¹ correspond to between 2,720 and 3,400 total kilojoules. The finding was unambiguous: at 0 kJ·kg⁻¹, fresh, differences in MMP between successful and less successful riders were marginal across all durations. The divergence appeared under fatigue. At 45–50 kJ·kg⁻¹, successful climbers held a 20-minute MMP just 4.0% below their fresh value. Less successful climbers dropped 9.0%. Five percentage points that, for a rider with 390 W fresh, translate to arriving at the final climb with 374 W versus 354 W. Over a forty-minute ascent, that gap closes more than a minute.

<ChartLine
  title="MMP decline at 20 min with accumulated kilojoules (68 kg rider)"
  caption="Normalized estimate based on Van Erp et al. (2021, MSSE). Values expressed as percentage of fresh-state value. Reference threshold: ≈ 3000 kJ."
  data={[
    { kJ: "0", successful: 100, less_successful: 100 },
    { kJ: "680", successful: 99.3, less_successful: 98.5 },
    { kJ: "1360", successful: 98.4, less_successful: 97.0 },
    { kJ: "2040", successful: 97.8, less_successful: 95.2 },
    { kJ: "2720", successful: 97.1, less_successful: 93.1 },
    { kJ: "3400", successful: 96.0, less_successful: 91.0 }
  ]}
  xKey="kJ"
  lines={[
    { key: "successful", color: "#7C3AED", name: "Successful rider (CAT.1)" },
    { key: "less_successful", color: "#0891B2", name: "Less successful rider (CAT.2)" }
  ]}
  unit="%"
/>

## 112 Riders, Eight Seasons

The largest published dataset on power-profile deterioration under fatigue comes from Mateo-March, Valenzuela, Muriel, and colleagues in a 2022 *International Journal of Sports Physiology and Performance* study (PMID 35240578). They analyzed 112 professional male cyclists — 46 ProTeam and 66 WorldTour — using eight seasons of data (2013–2021) from an elite team. MMP was measured for efforts from 10 seconds to 120 minutes at accumulated work levels of 0, 15, 25, 35, and 45 kJ·kg⁻¹. For a 68 kg rider, those thresholds correspond to 0, 1,020, 1,700, 2,380, and 3,060 kilojoules.

Deterioration was progressive and began earlier than many models assumed: even at 15 kJ·kg⁻¹ (~1,020 kJ), mean MMP declined between 1.6% and 3.0% across all durations. At 45 kJ·kg⁻¹ (~3,060 kJ), the drop reached 6.0% to 9.7% depending on duration and rider. The category comparison revealed the most operationally relevant finding: at 35 kJ·kg⁻¹ (~2,380 kJ), the difference in deterioration between WorldTour and ProTeam riders became statistically significant. At 45 kJ·kg⁻¹, ProTeam cyclists showed significantly larger MMP declines at 5- and 20-minute durations. Fresh, both groups started from similar positions. Under three thousand kilojoules, the WorldTour separation widened.

## Why Fresh FTP Overestimates Capacity at Decisive Moments

The classical power-duration model describes the relationship between intensity and sustainable duration as $$P = CP + \frac{W'}{t}$$ where $CP$ is critical power, $W'$ is available anaerobic work capacity, and $t$ is time. Both parameters are typically measured fresh, with the rider rested. That procedure assumes $CP$ and $W'$ are constant throughout a race day. They are not.

With sufficient accumulated work, $CP$ declines. Spragg, Leo, and Swart documented this in professional under-23 cyclists followed across a full competitive season (PMID 35239466): the fatigued power profile varied significantly across seasonal phases while the fresh profile remained relatively stable. $CP$ measured fresh overestimates the $CP$ available at kilometer 155 of a mountain stage. By how much depends precisely on individual durability — the very thing the fresh test does not capture.

Valenzuela and colleagues quantified that overestimation in a field setting (PMID 36521188). Twelve professional male cyclists with a mean VO₂max of 83 ml·kg⁻¹·min⁻¹ completed a 20-minute time trial both fresh and immediately after four hours of submaximal riding (~40 kJ·kg⁻¹, approximately 2,720 kJ total). Mean power fell from 386 W to 375 W, an average reduction of 2.9%. But the individual variability was the most informative finding: some riders lost up to 8.5% of their power; others lost none. No laboratory variable — VO₂max, ventilatory threshold, peak power — predicted which rider fell and which held. Fresh FTP was identical between riders with opposite durability profiles.

<ChartBar
  title="MMP 20-min decline: successful vs less successful climbers at 3400 kJ accumulated"
  caption="Data from Van Erp et al. (2021, MSSE). N=26 cyclists, 85 seasons. 68 kg rider, 50 kJ/kg accumulated."
  data={[
    { group: "Successful climber (CAT.1)", decline: 4.0 },
    { group: "Less successful climber (CAT.2)", decline: 9.0 }
  ]}
  xKey="group"
  bars={[{ key: "decline", color: "#7C3AED", name: "MMP 20-min decline (%)" }]}
  unit="%"
/>

## Accumulated kJ and the Volume Trap

Accumulating kilojoules is a necessary but insufficient condition for predicting physiological deterioration: the intensity at which those kilojoules were generated matters as much as the total. Leo, Spragg, and colleagues published a pilot study in 2022 in the *German Journal of Exercise and Sport Research* (DOI: 10.1007/s12662-022-00818-x) with 9 UCI ProTeam cyclists. Each rider completed two 2.5-hour pre-fatigue protocols matched for total kilojoules: one at moderate continuous intensity (MIC, below 70% of maximum heart rate) and one race-simulation with high-intensity intermittent bouts (HII, above 80%). After the MIC protocol, the subsequent 12-minute power test showed no statistically significant deterioration. After HII, it did.

The operational implication is direct. Two riders accumulating 3,000 kJ in the same stage can arrive at the final climb in radically different physiological states if one distributed those kilojoules sitting in the peloton at zone-2 intensity for hours while the other absorbed fifteen accelerations above their $CP$ on intermediate ramps. A kilojoule is a unit of energy, not of physiological stress. Its predictive value for final-climb performance improves substantially when combined with the intensity distribution within that total work: not just how many kJ, but how many kJ above threshold.

## Measuring Durability Without a Laboratory

The standard field protocol for quantifying durability requires two power tests under different conditions: one fresh and one after a standardized pre-fatigue load. The design used in the literature (Valenzuela et al., 2023) involves four hours of submaximal riding accumulating 38–42 kJ·kg⁻¹, followed immediately by a 20-minute maximum effort. The percentage difference between the fatigued-test power and the fresh-test power is the individual durability index.

This design has practical limitations. It requires two separate days under controlled conditions, calibrated power measurement, and the capacity to produce a genuine maximal effort after four hours of work. In its most rigorous form, the pre-fatigue load should replicate the intensity distribution of the target event. A practical approximation for non-professional cyclists involves performing the 20-minute test at the end of a four-to-five-hour zone-2 ride — accumulating the typical 35–45 kJ·kg⁻¹ of moderate work — and comparing that result against a fresh test performed in a separate session. The difference between the two, while not standardized to laboratory-study scales, provides an operational first estimate of individual durability. The vast majority of amateur cyclists have never run this test.

## Training to Hold Watts After 3000 kJ

Training volume below the first ventilatory threshold is the most consistently identified predictor of durability in the published literature. Spragg, Leo, and Swart, studying 30 professional under-23 cyclists across a full season (PMID 35239466), found that time spent in zone 1 correlated positively with power retention under fatigued conditions. Two-minute MMP in the fatigued state showed progressive improvement in riders with a higher proportion of sub-aerobic-threshold training. The fresh profile, meanwhile, remained relatively invariant.

The plausible mechanism is mitochondrial density and improved oxidative efficiency. A rider with greater capacity to oxidize substrates at low intensity arrives at decisive efforts with less-depleted glycogen stores, protecting the ability to sustain high power outputs when accumulated kilojoules exceed the 2,500–3,000 threshold. From this perspective, zone-2 training does not directly build FTP but builds the substrate protection that preserves that FTP under accumulated fatigue.

The most specific practical translation concerns the sequencing of high-intensity work within long sessions. A rider who places critical-power intervals at kilometer 30 of a four-hour ride trains fresh-state capacity. One who places those same intervals at kilometer 140 — carrying 2,600–2,800 kJ of prior work — replicates the exact physiological conditions of decisive race climbs. The metabolic stress is not equivalent even when the interval prescription looks identical on paper. Nutrition during effort acts as a modulator: carbohydrate intake of 80–120 grams per hour reduces glycogen depletion in the final hours, protecting MMP in the 2,500–3,500 kJ range and partially attenuating intrinsic durability differences between riders.

## The Number Missing From the Physiological Profile

A standard physiological profile includes VO₂max, ventilatory threshold, gross efficiency, and FTP. All are measured in the condition where riders are most equal: fresh. None captures the behavior of those variables after 3,000 kilojoules — which is the condition where grand tours are decided. The data from Van Erp et al. (2021) and Mateo-March et al. (2022) demonstrate that adding a durability index — the percentage drop in 5- and 20-minute MMP after standardized pre-fatigue — differentiates riders who win general classifications from those who do not, even when their laboratory FTP values are virtually identical.

For the amateur cyclist completing 140–200 km mountain gran fondos, the implication scales accordingly. A 170-kilometer mountain ride accumulates 30–45 kJ·kg⁻¹ of work. The final climb — the one that gets remembered — arrives when 85–90% of the day's kilojoules are already spent. A rider arriving at that climb with a durability index of 97% can still race. One arriving at 91% manages. The difference between them cannot be seen in the laboratory. It becomes visible in the mountains, past 2,800 kJ, in the watts that remain when watts are the only thing that matter.
