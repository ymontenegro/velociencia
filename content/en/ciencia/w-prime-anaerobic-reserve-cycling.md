---
title: "W': The Anaerobic Reserve That Decides Race Attacks"
subtitle: "The Critical Power model divides effort into two zones: what the aerobic system can sustain indefinitely, and the anaerobic energy battery that depletes with every acceleration. Understanding W' changes how you read races — and how you train."
section: "ciencia"
date: "2026-05-11"
author: "Sofía Müller"
tags: ["W prime", "critical power", "physiology", "anaerobic work capacity", "W balance", "road cycling", "HIIT", "power"]
excerpt: "W' (W-prime) is the finite anaerobic work capacity available above Critical Power. In trained cyclists it ranges from 10 to 30 kJ, depletes with every attack, and partially recharges during recovery. Knowing your W' lets you plan how many counter-attacks you can deliver before blowing up."
coverImage: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "Determination of critical power using a 3-min all-out cycling test — Vanhatalo, Doust, Burnley (2007)"
    url: "https://pubmed.ncbi.nlm.nih.gov/17473782/"
    type: pubmed
  - title: "A 3-min all-out cycling test is sensitive to a change in critical power — Vanhatalo, Doust, Burnley (2008)"
    url: "https://pubmed.ncbi.nlm.nih.gov/18685519/"
    type: pubmed
  - title: "Critical power: implications for determination of VO2max and exercise tolerance — Jones, Vanhatalo, Burnley, Morton, Poole (2010)"
    url: "https://pubmed.ncbi.nlm.nih.gov/20195180/"
    type: pubmed
  - title: "Modeling the expenditure and reconstitution of work capacity above critical power — Skiba, Chidnok, Vanhatalo, Jones (2012)"
    url: "https://pubmed.ncbi.nlm.nih.gov/22382171/"
    type: pubmed
  - title: "Validation of a novel intermittent W' model for cycling using field data — Skiba, Clarke, Vanhatalo, Jones (2014)"
    url: "https://pubmed.ncbi.nlm.nih.gov/24509723/"
    type: pubmed
  - title: "Critical Power: An Important Fatigue Threshold in Exercise Physiology — Poole, Burnley, Vanhatalo, Rossiter, Jones (2016)"
    url: "https://pubmed.ncbi.nlm.nih.gov/27031742/"
    type: pubmed
  - title: "Power-duration relationship: Physiology, fatigue, and the limits of human performance — Burnley & Jones (2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/27806677/"
    type: pubmed
  - title: "The W' Balance Model: Mathematical and Methodological Considerations — Skiba & Clarke (2021)"
    url: "https://pubmed.ncbi.nlm.nih.gov/34686611/"
    type: pubmed
translationOf: "reserva-anaerobica-w-prima-ciclismo"
---

## The line between sustainable and exhausting

There is a power output above which no cyclist can pedal indefinitely. That boundary is called Critical Power (CP) and represents the maximum rate of energy production the aerobic system can sustain in metabolic steady state. Below it, the body can work for hours without progressive fatigue. Above it, every additional watt consumes a finite anaerobic work reserve called W' (W-prime), and once that reserve is gone, the rider blows up. Burnley and Jones described this framework in their 2018 review in the *European Journal of Sport Science* (PMID 27806677) as the most conserved physiological structure across species and exercise modalities: the power-duration hyperbola that Hermann Monod and Jean Scherrer first identified in 1965 remains the best mathematical description of the limits of human performance.

The classic equation of the model is:

$$t = \frac{W'}{P - CP}$$

where $t$ is the time to exhaustion, $P$ is the applied power, and $W'$ is the anaerobic reserve in joules. This hyperbolic relationship has a direct practical implication: the greater the difference between effort power and CP, the faster W' depletes. An attack at 500 W above a CP of 300 W depletes W' twice as fast as an effort of 400 W above the same CP. Poole, Burnley, Vanhatalo, Rossiter and Jones (2016) synthesized decades of evidence in *Medicine & Science in Sports & Exercise* (PMID 27031742), concluding that CP sits near the maximal lactate steady state, while W' reflects the work capacity derived from anaerobic sources and the slow component of VO₂ that emerges in the severe-intensity domain.

## What W' contains and why it depletes

W' is not a purely anaerobic energy tank, although it was described that way for decades. Jones, Vanhatalo, Burnley, Morton and Poole (2010) in *MSSE* (PMID 20195180) clarified that W' represents the work capacity above CP derived from a combination of intramuscular substrates — primarily phosphocreatine (PCr) and glycogen — alongside the progressive accumulation of fatigue-related metabolites such as lactate, ADP, inorganic phosphate and H⁺. When power exceeds CP, the slow component of VO₂ drifts toward VO₂max and anaerobic contribution becomes mandatory to cover the gap between energy demand and what the oxidative system can deliver. At that point, exhausting W' is equivalent to reaching VO₂max, depleting intramuscular glycogen, or accumulating enough acidity to impair muscle contraction — whichever limiting factor arrives first.

In trained cyclists, published W' values range from 10 to 30 kJ, with a mean near 18-22 kJ in regional-level riders. To put this in context: a cyclist with a W' of 20 kJ attacking at 150 W above their CP has roughly 133 seconds at that intensity before the reserve is gone. If the attack is 300 W above CP, that drops to 67 seconds. W' does not discriminate: it depletes equally per watt·second whether the effort is a 10-second sprint at peak power or a 4-minute breakaway at high intensity.

<ChartLine
  title="Time to exhaustion vs. power above CP (W' model)"
  caption="Simulation for W' = 20 kJ. The greater the gap between applied power and CP, the less time available."
  data={[
    { delta: "50 W", tiempo: 400 },
    { delta: "100 W", tiempo: 200 },
    { delta: "150 W", tiempo: 133 },
    { delta: "200 W", tiempo: 100 },
    { delta: "300 W", tiempo: 67 },
    { delta: "400 W", tiempo: 50 },
    { delta: "500 W", tiempo: 40 }
  ]}
  xKey="delta"
  lines={[
    { key: "tiempo", color: "#7C3AED", name: "Seconds to exhaustion" }
  ]}
  unit=" s"
/>

## How it is measured: the 3-minute all-out test

The standard protocol to estimate both CP and W' in a single session is the *3-minute all-out test* (3MT), developed by Vanhatalo, Doust and Burnley in 2007 and published in *MSSE* (PMID 17473782). The rider performs a maximal effort for exactly three minutes on a cycle ergometer at a fixed resistance calculated from a prior incremental test. The physiological rationale is that in three minutes at maximum power, W' is almost fully exhausted, so the power output at the end of the test — called *end-power* (EP) — represents the level at which energy derives almost entirely from the aerobic system, that is, the CP. The total work performed above EP during the three minutes is the W' estimate. The same group published in 2008 in *MSSE* (PMID 18685519) that the 3MT is sensitive to real changes in CP after high-intensity training blocks, detecting differences of 15-25 W following four weeks of HIIT.

The traditional alternative involves three to five maximum-effort bouts of fixed duration on separate days (typically 2, 5, 8 and 12 minutes), recording mean power for each, then fitting the hyperbolic model to the power-time pairs. This method provides better individual precision but requires several days of recovery between sessions. The 3MT trades some precision (±5-10% in W') for single-session execution, making it the standard field protocol. Training platforms such as TrainingPeaks, WKO and Xert implement continuous CP and W' estimates from a rider's historical power data, using maximal mean power values across multiple durations.

## W' balance: the battery in real time

The most practical application of the W' model in road cycling is the concept of *W' balance* (W'bal), which estimates how much anaerobic reserve a rider has left at any moment in a race. Skiba, Chidnok, Vanhatalo and Jones published the mathematical model in *MSSE* in 2012 (PMID 22382171), and its field validation in *IJSPP* in 2014 (PMID 24509723). The principle is straightforward: every second above CP consumes a fraction of W' proportional to intensity; every second below CP recharges W' following an exponential kinetics whose time constant ($\tau_{W'}$) depends on the gap between CP and recovery power.

$$W'_{bal}(t) = W' - \int_0^t \max(0, P(u) - CP) \, du + \text{reconstitution}(t)$$

Skiba and Clarke (2021) in *IJSPP* (PMID 34686611) refined the model by showing that reconstitution rate varies with prior depletion level and recovery power, which explains why a rider can chain three consecutive attacks with brief recoveries but cannot repeat a fourth at the same power: W' does not recharge linearly. Partial recovery enables successive efforts but each one is shorter as the preceding attacks leave the reserve less fully replenished. One minute of pedaling below CP at 50 W restores less W' than that same minute at 200 W below CP, because the gap between recovery power and CP is larger.

<ChartBar
  title="W' values by cyclist level (literature reference)"
  caption="Indicative values compiled from published studies. CP varies more between levels than W' does."
  data={[
    { nivel: "Recreational", wprime: 12 },
    { nivel: "Trained amateur", wprime: 18 },
    { nivel: "Regional competitor", wprime: 22 },
    { nivel: "National elite", wprime: 25 },
    { nivel: "WorldTour pro", wprime: 28 }
  ]}
  xKey="nivel"
  bars={[{ key: "wprime", color: "#7C3AED", name: "W' estimate (kJ)" }]}
  unit=" kJ"
  layout="vertical"
/>

## The difference between CP, FTP and VO₂max

The three values describe distinct and complementary aspects of aerobic capacity. VO₂max is the maximum rate of oxygen consumption — the absolute ceiling of the aerobic system. CP is the maximum sustainable power in metabolic steady state, sitting between lactate threshold 2 and VO₂max, typically at 85-95% of VO₂max in trained cyclists. FTP (Functional Threshold Power), commonly defined as the maximum power sustainable for one hour, is a field estimate of the functional lactate threshold and sits systematically 5-10% below CP, though the gap varies with a rider's anaerobic profile. A rider with high anaerobic capacity tends to overestimate their FTP on the standard 20-minute test because their W' inflates mean power in that effort beyond what they could sustain for 60 minutes. W' itself is independent of all three metrics and can be high or low with any combination of CP and VO₂max.

The practical interplay between the three metrics defines rider type. Two riders with identical CP of 300 W may have W' of 12 kJ and 28 kJ respectively: the first will crack with the first hard attack but recovers reasonably well, while the second can respond to multiple accelerations and deliver multi-minute finishing surges. W' does not determine who is stronger at threshold — it determines who has more ammunition for the rhythm game of a race with repeated attacks.

## W' in racing: attacks, counter-attacks and tactical management

In road cycling, W' determines how many times and at what power a rider can attack before permanently blowing up. A climber with CP of 370 W and W' of 18 kJ has very different tactical options than a puncheur with CP of 320 W and W' of 28 kJ in an Ardennes classic. The climber can sustain higher intensities on the long climb, but the puncheur can attack four or five times in the final kilometer at 700-900 W without exhausting their W' as quickly in relative terms. Real-time W'bal — which platforms like Xert calculate during effort — gives a rider visibility of how much reserve they have before attacking, information equivalent to a battery level indicator that road racers rarely have available but team data analysts can estimate from the team car.

The model also explains the "big puncher who cracks on medium efforts" phenomenon: a rider who forces too many efforts above their CP during the first hour of a mountain stage arrives at the final climb with W' so depleted they cannot respond when the favorites accelerate. It is not that their aerobic engine has failed — their CP is unchanged — it is that they have spent the anaerobic battery they would need to shift gears at the right moment.

## How W' is trained and how it grows

W' responds to different training stimuli than those that improve CP. While CP increases through high-volume zone 2 work and threshold training (mitochondrial adaptations, capillary density), W' is trained primarily with short supramaximal intervals: sets of 20-40 seconds at 130-150% of CP, repeated sprints, and efforts between 1 and 4 minutes with full recovery. These stimuli overload the phosphocreatine and glycolytic pathways, promoting enzymatic adaptations and increasing the muscle's buffering capacity to tolerate metabolic acidosis. High-intensity intermittent training in 4-6 week blocks can increase W' by 10-20% in trained cyclists without prior supramaximal work history, although individual response varies considerably.

The strategy for improving racing performance does not always call for maximizing W'. A Grand Tour climber does not need 30 kJ of W'; with 15-18 kJ well managed and a very high CP, they can respond to the attacks that matter. For that rider, investing training time in supramaximal power stimuli may actually raise VLamax (lactate production rate), compressing the lactate threshold and hurting performance on long climbs. W' as a training target makes sense when the race profile demands multiple pace changes — one-day classics, criteriums, or mountain stages with explosive attackers.

## What the model still does not capture

The critical power model is powerful but has documented limitations. CP is not perfectly constant: it varies with glycogen status, temperature, accumulated fatigue from prior days, and hydration. In heat conditions, CP decreases and W' depletes faster because part of the oxidative capacity is diverted to thermoregulation. Studies in hot environments have shown CP reductions of up to 15-20 W compared to neutral conditions. Furthermore, W' does not deplete in a perfectly linear fashion above CP: at very high powers near VO₂max, exhaustion may occur sooner than the model predicts because peripheral muscle fatigue mechanisms intensify non-linearly. Skiba and Clarke (2021) acknowledged these limitations and proposed refinements to the W' reconstitution model that improve accuracy in real-world intermittent exercise scenarios such as those encountered in racing on variable terrain.

For any cyclist training with a power meter, CP and W' are two parameters worth measuring at the start of the season and after each training block targeting them. No laboratory is required: the 3MT can be executed on an indoor trainer with any device that measures power accurately. A 10 W increase in CP with W' unchanged means a higher aerobic threshold. A 5 kJ increase in W' with stable CP means more ammunition for the key moments of a race. Both are progress toward different goals, and distinguishing between them is the first step toward training with genuine intent.
