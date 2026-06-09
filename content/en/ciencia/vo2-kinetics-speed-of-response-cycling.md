---
title: "Same VO₂max, different cost: how VO₂ kinetics determines what you pay on every acceleration"
subtitle: "The time constant τ separates trained cyclists (~25 s) from untrained ones (>45 s) — that gap sets the oxygen deficit accumulated on every surge, regardless of aerobic ceiling"
section: "ciencia"
date: "2026-05-24"
author: "Sofía Müller"
tags: ["VO₂ kinetics", "VO₂max", "time constant tau", "oxygen deficit", "slow component", "priming exercise", "short intervals", "exercise physiology"]
sources:
  - title: "Whipp BJ, Wasserman K. Oxygen uptake kinetics for various intensities of constant-load work. J Appl Physiol. 1972;33(3):351-6"
    url: "https://pubmed.ncbi.nlm.nih.gov/5056210/"
    type: pubmed
  - title: "Poole DC, Jones AM. Oxygen Uptake Kinetics. Compr Physiol. 2012;2(2):933-996"
    url: "https://pubmed.ncbi.nlm.nih.gov/23798293/"
    type: pubmed
  - title: "Jones AM, Burnley M. Oxygen uptake kinetics: an underappreciated determinant of exercise performance. Int J Sports Physiol Perform. 2009;4(4):524-32"
    url: "https://pubmed.ncbi.nlm.nih.gov/20029103/"
    type: pubmed
  - title: "Xu F, Rhodes EC. Oxygen uptake kinetics during exercise. Sports Med. 1999;27(5):313-27"
    url: "https://pubmed.ncbi.nlm.nih.gov/10368878/"
    type: pubmed
  - title: "Bailey SJ, Vanhatalo A, Wilkerson DP, DiMenna FJ, Jones AM. Optimizing the 'priming' effect: influence of prior exercise intensity and recovery duration on O2 uptake kinetics and severe-intensity exercise tolerance. J Appl Physiol. 2009;107(6):1743-56"
    url: "https://pubmed.ncbi.nlm.nih.gov/19797685/"
    type: pubmed
  - title: "Rønnestad BR, Hansen J, Vegge G, Tønnessen E, Slettaløkken G. Short intervals induce superior training adaptations compared with long intervals in cyclists - an effort-matched approach. Scand J Med Sci Sports. 2015;25(2):143-51"
    url: "https://pubmed.ncbi.nlm.nih.gov/24382021/"
    type: pubmed
  - title: "Rønnestad BR, Hansen J, Nygaard H, Lundby C. Superior performance improvements in elite cyclists following short-interval vs effort-matched long-interval training. Scand J Med Sci Sports. 2020;30(5):849-857"
    url: "https://pubmed.ncbi.nlm.nih.gov/31977120/"
    type: pubmed
excerpt: "VO₂max sets the aerobic ceiling, but VO₂ kinetics determines how fast you reach it. In trained cyclists the time constant τ sits between 20 and 30 seconds; in untrained individuals it commonly exceeds 45 seconds. That gap defines the anaerobic cost of every surge, acceleration, and interval start — and it is trainable."
coverImage: "https://images.unsplash.com/photo-1709601415546-dcd24c912e56?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
translationOf: "cinetica-vo2-velocidad-respuesta-ciclismo"
---

## Same ceiling, different response speed

Two cyclists with an identical $\dot{V}O_2$max of 72 ml·kg⁻¹·min⁻¹ can face radically different physiological costs when sprinting out of a corner at maximum power. One activates aerobic metabolism with a time constant of 25 seconds; the other needs nearly twice as long to reach the same fraction of the response. During that interval when oxygen supply falls short of demand, the muscle draws on phosphocreatine (PCr) and anaerobic glycolysis — finite reserves that carry a deferred metabolic cost. The $\dot{V}O_2$max sets the ceiling of what the aerobic system can deliver; VO₂ kinetics determines how quickly it reaches that ceiling after each intensity transition. Jones and Burnley wrote in the *International Journal of Sports Physiology and Performance* in 2009 that VO₂ kinetics is "an underappreciated determinant of exercise performance" that standard physiological profiling rarely quantifies (PMID 20029103).

## The oxygen deficit at exercise onset

The moment a cyclist shifts from zone 2 into an effort above threshold, metabolic demand rises within milliseconds while the oxidative system takes tens of seconds to adjust. The difference between what the muscle requires and what aerobic metabolism delivers is called the oxygen deficit, and it must be covered by anaerobic substrates — primarily phosphocreatine stores and, to a lesser degree, rapid glycolysis with lactate production. Whipp and Wasserman demonstrated in 1972, in a study published in the *Journal of Applied Physiology* using subjects performing constant-load work at varying intensities, that $\dot{V}O_2$ rises exponentially after exercise onset and that the speed of that rise depends on both exercise intensity and training status (PMID 5056210). The slower the rise — that is, the larger the time constant τ — the greater the area under the deficit curve, and the deeper the drain on anaerobic reserves the cyclist will need for subsequent efforts.

## Three phases in under four minutes

The $\dot{V}O_2$ response to exercise onset is not a single exponential: it is a three-phase process with distinct physiological origins. Phase I, the cardiodynamic component, lasts 10 to 20 seconds and reflects the abrupt rise in cardiac output and the increased return of deoxygenated venous blood to the lungs; $\dot{V}O_2$ climbs quickly in this phase not because muscles are extracting more oxygen, but because more blood is flowing through the pulmonary exchange. Phase II, the primary component, is the exponential rise that describes the actual activation of muscle oxidative metabolism and is modeled mathematically as:

$$\dot{V}O_2(t) = \dot{V}O_{2,\text{base}} + A \cdot \left(1 - e^{-(t - t_0)/\tau}\right)$$

where $A$ is the response amplitude, $t_0$ is the phase onset, and $\tau$ is the time constant governing the speed of adjustment. Phase III is the steady state — or, when intensity exceeds critical power, the upward drift known as the slow component of $\dot{V}O_2$. Poole and Jones characterized this three-phase architecture in detail in their 2012 review in *Comprehensive Physiology*, which synthesizes decades of evidence on the control of oxidative metabolism during exercise (PMID 23798293).

## τ: the number that separates trained from untrained

The time constant $\tau$ is the time required for $\dot{V}O_2$ to reach 63% of its final Phase II response. In well-trained cyclists, $\tau$ typically falls between 20 and 30 seconds; in individuals with low cardiorespiratory fitness, values frequently exceed 45 seconds and can reach 60-70 seconds. Xu and Rhodes reviewed the literature in *Sports Medicine* in 1999 and documented that sustained aerobic training is the primary driver of τ reduction, through increased mitochondrial density, improved oxidative coupling, and enhanced oxygen delivery to the active muscle (PMID 10368878). The practical consequence is concrete: with $\tau$ = 25 s, a cyclist is operating at 95% of their target $\dot{V}O_2$ by 75 seconds into the effort; with $\tau$ = 45 s, the same 95% is not reached until 135 seconds — sixty additional seconds of work partially sustained by anaerobic metabolism.

<ChartLine
  title="VO₂ Kinetics: Trained vs. Untrained"
  caption="Schematic based on Poole & Jones, Comprehensive Physiology (2012). Values expressed as percentage of VO₂ demand covered by aerobic metabolism."
  data={[
    { x: "0 s", trained: 0, untrained: 0 },
    { x: "15 s", trained: 20, untrained: 15 },
    { x: "30 s", trained: 45, untrained: 28 },
    { x: "45 s", trained: 70, untrained: 49 },
    { x: "60 s", trained: 83, untrained: 63 },
    { x: "90 s", trained: 95, untrained: 81 },
    { x: "120 s", trained: 99, untrained: 90 },
    { x: "180 s", trained: 100, untrained: 97 }
  ]}
  xKey="x"
  lines={[
    { key: "trained", color: "#7C3AED", name: "Trained (τ ≈ 25 s)" },
    { key: "untrained", color: "#64748B", name: "Untrained (τ ≈ 45 s)" }
  ]}
  unit="%"
/>

## The slow component: efficiency that dissolves above threshold

At intensities within the heavy domain — between the lactate threshold and critical power — and especially in the severe domain, above critical power, $\dot{V}O_2$ does not stabilize at the end of Phase II: it continues rising slowly for several additional minutes. This phenomenon, the slow component of $\dot{V}O_2$, means that sustaining the same pedaling power requires progressively more oxygen, which is equivalent to a continuous decline in gross efficiency. The primary mechanism points to progressive recruitment of type II muscle fibers: as type I fibers fatigue, the central nervous system recruits reserve fibers that consume more ATP per unit of external work produced. Poole and Jones quantified in their 2012 review that the slow component can add up to 500-600 ml·min⁻¹ to $\dot{V}O_2$ during severe exercise (PMID 23798293) — equivalent to climbing a full step on the perceived exertion scale without any change at the pedal.

## Warm-up is not a ritual: it is physiology

A warm-up that includes at least one segment of moderate-to-high intensity — referred to in the literature as "priming exercise" — measurably reduces the oxygen deficit at the start of the main effort. Bailey et al. investigated the optimal dose of this pre-stimulus in the *Journal of Applied Physiology* in 2009, studying eight cyclists: they found that prior exercise at approximately 70% of the intensity range between the lactate threshold and $\dot{V}O_2$max, followed by 9 to 20 minutes of passive recovery, accelerated $\dot{V}O_2$ kinetics and improved tolerance to severe-intensity exercise by up to 30% (PMID 19797685). Insufficient recovery — just 3 minutes — negated the benefit and even impaired performance, because the metabolic debt from the warm-up effort still weighed on the start of the main bout. Proposed mechanisms include elevated muscle temperature, a residual elevation in baseline $\dot{V}O_2$ that reduces the step the system must climb, and possibly improved oxidative enzyme activation. Without adequate priming, the first 60-90 seconds of a high-intensity interval pass partly in debt, eroding W' reserves that will be needed when the race is decided.

## Short intervals and the kinetic advantage

When $\dot{V}O_2$ kinetics are fast and recoveries are short, $\dot{V}O_2$ does not drop fully between repetitions: each subsequent interval begins from an elevated level of oxygen consumption, minimizing the deficit and maximizing time at high aerobic stimulus. Rønnestad et al. compared in the *Scandinavian Journal of Medicine & Science in Sports* in 2015 the effect of ten weeks of short-interval training (13 × 30 s work / 15 s recovery) versus effort-matched long intervals in sixteen cyclists: the short-interval group improved $\dot{V}O_2$max by 8.7% compared to 2.6% in the long-interval group, with moderate-to-large effect sizes (PMID 24382021). In a subsequent 2020 study from the same group with elite cyclists — approximate $\dot{V}O_2$max of 73 ml·kg⁻¹·min⁻¹ — only three weeks of intervention were sufficient to demonstrate 4.7% improvements in the 20-minute test for short intervals, compared to −1.4% for long intervals (PMID 31977120). The physiological explanation ties directly to kinetics: 30/15 protocols keep cyclists near $\dot{V}O_2$max for a larger fraction of total session time precisely because the trained cyclist's fast kinetics means a 15-second recovery is insufficient for $\dot{V}O_2$ to return to baseline levels.

## What it means for cyclists outside the laboratory

VO₂ kinetics does not appear in a ride file or power meter report, but its effect is felt every time the group accelerates on a short climb, every time a race explodes in the opening kilometers, or every time an interval begins without adequate warm-up. Three practical conclusions are supported directly by the reviewed evidence. A warm-up with at least 10 minutes of moderate-to-high intensity followed by passive recovery is not wasted time before the main effort: it is the difference between starting with 70% or 90% of aerobic demand covered. Short intervals with incomplete recoveries are not "easier" than long intervals: they are a method for accumulating more time with $\dot{V}O_2$ elevated per session, precisely because trained kinetics keeps the aerobic system active between repetitions. And the reduction of τ with systematic aerobic training is one of the most consistently documented early adaptations, which explains why the perceived threshold of exertion drops so quickly at the start of a new training block. The $\dot{V}O_2$ ceiling dominates the conversation; the speed at which you reach it moves the results on every surge, every climb, and every race finish.
