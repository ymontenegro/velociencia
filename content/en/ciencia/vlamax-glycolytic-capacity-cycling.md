---
title: "VLamax: The Variable That Classifies Cyclists Before the Race Starts"
subtitle: "WorldTour teams measure the maximum lactate production rate because it defines whether a rider can win a sprint or a mountain stage. The science behind the number."
section: "ciencia"
date: "2026-04-24"
author: "Sofía Müller"
tags: ["VLamax", "physiology", "glycolysis", "lactate", "WorldTour", "VO2max", "training", "INSCYD"]
excerpt: "VLamax measures how much lactate the muscle can produce per second at maximum effort. A sprinter exceeds 0.7 mmol/L/s; a Grand Tour climber rarely surpasses 0.4. That single number reshapes how teams plan training and assign race roles."
coverImage: "https://images.unsplash.com/photo-1709601415546-dcd24c912e56?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "A Theory of the Metabolic Origin of 'Anaerobic Threshold' — Mader & Heck (1986)"
    url: "https://pubmed.ncbi.nlm.nih.gov/3744647/"
    type: pubmed
  - title: "Is the vLamax for Glycolysis What the VO2max is for Oxidative Phosphorylation? — Wackerhage et al. (2025)"
    url: "https://pubmed.ncbi.nlm.nih.gov/40676393/"
    type: pubmed
  - title: "VLamax Correlates Strongly With Glycolytic Performance — Clark & Macdermid (2025)"
    url: "https://pubmed.ncbi.nlm.nih.gov/40249379/"
    type: pubmed
  - title: "Reliability of the 15-s Maximal Lactate Accumulation Rate (VLamax) Test for Cycling — Harnish et al. (2023)"
    url: "https://doi.org/10.3390/physiologia3040040"
    type: doi
  - title: "INSCYD Physiological Software is Valid to Determine MLSS in Cyclists — Poffé et al. (2024)"
    url: "https://pubmed.ncbi.nlm.nih.gov/38774278/"
    type: pubmed
  - title: "Lactate Thresholds and the Simulation of Human Energy Metabolism — Frontiers in Physiology (2022)"
    url: "https://doi.org/10.3389/fphys.2022.899670"
    type: doi
  - title: "Reliability of Estimating Maximal Glycolytic Power Using VLamax: A Systematic Review — Fernandez Jarillo & Lomero-Arenas (2025)"
    url: "https://doi.org/10.47197/retos.v66.110040"
    type: doi
---

## The number that defines who can win what

A Grand Tour climber at the highest level presents a VLamax between 0.25 and 0.40 mmol/L/s. A pure road sprinter comfortably exceeds 0.70 mmol/L/s. That three-tenths difference in a unit most cyclists have never heard of separates the riders who decide flat stages on the Champs-Élysées from those who win on the Col de la Loze. WorldTour teams like Visma-Lease a Bike, UAE Team Emirates-XRG, and INEOS Grenadiers have incorporated VLamax measurement into their pre-season protocols precisely because that single value tells them, with one blood test and fifteen seconds of maximal effort, which type of race each rider in the roster can make a difference in.

VLamax (from the German *maximale Laktatbildungsrate*) is defined as the maximum rate at which skeletal muscle can produce lactate during a supramaximal effort of very short duration. The unit is millimoles of lactate per liter of blood per second (mmol/L/s). The value does not measure how much lactate accumulates during a long race, but how fast glycolysis can be ignited at full power. It is, by analogy, what VO₂max represents for the oxidative system: the ceiling capacity of the anaerobic glycolytic system.

## Mader's mathematical model, four decades on

Alois Mader, exercise physiologist at the University of Cologne, published in 1986 together with Hermann Heck the article that laid the mathematical foundations of this entire field. In *A Theory of the Metabolic Origin of "Anaerobic Threshold"* (Int. J. Sports Med., PMID 3744647), Mader described glycolysis as a system regulated primarily by phosphofructokinase (PFK), the key enzyme that activates the conversion of fructose-6-phosphate to fructose-1,6-bisphosphate. The model establishes that PFK responds sigmoidally to concentrations of ADP and AMP — products of ATP hydrolysis during exercise — which means that the rate of lactate production rises rapidly at the onset of maximal effort, peaks between 15 and 30 seconds, and then declines as muscle pH drops and the acidity itself inhibits PFK.

The simplified formula for the steady-state lactate balance according to Mader's model can be expressed as:

$$\dot{V}_{La_{eq}} = \frac{VLa_{max} \cdot \left(\frac{\dot{V}O_2}{\dot{V}O_{2max}}\right)^n}{1 + \left(\frac{\dot{V}O_2}{\dot{V}O_{2max}}\right)^n}$$

where $\dot{V}_{La_{eq}}$ is the rate of lactate production at equilibrium for a given intensity, $n$ is an empirical exponent (approximately 3, reflecting the sigmoidal kinetics of PFK), and the ratio $\dot{V}O_2 / \dot{V}O_{2max}$ represents the fraction of aerobic capacity being used. What this model predicts is that, at the same fraction of VO₂max, a cyclist with high VLamax produces far more lactate than one with low VLamax. That elevated lactate production depletes the pyruvate available for the mitochondria, which simultaneously suppresses fat oxidation and raises glycogen consumption.

Wackerhage, Kabasakalis, Seiler, and Heck published a 2025 review in *Sports Medicine* (PMID 40676393) that made this analogy explicit: if VO₂max is the ceiling of the aerobic system, VLamax is the ceiling of the glycolytic one. Neither operates in isolation. Real performance emerges from the interaction between both: the power a cyclist can sustain in steady state — the lactate threshold — is the point where the rate of lactate production (largely determined by VLamax) equals the rate of lactate clearance and oxidation (which depends on VO₂max and mitochondrial mass).

## How it is measured: fifteen seconds and a lactate meter

The VLamax test consists of a supramaximal effort of 10 to 20 seconds — typically 15 s — performed on an ergometer at constant cadence. The rider arrives at the test well rested, with a capillary baseline lactate sample taken at rest. Immediately after the sprint, blood samples are collected every minute for four to six minutes to identify the lactate peak. VLamax is calculated from the difference between peak lactate and baseline, divided by the effective glycolytic work time (total time minus the alactic phase of approximately 5-7 s corresponding to the creatine phosphate stage).

$$VLa_{max} = \frac{[La]_{peak} - [La]_{rest}}{t_{glycolytic}}$$

where $t_{glycolytic} = t_{sprint} - t_{alactic}$. The simplicity of the test is one of its main strengths: it only requires a cycle ergometer, a lancet, and a portable lactate analyzer. Harnish, Swensen, and King (2023) evaluated test reliability in 30 cyclists (18 men and 12 women) across two sessions one week apart, publishing their results in *Physiologia* (DOI: 10.3390/physiologia3040040). The coefficient of variation for sprint power was acceptable (~5%), but the VLamax itself was only moderately reliable (CV = 18.6%). The main sources of variation were baseline lactate (CV = 45.6%) and alactic time estimation (CV = 38.3%), both of which depend on rider preparation and protocol standardization. The systematic review by Fernandez Jarillo and Lomero-Arenas (2025) in *Retos* (DOI: 10.47197/retos.v66.110040) analyzed eight studies and found intraclass correlation coefficients between 0.66 and 0.96, a wide range reflecting that test reliability is highly sensitive to the rigor of the applied protocol.

<ChartBar
  title="Reference VLamax profiles by cyclist specialization"
  caption="Indicative values based on data published by INSCYD and WorldTour teams. Source: Weber (INSCYD) and applied literature."
  data={[
    { especialidad: "Pure sprinter", vlamax: 0.80 },
    { especialidad: "Classics/Puncheur", vlamax: 0.55 },
    { especialidad: "Breakaway/Rouleur", vlamax: 0.45 },
    { especialidad: "Climber/GC", vlamax: 0.32 },
    { especialidad: "Pure time trialist", vlamax: 0.28 }
  ]}
  xKey="especialidad"
  bars={[{ key: "vlamax", color: "#7C3AED", name: "VLamax (mmol/L/s)" }]}
  unit=" mmol/L/s"
  layout="vertical"
/>

## The software that popularized it: INSCYD

Sebastian Weber, the German coach who worked with Peter Sagan, Tony Martin, and Ivan Basso, developed the INSCYD system specifically to industrialize the application of Mader's model to competitive sport. The INSCYD protocol includes four maximal efforts of 20 s, 3 min, 6 min, and 10-12 min; the 20-second sprint is used to derive VLamax, while the longer efforts allow calculation of VO₂max and thresholds. With these six input values the software solves the system of equations from the Mader model and delivers a complete metabolic profile: fat oxidation rate at each intensity (FatMax), power at the lactate threshold equivalent to MLSS, carbohydrate consumption per hour, and VLamax.

Poffé, Van Dael, and Van Schuylenbergh (2024) validated this approach in a study with 22 cyclists (11 men, 11 women), published in *Frontiers in Sports and Active Living* (PMID 38774278). The Pearson correlation between experimentally measured MLSS and INSCYD-calculated MLSS was r = 0.992 (p < 0.001) for the full sample. The mean difference was 4.6 W in men, within the typical error of experimental MLSS estimations. The authors concluded that the software can replace laborious step-incremental MLSS tests, provided the VLamax and VO₂max measurement protocol is rigorous. The main limitation of the study is its small sample size and the absence of first-tier elite athletes among participants.

## What the VLamax/VO₂max ratio reveals about a rider's role

The interaction between VLamax and VO₂max determines three distinct capacities that road cycling demands at different moments. A Grand Tour climber needs a very high VO₂max and a low VLamax to pedal at a high fraction of their VO₂max for hours without progressively accumulating lactate. A sprinter needs the highest possible VLamax to generate brutal anaerobic peak power in the final 200 meters, even though that same high value guarantees rapid glycogen depletion if they try to hold a breakaway for 20 minutes. A puncheur — a classics rider at Flanders or Liège — lives in the middle ground: enough VLamax to explode on the Mur de Huy, but not so much as to burn through glycogen three hours before the finish.

Clark and Macdermid (2025) quantified the relationship between VLamax and glycolytic performance in 11 national-to-international level cyclists (mean VO₂max 70.7 ± 5.9 mL/kg/min) in *Research Quarterly for Exercise and Sport* (PMID 40249379). They found correlations of r = 0.83 (p = 0.002) between VLamax and absolute mean power in the 15-s sprint, and r = 0.88 (p = 0.0004) for relative mean power. The correlation weakened but remained significant in one-minute maximal efforts. The study, with its small sample, confirms that VLamax predicts short glycolytic performance well, though the authors note the metric offers limited additional information over simply using peak sprint power alone.

<ChartLine
  title="Relationship between VLamax and lactate threshold (% VO₂max)"
  caption="Simulation based on the Mader-Heck model. Shows how high VLamax shifts the threshold toward lower fractions of VO₂max."
  data={[
    { vlamax: "0.20", umbral_pct: 88 },
    { vlamax: "0.30", umbral_pct: 84 },
    { vlamax: "0.40", umbral_pct: 79 },
    { vlamax: "0.50", umbral_pct: 74 },
    { vlamax: "0.60", umbral_pct: 68 },
    { vlamax: "0.70", umbral_pct: 62 },
    { vlamax: "0.80", umbral_pct: 56 }
  ]}
  xKey="vlamax"
  lines={[
    { key: "umbral_pct", color: "#7C3AED", name: "Lactate threshold (% VO₂max)" }
  ]}
  unit="%"
/>

## How training modifies VLamax

VLamax is not fixed. Unlike VO₂max, which responds more slowly to training stimuli over the long term, VLamax can be modified within weeks with the right stimuli, though direct evidence from controlled trials remains sparse. The proposed mechanism for reducing it involves increasing mitochondrial oxidative capacity: more mitochondria means greater capacity to oxidize pyruvate rather than converting it to lactate, which reduces the net rate of lactate accumulation even when glycolysis is working at high intensity. Zone 2 training — sustained low-intensity pedaling for 60-180 minutes per session — is the stimulus that WorldTour coaches associate with a progressive reduction in VLamax across the pre-season.

To raise VLamax, the physiological logic points in the opposite direction: stimuli that repeatedly activate the glycolytic pathway at maximum power are needed. Repeated sprints of 10-20 seconds with full recovery, supramaximal efforts with high oxygen debt, and maximal leg strength work are the methods with the greatest effect on glycolytic enzyme density — particularly PFK activity and glycogen phosphorylase. The risk for an endurance cyclist who incorporates too much high-intensity work without sufficient aerobic base is shifting VLamax upward, which raises the floor of lactate production at all intensities and compresses the threshold downward, degrading exactly the metric that matters most for sustained performance over long distances.

## Practical application for the average cyclist

VLamax is not exclusively a tool for teams with 30-million-euro budgets. A quality lactate analyzer costs under 500 euros and tests can be performed on any smart trainer with power measurement. Protocol matters more than equipment. The rider must arrive with at least 48 hours without intense work, must standardize prior caffeine and food intake, and must ensure baseline lactate is below 1.5 mmol/L before starting the sprint. Interpreting results requires repeating the test twice under the same conditions to establish confidence in the value, given the coefficient of variation described by Harnish et al. A single result carries enough margin of error to produce misleading profiles.

From a training standpoint, knowing one's own VLamax allows specific questions to be answered. If a cyclist has a VLamax of 0.55 and a VO₂max of 68 mL/kg/min, Mader's model predicts their lactate threshold sits around 70-73% of VO₂max. If that same cyclist reduces their VLamax to 0.40 while maintaining VO₂max constant — achievable with a twelve-week block of low-zone volume — the model predicts a threshold shifted toward 78-80% of VO₂max. That five-to-eight percentage point improvement in the relative threshold can translate into 25-40 additional watts of sustainable power on a long climb with no change whatsoever to the aerobic engine.

## The limitations science has not yet resolved

VLamax has enthusiastic advocates and legitimate critics within exercise physiology. The main critical argument is that the 15-second test captures the rate of lactate accumulation in peripheral blood, not directly intramuscular glycolytic flux. Between these two quantities there are intermediate steps — lactate transport out of the muscle cell, equilibration with the bloodstream, distribution kinetics — that introduce uncontrolled variability. Additionally, the cadence chosen for the sprint affects the resulting value: at higher cadences, oxygen demand per watt increases and the lactate peak can be underestimated if the protocol is not adjusted accordingly. The paper by Wackerhage et al. (2025) argues that VLamax still lacks sufficient validation as a precise estimator of glycolytic flux, while concluding it remains the best accessible field-based tool for approximating that parameter.

Sample size is another recurring limitation across available studies. Almost none exceeds 25 participants, and data from first-tier WorldTour elite cyclists is scarce in the open literature because teams do not publish their internal data. The figure of coaches with access to these values — such as Mathieu Heijboer at Visma-Lease a Bike, who has spoken publicly about using VLamax across his roster — signals a practical adoption that outpaces formal scientific validation. This is not an unusual situation in high-performance cycling, where applied science tends to advance faster than controlled trials.

## Why teams can no longer ignore it

VLamax has moved from laboratory concept to rider-selection tool because it answers a question that VO₂max alone cannot: given that this rider has an aerobic engine of a certain size, what types of efforts can they perform repeatedly without destroying their capacity to recover for the following day? A rider with a VO₂max of 80 mL/kg/min and VLamax of 0.65 can win reduced-bunch sprints but cannot climb Alpe d'Huez at the front of the race. That same VO₂max with VLamax of 0.30 produces a pure climber profile who runs dry before covering the final 200 meters of a sprint. The ratio between the two is not a quality verdict; it is a map of physiological specialization.

For the amateur cyclist training with a power meter, knowing their own VLamax adds a dimension that power data alone cannot provide. Understanding whether the limitation on a long climb comes from a low VO₂max or a high VLamax compressing the threshold directs training toward very different stimuli. It is not a metric to monitor every month, but one measurement at the start of the season and another at the end of a volume block can quantify whether the aerobic base built has shifted the metabolic profile in the intended direction.
