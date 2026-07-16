# Lector in Graphula

**From textual cues to interpretive paths.**

**Lector in Graphula** is a Knowledge Representation and Semantic Web project that formalizes Umberto Eco’s theory of interpretive cooperation and the **Model Reader** from *Lector in fabula*.

The project investigates how a narrative text guides, constrains, and partially constructs its own reader through textual cues, gaps, presuppositions, codes, frames, encyclopedic knowledge, inferences, predictions, and possible interpretations.

The resulting ontology is instantiated through selected interpretive cases from Margaret Atwood’s *The Handmaid’s Tale*. The project does **not** aim to reproduce the novel’s complete plot. Instead, it models how a Model Reader moves from what the text explicitly says to meanings that the text presupposes, suggests, or licenses.

## Research objective

The project addresses the following general question:

> How can Eco’s theory of interpretive cooperation be represented through an OWL ontology and explored through a knowledge graph?

More specifically, the project models:

- the distinction between **EmpiricalReader** and **ModelReader**;
- the distinction between **EmpiricalAuthor** and **ModelAuthor**;
- the relation between **TextualCue**, **Gap**, and **InterpretiveResource**;
- the activation of **Code**, **Subcode**, **Frame**, **Encyclopedia**, and **IntrinsicKnowledge**;
- interpretive operations such as **Presupposition**, **Inference**, **Prediction**, **ProbabilityDisjunction**, and **InferentialWalk**;
- the distinction between **LicensedInterpretation**, **AlternativeInterpretation**, and **Use**;
- the construction of narrative hypotheses and possible worlds.

## Project architecture

The project is divided into two main semantic layers.

### Econtology — TBox

The ontology provides the reusable conceptual model for Eco’s theory. It defines the principal classes, object properties, data properties, restrictions, and interpretive relations used by the project.

Ontology namespace:

```text
https://lectoringraphula.org/ontology#
```

### The Handmaid’s Tale knowledge graph — ABox

The knowledge graph imports the ontology and instantiates it through selected textual fragments from *The Handmaid’s Tale*. Each case connects textual evidence with the knowledge and interpretive operations required by the Model Reader.

Case-study namespace:

```text
https://lectoringraphula.org/handmaid#
```

## Interpretive case studies

The current knowledge graph is organized around four cases:

1. **Offred naming**  
   Models how the name “Offred,” the existence of a hidden personal name, and the patronymic system activate inferences about identity, possession, and institutional control.

2. **The Ceremony**  
   Models the conflict between biblical, ritual, reproductive, sexual, and ethical codes. The resulting licensed interpretation represents the Ceremony as a religiously framed and institutionally coercive reproductive ritual.

3. **“Trust me” / Eyes ambiguity**  
   Models Nick’s uncertain role through competing predictions of rescue, betrayal, surveillance, and resistance. The case preserves the probability disjunction rather than reducing the passage to a single factual outcome.

4. **Color-coded clothing system**  
   Models Gilead’s chromatic system as a semiotic code that maps social roles and institutional positions to colors and patterns, making hierarchy and the erasure of personal identity visually legible.

## Methods and technologies

The project uses:

- **RDF** and **RDFS** for graph-based representation;
- **OWL 2** for ontology modelling and logical constraints;
- **Turtle** as the main serialization format;
- **SPARQL 1.1** for querying the knowledge graph;
- **Competency Questions** for ontology requirements and evaluation;
- **Protégé** for ontology development and inspection.

Further work includes logical inference chains, rule-based experimentation, and a comparison with **POLANYI++** as a neurosymbolic approach to implicit and perspectival knowledge.

## Current status

The project is under active development.

Completed or consolidated components include:

- the initial ontology/TBox;
- the initial knowledge graph/ABox;
- the selection and analysis of the four interpretive cases;
- the main modelling distinction between textual facts and interpretive outcomes.

Work in progress includes:

- final Competency Questions;
- SPARQL queries and expected results;
- logical and inferential chains;
- rule-based modelling;
- validation and evaluation;
- comparison with POLANYI++;
- final documentation and presentation materials.

## Team

Project developed by:

- **[Chiara Genovese](https://github.com/Chiarag711)**
- **[Asia Marselli](https://github.com/asimarsi)**
- **[Adriana Monte](https://github.com/AdrianaMonte)**

## Academic disclaimer

This project was developed as part of the university course **[Knowledge Representation and Extraction](https://www.unibo.it/en/study/course-units-transferable-skills-moocs/course-unit-catalogue/course-unit/2025/533916)**, taught by Professor **[Aldo Gangemi](https://www.unibo.it/sitoweb/aldo.gangemi/en)**, within the **[Digital Humanities and Digital Knowledge](https://corsi.unibo.it/2cycle/DigitalHumanitiesKnowledge)** programme at the **[Alma Mater Studiorum – Università di Bologna](https://www.unibo.it/it)**.

**Lector in Graphula** is an academic prototype created exclusively for educational and research purposes. It is not an official project associated with Umberto Eco, Margaret Atwood, their estates, publishers, or other rights holders.

The ontology and knowledge graph represent scholarly interpretations produced by the authors of this project. They should not be treated as definitive literary interpretations or as a complete representation of either *Lector in fabula* or *The Handmaid’s Tale*.

## Textual materials and copyright

References to *Lector in fabula* and *The Handmaid’s Tale* are used for academic analysis. Any short quotations, textual fragments, paraphrases, bibliographic references, or annotations remain the property of their respective authors and rights holders.

The repository should not be used to redistribute complete copyrighted texts.

## Main references

- Eco, Umberto. *Lector in fabula: La cooperazione interpretativa nei testi narrativi*. 1979.
- Atwood, Margaret. *The Handmaid’s Tale*. 1985.
- W3C. *RDF 1.1 Concepts and Abstract Syntax*.
- W3C. *OWL 2 Web Ontology Language*.
- W3C. *SPARQL 1.1 Query Language*.
