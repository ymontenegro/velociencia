---
title: "Power Curve: What Your Cyclist Profile Reveals"
subtitle: "The complete map of your neuromuscular and metabolic capabilities in a single graph"
section: "ciencia"
date: "2026-03-26"
author: "Sofía Müller"
tags: ["power curve", "critical power", "W prime", "cyclist profile", "power profiling"]
sources:
  - title: "Power-duration relationship: Physiology, fatigue, and the limits of human performance"
    url: "https://pubmed.ncbi.nlm.nih.gov/27806677/"
    type: pubmed
  - title: "Critical Power: An Important Fatigue Threshold in Exercise Physiology"
    url: "https://pubmed.ncbi.nlm.nih.gov/27031742/"
    type: pubmed
  - title: "Power profiling and the power-duration relationship in cycling: a narrative review"
    url: "https://pubmed.ncbi.nlm.nih.gov/34708276/"
    type: pubmed
  - title: "Physical demands and power profile of different stage types within a cycling grand tour"
    url: "https://pubmed.ncbi.nlm.nih.gov/30589390/"
    type: pubmed
  - title: "The critical power and related whole-body bioenergetic models"
    url: "https://pubmed.ncbi.nlm.nih.gov/16284785/"
    type: pubmed
  - title: "Determination of critical power using a 3-min all-out cycling test"
    url: "https://pubmed.ncbi.nlm.nih.gov/17473782/"
    type: pubmed
excerpt: "The power-duration curve is the most comprehensive tool for identifying a cyclist's strengths and weaknesses. From a 5-second sprint to a sustained hour-long effort, every point on the curve reflects a distinct energy system."
coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## Your physiological fingerprint

Every cyclist has a unique power curve. It is the graphical representation of the maximum power you can sustain for each effort duration, from an explosive five-second sprint to a prolonged effort of sixty minutes or more. Pinot and Grappe (2011) described it as a "physiological fingerprint" because it reveals with precision where each rider's strengths and weaknesses lie.

The curve is not a theoretical construct. Every point corresponds to an actual personal best, recorded with a power meter. When a cyclist accumulates months of data, the upper envelope of all maximal efforts traces a hyperbolic curve that drops sharply in the first few seconds and progressively flattens toward longer durations. That hyperbolic shape is no coincidence. It reflects the transition between the energy systems that dominate each duration range.

## The four classic profiles

Not all cyclists produce the same curve. Schabort et al. (2000) and more recently Pinot and Grappe (2015) classified performance profiles into categories based on the relative distribution of power across the curve. A sprinter generates extraordinary values in the first 5 to 15 seconds but drops off markedly in efforts beyond 3 minutes. A climber shows the inverse pattern: moderate sprint values but a curve that remains elevated at durations from 5 to 60 minutes.

The time trialist presents a relatively flat curve, without extreme peaks but with consistently high values from one minute through to the hour mark. The all-rounder, common among grand tour riders like Pogačar or Roglič, combines reasonable capabilities across the entire spectrum without a marked deficit in any range.

<ChartArea
  title="Curvas de potencia por perfil de ciclista (nivel elite)"
  caption="Fuente: Adaptado de Pinot y Grappe (2015), valores en W/kg para ciclistas profesionales"
  data={[
    { duracion: "5s", sprinter: 23.5, escalador: 16.0, rodador: 18.5, todoterreno: 19.0 },
    { duracion: "15s", sprinter: 17.0, escalador: 12.5, rodador: 14.0, todoterreno: 14.5 },
    { duracion: "30s", sprinter: 12.5, escalador: 10.0, rodador: 11.0, todoterreno: 11.2 },
    { duracion: "1min", sprinter: 9.5, escalador: 8.5, rodador: 8.8, todoterreno: 9.0 },
    { duracion: "3min", sprinter: 6.5, escalador: 7.2, rodador: 7.0, todoterreno: 7.0 },
    { duracion: "5min", sprinter: 5.5, escalador: 6.8, rodador: 6.5, todoterreno: 6.5 },
    { duracion: "10min", sprinter: 4.8, escalador: 6.4, rodador: 6.2, todoterreno: 6.1 },
    { duracion: "20min", sprinter: 4.2, escalador: 6.2, rodador: 6.0, todoterreno: 5.9 },
    { duracion: "60min", sprinter: 3.5, escalador: 5.8, rodador: 5.7, todoterreno: 5.5 }
  ]}
  xKey="duracion"
  areas={[
    { key: "sprinter", color: "#E11D48", name: "Sprinter" },
    { key: "escalador", color: "#7C3AED", name: "Escalador" },
    { key: "rodador", color: "#0891B2", name: "Rodador" },
    { key: "todoterreno", color: "#0D9488", name: "Todoterreno" }
  ]}
  unit=" W/kg"
/>

The difference is striking at the extremes. In a 5-second sprint, a professional sprinter can exceed 23 W/kg while a climber barely reaches 16 W/kg. But in efforts lasting 20 to 60 minutes, the relationship inverts: the climber sustains 6.0-5.8 W/kg where a pure sprinter drops to 4.2-3.5 W/kg. Two radically different physiological machines.

![VO2max laboratory test — the physiology behind every point on the power curve](https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## The critical power model

Behind the curve lies a mathematical model with nearly a century of evolution. Monod and Scherrer (1965) originally proposed the concept of critical power (CP), and it has since become one of the most robust tools in exercise physiology. Jones et al. (2019) described it as a "fundamental physiological threshold" separating the heavy and severe intensity domains.

The model has two parameters. Critical power (CP) represents the maximum power that can theoretically be sustained indefinitely without progressive metabolite accumulation. In practice, it corresponds approximately to an effort sustainable for 30 to 60 minutes in trained cyclists. The second parameter is W' (W prime), a finite amount of work that can be performed above CP before reaching exhaustion. Poole et al. (2016) demonstrated that W' primarily reflects anaerobic capacity and the phosphocreatine and glycogen reserves available for supra-threshold efforts.

The relationship between the two parameters is straightforward. For any power above CP, the time to exhaustion is calculated by dividing W' by the difference between the working power and CP. If your CP is 300 W and your W' is 20 kJ, at 400 W you will last exactly 200 seconds (20,000 J divided by 100 W). At 350 W, you will last 400 seconds. The hyperbolic curve emerges naturally from this equation.

## W' as a tactical reserve

In competition, W' functions as an energy reservoir that is spent and recharged. Skiba et al. (2012) developed a W' reconstitution model that allows real-time estimation of how much reserve remains available. Every acceleration above CP depletes W'. Every period below CP partially replenishes it.

A cyclist with a large W' (25-30 kJ) can afford multiple attacks on a climb because they have more "matches" to burn. One with a small W' (10-15 kJ) but a very high CP will prefer to impose a sustained pace that drains the anaerobic reserves of their rivals. The first wins through repeated explosivity. The second wins through attrition. The optimal strategy depends on knowing both parameters.

![Professional cyclist attacking in a race — every acceleration consumes W' as a finite tactical reserve](https://images.unsplash.com/photo-1504025468847-0e438279542c?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## How to determine your CP and W'

Several validated protocols exist. The classic method requires 3 to 5 maximal efforts of different durations (typically 2, 5, 10, and 20 minutes) performed on separate days. The hyperbolic curve is fitted to the data and CP and W' are extracted. Vanhatalo et al. (2007) validated a more practical protocol: the 3-minute all-out test, where the cyclist pedals at maximum intensity for 3 minutes. The average power of the final 30 seconds estimates CP, and the total work above that power estimates W'.

The 3-minute test has the advantage of requiring only a single session, but it demands a truly maximal effort from the very first second. If the cyclist paces themselves, the estimate will be inaccurate. For those using platforms like WKO5 or Golden Cheetah, power curve modeling from accumulated data provides a continuous estimate without the need for formal testing.

## Reference values by level

The following table summarizes typical CP and W' ranges by competitive level, based on data compiled by Pinot and Grappe (2015) and Sanders and Heijboer (2019).

| Level | CP (W/kg) | W' (kJ) | 5s Power (W/kg) | 5min Power (W/kg) |
|-------|-----------|---------|---------------------|----------------------|
| Recreational | 2.0–2.8 | 8–15 | 10–14 | 2.5–3.2 |
| Trained | 2.8–3.5 | 12–20 | 14–17 | 3.2–4.0 |
| Competitive | 3.5–4.5 | 15–25 | 16–20 | 4.0–5.2 |
| Elite | 4.5–5.5 | 18–28 | 18–22 | 5.2–6.2 |
| WorldTour | 5.5–6.5 | 20–32 | 19–24 | 6.2–7.0 |

A fact that often surprises people is the variability of W'. Two cyclists with identical CP can have W' values that differ by a factor of two. That means one can sustain any supra-critical power for twice as long as the other. Sanders and Heijboer (2019) documented this variability even among WorldTour professionals, reinforcing the idea that CP and W' are complementary yet independent parameters.

## Which zone of the curve to train

Knowing your power curve allows you to identify the zone that most limits your performance. A cyclist with good CP but low W' will benefit from including short high-intensity intervals (30 seconds to 2 minutes) that stimulate anaerobic adaptations. One with good W' but low CP needs aerobic volume and threshold work to raise their sustainable capacity.

Sylta et al. (2014) found that the optimal intensity distribution varies according to the individual's profile. There is no universal recipe. What the power curve offers is a precise diagnosis: it shows exactly where the bottleneck lies and, therefore, where training will yield the greatest return.

The curve also evolves over time. Comparing the current curve with one from three or six months ago allows you to assess whether training is producing the desired adaptations in the correct zone. An increase in CP with stable W' indicates aerobic improvement. An increase in W' with stable CP indicates anaerobic improvement. Both rising simultaneously is the signal that the training program is working in an integrated manner.

![Performance data and metrics dashboard — the power curve translates physiology into training decisions](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## It is not just a number

The power-duration curve transcends the simple recording of personal bests. It is a direct window into the cyclist's physiology, a map that shows which energy systems dominate, where the strengths lie, and where the deficits are. Combined with the critical power model, it enables race strategy planning, specific training design, and adaptation monitoring with a precision no other tool can match.

Morton (2006) argued that the critical power model is "the most validated and physiologically grounded" of all performance models in sport science. Decades of research bear that out. For the cyclist who trains with a power meter, understanding their curve is not an academic luxury. It is the foundation upon which all training and racing decisions are built.
