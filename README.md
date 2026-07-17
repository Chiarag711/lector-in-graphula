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
