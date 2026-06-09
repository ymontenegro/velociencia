---
title: "FatMax: The Intensity Where Muscle Burns the Most Fat"
subtitle: "There is a precise point on the intensity curve where fat oxidation peaks. That point — FatMax — is neither rest nor maximum effort, but a moderate zone that training can shift to higher intensities. Understanding it changes how base training is planned."
section: "ciencia"
date: "2026-05-13"
author: "Sofía Müller"
tags: ["FatMax", "fat oxidation", "zone 2", "indirect calorimetry", "MFO", "metabolism", "aerobic training", "durability"]
excerpt: "FatMax is the exercise intensity at which fat oxidation rate reaches its peak (MFO). In trained cyclists, this intensity corresponds to 59-64% of VO₂max and yields between 0.5 and 1.0 g/min of lipid oxidation. Aerobic training and diet can shift that peak to higher intensities, improving metabolic efficiency and race durability."
coverImage: "https://images.unsplash.com/photo-1661804037884-fa0fc4b19964?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
sources:
  - title: "Determination of the exercise intensity that elicits maximal fat oxidation — Achten, Gleeson, Jeukendrup (2002)"
    url: "https://pubmed.ncbi.nlm.nih.gov/11782653/"
    type: pubmed
  - title: "Maximal fat oxidation during exercise in trained men — Achten & Jeukendrup (2003)"
    url: "https://pubmed.ncbi.nlm.nih.gov/14598198/"
    type: pubmed
  - title: "Optimizing fat oxidation through exercise and diet — Achten & Jeukendrup (2004)"
    url: "https://pubmed.ncbi.nlm.nih.gov/15212756/"
    type: pubmed
  - title: "Determinants of fat oxidation during exercise in healthy men and women — Venables, Achten, Jeukendrup (2005)"
    url: "https://pubmed.ncbi.nlm.nih.gov/15333616/"
    type: pubmed
  - title: "Assessment of Metabolic Flexibility by Means of Measuring Blood Lactate, Fat, and Carbohydrate Oxidation — San-Millán & Brooks (2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/28623613/"
    type: pubmed
  - title: "Contextualising Maximal Fat Oxidation During Exercise: Determinants and Normative Values — Maunder, Plews, Kilding (2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/29875697/"
    type: pubmed
  - title: "Peak fat oxidation is positively associated with vastus lateralis CD36 content, fed-state exercise fat oxidation, and endurance performance — Maunder et al. (2022)"
    url: "https://pubmed.ncbi.nlm.nih.gov/34562114/"
    type: pubmed
translationOf: "fatmax-oxidacion-grasas-ciclismo"
---

## A curve with a precise peak

The rate of fat oxidation during exercise does not increase indefinitely with intensity: it rises from rest, reaches a maximum at an intermediate point, and then falls to nearly zero at maximal intensities. That point of peak lipid oxidation is called FatMax, and the corresponding rate is known as MFO (*maximal fat oxidation*). Achten, Gleeson and Jeukendrup characterized it systematically for the first time in 2002 in *Medicine & Science in Sports & Exercise* (PMID 11782653), testing 18 moderately trained cyclists with a stepwise ergometer protocol. They found FatMax at 64 ± 4% of VO₂max, with an MFO of 0.47 ± 0.17 g/min. It was not at rest where the most fat was oxidized — resting metabolism also relies heavily on lipids — but in a band of moderate effort where the contribution of fatty acids to ATP production was maximal in absolute terms.

The physiology behind the curve explains why the peak exists and why it cannot shift indefinitely to the right as intensity increases. At low intensities, the delivery rate of free fatty acids to the muscle is adequate, but total energy demand is small, so absolute fat oxidation remains low in grams per minute. As intensity rises toward the FatMax zone, energy demand grows and the muscle oxidizes more fat in absolute terms. However, once intensity exceeds that point, glycolysis activates progressively, lactate begins to accumulate, and two mechanisms converge to suppress fat oxidation: rising malonyl-CoA inhibits CPT-1 (carnitine palmitoyltransferase 1), the enzyme controlling fatty acid entry into the mitochondria, and falling muscle pH directly inhibits hormone-sensitive lipase, which mobilizes intramuscular triglycerides. Above the lactate threshold, fat oxidation drops sharply and carbohydrates dominate the energy supply almost entirely.

## The measurement protocol: indirect calorimetry and respiratory exchange ratio

FatMax is measured by indirect calorimetry: the cyclist breathes through a mask connected to a gas analyzer that measures oxygen consumption (VO₂) and carbon dioxide production (VCO₂) in real time. The ratio between the two — the respiratory exchange ratio (RER) — determines what proportion of energy comes from fat versus carbohydrate. At RER 0.70, energy derives almost entirely from fat; at RER 1.00, from carbohydrate exclusively. Substrate oxidation rates are calculated using Frayn's (1983) stoichiometric equations:

$$\dot{m}_{fat} = 1.695 \cdot \dot{V}O_2 - 1.701 \cdot \dot{V}CO_2$$

$$\dot{m}_{carb} = 4.210 \cdot \dot{V}CO_2 - 2.962 \cdot \dot{V}O_2$$

where rates are in g/min and gas flows in L/min. A FatMax test with 3-5 minute stages and power increments of 35-50 W constructs the full substrate oxidation curve across the intensity range. The point of peak fat oxidation — the FatMax — is identified as the crest of the $\dot{m}_{fat}$ parabola before RER exceeds 1.00.

<ChartLine
  title="Substrate oxidation curve vs. exercise intensity (% VO₂max)"
  caption="Based on mean data from Achten et al. (2002) and Venables et al. (2005). The curve intersection marks FatMax."
  data={[
    { pct: "40%", fat: 0.28, carbohydrates: 0.72 },
    { pct: "50%", fat: 0.42, carbohydrates: 1.15 },
    { pct: "60%", fat: 0.50, carbohydrates: 1.68 },
    { pct: "65%", fat: 0.49, carbohydrates: 2.10 },
    { pct: "70%", fat: 0.41, carbohydrates: 2.85 },
    { pct: "80%", fat: 0.24, carbohydrates: 3.90 },
    { pct: "90%", fat: 0.08, carbohydrates: 5.20 }
  ]}
  xKey="pct"
  lines={[
    { key: "fat", color: "#7C3AED", name: "Fat oxidation (g/min)" },
    { key: "carbohydrates", color: "#0891B2", name: "Carbohydrate oxidation (g/min)" }
  ]}
  unit=" g/min"
/>

## Typical values in cyclists: the range matters

In trained cyclists, Achten and Jeukendrup published in 2003 in *International Journal of Sports Medicine* (PMID 14598198) data from 55 trained men with a mean MFO of 0.52 ± 0.15 g/min at a FatMax intensity of 62.5 ± 9.8% of VO₂max. The individual range was wide: from 0.24 to 0.89 g/min. Venables, Achten and Jeukendrup (2005) extended the study to 300 men and women of varying training levels in *Journal of Applied Physiology* (PMID 15333616), finding MFO ranging from 0.10 to 0.89 g/min with a mean of 0.42 ± 0.18 g/min. The strongest predictors of a high MFO were aerobic capacity (VO₂max) and weekly training volume. More trained cyclists oxidized more fat in absolute values because they had greater active muscle mass, higher mitochondrial density and greater fatty acid transport capacity.

To contextualize: 0.5 g/min of fat oxidation equates to 4.5 kcal/min or 270 kcal/hour derived exclusively from lipids. Over a 5-hour stage at moderate intensity, a cyclist with good fat oxidation capacity can obtain up to 1,350 kcal from lipids, substantially reducing dependence on glycogen. Total muscle glycogen in a trained cyclist is approximately 400-600 g (1,600-2,400 kcal), and the difference between finishing a long stage with adequate reserves versus hitting the glycogen wall can depend directly on available MFO at racing intensity. Maunder, Plews and Kilding (2018) in *Frontiers in Physiology* (PMID 29875697) systematized MFO normative values across populations, confirming that highly trained cyclists show values of 0.7-1.0 g/min, while sedentary individuals rarely exceed 0.2-0.3 g/min.

<ChartBar
  title="MFO by training level (g/min)"
  caption="Mean values from Venables et al. (2005) and Maunder et al. (2018). Individual variability is high."
  data={[
    { nivel: "Sedentary", mfo: 0.18 },
    { nivel: "Recreational", mfo: 0.30 },
    { nivel: "Trained amateur", mfo: 0.47 },
    { nivel: "Regional competitor", mfo: 0.62 },
    { nivel: "Professional elite", mfo: 0.85 }
  ]}
  xKey="nivel"
  bars={[{ key: "mfo", color: "#7C3AED", name: "MFO (g/min)" }]}
  unit=" g/min"
/>

## FatMax and zone 2: are they the same?

Zone 2 training — defined differently depending on the zone system used — broadly corresponds to the intensity range where conversation is possible but requires some effort, blood lactate stays between 1.5 and 2.5 mmol/L, and perceived exertion is 3-4 out of 10. Metabolically, this zone frequently overlaps with FatMax but the two are not identical. San-Millán and Brooks (2018) in *Sports Medicine* (PMID 28623613) analyzed the metabolic flexibility of WorldTour professional cyclists and compared their lactate, fat and carbohydrate oxidation responses with sedentary subjects and type 2 diabetics. Professionals showed significantly higher fat oxidation rates at any given intensity, and their FatMax was located at higher absolute intensities (more watts) than in untrained subjects, precisely because their lactate thresholds were shifted to higher power outputs. The authors concluded that zone 2 training develops the metabolic machinery needed for efficient fat oxidation — mitochondria, enzymes, fatty acid transporters — and that high-level cyclists display superior "metabolic flexibility," defined as the ability to switch between substrates based on availability and intensity.

The relationship between zone 2 and FatMax is therefore bidirectional: pedaling in zone 2 promotes adaptations that raise FatMax, and a higher FatMax means that zone 2 covers a wider watt range before carbohydrates dominate. In cyclists with low fat oxidation capacity, zone 2 may be so low in power that it provides insufficient training stimulus; in that case, raising fat oxidation capacity is a priority before building large aerobic volume.

## Factors that modify FatMax

Systematic aerobic training is the primary modifier of FatMax. Achten and Jeukendrup (2004) in *Nutrition* (PMID 15212756) reviewed available evidence and concluded that endurance training increases MFO and shifts FatMax toward higher intensities as a percentage of VO₂max. The mechanisms include increased mitochondrial density (PGC-1α-mediated mitochondrial biogenesis), upregulated expression of fatty acid transporters (CD36, FABPpm), greater activity of fat oxidation enzymes (β-ketothiolase, HADH), and improved intramuscular triglyceride mobilization. Maunder et al. (2022) in *European Journal of Applied Physiology* (PMID 34562114) demonstrated that MFO is positively associated with vastus lateralis CD36 content — a long-chain fatty acid transporter — with r = 0.72 in a study of 17 trained male cyclists, the strongest correlation found between a molecular variable and MFO in a single field study.

Diet modifies FatMax both acutely and chronically. Fasting or exercising in a low-glycogen state shifts the preferred substrate toward fat and can raise MFO during that session by 20-40% compared to the fed state, though at the cost of higher perceived exertion and reduced performance at supra-threshold intensities. Carbohydrate ingestion in the hours before exercise raises insulin and intramuscular malonyl-CoA, suppressing fat oxidation and shifting FatMax to lower intensities. This is why coaches who prioritize FatMax development schedule zone 2 sessions fasted or with minimal pre-exercise carbohydrate intake. Sex also plays a role: women consistently show higher fat oxidation rates than men at equivalent percentages of VO₂max, possibly due to differences in hormonal regulation and muscle fiber type distribution.

## Why it matters for race durability

The concept of durability — the ability to maintain performance in the final portion of a long event — is directly related to FatMax. A cyclist oxidizing 0.85 g/min of fat at FatMax intensity arrives at the final climb of a Grand Tour with more glycogen available than one who only oxidizes 0.35 g/min at the same intensity. The difference is not trivial: in a 200 km stage with 4,000 m of positive elevation, elite cyclists pedal for 5-6 hours at intensities oscillating between zone 2 and threshold. A high FatMax means that during peloton riding or transition segments, fat combustion covers a larger fraction of energy demand, preserving glycogen for the high-intensity moments — the final kilometers of a climb, breakaway sprints, counter-attacks on the final col. WorldTour team sport directors have begun including MFO measurements in pre-season protocols precisely because it differentiates riders who can hold on through the final hours of a long stage from those who fracture before the finish.

Durability also links to FatMax through glycogen sparing. If a cyclist starts a stage with 500 g of glycogen (2,000 kcal) and consumes 60 g/hour of exogenous carbohydrate (240 kcal/hour), the time to depletion depends directly on how much energy fat oxidation covers. With an MFO of 0.5 g/min (270 kcal/hour), the cyclist can sustain 5-6 hours of moderate effort before depending exclusively on exogenous carbohydrates and residual glycogen. With an MFO of 0.2 g/min (108 kcal/hour), the window shrinks considerably, and the risk of bonking grows proportionally.

## How to train it: volume, intensity and timing

The most evidence-backed protocol for raising FatMax is high-volume aerobic training at low intensity. Sessions of 2-4 hours in zone 2 on the road or indoor trainer, performed consistently three to five days per week across eight to sixteen week blocks, produce the mitochondrial adaptations that shift the fat oxidation curve to the right. The keys are consistency and session duration: sessions under 60 minutes in zone 2 provide insufficient stimulus for mitochondrial biogenesis adaptations; sessions of 90 minutes or more begin to generate the required cellular signaling. Pre-exercise caffeine supplementation potentiates free fatty acid mobilization and can transiently increase fat oxidation, though the chronic effect on FatMax is modest.

The "train low" protocol — training with depleted glycogen — has shown potential to amplify the molecular adaptations of FatMax when implemented carefully. Performing the second session of a double training day without reloading glycogen between sessions, or fasting the first hour of a long session, upregulates AMPK signaling and PGC-1α expression. However, total performance may be compromised and fatigue accumulation is greater, making this method appropriate during aerobic base phases rather than competition or high-intensity training periods. For cyclists with limited training time, prioritizing long zone 2 sessions — even if fewer than ideal — and executing them with intensity discipline produces more useful metabolic adaptations than shortening those sessions and increasing intensity.

## Accessible measurement of FatMax

The gold standard remains indirect calorimetry in a laboratory with cycle ergometer and gas analyzer, but accessible field approximations exist. Heart rate at FatMax — which ranges from 60-75% of HRmax in trained cyclists — can serve as a practical guide for identifying zone 2 intensity. RER cannot be measured in the field without gas analysis equipment, but blood lactate response can orient the intensity: FatMax typically corresponds to lactate values of 1.5-2.5 mmol/L, right in the range of the first lactate threshold (LT1). A cyclist who knows their LT1 power from a step test with a lactate analyzer has a reasonable approximation to FatMax power. The most important field limitation is that FatMax varies with nutritional state on the test day: measurement after a carbohydrate-rich breakfast will produce a lower FatMax than the same measurement fasted or after 12 hours without carbohydrate intake.
