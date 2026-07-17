# Lector in Graphula

*From textual cues to interpretive paths.*

**Lector in Graphula** is a Knowledge Representation and Semantic Web project that formalizes selected aspects of Umberto Eco’s theory of the **Model Reader** and interpretive cooperation from *Lector in fabula*.

The project separates two semantic layers:

- an **ontology/TBox**, which models Eco-inspired concepts and relations;
- a **Knowledge Graph/ABox**, which instantiates selected interpretive cases from Margaret Atwood’s *The Handmaid’s Tale*.

The aim is not to reproduce the complete plot of the novel, establish one definitive literary interpretation, or fully automate interpretation. Instead, the project makes selected interpretive chains **explicit, inspectable, and queryable**, connecting textual cues to intrinsic knowledge, presuppositions, inferences, predictions, and licensed or alternative interpretations.

## Research question

> How can Eco’s theory of the Model Reader be formalized through an ontology and instantiated as a knowledge graph in order to represent the intrinsic interpretive knowledge required to understand selected excerpts from *The Handmaid’s Tale*?

## Theoretical background

In Eco’s theory, a text does not merely transmit explicit information. It also presupposes a set of competencies and interpretive operations through which a reader fills gaps, activates codes and frames, draws inferences, and anticipates possible narrative developments.

The project adopts the following distinctions:

- **ModelReader** and **ModelAuthor** are textual strategies, not empirical people.
- **EmpiricalReader** and **EmpiricalAuthor** belong to a different conceptual level.
- A **TextualCue** may activate interpretive resources and support inferential operations.
- **IntrinsicKnowledge** represents knowledge required by the interpretive process but not fully stated in the textual fragment.
- A text may license more than one interpretation without treating interpretive plurality as a logical inconsistency.
- A **LicensedInterpretation** may also be an **AlternativeInterpretation**; these classes are therefore not declared disjoint.
- **Interpretation** is distinguished from **Use**, following Eco’s separation between textually constrained interpretation and external appropriation.

Throughout the ontology, the term **intrinsic knowledge** is used for the project’s own conceptual model. The terms *tacit* and *implicit knowledge* are used only when describing the terminology of external tools such as POLANYI++.

## Methodology

The workflow combines ontology engineering, close reading, and Semantic Web technologies:

1. **Theoretical analysis**  
   Selected concepts from *Lector in fabula* are translated into ontology requirements.

2. **Competency Questions**  
   Questions define what the ontology and Knowledge Graph should be able to represent and retrieve.

3. **Ontology design**  
   Classes, properties, disjointness axioms, and interpretive relations are modeled in OWL.

4. **Knowledge Graph construction**  
   Selected passages from *The Handmaid’s Tale* are represented through textual fragments, cues, interpretive resources, operations, and outcomes.

5. **SPARQL evaluation**  
   Queries test grounding, intrinsic knowledge, presuppositions, interpretive resources, interpretive outcomes, ambiguity, and negative requirements.

6. **SWRL materialization**  
   Rules derive additional relations that make interpretive chains more directly accessible.

7. **External comparison**  
   POLANYI++ outputs are compared with manually modeled individuals. This comparison is methodological and is not treated as validation of the ontology.

## Ontology overview

### Ontology identifiers

| Element | IRI / Prefix |
|---|---|
| Ontology IRI | `https://lectoringraphula.org/ontology` |
| Ontology prefix | `lig: https://lectoringraphula.org/ontology#` |
| Knowledge Graph IRI | `https://lectoringraphula.org/knowledge-graph` |
| Handmaid individuals prefix | `hmt: https://lectoringraphula.org/handmaid#` |

The ontology is stored in [`ontology/econtology.ttl`](ontology/econtology.ttl).

### Main conceptual areas

| Area | Main classes |
|---|---|
| Textual entities | `TextualEntity`, `Text`, `NarrativeText`, `OpenText`, `ClosedText`, `LinearManifestation`, `TextFragment`, `TextualCue`, `Gap` |
| Textual strategies | `TextualStrategy`, `ModelReader`, `ModelAuthor` |
| Empirical entities | `EmpiricalEntity`, `EmpiricalReader`, `EmpiricalAuthor` |
| Interpretive resources | `InterpretiveResource`, `Encyclopedia`, `ReaderCompetence`, `Code`, `Subcode`, `Frame`, `CommonFrame`, `IntertextualFrame`, `IntrinsicKnowledge`, `Presupposition`, `EncyclopedicPresupposition` |
| Interpretive operations | `InterpretiveOperation`, `Inference`, `Prediction`, `ProbabilityDisjunction`, `InferentialWalk`, `SemanticActualization` |
| Narrative constructions | `NarrativeConstruction`, `Fabula`, `PossibleWorld`, `ReferenceWorld`, `WorldState`, `WorldIndividual`, `WorldProperty`, `EssentialProperty`, `AccidentalProperty`, `SNecessaryProperty` |
| Interpretive outcomes | `InterpretiveOutcome`, `Interpretation`, `LicensedInterpretation`, `AlternativeInterpretation`, `Use` |

### Selected modeling constraints

The ontology includes distinctions such as:

- `ModelReader` disjoint with `EmpiricalReader`;
- `ModelAuthor` disjoint with `EmpiricalAuthor`;
- `Interpretation` disjoint with `Use`;
- `TextualCue` disjoint with `Interpretation`;
- `Code` disjoint with `Frame`;
- `EssentialProperty` disjoint with `AccidentalProperty`.

`LicensedInterpretation` and `AlternativeInterpretation` are **not** disjoint because an interpretation may be both alternative and textually licensed.

The ontology does not encode every questionable interpretation as an OWL inconsistency. Interpretive constraints are instead expressed through properties, interpretive statuses, competency questions, and negative competency questions.

### Main relations

Selected object properties include:

```text
hasFragment
containsCue
containsGap
presupposesModelReader
encodesModelAuthor
requiresCompetence
activatesResource
activatesCode
activatesFrame
activatesEncyclopedia
requiresIntrinsicKnowledge
triggersPresupposition
supportsInference
initiatesInferentialWalk
generatesPrediction
opensProbabilityDisjunction
hasAlternativePrediction
projectsPossibleWorld
reconstructsFabula
licensesInterpretation
producesInterpretation
allowsAlternativeInterpretation
constrainsInterpretation
```

Selected data properties include:

```text
hasTextualContent
hasProbabilityDegree
hasInterpretiveStatus
hasSequenceNumber
hasConfidenceValue
hasSourceReference
hasAnnotationNote
```

## Knowledge Graph overview

The ABox is stored in [`knowledge-graph/knowledge-graph.ttl`](knowledge-graph/knowledge-graph.ttl) and imports the ontology.

The graph does not model the whole of *The Handmaid’s Tale*. It instantiates four case studies chosen because they expose different mechanisms of interpretive cooperation:

- identity and institutional naming;
- ritual, coercion, and category inadequacy;
- uncertainty, surveillance, and competing predictions;
- semiotic codes, hierarchy, and visual identity control.

The file [`knowledge-graph/catalog-v001.xml`](knowledge-graph/catalog-v001.xml) supports local resolution of the ontology import in Protégé.

## Modeled interpretive cases

### 1. Offred’s name

**Core cue:** “My name isn’t Offred”

The case models the inference that **Offred** is an imposed institutional name, while the hidden personal name points to a suppressed identity. The interpretive chain connects naming cues with knowledge about personal names, possession, patronymic structures, and institutional identity control.

Representative entities include:

- `OffredNameCue`
- `HiddenRealNameKnowledge`
- `PossessionNamingKnowledge`
- `HiddenNamePresupposition`
- `HiddenNameInference`
- `OffredIdentityInference`
- `GileadReplacesPersonalNamesWithPatronymics`
- `GileadErasesFemaleIdentity`

Detailed notes are available in [`case-notes/offred-name.md`](case-notes/offred-name.md).

### 2. The Ceremony

**Core cue:** “Nor does rape cover it”

The case represents the Ceremony through competing religious, ritual, reproductive, sexual, romantic, ethical, and coercive categories. It models the narrator’s rejection of ordinary labels as an instance of category inadequacy rather than reducing the passage to one simple lexical classification.

Representative entities include:

- `CeremonyCategoryFailureCue`
- `CeremonyReligiousFrame`
- `CeremonyRitualFrame`
- `BiblicalReproductiveSubcode`
- `ConstrainedChoiceKnowledge`
- `CategoryInadequacyPresupposition`
- `CeremonyCategoryFailureInference`
- `CeremonyAsInstitutionalizedReproductiveRitual`
- `GileadUsesReligionToLegitimizeReproductiveCoercion`

Detailed notes are available in [`case-notes/ceremony.md`](case-notes/ceremony.md).

### 3. Nick / Eyes ambiguity

**Core cue:** “Perhaps he is an Eye”

The case models uncertainty about Nick’s role under conditions of surveillance and mistrust. Possible rescue, betrayal, official authority, clandestine resistance, and deception remain represented as competing hypotheses.

The graph therefore preserves **probability disjunctions** rather than collapsing the passage into one certain outcome.

Representative entities include:

- `NickEyeSuspicionCue`
- `NickTrustMeCue`
- `GileadSurveillanceFrame`
- `MaydayResistanceFrame`
- `TrustMayConcealBetrayalPresupposition`
- `NickAmbiguousRoleSynthesisInference`
- `NickAsEyePrediction`
- `NickAsMaydayAllyPrediction`
- `NickRoleProbabilityDisjunction`
- `NickMayBeRescuerInterpretation`
- `NickMayBeEyeInterpretation`

Detailed notes are available in [`case-notes/trust-me-eyes.md`](case-notes/trust-me-eyes.md).

### 4. Color-coded clothing system

**Core cue:** “Everything except the wings around my face is red”

The case models Gilead’s clothing system as a semiotic code that maps colors and compositional patterns onto social roles, institutional positions, hierarchy, and identity control.

The possible historical relationship between the Handmaids’ clothing and P.O.W. uniforms is represented as a **conjecture**, not as a direct narrative fact.

Representative entities include:

- `InitialColorAssignmentCue`
- `GileadChromaticRoleStatusCode`
- `FemaleRoleColorSubcode`
- `InstitutionalDressFrame`
- `VisualTaxonomyKnowledge`
- `ColorAsIdentitySubstitutePresupposition`
- `ChromaticCodeSynthesisInference`
- `GileadChromaticCodeControlsSocialIdentity`
- `POWUniformOriginConjecture`
- `RedAsReproductiveBloodSymbolism`

Detailed notes are available in [`case-notes/color-coded-clothing.md`](case-notes/color-coded-clothing.md).

## Competency Questions

The project evaluates the ontology and Knowledge Graph through eight positive Competency Questions:

1. Which textual fragments and cues ground the interpretive inferences modeled in the Knowledge Graph?
2. Which textual cues require intrinsic knowledge?
3. Which presuppositions are triggered by textual cues?
4. Which interpretive resources, such as codes, frames, and encyclopedias, are activated by textual cues?
5. Which interpretations are licensed by the inferences supported by textual cues?
6. What is the interpretive status of each interpretation?
7. Which predictions and probability disjunctions are generated by interpretive inferences in ambiguous cases?
8. Which Model Reader strategies or levels are presupposed by the narrative text?

### Negative Competency Questions

The negative questions test modeling choices that should **not** occur:

| Question | Expected result |
|---|---|
| Are empirical readers or empirical authors treated as Model Reader or Model Author? | No |
| Is the P.O.W. origin of the Handmaids’ red clothing represented as direct narrative fact? | No; it remains conjectural |
| Are alternative predictions in ambiguous cases collapsed into one certain outcome? | No; alternatives remain explicit |

## SPARQL queries

The [`queries`](queries) directory contains eleven SPARQL files tested in Protégé with Snap SPARQL.

| File | Purpose |
|---|---|
| [`01_grounding_inferences.rq`](queries/01_grounding_inferences.rq) | Retrieves textual fragments, cues, and grounded inferences |
| [`02_intrinsic_knowledge.rq`](queries/02_intrinsic_knowledge.rq) | Retrieves intrinsic knowledge required by textual cues |
| [`03_presuppositions.rq`](queries/03_presuppositions.rq) | Retrieves presuppositions triggered by cues |
| [`04_interpretive_resources.rq`](queries/04_interpretive_resources.rq) | Retrieves activated codes, frames, and encyclopedias |
| [`05_licensed_interpretations.rq`](queries/05_licensed_interpretations.rq) | Retrieves interpretations licensed through inferential chains |
| [`06_interpretive_status.rq`](queries/06_interpretive_status.rq) | Retrieves modeled interpretive statuses |
| [`07_predictions_disjunctions.rq`](queries/07_predictions_disjunctions.rq) | Retrieves predictions and probability disjunctions |
| [`08_model_reader_levels.rq`](queries/08_model_reader_levels.rq) | Retrieves Model Reader strategies or levels presupposed by the text |
| [`09_no_empirical_confusion.rq`](queries/09_no_empirical_confusion.rq) | Tests separation between empirical entities and textual strategies |
| [`10_pow_not_direct_fact.rq`](queries/10_pow_not_direct_fact.rq) | Tests the conjectural status of the P.O.W. origin hypothesis |
| [`11_no_collapsed_predictions.rq`](queries/11_no_collapsed_predictions.rq) | Tests that competing predictions remain distinct |

The central graph patterns include:

```text
TextFragment → containsCue → TextualCue → supportsInference → Inference

TextualCue → requiresIntrinsicKnowledge → IntrinsicKnowledge

TextualCue → triggersPresupposition → Presupposition

TextualCue → activatesCode / activatesFrame / activatesEncyclopedia
           → InterpretiveResource

TextualCue → supportsInference → Inference
           → licensesInterpretation → Interpretation

Inference → generatesPrediction → Prediction
          → opensProbabilityDisjunction → ProbabilityDisjunction
          → hasAlternativePrediction → Prediction

Text → presupposesModelReader → ModelReader
```

Query result files are collected in [`queries/results`](queries/results).

## SWRL interpretive-chain rules

The ontology contains three SWRL rules that materialize derived relations across interpretive chains.

```text
containsCue(?fragment, ?cue)
^ supportsInference(?cue, ?inference)
→ groundsInference(?fragment, ?inference)
```

```text
supportsInference(?cue, ?inference)
^ licensesInterpretation(?inference, ?interpretation)
→ contributesToInterpretation(?cue, ?interpretation)
```

```text
requiresIntrinsicKnowledge(?cue, ?knowledge)
^ supportsInference(?cue, ?inference)
→ knowledgeSupportsInference(?knowledge, ?inference)
```

The corresponding derived object properties are:

- `groundsInference`
- `contributesToInterpretation`
- `knowledgeSupportsInference`

The rules were executed with Drools in Protégé. The materialization produced:

| Derived property | Inferred assertions |
|---|---:|
| `groundsInference` | 28 |
| `contributesToInterpretation` | 29 |
| `knowledgeSupportsInference` | 48 |

These rules do not generate literary interpretations autonomously. They make already modeled relations more explicit and easier to inspect or query.

## POLANYI++ external comparison

[POLANYI++](https://huggingface.co/spaces/aldogangemihug/polanyi-demo) is used as an **external comparison tool** for implicit or tacit knowledge extraction.

It is not imported into the official Knowledge Graph, does not validate the ontology, and is not treated as evidence that one interpretation is correct. Its outputs are compared with manually modeled instances of:

- `IntrinsicKnowledge`
- `Presupposition`
- `Inference`
- `Prediction`
- `Interpretation`

### Comparison workflow

The main configuration used was:

```text
Mode: EXTRACT
Method: m1 TACIT
Task: EXPLAIN
Base Graph: empty
```

The comparison focuses on the same four cases:

| Case | Comparison focus |
|---|---|
| Offred’s name | imposed and hidden names, identity control, presupposed personal identity |
| The Ceremony | coercion, constrained choice, ritualized power, category inadequacy |
| Nick / Eyes | Theory of Mind, surveillance, uncertainty, hypotheses, and lacunae |
| Color-coded clothing | role coding, institutional dress, hierarchy, symbolism, identity substitution |

`DISCOVER` was also tested, but the project concentrates on `EXTRACT` because it provided the more useful basis for comparison with the manually constructed graph.

## Repository structure

```text
lector-in-graphula/
├── case-notes/
│   ├── ceremony.md
│   ├── color-coded-clothing.md
│   ├── offred-name.md
│   └── trust-me-eyes.md
├── knowledge-graph/
│   ├── catalog-v001.xml
│   └── knowledge-graph.ttl
├── ontology/
│   └── econtology.ttl
├── queries/
│   ├── results/
│   ├── 01_grounding_inferences.rq
│   ├── 02_intrinsic_knowledge.rq
│   ├── 03_presuppositions.rq
│   ├── 04_interpretive_resources.rq
│   ├── 05_licensed_interpretations.rq
│   ├── 06_interpretive_status.rq
│   ├── 07_predictions_disjunctions.rq
│   ├── 08_model_reader_levels.rq
│   ├── 09_no_empirical_confusion.rq
│   ├── 10_pow_not_direct_fact.rq
│   └── 11_no_collapsed_predictions.rq
├── LICENSE
└── README.md
```

## How to open and use the project

### Requirements

- [Protégé](https://protege.stanford.edu/)
- Snap SPARQL plugin
- SWRLTab and Drools support for rule execution

### Opening the ontology and Knowledge Graph

1. Clone the repository:

   ```bash
   git clone https://github.com/Chiarag711/lector-in-graphula.git
   cd lector-in-graphula
   ```

2. Keep the repository directory structure unchanged.

3. Open [`knowledge-graph/knowledge-graph.ttl`](knowledge-graph/knowledge-graph.ttl) in Protégé.

4. Confirm that the imported ontology resolves to [`ontology/econtology.ttl`](ontology/econtology.ttl). The XML catalog in the `knowledge-graph` directory supports local IRI resolution.

### Running the queries

1. Open Snap SPARQL in Protégé.
2. Load one of the `.rq` files from [`queries`](queries).
3. Execute the query against the loaded Knowledge Graph.
4. Compare the output with the files in [`queries/results`](queries/results), where applicable.

### Running the SWRL rules

1. Open the Knowledge Graph in Protégé.
2. Use SWRLTab to inspect the three rules.
3. Run the rules through Drools.
4. Inspect the materialized assertions for:
   - `groundsInference`;
   - `contributesToInterpretation`;
   - `knowledgeSupportsInference`.
5. Re-run the relevant SPARQL queries to inspect the derived chains.

## Technologies

- RDF and RDFS
- OWL 2
- Turtle
- SPARQL 1.1
- SWRL
- Protégé
- Snap SPARQL
- Drools
- POLANYI++ / Hugging Face Spaces

## Scope and limitations

Lector in Graphula is a focused academic prototype.

It:

- formalizes selected aspects of Eco’s theory rather than the entirety of *Lector in fabula*;
- instantiates selected passages rather than modeling the whole of *The Handmaid’s Tale*;
- represents manually designed interpretive chains rather than automatically producing complete literary analyses;
- makes interpretive assumptions inspectable but does not prove that one reading is uniquely correct;
- treats ambiguity as a representational object rather than as an error to eliminate;
- uses POLANYI++ for comparison, not ontology validation;
- does not include or redistribute complete copyrighted literary texts.

## Team

Project developed by:

- [Chiara Genovese](https://github.com/Chiarag711)
- [Asia Marselli](https://github.com/asiamarselli)
- [Adriana Monte](https://github.com/adrianamonte)

## Academic disclaimer

This project was developed for the university course **Knowledge Representation and Extraction**, taught by Professor **Aldo Gangemi**, within the **Digital Humanities and Digital Knowledge** programme at the **Alma Mater Studiorum – Università di Bologna**.

**Lector in Graphula** is an academic prototype created for educational and research purposes. It is not an official project associated with Umberto Eco, Margaret Atwood, their estates, publishers, or other rights holders.

The ontology and Knowledge Graph contain scholarly modeling and interpretive choices made by the project authors. They should not be treated as definitive representations of either *Lector in fabula* or *The Handmaid’s Tale*.

## Textual materials and copyright

References to *Lector in fabula* and *The Handmaid’s Tale* are included for academic analysis. Short quotations, paraphrases, bibliographic references, and annotations remain subject to the rights of their respective authors and publishers.

The repository must not be used to redistribute complete copyrighted texts.

## License

The software and original repository materials are released under the [MIT License](LICENSE).

This license does not override copyright or licensing conditions attached to external literary texts, quotations, images, software, or third-party resources referenced by the project.

## References

- Atwood, Margaret. *The Handmaid’s Tale*. 1985.
- Eco, Umberto. *Lector in fabula: La cooperazione interpretativa nei testi narrativi*. 1979.
- W3C. *RDF 1.1 Concepts and Abstract Syntax*.
- W3C. *RDF Schema 1.1*.
- W3C. *OWL 2 Web Ontology Language*.
- W3C. *SPARQL 1.1 Query Language*.
- W3C. *SWRL: A Semantic Web Rule Language Combining OWL and RuleML*.
