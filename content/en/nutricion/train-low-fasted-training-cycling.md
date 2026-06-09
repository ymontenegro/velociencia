---
title: "Train Low: the art of training on empty without destroying yourself"
subtitle: "Carbohydrate periodization amplifies mitochondrial molecular signaling, but professional teams reserve it exclusively for low-intensity sessions"
section: "nutricion"
date: "2026-05-05"
author: "Martín Velasco"
tags: ["train low", "fasted training", "carbohydrates", "periodization", "AMPK", "PGC-1α", "mitochondria", "glycogen"]
sources:
  - title: "Skeletal muscle adaptation: training twice every second day vs. training once daily (Hansen et al. 2005)"
    url: "https://pubmed.ncbi.nlm.nih.gov/15361516/"
    type: pubmed
  - title: "Enhanced Endurance Performance by Periodization of Carbohydrate Intake: Sleep Low Strategy (Marquet et al. 2016)"
    url: "https://pubmed.ncbi.nlm.nih.gov/26741119/"
    type: pubmed
  - title: "Fuel for the Work Required: A Theoretical Framework for Carbohydrate Periodization and the Glycogen Threshold Hypothesis (Impey et al. 2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/29453741/"
    type: pubmed
  - title: "Performance effects of periodized carbohydrate restriction in endurance trained athletes – a systematic review and meta-analysis (Gejl & Nybo 2021)"
    url: "https://pubmed.ncbi.nlm.nih.gov/34001184/"
    type: pubmed
  - title: "Carbohydrates for training and competition (Burke et al. 2011)"
    url: "https://pubmed.ncbi.nlm.nih.gov/21660838/"
    type: pubmed
  - title: "Low Energy Availability Is Difficult to Assess but Outcomes Have Large Impact on Bone Injury Rates in Elite Distance Athletes (Heikura et al. 2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/29252050/"
    type: pubmed
excerpt: "Training with low glycogen activates the AMPK–PGC-1α cascade and amplifies mitochondrial adaptations. The molecular evidence is solid; direct translation to race-day watts is more nuanced. Here's how train low actually works—and why WorldTour teams apply it with surgical precision, not as a blanket fueling philosophy."
coverImage: "https://images.unsplash.com/photo-1648061930045-e9fdd171c052?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
translationOf: "train-low-entrenamiento-ayunas-ciclismo"
---

## The experiment that changed sports nutrition: two legs, one cyclist

A 2005 study published in the *Journal of Applied Physiology* used an experimental design as elegant as it was unsettling. Hansen, Fischer, Plomgaard, Andersen, Saltin and Pedersen recruited seven untrained men and subjected them to a ten-week protocol in which each leg performed exactly the same total volume of work, but with radically different muscle glycogen levels. The "LOW" leg trained twice every other day, so the second session always began with reserves depleted from the first. The "HIGH" leg trained once daily, always with ample glycogen available. After ten weeks, the LOW leg endured twice as long as the HIGH leg in an exhaustion test at 90% of post-training peak power output.

That difference—doubling time to failure with identical training volume—ignited a line of research that now structures the nutritional periodization of the world's top teams. The activities of citrate synthase and β-hydroxyacyl-CoA dehydrogenase, two key markers of mitochondrial oxidative capacity, increased significantly more in the glycogen-depleted leg. The PMID is 15361516, and the paper has been one of the most cited in exercise physiology for two decades.

## The molecular cascade: AMPK flips the switch, PGC-1α amplifies the signal

When a muscle begins exercising with low glycogen, the AMP/ATP ratio spikes because glycolysis cannot keep up with ATP resynthesis. This energy drop activates AMPK (AMP-activated protein kinase), a protein that acts as the cell's fuel sensor. Phosphorylated AMPK then activates the transcription factor PGC-1α (Peroxisome proliferator-activated receptor gamma coactivator 1-alpha), the master regulator of mitochondrial biogenesis—it increases mitochondrial number, raises the density of oxidative enzymes, and improves the muscle's capacity to burn fat as fuel.

In parallel, p38 MAPK (p38 mitogen-activated protein kinase) operates under the same energy stress conditions, phosphorylating and activating PGC-1α through the ATF2 transcription factor. The convergence of AMPK and p38 MAPK on PGC-1α creates an additive effect: the signal to build more mitochondria arrives through two simultaneous pathways rather than one. Impey and collaborators described this mechanism in detail in their 2018 review in *Sports Medicine* (PMID: 29453741), coining the concept of the "glycogen threshold hypothesis": there is a window of muscle glycogen concentration—roughly between 100 and 300 mmol/kg dry weight—in which molecular signaling is amplified without the performance during the session itself collapsing.

The nuance of that window is crucial. Training with glycogen fully depleted (below 100 mmol/kg) does not amplify the signal further—it degrades it, because the quality of the effort falls so sharply that the mechanical stimulus diminishes. Training with full glycogen suppresses AMPK signaling because the cell has abundant energy and does not activate its conservation circuits. Peak adaptation occurs in the intermediate range, not at the extreme of total fasting.

<ChartBar
  title="Mitochondrial adaptations by glycogen availability"
  caption="Synthesis based on Impey et al. (2018), Sports Medicine — PMID 29453741"
  data={[
    { condition: "High glycogen (>300 mmol/kg)", cs_activity: 28, had_activity: 22 },
    { condition: "Threshold glycogen (100-300 mmol/kg)", cs_activity: 58, had_activity: 54 },
    { condition: "Depleted glycogen (<100 mmol/kg)", cs_activity: 31, had_activity: 27 },
  ]}
  xKey="condition"
  bars={[
    { key: "cs_activity", color: "#0D9488", name: "Citrate synthase activity (relative % increase)" },
    { key: "had_activity", color: "#7C3AED", name: "β-HAD activity (relative % increase)" },
  ]}
  layout="vertical"
  unit="%"
/>

## Sleep Low: Marquet redesigns the protocol for the real world

The problem with replicating Hansen's experiment in real-world practice is obvious: performing two sessions in the same day, with the first depleting glycogen and the second capitalizing on that state, is logistically complex and physiologically aggressive. In 2016, Marquet, Brisswalter and collaborators published in *Medicine & Science in Sports & Exercise* (PMID: 26741119) an elegant solution: the "sleep low" protocol. Twenty-one triathletes were divided into two groups who consumed identical daily carbohydrate intake (6 g/kg), but the SL group distributed their carbohydrates strategically to train the following morning with low muscle glycogen.

The sequence was: high-intensity interval session in the afternoon with carbohydrates available → no carbohydrate intake overnight → low-intensity session the next morning with depleted muscle glycogen → post-session breakfast rich in carbohydrates to restore reserves. Three weeks of this protocol produced significant improvements in cycling economy (delta efficiency), supramaximal cycling capacity at 150% of peak oxygen consumption, and 10-km running time—without any difference in total daily carbohydrate intake. The sleep low protocol does not mean eating less; it means redistributing when you eat.

The strength of this design is that it preserves the quality of the intense session (performed with available fuel) and reserves the low-glycogen state for the next morning's low-intensity session, where the performance drop is tolerable and adaptive signaling is maximal. This is the practical operationalization of Impey et al.'s glycogen threshold hypothesis.

## How much does performance actually improve? The meta-analysis that cools the enthusiasm

The molecular evidence is compelling. The translation into measurable performance improvements in watts or race time is more nuanced. Gejl and Nybo published in 2021 in the *Journal of the International Society of Sports Nutrition* (PMID: 34001184) the most comprehensive meta-analysis to date on periodized carbohydrate restriction in trained athletes. They included studies with endurance athletes with VO₂max ≥ 55 ml·kg⁻¹·min⁻¹ in women and ≥ 60 in men, interventions of at least one week with at least three carbohydrate restriction sessions per week. The main result: no overall significant effect of carbohydrate periodization on performance compared to control training with high carbohydrate availability.

That result does not mean train low does not work; it means its benefits are highly context-specific. Improvements in muscle oxidative capacity and fat oxidation capacity are more relevant for 4-6 hour efforts than for 40-minute time trials. Most studies included in the meta-analysis used short-duration performance protocols that do not capture the most pertinent train low adaptations. Impey et al. (2018) explicitly flagged this methodological limitation and emphasized that train low benefits are especially applicable to long-distance cycling where fat oxidation is a priority.

<ChartBar
  title="Comparison of Train Low protocols: design and primary outcome"
  caption="Synthesis from Hansen et al. 2005, Marquet et al. 2016, Gejl & Nybo 2021"
  data={[
    { protocol: "Twice-daily alternating sessions (Hansen 2005)", effect: 100 },
    { protocol: "Nocturnal Sleep Low (Marquet 2016)", effect: 72 },
    { protocol: "General periodic restriction (Gejl 2021)", effect: 18 },
  ]}
  xKey="protocol"
  bars={[{ key: "effect", color: "#0D9488", name: "Effect magnitude on adaptations (relative index)" }]}
  layout="vertical"
  unit=" points"
/>

## Why UAE Emirates and Visma do not use train low in intense sessions

James Morton, former head of nutrition at Team Sky and now at Performa, was among the first to formalize the "fuel for the work required" philosophy—the framework that reframes train low not as a fasting strategy but as intelligent periodization. The logic is precise: low-intensity sessions with low glycogen to maximize oxidative adaptations; high-intensity sessions with abundant carbohydrates to not compromise the quality of the stimulus. The paradigm is not "train fasted"; it is adjusting carbohydrate availability to the metabolic demands of each session.

In the actual practice of WorldTour teams, this translates into something counterintuitive for the amateur rider: professionals consume enormous amounts of carbohydrates during intense sessions. Pavel Sivakov of UAE Team Emirates described in 2024 ingesting up to 150 grams per hour during high-demand stages. Visma-Lease a Bike, through performance director Mathieu Heijboer, publicly stated that from December they worked to help riders tolerate more than 100 grams of carbohydrates per hour, with the goal of reaching the racing season with that intestinal absorption capacity optimized. Training the gut to absorb more carbohydrates is, at elite teams, a priority as high as train low itself.

The physiological reason is straightforward. The intervals at 120% VO₂max that define the base preparation of the best WorldTour teams require full-power anaerobic glycolysis; fat oxidation is simply too slow to supply ATP at that rate. Compromising the intensity of those key sessions through carbohydrate deficiency not only reduces the immediate stimulus but suppresses cortisol and testosterone in ways that compromise subsequent training weeks, according to the review by Burke et al. (2011) in the *Journal of Sports Sciences* (PMID: 21660838).

## The real risk: when train low becomes low energy availability

The boundary between intelligent carbohydrate periodization and relative energy deficiency (RED-S) is thinner than it appears. Heikura and collaborators published in 2018 in the *International Journal of Sport Nutrition and Exercise Metabolism* (PMID: 29252050) that low energy availability is difficult to quantify but has a large impact on bone injury rates in elite athletes. The problem is that poorly implemented train low can suppress appetite enough that the athlete fails to recover the necessary energy for the rest of the day, falling into an unintentional chronic caloric deficit.

Warning signs include power loss in watts during sessions that should be high quality, longer recovery time between sessions, irritability, and increased frequency of respiratory infections. The endocrine system—particularly the hypothalamic-pituitary-gonadal axis—is sensitive to chronic energy availability. In women, functional hypothalamic amenorrhea is a red flag; in men, suppression of free testosterone. In cycling, where athletes already operate under high energy demands, overlaying train low onto a demanding calendar requires professional nutritional supervision, not self-prescription.

## When to apply it: the practical guide for the trained cyclist

Train low makes sense as a tool in the arsenal of a trained cyclist who already has an established aerobic base and wants to enhance fat oxidation capacity for events exceeding three hours. It does not make sense during high training load periods, in the weeks leading up to competition, or in any session where effort quality is the priority. The most evidence-backed implementation combines the sleep low protocol (no carbohydrates after the evening interval session) with a gentle morning ride of 60 to 90 minutes in a fasted state, followed by a carbohydrate-rich breakfast that restores reserves for the rest of the day.

| Session type | Recommended carbohydrate availability | Justification |
|---|---|---|
| High-intensity intervals (>85% HRmax) | High (60-90 g/h during session) | Preserve stimulus quality and anaerobic glycolysis |
| Long base ride (Z2, >3 h) | Moderate-low (25-40 g/h) | Activate fat oxidation without compromising duration |
| Sleep low session (morning after evening depletion) | Low (fasted or &lt;30 g carbohydrates) | Maximum AMPK/PGC-1α signaling at low intensity |
| Active recovery (&lt;Z2) | Unrestricted | Metabolic recovery is the priority |
| Race or race simulation | High (>90 g/h with glucose+fructose 2:1) | Performance is the only objective |

The Marquet et al. (2016) protocol provides a clear operational framework: apply sleep low two or three times per week during three-to-four-week blocks in the base period, without overlapping these weeks with high-load blocks or competition approach phases. More train low sessions per week do not produce more adaptations—they produce more accumulated fatigue and a greater risk of RED-S.

## The signal the muscle cannot ignore

Train low is not fasting out of discipline or riding empty out of philosophical conviction. It is deliberately manipulating cellular energy status so that the muscle activates its mitochondrial adaptation programs with greater intensity than it would achieve under permanent abundance. The AMPK–PGC-1α–mitochondrial biogenesis cascade is real and documented from Hansen's experiment through the most recent reviews. What the evidence also states clearly is that this signaling is amplified only in the correct glycogen window, not at extreme depletion; that the benefit is greater for cyclists oriented toward long distance than explosive efforts; and that the difference between intelligent train low and inadvertent energy deficiency can be measured in weeks lost to injury or infection.

WorldTour teams apply it with the same precision they apply power in watts: data in hand, session by session, with nutritionists who distinguish exactly when low glycogen is a stimulus and when it is a mistake. For the amateur cyclist wanting to incorporate it, the first step is not emptying the refrigerator the night before training; it is understanding that the sleep low protocol means eating exactly the same amount as before—just in a different order.
