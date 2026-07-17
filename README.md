# Lector in Graphula

*From textual cues to interpretive paths.*

**Lector in Graphula** is a Knowledge Representation and Semantic Web project that formalizes selected aspects of Umberto Eco’s theory of the **Model Reader** and interpretive cooperation from *Lector in fabula*.

The project separates two semantic layers:

- an **ontology/TBox**, which models Eco-inspired concepts and relations;
- a **knowledge graph/ABox**, which instantiates selected interpretive cases from Margaret Atwood’s *The Handmaid’s Tale*.

The aim is not to reproduce the complete plot of the novel, establish one definitive literary interpretation, or fully automate interpretation. Instead, the project makes selected interpretive chains **explicit, inspectable, and queryable**, connecting textual cues to intrinsic knowledge, presuppositions, inferences, predictions, and licensed or alternative interpretations.

### Requirements

- [Protégé](https://protege.stanford.edu/)

### Opening the ontology and knowledge graph

1. Clone the repository:

   ```bash
   git clone https://github.com/Chiarag711/lector-in-graphula.git
   cd lector-in-graphula
   ```

2. Keep the repository directory structure unchanged.

3. Open [`knowledge-graph/knowledge-graph.ttl`](knowledge-graph/knowledge-graph.ttl) in Protégé.

4. Confirm that the imported ontology resolves to [`ontology/econtology.ttl`](ontology/econtology.ttl). The XML catalog in the `knowledge-graph` directory supports local IRI resolution.

## Team

Project developed by:

- [Chiara Genovese](https://github.com/Chiarag711)
- [Asia Marselli](https://github.com/asiamarselli)
- [Adriana Monte](https://github.com/adrianamonte)

## Academic disclaimer

This project was developed for the university course **[Knowledge Representation and Extraction](https://www.unibo.it/en/study/course-units-transferable-skills-moocs/course-unit-catalogue/course-unit/2025/533916)**, taught by Professor **[Aldo Gangemi](https://www.unibo.it/sitoweb/aldo.gangemi/en)**, within the **[Digital Humanities and Digital Knowledge](https://corsi.unibo.it/2cycle/DigitalHumanitiesKnowledge)** programme at the **[Alma Mater Studiorum – Università di Bologna](https://www.unibo.it/it)**.

**Lector in Graphula** is an academic prototype created for educational and research purposes. It is not an official project associated with Umberto Eco, Margaret Atwood, their estates, publishers, or other rights holders.

The ontology and knowledge graph contain scholarly modeling and interpretive choices made by the project authors. They should not be treated as definitive representations of either *Lector in fabula* or *The Handmaid’s Tale*.

## Textual materials and copyright

References to *Lector in fabula* and *The Handmaid’s Tale* are included for academic analysis. Short quotations, paraphrases, bibliographic references, and annotations remain subject to the rights of their respective authors and publishers.

The repository must not be used to redistribute complete copyrighted texts.

## References

- Atwood, Margaret. *The Handmaid’s Tale*. 1985.
- Eco, Umberto. *Lector in fabula: La cooperazione interpretativa nei testi narrativi*. 1979.
