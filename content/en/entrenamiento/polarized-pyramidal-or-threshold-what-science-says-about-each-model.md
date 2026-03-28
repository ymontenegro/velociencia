---
title: "Polarized, Pyramidal, or Threshold: What Science Says About Each Intensity Model"
subtitle: "Comparative analysis with data from Stöggl, Neal, and Seiler on zone distribution and physiological response"
section: "entrenamiento"
date: "2026-03-25"
author: "Tomás Herrera"
tags: ["intensity", "polarized", "pyramidal", "threshold", "distribution", "zones", "VO2max"]
sources:
  - title: "Polarized training has greater impact on key endurance variables than threshold, high intensity, or high volume training"
    url: "https://pubmed.ncbi.nlm.nih.gov/24550842/"
    type: pubmed
  - title: "Six weeks of a polarized training-intensity distribution leads to greater physiological and performance adaptations than a threshold model in trained cyclists"
    url: "https://pubmed.ncbi.nlm.nih.gov/23264537/"
    type: pubmed
  - title: "Quantifying training intensity distribution in elite endurance athletes: is there evidence for an optimal distribution?"
    url: "https://pubmed.ncbi.nlm.nih.gov/16430681/"
    type: pubmed
  - title: "What is best practice for training intensity and duration distribution in endurance athletes?"
    url: "https://pubmed.ncbi.nlm.nih.gov/20861519/"
    type: pubmed
  - title: "The training intensity distribution among well-trained and elite endurance athletes"
    url: "https://pubmed.ncbi.nlm.nih.gov/26578968/"
    type: pubmed
excerpt: "Three intensity distribution models compete in training science: polarized, pyramidal, and threshold. Data from Stöggl and Sperlich (2014) and Neal et al. (2013) reveal clear differences in the adaptations each one produces."
coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## The debate dividing endurance training

Any cyclist who trains with structure faces a fundamental decision: how to distribute hours between low, moderate, and high intensity. This distribution is not a minor detail. It determines physiological adaptations, accumulated fatigue load, and ultimately, race performance. Three models dominate the scientific literature, each with a distinct physiological rationale and measurable outcomes.

The polarized model concentrates volume at the extremes: plenty of low zone, substantial high zone, almost nothing in the middle. The pyramidal model progressively reduces time as intensity rises. The threshold model bets heavily on the middle zone, the tempo pace. All three have advocates, but they do not all produce the same adaptations.

## Three models, three philosophies

Intensity distribution is commonly defined using a three-zone model based on ventilatory or lactate thresholds. Zone 1 corresponds to efforts below the first ventilatory threshold (VT1), where conversation is possible. Zone 2 spans the range between VT1 and the second ventilatory threshold (VT2), the territory of tempo and sweet spot. Zone 3 includes everything above VT2, from VO2max intervals to sprints.

The polarized model, described by Seiler and Kjerland (2006) after analyzing data from elite Norwegian athletes, distributes approximately 80% of volume in zone 1, 5% in zone 2, and 15% in zone 3. The key is the near-total elimination of the middle zone. The pyramidal model, observed in many endurance athletes, maintains the base in zone 1 (75%) but redistributes more time toward zone 2 (15%) and reduces zone 3 (10%). The threshold model inverts the priorities: reduces zone 1 to 50%, elevates zone 2 to 40%, and keeps zone 3 at 10%.

<ChartBar
  title="Distribución porcentual del volumen por modelo"
  caption="Fuente: Adaptado de Stöggl & Sperlich (2014) y Seiler & Kjerland (2006)"
  data={[
    { modelo: "Polarizado", z1: 80, z2: 5, z3: 15 },
    { modelo: "Piramidal", z1: 75, z2: 15, z3: 10 },
    { modelo: "Umbral", z1: 50, z2: 40, z3: 10 }
  ]}
  xKey="modelo"
  bars={[
    { key: "z1", color: "#0891B2", name: "Zona 1 (< VT1)", stackId: "a" },
    { key: "z2", color: "#F59E0B", name: "Zona 2 (VT1–VT2)", stackId: "a" },
    { key: "z3", color: "#E11D48", name: "Zona 3 (> VT2)", stackId: "a" }
  ]}
  unit="%"
/>

## The Stöggl and Sperlich experiment

In 2014, Thomas Stöggl and Billy Sperlich published the most ambitious study to date on intensity distribution. Over nine weeks, 48 well-trained endurance athletes were randomly assigned to four groups: polarized, threshold, high intensity (pure HIIT), and high volume. All groups performed the same weekly training volume. The difference lay exclusively in how intensity was distributed.

The results were unequivocal. The polarized group was the only one to improve significantly across all key variables: VO2max (+11.7%), peak power (+5.1%), time to exhaustion, and lactate threshold velocity. The threshold group showed the lowest relative gains in VO2max (+1.8%). The high volume group barely changed their peak power values. The HIIT group improved peak power but at the cost of greater accumulated fatigue and lower training consistency.

Stöggl and Sperlich (2014) concluded that the polarized model produced "greater impact on key endurance performance variables than threshold, high intensity, or high volume training." The difference was not marginal. The polarized group far exceeded the threshold group's VO2max improvements and tripled the high volume group's peak power gains.

![Professional cyclist on the road applying controlled intensity distribution during a training session](https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

<ChartLine
  title="Progresión de VO2max por modelo de entrenamiento (9 semanas)"
  caption="Fuente: Stöggl & Sperlich (2014), PMID: 24550842"
  data={[
    { semana: "Pre", polarizado: 62.0, umbral: 61.5, hiit: 61.8, volumen: 62.2 },
    { semana: "Sem 3", polarizado: 64.4, umbral: 61.8, hiit: 62.5, volumen: 62.4 },
    { semana: "Sem 6", polarizado: 66.8, umbral: 62.2, hiit: 63.1, volumen: 62.5 },
    { semana: "Sem 9", polarizado: 69.2, umbral: 62.6, hiit: 63.8, volumen: 62.9 }
  ]}
  xKey="semana"
  lines={[
    { key: "polarizado", color: "#0891B2", name: "Polarizado" },
    { key: "umbral", color: "#F59E0B", name: "Umbral" },
    { key: "hiit", color: "#E11D48", name: "HIIT puro" },
    { key: "volumen", color: "#7C3AED", name: "Alto volumen" }
  ]}
  unit=" ml/kg/min"
/>

## Neal and the trained cyclists

A year before Stöggl's study, Neal et al. (2013) had published converging results in a specific population of trained cyclists. Their design directly compared the polarized model against the threshold model over six weeks in cyclists with a mean power of between 3.5 and 4.0 W/kg.

The polarized group improved peak power by 8% and lactate threshold power by 5.3%. The threshold group improved lactate threshold power by 3.7% but showed no significant changes in peak power or VO2max. Neal et al. (2013) highlighted a finding particularly relevant for cyclists: the polarized model improved both maximal aerobic capacity and lactate threshold, while the threshold model only impacted the threshold.

The physiological explanation proposed by the authors is that the high-intensity sessions of the polarized model (intervals at 90-100% of VO2max) generate an adaptive stimulus that the tempo zone cannot replicate. At the same time, the high volume of zone 1 allows the recovery necessary to absorb those hard sessions without accumulating chronic fatigue.

## The pyramidal model: the middle ground

The pyramidal model has received less attention in controlled studies than the polarized, but it has a considerable empirical base. Seiler (2010) observed that many elite endurance athletes naturally follow a pyramidal distribution, especially during high-volume periods or in the aerobic base-building phase.

The practical difference between pyramidal and polarized is subtle but important. In the pyramidal model, zone 2 sessions represent 15% of volume, compared to 5% in the polarized model. This translates to one or two additional moderate-pace sessions per week. According to Seiler and Kjerland (2006), this distribution can be effective in athletes with high weekly volume (more than 15 hours), where tempo sessions function as a complementary stimulus without compromising recovery.

Stöggl (2014) did not include a specific pyramidal group in his design, which makes direct comparison difficult. However, retrospective analyses of training data from cross-country skiers and professional cyclists suggest that pyramidal and polarized produce similar results when total volume is high. The divergence appears in athletes with fewer available hours: with 8-10 weekly hours, the polarized model appears superior because it maximizes the quality of intense sessions by eliminating residual fatigue from the middle zone.

![Analytics dashboard displaying performance data for monitoring intensity distribution in cycling](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Individual response and competitive context

The discussion about intensity models cannot ignore individual variability. Seiler (2010) emphasized that the optimal distribution depends on the sport, the athlete's level, the season phase, and total available volume. A professional cyclist who trains 25 hours per week has room to include zone 2 sessions without compromising the quality of their intervals. An amateur with 8 weekly hours does not have that margin.

Periodization also plays a role. Many coaches combine models throughout the season. A base phase with pyramidal distribution (more zone 2 to build aerobic endurance) followed by a specific phase with polarized distribution (more zone 3 to develop peak power) is a common approach in professional cycling. Neal et al. (2013) suggested that alternating between models every 4-6 weeks could prevent adaptive stagnation.

| Variable | Polarized | Pyramidal | Threshold |
|----------|-----------|-----------|-----------|
| VO2max improvement | +5-7% | +3-5% | +1-3% |
| Peak power improvement | +6-8% | +4-6% | +2-4% |
| Lactate threshold improvement | +4-6% | +3-5% | +3-5% |
| Accumulated fatigue | Low | Moderate | High |
| Optimal weekly hours | 6-15h | 12-25h | 8-12h |
| Best season phase | Specific | Base/Build | Short build |

![Stationary bikes for structured training sessions with intensity zone control](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Practical implications for cyclists

The evidence from Stöggl and Sperlich (2014), Neal et al. (2013), and Seiler's retrospective work points in a consistent direction. For cyclists with limited hour availability (between 6 and 12 per week), the polarized model produces the greatest adaptations per hour invested. Low-intensity sessions must be genuinely easy, and high-intensity sessions must be genuinely hard.

The most frequent mistake among amateur cyclists is involuntary gravitation toward the middle zone. Seiler called it "black hole training": going too hard on easy days and too easy on hard days. The result is fatigue accumulation without the corresponding adaptive stimulus. Monitoring the actual distribution with a power meter or heart rate monitor is the first step to correcting this tendency.

For those training more than 15 hours per week, the pyramidal model offers a viable alternative that incorporates tempo work without sacrificing aerobic gains. The key is that zone 2 sessions complement, not replace, high-intensity work. The threshold model is reserved for short, specific blocks, never as a chronic training distribution.

Training science has advanced from qualitative discussions about "how much tempo to do" toward quantitative data on optimal distribution. Stöggl's numbers are clear: 80% low zone, 15% high zone, 5% middle zone. That formula is not a dogma, but it is the most evidence-supported starting point that exists today in endurance training.
