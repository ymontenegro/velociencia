---
title: "Genetics and Training Response: Why Your Teammate Improves More on the Same Plan"
subtitle: "A panel of 21 genetic variants explains 49% of the variability in VO2max gains after 20 weeks of identical training"
section: "ciencia"
date: "2026-04-06"
author: "Sofia Muller"
tags: ["genetics", "ACTN3", "ACE", "training response", "VO2max", "personalization"]
sources:
  - title: "Familial aggregation of VO(2max) response to exercise training: results from the HERITAGE Family Study"
    url: "https://pubmed.ncbi.nlm.nih.gov/10484570/"
    type: pubmed
  - title: "Genomic predictors of the maximal O₂ uptake response to standardized exercise training programs"
    url: "https://pubmed.ncbi.nlm.nih.gov/21183627/"
    type: pubmed
  - title: "ACTN3 genotype is associated with human elite athletic performance"
    url: "https://pubmed.ncbi.nlm.nih.gov/12879365/"
    type: pubmed
  - title: "The ACE gene and human performance: 12 years on"
    url: "https://pubmed.ncbi.nlm.nih.gov/21615186/"
    type: pubmed
  - title: "Refuting the myth of non-response to exercise training: 'non-responders' do respond to higher dose of training"
    url: "https://pubmed.ncbi.nlm.nih.gov/28133739/"
    type: pubmed
  - title: "High responders and low responders: factors associated with individual variation in response to standardized training"
    url: "https://pubmed.ncbi.nlm.nih.gov/24807838/"
    type: pubmed
  - title: "Genomic and transcriptomic predictors of response levels to endurance exercise training"
    url: "https://pubmed.ncbi.nlm.nih.gov/27234805/"
    type: pubmed
  - title: "How does alpha-actinin-3 deficiency alter muscle function? Mechanistic insights into ACTN3, the gene for speed"
    url: "https://pubmed.ncbi.nlm.nih.gov/26802899/"
    type: pubmed
  - title: "Meta-analyses of the association between the PPARGC1A Gly482Ser polymorphism and athletic performance"
    url: "https://pubmed.ncbi.nlm.nih.gov/31938000/"
    type: pubmed
  - title: "Familial resemblance for VO2max in the sedentary state: the HERITAGE family study"
    url: "https://pubmed.ncbi.nlm.nih.gov/9502354/"
    type: pubmed
excerpt: "In the HERITAGE study, 481 sedentary adults followed an identical training program for 20 weeks. VO2max gains ranged from virtually zero to over 1,000 ml/min, and the heritability of that response reached 47%."
coverImage: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=1200&q=80&fit=crop&crop=entropy&fm=webp&auto=format,compress"
---

## Same Training, Opposite Results

Two cyclists share the same group, accumulate the same hours in the saddle, climb the same cols, and follow the same periodization throughout an entire season. By March, one of them has gained 28 watts at functional threshold and the other has added barely 6. The difference cannot be explained by motivation, diet, or sleep quality. It is written, at least in part, in their DNA. Interindividual variability in the response to endurance training is one of the most documented yet least understood phenomena in exercise physiology, and genetics constitutes the factor with the greatest explained variance identified to date.

The study that laid the foundations for this field was the HERITAGE Family Study, led by Claude Bouchard at the Physical Activity Sciences Laboratory of Universite Laval in Quebec, Canada. Bouchard et al. (1999) recruited 481 sedentary Caucasian adults from 98 two-generation families and enrolled them in a standardized 20-week training program on cycle ergometers. All participants trained under direct supervision, at the same frequency, duration, and relative intensity. VO2max measurements were taken twice before and twice after the program to minimize measurement error. The results, published in the *Journal of Applied Physiology*, showed that the mean VO2max gain was approximately 400 ml/min, but the distribution of responses ranged from individuals who improved virtually nothing to others who gained over 1,000 ml/min on the exact same protocol.

What turned HERITAGE into a landmark study was not just the range of responses but the familial structure of the sample. The analysis of variance revealed 2.5 times more variability between families than within families for the VO2max training response. The heritability estimate reached 47%, adjusted for age and sex, with a maternal transmission component of 28% in one of the statistical models. Put another way: nearly half of the difference in how much a person improves their aerobic capacity through training is attributable to genetic factors inherited from their parents. The other half corresponds to environmental, epigenetic, nutritional, and lifestyle variables, plus residual error.

## From 324,000 Variants to a Panel of 21

The next question was predictable: if genetics explains 47% of the variability, which genes are responsible? Bouchard et al. (2011) tackled that question with a genome-wide association study (GWAS) using data from 473 HERITAGE participants, analyzing 324,611 single-nucleotide polymorphisms (SNPs). The results, also published in the *Journal of Applied Physiology*, identified 39 SNPs associated with VO2max gains at a p-value below $1.5 \times 10^{-4}$. A stepwise multiple regression analysis narrowed that set down to a panel of 21 SNPs that explained 49% of the variance in VO2max trainability.

![DNA representation and molecular structure in a genomic research context](https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

That figure deserves a pause. A set of 21 genetic variants, each with an individually modest effect, collectively explained half of the variability in aerobic training response. The genes nearest to those SNPs were not the usual suspects of muscle physiology. They included PRDM1 (a transcriptional regulator), GRIN3A (a glutamate receptor in the nervous system), KCNH8 (a potassium channel), and ZIC4 (a cerebellar transcription factor). The biology of trainability turned out to be far more complex than simple muscle machinery: it involved neuronal signaling, transcriptional regulation, and ion channels in tissues rarely associated with athletic performance.

Sarzynski, Ghosh, and Bouchard (2017) expanded on this work by incorporating transcriptomic data in a review published in *The Journal of Physiology*. They integrated genomic and gene expression data from skeletal muscle before and after training, confirming that the estimated 47% heritability means genetic predictors alone are insufficient to explain all variability in trainability. The remainder depends on gene-environment interactions, epigenetic regulation, and factors yet to be identified. Genetic prediction of training potential exists, but it is probabilistic, not deterministic.

<ChartBar
  title="Distribution of VO2max gains in the HERITAGE study"
  caption="Source: Bouchard et al. (1999), J Appl Physiol"
  data={[
    { range: "<100", participants: 38 },
    { range: "100-200", participants: 62 },
    { range: "200-300", participants: 88 },
    { range: "300-400", participants: 96 },
    { range: "400-500", participants: 78 },
    { range: "500-600", participants: 52 },
    { range: "600-800", participants: 42 },
    { range: ">800", participants: 25 }
  ]}
  xKey="range"
  bars={[{ key: "participants", color: "#7C3AED", name: "Participants" }]}
  unit=" people"
/>

## ACTN3: The Speed Gene That Also Matters for Endurance

If there is one gene that has captured media attention in sports genetics, it is ACTN3. It encodes alpha-actinin-3, a structural protein expressed exclusively in fast-twitch muscle fibers (type II). A single-nucleotide polymorphism, R577X (rs1815739), produces a premature stop codon that results in the complete absence of alpha-actinin-3 in individuals homozygous for the X allele. Yang et al. (2003) demonstrated in the *American Journal of Human Genetics* that elite speed and power athletes carry significantly higher frequencies of the 577R allele compared to population controls. None of the female sprint athletes who had competed at Olympic level were deficient in alpha-actinin-3.

The figure that puts the population-level relevance of this polymorphism in context is striking: approximately 1.5 billion people worldwide lack alpha-actinin-3. Lee et al. (2016) reviewed the mechanisms by which deficiency of this protein alters muscle function in a paper published in *Biochimica et Biophysica Acta*. Alpha-actinins interact with proteins across three biological pathways: structural, metabolic, and signaling. In the absence of alpha-actinin-3, skeletal muscle partially compensates with alpha-actinin-2, but the net result is a shift in contractile properties. Fast fibers operate with partially oxidative characteristics, exhibiting greater aerobic enzyme activity and reduced capacity for high-velocity force generation.

For cycling, the implication is twofold. The XX genotype (alpha-actinin-3 deficient) may confer a marginal advantage in prolonged endurance efforts, where metabolic efficiency and oxidative capacity of muscle fibers are decisive. The RR genotype, with functional alpha-actinin-3 in all fast fibers, favors explosive power generation: sprints, attacks, and short anaerobic efforts. RX heterozygotes sit at an intermediate point. However, the magnitude of this effect is modest. Having the XX genotype does not make anyone a climber, nor does RR guarantee a winning sprint. These are population-level statistical tendencies, not individual destinies.

## ACE I/D: Blood Pressure, Muscular Efficiency, and Endurance

The angiotensin-converting enzyme (ACE) gene contains an insertion/deletion (I/D) polymorphism that was one of the first to be associated with athletic performance. The I allele (insertion) is linked to lower circulating ACE levels and has been found at elevated frequencies among elite endurance athletes: long-distance runners, rowers, and high-altitude mountaineers. The D allele (deletion) is associated with higher ACE and angiotensin II levels, a growth factor that promotes muscle hypertrophy, and has been linked to strength gains in response to training and to performance in power disciplines.

Puthucheary et al. (2011) published a comprehensive review in *Sports Medicine* titled "The ACE gene and human performance: 12 years on," examining the evidence accumulated since Montgomery's initial findings in 1998. The review concluded that the association between the I allele and endurance performance is consistent but of moderate effect size. Proposed mechanisms include greater mechanical efficiency of the muscle, changes in muscle fiber composition, and effects on local blood flow regulation. The II genotype has been associated with a higher proportion of type I fibers in the vastus lateralis, lower energy expenditure at submaximal intensities, and a greater vasodilatory response to exercise.

![Cyclists training as a group on an open road](https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

What makes the ACE I/D polymorphism particularly relevant to the discussion on training personalization is that its effect appears to depend on exercise dose. The II genotype may be associated with greater improvements in moderate-duration aerobic endurance, while DD seems more advantageous for activities of higher intensity and shorter duration. A cyclist with the II genotype might respond better to long blocks of zone 2 training, while one with DD might derive more benefit from short, high-intensity interval sessions. That hypothesis, though physiologically plausible, has not yet been confirmed in controlled trials with cyclists, and the magnitude of the genotypic effect is small enough that other factors such as total training volume, nutrition, and recovery can easily mask it.

## PPARGC1A: The Master Regulator of Mitochondrial Biogenesis

The PPARGC1A gene encodes the PGC-1alpha protein, a transcriptional coactivator that serves as the central regulator of mitochondrial biogenesis in skeletal muscle. Every time a cyclist completes an endurance training session, the intracellular signaling cascade converges on PGC-1alpha to activate transcription of mitochondrial genes, promote fatty acid oxidation, and drive the transition of muscle fibers toward a more oxidative phenotype. The Gly482Ser polymorphism (rs8192678) in this gene has been the subject of multiple association studies with athletic performance.

Chen et al. (2019) conducted a meta-analysis published in *Biology of Sport* that included data from approximately 3,700 athletes and 6,200 controls. The results showed higher frequencies of the Gly/Gly genotype (OR 1.26; 95% CI: 1.11-1.42) and the Gly allele (OR 1.29; 95% CI: 1.09-1.52) in Caucasian endurance athletes compared to controls. The Gly allele is associated with greater mitochondrial efficiency, higher lipid oxidation capacity, and a greater proportion of type I fibers. The Ser variant, in turn, has been linked to lower PGC-1alpha transcriptional activity and, in some studies, to increased risk of type 2 diabetes and obesity.

The relationship between PPARGC1A and training response illustrates a central concept in exercise genetics: the same polymorphisms that predispose to athletic performance also modulate metabolic risk in the general population. A cyclist with the Gly/Gly genotype might not only generate more mitochondria in response to training but also have a more favorable baseline metabolic profile. Exercise genetics and public health genetics share variants, pathways, and mechanisms, making personalized training a matter that extends well beyond athletic performance.

## High Responders and Low Responders: More Than a Label

Mann, Lamberts, and Lambert (2014) published a review in *Sports Medicine* that systematized the concept of high responders and low responders to standardized training. The authors, from the Research Unit for Exercise Science and Sports Medicine at the University of Cape Town, identified four categories of factors that explain interindividual variation: genetic, training program characteristics, recovery factors (sleep, psychological stress, habitual physical activity), and nutritional factors. The review made clear that classifying an individual as a low responder depends on the specific protocol: someone who does not respond to a low-intensity endurance program may respond to high-intensity intervals, and vice versa.

<ChartLine
  title="VO2max gains by genetic profile (HERITAGE)"
  caption="Source: Bouchard et al. (2011), J Appl Physiol"
  data={[
    { snps: "≤9", gain: 221 },
    { snps: "10-12", gain: 320 },
    { snps: "13-15", gain: 415 },
    { snps: "16-18", gain: 510 },
    { snps: "≥19", gain: 604 }
  ]}
  xKey="snps"
  lines={[
    { key: "gain", color: "#7C3AED", name: "Mean VO2max gain" }
  ]}
  unit=" ml/min"
/>

That point is fundamental and often lost in media simplification. There are no individuals genetically condemned to never improve with any type of exercise. What exists is a genotype-protocol interaction: the same genome can produce different responses depending on the stimulus applied. Data from HERITAGE showed that participants carrying the highest number of favorable alleles in the 21-SNP panel improved their VO2max by an average of 604 ml/min, while those carrying 9 or fewer favorable alleles improved by 221 ml/min. But even the latter group improved. The difference lies in magnitude, not direction.

Montero and Lundby (2017) took this idea a step further in a study published in *The Journal of Physiology* with the provocative title "Refuting the myth of non-response to exercise training." They recruited 78 healthy young men and distributed them into five groups that trained one, two, three, four, or five 60-minute sessions per week for six weeks. After that first phase, non-response rates for maximal power (Wmax), defined as any change within the typical error of measurement of $\pm 3.96\%$, were 69% for those who trained once per week, 40% for twice, and 29% for three times. All participants who completed four or five sessions per week improved significantly. The non-responders from each group then repeated a second six-week block with 120 additional minutes of exercise per week. The result: non-response disappeared entirely.

## The Single-Gene Fallacy

The media narrative around sports genetics tends to reduce complexity to headlines about individual genes: "the sprint gene," "the endurance gene," "the strength gene." That simplification is methodologically flawed. Endurance cycling performance is a complex polygenic trait in which hundreds or thousands of genetic variants contribute individually tiny effects. No single gene has an effect large enough to predict an individual's performance or training response with clinically relevant precision.

Association studies have identified dozens of variants statistically linked to performance-related traits, but the variance explained by each individual variant rarely exceeds 1-2%. ACTN3 R577X, probably the most studied polymorphism in sports genetics, shows consistent associations at the population level but has low individual predictive power. A cyclist with the RR genotype can be a mediocre climber and one with XX can win sprints if the rest of their genetic profile, training history, and tactical skills favor it. Genetics operates as a probabilistic bias atop a background of multifactorial complexity.

The genetic architecture of performance also involves epistasis: interactions between variants in different genes that produce non-additive effects. The effect of ACTN3 may depend on the ACE genotype, and both may interact with variants in PPARGC1A and other genes. Modeling these interactions requires enormous sample sizes that sports genetics has not yet managed to assemble. Existing GWAS studies work with hundreds of participants, while the genomics of complex traits in general populations uses cohorts of hundreds of thousands. That limitation in statistical power explains why many initial findings fail to replicate in subsequent studies.

## What Genetics Cannot Tell the Coach (Yet)

There is a growing market for direct-to-consumer genetic tests that promise to profile training response from a saliva swab. These tests analyze a handful of known variants, typically ACTN3, ACE, and a few additional polymorphisms, and generate training recommendations based on genotype. The problem is that current evidence does not support the clinical utility of those recommendations. The variance explained by the analyzed variants is too small, gene-environment interactions are too complex, and validation studies are nonexistent.

What a cyclist can do with available genetic information is better interpret their own training history. If after a six-week block of polarized training the gains were minimal, the correct response is not to quit but to modify the stimulus. Perhaps they need more volume, as Montero and Lundby suggest. Perhaps they need more intensity. Perhaps they need more time. Genetics modulates the dose-response relationship, not the absolute capacity for adaptation. Every healthy human organism adapts to mechanical and metabolic stress; it is the speed and magnitude of that adaptation that vary.

![Lone cyclist on the road during training with an open landscape](https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=900&q=75&fit=crop&crop=entropy&fm=webp&auto=format,compress)

Mann et al. (2014) noted that variation in the homeostatic stress associated with each training session is a source of variability frequently confounded with the genetic response. Two cyclists who complete the same session prescribed as "4x8 minutes at 90% of FTP" may experience very different physiological stimuli if their actual thresholds differ, if their recovery status is different, or if the ambient temperature varies. What appears as the same workout in the TrainingPeaks file can be an entirely different metabolic stimulus in each person's muscle. Part of what we attribute to genetics may, in reality, be imprecision in training prescription.

## Epigenetics as the Bridge Between Genes and Training

Genes do not change with training, but their expression does. Epigenetics, the set of chemical modifications that regulate which genes are transcribed and when, constitutes a mechanism by which exercise modifies the reading of the genome without altering the DNA sequence. DNA methylation, histone modifications, and non-coding RNAs modulate the expression of genes like PPARGC1A in response to each training session. A cyclist who trains consistently for years accumulates epigenetic marks that favor the expression of genes involved in oxidative capacity, angiogenesis, and mitochondrial biogenesis.

This phenomenon partially explains the observation that the heritability of VO2max in the sedentary state and the heritability of the training response are not identical. In an earlier HERITAGE study, Bouchard et al. (1998) estimated the heritability of baseline VO2max in the sedentary state at no less than 50%, while the heritability of the training response was 47%. The genes that determine your starting point and those that determine how much you can improve are not entirely the same. An individual may have a high baseline VO2max but respond modestly to training, or a low baseline VO2max but a high trainability. The two heritabilities operate in a partially independent fashion.

The practical implication is that a cyclist's initial VO2max does not necessarily predict how much they will improve. A recreational cyclist with a VO2max of 42 ml/kg/min could have greater genetic trainability than one who starts at 52 ml/kg/min. The first year of structured training for both could reverse their relative positions. Genetics does not only define the ceiling; it defines the slope of the adaptation curve, and those two variables are not perfectly correlated.

## Toward Evidence-Based Personalization

The question every cyclist interested in genetics wants answered is straightforward: given my genetic profile, what is the optimal training for me? Current science cannot answer it with individual precision. But it can offer genomics-informed principles. First: interindividual variability in training response is real, substantial, and partially heritable. Second: that variability does not mean some people cannot improve, but rather that the effective dose varies. Third: training response is protocol-specific, not individual-specific; changing the type, intensity, volume, or frequency of the stimulus can unlock adaptations that a previous protocol failed to produce.

The future of training personalization will likely depend not on an isolated genetic panel but on the integration of genomic data with phenotypic variables: relative power output, lactate response, heart rate variability, body composition, and historical response to different training blocks. Sarzynski, Ghosh, and Bouchard (2017) suggested that combining genomic and transcriptomic predictors with physiological data could allow individuals to be classified into response profiles before starting a program. That vision is years away from practical implementation, but the direction is clear.

In the meantime, the cyclist who wonders why their group ride companion improves more on the same plan has a partial but scientifically sound answer: genetics modulates the dose-response to training in a significant way, with a heritability close to 50%. It is neither an excuse to train less nor a reason to resign oneself. It is an invitation to experiment with the stimulus, to extend evaluation timelines, and to accept that the optimal path to performance is not the same for everyone. Biology is not fair, but it is modifiable. The question is finding the right dose for each genome.
