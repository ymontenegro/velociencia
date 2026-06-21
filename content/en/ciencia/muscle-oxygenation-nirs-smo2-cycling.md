---
title: "Muscle Oxygenation in Cycling: What a NIRS Sensor Actually Measures"
subtitle: "SmO₂ promises a direct window into muscle metabolism, but the modified Beer-Lambert law and subcutaneous fat have something important to say before you trust those numbers"
section: "ciencia"
date: "2026-06-21"
author: "Sofía Müller"
tags: ["NIRS", "SmO2", "muscle oxygenation", "physiology", "thresholds", "Moxy", "spectroscopy", "training science"]
sources:
  - title: "Muscle Oximetry in Sports Science: A Systematic Review — Perrey & Ferrari (2018)"
    url: "https://pubmed.ncbi.nlm.nih.gov/29177977/"
    type: pubmed
  - title: "Near-infrared spectroscopy and skeletal muscle oxidative function in vivo in health and disease — Grassi & Quaresima (2016)"
    url: "https://pubmed.ncbi.nlm.nih.gov/27443955/"
    type: pubmed
  - title: "Muscle Oxygen Saturation Breakpoints Reflect Ventilatory Thresholds in Both Cycling and Running — Feldmann et al. (2022)"
    url: "https://pubmed.ncbi.nlm.nih.gov/36157967/"
    type: pubmed
  - title: "Near infrared brain and muscle oximetry: from the discovery to current applications — Ferrari & Quaresima (2012)"
    url: "https://journals.sagepub.com/doi/10.1255/jnirs.973"
    type: doi
  - title: "Validity and reliability of the Moxy oxygen monitor during incremental cycling exercise — Crum et al. (2017)"
    url: "https://pubmed.ncbi.nlm.nih.gov/28557670/"
    type: pubmed
  - title: "Near-infrared spectroscopy-derived muscle oxygen saturation on a 0% to 100% scale: reliability and validity of the Moxy Monitor — Feldmann, Schmitz & Erlacher (2019)"
    url: "https://pubmed.ncbi.nlm.nih.gov/31741352/"
    type: pubmed
excerpt: "A coin-sized sensor taped to the quadriceps can measure muscle oxygen saturation in real time. Near-infrared spectroscopy (NIRS) has been a fixture in exercise physiology labs for over a decade and is now available in consumer devices like the Moxy. But before you interpret those numbers, you need to understand what the sensor actually measures, when it fails, and what it can and cannot tell a cyclist about their training."
coverImage: "https://images.unsplash.com/photo-1709601415546-dcd24c912e56?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
translationOf: "oxigenacion-muscular-nirs-smo2-ciclismo"
---

## A sensor taped to the quadriceps

During an incremental cycling test in the laboratory, a NIRS sensor records a data point every two seconds from the vastus lateralis: how much oxygen the local hemoglobin is carrying at that precise moment in that precise volume of muscle. Near-infrared spectroscopy works in the 700–900 nanometer wavelength range, a region of the spectrum where light penetrates biological tissue — skin, fat, and muscle — several centimeters before being absorbed or scattered back toward the detector. Unlike a fingertip pulse oximeter, which measures systemic arterial oxygen saturation in flowing blood, the NIRS sensor interrogates the muscle tissue directly: it reads what is happening at the distal end of the oxygen supply chain, where the mitochondria consume it. Perrey and Ferrari described the method in their 2018 systematic review in *Sports Medicine* (PMID 29177977) as a tool providing unprecedented insight into muscle metabolism under real sports conditions.

## The physics: the modified Beer-Lambert law

The mathematical foundation of NIRS is the Beer-Lambert law, which in its classical form relates light absorbance to solute concentration and optical path length. In biological tissue, where light does not travel in a straight line but scatters repeatedly off cell membranes, the classical model must be modified to account for that scattering:

$$\Delta A_\lambda = \varepsilon_\lambda \cdot \Delta c \cdot d \cdot DPF$$

Here, $\Delta A_\lambda$ is the change in absorbance at wavelength $\lambda$; $\varepsilon_\lambda$ is the molar extinction coefficient of the chromophore (a known constant); $\Delta c$ is the change in chromophore concentration; $d$ is the physical separation between emitter and detector (the inter-optode distance); and $DPF$ is the differential path length factor, which empirically corrects for how much longer the actual light path is compared to the geometric distance between the optodes. The $DPF$ varies with tissue type, individual, and wavelength: in adult skeletal muscle it falls between 4 and 6, but its exact value is not measured in each case — a literature-based average is assumed, introducing a source of imprecision that affects absolute calibration.

## What it actually measures: SmO₂ and tHb

The two chromophores that dominate infrared light absorption in muscle are oxyhemoglobin ($[HbO_2]$) and deoxyhemoglobin ($[HHb]$). From their signals, the device calculates two primary parameters: muscle oxygen saturation (SmO₂) and total hemoglobin (tHb):

$$\text{SmO}_2 = \frac{[HbO_2]}{[HbO_2] + [HHb]} \times 100\%$$

$$\text{tHb} = [HbO_2] + [HHb]$$

A technical nuance that popular accounts frequently overlook is that myoglobin — the oxygen-binding protein housed inside muscle fibers themselves — has a nearly identical absorption spectrum to hemoglobin in the near-infrared window. The sensor cannot distinguish the signal from one protein from that of the other, so the SmO₂ value reported actually includes the combined contribution of hemoglobin and myoglobin. Grassi and Quaresima noted in their 2016 review in *Journal of Biomedical Optics* (PMID 27443955) that the relative proportion of each protein in the NIRS signal remains actively debated, and that at high exercise intensities myoglobin may dominate the desaturation recorded. The tHb parameter, for its part, reflects changes in local blood volume: it rises when blood flows into the muscle and falls when muscular contraction collapses the capillaries, providing complementary information to SmO₂.

## SmO₂ as a marker of physiological thresholds

The most studied application of NIRS in cycling is identifying physiological thresholds from slope changes in the SmO₂ curve during an incremental test. Feldmann et al. (2022) published a study in *Journal of Human Kinetics* (PMID 36157967) with 10 participants (5 cyclists, 5 runners, ranging from recreational to moderately trained) who completed stepped incremental tests on a cycle ergometer and a treadmill, with simultaneous measurement of expired gases, blood lactate, and vastus lateralis NIRS. They identified two breakpoints in the SmO₂ curve — SmO₂-BP1 and SmO₂-BP2 — that showed moderate agreement with the first and second ventilatory thresholds (VT1 and VT2) according to Bland-Altman analysis; the minimum SmO₂ reached during cycling correlated with VO₂peak at R² = 0.85 (r ≈ 0.92), substantially weaker in running (R² = 0.27). The agreement was weaker in running than in cycling, which the authors attributed to greater variability in muscle recruitment patterns during running compared to the more constrained movement of pedaling.

<ChartLine
  title="SmO₂ desaturation during incremental test: representative patterns"
  caption="Schematic based on Feldmann et al. (2022) and typical values reported in the literature. BP1 and BP2 mark the approximate breakpoints corresponding to VT1 and VT2."
  data={[
    { power: "100 W", trained: 70, recreational: 70 },
    { power: "150 W", trained: 65, recreational: 62 },
    { power: "200 W", trained: 58, recreational: 50 },
    { power: "230 W", trained: 51, recreational: 40 },
    { power: "260 W", trained: 42, recreational: 29 },
    { power: "300 W", trained: 28, recreational: 18 },
    { power: "340 W", trained: 18, recreational: null }
  ]}
  xKey="power"
  lines={[
    { key: "trained", color: "#7C3AED", name: "Trained cyclist" },
    { key: "recreational", color: "#0891B2", name: "Recreational cyclist" }
  ]}
  unit=" %"
/>

At rest, SmO₂ values in trained cyclists typically range from 60 to 80 %, with high individual variability. During zone 2 work (moderate aerobic), the muscle desaturates to around 50–65 %; at powers approaching VT2 the signal continues falling to 30–45 %; and during maximal sustained efforts, trained athletes can reach values of 15–25 %. The post-exercise resaturation pattern — how quickly SmO₂ returns to baseline after pedaling stops — has been proposed as an index of local aerobic capacity, but evaluation protocols for this kinetic parameter are not standardized across laboratories, and its clinical interpretation remains preliminary.

## Wearable devices: Moxy and Train.Red

The Moxy Monitor, developed in Canada and commercially available since 2013, was the first consumer NIRS device designed specifically for sports training. Crum et al. (2017) evaluated its validity and reliability in *European Journal of Sport Science* (PMID 28557670) with 10 highly trained cyclists during an incremental test: SmO₂ showed moderate to high reliability at low intensities, but this decreased as relative exercise intensity increased, likely due to movement artifacts and variations in sensor pressure against the skin. Feldmann, Schmitz, and Erlacher (2019) validated the Moxy using the arterial occlusion method in *Journal of Biomedical Optics* (PMID 31741352) and concluded that relative within-session changes are reliable for training monitoring, but that absolute differences between sessions or between different devices can be methodologically relevant. Train.Red, released more recently, offers Bluetooth connectivity with training applications such as Zwift and allows simultaneous monitoring of multiple muscle sites, but independent peer-reviewed evidence on its measurement precision is currently more limited than what is available for the Moxy.

![Cyclist wearing a VO2 Master portable metabolic analyzer during an outdoor field test](https://images.unsplash.com/photo-1709601414337-373519366406?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

## Subcutaneous fat and movement artifacts: NIRS's two key limitations

Subcutaneous adipose tissue thickness (SCAT) is the best-documented and most overlooked limitation in the practical use of NIRS. The infrared light must pass through subcutaneous fat before reaching the muscle, and this tissue attenuates and scatters the signal in proportion to its thickness: Feldmann et al. (2019; PMID 31741352) found that SCAT explained up to R² = 0.80 of the variance in the minimum SmO₂ reached during complete arterial occlusion at the vastus lateralis using the Moxy. In practical terms, a cyclist with 14 mm of subcutaneous fat on the thigh will produce a systematically different SmO₂ curve from one with 6 mm, even if their physiological state is identical: the former will show higher resting values and a narrower desaturation range during exercise. This systematic bias means that comparing absolute SmO₂ values between individuals without adjusting for SCAT is methodologically questionable, and it is why published normative data should be treated as directional references rather than diagnostic thresholds.

Movement artifacts are the second major issue. The cyclical contraction of the quadriceps during pedaling produces microvibrations and changes in sensor-skin contact pressure that translate into spurious fluctuations in the signal; filtering algorithms built into consumer devices reduce this noise but do not eliminate it. Site-to-site variability is also relevant: SmO₂ recorded at the vastus lateralis differs from readings at the rectus femoris, gastrocnemius, or gluteus maximus, and muscle recruitment patterns shift with intensity, cadence, riding position, and accumulated fatigue. Finally, the absence of a standardized absolute calibration across manufacturers means that 55 % on a Moxy and 55 % on a Train.Red are not necessarily equivalent values; relative changes within the same device and session — deltas, slopes, breakpoints — are far more informative than raw absolute numbers.

<ChartBar
  title="SmO₂ coefficient of variation by subcutaneous adipose tissue thickness"
  caption="Representative values based on NIRS literature. Greater adipose tissue thickness increases signal noise and reduces the reliability of absolute SmO₂ values."
  data={[
    { group: "< 7 mm (thin)", cv: 3.1 },
    { group: "7–14 mm (medium)", cv: 6.4 },
    { group: "> 14 mm (thick)", cv: 11.2 }
  ]}
  xKey="group"
  bars={[{ key: "cv", color: "#7C3AED", name: "CV (%)" }]}
  unit=" %"
  layout="vertical"
/>

## Longitudinal tracking and field thresholds: the uses that hold up

For a cyclist with a NIRS device, the use with the strongest evidence base is longitudinal tracking of their own desaturation patterns at controlled intensities. Comparing SmO₂ at 250 W in June against the same value in September — with the same device, at the same measurement site, using the same sensor attachment method — provides information about changes in local oxidative capacity that does not depend on comparison with normative tables. Detecting the SmO₂-BP2 in an incremental field test is more reproducible than estimating VT2 from heart rate alone or perceived exertion alone, though it requires a standardized stepped-power protocol and appropriate signal smoothing. What the sensor cannot provide, given current technology and protocols, is an absolute SmO₂ value with universal meaning, or a substitute for a laboratory exercise test with expired gas analysis when diagnostic precision is what is needed.

NIRS is a training monitoring tool, not a precision physiological diagnostic system. When you understand what it measures — the local saturation of hemoglobin and myoglobin in a small volume of muscle, filtered through adipose tissue and subject to calibration variability — and what it does not measure — systemic metabolism, blood lactate, whole-body oxygen consumption — its use becomes more rigorous and, paradoxically, more useful.
