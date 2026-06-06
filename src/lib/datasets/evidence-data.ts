/**
 * Endurance-supplement evidence dataset — source of truth, versioned in git.
 *
 * GENERATED from `.work-datasets/03b-dataset.json` (19 supplements, 123
 * verified citations, dual-axis model: evidence_level × evidence_direction).
 * Every figure, PMID and DOI is copied verbatim from the verified research —
 * do NOT hand-edit numeric/citation values here; fix the source and regen.
 *
 * Localized prose lives in `{ es, en }` records. See `evidence.ts` for the
 * types, filtering and helpers consumed by the UI.
 */
import type { SupplementEntry } from "@/lib/datasets/evidence";

export const EVIDENCE: SupplementEntry[] = [
  {
    "id": "cafeina",
    "name": {
      "es": "Cafeína",
      "en": "Caffeine"
    },
    "category": "estimulante_snc",
    "evidence_level": "fuerte",
    "evidence_direction": "ergogenico",
    "confidence": "alta",
    "performance_effect": {
      "es": "Mejora consistente del rendimiento de resistencia aeróbica, la modalidad donde la cafeína muestra sus beneficios más sólidos (position stand ISSN, Guest 2021). En ciclismo reduce el tiempo de contrarreloj y aumenta la potencia media, sin alterar de forma fiable la FC. El efecto sobre la RPE es inconsistente: el meta-análisis de ciclismo de Wu 2026 no halló efecto agrupado significativo sobre RPE ni FC. Beneficio real pero de magnitud pequeña-moderada y con alta variabilidad interindividual, incluidos no respondedores.",
      "en": "Consistent improvement in aerobic endurance performance — caffeine's most reliable benefit (ISSN, Guest 2021). In cycling it reduces time-trial time and increases mean power, with no reliable effect on heart rate. Its classic RPE-lowering effect is not confirmed in the pooled cycling meta-analysis of Wu 2026. Real but small-to-moderate, with high inter-individual variability including non-responders."
    },
    "effect_size": {
      "es": "~2,2% mejora en tiempo de CRI y ~3% en potencia media (Southward 2018: TT -2,22 +/- 2,59%, ES 0,41; potencia +3,03 +/- 3,07%, ES 0,23). Meta-análisis de ciclismo: SMD aprox -0,36 tiempo y +0,29 potencia, sin efecto agrupado sobre RPE/FC (Wu 2026); dosis moderada 4-6 mg/kg ~2% superior a baja (Chen 2024, SMD -0,55 tiempo).",
      "en": "~2.2% improvement in TT time and ~3% in mean power (Southward 2018: TT -2.22 +/- 2.59%, ES 0.41; power +3.03 +/- 3.07%, ES 0.23). Cycling meta-analysis: SMD approx -0.36 time and +0.29 power, no pooled effect on RPE/HR (Wu 2026); moderate dose 4-6 mg/kg ~2% superior to low (Chen 2024, SMD -0.55 time)."
    },
    "mechanism": {
      "es": "Antagonismo de receptores de adenosina A1/A2A en el SNC, lo que reduce la percepción del esfuerzo y el dolor y aumenta el reclutamiento motor y la alerta. Esto explica por qué dosis bajas y hasta el enjuague bucal son ergogénicos. Los mecanismos periféricos (calcio muscular, movilización de ácidos grasos) hoy se consideran secundarios. Metabolismo principalmente por CYP1A2.",
      "en": "Antagonism of adenosine A1/A2A receptors in the CNS, which reduces perceived effort and pain and increases motor recruitment and alertness. This explains why low doses and even mouth rinsing are ergogenic. Peripheral mechanisms (muscle calcium, fatty acid mobilization) are now considered secondary. Metabolism primarily via CYP1A2."
    },
    "dosage": {
      "es": "3-6 mg/kg de cafeína anhidra (consenso COI Maughan 2018; ISSN Guest 2021). En CRI la dosis moderada 4-6 mg/kg fue eficaz; la baja 1-3 mg/kg no alcanzó significación (Chen 2024), aunque Wu 2026 sugiere beneficio con <=3 mg/kg. >=9 mg/kg no aporta extra y aumenta efectos secundarios. Mínima eficaz ~2 mg/kg.",
      "en": "3-6 mg/kg of anhydrous caffeine (IOC consensus Maughan 2018; ISSN Guest 2021). In TT, moderate dose 4-6 mg/kg was effective; low dose 1-3 mg/kg did not reach significance (Chen 2024), although Wu 2026 suggests benefit with <=3 mg/kg. >=9 mg/kg provides no additional benefit and increases side effects. Minimum effective ~2 mg/kg."
    },
    "timing": {
      "es": "~60 min antes (pico plasmático 45-60 min). Dosis bajas (<3 mg/kg) pueden tomarse durante el esfuerzo, idealmente con carbohidratos; en pruebas muy largas, ingerirla en fases tardías puede ser preferible para algunos atletas.",
      "en": "~60 min before (plasma peak 45-60 min). Low doses (<3 mg/kg) can be taken during exercise, ideally with carbohydrates; in very long events, taking it in later phases may be preferable for some athletes."
    },
    "who_benefits": {
      "es": "Atletas de resistencia, con el efecto más consistente en esfuerzos aeróbicos. Los consumidores habituales conservan gran parte del efecto. La hipótesis CYP1A2 (rs762551) sugiere mayor beneficio en metabolizadores rápidos (alelo A) frente al alelo C, pero múltiples RCT no replican la interacción y el genotipado sigue debatido.",
      "en": "Endurance athletes, with the most consistent effect in aerobic efforts. Habitual consumers retain much of the effect. The CYP1A2 hypothesis (rs762551) suggests greater benefit in fast metabolizers (A allele) compared to the C allele, but multiple RCTs do not replicate the interaction and genotyping remains debated."
    },
    "caveats": {
      "es": "Magnitud pequeña-moderada con marcada variabilidad (hay no respondedores e incluso empeoramientos). Más no es mejor: >6 mg/kg no añade rendimiento. La afirmación de 'menor RPE' no se sostiene de forma agrupada en ciclismo (Wu 2026). 'Fuerte' = robustez de la evidencia, NO tamaño de efecto grande. Probar en entrenamiento y cuidar la hora de ingesta por el sueño.",
      "en": "Small-to-moderate magnitude with marked variability (there are non-responders and even performance decrements). More is not better: >6 mg/kg adds no performance benefit. The claim of 'lower RPE' is not supported on a pooled basis in cycling (Wu 2026). 'Strong' = robustness of evidence, NOT large effect size. Test in training and be mindful of intake timing due to sleep."
    },
    "side_effects": {
      "es": "Insomnio y deterioro del sueño (tomas vespertinas o dosis altas), ansiedad/nerviosismo (gen ADORA2A), taquicardia y subida de PA, molestias GI, temblor, cefalea, irritabilidad. Los adversos crecen con dosis altas sin beneficio añadido.",
      "en": "Insomnia and sleep impairment (evening intake or high doses), anxiety/nervousness (ADORA2A gene), tachycardia and increased blood pressure, GI discomfort, tremor, headache, irritability. Adverse effects increase with high doses without added benefit."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "monitoreo",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "The Effect of Acute Caffeine Ingestion on Endurance Performance: A Systematic Review and Meta-Analysis",
        "first_author": "Southward K",
        "year": 2018,
        "journal": "Sports Medicine",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "29876876",
        "doi": "10.1007/s40279-018-0939-8",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29876876/",
        "key_finding": {
          "es": "En 46 estudios, 3-6 mg/kg mejoró el TT ~2,22 +/- 2,59% (ES 0,41) y la potencia media ~3,03 +/- 3,07% (ES 0,23), con respondedores y no respondedores.",
          "en": "In 46 studies, 3-6 mg/kg improved TT ~2.22 +/- 2.59% (ES 0.41) and mean power ~3.03 +/- 3.07% (ES 0.23), with responders and non-responders."
        }
      },
      {
        "title": "International society of sports nutrition position stand: caffeine and exercise performance",
        "first_author": "Guest NS",
        "year": 2021,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Position stand",
        "pmid": "33388079",
        "doi": "10.1186/s12970-020-00383-4",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33388079/",
        "key_finding": {
          "es": "La resistencia aeróbica es la modalidad con beneficios más consistentes; 3-6 mg/kg ~60 min pre; mínima eficaz ~2 mg/kg; 9 mg/kg no añade; la cafeína está en el Programa de Monitoreo de WADA.",
          "en": "Aerobic endurance is the modality with the most consistent benefits; 3-6 mg/kg ~60 min pre; minimum effective ~2 mg/kg; 9 mg/kg adds nothing; caffeine is on WADA's Monitoring Program."
        }
      },
      {
        "title": "IOC consensus statement: dietary supplements and the high-performance athlete",
        "first_author": "Maughan RJ",
        "year": 2018,
        "journal": "British Journal of Sports Medicine",
        "study_type": "Declaración de consenso (IOC)",
        "pmid": "29540367",
        "doi": "10.1136/bjsports-2018-099027",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29540367/",
        "key_finding": {
          "es": "La cafeína está entre los pocos suplementos (con creatina, agentes tampón y nitrato) con buena evidencia de beneficio directo sobre el rendimiento.",
          "en": "Caffeine is among the few supplements (along with creatine, buffering agents and nitrate) with good evidence of direct performance benefit."
        }
      },
      {
        "title": "Effect of caffeine ingestion on time trial performance in cyclists: a systematic review and meta-analysis",
        "first_author": "Chen B",
        "year": 2024,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "38836626",
        "doi": "10.1080/15502783.2024.2363789",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38836626/",
        "key_finding": {
          "es": "La dosis moderada 4-6 mg/kg mejoró la CRI (SMD -0,55 tiempo; +0,44 potencia); la baja 1-3 mg/kg no alcanzó significación. Chen NO analiza RPE ni FC (lo declara como limitación).",
          "en": "Moderate dose 4-6 mg/kg improved TT (SMD -0.55 time; +0.44 power); low dose 1-3 mg/kg did not reach significance. Chen did NOT analyze RPE or HR (stated as a limitation)."
        }
      },
      {
        "title": "Caffeine ingestion improves cycling time-trial performance: a systematic review and meta-analysis",
        "first_author": "Wu S",
        "year": 2026,
        "journal": "Frontiers in Nutrition",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": null,
        "doi": "10.3389/fnut.2025.1745472",
        "url": "https://doi.org/10.3389/fnut.2025.1745472",
        "key_finding": {
          "es": "Meta-análisis específico de ciclismo: la cafeína mejora el tiempo y la potencia en CRI, pero NO produce efecto agrupado significativo sobre la RPE ni la frecuencia cardiaca. Es la fuente correcta del claim de ausencia de efecto RPE/FC.",
          "en": "Cycling-specific meta-analysis: caffeine improves time and power in TT, but does NOT produce a significant pooled effect on RPE or heart rate. This is the correct source for the claim of no RPE/HR effect."
        }
      },
      {
        "title": "Does ergogenic effect of caffeine depend on CYP1A2 genotypes? A systematic review with meta-analysis",
        "first_author": "Wang J",
        "year": 2024,
        "journal": "Journal of Sport and Health Science",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "38158179",
        "doi": "10.1016/j.jshs.2023.12.005",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38158179/",
        "key_finding": {
          "es": "En 12 estudios (n=666), mejora de la CRI de ciclismo solo en el alelo A (~5,8%) y no en el alelo C (~0,6%, ns); sin efecto en Wingate ni salto.",
          "en": "In 12 studies (n=666), improvement in cycling TT only in the A allele (~5.8%) and not in the C allele (~0.6%, ns); no effect on Wingate or jump."
        }
      },
      {
        "title": "Caffeine, CYP1A2 Genotype, and Endurance Performance in Athletes",
        "first_author": "Guest N",
        "year": 2018,
        "journal": "Medicine & Science in Sports & Exercise",
        "study_type": "ECA",
        "pmid": "29509641",
        "doi": "10.1249/MSS.0000000000001596",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29509641/",
        "key_finding": {
          "es": "TT 10 km con 4 mg/kg: el genotipo AA mejoró -6,8%, el CC empeoró +13,7% y el AC no mostró efecto.",
          "en": "10 km TT with 4 mg/kg: AA genotype improved -6.8%, CC worsened +13.7% and AC showed no effect."
        }
      }
    ]
  },
  {
    "id": "nitratos-remolacha",
    "name": {
      "es": "Nitratos (jugo de remolacha)",
      "en": "Nitrate (beetroot juice)"
    },
    "category": "nitrico_vasodilatador",
    "evidence_level": "moderada",
    "evidence_direction": "ergogenico",
    "confidence": "media",
    "performance_effect": {
      "es": "Mejora la economía de O2 (menor VO2 a igual potencia submáxima) y extiende el TTE, con efecto más consistente en alta intensidad / media duración (~4-30 min) e intermitente. En contrarreloj el efecto es pequeño e inconsistente y se desvanece al aumentar el nivel de entrenamiento y la duración. Paradoja central: beneficio claro en recreativos y submáximo, pero los ciclistas de élite (VO2max >65) responden poco o nada por techo fisiológico. Ayuda real pero modesta.",
      "en": "Improves oxygen economy and extends time to exhaustion, most consistently in high-intensity, medium-duration (~4-30 min) and intermittent efforts. The time-trial effect is small/inconsistent and fades with training level and duration. Clear benefit in recreational athletes; little-to-none in elite cyclists (ceiling effect). Real but modest."
    },
    "effect_size": {
      "es": "TTE SMD ~0,33 (Poon 2025); +14% y +12% con 8,4 y 16,8 mmol (Wylie 2013). CRI 5-30 min: trivial-pequeño (Hedges g ~0,15-0,30; ~37% estudios significativos vs 62% nulos, Wong 2022). CRI 30-60 min y VO2max: ns. 10 km TT entrenados: ~1,2% (Cermak 2012). 50 millas élite: -0,8% ns (Wilkerson 2012). Tian 2025 reporta TTE overall SMD 0,37.",
      "en": "TTE SMD ~0.33 (Poon 2025); +14% and +12% with 8.4 and 16.8 mmol (Wylie 2013). TT 5-30 min: trivial-small (Hedges g ~0.15-0.30; ~37% studies significant vs 62% null, Wong 2022). TT 30-60 min and VO2max: ns. 10 km TT trained: ~1.2% (Cermak 2012). 50 miles elite: -0.8% ns (Wilkerson 2012). Tian 2025 reports TTE overall SMD 0.37."
    },
    "mechanism": {
      "es": "El NO3- se reduce a nitrito por bacterias bucales y luego a NO en los tejidos (vía complementaria a la NO-sintasa, potenciada en hipoxia/acidosis). Mejora la eficiencia mitocondrial, reduce el coste de O2, modula el calcio y la perfusión (preferente en fibras tipo II). El pico de nitrito plasmático ocurre ~2-3 h tras la ingesta.",
      "en": "NO3- is reduced to nitrite by oral bacteria and then to NO in tissues (pathway complementary to NO-synthase, enhanced in hypoxia/acidosis). Improves mitochondrial efficiency, reduces O2 cost, modulates calcium and perfusion (preferentially in type II fibers). Plasma nitrite peaks ~2-3 h after ingestion."
    },
    "dosage": {
      "es": "Aguda 6-8 mmol NO3- (~350-560 mg, ~1 shot de concentrado). Meseta: 8,4 mmol da el máximo; 16,8 mmol no añade (Wylie 2013). Carga (más eficaz para TTE): 6-8 mmol/día por 3-6 días + dosis extra el día de la prueba. Evitar <5 mmol.",
      "en": "Acute 6-8 mmol NO3- (~350-560 mg, ~1 concentrated shot). Plateau: 8.4 mmol gives the maximum; 16.8 mmol adds nothing (Wylie 2013). Loading (more effective for TTE): 6-8 mmol/day for 3-6 days + extra dose on race day. Avoid <5 mmol."
    },
    "timing": {
      "es": "Aguda 2-3 h antes (pico de nitrito). Carga: 6-8 mmol/día por 3-6 días + dosis 2,5-3 h pre. CRÍTICO: evitar enjuagues bucales antibacterianos, que eliminan las bacterias comensales y anulan el efecto.",
      "en": "Acute 2-3 h before (nitrite peak). Loading: 6-8 mmol/day for 3-6 days + dose 2.5-3 h pre. CRITICAL: avoid antibacterial mouth rinses, which eliminate commensal bacteria and nullify the effect."
    },
    "who_benefits": {
      "es": "Recreativos y moderadamente entrenados; submáximo, alta intensidad de media duración, esfuerzos intermitentes. Diluido o nulo en élite muy entrenada. Variabilidad por microbiota oral, estatus basal de nitrato y composición de fibras.",
      "en": "Recreational and moderately trained athletes; submaximal, high-intensity medium-duration, intermittent efforts. Diluted or null in highly trained elite. Variability due to oral microbiota, baseline nitrate status and fiber composition."
    },
    "caveats": {
      "es": "Evidencia moderada (no fuerte) para resistencia: las umbrella reviews 2025 (Poon, Tian) y Wong 2022 coinciden en que el efecto en CRI y VO2max es trivial/ns, mientras que el TTE y la economía mejoran poco. Gran heterogeneidad y variabilidad del contenido real de nitrato en productos. Discrepancia menor: Tian 2025 reporta TTE overall 0,37, no 0,25.",
      "en": "Moderate evidence (not strong) for endurance: umbrella reviews 2025 (Poon, Tian) and Wong 2022 agree that the effect on TT and VO2max is trivial/ns, while TTE and economy improve slightly. High heterogeneity and variability in actual nitrate content of products. Minor discrepancy: Tian 2025 reports TTE overall 0.37, not 0.25."
    },
    "side_effects": {
      "es": "Bien tolerado. Beeturia (orina/heces rojizas) inofensiva; molestias GI leves (zumo entero, alto en FODMAPs). Precaución teórica con vasodilatadores (nitratos médicos, inhibidores PDE5). El enjuague antibacteriano anula el beneficio.",
      "en": "Well tolerated. Beeturia (red urine/stools) is harmless; mild GI discomfort (whole juice, high in FODMAPs). Theoretical caution with vasodilators (medical nitrates, PDE5 inhibitors). Antibacterial mouth rinse nullifies the benefit."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "Dietary Nitrate Supplementation and Exercise Performance: An Umbrella Review of 20 Systematic Reviews with Meta-analyses",
        "first_author": "Poon ET-C",
        "year": 2025,
        "journal": "Sports Medicine",
        "study_type": "Umbrella review",
        "pmid": "40085422",
        "doi": "10.1007/s40279-025-02179-5",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40085422/",
        "key_finding": {
          "es": "20 SR (180 estudios, 2672 participantes): TTE SMD 0,33 y distancia 0,42; CRI ns (-0,03) y VO2max ns (-0,10); más beneficio en no-atletas (efecto techo); la higiene oral antibacteriana reduce el efecto.",
          "en": "20 SRs (180 studies, 2672 participants): TTE SMD 0.33 and distance 0.42; TT ns (-0.03) and VO2max ns (-0.10); greater benefit in non-athletes (ceiling effect); antibacterial oral hygiene reduces the effect."
        }
      },
      {
        "title": "Effects of Beetroot Juice on Physical Performance: An Umbrella Review",
        "first_author": "Tian C",
        "year": 2025,
        "journal": "Nutrients",
        "study_type": "Umbrella review",
        "pmid": "40573069",
        "doi": "10.3390/nu17132195",
        "url": "https://pubmed.ncbi.nlm.nih.gov/40573069/",
        "key_finding": {
          "es": "No-atletas: resistencia aeróbica SMD 0,26, TTE overall SMD 0,37; VO2max bajo el umbral relevante (0,16). Los profesionales se benefician más en fuerza. Aguda 2-3 h supera a la carga crónica.",
          "en": "Non-athletes: aerobic endurance SMD 0.26, TTE overall SMD 0.37; VO2max below the relevant threshold (0.16). Professionals benefit more in strength. Acute 2-3 h surpasses chronic loading."
        }
      },
      {
        "title": "Effects of nitrate ingestion on high-intensity endurance time-trial performance: a systematic review and meta-analysis",
        "first_author": "Wong TH",
        "year": 2022,
        "journal": "Journal of Exercise Science & Fitness",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "35892115",
        "doi": "10.1016/j.jesf.2022.07.002",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35892115/",
        "key_finding": {
          "es": "CRI 5-30 min trivial (Hedges g 0,15; crónica 0,30); 30-60 min sin beneficio; 37,5% de estudios con mejora, 62,5% nulos; la élite muestra respuesta disminuida.",
          "en": "TT 5-30 min trivial (Hedges g 0.15; chronic 0.30); 30-60 min no benefit; 37.5% of studies with improvement, 62.5% null; elite shows diminished response."
        }
      },
      {
        "title": "Beetroot juice and exercise: pharmacodynamic and dose-response relationships",
        "first_author": "Wylie LJ",
        "year": 2013,
        "journal": "Journal of Applied Physiology",
        "study_type": "ECA",
        "pmid": "23640589",
        "doi": "10.1152/japplphysiol.00372.2013",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23640589/",
        "key_finding": {
          "es": "Nitrito plasmático dosis-dependiente con pico a 2-3 h; 4,2 mmol no mejoró; 8,4 mmol +14% y 16,8 mmol +12% TTE (meseta).",
          "en": "Plasma nitrite dose-dependent with peak at 2-3 h; 4.2 mmol did not improve; 8.4 mmol +14% and 16.8 mmol +12% TTE (plateau)."
        }
      },
      {
        "title": "Nitrate supplementation's improvement of 10-km time-trial performance in trained cyclists",
        "first_author": "Cermak NM",
        "year": 2012,
        "journal": "International Journal of Sport Nutrition and Exercise Metabolism",
        "study_type": "ECA",
        "pmid": "22248502",
        "doi": "10.1123/ijsnem.22.1.64",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22248502/",
        "key_finding": {
          "es": "12 ciclistas (VO2peak ~58), 6 días ~8 mmol/día: TT 10 km 953 vs 965 s (~1,2%), potencia 294 vs 288 W, menor VO2 submáximo.",
          "en": "12 cyclists (VO2peak ~58), 6 days ~8 mmol/day: 10 km TT 953 vs 965 s (~1.2%), power 294 vs 288 W, lower submaximal VO2."
        }
      },
      {
        "title": "Influence of acute dietary nitrate supplementation on 50 mile time trial performance in well-trained cyclists",
        "first_author": "Wilkerson DP",
        "year": 2012,
        "journal": "European Journal of Applied Physiology",
        "study_type": "ECA",
        "pmid": "22526247",
        "doi": "10.1007/s00421-012-2382-0",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22526247/",
        "key_finding": {
          "es": "8 ciclistas bien entrenados, dosis aguda 0,5 L 2,5 h antes: TT 50 millas 136,7 vs 137,9 min (-0,8%) ns; más entrenamiento + más duración = menor respuesta.",
          "en": "8 well-trained cyclists, acute dose 0.5 L 2.5 h before: 50-mile TT 136.7 vs 137.9 min (-0.8%) ns; more training + longer duration = lower response."
        }
      },
      {
        "title": "IOC consensus statement: dietary supplements and the high-performance athlete",
        "first_author": "Maughan RJ",
        "year": 2018,
        "journal": "British Journal of Sports Medicine",
        "study_type": "Declaración de consenso (IOC)",
        "pmid": "29540367",
        "doi": "10.1136/bjsports-2018-099027",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29540367/",
        "key_finding": {
          "es": "El nitrato dietético está entre los pocos suplementos con buena evidencia de beneficio directo; ~5-9 mmol con uso en escenarios concretos de alta intensidad/media duración.",
          "en": "Dietary nitrate is among the few supplements with good evidence of direct benefit; ~5-9 mmol with use in specific scenarios of high intensity/medium duration."
        }
      }
    ]
  },
  {
    "id": "bicarbonato-sodio",
    "name": {
      "es": "Bicarbonato de sodio",
      "en": "Sodium bicarbonate"
    },
    "category": "tampon_ph",
    "evidence_level": "fuerte",
    "evidence_direction": "ergogenico",
    "confidence": "alta",
    "performance_effect": {
      "es": "Mejora esfuerzos de alta intensidad de ~30 s a 12 min y repeticiones con recuperación corta (sprints, ataques, subidas, finales). En ciclismo, dos RCT recientes con mini-comprimidos en hidrogel de CHO mostraron mejoras reproducibles: ~1,4% (54 s) en CRI 40 km y ~5 s en la primera de unas CRI repetidas de 4 km. El consenso ISSN respalda ciclismo, remo, natación, medio fondo e intermitentes. En fondo aeróbico puro el efecto es marginal/ns.",
      "en": "Improves high-intensity efforts of ~30 s to 12 min and repeated bouts with short recovery. Two 2024 cycling RCTs with carbohydrate-hydrogel mini-tablets showed reproducible gains: ~1.4% (54 s) over 40 km and ~5 s in the first of repeated 4 km TTs. ISSN supports cycling, rowing, swimming, middle-distance and intermittent sports. Marginal/non-significant for pure aerobic endurance."
    },
    "effect_size": {
      "es": "~0,8-1,4% en CRI de ciclismo (40 km: 1,42%, p=0,002; ~5 s en la primera de las CRI de 4 km, Gough 2024). Umbrella review: ES agrupado ~0,40 (pequeño-moderado) para 45 s-8 min; rango 0,09-1,26. Carrera continua: SMD 0,18 (IC -0,01 a 0,36; p=0,06) ns (Miller 2025).",
      "en": "~0.8-1.4% in cycling TT (40 km: 1.42%, p=0.002; ~5 s in the first of the 4 km TTs, Gough 2024). Umbrella review: pooled ES ~0.40 (small-to-moderate) for 45 s-8 min; range 0.09-1.26. Continuous running: SMD 0.18 (CI -0.01 to 0.36; p=0.06) ns (Miller 2025)."
    },
    "mechanism": {
      "es": "Eleva el bicarbonato plasmático generando alcalosis metabólica extracelular, lo que aumenta el gradiente de H+ y favorece la salida de H+/lactato del músculo vía los transportadores MCT1/MCT4. Mejora la regulación del pH intramuscular, sostiene la glucólisis y la producción de ATP, atenúa las alteraciones de potasio y preserva la excitabilidad del sarcolema. Es un mecanismo extracelular: beneficia esfuerzos limitados por la acidosis glucolítica.",
      "en": "Raises plasma bicarbonate generating extracellular metabolic alkalosis, which increases the H+ gradient and promotes H+/lactate efflux from muscle via MCT1/MCT4 transporters. Improves intramuscular pH regulation, sustains glycolysis and ATP production, attenuates potassium disturbances and preserves sarcolemmal excitability. It is an extracellular mechanism: it benefits efforts limited by glycolytic acidosis."
    },
    "dosage": {
      "es": "0,2-0,5 g/kg. Óptima aguda ~0,3 g/kg (0,2 g/kg mínimo; >0,3 g/kg no añade y aumenta el distrés GI). Multi-día: 0,4-0,5 g/kg/día repartidos 3-7 días (menos GI el día de competencia).",
      "en": "0.2-0.5 g/kg. Optimal acute ~0.3 g/kg (0.2 g/kg minimum; >0.3 g/kg adds nothing and increases GI distress). Multi-day: 0.4-0.5 g/kg/day divided over 3-7 days (less GI on competition day)."
    },
    "timing": {
      "es": "Aguda 60-180 min antes (típico 90-120 min). El timing individualizado al pico de bicarbonato optimiza efecto y tolerancia. Tomar con comida rica en CHO, cápsulas entéricas o hidrogel reduce la irritación.",
      "en": "Acute 60-180 min before (typically 90-120 min). Individualized timing to the bicarbonate peak optimizes effect and tolerance. Taking with a CHO-rich meal, enteric capsules or hydrogel reduces irritation."
    },
    "who_benefits": {
      "es": "Pista, ciclocross, criteriums; final al sprint, ataques repetidos, subidas cortas; esfuerzos de 30 s-12 min limitados por acidosis. Las repeticiones con recuperación corta (3-6 min) responden mejor. El hidrogel beneficia a los sensibles a GI. Sinergia con beta-alanina y creatina. Mínimo en sprints únicos <30 s y fondo aeróbico >20 min.",
      "en": "Track, cyclocross, criteriums; sprint finish, repeated attacks, short climbs; 30 s-12 min efforts limited by acidosis. Repetitions with short recovery (3-6 min) respond better. Hydrogel benefits those sensitive to GI issues. Synergy with beta-alanine and creatine. Minimal in single sprints <30 s and aerobic endurance >20 min."
    },
    "caveats": {
      "es": "Marginal/nulo en fondo aeróbico puro (Miller 2025: SMD 0,18 ns). La mayoría de los estudios son en hombres (indirección para mujeres). Componente de expectativa/placebo. 'Fuerte' = robustez de la evidencia, no efecto grande (Shannon g=0,22; umbrella ~0,40). La afirmación de 'efectos mayores en protocolos multi-día' no está en el abstract de Grgic 2021 y se suprime hasta respaldarla con texto completo.",
      "en": "Marginal/null in pure aerobic endurance (Miller 2025: SMD 0.18 ns). Most studies are in men (indirectness for women). Expectation/placebo component. 'Strong' = robustness of evidence, not large effect (Shannon g=0.22; umbrella ~0.40). The claim of 'larger effects with multi-day protocols' is not in the Grgic 2021 abstract and is suppressed until supported by the full text."
    },
    "side_effects": {
      "es": "Distrés GI (hinchazón, náuseas, dolor abdominal, vómitos, diarrea) en ~30% es el principal limitante. Carga de sodio relevante en hipertensos. Mitigación: 0,2-0,3 g/kg, con comida alta en CHO, formulaciones entéricas/hidrogel, protocolo multi-día y ensayo previo en entrenamiento.",
      "en": "GI distress (bloating, nausea, abdominal pain, vomiting, diarrhea) in ~30% is the main limiting factor. Relevant sodium load for hypertensive individuals. Mitigation: 0.2-0.3 g/kg, with high-CHO meal, enteric/hydrogel formulations, multi-day protocol and prior testing in training."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "International society of sports nutrition position stand: sodium bicarbonate and exercise performance",
        "first_author": "Grgic J",
        "year": 2021,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Position stand",
        "pmid": "34503527",
        "doi": "10.1186/s12970-021-00458-w",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34503527/",
        "key_finding": {
          "es": "0,2-0,5 g/kg (óptimo ~0,3), 60-180 min antes; beneficios en esfuerzos de 30 s-12 min en ciclismo/remo/natación/atletismo; aditivo con beta-alanina y creatina; mecanismo de transportadores MCT; el distrés GI es el limitante.",
          "en": "0.2-0.5 g/kg (optimal ~0.3), 60-180 min before; benefits in 30 s-12 min efforts in cycling/rowing/swimming/athletics; additive with beta-alanine and creatine; MCT transporter mechanism; GI distress is the limiting factor."
        }
      },
      {
        "title": "Effects of sodium bicarbonate supplementation on exercise performance: an umbrella review",
        "first_author": "Grgic J",
        "year": 2021,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Umbrella review",
        "pmid": "34794476",
        "doi": "10.1186/s12970-021-00469-7",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34794476/",
        "key_finding": {
          "es": "ES agrupado ~0,40 para esfuerzos de 45 s-8 min; remo 2000 m; ejercicio intermitente; rango 0,09-1,26; no mejora la potencia media general, la fuerza ni los sprints repetidos; mayoría de estudios en hombres.",
          "en": "Pooled ES ~0.40 for 45 s-8 min efforts; 2000 m rowing; intermittent exercise; range 0.09-1.26; does not improve overall mean power, strength or repeated sprints; majority of studies in men."
        }
      },
      {
        "title": "Sodium bicarbonate mini-tablets ingested in a carbohydrate hydrogel system improve 40 km cycling time-trial performance",
        "first_author": "Shannon ES",
        "year": 2024,
        "journal": "European Journal of Applied Physiology",
        "study_type": "ECA",
        "pmid": "39068627",
        "doi": "10.1007/s00421-024-05545-9",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39068627/",
        "key_finding": {
          "es": "14 ciclistas, 0,3 g/kg en hidrogel: CRI 40 km +54,1 s (1,42%, p=0,002, g=0,22), 12/14 mejoraron, el distrés GI no difirió del placebo.",
          "en": "14 cyclists, 0.3 g/kg in hydrogel: 40 km TT +54.1 s (1.42%, p=0.002, g=0.22), 12/14 improved, GI distress did not differ from placebo."
        }
      },
      {
        "title": "A Novel Sodium Bicarbonate Ingestion System Improves Repeated 4 km Cycling Time-Trial Performance",
        "first_author": "Gough LA",
        "year": 2024,
        "journal": "Sports Medicine",
        "study_type": "ECA",
        "pmid": "39122982",
        "doi": "10.1007/s40279-024-02085-2",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39122982/",
        "key_finding": {
          "es": "0,3 g/kg en hidrogel administrado al pico individual de bicarbonato: ~5 s más rápido en la primera CRI de 4 km y -4,4 s en la segunda vs control, con bajo distrés GI.",
          "en": "0.3 g/kg in hydrogel administered at the individual bicarbonate peak: ~5 s faster in the first 4 km TT and -4.4 s in the second vs control, with low GI distress."
        }
      },
      {
        "title": "Sodium bicarbonate and beta-alanine supplementation: is combining both better than either alone? A systematic review and meta-analysis",
        "first_author": "Curran-Bowen T",
        "year": 2024,
        "journal": "Biology of Sport",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "38952910",
        "doi": "10.5114/biolsport.2024.134753",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38952910/",
        "key_finding": {
          "es": "10 estudios (243 sujetos): la combinación dio SMD 0,32 (p=0,02), mientras cada uno aislado fue ns (beta-alanina 0,18; bicarbonato 0,17).",
          "en": "10 studies (243 subjects): the combination yielded SMD 0.32 (p=0.02), while each alone was ns (beta-alanine 0.18; bicarbonate 0.17)."
        }
      },
      {
        "title": "Negligible benefit of oral single-dose sodium bicarbonate on continuous running performance: a systematic review with meta-analysis",
        "first_author": "Miller LE",
        "year": 2025,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "41416636",
        "doi": "10.1080/15502783.2025.2569878",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41416636/",
        "key_finding": {
          "es": "11 RCT (126 sujetos, 84% hombres): beneficio negligible en carrera continua (SMD 0,18; p=0,06); el subgrupo solo-hombres dio SMD 0,40.",
          "en": "11 RCTs (126 subjects, 84% men): negligible benefit in continuous running (SMD 0.18; p=0.06); the men-only subgroup yielded SMD 0.40."
        }
      }
    ]
  },
  {
    "id": "beta-alanina",
    "name": {
      "es": "Beta-alanina",
      "en": "Beta-alanine"
    },
    "category": "tampon_ph",
    "evidence_level": "moderada",
    "evidence_direction": "ergogenico",
    "confidence": "media",
    "performance_effect": {
      "es": "Eleva de forma robusta la carnosina muscular y mejora esfuerzos de alta intensidad de 1-4 min (ventana donde la acidosis limita). Para ciclismo: ataques, finales, CRI cortas y series repetidas, no resistencia aeróbica continua. La evidencia específica en ciclistas es heterogénea: protocolos crónicos clásicos (6,4 g/día x 4 sem) sin mejoras (revisión 2024), mientras que la carga de alta dosis 1 semana (20 g/día) preservó/mejoró la potencia en CRI en ciclistas World Tour. El consenso (AIS A, ISSN, COI) respalda un efecto real pero modesto, difícil de evidenciar en muy entrenados.",
      "en": "Robustly raises muscle carnosine, improving 1-4 min high-intensity efforts. Benefits attacks, finishes, short TTs and repeated bouts, not continuous aerobic endurance. Cycling-specific evidence is mixed: classic 6.4 g/day x 4 wk showed no benefit (2024 review); one-week 20 g/day loading preserved/improved TT power in World Tour cyclists. Real but modest, hard to demonstrate in highly trained athletes."
    },
    "effect_size": {
      "es": "Global pequeño (Saunders 2017: Hedges g ~0,18; IC 0,08-0,28), mayor en capacidad (~0,49) que en rendimiento (~0,10), con máximo en esfuerzos de 0,5-10 min. Ciclismo: ns en crónico 6,4 g/día; ~6% potencia media y ~2% distancia en CRI 10 min con 20 g/día x 7 días (Ávila-Gandía 2021); ~10 s más rápido en subida 4,5 km (Pérez-Piñero 2024).",
      "en": "Overall small (Saunders 2017: Hedges g ~0.18; CI 0.08-0.28), greater in capacity (~0.49) than in performance (~0.10), with maximum in 0.5-10 min efforts. Cycling: ns in chronic 6.4 g/day; ~6% mean power and ~2% distance in 10 min TT with 20 g/day x 7 days (Ávila-Gandía 2021); ~10 s faster in a 4.5 km climb (Pérez-Piñero 2024)."
    },
    "mechanism": {
      "es": "Precursor limitante de la carnosina muscular, que tampona H+ y frena la caída del pH en la glucólisis de alta intensidad. La suplementación crónica eleva la carnosina ~16 mmol/kg de masa seca, de forma casi universal (99,3% respondedores). Mayor relevancia en fibras tipo II.",
      "en": "Limiting precursor of muscle carnosine, which buffers H+ and slows pH decline during high-intensity glycolysis. Chronic supplementation raises carnosine ~16 mmol/kg dry mass, in an almost universal manner (99.3% responders). Greater relevance in type II fibers."
    },
    "dosage": {
      "es": "Carga crónica 3,2-6,4 g/día por 2-4+ semanas (mejor desde 4 sem), en tomas <=1,6 g o de liberación sostenida para evitar parestesia; alternativa de élite 20 g/día (4x5 g) por 7 días.",
      "en": "Chronic loading 3.2-6.4 g/day for 2-4+ weeks (better from 4 weeks), in doses <=1.6 g or sustained-release to avoid paresthesia; elite alternative 20 g/day (4x5 g) for 7 days."
    },
    "timing": {
      "es": "Sin timing agudo (acumulación crónica). Repartir las tomas con comidas durante semanas; mantenimiento ~1,2 g/día.",
      "en": "No acute timing (chronic accumulation). Distribute doses with meals over weeks; maintenance ~1.2 g/day."
    },
    "who_benefits": {
      "es": "Eventos con esfuerzos de 1-4 min o series repetidas (ruta en ataques/finales/CRI corta, pista, ciclocross, criterium, MTB XCO) y quienes parten de carnosina baja (vegetarianos, mujeres, fibras tipo I). Difícil de evidenciar en élite por efecto techo. Sinergia posible con bicarbonato.",
      "en": "Events with 1-4 min efforts or repeated series (road in attacks/finishes/short TT, track, cyclocross, criterium, MTB XCO) and those starting from low carnosine (vegetarians, women, type I fibers). Difficult to demonstrate in elite due to ceiling effect. Possible synergy with bicarbonate."
    },
    "caveats": {
      "es": "Evidencia en ciclismo mixta y limitada (revisión 2024: 3 estudios sin mejoras). Los positivos en World Tour tienen n muy pequeños (n=11) y dosis atípica. El beneficio robusto es en CAPACIDAD, no en RENDIMIENTO tipo CRI (el IC del componente rendimiento cruza el cero). No mejora la fuerza máxima ni esfuerzos no limitados por acidosis.",
      "en": "Evidence in cycling is mixed and limited (2024 review: 3 studies without improvements). The positives in World Tour have very small n (n=11) and atypical dosing. The robust benefit is in CAPACITY, not in PERFORMANCE-type TT (the CI for the performance component crosses zero). Does not improve maximum strength or efforts not limited by acidosis."
    },
    "side_effects": {
      "es": "Parestesia transitoria y benigna (hormigueo) con dosis únicas >800 mg; se atenúa fraccionando <=1,6 g o con liberación sostenida. Sin efectos adversos relevantes a dosis recomendadas. No causa molestias GI significativas. Datos a muy largo plazo limitados.",
      "en": "Transient and benign paresthesia (tingling) with single doses >800 mg; attenuated by dividing into <=1.6 g doses or with sustained release. No relevant adverse effects at recommended doses. Does not cause significant GI discomfort. Very long-term data are limited."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "International society of sports nutrition position stand: Beta-Alanine",
        "first_author": "Trexler ET",
        "year": 2015,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Position stand",
        "pmid": "26175657",
        "doi": "10.1186/s12970-015-0090-y",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26175657/",
        "key_finding": {
          "es": "4-6 g/día x 2-4+ sem elevan la carnosina hasta 64% (4 sem) y 80% (10 sem); efectos más marcados en CRI de 1-4 min; parestesia atenuable fraccionando la dosis.",
          "en": "4-6 g/day x 2-4+ weeks raise carnosine up to 64% (4 weeks) and 80% (10 weeks); effects most pronounced in 1-4 min TT; paresthesia attenuable by splitting the dose."
        }
      },
      {
        "title": "Beta-alanine supplementation to improve exercise capacity and performance: a systematic review and meta-analysis",
        "first_author": "Saunders B",
        "year": 2017,
        "journal": "British Journal of Sports Medicine",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "27797728",
        "doi": "10.1136/bjsports-2016-096396",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27797728/",
        "key_finding": {
          "es": "40 estudios, 1461 participantes: g global ~0,18; capacidad ~0,49 vs rendimiento ~0,10; máximo en 0,5-10 min; la duración modera el efecto (p=0,004).",
          "en": "40 studies, 1461 participants: overall g ~0.18; capacity ~0.49 vs performance ~0.10; maximum at 0.5-10 min; duration moderates the effect (p=0.004)."
        }
      },
      {
        "title": "The Muscle Carnosine Response to Beta-Alanine Supplementation: A Systematic Review with Bayesian Individual and Aggregate Data E-Max Model and Meta-Analysis",
        "first_author": "Rezende NS",
        "year": 2020,
        "journal": "Frontiers in Physiology",
        "study_type": "Meta-análisis bayesiano",
        "pmid": "32922303",
        "doi": "10.3389/fphys.2020.00913",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32922303/",
        "key_finding": {
          "es": "Eleva la carnosina ~16 mmol/kg de masa seca; 99,3% de respondedores; los protocolos habituales no saturan la respuesta.",
          "en": "Raises carnosine ~16 mmol/kg dry mass; 99.3% responders; standard protocols do not saturate the response."
        }
      },
      {
        "title": "Nutritional Ergogenic Aids in Cycling: A Systematic Review",
        "first_author": "Valiño-Marques A",
        "year": 2024,
        "journal": "Nutrients",
        "study_type": "Revisión sistemática",
        "pmid": "38892701",
        "doi": "10.3390/nu16111766",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38892701/",
        "key_finding": {
          "es": "3 estudios (6,4 g/día x 4 sem): ningún parámetro de ciclismo mejoró. Cita clave del descenso del veredicto a 'moderada' para ciclismo.",
          "en": "3 studies (6.4 g/day x 4 weeks): no cycling parameter improved. Key citation supporting the downgrade of the verdict to 'moderate' for cycling."
        }
      },
      {
        "title": "One-Week High-Dose beta-Alanine Loading Improves World Tour Cyclists' Time-Trial Performance",
        "first_author": "Ávila-Gandía V",
        "year": 2021,
        "journal": "Nutrients",
        "study_type": "ECA",
        "pmid": "34444703",
        "doi": "10.3390/nu13082543",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34444703/",
        "key_finding": {
          "es": "11 ciclistas (6 BA + 5 placebo), 20 g/día x 7 días: potencia en CRI 10 min +6,21% (p=0,046); preservó el rendimiento mientras el placebo cayó.",
          "en": "11 cyclists (6 BA + 5 placebo), 20 g/day x 7 days: power in 10 min TT +6.21% (p=0.046); preserved performance while the placebo group declined."
        }
      },
      {
        "title": "High-dose beta-Alanine supplementation improves uphill cycling performance in World Tour cyclists: a randomized controlled trial",
        "first_author": "Pérez-Piñero S",
        "year": 2024,
        "journal": "PLOS One",
        "study_type": "ECA",
        "pmid": null,
        "doi": "10.1371/journal.pone.0309404",
        "url": "https://doi.org/10.1371/journal.pone.0309404",
        "key_finding": {
          "es": "11 ciclistas, 20 g/día x 7 días: subida 4,5 km ~10 s más rápida (p=0,018) y mayor potencia relativa (p=0,045); potencia absoluta ns (p=0,100).",
          "en": "11 cyclists, 20 g/day x 7 days: 4.5 km climb ~10 s faster (p=0.018) and higher relative power (p=0.045); absolute power ns (p=0.100)."
        }
      }
    ]
  },
  {
    "id": "carbohidratos-durante",
    "name": {
      "es": "Carbohidratos durante el ejercicio",
      "en": "Carbohydrate during exercise"
    },
    "category": "metabolico_energetico",
    "evidence_level": "fuerte",
    "evidence_direction": "ergogenico",
    "confidence": "alta",
    "performance_effect": {
      "es": "Probablemente la ayuda nutricional más determinante en ciclismo de resistencia. En esfuerzos >1-2 h mejora de forma consistente la CRI y el TTE manteniendo la glucemia, sosteniendo la oxidación de CHO en fases tardías y preservando el glucógeno. El beneficio crece con la duración y se maximiza con carbohidratos de transporte múltiple (glucosa:fructosa) que superan la saturación de SGLT1. La cifra ancla ~2% en CRI procede de Temesi 2011.",
      "en": "Arguably the single most performance-determining nutritional aid in endurance cycling. During efforts >1-2 h it consistently improves time-trial and time-to-exhaustion by maintaining blood glucose, sustaining late-exercise CHO oxidation and sparing glycogen. Benefit scales with duration and is maximised with multiple transportable carbohydrates (glucose:fructose) bypassing SGLT1 saturation. The ~2% TT anchor figure comes from Temesi 2011."
    },
    "effect_size": {
      "es": "~2,0% en CRI y ~7,5% en submáximo+CRI (Temesi 2011, 50 estudios). Vandenbogaerde & Hopkins 2011 (88 estudios): rango +6% a -2% según el protocolo. Transporte múltiple: +8% glucosa:fructosa 2:1 vs glucosa sola, +19% vs placebo (Currell & Jeukendrup 2008). Dosis-respuesta curvilínea con ~4,7% a 78 g/h (Smith 2013).",
      "en": "~2.0% in TT and ~7.5% in submaximal+TT (Temesi 2011, 50 studies). Vandenbogaerde & Hopkins 2011 (88 studies): range +6% to -2% depending on protocol. Multiple transport: +8% glucose:fructose 2:1 vs glucose alone, +19% vs placebo (Currell & Jeukendrup 2008). Curvilinear dose-response with ~4.7% at 78 g/h (Smith 2013)."
    },
    "mechanism": {
      "es": "El CHO exógeno mantiene la glucemia y aporta sustrato cuando el glucógeno se depleciona. La glucosa se absorbe vía SGLT1 (satura a ~1 g/min, ~60 g/h); la fructosa usa GLUT5, por lo que combinar ambos eleva la oxidación a ~1,3-1,75 g/min (~90-105 g/h) y reduce el CHO no absorbido que causa distrés GI. El entrenamiento del intestino aumenta SGLT1 (señalizado por T1R2/T1R3 y gustducina) y mejora el confort en <=2 semanas.",
      "en": "Exogenous CHO maintains blood glucose and provides substrate when glycogen is depleted. Glucose is absorbed via SGLT1 (saturates at ~1 g/min, ~60 g/h); fructose uses GLUT5, so combining both raises oxidation to ~1.3-1.75 g/min (~90-105 g/h) and reduces unabsorbed CHO causing GI distress. Gut training increases SGLT1 (signaled by T1R2/T1R3 and gustducin) and improves comfort within <=2 weeks."
    },
    "dosage": {
      "es": "~30-60 g/h en esfuerzos de ~1-2,5 h (solución 6-8%, cada 10-15 min). Hasta ~90 g/h en >2,5-3 h con glucosa:fructosa (~2:1 clásico; ~1:0,8 moderno). Óptimo derivado ~68-88 g/h (pico ~78 g/h, Smith 2013). Tendencia profesional a >=100-120 g/h, pero su superioridad sobre 60-90 g/h no está resuelta (Wilson 2026).",
      "en": "~30-60 g/h in efforts of ~1-2.5 h (6-8% solution, every 10-15 min). Up to ~90 g/h in >2.5-3 h with glucose:fructose (~2:1 classic; ~1:0.8 modern). Derived optimal ~68-88 g/h (peak ~78 g/h, Smith 2013). Professional trend toward >=100-120 g/h, but its superiority over 60-90 g/h is unresolved (Wilson 2026)."
    },
    "timing": {
      "es": "Empezar pronto y dosificar cada 10-15-20 min, sin esperar a la fatiga; el beneficio aparece a partir de ~70-90 min. Para >=90 g/h conviene hacer 'entrenamiento del intestino' y ensayar el protocolo antes de competir.",
      "en": "Start early and dose every 10-15-20 min, without waiting for fatigue; the benefit appears from ~70-90 min. For >=90 g/h, gut training is recommended and the protocol should be tested before competing."
    },
    "who_benefits": {
      "es": "Resistencia >1-2 h, especialmente en ayuno o baja disponibilidad de glucógeno e intensidades >70% VO2max. Los esfuerzos >2,5 h se benefician más de ingestas altas y transporte múltiple. La tolerancia GI es individual y entrenable.",
      "en": "Endurance >1-2 h, especially in fasting or low glycogen availability and intensities >70% VO2max. Efforts >2.5 h benefit more from high intakes and multiple transport. GI tolerance is individual and trainable."
    },
    "caveats": {
      "es": "Beneficio escaso/nulo en <60-70 min. Limitante de las ingestas altas: distrés GI por CHO no absorbido (clave el ratio glucosa:fructosa y el entrenamiento del intestino). La superioridad de >=100-120 g/h no está resuelta. Calidad metodológica baja en muchas revisiones (AMSTAR2, Tarrit 2026). La cifra ancla ~2% TT ahora se atribuye correctamente a Temesi 2011 (no a la conflación previa).",
      "en": "Little/no benefit in <60-70 min. Limiting factor for high intakes: GI distress from unabsorbed CHO (glucose:fructose ratio and gut training are key). Superiority of >=100-120 g/h is unresolved. Low methodological quality in many reviews (AMSTAR2, Tarrit 2026). The anchor figure ~2% TT is now correctly attributed to Temesi 2011 (not to the previous conflation)."
    },
    "side_effects": {
      "es": "Molestias GI dosis-dependientes; hipoglucemia de rebote si se ingiere una gran carga en la hora previa; aporte calórico elevado fuera de competición.",
      "en": "Dose-dependent GI discomfort; rebound hypoglycemia if a large load is ingested in the hour before; high caloric intake outside competition."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "Carbohydrate ingestion during endurance exercise improves performance in adults",
        "first_author": "Temesi J",
        "year": 2011,
        "journal": "Journal of Nutrition",
        "study_type": "Revisión sistemática",
        "pmid": "21411610",
        "doi": "10.3945/jn.110.137075",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21411610/",
        "key_finding": {
          "es": "50 estudios: la ingesta de CHO durante el ejercicio mejora el rendimiento de contrarreloj ~2,0% y los protocolos submáximos hasta carga ~7,5%. Fuente correcta de la cifra ancla ~2% TT.",
          "en": "50 studies: CHO intake during exercise improves time trial performance ~2.0% and submaximal protocols up to load ~7.5%. Correct source of the ~2% TT anchor figure."
        }
      },
      {
        "title": "Effects of carbohydrate supplementation on endurance performance: a meta-analysis",
        "first_author": "Vandenbogaerde TJ",
        "year": 2011,
        "journal": "Sports Medicine",
        "study_type": "Meta-análisis",
        "pmid": "21846165",
        "doi": "10.2165/11590520-000000000-00000",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21846165/",
        "key_finding": {
          "es": "88 estudios: el efecto de los CHO varía con el protocolo en un rango de +6% a -2%; aporta el rango de variabilidad, no la cifra ancla.",
          "en": "88 studies: the effect of CHO varies with protocol in a range of +6% to -2%; provides the variability range, not the anchor figure."
        }
      },
      {
        "title": "Superior endurance performance with ingestion of multiple transportable carbohydrates",
        "first_author": "Currell K",
        "year": 2008,
        "journal": "Medicine & Science in Sports & Exercise",
        "study_type": "ECA",
        "pmid": "18202575",
        "doi": "10.1249/mss.0b013e31815adf19",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18202575/",
        "key_finding": {
          "es": "8 ciclistas, 120 min + CRI: glucosa:fructosa 2:1 a 1,8 g/min mejoró +8% vs glucosa sola y +19% vs placebo.",
          "en": "8 cyclists, 120 min + TT: glucose:fructose 2:1 at 1.8 g/min improved +8% vs glucose alone and +19% vs placebo."
        }
      },
      {
        "title": "Curvilinear dose-response relationship of carbohydrate (0-120 g/h) and performance",
        "first_author": "Smith JW",
        "year": 2013,
        "journal": "Medicine & Science in Sports & Exercise",
        "study_type": "ECA",
        "pmid": "22968309",
        "doi": "10.1249/MSS.0b013e31827205d1",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22968309/",
        "key_finding": {
          "es": "51 ciclistas/triatletas: relación curvilínea con óptimo ~78 g/h (68-88), mejoras hasta ~4,7% y rendimientos decrecientes por encima de 78 g/h.",
          "en": "51 cyclists/triathletes: curvilinear relationship with optimum ~78 g/h (68-88), improvements up to ~4.7% and diminishing returns above 78 g/h."
        }
      },
      {
        "title": "Training the Gut for Athletes",
        "first_author": "Jeukendrup AE",
        "year": 2017,
        "journal": "Sports Medicine",
        "study_type": "Revisión",
        "pmid": "28332114",
        "doi": "10.1007/s40279-017-0690-6",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28332114/",
        "key_finding": {
          "es": "La alta ingesta de CHO aumenta el SGLT1 (vía T1R2/T1R3/gustducina), mejora el confort en ~2 semanas, amplía la absorción y reduce el distrés GI.",
          "en": "High CHO intake increases SGLT1 (via T1R2/T1R3/gustducin), improves comfort in ~2 weeks, expands absorption and reduces GI distress."
        }
      },
      {
        "title": "Carbohydrate consumption during endurance exercise: a systematic review of systematic reviews and meta-analyses of RCTs",
        "first_author": "Tarrit B",
        "year": 2026,
        "journal": "Journal of Sports Medicine and Physical Fitness",
        "study_type": "Revisión de revisiones",
        "pmid": "41885724",
        "doi": "10.23736/S0022-4707.25.16000-0",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41885724/",
        "key_finding": {
          "es": "15 revisiones (262 RCTs): ~44% con efecto positivo; mayor beneficio en 1-2 h y 2-4 h; glucosa+fructosa supera a la fuente simple; baja calidad AMSTAR2 en 11/15.",
          "en": "15 reviews (262 RCTs): ~44% with positive effect; greater benefit at 1-2 h and 2-4 h; glucose+fructose outperforms single source; low AMSTAR2 quality in 11/15."
        }
      },
      {
        "title": "IOC consensus statement: dietary supplements and the high-performance athlete",
        "first_author": "Maughan RJ",
        "year": 2018,
        "journal": "British Journal of Sports Medicine",
        "study_type": "Declaración de consenso (IOC)",
        "pmid": "29540367",
        "doi": "10.1136/bjsports-2018-099027",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29540367/",
        "key_finding": {
          "es": "Clasifica los CHO (bebidas, geles, barras) como alimentos deportivos; ~30-60 g/h atenúa las respuestas de estrés del ejercicio prolongado.",
          "en": "Classifies CHO (drinks, gels, bars) as sports foods; ~30-60 g/h attenuates stress responses during prolonged exercise."
        }
      },
      {
        "title": "A Narrative Review of the High-Carbohydrate Fueling Revolution in the Professional Peloton",
        "first_author": "Wilson PB",
        "year": 2026,
        "journal": "Sports Medicine",
        "study_type": "Revisión narrativa",
        "pmid": null,
        "doi": "10.1007/s40279-025-02372-6",
        "url": "https://doi.org/10.1007/s40279-025-02372-6",
        "key_finding": {
          "es": "Documenta el uso real de >=100-120 g/h en el pelotón profesional, pero la superioridad sobre 60-90 g/h no está resuelta por la evidencia controlada.",
          "en": "Documents real use of >=100-120 g/h in the professional peloton, but superiority over 60-90 g/h is unresolved by controlled evidence."
        }
      }
    ]
  },
  {
    "id": "creatina",
    "name": {
      "es": "Creatina monohidrato",
      "en": "Creatine monohydrate"
    },
    "category": "metabolico_energetico",
    "evidence_level": "moderada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "Para ciclismo/resistencia el efecto es indirecto y contextual, no sobre la economía aeróbica. La evidencia es nula para resistencia pura (Fernández-Landa 2023: SMD -0,07, ns; Barranco-Gil 2024 sin beneficio en U23). El beneficio aparece en los momentos que definen la carrera: sprints finales, ataques repetidos, intervalos, y sobre todo en la recuperación (resíntesis de fosfocreatina, atenuación de daño/inflamación: CK -19%, TNF-alfa -33,7%, PGE2 -60,9% tras 30 km; Santos 2004). Potencia la supercompensación de glucógeno con CHO (Roberts 2016). Lastre: +1-2 kg por retención hídrica, desventaja para escaladores.",
      "en": "Indirect, context-dependent — not on aerobic economy. Null for pure endurance (Fernández-Landa 2023 SMD -0.07; Barranco-Gil 2024 no benefit in U23). Benefit in race-defining moments (finishing sprints, repeated attacks, intervals) and especially recovery (PCr resynthesis, attenuated damage/inflammation; Santos 2004), plus glycogen supercompensation with CHO (Roberts 2016). Caveat: ~1-2 kg water-weight gain, a disadvantage for climbers."
    },
    "effect_size": {
      "es": "Resistencia pura: ns (SMD -0,07; IC -0,32 a 0,18). Alta intensidad/sprints repetidos: ~10-20% típico (extrapolado de alta intensidad). Recuperación: CK -19%, LDH abolido, TNF-alfa -33,7%, PGE2 -60,9% (Santos 2004). Coste: +0,7-1,0 kg de agua intracelular (hasta 1-2 kg).",
      "en": "Pure endurance: ns (SMD -0.07; CI -0.32 to 0.18). High intensity/repeated sprints: ~10-20% typical (extrapolated from high intensity). Recovery: CK -19%, LDH abolished, TNF-alpha -33.7%, PGE2 -60.9% (Santos 2004). Cost: +0.7-1.0 kg of intracellular water (up to 1-2 kg)."
    },
    "mechanism": {
      "es": "Se almacena como fosfocreatina (PCr), reservorio que regenera ATP en segundos. La carga eleva la PCr ~10-20%, mejora la potencia en sprints, la repetibilidad y la resíntesis de PCr en las recuperaciones; también tampona H+. Para la resistencia aeróbica de estado estable aporta poco. Beneficios laterales: captación de agua con supercompensación de glucógeno (Roberts 2016) y atenuación inflamatoria (Santos 2004). El reverso osmótico es la retención hídrica.",
      "en": "Stored as phosphocreatine (PCr), a reservoir that regenerates ATP in seconds. Loading raises PCr ~10-20%, improves sprint power, repeatability and PCr resynthesis during recovery; also buffers H+. For steady-state aerobic endurance it contributes little. Lateral benefits: water uptake with glycogen supercompensation (Roberts 2016) and inflammatory attenuation (Santos 2004). The osmotic reverse is water retention."
    },
    "dosage": {
      "es": "Carga 20 g/día (~0,3 g/kg) en 4 tomas de 5 g por 5-7 días + mantenimiento 3-5 g/día. Alternativa sin carga (escaladores): 3 g/día x ~28 días. Forma de elección: monohidrato; sin ventaja de las formas tamponadas/líquidas.",
      "en": "Loading 20 g/day (~0.3 g/kg) in 4 doses of 5 g for 5-7 days + maintenance 3-5 g/day. Alternative without loading (climbers): 3 g/day x ~28 days. Preferred form: monohydrate; no advantage of buffered/liquid forms."
    },
    "timing": {
      "es": "Intra-día poco crítico (saturación crónica). El post-entrenamiento con CHO/proteína favorece la captación y el glucógeno. Periodizar: cargar 5-7 días antes de bloques con sprints/ataques; los escaladores prefieren el protocolo lento.",
      "en": "Intra-day timing is not critical (chronic saturation). Post-training with CHO/protein favors uptake and glycogen. Periodize: load 5-7 days before blocks with sprints/attacks; climbers prefer the slow protocol."
    },
    "who_benefits": {
      "es": "Perfiles con componente anaeróbico repetido (velocistas, pistards, BMX, MTB XCO/eliminator, criteriums, cambios de ritmo) y quienes encadenan etapas (recuperación). Menos favorecidos o perjudicados: escaladores puros y contrarrelojistas de estado estable (peso por agua sin contrapartida aeróbica). Mejores respondedores: quienes parten de reservas bajas (vegetarianos).",
      "en": "Profiles with repeated anaerobic component (sprinters, track cyclists, BMX, MTB XCO/eliminator, criteriums, pace changes) and those chaining stages (recovery). Less favored or disadvantaged: pure climbers and steady-state time trialists (water weight without aerobic counterpart). Best responders: those starting from low reserves (vegetarians)."
    },
    "caveats": {
      "es": "Es AIS Grupo A, pero su evidencia fuerte procede de fuerza/potencia/sprints, NO de resistencia aeróbica; el meta-análisis específico en resistencia entrenada es nulo. Valor de nicho (sprints/ataques, intervalos, recuperación). La retención hídrica de 1-2 kg es desventaja real para escaladores. La evidencia recuperadora en endurance es pequeña y antigua. Extrapolaciones declaradas: Santos 2004 en corredores; el 10-20% es de alta intensidad general.",
      "en": "It is AIS Group A, but its strong evidence comes from strength/power/sprints, NOT from aerobic endurance; the endurance-specific meta-analysis in trained subjects is null. Niche value (sprints/attacks, intervals, recovery). The water retention of 1-2 kg is a real disadvantage for climbers. The recovery evidence in endurance is small and old. Declared extrapolations: Santos 2004 in runners; the 10-20% is from general high intensity."
    },
    "side_effects": {
      "es": "Ganancia de peso (~0,5-1,0 L de agua intracelular, 1-2 kg) es el único efecto consistente. Molestias GI poco frecuentes (dosis altas en una sola toma). Refuta los mitos de calambres/deshidratación/lesiones (ISSN, Kreider 2017). Sin daño renal en sanos a dosis estándar. Riesgo indirecto: contaminación; elegir certificación de terceros.",
      "en": "Weight gain (~0.5-1.0 L of intracellular water, 1-2 kg) is the only consistent effect. GI discomfort infrequent (high doses in a single intake). Refutes myths about cramps/dehydration/injuries (ISSN, Kreider 2017). No kidney damage in healthy individuals at standard doses. Indirect risk: contamination; choose third-party certification."
    },
    "population_match": "extrapolado_otros_deportes",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "Effects of Creatine Monohydrate on Endurance Performance in a Trained Population: A Systematic Review and Meta-analysis",
        "first_author": "Fernández-Landa J",
        "year": 2023,
        "journal": "Sports Medicine",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "36877404",
        "doi": "10.1007/s40279-023-01823-2",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36877404/",
        "key_finding": {
          "es": "13 estudios: la creatina fue inefectiva en resistencia (SMD -0,07; IC -0,32 a 0,18; ns).",
          "en": "13 studies: creatine was ineffective in endurance (SMD -0.07; CI -0.32 to 0.18; ns)."
        }
      },
      {
        "title": "Creatine Supplementation and Endurance Performance: Surges and Sprints to Win the Race",
        "first_author": "Forbes SC",
        "year": 2023,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Revisión",
        "pmid": "37096381",
        "doi": "10.1080/15502783.2023.2204071",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37096381/",
        "key_finding": {
          "es": "No mejora el estado estable pero sí los momentos que definen la carrera, la repetibilidad, la supercompensación de glucógeno y la recuperación; ~0,9 kg de agua es menos relevante en ciclismo de carretera.",
          "en": "Does not improve steady state but does improve race-defining moments, repeatability, glycogen supercompensation and recovery; ~0.9 kg of water is less relevant in road cycling."
        }
      },
      {
        "title": "High-dose short-term creatine supplementation without beneficial effects in professional cyclists: a randomized controlled trial",
        "first_author": "Barranco-Gil D",
        "year": 2024,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "ECA",
        "pmid": "38606895",
        "doi": "10.1080/15502783.2024.2340563",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38606895/",
        "key_finding": {
          "es": "23 ciclistas U23, 20 g/día: sin efecto en sprint de 10 s, CRI de 3/6/12 min, potencia crítica, W', composición ni recuperación.",
          "en": "23 U23 cyclists, 20 g/day: no effect on 10 s sprint, 3/6/12 min TT, critical power, W', body composition or recovery."
        }
      },
      {
        "title": "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
        "first_author": "Kreider RB",
        "year": 2017,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Position stand",
        "pmid": "28615996",
        "doi": "10.1186/s12970-017-0173-z",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28615996/",
        "key_finding": {
          "es": "Alta intensidad/repetitivo +10-20%; protocolo 0,3 g/kg/día 5-7 días + 3-5 g/día; retención ~0,5-1,0 L; sin daño renal en sanos; seguro hasta 30 g/día durante 5 años.",
          "en": "High intensity/repetitive +10-20%; protocol 0.3 g/kg/day 5-7 days + 3-5 g/day; retention ~0.5-1.0 L; no kidney damage in healthy individuals; safe up to 30 g/day for 5 years."
        }
      },
      {
        "title": "Creatine ingestion augments dietary carbohydrate mediated muscle glycogen supercompensation",
        "first_author": "Roberts PA",
        "year": 2016,
        "journal": "Amino Acids",
        "study_type": "ECA",
        "pmid": "27193231",
        "doi": "10.1007/s00726-016-2237-9",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27193231/",
        "key_finding": {
          "es": "14 varones, pedaleo a 70% VO2pico: creatina + dieta alta en CHO aumentó el glucógeno sobre placebo desde el primer día, mantenido 6 días.",
          "en": "14 males, cycling at 70% VO2peak: creatine + high-CHO diet increased glycogen over placebo from the first day, maintained for 6 days."
        }
      },
      {
        "title": "The effect of creatine supplementation upon inflammatory and muscle soreness markers after a 30km race",
        "first_author": "Santos RVT",
        "year": 2004,
        "journal": "Life Sciences",
        "study_type": "ECA",
        "pmid": "15306159",
        "doi": "10.1016/j.lfs.2003.11.030",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15306159/",
        "key_finding": {
          "es": "Carga pre-carrera de 30 km en corredores: CK -19%, PGE2 -60,9%, TNF-alfa -33,7%, LDH abolido. Extrapolación declarada (corredores).",
          "en": "Pre-race loading in 30 km runners: CK -19%, PGE2 -60.9%, TNF-alpha -33.7%, LDH abolished. Declared extrapolation (runners)."
        }
      }
    ]
  },
  {
    "id": "glicerol",
    "name": {
      "es": "Glicerol (hiperhidratación)",
      "en": "Glycerol (hyperhydration)"
    },
    "category": "otro",
    "evidence_level": "moderada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "Con un gran volumen de fluido pre-ejercicio expande de forma fiable el agua corporal y mejora modestamente la resistencia frente a la hiperhidratación con agua, sobre todo en pruebas prolongadas en calor. Goulet 2007: +2,62% con +7,7 mL/kg de retención. McCubbin & Irwin 2024: mejoras pequeñas-moderadas en TTE (g=0,31) y CRI (g=0,25), nulas en trabajo total. Evidencia contradictoria: Hitchins 1999 +5% en CRI 60 min a 32 C, pero Ross 2012 sin beneficio claro vs bebida fría abundante. Mayor efecto cuando no se puede reponer fluido durante el ejercicio.",
      "en": "Pre-exercise glycerol with large fluid volume reliably expands total body water and modestly improves endurance vs water hyperhydration, especially in prolonged heat. Goulet 2007: +2.62%, +7.7 mL/kg retention. McCubbin & Irwin 2024: small-to-moderate gains in TTE (g=0.31) and TT (g=0.25), none in total-work. Conflicting: Hitchins 1999 +5%, Ross 2012 no clear benefit over a cold drink. Largest when fluid replacement is prevented."
    },
    "effect_size": {
      "es": "~2,6% media (Goulet 2007); +5% en CRI 60 min (Hitchins 1999); g=0,25-0,31 (McCubbin 2024); nulo con hidratación ad libitum (Ross 2012; Jolicoeur Desroches 2023).",
      "en": "~2.6% mean (Goulet 2007); +5% in 60 min TT (Hitchins 1999); g=0.25-0.31 (McCubbin 2024); null with ad libitum hydration (Ross 2012; Jolicoeur Desroches 2023)."
    },
    "mechanism": {
      "es": "Alcohol osmóticamente activo distribuido en el agua corporal total; con gran volumen eleva la osmolalidad, reduce la diuresis y expande el agua corporal (~600 mL a >1 L), amortiguando el déficit de líquidos, atenuando la temperatura central y sosteniendo el volumen plasmático en ejercicio prolongado en calor.",
      "en": "Osmotically active alcohol distributed in total body water; with large volume it raises osmolality, reduces diuresis and expands body water (~600 mL to >1 L), buffering the fluid deficit, attenuating core temperature and sustaining plasma volume during prolonged exercise in the heat."
    },
    "dosage": {
      "es": "1,2-1,4 g/kg de glicerol con ~25 mL/kg de fluido (rango 1,0-1,4 g/kg + 22-30 mL/kg), 90-180 min antes.",
      "en": "1.2-1.4 g/kg of glycerol with ~25 mL/kg of fluid (range 1.0-1.4 g/kg + 22-30 mL/kg), 90-180 min before."
    },
    "timing": {
      "es": "90-180 min antes, en dosis fraccionada (p. ej. cada 20 min la primera hora).",
      "en": "90-180 min before, in a divided dose (e.g., every 20 min during the first hour)."
    },
    "who_benefits": {
      "es": "Fondo en calor sin reposición ad libitum (CRI larga, etapas calurosas, tramos sin avituallamiento). Poco/nulo en pruebas cortas, clima templado o con hidratación libre. La masa extra penaliza en subidas.",
      "en": "Endurance in heat without ad libitum fluid replacement (long TT, hot stages, segments without aid stations). Little/null in short events, temperate climate or with free hydration. Extra mass is a disadvantage on climbs."
    },
    "caveats": {
      "es": "Evidencia heterogénea con RCT nulos cuando hay hidratación ad libitum o comparador de bebida fría; pocos estudios de rendimiento; infrarrepresentación de mujeres y élite; la masa extra es contraproducente en escalada. El soporte del effect_size en CRI de ciclismo descansa casi solo en Hitchins (positivo, n=8) frente a Ross (nulo).",
      "en": "Heterogeneous evidence with null RCTs when ad libitum hydration or a cold-drink comparator is available; few performance studies; underrepresentation of women and elite; extra mass is counterproductive on climbs. The support for the effect_size in cycling TT rests almost solely on Hitchins (positive, n=8) against Ross (null)."
    },
    "side_effects": {
      "es": "Distrés GI (náuseas, distensión, dolor, efecto laxante), cefalea y mareo (peores con dosis altas/ingesta rápida); +1-1,5 kg transitorios por agua. La dosis fraccionada y el ensayo previo reducen los adversos.",
      "en": "GI distress (nausea, bloating, pain, laxative effect), headache and dizziness (worse with high doses/rapid intake); +1-1.5 kg transient due to water. Divided dose and prior testing reduce adverse effects."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "A meta-analysis of the effects of glycerol-induced hyperhydration on fluid retention and endurance performance",
        "first_author": "Goulet ED",
        "year": 2007,
        "journal": "International Journal of Sport Nutrition and Exercise Metabolism",
        "study_type": "Meta-análisis",
        "pmid": "17962713",
        "doi": "10.1123/ijsnem.17.4.391",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17962713/",
        "key_finding": {
          "es": "+7,7 +/- 2,8 mL/kg de retención (ES 1,64; P<0,01) y +2,62 +/- 1,60% de rendimiento (ES 0,35; P=0,014); solo 4 estudios de rendimiento. URL canónica normalizada a PubMed.",
          "en": "+7.7 +/- 2.8 mL/kg retention (ES 1.64; P<0.01) and +2.62 +/- 1.60% performance (ES 0.35; P=0.014); only 4 performance studies. Canonical URL normalized to PubMed."
        }
      },
      {
        "title": "The effect of pre-exercise oral hyperhydration on endurance exercise performance, heart rate, and thermoregulation: a meta-analytical review",
        "first_author": "McCubbin AJ",
        "year": 2024,
        "journal": "Applied Physiology, Nutrition, and Metabolism",
        "study_type": "Revisión meta-analítica",
        "pmid": "38198662",
        "doi": "10.1139/apnm-2023-0375",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38198662/",
        "key_finding": {
          "es": "10-11 publicaciones: TTE g=0,31, CRI g=0,25; nulo en trabajo total, FC y temperatura; el sodio dio menor temperatura post que el glicerol.",
          "en": "10-11 publications: TTE g=0.31, TT g=0.25; null on total work, HR and temperature; sodium gave lower post-exercise temperature than glycerol."
        }
      },
      {
        "title": "Glycerol hyperhydration improves cycle time trial performance in hot humid conditions",
        "first_author": "Hitchins S",
        "year": 1999,
        "journal": "European Journal of Applied Physiology and Occupational Physiology",
        "study_type": "ECA",
        "pmid": "10502085",
        "doi": "10.1007/s004210050596",
        "url": "https://pubmed.ncbi.nlm.nih.gov/10502085/",
        "key_finding": {
          "es": "8 ciclistas, 1 g/kg + 22 mL/kg: +5% trabajo en CRI 60 min a 32 C (P<0,04), agua corporal +~600 mL. URL normalizada sin sufijo legacy.",
          "en": "8 cyclists, 1 g/kg + 22 mL/kg: +5% work in 60 min TT at 32 C (P<0.04), body water +~600 mL. URL normalized without legacy suffix."
        }
      },
      {
        "title": "Effects of lowering body temperature via hyperhydration, with and without glycerol ingestion and practical precooling on cycling time trial performance in hot and humid conditions",
        "first_author": "Ross MLR",
        "year": 2012,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "ECA",
        "pmid": "23245800",
        "doi": "10.1186/1550-2783-9-55",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23245800/",
        "key_finding": {
          "es": "12 ciclistas: el glicerol 1,2 g/kg no mejoró claramente la CRI 46,4 km vs hiperhidratación sola; el pre-enfriamiento sin glicerol dio +2% solo en subida.",
          "en": "12 cyclists: glycerol 1.2 g/kg did not clearly improve the 46.4 km TT vs hyperhydration alone; pre-cooling without glycerol gave +2% only on the climb."
        }
      },
      {
        "title": "Effect of Glycerol-Induced Hyperhydration on a 5-km Running Time Trial in the Heat",
        "first_author": "Jolicoeur Desroches A",
        "year": 2023,
        "journal": "Nutrients",
        "study_type": "ECA",
        "pmid": "36771308",
        "doi": "10.3390/nu15030599",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36771308/",
        "key_finding": {
          "es": "10 activos: el glicerol 1,4 g/kg MLG dio +10,1% de volumen plasmático y +1,1 kg, pero la CRI 5 km no mejoró (p=0,275).",
          "en": "10 active subjects: glycerol 1.4 g/kg LBM gave +10.1% plasma volume and +1.1 kg, but the 5 km TT did not improve (p=0.275)."
        }
      },
      {
        "title": "Effects of Glycerol and Creatine Hyperhydration on Doping-Relevant Blood Parameters",
        "first_author": "Polyviou TP",
        "year": 2012,
        "journal": "Nutrients",
        "study_type": "ECA",
        "pmid": "23112907",
        "doi": "10.3390/nu4091171",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23112907/",
        "key_finding": {
          "es": "Agua corporal +~1,0 L sin alterar Hb, hematocrito, reticulocitos ni OFF-score; sustenta la retirada del glicerol de la lista WADA en 2018.",
          "en": "Body water +~1.0 L without altering Hb, hematocrit, reticulocytes or OFF-score; supports glycerol's removal from the WADA prohibited list in 2018."
        }
      }
    ]
  },
  {
    "id": "polifenoles-cereza",
    "name": {
      "es": "Polifenoles (cereza ácida, frutos rojos)",
      "en": "Polyphenols (tart cherry, berries)"
    },
    "category": "recuperacion_antioxidante",
    "evidence_level": "moderada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "Efecto principal indirecto: aceleran la recuperación de fuerza/potencia y reducen el dolor tras esfuerzos excéntricos/intensos, protegiendo el rendimiento en días consecutivos. Sobre el rendimiento agudo directo la evidencia es más débil y dispar: meta-análisis de 10 estudios SMD 0,36; un RCT en ciclistas mostró CRI 15 km 4,6% más rápida, otro RCT no halló ventaja vs bebida deportiva en 10 km. El beneficio más sólido es el sueño y la recuperación entre sesiones, no una mejora cronométrica fiable.",
      "en": "Primary benefit is indirect — speeds strength/power recovery and reduces soreness after eccentric/strenuous efforts, protecting performance across consecutive days. Direct acute evidence is weaker/inconsistent: 10-study meta-analysis SMD 0.36; one cycling RCT 4.6% faster 15 km TT, another no advantage over sports drink in 10 km TT. Most robust benefit: improved sleep and between-session recovery."
    },
    "effect_size": {
      "es": "Recuperación: fuerza ES -0,78, potencia -0,53, dolor -0,44 (Hill 2021). Resistencia: SMD +0,36 (IC 0,07-0,64; Gao 2020). Ciclismo: ~4,6% en 15 km TT (Morgan 2019, P=0,004, con 257 mg/día de antocianinas y ~460 mg de polifenoles totales) pero ns vs bebida deportiva en 10 km TT (Gao 2024, p=0,27). Sueño: aumentos significativos de tiempo total y eficiencia (Howatson 2012).",
      "en": "Recovery: strength ES -0.78, power -0.53, pain -0.44 (Hill 2021). Endurance: SMD +0.36 (CI 0.07-0.64; Gao 2020). Cycling: ~4.6% in 15 km TT (Morgan 2019, P=0.004, with 257 mg/day of anthocyanins and ~460 mg of total polyphenols) but ns vs sports drink in 10 km TT (Gao 2024, p=0.27). Sleep: significant increases in total time and efficiency (Howatson 2012)."
    },
    "mechanism": {
      "es": "Antocianinas/polifenoles con acción antioxidante/antiinflamatoria que atenúa LOOH, IL-6 y PCR-as tras el esfuerzo, reduciendo el daño muscular secundario y acelerando la recuperación contráctil. La cereza aporta melatonina exógena que mejora el sueño. Para el rendimiento agudo se propone mejor flujo sanguíneo/oxigenación (mayor TOI en reposo), bajo índice glucémico y posible efecto sobre el NO, menos consolidados.",
      "en": "Anthocyanins/polyphenols with antioxidant/anti-inflammatory action that attenuates LOOH, IL-6 and hsCRP after exertion, reducing secondary muscle damage and accelerating contractile recovery. Cherry provides exogenous melatonin that improves sleep. For acute performance, improved blood flow/oxygenation (higher TOI at rest), low glycemic index and possible effect on NO are proposed, though less consolidated."
    },
    "dosage": {
      "es": "Concentrado Montmorency ~30 mL dos veces/día (~250-275 mg antocianinas/día) durante 4-7 días de carga + días de competencia. Cápsulas/polvo: ~480 mg/día (estudios de media maratón) o ~460 mg de polifenoles totales/día (RCT de ciclismo, ~257 mg de antocianinas). Priorizar formatos con antocianinas declaradas.",
      "en": "Montmorency concentrate ~30 mL twice/day (~250-275 mg anthocyanins/day) for a 4-7 day loading period + competition days. Capsules/powder: ~480 mg/day (half-marathon studies) or ~460 mg total polyphenols/day (cycling RCT, ~257 mg anthocyanins). Prioritize formats with declared anthocyanin content."
    },
    "timing": {
      "es": "Carga 4-7 días antes + días de esfuerzo y 1-3 posteriores. Tomas mañana/noche; la nocturna favorece el sueño. Para efecto agudo: toma final ~60-90 min antes. Usar en bloques de competencia, NO de forma crónica en fases de adaptación de base.",
      "en": "Load 4-7 days before + days of effort and 1-3 days after. Morning/evening doses; evening dose favors sleep. For acute effect: final dose ~60-90 min before. Use during competition blocks, NOT chronically during base adaptation phases."
    },
    "who_benefits": {
      "es": "Resistencia con días consecutivos o esfuerzos excéntricos (etapas, bloques de carga, maratón) y quienes tienen sueño deteriorado por viajes/estrés. Menos útil para una CRI aislada en estado fresco. Matiz crítico: por su acción antioxidante, el uso crónico de dosis altas pegado a sesiones de adaptación podría atenuar adaptaciones mitocondriales (paralelo con vitaminas C/E).",
      "en": "Endurance with consecutive days or eccentric efforts (stages, loading blocks, marathon) and those with sleep impaired by travel/stress. Less useful for an isolated TT in a fresh state. Critical nuance: due to antioxidant action, chronic use of high doses close to adaptation sessions could attenuate mitochondrial adaptations (parallel with vitamins C/E)."
    },
    "caveats": {
      "es": "Efecto agudo pequeño e inconsistente; el valor está en recuperación y sueño. Muestras pequeñas (RCT de ciclismo n=8-16) y predominio masculino. Matiz mecanístico clave: las dosis altas crónicas peri-entrenamiento podrían embotar adaptaciones (extrapolación razonada desde vitaminas C/E, no demostrada en cereza). Estandarización de polifenoles muy variable. Para distinguir Morgan 2019: 257 mg/día de antocianinas vs ~460 mg de polifenoles totales.",
      "en": "Acute effect small and inconsistent; the value lies in recovery and sleep. Small samples (cycling RCT n=8-16) and male predominance. Key mechanistic nuance: high chronic doses peri-training could blunt adaptations (reasoned extrapolation from vitamins C/E, not demonstrated for cherry). Very variable polyphenol standardization. To distinguish Morgan 2019: 257 mg/day of anthocyanins vs ~460 mg of total polyphenols."
    },
    "side_effects": {
      "es": "Bien tolerado. Por su contenido en sorbitol/fructosa, el concentrado puede dar distrés GI (gases, diarrea osmótica) en sensibles cerca del esfuerzo. Azúcar/calorías a considerar. La melatonina nocturna aumenta la somnolencia. Precaución teórica con anticoagulantes y enzimas hepáticas a dosis muy altas.",
      "en": "Well tolerated. Due to its sorbitol/fructose content, the concentrate can cause GI distress (gas, osmotic diarrhea) in sensitive individuals near exertion. Sugar/calories to consider. Nighttime melatonin increases sleepiness. Theoretical caution with anticoagulants and hepatic enzymes at very high doses."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "B",
    "ais_verified": true,
    "citations": [
      {
        "title": "Tart Cherry Supplementation and Recovery From Strenuous Exercise: A Systematic Review and Meta-Analysis",
        "first_author": "Hill JA",
        "year": 2021,
        "journal": "International Journal of Sport Nutrition and Exercise Metabolism",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "33440334",
        "doi": "10.1123/ijsnem.2020-0145",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33440334/",
        "key_finding": {
          "es": "14 estudios: recuperación de fuerza ES -0,78, potencia -0,53, salto -0,82, dolor -0,44.",
          "en": "14 studies: recovery of strength ES -0.78, power -0.53, jump -0.82, pain -0.44."
        }
      },
      {
        "title": "Effect of Tart Cherry Concentrate on Endurance Exercise Performance: A Meta-analysis",
        "first_author": "Gao R",
        "year": 2020,
        "journal": "Journal of the American College of Nutrition",
        "study_type": "Meta-análisis",
        "pmid": "31986108",
        "doi": "10.1080/07315724.2019.1713333",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31986108/",
        "key_finding": {
          "es": "10 estudios (147 participantes): resistencia +0,36 (IC 0,07-0,64; p=0,01; I2=0%).",
          "en": "10 studies (147 participants): endurance +0.36 (CI 0.07-0.64; p=0.01; I2=0%)."
        }
      },
      {
        "title": "Montmorency cherry supplementation improves 15-km cycling time-trial performance",
        "first_author": "Morgan PT",
        "year": 2019,
        "journal": "European Journal of Applied Physiology",
        "study_type": "ECA",
        "pmid": "30617467",
        "doi": "10.1007/s00421-018-04058-6",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30617467/",
        "key_finding": {
          "es": "8 ciclistas, 7 días (257 mg/día de antocianinas, ~460 mg de polifenoles totales): CRI 15 km +4,6% (1506 vs 1580 s; p=0,004; d=0,78), TOI en reposo 70,4 vs 68,7%.",
          "en": "8 cyclists, 7 days (257 mg/day anthocyanins, ~460 mg total polyphenols): 15 km TT +4.6% (1506 vs 1580 s; p=0.004; d=0.78), TOI at rest 70.4 vs 68.7%."
        }
      },
      {
        "title": "Montmorency Cherries Reduce the Oxidative Stress and Inflammatory Responses to Repeated Days High-Intensity Stochastic Cycling",
        "first_author": "Bell PG",
        "year": 2014,
        "journal": "Nutrients",
        "study_type": "ECA",
        "pmid": "24566440",
        "doi": "10.3390/nu6020829",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24566440/",
        "key_finding": {
          "es": "16 ciclistas, 3 días: LOOH ~30% menor, IL-6 y PCR-as menores; el rendimiento no se midió.",
          "en": "16 cyclists, 3 days: LOOH ~30% lower, IL-6 and hsCRP lower; performance was not measured."
        }
      },
      {
        "title": "Effects of powdered Montmorency tart cherry supplementation on acute endurance exercise performance in aerobically trained individuals",
        "first_author": "Levers K",
        "year": 2016,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "ECA",
        "pmid": "27231439",
        "doi": "10.1186/s12970-016-0133-z",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27231439/",
        "key_finding": {
          "es": "27 corredores: 480 mg/día x 10 días atenuó marcadores catabólicos y +16-39% en antioxidantes; el grupo cereza fue ~13% más rápido (p=0,001) pero con grupos desbalanceados (n=11 vs 16); interpretar con cautela.",
          "en": "27 runners: 480 mg/day x 10 days attenuated catabolic markers and +16-39% in antioxidants; the cherry group was ~13% faster (p=0.001) but with unbalanced groups (n=11 vs 16); interpret with caution."
        }
      },
      {
        "title": "Tart cherry juice vs sports drink on cycling performance, substrate metabolism, and recovery",
        "first_author": "Gao R",
        "year": 2024,
        "journal": "PLoS One",
        "study_type": "ECA",
        "pmid": "39141644",
        "doi": "10.1371/journal.pone.0307263",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39141644/",
        "key_finding": {
          "es": "12 ciclistas: el zumo NO mejoró la CRI 10 km vs bebida deportiva (p=0,27), ni los sustratos ni la recuperación.",
          "en": "12 cyclists: juice did NOT improve 10 km TT vs sports drink (p=0.27), nor substrates nor recovery."
        }
      },
      {
        "title": "Effect of tart cherry juice (Prunus cerasus) on melatonin levels and enhanced sleep quality",
        "first_author": "Howatson G",
        "year": 2012,
        "journal": "European Journal of Nutrition",
        "study_type": "ECA",
        "pmid": "22038497",
        "doi": "10.1007/s00394-011-0263-7",
        "url": "https://pubmed.ncbi.nlm.nih.gov/22038497/",
        "key_finding": {
          "es": "20 voluntarios: aumento de melatonina y aumentos significativos del tiempo total y la eficiencia del sueño (P<0,05).",
          "en": "20 volunteers: increase in melatonin and significant increases in total sleep time and sleep efficiency (P<0.05)."
        }
      }
    ]
  },
  {
    "id": "cetonas-exogenas",
    "name": {
      "es": "Cetonas exógenas",
      "en": "Exogenous ketones"
    },
    "category": "metabolico_energetico",
    "evidence_level": "en_contra",
    "evidence_direction": "perjudicial",
    "confidence": "alta",
    "performance_effect": {
      "es": "No mejoran el rendimiento agudo y en alta intensidad (CRI 30-50 min) tienden a deteriorarlo ligeramente. Tres meta-análisis (Valenzuela 2020, Margolis 2020, Brooks 2022) sin efecto ergogénico. En profesionales, el diéster empeoró la CRI ~2% (Leckey 2017) y el monoéster redujo la potencia media en CRI 30 min ~1,5% incluso con bicarbonato (Poffé 2021). Doble eje: señal POSITIVA, experimental y de un solo laboratorio, en recuperación/adaptación: el éster post-ejercicio atenúa el sobreentrenamiento y sostiene más carga (Poffé 2019), y eleva EPO y la capilarización (Poffé 2023).",
      "en": "No acute endurance improvement and a tendency toward slight impairment in 30-50 min efforts. Three meta-analyses find no ergogenic effect. In pros, a ketone diester worsened a TT by ~2% (Leckey 2017); the monoester cut 30-min TT power ~1.5% even with bicarbonate (Poffé 2021). Dual axis: a POSITIVE, experimental, single-lab signal in recovery/adaptation — the post-exercise ester blunts overreaching, sustains higher load (Poffé 2019) and raises EPO and capillarization (Poffé 2023)."
    },
    "effect_size": {
      "es": "Agudo ns (Valenzuela: g=-0,05, p=0,68; Brooks: g=0,14, p=0,42). CRI de alta intensidad: -1,5 a -2% (Leckey, Poffé). Recuperación/sobrecarga: +15% en carga sostenible y potencia final (Poffé 2019). Adaptación: EPO +26%, capilarización +44%/+42% (Poffé 2023).",
      "en": "Acute ns (Valenzuela: g=-0.05, p=0.68; Brooks: g=0.14, p=0.42). High-intensity TT: -1.5 to -2% (Leckey, Poffé). Recovery/overload: +15% in sustainable load and final power (Poffé 2019). Adaptation: EPO +26%, capillarization +44%/+42% (Poffé 2023)."
    },
    "mechanism": {
      "es": "El beta-hidroxibutirato (betaHB) eleva un combustible oxidable alternativo que en teoría ahorraría glucógeno. En la práctica, las concentraciones altas inhiben el flujo de otros sustratos, y el éster induce acidosis metabólica transitoria (2-3 h) y malestar GI. McCarthy 2021: el monoéster aumenta el estrés cardiorrespiratorio (FC, ventilación, RPE) a igual intensidad submáxima. En recuperación, el betaHB señaliza: atenúa catecolaminas nocturnas, reduce el GDF15 y (Poffé 2023) eleva la EPO y estimula la angiogénesis.",
      "en": "Beta-hydroxybutyrate (betaHB) raises an alternative oxidizable fuel that theoretically would spare glycogen. In practice, high concentrations inhibit the flux of other substrates, and the ester induces transient metabolic acidosis (2-3 h) and GI discomfort. McCarthy 2021: the monoester increases cardiorespiratory stress (HR, ventilation, RPE) at the same submaximal intensity. In recovery, betaHB signals: attenuates nocturnal catecholamines, reduces GDF15 and (Poffé 2023) raises EPO and stimulates angiogenesis."
    },
    "dosage": {
      "es": "Monoéster (R-1,3-butanodiol-R-betaHB): ~250-750 mg/kg por toma para alcanzar betaHB 1,5-4 mM en ejercicio. Las sales solo elevan a 0,5-1,0 mM (subumbral, no efectivas). El 1,3-butanodiol solo produce euforia/mareo/náuseas. Recuperación: éster inmediatamente post-ejercicio, repetido tras cada sesión.",
      "en": "Monoester (R-1,3-butanediol-R-betaHB): ~250-750 mg/kg per dose to achieve betaHB 1.5-4 mM during exercise. Salts only raise to 0.5-1.0 mM (subthreshold, not effective). 1,3-butanediol alone produces euphoria/dizziness/nausea. Recovery: ester immediately post-exercise, repeated after each session."
    },
    "timing": {
      "es": "Agudo (no recomendado): 1-2 tomas ~30 min antes o en el calentamiento. Recuperación: inmediatamente post-sesión en bloques de sobrecarga. Probar la tolerancia GI; nunca estrenar el día de carrera.",
      "en": "Acute (not recommended): 1-2 doses ~30 min before or during warm-up. Recovery: immediately post-session in overload blocks. Test GI tolerance; never debut on race day."
    },
    "who_benefits": {
      "es": "Como ergogénico agudo: prácticamente nadie. Nicho potencial: deportistas en bloques de alta carga / altura que busquen recuperación/adaptación, de forma experimental y monitorizada. Sin fenotipo respondedor; la respuesta depende del tipo (monoéster > sales) y de betaHB >1 mM.",
      "en": "As an acute ergogenic: practically no one. Potential niche: athletes in high-load/altitude blocks seeking recovery/adaptation, experimentally and with monitoring. No responder phenotype; response depends on type (monoester > salts) and betaHB >1 mM."
    },
    "caveats": {
      "es": "Alta heterogeneidad (Margolis I2=93%), muestras pequeñas y mayoría de hombres (los 3 meta-análisis <120 sujetos), aunque McCarthy 2021 incluyó ~47% mujeres. Sales y 1,3-butanodiol descartados. La línea de recuperación (Poffé) viene de un solo grupo y necesita replicación. La acidosis no se contrarresta con bicarbonato (Poffé 2021). Coste muy elevado. Seguridad a largo plazo no establecida.",
      "en": "High heterogeneity (Margolis I2=93%), small samples and majority men (all 3 meta-analyses <120 subjects), although McCarthy 2021 included ~47% women. Salts and 1,3-butanediol discarded. The recovery line (Poffé) comes from a single group and needs replication. Acidosis is not counteracted by bicarbonate (Poffé 2021). Very high cost. Long-term safety not established."
    },
    "side_effects": {
      "es": "Distrés GI frecuente con ésteres (náuseas, dolor, diarrea, eructos; hasta ~80% en algunos estudios). Mayor RPE, FC y ventilación submáximas (McCarthy 2021). El 1,3-butanodiol añade euforia/mareo. Acidosis transitoria de 2-3 h.",
      "en": "Frequent GI distress with esters (nausea, pain, diarrhea, belching; up to ~80% in some studies). Higher RPE, HR and submaximal ventilation (McCarthy 2021). 1,3-butanediol adds euphoria/dizziness. Transient 2-3 h acidosis."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mixto",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "B",
    "ais_verified": true,
    "citations": [
      {
        "title": "Acute Ketone Supplementation and Exercise Performance: A Systematic Review and Meta-Analysis of Randomized Controlled Trials",
        "first_author": "Valenzuela PL",
        "year": 2020,
        "journal": "International Journal of Sports Physiology and Performance",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "32045881",
        "doi": "10.1123/ijspp.2019-0918",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32045881/",
        "key_finding": {
          "es": "13 ECA: sin diferencias (g=-0,05; IC -0,30 a 0,20; p=0,68); ni en CRI ni entre ésteres y sales.",
          "en": "13 RCTs: no differences (g=-0.05; CI -0.30 to 0.20; p=0.68); neither in TT nor between esters and salts."
        }
      },
      {
        "title": "Utility of Ketone Supplementation to Enhance Physical Performance: A Systematic Review",
        "first_author": "Margolis LM",
        "year": 2020,
        "journal": "Advances in Nutrition",
        "study_type": "Revisión sistemática",
        "pmid": "31586177",
        "doi": "10.1093/advances/nmz104",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31586177/",
        "key_finding": {
          "es": "10 ECA (112 sujetos): 3 positivos / 10 nulos / 3 negativos; I2=93%; distrés GI ~80% en algunos; evidencia insuficiente.",
          "en": "10 RCTs (112 subjects): 3 positive / 10 null / 3 negative; I2=93%; GI distress ~80% in some; insufficient evidence."
        }
      },
      {
        "title": "Acute Ingestion of Ketone Monoesters and Precursors Do Not Enhance Endurance Exercise Performance: A Systematic Review and Meta-Analysis",
        "first_author": "Brooks E",
        "year": 2022,
        "journal": "International Journal of Sport Nutrition and Exercise Metabolism",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "35042186",
        "doi": "10.1123/ijsnem.2021-0280",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35042186/",
        "key_finding": {
          "es": "8 ECA (80 sujetos): sin mejora (g=0,14; p=0,42); TTE g=-0,002; CRI g=0,06.",
          "en": "8 RCTs (80 subjects): no improvement (g=0.14; p=0.42); TTE g=-0.002; TT g=0.06."
        }
      },
      {
        "title": "Ketone Diester Ingestion Impairs Time-Trial Performance in Professional Cyclists",
        "first_author": "Leckey JJ",
        "year": 2017,
        "journal": "Frontiers in Physiology",
        "study_type": "ECA",
        "pmid": "29109686",
        "doi": "10.3389/fphys.2017.00806",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29109686/",
        "key_finding": {
          "es": "El diéster (2 x 250 mg/kg) deterioró la CRI de ~31 km (~50 min) un 2 +/- 1% vs placebo, con distrés GI y mayor RPE.",
          "en": "The diester (2 x 250 mg/kg) impaired the ~31 km (~50 min) TT by 2 +/- 1% vs placebo, with GI distress and higher RPE."
        }
      },
      {
        "title": "Ketone ester supplementation blunts overreaching symptoms during endurance training overload",
        "first_author": "Poffé C",
        "year": 2019,
        "journal": "Journal of Physiology",
        "study_type": "ECA",
        "pmid": "31039280",
        "doi": "10.1113/JP277831",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31039280/",
        "key_finding": {
          "es": "Tras 3 semanas de sobrecarga, el éster sostuvo ~15% más carga y mayor potencia final, atenuando las catecolaminas nocturnas y el GDF15.",
          "en": "After 3 weeks of overload, the ester sustained ~15% more load and higher final power, attenuating nocturnal catecholamines and GDF15."
        }
      },
      {
        "title": "Exogenous Ketosis Impairs 30-min Time-Trial Performance Independent of Bicarbonate Supplementation",
        "first_author": "Poffé C",
        "year": 2021,
        "journal": "Medicine & Science in Sports & Exercise",
        "study_type": "ECA",
        "pmid": "33196605",
        "doi": "10.1249/MSS.0000000000002552",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33196605/",
        "key_finding": {
          "es": "El monoéster (~726 mg/kg) redujo la potencia media en CRI 30 min ~1,5% (3,8 +/- 1,5 W); el bicarbonato neutralizó la acidosis pero no el deterioro.",
          "en": "The monoester (~726 mg/kg) reduced mean power in 30 min TT ~1.5% (3.8 +/- 1.5 W); bicarbonate neutralized the acidosis but not the performance impairment."
        }
      },
      {
        "title": "Increased cardiorespiratory stress during submaximal cycling after ketone monoester ingestion",
        "first_author": "McCarthy DG",
        "year": 2021,
        "journal": "Applied Physiology, Nutrition, and Metabolism",
        "study_type": "ECA",
        "pmid": "33646860",
        "doi": "10.1139/apnm-2020-0764",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33646860/",
        "key_finding": {
          "es": "Monoéster 600 mg/kg: +5 lpm de FC, +6 L/min de ventilación y mayor RPE submáximas, sin mejorar la CRI (p=0,20). N=19 (10 H, 9 M, ~47% mujeres).",
          "en": "Monoester 600 mg/kg: +5 bpm HR, +6 L/min ventilation and higher submaximal RPE, without improving TT (p=0.20). N=19 (10 M, 9 F, ~47% women)."
        }
      },
      {
        "title": "Perspective: Ketone Supplementation in Sports - Does It Work?",
        "first_author": "Valenzuela PL",
        "year": 2021,
        "journal": "Advances in Nutrition",
        "study_type": "Revisión",
        "pmid": "33094332",
        "doi": "10.1093/advances/nmaa130",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33094332/",
        "key_finding": {
          "es": "Sin evidencia suficiente en rendimiento, cognición ni recuperación muscular; distrés GI y necesidad de estudiar la seguridad de uso repetido y esfuerzos >60 min.",
          "en": "Insufficient evidence on performance, cognition or muscle recovery; GI distress and need to study safety of repeated use and efforts >60 min."
        }
      },
      {
        "title": "Ketone ester supplementation elevates erythropoietin and stimulates muscle angiogenesis during endurance training overload",
        "first_author": "Poffé C",
        "year": 2023,
        "journal": "Journal of Physiology",
        "study_type": "ECA",
        "pmid": "37062892",
        "doi": "10.1113/JP284346",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37062892/",
        "key_finding": {
          "es": "El éster de cetona durante sobrecarga de entrenamiento elevó la EPO (+26%) y estimuló la angiogénesis muscular (capilarización +44%/+42%); base de la señal positiva de adaptación.",
          "en": "Ketone ester during training overload elevated EPO (+26%) and stimulated muscle angiogenesis (capillarization +44%/+42%); basis for the positive adaptation signal."
        }
      }
    ]
  },
  {
    "id": "omega-3",
    "name": {
      "es": "Omega-3 (EPA y DHA)",
      "en": "Omega-3 (EPA and DHA)"
    },
    "category": "recuperacion_antioxidante",
    "evidence_level": "limitada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "Efecto sobre el rendimiento débil e inconsistente. 1-3 g/d de EPA+DHA por 6-12 sem modifican la fisiología submáxima (menor FC, mejor economía, menor RPE, +VO2pico modesto) pero casi nunca se traducen en mejor CRI o marca. El consenso ISSN 2025 reconoce mejoras en capacidad, economía, deformabilidad eritrocitaria y recuperación de FC, pero subraya que el rendimiento directo es equívoco. Su valor más sólido: nutriente de salud y soporte de recuperación.",
      "en": "Weak and inconsistent performance effect. 1-3 g/day EPA+DHA for 6-12 wk alter submaximal physiology (lower HR, better economy, lower RPE, modest VO2peak) but rarely translate to better time-trial/run performance. ISSN 2025 acknowledges gains in capacity, economy, RBC deformability and HR recovery, but stresses direct performance is equivocal. Strongest as a health/recovery nutrient."
    },
    "effect_size": {
      "es": "Economía: -~150 mL O2/min/100W tras 8 sem (Hingley 2017); VO2pico +~2,4 mL/kg/min a 12 sem (Tomczyk 2023). Rendimiento directo: ns en CRI de ciclismo (James 2020: 239->243 W; Blannin 2025 CRI 24 km sin diferencia) ni en 1500 m (Tomczyk 2023). DOMS: MD -0,93 (IC -1,44 a -0,42) pero bajo el umbral clínico (Lv 2020).",
      "en": "Economy: -~150 mL O2/min/100W after 8 weeks (Hingley 2017); VO2peak +~2.4 mL/kg/min at 12 weeks (Tomczyk 2023). Direct performance: ns in cycling TT (James 2020: 239->243 W; Blannin 2025 TT 24 km no difference) or in 1500 m (Tomczyk 2023). DOMS: MD -0.93 (CI -1.44 to -0.42) but below clinical threshold (Lv 2020)."
    },
    "mechanism": {
      "es": "EPA/DHA se incorporan a los fosfolípidos de membrana (eritrocito, miocito, mitocondria), aumentando la fluidez/deformabilidad y mejorando el aporte de O2 y el coste de O2/FC. EPA da eicosanoides menos inflamatorios; DHA da resolvinas/protectinas (pro-resolución). Posible modulación mitocondrial. Se cuantifica con el Índice Omega-3 (objetivo >8%).",
      "en": "EPA/DHA incorporate into membrane phospholipids (erythrocyte, myocyte, mitochondria), increasing fluidity/deformability and improving O2 delivery and O2/HR cost. EPA yields less inflammatory eicosanoids; DHA yields resolvins/protectins (pro-resolution). Possible mitochondrial modulation. Quantified with the Omega-3 Index (target >8%)."
    },
    "dosage": {
      "es": "1-3 g/d de EPA+DHA. Marco AIS: 500-600 mg/d mínimo de salud; 1000-2000 mg/d antiinflamatorio/recuperación; >1000 mg/d en lesión. Los estudios con señal usaron dosis altas (2234 mg EPA + 916 mg DHA, Tomczyk 2023; ~3 g, Blannin 2025). Objetivo Índice >8%.",
      "en": "1-3 g/d of EPA+DHA. AIS framework: 500-600 mg/d minimum for health; 1000-2000 mg/d anti-inflammatory/recovery; >1000 mg/d for injury. Studies with a signal used high doses (2234 mg EPA + 916 mg DHA, Tomczyk 2023; ~3 g, Blannin 2025). Target Index >8%."
    },
    "timing": {
      "es": "Carga crónica, no aguda: >=2 semanas para remodelar fosfolípidos, >=4 para cambios funcionales, meseta a 3-6 meses (ISSN 2025). Tomar con grasa. Lo relevante es mantener el Índice elevado, no el momento pre-ejercicio.",
      "en": "Chronic loading, not acute: >=2 weeks to remodel phospholipids, >=4 weeks for functional changes, plateau at 3-6 months (ISSN 2025). Take with fat. What matters is maintaining a high Index, not the pre-exercise moment."
    },
    "who_benefits": {
      "es": "Atletas con Índice Omega-3 basal bajo o poco pescado azul (promedios ~4-5%): los más probables respondedores. También soporte de recuperación tras daño muscular, salud cardiovascular, inmunidad, sueño y neuroprotección en deportes de contacto. Quienes ya consumen suficiente pescado obtienen poco extra en rendimiento.",
      "en": "Athletes with low baseline Omega-3 Index or little oily fish intake (averages ~4-5%): the most likely responders. Also supports recovery after muscle damage, cardiovascular health, immunity, sleep and neuroprotection in contact sports. Those who already consume sufficient oily fish gain little extra in performance."
    },
    "caveats": {
      "es": "Disociación clave: los beneficios fisiológicos no se traducen en mejor rendimiento competitivo (CRI/marca). Muchos estudios no midieron el Índice basal. Para DOMS la reducción es significativa pero subclínica (Lv 2020). AIS Grupo B (no A). Mejor caso de uso: salud, recuperación, inflamación.",
      "en": "Key dissociation: physiological benefits do not translate into better competitive performance (TT/personal best). Many studies did not measure baseline Index. For DOMS, the reduction is significant but subclinical (Lv 2020). AIS Group B (not A). Best use case: health, recovery, inflammation."
    },
    "side_effects": {
      "es": "Bien tolerado a 1-3 g/d. Regusto/eructos a pescado, distrés GI leve, náuseas, a veces diarrea. >3 g/d puede prolongar el tiempo de sangrado (precaución con anticoagulantes/cirugía). Riesgo de calidad/contaminación; preferir certificación de pureza y antidopaje.",
      "en": "Well tolerated at 1-3 g/d. Fishy aftertaste/belching, mild GI distress, nausea, sometimes diarrhea. >3 g/d may prolong bleeding time (caution with anticoagulants/surgery). Quality/contamination risk; prefer purity and anti-doping certification."
    },
    "population_match": "resistencia_general",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "B",
    "ais_verified": true,
    "citations": [
      {
        "title": "International Society of Sports Nutrition Position Stand: Long-Chain Omega-3 Polyunsaturated Fatty Acids",
        "first_author": "Jäger R",
        "year": 2025,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Position stand",
        "pmid": "39810703",
        "doi": "10.1080/15502783.2024.2441775",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39810703/",
        "key_finding": {
          "es": "El omega-3 puede mejorar la capacidad de resistencia, la economía, la deformabilidad eritrocitaria y la recuperación de FC, pero los efectos directos son inconsistentes; dosis 240-2234 mg EPA + 120-916 mg DHA/d; Índice objetivo >8%; remodelación >=2 sem; DOMS equívoco.",
          "en": "Omega-3 may improve endurance capacity, economy, erythrocyte deformability and HR recovery, but direct effects are inconsistent; doses 240-2234 mg EPA + 120-916 mg DHA/d; target Index >8%; remodeling >=2 weeks; DOMS equivocal."
        }
      },
      {
        "title": "Effects of 12 Wk of Omega-3 Fatty Acid Supplementation in Long-Distance Runners",
        "first_author": "Tomczyk M",
        "year": 2023,
        "journal": "Medicine & Science in Sports & Exercise",
        "study_type": "ECA",
        "pmid": "36161864",
        "doi": "10.1249/MSS.0000000000003038",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36161864/",
        "key_finding": {
          "es": "26 corredores: 2234 mg EPA + 916 mg DHA/d x 12 sem elevó el Índice 5,8->11,6% y el VO2pico 53,6->56,0; sin mejora en 1500 m.",
          "en": "26 runners: 2234 mg EPA + 916 mg DHA/d x 12 weeks raised Index 5.8->11.6% and VO2peak 53.6->56.0; no improvement in 1500 m."
        }
      },
      {
        "title": "Four Weeks of Omega-3 Supplementation does not Improve Cycling Time Trial Performance in Trained Cyclists",
        "first_author": "James LS",
        "year": 2020,
        "journal": "Archives of Sports Medicine",
        "study_type": "ECA",
        "pmid": null,
        "doi": null,
        "url": "https://scholars.direct/Articles/sports-medicine/aspm-4-037.php",
        "key_finding": {
          "es": "10 ciclistas, 5,7 g/d x 4 sem: sin mejora de potencia (239 vs 243 W) ni VO2/FC/RPE, pese a aumentar el omega-3 en sangre. Revista no indexada en MEDLINE, calidad débil.",
          "en": "10 cyclists, 5.7 g/d x 4 weeks: no improvement in power (239 vs 243 W) or VO2/HR/RPE, despite increasing blood omega-3. Journal not indexed in MEDLINE, weak quality."
        }
      },
      {
        "title": "DHA-rich Fish Oil Increases the Omega-3 Index and Lowers the Oxygen Cost of Submaximal Cycling",
        "first_author": "Hingley L",
        "year": 2017,
        "journal": "International Journal of Sport Nutrition and Exercise Metabolism",
        "study_type": "ECA",
        "pmid": "28338369",
        "doi": "10.1123/ijsnem.2016-0150",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28338369/",
        "key_finding": {
          "es": "26 varones: 560 mg DHA + 140 mg EPA/d x 8 sem elevó el Índice 4,7->6,3% y bajó el coste de O2 (~150 mL O2/min/100W), sin mejorar potencia/CRI/fuerza.",
          "en": "26 males: 560 mg DHA + 140 mg EPA/d x 8 weeks raised Index 4.7->6.3% and lowered O2 cost (~150 mL O2/min/100W), without improving power/TT/strength."
        }
      },
      {
        "title": "Six weeks of EPA-rich or DHA-rich omega-3 supplementation alters submaximal exercise physiology",
        "first_author": "Blannin AK",
        "year": 2025,
        "journal": "Frontiers in Nutrition",
        "study_type": "ECA",
        "pmid": null,
        "doi": "10.3389/fnut.2025.1588421",
        "url": "https://doi.org/10.3389/fnut.2025.1588421",
        "key_finding": {
          "es": "~3 g/d x 6 sem bajó la FC y la RPE submáximas y elevó el Índice >8%, sin diferencia en la mejora de la CRI 24 km vs placebo. Cohorte mixta de disciplinas de resistencia, no solo ciclistas.",
          "en": "~3 g/d x 6 weeks lowered submaximal HR and RPE and raised Index >8%, without difference in improvement of the 24 km TT vs placebo. Mixed cohort of endurance disciplines, not only cyclists."
        }
      },
      {
        "title": "Omega-3 Polyunsaturated Fatty Acids for Reducing Muscle Soreness after Eccentric Exercise: A Systematic Review and Meta-Analysis",
        "first_author": "Lv Z-T",
        "year": 2020,
        "journal": "BioMed Research International",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "32382573",
        "doi": "10.1155/2020/8062017",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32382573/",
        "key_finding": {
          "es": "12 RCT: DOMS MD -0,93 (IC -1,44 a -0,42), bajo el umbral clínico (1,4/10); sin mejora de fuerza ni ROM.",
          "en": "12 RCTs: DOMS MD -0.93 (CI -1.44 to -0.42), below clinical threshold (1.4/10); no improvement in strength or ROM."
        }
      },
      {
        "title": "Effects of Omega-3 Fatty Acids on Post-Exercise Inflammation, Muscle Damage, Oxidative Response, and Sports Performance: A Systematic Review",
        "first_author": "Fernández-Lázaro D",
        "year": 2024,
        "journal": "Nutrients",
        "study_type": "Revisión sistemática",
        "pmid": "38999792",
        "doi": "10.3390/nu16132044",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38999792/",
        "key_finding": {
          "es": "13 RCT (250 mg-6 g/d): reduce CK/LDH e IL-6/PCR, pero sin beneficio claro sobre la función muscular/rendimiento; muchos sin medir el estatus omega-3.",
          "en": "13 RCTs (250 mg-6 g/d): reduces CK/LDH and IL-6/CRP, but no clear benefit on muscle function/performance; many without measuring omega-3 status."
        }
      }
    ]
  },
  {
    "id": "l-carnitina",
    "name": {
      "es": "L-carnitina",
      "en": "L-carnitine"
    },
    "category": "metabolico_energetico",
    "evidence_level": "limitada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "Inconsistente y, en el mejor caso, modesto. La promesa (más oxidación de grasas + ahorro de glucógeno) solo se materializa si se eleva la carnitina muscular, lo que exige semanas-meses de uso crónico con co-ingesta alta de carbohidratos (insulina). El único ensayo robusto que la elevó (+21%) reportó +11% de trabajo en CRI y -55% de uso de glucógeno tras 24 semanas, sin replicación consistente. Revisiones: no mejora el rendimiento aeróbico moderado (50-79% VO2max) y en ciclismo es altamente dependiente del contexto. Meta-análisis recientes señalan menor lactato post y +VO2max pequeño (~2 mL/kg/min) con uso crónico, evidencia de baja certeza.",
      "en": "Inconsistent, at best modest. The fat-oxidation/glycogen-sparing promise only materializes if muscle carnitine is genuinely raised, requiring weeks-to-months of chronic use with high CHO co-ingestion. The one robust trial that raised it (+21%) reported +11% TT work and -55% glycogen use after 24 wk, unreplicated. Reviews: no benefit at moderate aerobic intensity; highly context-dependent in cycling. Recent meta-analyses report lower post-exercise lactate and small VO2max gains, low certainty."
    },
    "effect_size": {
      "es": "Mixto. Wall 2011 (24 sem + CHO): +11% trabajo, +21% carnitina muscular, -55% glucógeno a 50% VO2max, -44% lactato a 80%. Meta-análisis 2024 (14 estudios, 257 atletas): VO2max +2,16 mL/kg/min (IC 0,45-3,87), menor lactato (SMD ~-0,52). Intensidad moderada o protocolos cortos/sin CHO: ns.",
      "en": "Mixed. Wall 2011 (24 weeks + CHO): +11% work, +21% muscle carnitine, -55% glycogen at 50% VO2max, -44% lactate at 80%. Meta-analysis 2024 (14 studies, 257 athletes): VO2max +2.16 mL/kg/min (CI 0.45-3.87), lower lactate (SMD ~-0.52). Moderate intensity or short/no-CHO protocols: ns."
    },
    "mechanism": {
      "es": "Transporta ácidos grasos de cadena larga a la mitocondria (vía CPT) para la beta-oxidación y amortigua el acetil-CoA (acetilcarnitina) liberando CoA. Hipótesis ergogénica: más carnitina libre favorece la oxidación de grasas y ahorra glucógeno a submáximo, y a alta intensidad mejora el redox y reduce el lactato. Cuello de botella: la carnitina muscular está saturada y la suplementación oral aislada no la eleva; solo la co-ingesta alta de CHO activa el transportador OCTN2, un proceso de semanas.",
      "en": "Transports long-chain fatty acids to the mitochondria (via CPT) for beta-oxidation and buffers acetyl-CoA (acetylcarnitine) by releasing CoA. Ergogenic hypothesis: more free carnitine favors fat oxidation and spares glycogen at submaximal intensity, and at high intensity improves redox and reduces lactate. Bottleneck: muscle carnitine is saturated and isolated oral supplementation does not raise it; only high co-ingestion of CHO activates the OCTN2 transporter, a process taking weeks."
    },
    "dosage": {
      "es": "Para elevar la carnitina (Wall/Stephens): ~2 g de L-carnitina-L-tartrato 2x/día (~3-4 g/día) + ~80 g de CHO de alto IG por toma, de forma crónica. AIS/revisiones de ciclismo: 1,4-3 g/día + 40-80 g de CHO por toma. La co-ingesta de CHO es imprescindible.",
      "en": "To raise carnitine (Wall/Stephens): ~2 g L-carnitine-L-tartrate 2x/day (~3-4 g/day) + ~80 g high-GI CHO per dose, chronically. AIS/cycling reviews: 1.4-3 g/day + 40-80 g CHO per dose. CHO co-ingestion is essential."
    },
    "timing": {
      "es": "Crónica >=12 semanas; no es una ayuda aguda fiable. Cada toma con comida rica en CHO. Las dosis agudas de 3-4 g 60-90 min antes solo tuvieron efectos limitados sobre lactato/percepción.",
      "en": "Chronic >=12 weeks; not a reliable acute aid. Each dose with a CHO-rich meal. Acute doses of 3-4 g 60-90 min before only had limited effects on lactate/perception."
    },
    "who_benefits": {
      "es": "Quienes sostengan semanas-meses con CHO alto. Nicho en baja carnitina basal (vegetarianos/veganos) y, según AIS, en entrenamiento intenso/recuperación. La mayoría omnívora con carnitina saturada tiene escaso margen. No es quemagrasas agudo ni ayuda pre-carrera.",
      "en": "Those who can sustain weeks-months with high CHO. Niche in low baseline carnitine (vegetarians/vegans) and, according to AIS, in intense training/recovery. Most omnivores with saturated carnitine have little room. Not an acute fat-burner or pre-race aid."
    },
    "caveats": {
      "es": "Traducción mecanismo->rendimiento frágil. Solo funciona si se eleva la carnitina (protocolo exigente: semanas + ~160 g/día de CHO extra), y el hallazgo positivo (+11%) viene de un único estudio pequeño no replicado (n=14, varones). La carga calórica de CHO puede ser contraproducente para la composición corporal. Heterogeneidad alta. La popularidad como quemagrasas no está justificada.",
      "en": "Mechanism-to-performance translation is fragile. Only works if carnitine is raised (demanding protocol: weeks + ~160 g/day extra CHO), and the positive finding (+11%) comes from a single small unreplicated study (n=14, males). The caloric load of CHO may be counterproductive for body composition. High heterogeneity. Popularity as a fat-burner is not justified."
    },
    "side_effects": {
      "es": "Seguro hasta ~2-4 g/día a largo plazo, con distrés GI leve (náuseas, molestias, diarrea) y a veces olor corporal a pescado a dosis altas. Preocupación metabólica: la microbiota convierte la L-carnitina en TMA -> TMAO (asociado epidemiológicamente a riesgo cardiovascular); la crónica eleva el TMAO. Causalidad debatida; se piden más datos longitudinales.",
      "en": "Safe up to ~2-4 g/day long-term, with mild GI distress (nausea, discomfort, diarrhea) and sometimes fishy body odor at high doses. Metabolic concern: gut microbiota converts L-carnitine to TMA -> TMAO (epidemiologically associated with cardiovascular risk); chronic use raises TMAO. Causality debated; more longitudinal data requested."
    },
    "population_match": "resistencia_general",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "matiz",
    "wada_verified": true,
    "ais_group": "B",
    "ais_verified": true,
    "citations": [
      {
        "title": "Chronic oral ingestion of L-carnitine and carbohydrate increases muscle carnitine content and alters muscle fuel metabolism during exercise in humans",
        "first_author": "Wall BT",
        "year": 2011,
        "journal": "Journal of Physiology",
        "study_type": "ECA",
        "pmid": "21224234",
        "doi": "10.1113/jphysiol.2010.201343",
        "url": "https://pubmed.ncbi.nlm.nih.gov/21224234/",
        "key_finding": {
          "es": "n=14, 24 sem, 2 g de L-carnitina-L-tartrato + 80 g de CHO 2x/día: +21% carnitina, -55% glucógeno a 50% VO2max, -44% lactato a 80%, +11% trabajo.",
          "en": "n=14, 24 weeks, 2 g L-carnitine-L-tartrate + 80 g CHO 2x/day: +21% carnitine, -55% glycogen at 50% VO2max, -44% lactate at 80%, +11% work."
        }
      },
      {
        "title": "Effect of Acute and Chronic Oral l-Carnitine Supplementation on Exercise Performance Based on the Exercise Intensity: A Systematic Review",
        "first_author": "Mielgo-Ayuso J",
        "year": 2021,
        "journal": "Nutrients",
        "study_type": "Revisión sistemática",
        "pmid": "34959912",
        "doi": "10.3390/nu13124359",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34959912/",
        "key_finding": {
          "es": "Sin mejora a intensidad aeróbica moderada (50-79% VO2max); beneficio solo en alta (>=80%) con protocolos específicos; mejor combinada con CHO.",
          "en": "No improvement at moderate aerobic intensity (50-79% VO2max); benefit only at high intensity (>=80%) with specific protocols; better combined with CHO."
        }
      },
      {
        "title": "The bright and the dark sides of L-carnitine supplementation: a systematic review",
        "first_author": "Sawicka AK",
        "year": 2020,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Revisión sistemática",
        "pmid": "32958033",
        "doi": "10.1186/s12970-020-00377-2",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32958033/",
        "key_finding": {
          "es": "La L-carnitina + CHO eleva la carnitina muscular tras 12-24 sem; dosis 1-4 g/día; aumenta el TMAO plasmático en ayunas; sin efectos adversos mayores, con llamado a más datos cardiovasculares longitudinales.",
          "en": "L-carnitine + CHO raises muscle carnitine after 12-24 weeks; doses 1-4 g/day; increases fasting plasma TMAO; no major adverse effects, with a call for more longitudinal cardiovascular data."
        }
      },
      {
        "title": "A comprehensive review of the physiology and evidence base to guide the use of ergogenic and medical supplements for enhanced cycling performance",
        "first_author": "Rowland A",
        "year": 2026,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Revisión narrativa",
        "pmid": "41685663",
        "doi": "10.1080/15502783.2026.2630487",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41685663/",
        "key_finding": {
          "es": "L-carnitina = AIS Grupo B, altamente dependiente del contexto; la co-ingesta crónica con CHO eleva la carnitina (2-3 g/día + 40-80 g de CHO, >=12 sem); NO es ampliamente eficaz para ciclistas.",
          "en": "L-carnitine = AIS Group B, highly context-dependent; chronic co-ingestion with CHO raises carnitine (2-3 g/day + 40-80 g CHO, >=12 weeks); NOT broadly effective for cyclists."
        }
      },
      {
        "title": "L-carnitine supplementation decreases post-exercise blood lactate levels and enhances aerobic capacity: a systematic review and meta-analysis",
        "first_author": "Fukata E",
        "year": 2024,
        "journal": "Trends in Sport Sciences",
        "study_type": "Meta-análisis",
        "pmid": null,
        "doi": null,
        "url": "https://tss.awf.poznan.pl/L-carnitine-supplementation-decreases-post-exercise-blood-nlactate-levels-and-enhances,188434,0,2.html",
        "key_finding": {
          "es": "14 estudios (257 atletas): VO2max +2,16 mL/kg/min (IC 0,45-3,87) y menor lactato (SMD -0,52); la crónica reduce lactato y la aguda solo eleva el VO2max; baja certeza. No indexado en MEDLINE.",
          "en": "14 studies (257 athletes): VO2max +2.16 mL/kg/min (CI 0.45-3.87) and lower lactate (SMD -0.52); chronic reduces lactate and acute only raises VO2max; low certainty. Not indexed in MEDLINE."
        }
      }
    ]
  },
  {
    "id": "bcaa",
    "name": {
      "es": "BCAA (aminoácidos de cadena ramificada)",
      "en": "BCAA (branched-chain amino acids)"
    },
    "category": "aminoacido",
    "evidence_level": "limitada",
    "evidence_direction": "contextual",
    "confidence": "alta",
    "performance_effect": {
      "es": "Para resistencia en ciclismo la evidencia es limitada y mayormente nula: los ensayos en CRI bien controlados no muestran mejora directa. Madsen 1996 (glucosa+BCAA en CRI 100 km) no encontró diferencia (157,2 glucosa / 160,1 glucosa+BCAA / 159,8 placebo min) pese a triplicar los BCAA plasmáticos. La hipótesis de fatiga central (BCAA compiten con triptófano, menos serotonina) es atractiva pero el soporte humano es limitado (Meeusen 2006). Revisiones recientes (Julea 2025): efecto inconsistente y dependiente del contexto, con alto riesgo de sesgo. Único beneficio razonable: indirecto, reducción de DOMS y CK tras esfuerzos excéntricos (Salem 2024).",
      "en": "Limited and largely null for endurance cycling: well-controlled TT trials show no direct benefit. Madsen 1996 found no difference in a 100 km TT (157.2 glucose / 160.1 glucose+BCAA / 159.8 placebo min) despite tripling plasma BCAA. The central-fatigue hypothesis has limited human support (Meeusen 2006). Recent reviews (Julea 2025): inconsistent, context-dependent, high risk of bias. Only reasonably supported benefit is indirect: reduced DOMS and CK after eccentric efforts (Salem 2024)."
    },
    "effect_size": {
      "es": "ns en CRI de ciclismo (157,2 glucosa / 160,1 glucosa+BCAA / 159,8 placebo min en 100 km; Madsen 1996). Recuperación: DOMS g ~-1,75 a -1,82 (48-72 h) y CK g ~-0,99 (72 h) (Salem 2024).",
      "en": "ns in cycling TT (157.2 glucose / 160.1 glucose+BCAA / 159.8 placebo min in 100 km; Madsen 1996). Recovery: DOMS g ~-1.75 to -1.82 (48-72 h) and CK g ~-0.99 (72 h) (Salem 2024)."
    },
    "mechanism": {
      "es": "Hipótesis de fatiga central: el ejercicio prolongado eleva el triptófano libre, que cruza la BHE compartiendo el LAT1 con los BCAA y eleva la serotonina (5-HT) asociada a la fatiga. Suplementar BCAA elevaría la relación BCAA:triptófano, frenando la 5-HT y reduciendo la RPE. En la práctica, el triptófano libre depende de los ácidos grasos libres y el glucógeno, por lo que el CHO co-ingerido explica buena parte del efecto. Para la recuperación, la leucina activa mTOR y atenúa la proteólisis/daño tras contracciones excéntricas. Para la síntesis proteica neta, los BCAA aislados son subóptimos (faltan los demás EAA).",
      "en": "Central fatigue hypothesis: prolonged exercise raises free tryptophan, which crosses the BBB sharing LAT1 with BCAAs and raises serotonin (5-HT) associated with fatigue. BCAA supplementation would raise the BCAA:tryptophan ratio, slowing 5-HT and reducing RPE. In practice, free tryptophan depends on free fatty acids and glycogen, so co-ingested CHO explains much of the effect. For recovery, leucine activates mTOR and attenuates proteolysis/damage after eccentric contractions. For net protein synthesis, isolated BCAAs are suboptimal (the other EAAs are missing)."
    },
    "dosage": {
      "es": "Recuperación: ~5-12 g/día (ratio 2:1:1). En ciclismo, Madsen co-ingirió con glucosa. Salem 2024: dosis totales más altas durante >7 días dan mayores efectos en CK/DOMS. Síntesis proteica: umbral de leucina ~700-3000 mg/toma, pero la ISSN (Jäger 2017) recomienda proteína completa (20-40 g), no BCAA aislados.",
      "en": "Recovery: ~5-12 g/day (2:1:1 ratio). In cycling, Madsen co-ingested with glucose. Salem 2024: higher total doses over >7 days give greater effects on CK/DOMS. Protein synthesis: leucine threshold ~700-3000 mg/dose, but ISSN (Jäger 2017) recommends complete protein (20-40 g), not isolated BCAAs."
    },
    "timing": {
      "es": "Sin protocolo respaldado para resistencia. Recuperación: crónica (días-semanas) antes/después del bloque supera a la toma aguda. Síntesis proteica: proteína completa cada 3-4 h y en torno a la sesión.",
      "en": "No supported protocol for endurance. Recovery: chronic (days-weeks) before/after the block outperforms single acute intake. Protein synthesis: complete protein every 3-4 h and around the session."
    },
    "who_benefits": {
      "es": "Muy acotado: ciclistas con alto componente excéntrico/lesivo (descensos largos, gimnasio, MTB técnico) podrían notar menos DOMS con uso crónico. Sin fenotipo respondedor para rendimiento. Algún efecto en RPE con depleción de glucógeno o calor, difícil de separar del CHO. Con ingesta proteica adecuada (1,6-2 g/kg), los BCAA aislados aportan poco.",
      "en": "Very limited: cyclists with a high eccentric/damaging component (long descents, gym, technical MTB) might notice less DOMS with chronic use. No responder phenotype for performance. Some effect on RPE with glycogen depletion or heat, difficult to separate from CHO. With adequate protein intake (1.6-2 g/kg), isolated BCAAs contribute little."
    },
    "caveats": {
      "es": "El beneficio endurance comercial está sobrevalorado: los positivos mezclan BCAA con CHO/alanina (Gervasi 2020, 13 g CHO). El estudio de sprint más citado (Kephart 2015) es solo un resumen de congreso, no revisado, y queda EXCLUIDO de las citas principales. Para músculo/recuperación, la proteína completa supera a los BCAA. Heterogeneidad alta (I2 ~85-86%) y riesgo de sesgo elevado.",
      "en": "The endurance commercial benefit is overstated: the positives mix BCAAs with CHO/alanine (Gervasi 2020, 13 g CHO). The most-cited sprint study (Kephart 2015) is only a congress abstract, not peer-reviewed, and is EXCLUDED from the main citations. For muscle/recovery, complete protein outperforms BCAAs. High heterogeneity (I2 ~85-86%) and high risk of bias."
    },
    "side_effects": {
      "es": "Buen perfil. Distrés GI leve con dosis altas, sabor amargo. Dosis muy altas/sostenidas pueden alterar otros aminoácidos neutros y el metabolismo del nitrógeno; precaución en enfermedad hepática/renal. Sin toxicidad aguda conocida en sanos a dosis ergogénicas.",
      "en": "Good profile. Mild GI distress with high doses, bitter taste. Very high/sustained doses may alter other neutral amino acids and nitrogen metabolism; caution in liver/kidney disease. No known acute toxicity in healthy individuals at ergogenic doses."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "C",
    "ais_verified": true,
    "citations": [
      {
        "title": "Effects of glucose, glucose plus branched-chain amino acids, or placebo on bike performance over 100 km",
        "first_author": "Madsen K",
        "year": 1996,
        "journal": "Journal of Applied Physiology",
        "study_type": "ECA",
        "pmid": "9018517",
        "doi": "10.1152/jappl.1996.81.6.2644",
        "url": "https://pubmed.ncbi.nlm.nih.gov/9018517/",
        "key_finding": {
          "es": "9 ciclistas: glucosa+BCAA no mejoró el tiempo (157,2 glucosa / 160,1 glucosa+BCAA / 159,8 placebo min, ns) pese a triplicar los BCAA plasmáticos.",
          "en": "9 cyclists: glucose+BCAA did not improve time (157.2 glucose / 160.1 glucose+BCAA / 159.8 placebo min, ns) despite tripling plasma BCAAs."
        }
      },
      {
        "title": "Central fatigue: the serotonin hypothesis and beyond",
        "first_author": "Meeusen R",
        "year": 2006,
        "journal": "Sports Medicine",
        "study_type": "Revisión",
        "pmid": "17004850",
        "doi": "10.2165/00007256-200636100-00006",
        "url": "https://pubmed.ncbi.nlm.nih.gov/17004850/",
        "key_finding": {
          "es": "Soporte humano limitado para que la manipulación BCAA/triptófano combata la fatiga; el peso recae en el ratio serotonina:dopamina y dopamina/noradrenalina.",
          "en": "Limited human support for BCAA/tryptophan manipulation to combat fatigue; the weight rests on the serotonin:dopamine and dopamine/noradrenaline ratio."
        }
      },
      {
        "title": "The Effect of Oral Pure BCAA Supplementation on Exercise Performance and Body Composition: A Systematic Review",
        "first_author": "Julea M",
        "year": 2025,
        "journal": "Cureus",
        "study_type": "Revisión sistemática",
        "pmid": "41346907",
        "doi": "10.7759/cureus.78000",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41346907/",
        "key_finding": {
          "es": "22 RCT (riesgo de sesgo poco claro/alto): evidencia ergogénica inconsistente y dependiente del contexto; la resistencia no es uniformemente favorable.",
          "en": "22 RCTs (unclear/high risk of bias): inconsistent ergogenic evidence dependent on context; endurance is not uniformly favorable."
        }
      },
      {
        "title": "Attenuating Muscle Damage Biomarkers and Muscle Soreness After Exercise-Induced Muscle Damage with BCAA Supplementation: A Systematic Review and Meta-analysis",
        "first_author": "Salem A",
        "year": 2024,
        "journal": "Sports Medicine - Open",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "38625669",
        "doi": "10.1186/s40798-024-00686-9",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38625669/",
        "key_finding": {
          "es": "18 RCT: CK g=-0,99 (72 h) y DOMS g ~-1,75 a -1,82 (48-72 h); mayores efectos con dosis altas durante >7 días; sin efecto en LDH.",
          "en": "18 RCTs: CK g=-0.99 (72 h) and DOMS g ~-1.75 to -1.82 (48-72 h); greater effects with high doses over >7 days; no effect on LDH."
        }
      },
      {
        "title": "International Society of Sports Nutrition Position Stand: protein and exercise",
        "first_author": "Jäger R",
        "year": 2017,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Position stand",
        "pmid": "28642676",
        "doi": "10.1186/s12970-017-0177-8",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28642676/",
        "key_finding": {
          "es": "Priorizar proteína completa (700-3000 mg de leucina/toma con un array de EAA); los BCAA aislados son subóptimos frente a la proteína intacta.",
          "en": "Prioritize complete protein (700-3000 mg leucine/dose with an array of EAAs); isolated BCAAs are suboptimal compared to intact protein."
        }
      },
      {
        "title": "Effects of a commercial branched-chain amino acid-alanine-carbohydrate sports supplement on perceived exertion and performance in high-intensity endurance cycling",
        "first_author": "Gervasi M",
        "year": 2020,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "ECA",
        "pmid": "31959202",
        "doi": "10.1186/s12970-020-0337-0",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31959202/",
        "key_finding": {
          "es": "El suplemento de BCAA (3,2 g) + alanina + CHO (13,2 g) redujo la RPE 9-21%; efecto confundido por el CHO co-ingerido.",
          "en": "BCAA supplement (3.2 g) + alanine + CHO (13.2 g) reduced RPE 9-21%; effect confounded by co-ingested CHO."
        }
      }
    ]
  },
  {
    "id": "glutamina",
    "name": {
      "es": "Glutamina",
      "en": "Glutamine"
    },
    "category": "aminoacido",
    "evidence_level": "en_contra",
    "evidence_direction": "nulo",
    "confidence": "alta",
    "performance_effect": {
      "es": "No mejora el rendimiento de resistencia. El meta-análisis de referencia (Ramezani Ahmadi 2019; 47 estudios / 25 en meta-análisis) no halló efecto sobre VO2máx, función inmune, composición corporal ni glucosa/CK/GH post-ejercicio (de hecho la glutamina-dipéptido aumentó la glucosa +0,51 mmol/L). En el único RCT en ciclistas (Osborne 2019, n=12), 0,9 g/kg MLG 60 min antes no alteró el tiempo, potencia, velocidad ni cadencia en CRI 20 km en calor (35 C); 11 s a favor del placebo, dentro del ruido. Único nicho con señal: integridad de la barrera intestinal a dosis altas (0,9 g/kg MLG; Pugh 2017), sin traducción en rendimiento ni menos síntomas GI; a dosis baja (0,3 g/kg; Ogden 2022) no hubo protección.",
      "en": "Does not improve endurance performance. The reference meta-analysis (Ramezani Ahmadi 2019) found no effect on VO2max, immune function, body composition or post-exercise markers (the glutamine dipeptide actually raised glucose +0.51 mmol/L). In the only cyclist RCT (Osborne 2019, n=12), 0.9 g/kg FFM did not alter a 20 km TT in the heat (11 s favoring placebo). Only niche: gut barrier integrity at high doses (Pugh 2017), untranslated to performance and absent at low dose (Ogden 2022)."
    },
    "effect_size": {
      "es": "Aeróbico: ns (sin efecto en VO2máx; ~11 s a favor del placebo en CRI 20 km, IC -23 a +44 s). Permeabilidad intestinal: reducción moderada dosis-dependiente del cociente lactulosa:ramnosa solo a 0,9 g/kg MLG (MD ~-0,034); nula a 0,3 g/kg.",
      "en": "Aerobic: ns (no effect on VO2max; ~11 s in favor of placebo in 20 km TT, CI -23 to +44 s). Intestinal permeability: moderate dose-dependent reduction of the lactulose:rhamnose ratio only at 0.9 g/kg LBM (MD ~-0.034); null at 0.3 g/kg."
    },
    "mechanism": {
      "es": "Aminoácido libre más abundante del plasma y combustible de linfocitos/enterocitos, base de la hipótesis de la glutamina (el ejercicio bajaría la glutamina, comprometiendo la inmunidad y abriendo una ventana). No confirmada: la caída es transitoria y no hay evidencia causal con infecciones, ni la suplementación restaura medidas inmunes funcionales. Mecanismo real: local en el intestino, sustrato del enterocito que favorece las uniones estrechas y limita el daño por isquemia esplácnica en calor (efecto que escala con la dosis).",
      "en": "Most abundant free amino acid in plasma and fuel for lymphocytes/enterocytes, basis of the glutamine hypothesis (exercise would lower glutamine, compromising immunity and opening a window). Unconfirmed: the drop is transient and there is no causal evidence with infections, nor does supplementation restore functional immune measures. Real mechanism: local in the gut, substrate for the enterocyte that promotes tight junctions and limits damage from splanchnic ischemia in the heat (effect that scales with dose)."
    },
    "dosage": {
      "es": "Rendimiento/inmunidad: ninguna dosis ha demostrado beneficio (~0,1-0,9 g/kg agudo, o 0,1-0,3 g/kg/día crónico). Integridad intestinal en calor: bolo agudo 0,9 g/kg MLG (~50-70 g); dosis menores más débiles y 0,3 g/kg no protege. >200 mg/kg reduce neutrófilos (dirección desfavorable).",
      "en": "Performance/immunity: no dose has demonstrated benefit (~0.1-0.9 g/kg acute, or 0.1-0.3 g/kg/day chronic). Gut integrity in heat: acute bolus 0.9 g/kg LBM (~50-70 g); lower doses weaker and 0.3 g/kg does not protect. >200 mg/kg reduces neutrophils (unfavorable direction)."
    },
    "timing": {
      "es": "Ciclismo: 60 min antes. Barrera intestinal: bolo ~2 h antes en calor (Pugh 2017). Sin protocolo validado para rendimiento.",
      "en": "Cycling: 60 min before. Gut barrier: bolus ~2 h before in heat (Pugh 2017). No validated protocol for performance."
    },
    "who_benefits": {
      "es": "Sin perfil de respondedor para rendimiento. Único subgrupo con justificación plausible: atletas en calor o con distrés de barrera intestinal (dosis altas agudas reducen marcadores de permeabilidad), pero sin demostración de menos síntomas ni mejor rendimiento.",
      "en": "No responder profile for performance. Only subgroup with plausible justification: athletes in heat or with gut barrier distress (high acute doses reduce permeability markers), but without demonstrated reduction in symptoms or improved performance."
    },
    "caveats": {
      "es": "Marketing basado en la hipótesis inmunológica de los 90, hoy no respaldada. El meta-análisis Clin Nutr 2019 es de Ramezani Ahmadi, NO de Cordova-Martínez. AIS: la glutamina NO aparece en ninguno de los 4 grupos oficiales actuales; la atribución a Grupo B viene de fuentes secundarias antiguas (por eso AIS no verificado). La evidencia gut es a dosis altas, en muestras pequeñas (n=10-12), sin desenlaces de rendimiento y contradicha a dosis baja.",
      "en": "Marketing based on the immunological hypothesis of the 1990s, not currently supported. The Clin Nutr 2019 meta-analysis is by Ramezani Ahmadi, NOT by Cordova-Martínez. AIS: glutamine does NOT appear in any of the 4 current official groups; attribution to Group B comes from old secondary sources (hence AIS not verified). The gut evidence is at high doses, in small samples (n=10-12), without performance outcomes and contradicted at low doses."
    },
    "side_effects": {
      "es": "Bien tolerada en ensayos. Señal de precaución: disminución de neutrófilos a >200 mg/kg (opuesto al supuesto beneficio inmune); a dosis baja la permeabilidad fue numéricamente MAYOR con glutamina. Las dosis altas (50-70 g) son volumétricamente grandes y pueden causar molestias digestivas.",
      "en": "Well tolerated in trials. Caution signal: decrease in neutrophils at >200 mg/kg (opposite of the supposed immune benefit); at low dose, permeability was numerically HIGHER with glutamine. High doses (50-70 g) are volumetrically large and can cause digestive discomfort."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "no_verificado",
    "ais_verified": false,
    "citations": [
      {
        "title": "The effect of glutamine supplementation on athletic performance, body composition, and immune function: A systematic review and a meta-analysis of clinical trials",
        "first_author": "Ramezani Ahmadi A",
        "year": 2019,
        "journal": "Clinical Nutrition",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "29784526",
        "doi": "10.1016/j.clnu.2018.05.001",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29784526/",
        "key_finding": {
          "es": "47 estudios (25 en meta-análisis): sin efecto en inmunidad, VO2máx ni composición; disminución de neutrófilos a >200 mg/kg; ligera disminución de peso (~-1,36 kg); la glutamina-dipéptido AUMENTÓ la glucosa post-ejercicio +0,51 mmol/L.",
          "en": "47 studies (25 in meta-analysis): no effect on immunity, VO2max or body composition; decrease in neutrophils at >200 mg/kg; slight weight decrease (~-1.36 kg); glutamine-dipeptide INCREASED post-exercise glucose +0.51 mmol/L."
        }
      },
      {
        "title": "Acute glutamine supplementation does not improve 20-km self-paced cycling performance in the heat",
        "first_author": "Osborne JO",
        "year": 2019,
        "journal": "European Journal of Applied Physiology",
        "study_type": "ECA",
        "pmid": "31565753",
        "doi": "10.1007/s00421-019-04224-4",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31565753/",
        "key_finding": {
          "es": "12 ciclistas, 0,9 g/kg MLG 60 min antes: sin cambios en la CRI 20 km a 35 C (~11 s a favor del placebo); I-FABP igual, sin endotoxemia.",
          "en": "12 cyclists, 0.9 g/kg LBM 60 min before: no changes in 20 km TT at 35 C (~11 s in favor of placebo); I-FABP equal, no endotoxemia."
        }
      },
      {
        "title": "Glutamine supplementation reduces markers of intestinal permeability during running in the heat in a dose-dependent manner",
        "first_author": "Pugh JN",
        "year": 2017,
        "journal": "European Journal of Applied Physiology",
        "study_type": "ECA",
        "pmid": "29058112",
        "doi": "10.1007/s00421-017-3744-4",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29058112/",
        "key_finding": {
          "es": "10 varones, 0,25-0,9 g/kg MLG 2 h antes: disminución dosis-dependiente del cociente lactulosa:ramnosa, máxima a 0,9 g/kg; el rendimiento no se midió.",
          "en": "10 males, 0.25-0.9 g/kg LBM 2 h before: dose-dependent decrease in lactulose:rhamnose ratio, maximum at 0.9 g/kg; performance was not measured."
        }
      },
      {
        "title": "No protective benefits of low dose acute L-glutamine supplementation on small intestinal permeability, gastrointestinal symptoms and systemic endotoxaemia in trained runners: a randomised controlled trial",
        "first_author": "Ogden HB",
        "year": 2022,
        "journal": "Temperature (Austin)",
        "study_type": "ECA",
        "pmid": "36106146",
        "doi": "10.1080/23328940.2022.2105661",
        "url": "https://pubmed.ncbi.nlm.nih.gov/36106146/",
        "key_finding": {
          "es": "10 varones, 0,3 g/kg MLG: sin protección de permeabilidad/daño/translocación; la permeabilidad fue incluso mayor con glutamina.",
          "en": "10 males, 0.3 g/kg LBM: no protection of permeability/damage/translocation; permeability was even higher with glutamine."
        }
      }
    ]
  },
  {
    "id": "antioxidantes-dosis-altas",
    "name": {
      "es": "Antioxidantes en dosis altas (vitaminas C y E)",
      "en": "High-dose antioxidants (vitamins C and E)"
    },
    "category": "recuperacion_antioxidante",
    "evidence_level": "en_contra",
    "evidence_direction": "perjudicial",
    "confidence": "alta",
    "performance_effect": {
      "es": "La megadosis crónica de vitamina C (~1 g/d) + vitamina E (235-400 UI/d) no mejora el rendimiento y, en fase de adaptación, atenúa las señales celulares que sostienen la mejora a largo plazo. ECA de referencia (Paulsen 2014; Ristow 2009): bloquean el aumento entrenamiento-inducido de PGC-1alfa y marcadores mitocondriales (COX4) y frenan las defensas antioxidantes endógenas (SOD) y la sensibilidad a la insulina. El meta-análisis de Clifford 2020 no halló diferencias en VO2máx ni rendimiento a 12 semanas: el daño es sobre la adaptación molecular, no sobre el cronómetro inmediato. Consenso: evitar megadosis en bloques de adaptación; corregir solo deficiencias documentadas.",
      "en": "Chronic high-dose vitamin C (~1 g/d) + vitamin E (235-400 IU/d) does not improve performance and, during adaptation, blunts the cellular signaling driving long-term gains (Paulsen 2014; Ristow 2009 block PGC-1alpha, COX4, SOD and insulin-sensitivity upregulation). Clifford 2020 found no VO2max/performance difference at 12 wk: harm is to molecular adaptation, not the immediate stopwatch."
    },
    "effect_size": {
      "es": "Rendimiento: ns (SMD -0,01 resistencia; -0,14 VO2máx, Clifford 2020). Adaptación celular: atenuación marcada de PGC-1alfa y COX4 (p<=0,03, Paulsen 2014).",
      "en": "Performance: ns (SMD -0.01 endurance; -0.14 VO2max, Clifford 2020). Cellular adaptation: marked attenuation of PGC-1alpha and COX4 (p<=0.03, Paulsen 2014)."
    },
    "mechanism": {
      "es": "Las ROS del ejercicio son una señal redox (hormesis) que activa AMPK->PGC-1alfa (regulador maestro de la biogénesis mitocondrial). Las megadosis de C/E amortiguan esas ROS y silencian la inducción de PGC-1alfa, TFAM, COX4 y las enzimas antioxidantes endógenas (SOD), además de anular las mejoras en sensibilidad a la insulina.",
      "en": "Exercise-derived ROS are a redox signal (hormesis) that activates AMPK->PGC-1alpha (master regulator of mitochondrial biogenesis). Megadoses of C/E quench those ROS and silence the induction of PGC-1alpha, TFAM, COX4 and endogenous antioxidant enzymes (SOD), and also nullify improvements in insulin sensitivity."
    },
    "dosage": {
      "es": "~1000 mg/d de vit C + 235-400 UI/d de vit E es la combinación con evidencia de interferencia (a evitar en adaptación). No existe dosis con beneficio ergogénico demostrado. Las dosis menores (500 mg C + 400 UI E) no mostraron el patrón de interferencia (dosis-dependencia, Mason 2020).",
      "en": "~1000 mg/d of vitamin C + 235-400 IU/d of vitamin E is the combination with evidence of interference (to avoid during adaptation). No dose with demonstrated ergogenic benefit exists. Lower doses (500 mg C + 400 IU E) did not show the interference pattern (dose-dependence, Mason 2020)."
    },
    "timing": {
      "es": "Evitar megadosis crónicas en bloques de adaptación aeróbica y en la ventana post-ejercicio inmediata; reservar solo para corregir deficiencias documentadas.",
      "en": "Avoid chronic megadoses during aerobic adaptation blocks and in the immediate post-exercise window; reserve only for correcting documented deficiencies."
    },
    "who_benefits": {
      "es": "Solo atletas con deficiencia documentada de C o E (raro). Ningún subgrupo gana rendimiento. Mayor riesgo de perder adaptación: ciclistas en bloques de base que toman antioxidantes profilácticamente.",
      "en": "Only athletes with documented vitamin C or E deficiency (rare). No subgroup gains performance. Greatest risk of losing adaptation: cyclists in base training blocks who take antioxidants prophylactically."
    },
    "caveats": {
      "es": "El daño es sobre la adaptación molecular crónica, no sobre el rendimiento agudo: los meta-análisis a 8-12 sem no detectan caídas, lo que explica la aparente contradicción. La interferencia es dosis-dependiente y específica de suplementos aislados; los antioxidantes de alimentos integrales no muestran el patrón. No extrapolar desde fuerza/hipertrofia. Población: Ristow/Paulsen son corredores/sujetos sanos, no ciclistas (extrapolación mitocondrial razonable).",
      "en": "The damage is to chronic molecular adaptation, not to acute performance: 8-12 week meta-analyses do not detect declines, which explains the apparent contradiction. Interference is dose-dependent and specific to isolated supplements; whole-food antioxidants do not show the pattern. Do not extrapolate from strength/hypertrophy. Population: Ristow/Paulsen are runners/healthy subjects, not cyclists (reasonable mitochondrial extrapolation)."
    },
    "side_effects": {
      "es": "Vit C megadosis (>1 g/d): distrés GI (diarrea osmótica, calambres), riesgo de cálculos de oxalato. Vit E alta crónica (>400 UI/d): posible aumento de mortalidad por todas las causas en meta-análisis poblacionales (Miller 2005) y riesgo de sangrado (cuidado con anticoagulantes). El efecto secundario funcional clave es la atenuación de adaptaciones.",
      "en": "Vitamin C megadoses (>1 g/d): GI distress (osmotic diarrhea, cramps), risk of oxalate stones. High chronic vitamin E (>400 IU/d): possible increase in all-cause mortality in population meta-analyses (Miller 2005) and bleeding risk (caution with anticoagulants). The key functional side effect is attenuation of adaptations."
    },
    "population_match": "extrapolado_otros_deportes",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "no_verificado",
    "ais_verified": false,
    "citations": [
      {
        "title": "Vitamin C and E supplementation hampers cellular adaptation to endurance training in humans: a double-blind, randomised, controlled trial",
        "first_author": "Paulsen G",
        "year": 2014,
        "journal": "Journal of Physiology",
        "study_type": "ECA",
        "pmid": "24492839",
        "doi": "10.1113/jphysiol.2013.267419",
        "url": "https://pubmed.ncbi.nlm.nih.gov/24492839/",
        "key_finding": {
          "es": "54 sujetos, 11 sem, 1000 mg C + 235 mg E/d: COX4 +59% placebo vs -13% suplementado, PGC-1alfa +19% vs -13% (p<=0,03); VO2máx +8% en ambos grupos.",
          "en": "54 subjects, 11 weeks, 1000 mg C + 235 mg E/d: COX4 +59% placebo vs -13% supplemented, PGC-1alpha +19% vs -13% (p<=0.03); VO2max +8% in both groups."
        }
      },
      {
        "title": "Antioxidants prevent health-promoting effects of physical exercise in humans",
        "first_author": "Ristow M",
        "year": 2009,
        "journal": "PNAS",
        "study_type": "ECA",
        "pmid": "19433800",
        "doi": "10.1073/pnas.0903485106",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19433800/",
        "key_finding": {
          "es": "1000 mg C + 400 UI E/d, 4 sem: bloqueó la mejora de la sensibilidad a la insulina y la inducción de SOD y PGC-1alfa.",
          "en": "1000 mg C + 400 IU E/d, 4 weeks: blocked improvement of insulin sensitivity and induction of SOD and PGC-1alpha."
        }
      },
      {
        "title": "The effects of vitamin C and E on exercise-induced physiological adaptations: a systematic review and meta-analysis",
        "first_author": "Clifford T",
        "year": 2020,
        "journal": "Critical Reviews in Food Science and Nutrition",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "31851538",
        "doi": "10.1080/10408398.2019.1703641",
        "url": "https://pubmed.ncbi.nlm.nih.gov/31851538/",
        "key_finding": {
          "es": "9 ensayos aeróbicos: VO2máx SMD -0,14 (p=0,35) y resistencia -0,01 (p=0,97). El coste en marcadores celulares NO es de Clifford; es síntesis basada en Paulsen/Ristow/Mason.",
          "en": "9 aerobic trials: VO2max SMD -0.14 (p=0.35) and endurance -0.01 (p=0.97). The cost in cellular markers is NOT from Clifford; it is a synthesis based on Paulsen/Ristow/Mason."
        }
      },
      {
        "title": "Antioxidant supplements and endurance exercise: current evidence and mechanistic insights",
        "first_author": "Mason SA",
        "year": 2020,
        "journal": "Redox Biology",
        "study_type": "Revisión",
        "pmid": "32127289",
        "doi": "10.1016/j.redox.2020.101471",
        "url": "https://pubmed.ncbi.nlm.nih.gov/32127289/",
        "key_finding": {
          "es": "1 g/d de C + E frena las adaptaciones (TFAM, SOD, biogénesis) vía AMPK->PGC-1alfa; 500 mg C + 400 UI E no mostraron interferencia (dosis-dependencia).",
          "en": "1 g/d of C + E slows adaptations (TFAM, SOD, biogenesis) via AMPK->PGC-1alpha; 500 mg C + 400 IU E showed no interference (dose-dependence)."
        }
      },
      {
        "title": "International Society of Sports Nutrition position stand: effects of dietary antioxidants on exercise and sports performance",
        "first_author": "Gonzalez DE",
        "year": 2026,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Position stand",
        "pmid": "41701327",
        "doi": "10.1080/15502783.2026.2630490",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41701327/",
        "key_finding": {
          "es": "La suplementación antioxidante crónica en dosis altas puede frenar las adaptaciones; enfoque food-forward; reservar para deficiencias/insuficiencias o picos de estrés de entrenamiento.",
          "en": "Chronic high-dose antioxidant supplementation may slow adaptations; food-forward approach; reserve for deficiencies/insufficiencies or peaks of training stress."
        }
      },
      {
        "title": "Effects of antioxidant vitamin supplementation on sports performance, endurance and strength: a systematic review and meta-analysis",
        "first_author": "Dadalt EK",
        "year": 2024,
        "journal": "Sport Sciences for Health",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": null,
        "doi": "10.1007/s11332-024-01205-9",
        "url": "https://doi.org/10.1007/s11332-024-01205-9",
        "key_finding": {
          "es": "13 ECA (398 participantes): las vitaminas A/C/E aisladas o combinadas no mejoraron el rendimiento, la resistencia ni la fuerza. Inicial de autor corregida: Dadalt EK.",
          "en": "13 RCTs (398 participants): isolated or combined vitamins A/C/E did not improve performance, endurance or strength. Author initial corrected: Dadalt EK."
        }
      },
      {
        "title": "Meta-analysis: high-dosage vitamin E supplementation may increase all-cause mortality",
        "first_author": "Miller ER 3rd",
        "year": 2005,
        "journal": "Annals of Internal Medicine",
        "study_type": "Meta-análisis",
        "pmid": "15537682",
        "doi": "10.7326/0003-4819-142-1-200501040-00110",
        "url": "https://pubmed.ncbi.nlm.nih.gov/15537682/",
        "key_finding": {
          "es": "Las dosis altas de vitamina E (>=400 UI/d) se asociaron a un aumento de la mortalidad por todas las causas; respalda la advertencia de seguridad de la megadosis crónica de vit E.",
          "en": "High doses of vitamin E (>=400 IU/d) were associated with an increase in all-cause mortality; supports the safety warning for chronic vitamin E megadoses."
        }
      }
    ]
  },
  {
    "id": "hierro",
    "name": {
      "es": "Hierro",
      "en": "Iron"
    },
    "category": "micronutriente",
    "evidence_level": "fuerte",
    "evidence_direction": "contextual",
    "confidence": "alta",
    "performance_effect": {
      "es": "El hierro no es ergogénico en atletas con reservas normales: corregir un déficit restaura el rendimiento perdido, no lo eleva por encima de lo normal. La deficiencia reduce la resistencia 3-4% incluso sin anemia (ferritina baja con Hb normal); la suplementación oral en deficientes mejora la resistencia 2-20% y el VO2máx 6-15%, condicionado a ferritina basal muy baja (<=12-20 ug/L). En atletas repletos no aporta nada y añade riesgo. Por eso es fuerte como suplemento médico para deficiencia, pero nulo/en contra como ergogénico directo en atletas repletos.",
      "en": "Iron is not ergogenic in iron-replete athletes: correcting deficiency restores lost performance rather than enhancing it. Deficiency cuts endurance 3-4% even without anemia; supplementation in deficient athletes improves endurance 2-20% and VO2max 6-15%, driven by very low baseline ferritin (<=12-20 ug/L). No benefit (and added risk) in replete athletes. Strong as a medical supplement for deficiency; null/against as a direct ergogenic aid."
    },
    "effect_size": {
      "es": "Déficit sin tratar: -3 a -4%. Tratamiento en deficientes: +2 a +20% resistencia, +6 a +15% VO2máx (mayor cuanto más baja la ferritina; <=12 ug/L = máxima respuesta). Repletos: ns (tendencia VO2máx SMD 0,49, p=0,086 en 13 RCT, Smid 2024).",
      "en": "Untreated deficiency: -3 to -4%. Treatment in deficient subjects: +2 to +20% endurance, +6 to +15% VO2max (greater the lower the ferritin; <=12 ug/L = maximum response). Replete subjects: ns (VO2max trend SMD 0.49, p=0.086 in 13 RCTs, Smid 2024)."
    },
    "mechanism": {
      "es": "Núcleo funcional de la hemoglobina (transporte de O2), la mioglobina y los citocromos mitocondriales; el déficit limita la entrega de O2 y el ATP aeróbico. En endurance las pérdidas se amplifican por hemólisis por impacto, sudoración, microsangrado GI y, sobre todo, por la hepcidina inducida por el ejercicio (regulada por IL-6, pico 3-6 h post, bloquea la ferroportina y reduce la absorción intestinal ~36%). Una dosis oral también eleva la hepcidina ~24 h, lo que explica por qué la dosis en días alternos absorbe mejor. La altitud agrava la demanda.",
      "en": "Functional core of hemoglobin (O2 transport), myoglobin and mitochondrial cytochromes; deficiency limits O2 delivery and aerobic ATP. In endurance, losses are amplified by impact hemolysis, sweating, GI microbleeding, and above all by exercise-induced hepcidin (regulated by IL-6, peak 3-6 h post, blocks ferroportin and reduces intestinal absorption ~36%). A single oral dose also raises hepcidin ~24 h, which explains why alternate-day dosing absorbs better. Altitude worsens the demand."
    },
    "dosage": {
      "es": "Diagnóstico primero (ferritina +/- saturación de transferrina y Hb). Umbrales (COI/ACSM): hombres <30 ug/L y mujeres <50 ug/L. Oral: 40-100 mg de hierro elemental/día (las pautas eficaces usaron 16-100 mg/día por 6-8 sem; los protocolos cortos son ineficaces; Rowland 2026 cita 100-200 mg/día). Estrategia preferida: dosis única matinal o DÍAS ALTERNOS (iguala ferritina con menos GI y menor déficit a 6 meses). Reevaluar a 6-12 sem. IV solo bajo indicación médica.",
      "en": "Diagnosis first (ferritin +/- transferrin saturation and Hb). Thresholds (IOC/ACSM): men <30 ug/L and women <50 ug/L. Oral: 40-100 mg of elemental iron/day (effective protocols used 16-100 mg/day for 6-8 weeks; short protocols are ineffective; Rowland 2026 cites 100-200 mg/day). Preferred strategy: single morning dose or ALTERNATE DAYS (matches ferritin with less GI burden and lower deficiency at 6 months). Reassess at 6-12 weeks. IV only under medical indication."
    },
    "timing": {
      "es": "Por la mañana, lejos del pico de hepcidina; si se entrena, dentro de los ~30 min posteriores o en una mañana sin entrenamiento. Co-ingerir con vitamina C / fuente ácida; separar de café/té, lácteos/calcio y antiácidos. Días alternos por la cinética de 24 h de la hepcidina.",
      "en": "In the morning, away from the hepcidin peak; if training, within ~30 min post-exercise or on a rest morning. Co-ingest with vitamin C/acidic source; separate from coffee/tea, dairy/calcium and antacids. Alternate days due to the 24 h kinetics of hepcidin."
    },
    "who_benefits": {
      "es": "Atletas con deficiencia diagnosticada (especialmente ferritina <=12-20 ug/L). Alto riesgo: mujeres (menstruación), altitud, vegetarianos/veganos, corredores (hemólisis), volúmenes muy altos. No respondedores: ferritina normal/alta (sin beneficio, con riesgo).",
      "en": "Athletes with diagnosed deficiency (especially ferritin <=12-20 ug/L). High risk: women (menstruation), altitude, vegetarians/vegans, runners (hemolysis), very high training volumes. Non-responders: normal/high ferritin (no benefit, with risk)."
    },
    "caveats": {
      "es": "No suplementar sin análisis: por si acaso es inútil en repletos y potencialmente dañino. La ferritina es reactante de fase aguda (puede estar falsamente elevada con inflamación o tras ejercicio); medir en reposo y, si hay duda, añadir saturación de transferrina o sTfR. Muchos RCT son en mujeres y con muestras pequeñas. La respuesta depende de la ferritina basal. La base de rendimiento específico en ciclistas descansa casi en Rowland 2026 + Barney (corredores) + Pengelly (solo mujeres). Badge fuerte SOLO en deficiencia ferropénica diagnosticada; nulo/riesgoso en ferritina normal.",
      "en": "Do not supplement without testing: just in case is useless in replete individuals and potentially harmful. Ferritin is an acute-phase reactant (may be falsely elevated with inflammation or after exercise); measure at rest and, if in doubt, add transferrin saturation or sTfR. Many RCTs are in women and with small samples. Response depends on baseline ferritin. The specific performance base in cyclists rests almost on Rowland 2026 + Barney (runners) + Pengelly (women only). Strong badge ONLY in diagnosed iron deficiency; null/risky in normal ferritin."
    },
    "side_effects": {
      "es": "Hierro oral: estreñimiento, náuseas, dolor epigástrico, heces oscuras; la pauta diaria duplica los síntomas GI vs días alternos. Riesgo de sobrecarga con suplementación injustificada (especialmente hemocromatosis/HFE), daño hepático/oxidativo. IV: hipersensibilidad/anafilaxia e hipofosfatemia con ciertas formulaciones.",
      "en": "Oral iron: constipation, nausea, epigastric pain, dark stools; daily regimen doubles GI symptoms vs alternate days. Overload risk with unjustified supplementation (especially hemochromatosis/HFE), hepatic/oxidative damage. IV: hypersensitivity/anaphylaxis and hypophosphatemia with certain formulations."
    },
    "population_match": "extrapolado_otros_deportes",
    "sex_evidence": "mayormente_mujeres",
    "wada_status": "matiz",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "Effects of Oral Iron Supplementation on Blood Iron Status in Athletes: A Systematic Review, Meta-Analysis and Meta-Regression of Randomized Controlled Trials",
        "first_author": "Šmid AN",
        "year": 2024,
        "journal": "Sports Medicine",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "38407751",
        "doi": "10.1007/s40279-024-02058-5",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38407751/",
        "key_finding": {
          "es": "13 RCT (n=449, casi todas mujeres): 16-100 mg/día x 6-8 sem aumentó la ferritina (SMD 1,27; p=0,006), máximo con ferritina basal <=12 ug/L; VO2máx ns (SMD 0,49; p=0,086); protocolos cortos ineficaces.",
          "en": "13 RCTs (n=449, almost all women): 16-100 mg/day x 6-8 weeks increased ferritin (SMD 1.27; p=0.006), maximum with baseline ferritin <=12 ug/L; VO2max ns (SMD 0.49; p=0.086); short protocols ineffective."
        }
      },
      {
        "title": "Iron deficiency, supplementation, and sports performance in female athletes: A systematic review",
        "first_author": "Pengelly M",
        "year": 2025,
        "journal": "Journal of Sport and Health Science",
        "study_type": "Revisión sistemática",
        "pmid": "39536912",
        "doi": "10.1016/j.jshs.2024.101007",
        "url": "https://pubmed.ncbi.nlm.nih.gov/39536912/",
        "key_finding": {
          "es": "23 estudios (669 atletas femeninas): la deficiencia reduce la resistencia 3-4%; ~100 mg/día mejoró la resistencia 2-20% y el VO2máx 6-15% en deficientes. Población exclusivamente femenina.",
          "en": "23 studies (669 female athletes): deficiency reduces endurance 3-4%; ~100 mg/day improved endurance 2-20% and VO2max 6-15% in deficient individuals. Exclusively female population."
        }
      },
      {
        "title": "Does Iron Supplementation Improve Performance in Iron-Deficient Nonanemic Athletes?",
        "first_author": "Rubeor A",
        "year": 2018,
        "journal": "Sports Health",
        "study_type": "Revisión sistemática",
        "pmid": "29792778",
        "doi": "10.1177/1941738118777488",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29792778/",
        "key_finding": {
          "es": "12 RCT (n=283): resultados equívocos; ningún estudio con umbral >20 ug/L mostró mejora, 6/8 con <=20 ug/L sí; todos los beneficios con hierro oral.",
          "en": "12 RCTs (n=283): equivocal results; no study with threshold >20 ug/L showed improvement; 6/8 with <=20 ug/L did; all benefits with oral iron."
        }
      },
      {
        "title": "IOC consensus statement: dietary supplements and the high-performance athlete",
        "first_author": "Maughan RJ",
        "year": 2018,
        "journal": "British Journal of Sports Medicine",
        "study_type": "Declaración de consenso (IOC)",
        "pmid": "29540367",
        "doi": "10.1136/bjsports-2018-099027",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29540367/",
        "key_finding": {
          "es": "Sitúa el hierro (junto con calcio y vitamina D) en el manejo de deficiencias de micronutrientes; evaluación nutricional completa antes de suplementar; solo deficiencias documentadas.",
          "en": "Places iron (along with calcium and vitamin D) in the management of micronutrient deficiencies; complete nutritional assessment before supplementing; only documented deficiencies."
        }
      },
      {
        "title": "A Prolonged Bout of Running Increases Hepcidin and Decreases Dietary Iron Absorption in Trained Female and Male Endurance Runners",
        "first_author": "Barney DE Jr",
        "year": 2022,
        "journal": "Journal of Nutrition",
        "study_type": "ECA",
        "pmid": "35325162",
        "doi": "10.1093/jn/nxac056",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35325162/",
        "key_finding": {
          "es": "28 corredores (ferritina media 21,9 ng/mL): hepcidina +51% (pico 3-6 h) y absorción de hierro -36% cuando se ingiere 2 h después de correr. Corredores; base mecanística de la hepcidina.",
          "en": "28 runners (mean ferritin 21.9 ng/mL): hepcidin +51% (peak 3-6 h) and iron absorption -36% when ingested 2 h after running. Runners; mechanistic basis of hepcidin."
        }
      },
      {
        "title": "Alternate day versus consecutive day oral iron supplementation in iron-depleted women: a randomized double-blind placebo-controlled trial",
        "first_author": "von Siebenthal HK",
        "year": 2023,
        "journal": "EClinicalMedicine",
        "study_type": "ECA",
        "pmid": "38021373",
        "doi": "10.1016/j.eclinm.2023.102286",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38021373/",
        "key_finding": {
          "es": "150 mujeres (ferritina <=30 ug/L, 100 mg, 180 días): a igual dosis, los días alternos igualaron la ferritina pero redujeron la deficiencia a 6 meses (3,0% vs 11,4%; p=0,049), con menos hepcidina y menos GI.",
          "en": "150 women (ferritin <=30 ug/L, 100 mg, 180 days): at equal dose, alternate days matched ferritin but reduced deficiency at 6 months (3.0% vs 11.4%; p=0.049), with lower hepcidin and less GI burden."
        }
      },
      {
        "title": "A comprehensive review of the physiology and evidence base to guide the use of ergogenic and medical supplements for enhanced cycling performance",
        "first_author": "Rowland A",
        "year": 2026,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Revisión narrativa",
        "pmid": "41685663",
        "doi": "10.1080/15502783.2026.2630487",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41685663/",
        "key_finding": {
          "es": "Hierro = AIS Grupo A; deficiencia común en mujeres/vegetarianos/alto volumen; umbrales <30 (H) y <50 (M) ug/L; mejora la capacidad aeróbica en deficientes, sin beneficio en repletos.",
          "en": "Iron = AIS Group A; deficiency common in women/vegetarians/high volume; thresholds <30 (M) and <50 (F) ug/L; improves aerobic capacity in deficient individuals, no benefit in replete."
        }
      }
    ]
  },
  {
    "id": "citrato-de-sodio",
    "name": {
      "es": "Citrato de sodio",
      "en": "Sodium citrate"
    },
    "category": "tampon_ph",
    "evidence_level": "limitada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "El efecto sobre el rendimiento de resistencia es pequeño e inconsistente. En contrarreloj de media duración (3.000 m de carrera, 30 km en bicicleta) algunos ensayos muestran mejoras del 1,7 % al 2,9 %, pero ensayos de calidad similar en 40 km de ciclismo no encuentran ningún beneficio pese a alcalinizar la sangre. El meta-análisis de referencia sitúa el efecto global de los tampones extracelulares en una magnitud pequeña (ES0,5 = 0,17; ICr 95 % 0,12-0,21) y, dentro de esa categoría, el bicarbonato resulta más eficaz que el citrato. La heterogeneidad se explica en gran parte por el distrés gastrointestinal: el citrato eleva el pH de forma dosis-dependiente pero a dosis ergogénicas (0,5 g/kg) provoca náuseas, sed, calambres y diarrea que pueden anular cualquier ventaja. El beneficio aparece, por tanto, solo de forma contextual, en esfuerzos de alta intensidad de 1 a 7-10 minutos y en quienes toleran bien la dosis.",
      "en": "The effect on endurance performance is small and inconsistent. In medium-duration time trials (3,000 m running, 30 km cycling) some trials show 1.7 % to 2.9 % improvements, yet similar-quality 40 km cycling trials find no benefit despite alkalinizing the blood. The reference meta-analysis places the overall effect of extracellular buffers at a small magnitude (ES0.5 = 0.17; 95 % CrI 0.12-0.21), and within that category bicarbonate is more effective than citrate. The heterogeneity is largely driven by gastrointestinal distress: citrate raises pH dose-dependently, but at ergogenic doses (0.5 g/kg) it causes nausea, thirst, cramps and diarrhea that can negate any advantage. The benefit therefore appears only contextually, in high-intensity efforts of roughly 1 to 7-10 minutes and in athletes who tolerate the dose well."
    },
    "effect_size": {
      "es": "Pequeño y variable. Efecto global de tampones extracelulares ES0,5 = 0,17 (ICr 95 % 0,12-0,21) en de Oliveira et al. 2022; el bicarbonato supera al citrato (betaSC:SB = 0,10, ICr 95 % -0,02 a 0,22, IC cruza el cero). En contrarrelojes positivas: ~1,7 % (3.000 m, Shave 2001) y ~2,9 % (30 km, Potteiger 1996); 0 % en 40 km (Schabort 2000).",
      "en": "Small and variable. Overall effect of extracellular buffers ES0.5 = 0.17 (CrI 95% 0.12-0.21) in de Oliveira et al. 2022; bicarbonate outperforms citrate (betaSC:SB = 0.10, CrI 95% -0.02 to 0.22, CI crosses zero). In positive time trials: ~1.7% (3,000 m, Shave 2001) and ~2.9% (30 km, Potteiger 1996); 0% in 40 km (Schabort 2000)."
    },
    "mechanism": {
      "es": "El citrato de sodio actúa como agente alcalinizante extracelular, igual que el bicarbonato pero por una vía indirecta. Tras la ingesta, el anión citrato sale del plasma y se metaboliza (consume protones al oxidarse en el ciclo de Krebs), lo que reduce la concentración de H+ y eleva el bicarbonato y el pH sanguíneos. Este gradiente de pH más alcalino favorece la salida de H+ y lactato desde el músculo en contracción a través de los transportadores de monocarboxilato, retrasando la caída del pH intracelular y manteniendo la glucólisis y la producción de ATP a alta intensidad. El pico de pH y bicarbonato se alcanza unas 100-120 minutos tras una dosis de 0,5 g/kg.",
      "en": "Sodium citrate acts as an extracellular alkalinizing agent, identical to bicarbonate but via an indirect pathway. After ingestion, the citrate anion leaves the plasma and is metabolized (consuming protons upon oxidation in the Krebs cycle), which reduces H+ concentration and raises blood bicarbonate and pH. This more alkaline pH gradient promotes the efflux of H+ and lactate from the contracting muscle through monocarboxylate transporters, delaying the drop in intracellular pH and sustaining glycolysis and ATP production at high intensity. The pH and bicarbonate peak is reached approximately 100-120 minutes after a dose of 0.5 g/kg."
    },
    "dosage": {
      "es": "0,5 g/kg de masa corporal es la dosis con mayor probabilidad de ser ergogénica; 0,3 g/kg es menos eficaz. Para un ciclista de 70 kg, ~35 g de citrato de sodio. Dosis superiores (0,6 g/kg) elevan más el pH pero aumentan marcadamente el riesgo gastrointestinal sin mejorar el rendimiento.",
      "en": "0.5 g/kg body mass is the dose most likely to be ergogenic; 0.3 g/kg is less effective. For a 70 kg cyclist, ~35 g of sodium citrate. Higher doses (0.6 g/kg) raise pH more but markedly increase gastrointestinal risk without improving performance."
    },
    "timing": {
      "es": "Ingerir aproximadamente 100-180 minutos antes del esfuerzo (algunas guías sugieren 200-240 min) para que el pico de pH/bicarbonato coincida con la competición. Se recomienda dividir la dosis y acompañarla de abundante líquido y una comida rica en carbohidratos para mitigar las molestias digestivas; es imprescindible ensayarlo en entrenamiento antes de usarlo en competición.",
      "en": "Ingest approximately 100-180 minutes before the effort (some guidelines suggest 200-240 min) so that the pH/bicarbonate peak coincides with the competition. It is recommended to divide the dose and accompany it with plenty of fluid and a carbohydrate-rich meal to mitigate digestive discomfort; it is essential to test it in training before using it in competition."
    },
    "who_benefits": {
      "es": "Principalmente quienes realizan esfuerzos de alta intensidad de ~1 a 7-10 minutos con fuerte demanda glucolítica (esprints prolongados, kilómetro contrarreloj en pista, persecución, finales de carrera, ataques repetidos en grupo). En resistencia pura los contrarreloj de 3-30 km solo muestran beneficio en una parte de los estudios. Es una alternativa al bicarbonato para atletas que no lo toleran, pero el propio citrato tiene un perfil gastrointestinal exigente, por lo que beneficia solo a quienes responden y toleran bien la dosis.",
      "en": "Primarily those performing high-intensity efforts of ~1 to 7-10 minutes with strong glycolytic demand (prolonged sprints, kilometre time trial on the track, pursuit, race finishes, repeated attacks in a group). In pure endurance, time trials of 3-30 km only show benefit in a subset of studies. It is an alternative to bicarbonate for athletes who do not tolerate it, but citrate itself has a demanding gastrointestinal profile, so it only benefits those who respond and tolerate the dose well."
    },
    "caveats": {
      "es": "La evidencia en ciclismo es directamente contradictoria: Potteiger et al. (1996) reportó +2,9 % en 30 km mientras Schabort et al. (2000) no halló ningún cambio en 40 km pese a alcalinizar la sangre, lo que sugiere que el efecto desaparece a medida que aumenta la duración y la dependencia aeróbica. La mayoría de los estudios positivos usan muestras pequeñas (n=8-9) y casi exclusivamente hombres; la revisión de Carr et al. (2023) señala que solo 2 estudios de citrato incluyeron mujeres y ninguno controló el ciclo menstrual. El distrés gastrointestinal a la dosis ergogénica (0,5 g/kg) es el principal factor limitante y puede revertir cualquier ventaja, motivo por el que Shave et al. concluyen que su potencial GI probablemente impide su uso práctico. Es un suplemento de nicho para esfuerzos cortos e intensos, no un ergogénico fiable para resistencia prolongada.",
      "en": "The evidence in cycling is directly contradictory: Potteiger et al. (1996) reported +2.9% in 30 km while Schabort et al. (2000) found no change at all in 40 km despite alkalinizing the blood, suggesting that the effect disappears as duration and aerobic dependence increase. Most positive studies use small samples (n=8-9) and almost exclusively men; the review by Carr et al. (2023) notes that only 2 citrate studies included women and none controlled for menstrual cycle. Gastrointestinal distress at the ergogenic dose (0.5 g/kg) is the main limiting factor and can reverse any advantage, which is why Shave et al. conclude that its GI potential probably prevents its practical use. It is a niche supplement for short, intense efforts, not a reliable ergogenic for prolonged endurance."
    },
    "side_effects": {
      "es": "Distrés gastrointestinal frecuente y a veces severo a dosis de 0,5 g/kg: náuseas, vómitos, sed, dolor de cabeza, calambres y dolor estomacal, diarrea y malestar abdominal, típicamente en los 60 minutos posteriores a la ingesta. La respuesta es muy individual (no todos los participantes refieren molestias). Aporta una carga elevada de sodio, lo que debe considerarse en personas con hipertensión o restricción de sodio. Probarlo siempre en entrenamiento antes de competir.",
      "en": "Frequent and sometimes severe gastrointestinal distress at 0.5 g/kg doses: nausea, vomiting, thirst, headache, cramps and stomach pain, diarrhea and abdominal discomfort, typically within 60 minutes of ingestion. The response is highly individual (not all participants report discomfort). It provides a high sodium load, which must be considered in people with hypertension or sodium restriction. Always test it in training before competing."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "no_verificado",
    "ais_verified": false,
    "citations": [
      {
        "title": "Extracellular Buffering Supplements to Improve Exercise Capacity and Performance: A Comprehensive Systematic Review and Meta-analysis",
        "first_author": "Luana Farias de Oliveira",
        "year": 2022,
        "journal": "Sports Medicine",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "34687438",
        "doi": "10.1007/s40279-021-01575-x",
        "url": "https://pubmed.ncbi.nlm.nih.gov/34687438/",
        "key_finding": {
          "es": "Los tampones extracelulares (bicarbonato, citrato y lactato de sodio/calcio) producen un efecto global positivo pero pequeño sobre el rendimiento (ES0,5 = 0,17; ICr 95 % 0,12-0,21). El bicarbonato fue más eficaz que el citrato (betaSC:SB = 0,10; ICr 95 % -0,02 a 0,22, el IC cruza el cero), con 39 desenlaces de citrato frente a los del bicarbonato.",
          "en": "Extracellular buffers (bicarbonate, citrate and sodium/calcium lactate) produce an overall positive but small effect on performance (ES0.5 = 0.17; CrI 95% 0.12-0.21). Bicarbonate was more effective than citrate (betaSC:SB = 0.10; CrI 95% -0.02 to 0.22, CI crosses zero), with 39 citrate outcomes vs those for bicarbonate."
        }
      },
      {
        "title": "Nutritional Strategies to Modulate Intracellular and Extracellular Buffering Capacity During High-Intensity Exercise",
        "first_author": "Antonio Herbert Lancha Junior",
        "year": 2015,
        "journal": "Sports Medicine",
        "study_type": "Revisión",
        "pmid": "26553493",
        "doi": "10.1007/s40279-015-0397-5",
        "url": "https://pubmed.ncbi.nlm.nih.gov/26553493/",
        "key_finding": {
          "es": "El citrato eleva el bicarbonato y el pH sanguíneos al consumir protones en su metabolismo, mejorando la capacidad tampón extracelular y la salida de H+/lactato del músculo. La dosis de 0,5 g/kg es la más eficaz (pico de pH a los 100-120 min); los resultados en contrarreloj son equívocos y se reportan náuseas, sed, cefalea y calambres.",
          "en": "Citrate raises blood bicarbonate and pH by consuming protons in its metabolism, improving extracellular buffering capacity and H+/lactate efflux from muscle. The 0.5 g/kg dose is the most effective (pH peak at 100-120 min); time trial results are equivocal and nausea, thirst, headache and cramps are reported."
        }
      },
      {
        "title": "Sodium citrate ingestion enhances 30 km cycling performance",
        "first_author": "J. A. Potteiger",
        "year": 1996,
        "journal": "International Journal of Sports Medicine",
        "study_type": "ECA cruzado doble ciego (ciclistas entrenados)",
        "pmid": "8775569",
        "doi": "10.1055/s-2007-972800",
        "url": "https://pubmed.ncbi.nlm.nih.gov/8775569/",
        "key_finding": {
          "es": "En 8 ciclistas entrenados varones, el citrato de sodio (0,5 g/kg) mejoró la contrarreloj de 30 km en ~103 s (~2,9 %, p<=0,05) frente a placebo, con pH y lactato elevados durante toda la prueba; evidencia positiva directa en ciclismo.",
          "en": "In 8 trained male cyclists, sodium citrate (0.5 g/kg) improved the 30 km time trial by ~103 s (~2.9%, p<=0.05) vs placebo, with elevated pH and lactate throughout the event; direct positive evidence in cycling."
        }
      },
      {
        "title": "Dose-related elevations in venous pH with citrate ingestion do not alter 40-km cycling time-trial performance",
        "first_author": "E. J. Schabort",
        "year": 2000,
        "journal": "European Journal of Applied Physiology",
        "study_type": "ECA cruzado dosis-respuesta (ciclistas entrenados)",
        "pmid": "11138570",
        "doi": "10.1007/s004210000264",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11138570/",
        "key_finding": {
          "es": "En 8 ciclistas entrenados varones, dosis de 0,2/0,4/0,6 g/kg de citrato elevaron el pH venoso de forma dosis-dependiente pero NO modificaron ni la potencia ni el tiempo en 40 km; evidencia nula directa en ciclismo que contradice a Potteiger.",
          "en": "In 8 trained male cyclists, doses of 0.2/0.4/0.6 g/kg of citrate raised venous pH in a dose-dependent manner but did NOT modify power or time in the 40 km time trial; direct null evidence in cycling that contradicts Potteiger."
        }
      },
      {
        "title": "The effects of sodium citrate ingestion on 3,000-meter time-trial performance",
        "first_author": "R. Shave",
        "year": 2001,
        "journal": "Journal of Strength and Conditioning Research",
        "study_type": "ECA cruzado (corredores)",
        "pmid": "11710409",
        "doi": "10.1519/00124278-200111000-00012",
        "url": "https://pubmed.ncbi.nlm.nih.gov/11710409/",
        "key_finding": {
          "es": "El citrato de sodio (0,5 g/kg) mejoró la contrarreloj de 3.000 m ~1,7 % (610,9 vs 621,6 s) en 9 participantes (7 hombres, 2 mujeres), pero los autores concluyen que el alto potencial de distrés gastrointestinal probablemente impide su uso práctico como ergogénico.",
          "en": "Sodium citrate (0.5 g/kg) improved the 3,000 m time trial ~1.7% (610.9 vs 621.6 s) in 9 participants (7 men, 2 women), but the authors conclude that the high potential for gastrointestinal distress likely prevents its practical use as an ergogenic."
        }
      },
      {
        "title": "Use of Buffers in Specific Contexts: Highly Trained Female Athletes, Extreme Environments and Combined Buffering Agents-A Narrative Review",
        "first_author": "Amelia J. Carr",
        "year": 2023,
        "journal": "Sports Medicine",
        "study_type": "Revisión narrativa",
        "pmid": "37878211",
        "doi": "10.1007/s40279-023-01872-7",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37878211/",
        "key_finding": {
          "es": "Solo el 19 % de los estudios de tampones reportó beneficio en rendimiento y apenas el 10 % reclutó atletas altamente entrenados; en citrato solo 2 estudios incluyeron mujeres y ninguno controló el ciclo menstrual, evidenciando que la base de evidencia es mayoritariamente masculina y de baja transferibilidad.",
          "en": "Only 19% of buffering studies reported performance benefit and only 10% recruited highly trained athletes; for citrate, only 2 studies included women and none controlled for menstrual cycle, demonstrating that the evidence base is predominantly male and of low transferability."
        }
      }
    ]
  },
  {
    "id": "vitamina-d-calcio",
    "name": {
      "es": "Vitamina D y calcio",
      "en": "Vitamin D and calcium"
    },
    "category": "micronutriente",
    "evidence_level": "limitada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "No hay evidencia consistente de que suplementar vitamina D y/o calcio mejore directamente el rendimiento en ciclistas o deportistas de resistencia con estatus normal. El beneficio es contextual: aparece como corrección de una deficiencia diagnosticada (25(OH)D bajo) y, sobre todo, como protección de la salud ósea (reducción de fracturas por estrés) más que como ergogénico aeróbico. En atletas ya repletos, los meta-análisis no muestran mejoras significativas en fuerza, potencia ni VO2max.",
      "en": "There is no consistent evidence that supplementing vitamin D and/or calcium directly improves performance in cyclists or endurance athletes with normal status. The benefit is contextual: it appears when correcting a diagnosed deficiency (low 25(OH)D) and, above all, as protection of bone health (reduced stress-fracture risk) rather than as an aerobic ergogenic aid. In already-replete athletes, meta-analyses show no significant gains in strength, power or VO2max."
    },
    "effect_size": {
      "es": "Rendimiento (atletas repletos): trivial/nulo. Fuerza máxima y potencia: SMD 0.15-0.26, no significativo (IC95% cruza el 0) en el meta-análisis de Sist et al. 2023 (11 ECA, 436 atletas). Salud ósea (poblaciones de carga alta con calcio+vitamina D): reducción ~20-21% en incidencia de fracturas por estrés (Lappe et al. 2008, ITT 5.3% vs 6.6%). Corrección de deficiencia: incremento robusto de 25(OH)D (+~36 nmol/L con 3000 UI/día, Todd et al. 2016) sin traducción a VO2max.",
      "en": "Performance (replete athletes): trivial/null. Maximum strength and power: SMD 0.15-0.26, not significant (95% CI crosses 0) in the meta-analysis by Sist et al. 2023 (11 RCTs, 436 athletes). Bone health (high-load populations with calcium+vitamin D): ~20-21% reduction in stress fracture incidence (Lappe et al. 2008, ITT 5.3% vs 6.6%). Correction of deficiency: robust increase in 25(OH)D (+~36 nmol/L with 3000 IU/day, Todd et al. 2016) without translation to VO2max."
    },
    "mechanism": {
      "es": "La vitamina D (25(OH)D) regula la homeostasis de calcio y fósforo, la mineralización ósea y, vía receptores VDR en músculo esquelético, podría modular la función contráctil y la síntesis proteica; estos efectos musculares son relevantes principalmente en estados deficientes y se aplanan una vez restaurado el estatus. El calcio es el sustrato mineral del hueso y participa en el acople excitación-contracción y la transmisión neuromuscular. En atletas de resistencia, el eje vitamina D-calcio importa porque el ciclismo es un deporte de bajo impacto y bajo estímulo osteogénico, y porque la baja disponibilidad energética (RED-S) eleva el remodelado óseo: asegurar calcio y vitamina D suficientes protege la densidad mineral ósea y reduce el riesgo de lesión ósea por estrés, sin actuar como acelerador del transporte de oxígeno ni del metabolismo energético.",
      "en": "Vitamin D (25(OH)D) regulates calcium and phosphorus homeostasis, bone mineralization and, via VDR receptors in skeletal muscle, may modulate contractile function and protein synthesis; these muscular effects are relevant mainly in deficient states and plateau once status is restored. Calcium is the mineral substrate of bone and participates in excitation-contraction coupling and neuromuscular transmission. In endurance athletes, the vitamin D-calcium axis matters because cycling is a low-impact and low-osteogenic stimulus sport, and because low energy availability (RED-S) increases bone remodeling: ensuring sufficient calcium and vitamin D protects bone mineral density and reduces the risk of stress injury, without acting as an accelerator of oxygen transport or energy metabolism."
    },
    "dosage": {
      "es": "Vitamina D: corregir deficiencia con 1000-4200 UI/día (hasta ~2000-4000 UI/día como mantenimiento habitual; protocolos semanales de 4200-50000 UI usados en ensayos), buscando 25(OH)D >50 nmol/L (idealmente 75-100 nmol/L); evitar megadosis por riesgo de toxicidad. Calcio: la necesidad del atleta no excede la poblacional, 1000-1300 mg/día de calcio elemental total (dieta + suplemento), con dosis de suplemento de 500-600 mg por toma para optimizar absorción. En contextos de protección ósea de alto riesgo se han usado 2000 mg calcio + 800 UI vitamina D/día (Lappe 2008).",
      "en": "Vitamin D: correct deficiency with 1000-4200 IU/day (up to ~2000-4000 IU/day as standard maintenance; weekly protocols of 4200-50000 IU used in trials), targeting 25(OH)D >50 nmol/L (ideally 75-100 nmol/L); avoid megadoses due to toxicity risk. Calcium: athlete requirements do not exceed population norms, 1000-1300 mg/day of total elemental calcium (diet + supplement), with supplement doses of 500-600 mg per intake to optimize absorption. In high-risk bone protection contexts, 2000 mg calcium + 800 IU vitamin D/day have been used (Lappe 2008)."
    },
    "timing": {
      "es": "El timing agudo es irrelevante para el efecto (no es un ergogénico de pre-competencia). La vitamina D requiere semanas-meses de suplementación para elevar y estabilizar 25(OH)D; el calcio se reparte en el día en tomas de 500-600 mg con las comidas. Estrategia estacional: priorizar suplementación de vitamina D en otoño-invierno y en ciclistas que entrenan a cubierto o con poca exposición solar; reevaluar 25(OH)D tras 8-12 semanas.",
      "en": "Acute timing is irrelevant for effect (not a pre-competition ergogenic). Vitamin D requires weeks-months of supplementation to raise and stabilize 25(OH)D; calcium is distributed throughout the day in 500-600 mg doses with meals. Seasonal strategy: prioritize vitamin D supplementation in autumn-winter and in cyclists who train indoors or with little sun exposure; reassess 25(OH)D after 8-12 weeks."
    },
    "who_benefits": {
      "es": "Ciclistas y atletas de resistencia con deficiencia diagnosticada de vitamina D (25(OH)D bajo), baja exposición solar, latitudes altas/invierno o entrenamiento indoor; deportistas con baja disponibilidad energética/RED-S, amenorrea o historial de fracturas por estrés; veganos, dietas sin lácteos, baja ingesta de calcio, malabsorción (celiaquía); y atletas femeninas con riesgo óseo. No aporta a deportistas con estatus normal y dieta suficiente que buscan ganancia de rendimiento.",
      "en": "Cyclists and endurance athletes with diagnosed vitamin D deficiency (low 25(OH)D), low sun exposure, high latitudes/winter or indoor training; athletes with low energy availability/RED-S, amenorrhea or history of stress fractures; vegans, dairy-free diets, low calcium intake, malabsorption (celiac disease); and female athletes at bone risk. Does not benefit athletes with normal status and adequate diet who seek performance gains."
    },
    "caveats": {
      "es": "La evidencia específica en ciclismo de carretera es escasa; gran parte proviene de atletas de equipo, militares y poblaciones mixtas, por lo que es extrapolada. La distinción clave deficiencia vs uso universal es central: los meta-análisis no muestran beneficio en atletas repletos, mientras los datos de salud ósea más fuertes (Lappe 2008) provienen de reclutas militares femeninas con carga de impacto, no de ciclistas. La review de Rowland 2026 agrupa vitamina D, calcio e hierro como suplementos médicos de rol indirecto (recuperación, adaptación, integridad ósea), no como ergogénicos directos. Los signos de mejora aeróbica reportados en algunas revisiones (Wyatt 2024) provienen de pocos estudios, mayormente en deficientes y con riesgo de sesgo. La suplementación debe guiarse por evaluación nutricional y bioquímica, no aplicarse de forma indiscriminada (IOC, Maughan 2018).",
      "en": "Specific evidence in road cycling is scarce; much comes from team sport athletes, military personnel and mixed populations, so it is extrapolated. The key distinction deficiency vs universal use is central: meta-analyses show no benefit in replete athletes, while the strongest bone health data (Lappe 2008) come from female military recruits with impact loading, not cyclists. The Rowland 2026 review groups vitamin D, calcium and iron as medical supplements with an indirect role (recovery, adaptation, bone integrity), not as direct ergogenics. Signs of aerobic improvement reported in some reviews (Wyatt 2024) come from few studies, mostly in deficient individuals with risk of bias. Supplementation should be guided by nutritional and biochemical assessment, not applied indiscriminately (IOC, Maughan 2018)."
    },
    "side_effects": {
      "es": "Vitamina D: la sobredosis crónica (megadosis) puede causar hipercalcemia, hipercalciuria, cálculos renales y, paradójicamente, interferir con la homeostasis del calcio; evitar dosis muy altas sin control de 25(OH)D. Calcio: dosis altas o tomas >500-600 mg pueden producir molestias gastrointestinales (estreñimiento, hinchazón) y el calcio compite con la absorción de hierro y zinc, por lo que conviene separarlo de esos suplementos y de las comidas ricas en hierro. Señal de prudencia en suplementación de calcio aislado y riesgo cardiovascular en población general (debatido), favoreciendo cubrir necesidades vía dieta cuando sea posible.",
      "en": "Vitamin D: chronic overdose (megadoses) can cause hypercalcemia, hypercalciuria, kidney stones and, paradoxically, interfere with calcium homeostasis; avoid very high doses without 25(OH)D monitoring. Calcium: high doses or intakes >500-600 mg may cause gastrointestinal discomfort (constipation, bloating) and calcium competes with iron and zinc absorption, so it should be separated from those supplements and from iron-rich meals. Note of caution on isolated calcium supplementation and cardiovascular risk in the general population (debated), favoring meeting needs through diet when possible."
    },
    "population_match": "resistencia_general",
    "sex_evidence": "mixto",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "A comprehensive review of the physiology and evidence base to guide the use of ergogenic and medical supplements for enhanced cycling performance",
        "first_author": "Rowland A",
        "year": 2026,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Revisión narrativa exhaustiva",
        "pmid": "41685663",
        "doi": "10.1080/15502783.2026.2630487",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41685663/",
        "key_finding": {
          "es": "Agrupa vitamina D, calcio e hierro como suplementos médicos cuyo rol en ciclismo es INDIRECTO: apoyan salud ósea, integridad de tejido conectivo, estatus de micronutrientes, reparación muscular y adaptación a largo plazo, no el rendimiento directo. El calcio es Grupo A (AIS) con necesidades que no exceden a la población general (1000-1300 mg/día).",
          "en": "Groups vitamin D, calcium and iron as medical supplements whose role in cycling is INDIRECT: they support bone health, connective tissue integrity, micronutrient status, muscle repair and long-term adaptation, not direct performance. Calcium is Group A (AIS) with requirements that do not exceed the general population (1000-1300 mg/day)."
        }
      },
      {
        "title": "Effects of vitamin D supplementation on maximal strength and power in athletes: a systematic review and meta-analysis of randomized controlled trials",
        "first_author": "Sist M",
        "year": 2023,
        "journal": "Frontiers in Nutrition",
        "study_type": "Revisión sistemática y meta-análisis de ECAs",
        "pmid": "37841405",
        "doi": "10.3389/fnut.2023.1163313",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37841405/",
        "key_finding": {
          "es": "Sin efecto estadísticamente significativo de la vitamina D sobre fuerza máxima ni potencia, tanto en atletas deficientes (<75 nmol/L: fuerza superior SMD 0.25 p=0.47; inferior SMD 0.26 p=0.19) como en repletos (potencia SMD 0.15 p=0.61). 11 ECAs, 436 atletas, dosis de 4200 a 50000 UI/semana, 4-16 semanas.",
          "en": "No statistically significant effect of vitamin D on maximum strength or power, either in deficient athletes (<75 nmol/L: upper-body strength SMD 0.25 p=0.47; lower-body strength SMD 0.26 p=0.19) or replete (power SMD 0.15 p=0.61). 11 RCTs, 436 athletes, doses of 4200 to 50000 IU/week, 4-16 weeks."
        }
      },
      {
        "title": "Effects of Vitamin D Supplementation in Elite Athletes: A Systematic Review",
        "first_author": "Wyatt PB",
        "year": 2024,
        "journal": "Orthopaedic Journal of Sports Medicine",
        "study_type": "Revisión sistemática",
        "pmid": "38188620",
        "doi": "10.1177/23259671231220371",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38188620/",
        "key_finding": {
          "es": "14 estudios, 482 atletas de élite. Señal positiva pero limitada: 2 de 3 estudios mostraron mayor mejora de VO2max y 5 de 7 mayor potencia anaeróbica/fuerza en grupos suplementados; los autores concluyen que el mayor beneficio podría ser sobre resistencia aeróbica, potencia y fuerza, aunque con pocos estudios y necesidad de más investigación.",
          "en": "14 studies, 482 elite athletes. Positive but limited signal: 2 of 3 studies showed greater VO2max improvement and 5 of 7 showed greater anaerobic power/strength in supplemented groups; authors conclude that the greatest benefit may be on aerobic endurance, power and strength, although with few studies and a need for more research."
        }
      },
      {
        "title": "Vitamin D3 supplementation using an oral spray solution resolves deficiency but has no effect on VO2 max in Gaelic footballers",
        "first_author": "Todd JJ",
        "year": 2016,
        "journal": "European Journal of Nutrition",
        "study_type": "ECA doble ciego controlado con placebo",
        "pmid": "27015912",
        "doi": "10.1007/s00394-016-1202-4",
        "url": "https://pubmed.ncbi.nlm.nih.gov/27015912/",
        "key_finding": {
          "es": "3000 UI/día de vitamina D3 durante 12 semanas en 42 futbolistas gaélicos (72% deficientes/insuficientes) elevó 25(OH)D (+36.3 nmol/L vs +6.1 placebo, p=0.006) pero NO tuvo efecto sobre VO2max (p=0.375), función muscular ni pulmonar. Corregir la deficiencia no mejora el rendimiento aeróbico.",
          "en": "3000 IU/day of vitamin D3 for 12 weeks in 42 Gaelic footballers (72% deficient/insufficient) raised 25(OH)D (+36.3 nmol/L vs +6.1 placebo, p=0.006) but had NO effect on VO2max (p=0.375), muscle function or pulmonary function. Correcting deficiency does not improve aerobic performance."
        }
      },
      {
        "title": "Calcium and vitamin D supplementation decreases incidence of stress fractures in female navy recruits",
        "first_author": "Lappe J",
        "year": 2008,
        "journal": "Journal of Bone and Mineral Research",
        "study_type": "ECA doble ciego controlado con placebo (gran tamaño)",
        "pmid": "18433305",
        "doi": "10.1359/jbmr.080102",
        "url": "https://pubmed.ncbi.nlm.nih.gov/18433305/",
        "key_finding": {
          "es": "5201 reclutas navales femeninas; 2000 mg calcio + 800 UI vitamina D/día durante 8 semanas redujo la incidencia de fracturas por estrés ~20% por intención de tratar (5.3% vs 6.6%, p=0.0026). Mejor evidencia del rol protector óseo, en población de impacto (extrapolación cautelosa a ciclistas).",
          "en": "5201 female naval recruits; 2000 mg calcium + 800 IU vitamin D/day for 8 weeks reduced stress fracture incidence ~20% by intention-to-treat (5.3% vs 6.6%, p=0.0026). Best evidence for the bone-protective role, in an impact population (cautious extrapolation to cyclists)."
        }
      },
      {
        "title": "IOC consensus statement: dietary supplements and the high-performance athlete",
        "first_author": "Maughan RJ",
        "year": 2018,
        "journal": "British Journal of Sports Medicine",
        "study_type": "Declaración de consenso (IOC)",
        "pmid": "29540367",
        "doi": "10.1136/bjsports-2018-099027",
        "url": "https://pubmed.ncbi.nlm.nih.gov/29540367/",
        "key_finding": {
          "es": "Hierro, calcio y vitamina D figuran entre los nutrientes que pueden requerir suplementación bajo ciertas circunstancias, pero la suplementación indiscriminada no se recomienda: las deficiencias deben identificarse primero mediante evaluación nutricional.",
          "en": "Iron, calcium and vitamin D are among the nutrients that may require supplementation under certain circumstances, but indiscriminate supplementation is not recommended: deficiencies must be identified first through nutritional assessment."
        }
      }
    ]
  },
  {
    "id": "sodio-electrolitos",
    "name": {
      "es": "Sodio y electrolitos",
      "en": "Sodium and electrolytes"
    },
    "category": "otro",
    "evidence_level": "moderada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "El sodio durante el ejercicio NO mejora el rendimiento por sí mismo en la mayoría de los escenarios: el único ensayo controlado en ciclistas entrenados (Cosgrove & Black, 2013) no encontró diferencia en una contrarreloj de 72 km en clima fresco (171 vs 172 min; p=0,46) y tampoco modificó el sodio plasmático. Su valor es CONTEXTUAL y se concentra en pruebas muy largas (>3-4 h), tasas de sudor altas (>1,2-1,8 L/h) y/o calor, donde la reposición personalizada atenúa la caída del sodio plasmático (Anastasiou 2009: 137,3 vs 134,4 mmol/L con vs sin sodio) y mantiene el volumen plasmático, lo que reduce el riesgo de hiponatremia dilucional cuando se repone gran parte de las pérdidas con líquido bajo en sodio. La modelización de McCubbin (2023) confirma que un maratonista típico no necesita sodio extra, mientras que el ultramaratonista sí lo requiere en la mayoría de escenarios para mantener el sodio plasmático de partida. Importante: el sodio NO previene la hiponatremia si se bebe en exceso (el factor decisivo es el volumen de líquido, no su contenido de sodio), y la evidencia para prevenir calambres es débil.",
      "en": "Sodium during exercise does NOT improve performance on its own in most scenarios: the only controlled trial in trained cyclists (Cosgrove & Black, 2013) found no difference in a 72-km time-trial in cool conditions (171 vs 172 min; p=0.46) and no change in plasma sodium. Its value is CONTEXTUAL, concentrated in very long events (>3-4 h), high sweat rates (>1.2-1.8 L/h) and/or heat, where personalized replacement attenuates the plasma sodium drop (Anastasiou 2009: 137.3 vs 134.4 mmol/L with vs without sodium) and preserves plasma volume, reducing dilutional hyponatremia risk when most fluid losses are replaced with low-sodium fluid. McCubbin's (2023) modelling confirms a typical marathon runner needs no extra sodium, whereas an ultramarathoner does in most scenarios to maintain starting plasma sodium. Importantly, sodium does NOT prevent hyponatremia if you overdrink (fluid volume, not sodium content, is decisive), and the evidence for preventing cramps is weak."
    },
    "effect_size": {
      "es": "Sobre rendimiento: nulo / despreciable en pruebas de ~3 h o menos (g cercano a 0; Cosgrove 2013). Sobre sodio plasmático: efecto pequeño-moderado pero fisiológicamente real (~2-3 mmol/L de diferencia frente a placebo en calor; Anastasiou 2009, McCubbin 2024). Sobre calambres: sin reducción significativa de incidencia (69% vs 54%; p=0,42), aunque retrasó el tiempo de aparición (~37 vs ~15 min; p<0,01) en un único estudio pequeño (Jung 2005).",
      "en": "On performance: null/negligible in events of ~3 h or less (g near 0; Cosgrove 2013). On plasma sodium: small-to-moderate but physiologically real effect (~2-3 mmol/L difference vs placebo in heat; Anastasiou 2009, McCubbin 2024). On cramps: no significant reduction in incidence (69% vs 54%; p=0.42), although it delayed time to onset (~37 vs ~15 min; p<0.01) in a single small study (Jung 2005)."
    },
    "mechanism": {
      "es": "El sodio es el principal catión extracelular y determina la osmolaridad del compartimento extracelular y el volumen plasmático. Durante el ejercicio prolongado en calor se pierde sodio por sudor (concentraciones típicas 20-80 mmol/L), y si se reponen los líquidos con bebidas bajas en sodio se diluye el sodio plasmático, favoreciendo la hiponatremia asociada al ejercicio (EAH) por exceso relativo de agua libre. Reponer sodio mantiene el gradiente osmótico que sostiene el volumen plasmático (mejor retorno venoso y termorregulación) y atenúa la caída del [Na+] plasmático; además estimula la sed y la retención voluntaria de líquido, mejorando la rehidratación post-ejercicio. El sodio también facilita la absorción intestinal de agua y glucosa vía cotransportador SGLT1, base de las bebidas deportivas. La hipótesis clásica de que la depleción de sodio causa calambres carece de soporte mecanístico sólido; la evidencia actual apunta más a fatiga neuromuscular y control alterado del reflejo espinal.",
      "en": "Sodium is the main extracellular cation and determines the osmolarity of the extracellular compartment and plasma volume. During prolonged exercise in the heat, sodium is lost in sweat (typical concentrations 20-80 mmol/L), and if fluids are replaced with low-sodium drinks, plasma sodium is diluted, predisposing to exercise-associated hyponatremia (EAH) through relative excess of free water. Replenishing sodium maintains the osmotic gradient that sustains plasma volume (better venous return and thermoregulation) and attenuates the fall in plasma [Na+]; it also stimulates thirst and voluntary fluid retention, improving post-exercise rehydration. Sodium also facilitates intestinal absorption of water and glucose via the SGLT1 co-transporter, the basis of sports drinks. The classic hypothesis that sodium depletion causes cramps lacks solid mechanistic support; current evidence points more to neuromuscular fatigue and altered spinal reflex control."
    },
    "dosage": {
      "es": "Durante el ejercicio prolongado/calor: 300-600 mg de sodio por hora (equivalente a ~1.000-2.000 mg de NaCl/h), o concentraciones de 10-30 mmol/L (230-690 mg/L) en la bebida para optimizar absorción (Veniamakis 2022; posición ACSM 0,5-0,7 g sodio/L). Lo óptimo es individualizar según test de sudor: reponer un porcentaje de las pérdidas reales de sodio (concentración de sudor x tasa de sudor x duración). Post-ejercicio para rehidratación rápida: bebidas con ~50-60 mmol/L de sodio favorecen mayor retención. Para la mayoría de salidas <2-3 h en clima templado, el sodio puede consumirse al gusto sin necesidad de cálculo estricto.",
      "en": "During prolonged exercise/heat: 300-600 mg of sodium per hour (equivalent to ~1,000-2,000 mg of NaCl/h), or concentrations of 10-30 mmol/L (230-690 mg/L) in the drink to optimize absorption (Veniamakis 2022; ACSM position 0.5-0.7 g sodium/L). The optimum is to individualize according to sweat testing: replace a percentage of actual sodium losses (sweat concentration x sweat rate x duration). Post-exercise for rapid rehydration: drinks with ~50-60 mmol/L of sodium favor greater retention. For most outings <2-3 h in temperate climate, sodium can be consumed to taste without strict calculation."
    },
    "timing": {
      "es": "Durante el ejercicio, repartido por hora junto con la ingesta de líquido (no en bolo único). En pruebas muy largas o calor extremo, empezar la reposición desde las primeras horas, no al final. Una precarga de sodio pre-ejercicio (p. ej. ~20-40 min antes) puede expandir el volumen plasmático en sesiones muy calurosas, pero la evidencia de rendimiento es limitada y se solapa con la hiperhidratación (glicerol/sodio, evaluada por separado). Post-ejercicio: incluir sodio en la bebida/comida de recuperación cuando las pérdidas han sido altas para mejorar la retención de líquido.",
      "en": "During exercise, distributed per hour together with fluid intake (not as a single bolus). In very long events or extreme heat, start replacement from the first hours, not at the end. A pre-exercise sodium preload (e.g., ~20-40 min before) may expand plasma volume in very hot sessions, but the performance evidence is limited and overlaps with hyperhydration (glycerol/sodium, evaluated separately). Post-exercise: include sodium in the recovery drink/meal when losses have been high to improve fluid retention."
    },
    "who_benefits": {
      "es": "Ciclistas y atletas de resistencia en pruebas largas (>3-4 h) o ultradistancia, especialmente en calor/humedad (>25C, >60% HR). Salty sweaters con sudor visiblemente salado y alta concentración de sodio en sudor. Quienes tienen tasas de sudor muy altas (>1,2-1,8 L/h) y reponen gran parte de las pérdidas con líquido. Eventos de varios días o etapas consecutivas con calor. En cambio, salidas/competencias de menos de 2-3 h en clima templado obtienen poco o ningún beneficio fisiológico medible más allá de la palatabilidad y la sed.",
      "en": "Cyclists and endurance athletes in long events (>3-4 h) or ultra-distance, especially in heat/humidity (>25C, >60% RH). Salty sweaters with visibly salty sweat and high sweat sodium concentration. Those with very high sweat rates (>1.2-1.8 L/h) who replace a large portion of losses with fluid. Multi-day or consecutive stage events in heat. In contrast, outings/competitions of less than 2-3 h in temperate climate obtain little or no measurable physiological benefit beyond palatability and thirst."
    },
    "caveats": {
      "es": "El sodio NO es un ergogénico directo: no mejora la potencia ni el tiempo en pruebas estándar. El efecto es contextual y depende de duración, calor, tasa y composición del sudor. El sodio NO previene la hiponatremia si hay sobreingesta de líquido: la primera línea de prevención de EAH es beber según la sed y evitar el exceso de agua, no añadir sal. La evidencia en mujeres es escasa (la mayoría de RCTs son mayormente o solo hombres). Gran parte de la evidencia en calor proviene de protocolos de laboratorio, no de ciclismo de carretera real. La evidencia sobre calambres es de bajo nivel. Riesgo de extrapolación: muchos datos provienen de corredores/ultra, no específicamente de ciclistas.",
      "en": "Sodium is NOT a direct ergogenic: it does not improve power or time in standard events. The effect is contextual and depends on duration, heat, sweat rate and composition. Sodium does NOT prevent hyponatremia if there is excessive fluid intake: the first line of EAH prevention is drinking to thirst and avoiding excess water, not adding salt. Evidence in women is scarce (most RCTs are mostly or only men). Much of the heat evidence comes from laboratory protocols, not real road cycling. Evidence on cramps is low-level. Risk of extrapolation: much data comes from runners/ultra, not specifically from cyclists."
    },
    "side_effects": {
      "es": "El exceso de sodio puede causar molestias gastrointestinales (náuseas, malestar estomacal), aumentar la sed y la ingesta de líquido (lo que paradójicamente puede contribuir a sobrehidratación si no se controla), y retención hídrica. La ingesta crónica alta de sodio se asocia a hipertensión y riesgo cardiovascular en la población general (ingesta diaria recomendada ~1,5 g/día base). Cápsulas de sal mal toleradas o tomadas sin suficiente líquido pueden irritar el estómago. No reemplaza el control del volumen de líquido para prevenir hiponatremia.",
      "en": "Excess sodium can cause gastrointestinal discomfort (nausea, stomach upset), increase thirst and fluid intake (which paradoxically can contribute to over-hydration if uncontrolled), and fluid retention. Chronically high sodium intake is associated with hypertension and cardiovascular risk in the general population (recommended daily intake ~1.5 g/day base). Salt capsules poorly tolerated or taken without sufficient fluid can irritate the stomach. Does not replace fluid volume control for preventing hyponatremia."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mayormente_hombres",
    "wada_status": "matiz",
    "wada_verified": true,
    "ais_group": "A",
    "ais_verified": true,
    "citations": [
      {
        "title": "Effects of Sodium Intake on Health and Performance in Endurance and Ultra-Endurance Sports",
        "first_author": "Veniamakis E",
        "year": 2022,
        "journal": "International Journal of Environmental Research and Public Health",
        "study_type": "Revisión sistemática",
        "pmid": "35329337",
        "doi": "10.3390/ijerph19063651",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35329337/",
        "key_finding": {
          "es": "Recomienda 300-600 mg de sodio/h durante ejercicio prolongado en calor (>25C, >60% HR); concluye que el sodio durante el ejercicio NO puede prevenir la hiponatremia si hay ingesta excesiva de líquido, y que la deshidratación y la depleción de sodio no parecen asociarse con los calambres musculares.",
          "en": "Recommends 300-600 mg of sodium/h during prolonged exercise in heat (>25C, >60% RH); concludes that sodium during exercise CANNOT prevent hyponatremia if there is excessive fluid intake, and that dehydration and sodium depletion do not appear to be associated with muscle cramps."
        }
      },
      {
        "title": "Sodium supplementation has no effect on endurance performance during a cycling time-trial in cool conditions: a randomised cross-over trial",
        "first_author": "Cosgrove SD",
        "year": 2013,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "RCT cruzado doble ciego (ciclistas)",
        "pmid": "23731903",
        "doi": "10.1186/1550-2783-10-30",
        "url": "https://pubmed.ncbi.nlm.nih.gov/23731903/",
        "key_finding": {
          "es": "En 9 ciclistas entrenados, 700 mg de NaCl/h no mejoró el rendimiento en una contrarreloj de 72 km (~3 h) en clima fresco (171 vs 172 min; p=0,46) ni modificó el sodio plasmático frente a placebo; el sodio sí aumentó la ingesta de líquido y la sed sin beneficio de rendimiento. Única RCT específica de ciclismo.",
          "en": "In 9 trained cyclists, 700 mg of NaCl/h did not improve performance in a 72 km (~3 h) time trial in cool conditions (171 vs 172 min; p=0.46) nor modify plasma sodium vs placebo; sodium did increase fluid intake and thirst without performance benefit. The only cycling-specific RCT."
        }
      },
      {
        "title": "Sodium Replacement and Plasma Sodium Drop During Exercise in the Heat When Fluid Intake Matches Fluid Loss",
        "first_author": "Anastasiou CA",
        "year": 2009,
        "journal": "Journal of Athletic Training",
        "study_type": "RCT cruzado (calor 30C)",
        "pmid": "19295955",
        "doi": "10.4085/1062-6050-44.2.117",
        "url": "https://pubmed.ncbi.nlm.nih.gov/19295955/",
        "key_finding": {
          "es": "En 13 hombres tras 3 h de ejercicio a 30C con líquidos igualados a las pérdidas, incluso una cantidad moderada de sodio en la bebida atenuó la caída del sodio plasmático (137,3/136,7 mmol/L con sodio vs 134,4 mmol/L con agua/placebo; p<0,05).",
          "en": "In 13 men after 3 h of exercise at 30C with fluids matched to losses, even a moderate amount of sodium in the drink attenuated the fall in plasma sodium (137.3/136.7 mmol/L with sodium vs 134.4 mmol/L with water/placebo; p<0.05)."
        }
      },
      {
        "title": "Exercise-Associated Hyponatremia: 2017 Update",
        "first_author": "Hew-Butler T",
        "year": 2017,
        "journal": "Frontiers in Medicine",
        "study_type": "Actualización de consenso / revisión",
        "pmid": "28316971",
        "doi": "10.3389/fmed.2017.00021",
        "url": "https://pubmed.ncbi.nlm.nih.gov/28316971/",
        "key_finding": {
          "es": "La prevención primaria de la hiponatremia asociada al ejercicio es beber según la sed y evitar el exceso de líquido; el sodio ingerido durante una prueba puede atenuar la caída del sodio sanguíneo pero NO previene la EAH cuando hay ingesta excesiva de líquido, porque el volumen de líquido determina la concentración final de sodio.",
          "en": "Primary prevention of exercise-associated hyponatremia is drinking to thirst and avoiding excess fluid; sodium ingested during an event can attenuate the fall in blood sodium but does NOT prevent EAH when there is excessive fluid intake, because fluid volume determines the final sodium concentration."
        }
      },
      {
        "title": "Modelling sodium requirements of athletes across a variety of exercise scenarios - Identifying when to test and target, or season to taste",
        "first_author": "McCubbin AJ",
        "year": 2023,
        "journal": "European Journal of Sport Science",
        "study_type": "Estudio de modelización matemática",
        "pmid": "35616504",
        "doi": "10.1080/17461391.2022.2083526",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35616504/",
        "key_finding": {
          "es": "La modelización indica que un maratonista típico no requiere sodio adicional, mientras que el ultramaratonista sí lo necesita en la mayoría de escenarios; testear y dirigir la reposición de sodio cobra sentido en ultramaratón de 160 km cuando se combina con reposición agresiva de líquido (>80%) y [Na+]sudor >=40 mmol/L, mientras que en esfuerzos más cortos el sodio puede consumirse al gusto.",
          "en": "Modeling indicates that a typical marathoner does not require additional sodium, while the ultra-marathoner does in most scenarios; targeted sodium replacement makes sense in 160 km ultra-marathon when combined with aggressive fluid replacement (>80%) and [Na+]sweat >=40 mmol/L, while in shorter efforts sodium can be consumed to taste."
        }
      },
      {
        "title": "Effect of Personalized Sodium Replacement on Fluid and Sodium Balance and Thermophysiological Strain During and After Ultraendurance Running in the Heat",
        "first_author": "McCubbin AJ",
        "year": 2024,
        "journal": "International Journal of Sports Physiology and Performance",
        "study_type": "RCT cruzado doble ciego (ultraendurance, calor)",
        "pmid": "37944507",
        "doi": "10.1123/ijspp.2023-0295",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37944507/",
        "key_finding": {
          "es": "En 9 corredores (7H/2M) durante 5 h a 30C, la reposición personalizada que cubría el 100% de las pérdidas de sodio elevó el sodio plasmático frente a placebo a las 2,5 h y post-ejercicio, pero no modificó el balance neto de líquido ni redujo la tensión termofisiológica (FC, temperatura rectal, RPE).",
          "en": "In 9 runners (7M/2F) during 5 h at 30C, personalized replacement covering 100% of sodium losses raised plasma sodium vs placebo at 2.5 h and post-exercise, but did not modify the net fluid balance or reduce thermoregulatory strain (HR, rectal temperature, RPE)."
        }
      },
      {
        "title": "Influence of Hydration and Electrolyte Supplementation on Incidence and Time to Onset of Exercise-Associated Muscle Cramps",
        "first_author": "Jung AP",
        "year": 2005,
        "journal": "Journal of Athletic Training",
        "study_type": "Ensayo experimental cruzado contrabalanceado",
        "pmid": "15970952",
        "doi": null,
        "url": "https://pubmed.ncbi.nlm.nih.gov/15970952/",
        "key_finding": {
          "es": "En 13 hombres con historial de calambres, una bebida con electrolitos (1.620 mg sodio/L) no redujo significativamente la incidencia de calambres frente a hipohidratación (69% vs 54%; p=0,42), aunque retrasó el tiempo hasta su aparición (~36,8 vs ~14,6 min; p<0,01); evidencia de bajo nivel que cuestiona la prevención de calambres por sodio.",
          "en": "In 13 men with a history of cramps, an electrolyte drink (1,620 mg sodium/L) did not significantly reduce cramp incidence vs hypohydration (69% vs 54%; p=0.42), although it delayed time to onset (~36.8 vs ~14.6 min; p<0.01); low-level evidence questioning sodium for cramp prevention."
        }
      }
    ]
  },
  {
    "id": "mentol",
    "name": {
      "es": "Mentol (enjuague bucal / ingesta)",
      "en": "Menthol (mouth rinse / ingestion)"
    },
    "category": "otro",
    "evidence_level": "limitada",
    "evidence_direction": "contextual",
    "confidence": "media",
    "performance_effect": {
      "es": "El efecto es contextual y depende del calor y de la vía de administración. Como enjuague bucal (sin tragar), el mentol mejora de forma pequeña pero consistente la capacidad de resistencia en calor: en ciclistas extiende el tiempo hasta el agotamiento (TTE) en torno a un 6% (+82 s) cuando se administra en la fase final del ejercicio en 35 C, y mejora un contrarreloj de 30 km en mujeres en torno a un 2,3% en 30 C/70% HR. El mecanismo NO es termorregulación real: la temperatura central no cambia entre condiciones; el beneficio viene de la sensación de frescor que reduce el malestar térmico y la percepción de esfuerzo. El gran meta-análisis de 2024 (Gavel et al., Sports Med Open) NO encontró un efecto global significativo (SMD agrupado 0,12; IC95% -0,08 a 0,31) ni en el subgrupo de resistencia (SMD 0,14), por lo que el efecto medio es marginal y muy dependiente del contexto. Cuando el mentol se ingiere dentro de un gel (0,5%) en lugar de enjuagarse, el beneficio desaparece (Vogel et al., 2023, contrarreloj de carrera sin diferencias).",
      "en": "The effect is contextual and depends on heat and delivery route. As a mouth rinse (swilled and spat, not swallowed), menthol produces a small but consistent benefit for endurance capacity in the heat: in cyclists it extends time to exhaustion (TTE) by roughly 6% (+82 s) when given in the late stage of exercise at 35 C, and improves a 30-km time trial in women by about 2.3% at 30 C/70% RH. The mechanism is NOT genuine thermoregulation: core temperature does not differ between conditions; the benefit comes from a cooling sensation that lowers thermal discomfort and perceived effort. The large 2024 meta-analysis (Gavel et al., Sports Med Open) found NO significant overall effect (pooled SMD 0.12; 95% CI -0.08 to 0.31) nor in the endurance subgroup (SMD 0.14), so the mean effect is marginal and highly context-dependent. When menthol is ingested within a gel (0.5%) rather than rinsed, the benefit disappears (Vogel et al., 2023, running time trial, no difference)."
    },
    "effect_size": {
      "es": "Meta-análisis global: SMD agrupado 0,12 (IC95% -0,08 a 0,31; NS). Subgrupo resistencia: SMD 0,14 (NS). En RCTs individuales positivos en calor: TTE en ciclismo +6% (~+82 s) vs +1% placebo (Jeffries 2018); contrarreloj 30 km en mujeres +2,3% (Gavel 2021); potencia relativa en test de 3 min con tamaños de efecto pequeños-moderados (ES 0,7-1,1; Crosby 2022). En síntesis: efecto trivial-pequeño de media, pequeño-moderado en escenarios de calor con enjuague.",
      "en": "Global meta-analysis: pooled SMD 0.12 (95% CI -0.08 to 0.31; NS). Endurance subgroup: SMD 0.14 (NS). In individual positive RCTs in heat: TTE in cycling +6% (~+82 s) vs +1% placebo (Jeffries 2018); 30 km time trial in women +2.3% (Gavel 2021); relative power in 3 min test with small-to-moderate effect sizes (ES 0.7-1.1; Crosby 2022). In summary: trivial-to-small mean effect, small-to-moderate in heat scenarios with mouth rinsing."
    },
    "mechanism": {
      "es": "El mentol activa los receptores de potencial transitorio TRPM8 (los mismos canales sensibles al frío) en la mucosa orofaríngea. Esto genera una sensación de frescor SIN reducir la temperatura central ni cutánea: es un engaño sensorial. Esa percepción de frescor atenúa la sensación térmica de origen no térmico y reduce la percepción de esfuerzo, lo que mejora la tolerancia al ejercicio en calor y permite sostener mayor potencia o prolongar el tiempo hasta el agotamiento. En los estudios positivos la temperatura central terminó prácticamente idéntica entre mentol, hielo y placebo (~38,7-38,9 C), confirmando que el efecto es conductual/perceptual y no fisiológico. La vía importa: el efecto depende del contacto del mentol con los receptores orales (enjuague), por lo que tragarlo dentro de un gel diluye el estímulo y anula el beneficio.",
      "en": "Menthol activates transient receptor potential TRPM8 channels (the same channels sensitive to cold) in the oropharyngeal mucosa. This generates a sensation of cooling WITHOUT reducing core or skin temperature: it is a sensory illusion. This perception of coolness attenuates thermal sensation of non-thermal origin and reduces perceived effort, improving exercise tolerance in heat and allowing greater power output or prolonged time to exhaustion. In positive studies, core temperature ended virtually identical across menthol, ice and placebo conditions (~38.7-38.9 C), confirming the effect is behavioral/perceptual and not physiological. The route matters: the effect depends on menthol contacting oral receptors (mouth rinsing), so swallowing it inside a gel dilutes the stimulus and nullifies the benefit."
    },
    "dosage": {
      "es": "Enjuague bucal con solución de mentol al 0,01%-0,1% (la concentración no mostró diferencias significativas en el meta-análisis, p=0,67). Volumen típico 25 ml enjuagados ~5 segundos y escupidos. En protocolos de uso intermitente: enjuague cada 10-15 minutos durante el ejercicio (revisión de ciclismo de Rowland et al., 2026). La ingesta dentro de geles (0,5%) NO se recomienda con fin ergogénico porque no replica el beneficio del enjuague.",
      "en": "Mouth rinse with 0.01%-0.1% menthol solution (concentration showed no significant differences in the meta-analysis, p=0.67). Typical volume 25 mL rinsed for ~5 seconds and spat out. In intermittent use protocols: rinse every 10-15 minutes during exercise (cycling review by Rowland et al., 2026). Ingestion within gels (0.5%) is NOT recommended for ergogenic purposes because it does not replicate the benefit of mouth rinsing."
    },
    "timing": {
      "es": "Durante el ejercicio en calor, no antes. Funciona especialmente bien administrado en las fases finales/de mayor estrés térmico (Jeffries lo aplicó al ~85% del tiempo basal hasta el agotamiento). Para esfuerzos largos, repetir el enjuague cada 10-15 min o aprovechando avituallamientos. Como es un estímulo perceptual de acción inmediata y corta duración, conviene cronometrarlo cerca de los tramos más duros (subidas, ataques, final de etapa en calor).",
      "en": "During exercise in heat, not before. Works especially well when administered in the final/highest thermal stress phases (Jeffries applied it at ~85% of baseline time to exhaustion). For long efforts, repeat mouth rinsing every 10-15 min or at feed zones. As it is a perceptual stimulus with immediate and short duration of action, timing it close to the hardest segments (climbs, attacks, hot stage finish) is recommended."
    },
    "who_benefits": {
      "es": "Ciclistas y atletas de resistencia que compiten o entrenan en calor (aprox. 30-35 C). El beneficio es contextual: aparece bajo estrés térmico real y con enjuague (no con ingesta en gel). Sirve sobre todo a quienes terminan limitados por el malestar térmico y la percepción de esfuerzo más que por sustrato o hidratación. Hay evidencia tanto en hombres como en mujeres. En condiciones templadas/frías no aporta y no debe esperarse efecto.",
      "en": "Cyclists and endurance athletes who compete or train in the heat (approx. 30-35 C). The benefit is contextual: it appears under real thermal stress and with mouth rinsing (not with gel ingestion). It mainly helps those who end up limited by thermal discomfort and perceived effort rather than substrate or hydration. Evidence exists for both men and women. In temperate/cold conditions it provides no benefit and no effect should be expected."
    },
    "caveats": {
      "es": "El meta-análisis de 2024 (Gavel et al.) no halló efecto global ni en resistencia, time-to-exhaustion, contrarreloj ni ciclismo aisladamente; la señal positiva proviene de RCTs individuales en calor, lo que rebaja la certeza. La heterogeneidad metodológica es alta (concentraciones 0,01-0,1%, distintos protocolos y momentos). Las muestras son pequeñas (10 estudios, 153 sujetos en total; subgrupo femenino limitado a ~38 mujeres). La vía de administración es decisiva: el enjuague muestra beneficio pero la ingesta en gel (0,5%) no (Vogel 2023). Es un efecto perceptual, no fisiológico: no enfría el cuerpo. ADVERTENCIA DE SEGURIDAD clave para calor extremo: al generar sensación de frescor sin enfriamiento real, puede enmascarar síntomas tempranos de hipertermia/golpe de calor y favorecer un sobreesfuerzo riesgoso; usar con cautela en condiciones muy calurosas.",
      "en": "The 2024 meta-analysis (Gavel et al.) found no global effect or in endurance, time-to-exhaustion, time trial or cycling individually; the positive signal comes from individual RCTs in heat, which lowers certainty. Methodological heterogeneity is high (concentrations 0.01-0.1%, different protocols and timing). Samples are small (10 studies, 153 subjects total; female subgroup limited to ~38 women). The route of administration is decisive: mouth rinsing shows benefit but gel ingestion (0.5%) does not (Vogel 2023). It is a perceptual, not physiological, effect: it does not cool the body. KEY SAFETY WARNING for extreme heat: by generating a sensation of coolness without actual cooling, it can mask early symptoms of hyperthermia/heat stroke and favor dangerous overexertion; use with caution in very hot conditions."
    },
    "side_effects": {
      "es": "Generalmente bien tolerado en enjuague. Posible irritación oral leve, sensación de ardor/picor o reflejo nauseoso con concentraciones altas; sabor intenso desagradable para algunos. El riesgo más relevante no es toxicológico sino de seguridad térmica: la falsa percepción de frescor puede ocultar señales de alerta de hipertermia en ambientes muy calurosos. Si se ingiere, mentol en dosis altas puede causar molestias gastrointestinales; las concentraciones de enjuague (0,01-0,1%) escupidas implican ingesta mínima.",
      "en": "Generally well tolerated when used as a mouth rinse. Possible mild oral irritation, burning/tingling sensation or gag reflex with high concentrations; intensely unpleasant taste for some. The most relevant risk is not toxicological but thermal safety: the false perception of coolness can conceal warning signs of hyperthermia in very hot environments. If swallowed, menthol in high doses can cause GI discomfort; the rinsing concentrations (0.01-0.1%) spat out imply minimal ingestion."
    },
    "population_match": "ciclistas",
    "sex_evidence": "mixto",
    "wada_status": "permitido",
    "wada_verified": true,
    "ais_group": "B",
    "ais_verified": true,
    "citations": [
      {
        "title": "How Cool is That? The Effects of Menthol Mouth Rinsing on Exercise Capacity and Performance: A Systematic Review and Meta-analysis",
        "first_author": "Erica H. Gavel",
        "year": 2024,
        "journal": "Sports Medicine - Open",
        "study_type": "Revisión sistemática y meta-análisis",
        "pmid": "38381237",
        "doi": "10.1186/s40798-024-00679-8",
        "url": "https://pubmed.ncbi.nlm.nih.gov/38381237/",
        "key_finding": {
          "es": "En 10 estudios (153 sujetos, 115H/38M) el enjuague de mentol NO mejoró de forma significativa la capacidad/rendimiento global (SMD agrupado 0,12; IC95% -0,08 a 0,31; p=0,23) ni en el subgrupo de resistencia (SMD 0,14); sin diferencias significativas por sexo (p=0,58) ni por concentración (0,01% vs 0,1%; p=0,67). El efecto medio es trivial-pequeño y dependiente del contexto.",
          "en": "In 10 studies (153 subjects, 115M/38F) menthol mouth rinsing did NOT significantly improve overall capacity/performance (pooled SMD 0.12; 95% CI -0.08 to 0.31; p=0.23) nor in the endurance subgroup (SMD 0.14); no significant differences by sex (p=0.58) or concentration (0.01% vs 0.1%; p=0.67). The mean effect is trivial-to-small and context-dependent."
        }
      },
      {
        "title": "l-Menthol mouth rinse or ice slurry ingestion during the latter stages of exercise in the heat provide a novel stimulus to enhance performance despite elevation in mean body temperature",
        "first_author": "Owen Jeffries",
        "year": 2018,
        "journal": "European Journal of Applied Physiology",
        "study_type": "RCT cruzado (ciclismo, TTE en calor)",
        "pmid": "30128853",
        "doi": "10.1007/s00421-018-3970-4",
        "url": "https://pubmed.ncbi.nlm.nih.gov/30128853/",
        "key_finding": {
          "es": "En 10 ciclistas a 70% Wmax en 35 C, el enjuague de l-mentol 0,01% (25 ml/5 s) administrado al 85% del tiempo basal extendió el tiempo hasta el agotamiento un 6% (+82 s) frente a +1% del placebo (p=0,036), sin diferencia respecto al hielo. La temperatura central fue idéntica entre condiciones (~38,7-38,9 C).",
          "en": "In 10 cyclists at 70% Wmax at 35 C, l-menthol mouth rinse 0.01% (25 mL/5 s) administered at 85% of baseline time extended time to exhaustion by 6% (+82 s) vs +1% for placebo (p=0.036), with no difference vs ice. Core temperature was identical across conditions (~38.7-38.9 C)."
        }
      },
      {
        "title": "Menthol Mouth Rinsing and Cycling Performance in Females Under Heat Stress",
        "first_author": "Erica H. Gavel",
        "year": 2021,
        "journal": "International Journal of Sports Physiology and Performance",
        "study_type": "RCT cruzado (ciclismo, contrarreloj 30 km, mujeres)",
        "pmid": "33662928",
        "doi": "10.1123/ijspp.2020-0414",
        "url": "https://pubmed.ncbi.nlm.nih.gov/33662928/",
        "key_finding": {
          "es": "En ciclistas mujeres realizando un contrarreloj de 30 km en 30 C/70% HR, el enjuague de mentol al 0,1% mejoró el rendimiento un ~2,3% (62,6 vs 64,0 min, p=0,034), con mayor potencia media, sin diferencias significativas en percepción de esfuerzo ni sensación térmica.",
          "en": "In female cyclists performing a 30 km time trial at 30 C/70% RH, 0.1% menthol mouth rinse improved performance ~2.3% (62.6 vs 64.0 min, p=0.034), with higher mean power, with no significant differences in RPE or thermal sensation."
        }
      },
      {
        "title": "Menthol Mouth Rinsing Maintains Relative Power Production during Three-Minute Maximal Cycling Performance in the Heat Compared to Cold Water and Placebo Rinsing",
        "first_author": "Seana Crosby",
        "year": 2022,
        "journal": "International Journal of Environmental Research and Public Health",
        "study_type": "RCT cruzado simple ciego (ciclismo, test 3 min)",
        "pmid": "35329209",
        "doi": "10.3390/ijerph19063527",
        "url": "https://pubmed.ncbi.nlm.nih.gov/35329209/",
        "key_finding": {
          "es": "En 11 participantes (6H/5M) en 33 C, el enjuague de mentol al 0,1% antes de un test máximo de 3 min mantuvo mayor potencia relativa hacia el final del esfuerzo frente a agua fría y placebo (tamaños de efecto 0,7-1,1), pese a no modificar la sensación ni el confort térmico.",
          "en": "In 11 participants (6M/5F) at 33 C, 0.1% menthol mouth rinse before a maximal 3 min test maintained higher relative power toward the end of the effort vs cold water and placebo (effect sizes 0.7-1.1), despite not modifying thermal sensation or comfort."
        }
      },
      {
        "title": "A Menthol-Enhanced Cooling Energy Gel Does Not Influence Laboratory Time Trial Performance in Trained Runners",
        "first_author": "Roxanne M. Vogel",
        "year": 2023,
        "journal": "Nutrients",
        "study_type": "RCT cruzado doble ciego (carrera, estudio nulo)",
        "pmid": "37571316",
        "doi": "10.3390/nu15153379",
        "url": "https://pubmed.ncbi.nlm.nih.gov/37571316/",
        "key_finding": {
          "es": "En 14 corredores entrenados (8H/6M) en 33 C, un gel energético con mentol al 0,5% INGERIDO (no enjuagado) no mejoró el rendimiento de un contrarreloj de 20 min frente al gel control (4,22 vs 4,22 km; p=0,867). Evidencia clave de que la vía de administración importa.",
          "en": "In 14 trained runners (8M/6F) at 33 C, an energy gel with 0.5% menthol INGESTED (not rinsed) did not improve performance in a 20 min time trial vs control gel (4.22 vs 4.22 km; p=0.867). Key evidence that route of administration matters."
        }
      },
      {
        "title": "A comprehensive review of the physiology and evidence base to guide the use of ergogenic and medical supplements for enhanced cycling performance",
        "first_author": "Andrew Rowland",
        "year": 2026,
        "journal": "Journal of the International Society of Sports Nutrition",
        "study_type": "Revisión narrativa específica de ciclismo",
        "pmid": "41685663",
        "doi": "10.1080/15502783.2026.2630487",
        "url": "https://pubmed.ncbi.nlm.nih.gov/41685663/",
        "key_finding": {
          "es": "Clasifica el mentol en Grupo B del AIS; mecanismo vía TRPM8 generando frescor sin enfriamiento real; pauta de enjuague 0,01-0,1% intermitente durante el ejercicio en calor; advierte que el enfriamiento perceptual sin enfriamiento fisiológico puede aumentar el riesgo de enfermedad por calor al enmascarar síntomas tempranos de hipertermia.",
          "en": "Classifies menthol in AIS Group B; mechanism via TRPM8 generating coolness without actual cooling; intermittent mouth rinse protocol 0.01-0.1% during exercise in heat; warns that perceptual cooling without physiological cooling may increase risk of heat illness by masking early symptoms of hyperthermia."
        }
      }
    ]
  }
];
