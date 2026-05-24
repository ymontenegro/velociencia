---
title: "CTL, ATL and TSB: how to read training load without becoming obsessed with numbers"
subtitle: "Banister's impulse-response model is over fifty years old. What these metrics actually measure, what they don't, and why the most important number is always how you feel"
section: "entrenamiento"
date: "2026-05-24"
author: "Tomás Herrera"
tags: ["training load", "CTL", "ATL", "TSB", "Performance Management Chart", "TRIMP", "TSS", "periodization"]
sources:
  - title: "Busso T, Candau R, Lacour JR. Fatigue and fitness modelled from the effects of training on performance. Eur J Appl Physiol Occup Physiol. 1994;69(1):50-4."
    url: "https://pubmed.ncbi.nlm.nih.gov/7957156/"
    type: pubmed
  - title: "Foster C. Monitoring training in athletes with reference to overtraining syndrome. Med Sci Sports Exerc. 1998;30(7):1164-8."
    url: "https://pubmed.ncbi.nlm.nih.gov/9662690/"
    type: pubmed
  - title: "Busso T. Variable dose-response relationship between exercise training and performance. Med Sci Sports Exerc. 2003;35(7):1188-95."
    url: "https://pubmed.ncbi.nlm.nih.gov/12840641/"
    type: pubmed
  - title: "Gabbett TJ. The training-injury prevention paradox: should athletes be training smarter and harder? Br J Sports Med. 2016;50(5):273-80."
    url: "https://pubmed.ncbi.nlm.nih.gov/26758673/"
    type: pubmed
  - title: "Bourdon PC, Cardinale M, Murray A, et al. Monitoring Athlete Training Loads: Consensus Statement. Int J Sports Physiol Perform. 2017;12(Suppl 2):S2161-S2170."
    url: "https://pubmed.ncbi.nlm.nih.gov/28463642/"
    type: pubmed
  - title: "Impellizzeri FM, Tenan MS, Kempton T, Novak A, Coutts AJ. Acute:Chronic Workload Ratio: Conceptual Issues and Fundamental Pitfalls. Int J Sports Physiol Perform. 2020;15(6):907-913."
    url: "https://pubmed.ncbi.nlm.nih.gov/32502973/"
    type: pubmed
  - title: "Coggan A. The Science of the TrainingPeaks Performance Manager. TrainingPeaks Blog, 2003 (rev. 2019)."
    url: "https://www.trainingpeaks.com/learn/articles/the-science-of-the-performance-manager/"
    type: web
excerpt: "The Performance Management Chart — CTL, ATL and TSB — is the practical translation of Banister's impulse-response model (1975). Fifty years on, the evidence confirms its utility as a planning compass, but also its limits: these are averages of averages that capture external load, not real physiological stress. This article explains the math, validated ranges and the most common errors in interpretation."
coverImage: "https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## The model that has lasted fifty years

In 1975, Eric Banister and his colleagues published in the *Australian Journal of Sports Medicine* a proposal that looked more like control engineering than exercise physiology: model human performance as the difference between two opposing exponential signals. The first represented the positive adaptation to training — what we now call fitness or chronic load. The second represented accumulated fatigue. Performance, according to the model, was simply adaptation minus fatigue at any given moment in time. Banister called the method the "impulse-response model," and its formula, though refined several times, remains the mathematical foundation of the Performance Management Chart that appears in TrainingPeaks, WKO, Garmin Connect and dozens of training applications.

Busso, Candau and Lacour published in 1994 in the *European Journal of Applied Physiology* one of the first quantitative validations of the model applied to real-world data from a hammer thrower across an entire season. Their results showed that the correlation between the model's predicted performance and actual performance reached r = 0.96 with only nineteen observations (PMID 7957156). The fit was strong, but the small sample already hinted at a problem that persists today: the model is mathematically elegant and useful as a conceptual framework, but its parameters are individual, time-variable and dependent on how the training "impulse" is quantified in the first place.

## From TRIMP to TSS: measuring the stress of a session

Banister's model needs an input: a unit that quantifies how much stress each session represents. Banister proposed TRIMP (*Training Impulse*), calculated as session duration multiplied by a weighted heart rate factor. The goal was to capture both volume and intensity in a single number. For a three-hour Zone 2 ride (55-75% of FTP in power terms), TRIMP is relatively low. For a forty-minute interval session with efforts in Zone 5 (106-120% of FTP), TRIMP spikes sharply because of the weight the formula assigns to elevated heart rates. TRIMP is a measure of internal load — it reflects the body's physiological response — and it appears in dozens of peer-reviewed studies.

TSS (*Training Stress Score*) is a more recent derivation, developed by Andrew Coggan and popularized by TrainingPeaks. Unlike TRIMP, TSS is built from power: one hour at functional threshold power (FTP, Zone 4, 91-105% of FTP) equals 100 TSS points. The formula is $TSS = \frac{t \cdot NP \cdot IF}{FTP \cdot 3600} \times 100$, where $NP$ is normalized power, $IF$ is intensity factor and $t$ is duration in seconds. It is important to clarify that TSS is not a peer-reviewed metric in the traditional academic sense: it is a proprietary TrainingPeaks construct, widely adopted and useful, but whose relationship to real physiological stress depends on having an accurate FTP and on power being the primary limiter of the session. For technical riding, strength work or sessions in extreme heat, TSS can significantly underestimate actual physiological load.

## The math behind the Performance Management Chart

With a daily load measure in hand — whether TRIMP, TSS or another load metric — the Performance Management Chart applies two exponential moving averages with different time constants. CTL (*Chronic Training Load*) is the exponential moving average over the past 42 days. ATL (*Acute Training Load*) is the exponential moving average over the past 7 days. TSB (*Training Stress Balance*) is simply the difference: $TSB = CTL - ATL$.

The 42-day constant for CTL reflects the approximate time frame over which positive physiological adaptations to endurance training — changes in mitochondrial volume, capillary density and movement economy — accumulate and stabilize, following Banister's conceptual framework. The 7 days of ATL represent the temporal window over which acute fatigue from a high load continues to noticeably affect performance. Both constants are conceptual estimates, not values derived from a specific clinical study: Coggan himself acknowledges this in the TrainingPeaks documentation. Busso (2003), in *Medicine & Science in Sports & Exercise*, showed mathematically that optimal time constants vary between individuals and between training periods (PMID 12840641), which limits the universal applicability of the fixed 42- and 7-day constants.

When ATL exceeds CTL, TSB is negative: the cyclist is more fatigued than adapted. When CTL exceeds ATL — typically after a recovery period or taper — TSB is positive: the athlete is rested and form should be good. In practice, a TSB between −10 and −30 is normal during loading blocks. A TSB between +5 and +25 on race day is the target of a well-executed taper.

<ChartLine
  title="CTL, ATL and TSB across a 12-week training block"
  caption="Illustrative Performance Management Chart: load building (weeks 1-10) and tapering (weeks 11-12). Values in TSS/day units."
  data={[
    { x: "Wk 1", ctl: 62, atl: 70, tsb: -8 },
    { x: "Wk 2", ctl: 65, atl: 78, tsb: -13 },
    { x: "Wk 3", ctl: 68, atl: 85, tsb: -17 },
    { x: "Wk 4", ctl: 65, atl: 55, tsb: 10 },
    { x: "Wk 5", ctl: 68, atl: 75, tsb: -7 },
    { x: "Wk 6", ctl: 72, atl: 88, tsb: -16 },
    { x: "Wk 7", ctl: 76, atl: 95, tsb: -19 },
    { x: "Wk 8", ctl: 73, atl: 58, tsb: 15 },
    { x: "Wk 9", ctl: 78, atl: 90, tsb: -12 },
    { x: "Wk 10", ctl: 82, atl: 100, tsb: -18 },
    { x: "Wk 11", ctl: 79, atl: 68, tsb: 11 },
    { x: "Wk 12", ctl: 76, atl: 55, tsb: 21 }
  ]}
  xKey="x"
  lines={[
    { key: "ctl", color: "#0891B2", name: "CTL (fitness)" },
    { key: "atl", color: "#E11D48", name: "ATL (fatigue)" },
    { key: "tsb", color: "#64748B", name: "TSB (form)" }
  ]}
  unit=""
/>

## CTL ramp rate: how much is too much

CTL rises slowly, exactly as real fitness does. A cyclist who starts a season with a CTL of 40 TSS/day cannot reach 80 in three weeks without consequences. The recommended weekly increase rate — known in TrainingPeaks terminology as "ramp rate" — typically falls between 3 and 8 CTL points per week for intermediate and advanced cyclists. Sustaining a ramp rate above 8 points per week for several consecutive weeks is associated with difficult-to-manage accumulated fatigue, higher overuse injury risk and, paradoxically, performance stagnation. For beginners or athletes returning from injury, the reasonable figure is 2 to 5 points per week.

The logic of the recovery week — a concept as old as systematic training — has a direct expression in the PMC. Inserting a load-reduction week every three or four building weeks allows ATL to drop, lets TSB recover towards less negative values and prevents CTL from decaying excessively. Foster (1998) showed in *Medicine & Science in Sports & Exercise* that training monotony — repeating very similar weeks without undulation — is as harmful as acute overload, and that the "training strain" index (load × monotony) significantly predicted the incidence of illness and minor infections in endurance athletes (PMID 9662690). The PMC, used well, visualizes that undulation: CTL rises in steps, not a straight line.

## Positive TSB: the form window before a race

When the days before a season goal approach, the task is to reduce ATL faster than CTL drops. The result is a TSB that crosses from negative to positive during tapering. Bourdon and colleagues (2017) in the *International Journal of Sports Physiology and Performance* — a consensus of more than twenty international experts — noted that individualizing responses to load is one of the most important methodological challenges in athlete monitoring, precisely because "optimal" TSB ranges for race day vary according to training history, discipline and event duration (PMID 28463642).

Practical experience — mine as a racer, and that of coaches I have worked with — suggests that a TSB between +5 and +20 on race day produces consistent results for amateur cyclists with CTL between 60 and 100. Values above +25 may indicate excessive detraining: CTL has dropped too far and the athlete arrives fresh but de-adapted. Values below 0 on race day typically reflect insufficient tapering or an overly aggressive loading block in the final two weeks. These ranges are guidelines, not clinical thresholds.

## The ACWR and the paradox that undermines the safe zones

The acute:chronic workload ratio (ACWR) is a conceptually related variant of the PMC: it is calculated as ATL ÷ CTL. Gabbett (2016) published in the *British Journal of Sports Medicine* an influential review — more than 2,000 citations — proposing that an ACWR between 0.8 and 1.3 constitutes a "sweet spot" of low injury risk, while values above 1.5 would multiply risk substantially (PMID 26758673). The paradox that gives the paper its name is that better-trained athletes — with higher chronic load — tolerate peaks of acute load better than less-prepared athletes: training a lot protects, to a point, against the damaging effects of a sudden load spike.

However, the ACWR framework has received serious methodological criticism worth knowing before applying it as if it were a law. Impellizzeri and colleagues (2020) in the *International Journal of Sports Physiology and Performance* identified a fundamental statistical problem: the denominator (ATL, chronic load) arithmetically contains the numerator (acute ATL), which generates spurious autocorrelations that distort injury associations (PMID 32502973). In other words: part of the association between elevated ACWR and higher injury risk may be a mathematical artifact, not a real causal relationship. This does not invalidate the heuristic value of the concept — sudden load spikes remain a reasonable warning signal — but it should prevent any coach or athlete from treating the 0.8, 1.3 or 1.5 thresholds as precise boundaries.

## External load vs. internal load: the limitation the PMC cannot solve

TSS measures watts and time: it is external load, what the cyclist produces. It does not measure what that load costs the body on a specific day, which depends on the previous night's sleep, hydration status, an emerging cold, accumulated work stress or whether the athlete flew across time zones the day before. Two sessions with identical TSS can represent completely different physiological stresses depending on the athlete's state. The PMC, by construction, is blind to this internal variability. This is why researchers working with load monitoring consistently emphasize combining external metrics like TSS with internal load indicators: session RPE (perceived effort on the Borg scale multiplied by duration, a method validated by Foster in 1998), heart rate variability (HRV) and sleep quality.

Bourdon and colleagues (2017) emphasized in their consensus statement that combining external and internal indicators — together with daily subjective well-being monitoring — is the approach with the strongest support for practical athlete monitoring. A CTL of 90 does not tell you whether you are overtraining. A CTL of 90 combined with a persistently depressed HRV, two weeks of fragmented sleep and the sensation of concrete legs for ten days does.

## How to use these metrics without letting them control you

The Performance Management Chart is a navigation tool, not an arbiter. It is useful for visualizing the general direction of a season, identifying weeks where load spiked excessively, verifying that tapering is working mathematically and having more precise conversations with a coach. It is not useful for deciding whether a specific session was hard enough, for comparing your CTL with another cyclist's as if it were a capability score, or for ignoring persistent fatigue signals because "TSB is still negative and that's normal."

The most useful version of the PMC is one where the athlete understands what it measures and what it does not, and uses it as one reference among several — alongside a training diary, benchmark session results and self-awareness. Banister proposed in 1975 a mathematical model of the human athlete. Fifty years later, the model still stands, limitations and all, because it captures something true about how we work: fitness takes time to build, fatigue arrives quickly and form is the difference between the two. Everything else is parameters.