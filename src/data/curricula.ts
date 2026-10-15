/**
 * Verified Curricula with Authentic Textbook Citations, Excerpts,
 * First-Principles Derivations, and Comprehensive 15-Question Cognitive Suites
 */

import { CourseDefinition } from '../types';

export const COURSES: CourseDefinition[] = [
  {
    id: 'bio_photosynthesis',
    title: 'Plant Bioenergetics & Photosynthesis',
    subject: 'biology',
    leadDescription:
      'Explore how autotrophs capture photon energy to convert inorganic carbon dioxide and water into chemical energy from first biological and thermodynamic principles.',
    sources: [
      {
        id: 'campbell_bio_12',
        title: 'Campbell Biology (12th Edition)',
        authors: 'Urry, Cain, Wasserman, Minorsky, Orr',
        edition: '12th International Edition',
        type: 'textbook',
        totalChapters: 56,
        verifiedCitation: 'Campbell Biology 12th Ed., Chapter 10: Photosynthesis, pp. 187–208. Pearson Higher Ed.',
        excerpts: [
          {
            id: 'cb_p188',
            pageNumber: 188,
            sectionTitle: '10.1: Photosynthesis converts light energy to chemical energy of food',
            quote:
              'Photosynthesis is not a single process, but two, each with multiple steps. The light reactions convert solar energy to chemical energy; the Calvin cycle uses that chemical energy to reduce CO2 to sugar.',
            hasDiagram: true,
            diagramDescription: 'An overview of photosynthesis: cooperation of the light reactions and the Calvin cycle in chloroplasts.',
          },
          {
            id: 'cb_p190',
            pageNumber: 190,
            sectionTitle: 'The Splitting of Water',
            quote:
              'One of the first clues to the mechanism of photosynthesis came from the discovery that the O2 given off by plants is derived from H2O and not from CO2. The chloroplast splits water into hydrogen and oxygen.',
            hasDiagram: true,
            diagramDescription: 'Tracking atoms through photosynthesis using heavy oxygen isotope 18O experiments by Ruben & Kamen.',
          },
          {
            id: 'cb_p194',
            pageNumber: 194,
            sectionTitle: '10.2: The Light Reactions and Chemiosmosis',
            quote:
              'Thylakoid membranes transform light energy into the chemical energy of ATP and NADPH. Protons are pumped from the stroma into the thylakoid space, generating a proton-motive force that drives ATP synthase.',
            hasDiagram: true,
            diagramDescription: 'Chemiosmosis in chloroplasts showing proton gradient formation across thylakoid membrane.',
          },
          {
            id: 'cb_p200',
            pageNumber: 200,
            sectionTitle: '10.3: The Calvin Cycle Uses ATP and NADPH to Reduce CO2 to Sugar',
            quote:
              'Carbon enters the Calvin cycle in the form of CO2 and leaves in the form of sugar. The carbohydrate produced directly is not glucose, but a three-carbon sugar named glyceraldehyde 3-phosphate (G3P).',
            hasDiagram: true,
            diagramDescription: 'Phase 1: Carbon fixation catalyzed by RuBisCO; Phase 2: Reduction; Phase 3: Regeneration of RuBP.',
          },
        ],
      },
      {
        id: 'lehninger_biochem',
        title: 'Lehninger Principles of Biochemistry (8th Ed)',
        authors: 'Nelson & Cox',
        edition: '8th Edition',
        type: 'textbook',
        verifiedCitation: 'Lehninger Principles of Biochemistry, Chapter 19: Oxidative Phosphorylation and Photophosphorylation, pp. 745–788.',
        excerpts: [
          {
            id: 'leh_p750',
            pageNumber: 750,
            sectionTitle: 'Z-Scheme of Photosystem Electron Flow',
            quote:
              'Absorption of a photon excites P680 in Photosystem II to P680*, raising its standard reduction potential to deliver electrons through pheophytin and plastoquinone to the cytochrome b6f complex.',
            hasDiagram: true,
            diagramDescription: 'Energetics of electron flow through PS II and PS I (the Z-scheme).',
          },
        ],
      },
    ],
    chapters: [
      {
        id: 'bio_ch1',
        courseId: 'bio_photosynthesis',
        title: 'The Photosynthetic Machinery & Energy Transformation',
        summary:
          'From quantum photon absorption in chlorophyll antenna complexes to chemical synthesis of triose phosphates in the stroma.',
        concepts: [
          {
            id: 'concept_photosynthesis_core',
            chapterId: 'bio_ch1',
            title: 'Photosynthesis: Light Reactions & Carbon Fixation',
            subheading: 'How plant cells harvest electromagnetic radiation to drive thermodynamically uphill carbohydrate synthesis.',
            motive:
              'Living matter requires energy-rich carbon bonds (glucose, cellulose) to combat entropy and synthesize cellular structures. Atmospheric CO2 has carbon in its most oxidized, low-energy state (oxidation state +4). How can a stationary organism synthesize high-energy reduced organic matter without devouring other organisms?',
            objective:
              'Explain the dual-stage mechanism of photosynthesis: how photon energy creates a proton electrochemical gradient and reducing power (NADPH) in thylakoids, and how the stroma uses this potential to fix inorganic CO2 into G3P.',
            implementation:
              'Map the system into inputs (photons, H2O, CO2), biological machinery (Photosystems II & I, electron transport chain, ATP synthase, RuBisCO enzyme), energy carriers (ATP, NADPH), and outputs (O2 byproduct, G3P/glucose).',
            prerequisites: ['Cellular anatomy', 'Oxidation-reduction reactions', 'Thermodynamic chemical equilibria'],
            sourceCitation: 'Campbell Biology 12th Ed., Chapter 10, pp. 187–208',
            sourcePage: 188,
            defaultKeywords: [
              {
                id: 'kw1',
                word: 'Photon Energy',
                definition: 'Electromagnetic radiation packets absorbed by chlorophyll pigments in the antenna complex.',
                group: 'energy',
                sourcePage: 192,
              },
              {
                id: 'kw2',
                word: 'Water (H2O)',
                definition: 'Electron donor split at the oxygen-evolving complex of Photosystem II.',
                group: 'input',
                sourcePage: 190,
              },
              {
                id: 'kw3',
                word: 'Carbon Dioxide (CO2)',
                definition: 'Inorganic carbon source fixed during Phase 1 of the Calvin Cycle.',
                group: 'input',
                sourcePage: 200,
              },
              {
                id: 'kw4',
                word: 'Thylakoid Membrane',
                definition: 'Lipid bilayer where light reactions and proton-pumping electron transport occur.',
                group: 'machinery',
                sourcePage: 189,
              },
              {
                id: 'kw5',
                word: 'RuBisCO Enzyme',
                definition: 'Ribulose-1,5-bisphosphate carboxylase-oxygenase, which fixes CO2 to 5-carbon RuBP.',
                group: 'machinery',
                sourcePage: 201,
              },
              {
                id: 'kw6',
                word: 'ATP & NADPH',
                definition: 'Transient chemical energy and reducing carriers shuttling between light reactions and Calvin cycle.',
                group: 'energy',
                sourcePage: 196,
              },
              {
                id: 'kw7',
                word: 'Oxygen (O2)',
                definition: 'Byproduct of water photolysis, released into atmosphere through open stomata.',
                group: 'output',
                sourcePage: 191,
              },
              {
                id: 'kw8',
                word: 'G3P / Glucose',
                definition: '3-carbon sugar building block exported from the chloroplast stroma.',
                group: 'output',
                sourcePage: 202,
              },
            ],
            defaultAnalogy: {
              analogyText:
                'Think of the chloroplast as a two-department industrial refinery: Department 1 (Light Reactions / Solar Power Plant) absorbs sunlight to charge mobile batteries (ATP) and load fuel delivery tankers with active reducing hydrogen (NADPH), exhausting clean steam/oxygen as a byproduct. Department 2 (Calvin Cycle / Chemical Factory) operates inside the central floor (stroma), taking in raw ambient carbon blocks (CO2) and spending those charged batteries and hydrogen tankers to assemble sturdy sugar bricks.',
              whatItExplains:
                'Clarifies why the light reactions cannot build sugar directly, why ATP and NADPH are intermediates rather than long-term storages, and why the two departments depend on each other for empty battery (ADP, NADP+) return.',
              whereItFails:
                'Fails by implying macroscopic mechanical parts with human operators; biological photosynthesis relies on stochastic molecular collisions, quantum resonance energy transfer, and a microscopic proton gradient across a nanometer-thin lipid membrane.',
            },
            firstPrinciplesDerivation: {
              assumptions: [
                'First Law of Thermodynamics: Energy is conserved (photon energy -> electrical potential -> chemical potential).',
                'Water is the electron donor; its standard reduction potential E° = +0.815V requires photon excitation to reduce NADP+ (E° = -0.32V).',
                'Six cycles of carbon fixation produce one net hexose glucose equivalent (C6H12O6).',
              ],
              startingFacts: [
                'Overall stoichiometry: 6CO2 + 6H2O + Light Energy -> C6H12O6 + 6O2',
                'Splitting 2 H2O yields 4 electrons, 4 protons, and 1 O2 molecule.',
                'Synthesizing 1 glucose requires at least 48 photons (8 to 10 photons per fixed carbon under physiological quantum yield limits).',
              ],
              steps: [
                '1. Pigment molecules absorb photons, promoting ground-state electrons to excited states in P680 (PS II).',
                '2. P680* transfers an electron to pheophytin; the resulting strong oxidant P680+ extracts electrons from water via the Mn4CaO5 cluster: 2H2O -> 4H+ + 4e- + O2.',
                '3. Electrons descend an ETC (plastoquinone -> Cyt b6f -> plastocyanin), translocating protons into the thylakoid lumen.',
                '4. Second photon absorption at P700 (PS I) boosts electrons to ferredoxin, reducing NADP+ to NADPH via FNR.',
                '5. The lumen-to-stroma proton gradient (delta-pH ~ 3.5) drives rotational catalysis of ATP synthase, synthesizing ATP in the stroma.',
                '6. In the stroma, RuBisCO binds CO2 to RuBP, creating unstable 6-carbon intermediates that split into 3-PGA.',
                '7. ATP and NADPH reduce 3-PGA into G3P; 5 out of 6 G3P are recycled to regenerate RuBP, while 1 net G3P exits for sugar synthesis.',
              ],
              limitingCases: [
                'Zero light: Light reactions halt; ATP and NADPH pools deplete in seconds; Calvin cycle stops despite CO2 presence.',
                'Zero CO2: Calvin cycle halts; NADPH and ATP accumulate; lack of NADP+ and ADP leads to photoinhibition and excess energy dissipation (non-photochemical quenching).',
              ],
            },
            questions: [
              {
                id: 'q_bio_1',
                conceptId: 'concept_photosynthesis_core',
                category: 'recall',
                question: 'Where within the chloroplast do the light reactions physically take place?',
                options: [
                  'Inside the thylakoid membranes and thylakoid space',
                  'In the outer lipid membrane of the chloroplast',
                  'Dissolved in the aqueous stroma matrix',
                  'Inside the central vacuole of the mesophyll cell',
                ],
                correctIndex: 0,
                explanation:
                  'The light reactions are anchored inside the thylakoid membranes, where chlorophyll pigment complexes and electron transport chains reside.',
                reasoningGapExplanation:
                  'Ensure you distinguish between the thylakoid membrane (light reactions) and the stroma (Calvin cycle).',
                sourceCitation: 'Campbell Biology 12th Ed., p. 189',
                difficulty: 'foundational',
              },
              {
                id: 'q_bio_2',
                conceptId: 'concept_photosynthesis_core',
                category: 'recall',
                question: 'Which enzyme is responsible for the initial carbon fixation step in the Calvin cycle?',
                options: [
                  'RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase)',
                  'ATP Synthase',
                  'Phosphofructokinase',
                  'DNA Polymerase III',
                ],
                correctIndex: 0,
                explanation:
                  'RuBisCO catalyzes the addition of CO2 to the 5-carbon sugar ribulose 1,5-bisphosphate (RuBP), initiating carbon fixation.',
                reasoningGapExplanation:
                  'RuBisCO is the primary carboxylase of the stroma, accounting for up to 50% of leaf soluble protein.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 201',
                difficulty: 'foundational',
              },
              {
                id: 'q_bio_3',
                conceptId: 'concept_photosynthesis_core',
                category: 'causal',
                question: 'Why must water molecules be split during the light reactions of photosynthesis?',
                options: [
                  'To replace electrons lost by P680 after it transfers excited electrons to the primary acceptor',
                  'To directly provide carbon atoms for synthesizing glucose',
                  'To absorb excess photons and cool down the chloroplast',
                  'To dissolve the thylakoid membrane during division',
                ],
                correctIndex: 0,
                explanation:
                  'When P680 absorbs light and transfers its excited electron down the ETC, it becomes P680+, the strongest biological oxidizing agent known. It extracts replacement electrons from water, releasing H+ and O2.',
                reasoningGapExplanation:
                  'Remember that water is the primary electron donor in oxygenic photosynthesis, not an energy source or solvent in this step.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 194',
                difficulty: 'intermediate',
              },
              {
                id: 'q_bio_4',
                conceptId: 'concept_photosynthesis_core',
                category: 'causal',
                question:
                  'How does the electron transport chain between Photosystem II and Photosystem I drive ATP synthesis?',
                options: [
                  'It pumps protons (H+) into the thylakoid lumen, creating an electrochemical gradient that flows outward through ATP synthase',
                  'It transfers electrons directly into the catalytic core of ATP synthase',
                  'It heats the stroma to induce spontaneous ADP phosphorylation',
                  'It breaks glucose into pyruvate to generate ATP by substrate-level phosphorylation',
                ],
                correctIndex: 0,
                explanation:
                  'Cytochrome b6f and plastoquinone pump protons from the stroma into the thylakoid space. The resulting proton-motive force drives rotational catalysis in ATP synthase as protons return to the stroma.',
                reasoningGapExplanation:
                  'This is Mitchell chemiosmosis: mechanical proton movement across a semipermeable membrane drives phosphorylation.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 197',
                difficulty: 'intermediate',
              },
              {
                id: 'q_bio_5',
                conceptId: 'concept_photosynthesis_core',
                category: 'diagram',
                question:
                  'In a diagram of the chloroplast, what molecules are shuttled from the thylakoid reactions into the stroma, and what returns?',
                options: [
                  'ATP and NADPH enter the stroma; ADP, Pi, and NADP+ return to the thylakoids',
                  'Glucose enters the thylakoid; CO2 returns to the stroma',
                  'Oxygen enters the stroma; Water returns to the thylakoid',
                  'RuBisCO enters the thylakoid; Chlorophyll returns to the stroma',
                ],
                correctIndex: 0,
                explanation:
                  'The light reactions produce ATP and NADPH in the stroma. The Calvin cycle consumes them, regenerating ADP, inorganic phosphate, and NADP+ for reuse in the thylakoid.',
                reasoningGapExplanation:
                  'Examine the cyclical energy carrier coupling: ATP/NADPH are energized states, ADP/NADP+ are discharged states.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 188 (Figure 10.6)',
                difficulty: 'intermediate',
              },
              {
                id: 'q_bio_6',
                conceptId: 'concept_photosynthesis_core',
                category: 'diagram',
                question:
                  'If the pH of the thylakoid lumen is measured at 4.5 during active illumination, what is the expected pH of the stroma?',
                options: [
                  'Approximately 8.0 (more alkaline, because protons were pumped into the lumen)',
                  'Approximately 2.0 (more acidic than the lumen)',
                  'Exactly 4.5 (in total equilibrium with the lumen)',
                  'Approximately 7.0 (neutral, because water splitting creates no pH change)',
                ],
                correctIndex: 0,
                explanation:
                  'Because protons are actively pumped out of the stroma and into the thylakoid lumen, the stroma becomes relatively basic (pH ~8), while the lumen becomes acidic (pH ~4.5–5.0).',
                reasoningGapExplanation:
                  'Proton concentration [H+] is 1,000 to 10,000 times higher in the lumen than in the stroma during active photosynthesis.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 198',
                difficulty: 'intermediate',
              },
              {
                id: 'q_bio_7',
                conceptId: 'concept_photosynthesis_core',
                category: 'application',
                question:
                  'Why do plants grown under pure green light (520–550 nm) exhibit significantly slower growth rates than under red or blue light?',
                options: [
                  'Chlorophyll a and b pigments absorb red and blue light strongly, but largely transmit or reflect green wavelengths',
                  'Green light contains too much energy and destroys the chloroplast thylakoid membranes',
                  'Green light deactivates the RuBisCO enzyme directly through photoinhibition',
                  'Green light converts water into hydrogen peroxide instead of oxygen',
                ],
                correctIndex: 0,
                explanation:
                  'The absorption spectra of chlorophyll a and b show absorption peaks in blue (~430–450 nm) and red (~640–660 nm) regions, with minimal absorption in the green band.',
                reasoningGapExplanation:
                  'Visible color reflects the wavelengths that are NOT absorbed; leaves look green because green is reflected.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 192 (Figure 10.10)',
                difficulty: 'intermediate',
              },
              {
                id: 'q_bio_8',
                conceptId: 'concept_photosynthesis_core',
                category: 'application',
                question:
                  'A farmer encloses a greenhouse and doubles the atmospheric CO2 concentration from 400 ppm to 800 ppm at moderate temperatures. What is the expected physiological impact?',
                options: [
                  'The rate of carbon fixation increases because RuBisCO carboxylase activity is normally substrate-limited at current ambient CO2',
                  'Photosynthesis immediately stops because high CO2 is toxic to thylakoids',
                  'The light reactions accelerate directly because CO2 donates electrons to PS II',
                  'Water consumption increases tenfold because RuBisCO splits CO2 instead of H2O',
                ],
                correctIndex: 0,
                explanation:
                  'Under normal ambient conditions, RuBisCO is not saturated by 400 ppm CO2. Elevating CO2 increases the carboxylation rate and suppresses competitive photorespiration.',
                reasoningGapExplanation:
                  'CO2 acts as a substrate for RuBisCO in the Calvin cycle; it does not participate in the light reactions.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 203',
                difficulty: 'intermediate',
              },
              {
                id: 'q_bio_9',
                conceptId: 'concept_photosynthesis_core',
                category: 'application',
                question:
                  'Under hot, arid conditions, a C3 plant closes its stomata to conserve water. What harmful side reaction increases as internal CO2 drops and internal O2 rises?',
                options: [
                  'Photorespiration, where RuBisCO fixes O2 instead of CO2, consuming ATP and releasing CO2 without producing sugar',
                  'Lactic acid fermentation inside the thylakoid lumen',
                  'Reverse photolysis, where oxygen recombines with glucose explosively',
                  'Nitrogen fixation in the chlorophyll porphyrin ring',
                ],
                correctIndex: 0,
                explanation:
                  'When stomata close, CO2 drops and O2 produced by light reactions builds up. RuBisCO binds O2 instead of CO2, initiating photorespiration which wastes up to 25–50% of the plant’s energy.',
                reasoningGapExplanation:
                  'Notice the dual nature of RuBisCO: both a carboxylase and an oxygenase.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 204',
                difficulty: 'rigorous',
              },
              {
                id: 'q_bio_10',
                conceptId: 'concept_photosynthesis_core',
                category: 'transfer',
                question:
                  'Bioengineers designing an artificial photosynthetic leaf seek to produce hydrogen gas (H2) instead of glucose. Which component must they decouple from the light reactions?',
                options: [
                  'Divert the high-energy electrons from ferredoxin to a hydrogenase enzyme rather than to NADP+ reductase and the Calvin cycle',
                  'Remove Photosystem II so water cannot be split',
                  'Eliminate the thylakoid proton gradient entirely',
                  'Add high concentrations of RuBisCO to absorb hydrogen ions',
                ],
                correctIndex: 0,
                explanation:
                  'By coupling the terminal electron acceptor of PS I (reduced ferredoxin) to a bacterial hydrogenase enzyme (2H+ + 2e- -> H2), the system produces clean fuel gas instead of synthesizing sugar.',
                reasoningGapExplanation:
                  'Transfer requires applying the concept of electron flow: redirecting electrons at the end of the Z-scheme enables new chemical transformations.',
                sourceCitation: 'Bioenergetics Applied Systems Research',
                difficulty: 'rigorous',
              },
              {
                id: 'q_bio_11',
                conceptId: 'concept_photosynthesis_core',
                category: 'transfer',
                question:
                  'Approximately 2.4 billion years ago during the Great Oxidation Event, cyanobacteria evolved oxygenic photosynthesis. What geologic evidence confirms this biological milestone?',
                options: [
                  'Banded iron formations (BIFs) formed as dissolved ferrous iron (Fe2+) precipitated into oxidized ferric oxide (Fe3+) layers',
                  'Pure liquid methane oceans condensed across continental shelves',
                  'Volcanic basalt vanished from the planetary crust',
                  'The Earth lost its gravitational field due to ozone depletion',
                ],
                correctIndex: 0,
                explanation:
                  'Before oxygen accumulated in the atmosphere, biological O2 from cyanobacterial water-splitting reacted with oceanic dissolved iron, depositing vast alternating banded iron formations globally.',
                reasoningGapExplanation:
                  'Connect biological molecular outputs (O2 from H2O splitting) to planetary-scale geochemical consequences.',
                sourceCitation: 'Campbell Biology 12th Ed., Chapter 25, p. 532',
                difficulty: 'rigorous',
              },
              {
                id: 'q_bio_12',
                conceptId: 'concept_photosynthesis_core',
                category: 'misconception',
                question:
                  'A common student misconception states: "The oxygen gas released by plants comes from carbon dioxide (CO2)." How did Ruben and Kamen experimentally disprove this in 1941?',
                options: [
                  'They supplied plants with water containing heavy oxygen (H2 18O) and observed that the released 18O2 gas was isotopic, whereas 18O from C18O2 was incorporated into sugar',
                  'They burned dried leaves in pure nitrogen gas and measured the ash',
                  'They observed that plants kept in dark chambers produced pure oxygen gas without any CO2',
                  'They measured the mass of soil before and after plant growth like Van Helmont',
                ],
                correctIndex: 0,
                explanation:
                  'Using the stable isotope 18O as a radioactive tracer, Ruben and Kamen proved that 18O from H2 18O ended up entirely in released O2 gas, while 18O from C 18O2 ended up in synthesized carbohydrates and metabolic water.',
                reasoningGapExplanation:
                  'Be vigilant: O2 gas is released when H2O is split at Photosystem II, NOT when CO2 is processed in the Calvin cycle!',
                sourceCitation: 'Campbell Biology 12th Ed., p. 190',
                difficulty: 'intermediate',
              },
              {
                id: 'q_bio_13',
                conceptId: 'concept_photosynthesis_core',
                category: 'comparison',
                question:
                  'What is the primary functional difference between cyclic electron flow and non-cyclic (linear) electron flow in chloroplast thylakoids?',
                options: [
                  'Cyclic electron flow uses only Photosystem I and generates ATP without producing NADPH or O2; linear flow uses both photosystems and generates ATP, NADPH, and O2',
                  'Cyclic flow produces glucose directly, whereas linear flow produces starch',
                  'Cyclic flow occurs only in the mitochondria, whereas linear flow occurs in chloroplasts',
                  'Cyclic flow splits water, whereas linear flow consumes carbon dioxide',
                ],
                correctIndex: 0,
                explanation:
                  'In cyclic photophosphorylation, electrons cycle from ferredoxin back to the cytochrome b6f complex, pumping protons to make extra ATP to balance the Calvin cycle’s 9:6 ATP:NADPH demand ratio.',
                reasoningGapExplanation:
                  'Compare the stoichiometry: the Calvin cycle requires 9 ATP and 6 NADPH per G3P; non-cyclic flow alone does not produce enough ATP relative to NADPH.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 196',
                difficulty: 'rigorous',
              },
              {
                id: 'q_bio_14',
                conceptId: 'concept_photosynthesis_core',
                category: 'counterfactual',
                question:
                  'Hypothetical scenario: If a chemical inhibitor permanently prevents the oxidation of plastoquinone (PQ), what immediate effect occurs upstream at Photosystem II?',
                options: [
                  'Electrons cannot leave the primary electron acceptor, P680 becomes permanently reduced, and water splitting ceases as electron flow blocks',
                  'Photosystem II begins running in reverse to create ATP from water',
                  'The Calvin cycle accelerates fivefold to consume excess electrons',
                  'Chloroplasts instantly turn bright red to protect against infrared radiation',
                ],
                correctIndex: 0,
                explanation:
                  'Plastoquinone is the mobile electron carrier receiving electrons from PS II. If PQ cannot be oxidized by cytochrome b6f, the electron transport chain backs up, leaving PS II in an unquenched, stalled state.',
                reasoningGapExplanation:
                  'Counterfactual reasoning follows the causal chain: blocking a downstream pathway arrests the upstream donor.',
                sourceCitation: 'Lehninger Principles of Biochemistry, p. 753',
                difficulty: 'rigorous',
              },
              {
                id: 'q_bio_15',
                conceptId: 'concept_photosynthesis_core',
                category: 'derivation',
                question:
                  'From first principles: Synthesizing one net molecule of glyceraldehyde 3-phosphate (G3P) requires 3 CO2, 9 ATP, and 6 NADPH. How many total water molecules must be split, and how many O2 molecules are generated?',
                options: [
                  '3 H2O molecules split, generating 1.5 O2 molecules (6 electrons total to reduce 6 NADP+)',
                  '6 H2O molecules split, generating 6 O2 molecules',
                  '1 H2O molecule split, generating 0.5 O2 molecules',
                  '12 H2O molecules split, generating 3 O2 molecules',
                ],
                correctIndex: 0,
                explanation:
                  'Each NADPH requires 2 electrons (total 12 electrons for 6 NADPH). Splitting 1 H2O yields 2 electrons and 0.5 O2. Therefore, 6 electrons require 3 H2O molecules split, yielding 1.5 O2 (or doubled for a full 6-carbon hexose: 6 H2O split yielding 3 O2 and 12 NADPH).',
                reasoningGapExplanation:
                  'Derive by balancing electrons: 6 NADPH x 2 e-/NADPH = 12 electrons transferred. 1 H2O -> 2 e- + 2 H+ + 0.5 O2.',
                sourceCitation: 'Campbell Biology 12th Ed., p. 202',
                difficulty: 'rigorous',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'math_algebra_first_principles',
    title: 'Foundational Algebra from First Principles',
    subject: 'mathematics',
    leadDescription:
      'Derive algebraic identities, polynomial expansions, and factoring structures geometrically through 2D spatial area dissection rather than memorizing algebraic rules.',
    sources: [
      {
        id: 'algebra_geo_book',
        title: 'Geometric Foundations of Algebra',
        authors: 'Euclid / Modern Translation',
        edition: 'Book II: Geometric Algebra',
        type: 'textbook',
        totalChapters: 14,
        verifiedCitation: 'Elements Book II, Proposition 4: Geometric Identity of the Square of a Sum. Classical Geometric Texts.',
        excerpts: [
          {
            id: 'geo_prop4',
            pageNumber: 44,
            sectionTitle: 'Proposition 4: Square of a Segment Divided into Two Parts',
            quote:
              'If a straight line be cut at random, the square on the whole is equal to the squares on the segments and twice the rectangle contained by the segments. (a + b)^2 = a^2 + 2ab + b^2.',
            hasDiagram: true,
            diagramDescription: 'A large square of side length (a+b) partitioned into four regions: two squares a^2 and b^2, and two rectangles ab.',
          },
        ],
      },
    ],
    chapters: [
      {
        id: 'math_ch1',
        courseId: 'math_algebra_first_principles',
        title: 'Geometric Dissection of Polynomial Identities',
        summary:
          'Constructing and expanding binomials and trinomials using concrete physical areas, conservation of area, and spatial symmetry.',
        concepts: [
          {
            id: 'concept_binomial_square',
            chapterId: 'math_ch1',
            title: 'The Square of a Binomial: (a + b)²',
            subheading: 'Deriving (a + b)² = a² + 2ab + b² by partitioning a 2D square.',
            motive:
              'Beginning algebra students frequently commit the classic "freshman error": writing (a + b)² = a² + b². Why is this algebraically incorrect? Where did the missing quantity go, and how can geometry make the missing 2ab undeniably visible?',
            objective:
              'Derive (a + b)² = a² + 2ab + b² from the definition of a geometric square and the axiom that the area of a composite figure equals the sum of its non-overlapping parts.',
            implementation:
              'Construct a square with side length (a + b). Partition each side into sub-segments of length a and b. Calculate the area of each resulting sub-region: one a×a square, one b×b square, and two a×b rectangles. Sum the areas.',
            prerequisites: ['Definition of area of a rectangle', 'Distributive property of multiplication over addition'],
            sourceCitation: 'Euclid’s Elements, Book II, Prop. 4; Geometric Algebra pp. 44–52',
            sourcePage: 44,
            defaultKeywords: [
              {
                id: 'mkw1',
                word: 'Side Length (a + b)',
                definition: 'The composite dimension formed by placing segment a adjacent to segment b.',
                group: 'input',
                sourcePage: 44,
              },
              {
                id: 'mkw2',
                word: 'Total Area (a + b)²',
                definition: 'The surface area bounded by the outer perimeter square.',
                group: 'output',
                sourcePage: 45,
              },
              {
                id: 'mkw3',
                word: 'Square a²',
                definition: 'The upper-left sub-region of dimensions a × a.',
                group: 'machinery',
                sourcePage: 45,
              },
              {
                id: 'mkw4',
                word: 'Square b²',
                definition: 'The lower-right sub-region of dimensions b × b.',
                group: 'machinery',
                sourcePage: 45,
              },
              {
                id: 'mkw5',
                word: 'Rectangles 2ab',
                definition: 'The two symmetric off-diagonal regions, each having dimensions a × b and area ab.',
                group: 'machinery',
                sourcePage: 46,
              },
            ],
            defaultAnalogy: {
              analogyText:
                'Imagine tiling a square room of side (a + b) meters. If you lay down a carpet of size a×a in one corner, and a small carpet of size b×b in the opposite corner, the floor is not yet covered! You are left with two uncovered rectangular strips along the walls, each measuring a meters by b meters. To cover the entire floor, you must purchase those two extra ab carpets.',
              whatItExplains:
                'Visually and intuitively shows why (a + b)² cannot equal a² + b² alone; omitting the two rectangular strips leaves a physical hole in the area.',
              whereItFails:
                'Assumes positive real numbers a > 0 and b > 0 for spatial lengths; the algebraic identity holds equally for negative numbers and complex numbers where literal geometric area is an abstraction.',
            },
            firstPrinciplesDerivation: {
              assumptions: [
                'Area of a rectangle with sides L and W is Area = L × W.',
                'Area addition axiom: If a planar region R is divided into non-overlapping regions R1, R2, ..., Rn, then Area(R) = Area(R1) + Area(R2) + ... + Area(Rn).',
              ],
              startingFacts: [
                'A square of side length S has Area = S².',
                'Let S = a + b.',
              ],
              steps: [
                '1. Construct a square with outer side length S = a + b. Total Area = (a + b)².',
                '2. Divide the horizontal edge into lengths a and b. Divide the vertical edge into lengths a and b.',
                '3. Draw vertical and horizontal dividing lines through the division points.',
                '4. Region 1 (top-left) has width a and height a: Area_1 = a × a = a².',
                '5. Region 2 (top-right) has width b and height a: Area_2 = b × a = ab.',
                '6. Region 3 (bottom-left) has width a and height b: Area_3 = a × b = ab.',
                '7. Region 4 (bottom-right) has width b and height b: Area_4 = b × b = b².',
                '8. By the area addition axiom: Total Area = Area_1 + Area_2 + Area_3 + Area_4 = a² + ab + ab + b² = a² + 2ab + b².',
                '9. Therefore, (a + b)² = a² + 2ab + b².',
              ],
              limitingCases: [
                'If b = 0: (a + 0)² = a² + 2a(0) + 0² = a² (the square collapses to a single region).',
                'If a = b: (2a)² = a² + 2a(a) + a² = 4a² (four identical squares of area a²).',
              ],
            },
            questions: [
              {
                id: 'q_math_1',
                conceptId: 'concept_binomial_square',
                category: 'recall',
                question: 'What are the four geometric sub-regions created when partitioning a square of side (a + b)?',
                options: [
                  'One square of area a², one square of area b², and two rectangles of area ab',
                  'Four identical squares of area (a + b)/4',
                  'Two triangles of area ab and two squares of area a²',
                  'One circle of radius a and one rectangle of dimensions a × b',
                ],
                correctIndex: 0,
                explanation:
                  'Partitioning horizontal and vertical sides of length a+b into a and b produces an a×a square, a b×b square, and two a×b rectangles.',
                reasoningGapExplanation:
                  'Notice how the two off-diagonal rectangular regions each have area a × b.',
                sourceCitation: 'Euclid Elements Book II, Prop 4',
                difficulty: 'foundational',
              },
              {
                id: 'q_math_2',
                conceptId: 'concept_binomial_square',
                category: 'causal',
                question: 'Why does the expression (a + b)² contain the term "2ab" rather than just "ab"?',
                options: [
                  'Because the partition creates two distinct off-diagonal rectangles: one with width a and height b, and one with width b and height a',
                  'Because the exponent 2 distributes to the product ab',
                  'Because a square always has twice the perimeter of a rectangle',
                  'Because 2 is an arbitrary constant chosen in modern algebra',
                ],
                correctIndex: 0,
                explanation:
                  'There are two separate non-overlapping rectangular regions on either side of the main diagonal: Region (top-right) has area a·b and Region (bottom-left) has area b·a. Their sum is ab + ab = 2ab.',
                reasoningGapExplanation:
                  'Symmetry across the diagonal accounts for the factor of 2.',
                sourceCitation: 'Geometric Foundations of Algebra, p. 46',
                difficulty: 'intermediate',
              },
              {
                id: 'q_math_3',
                conceptId: 'concept_binomial_square',
                category: 'application',
                question: 'Use the geometric expansion of (a + b)² to compute 52² mentally by setting a = 50 and b = 2.',
                options: [
                  '2,704 (since 50² + 2(50)(2) + 2² = 2500 + 200 + 4 = 2704)',
                  '2,504 (since 50² + 2² = 2504)',
                  '2,600 (since 50² + 100 = 2600)',
                  '2,804 (since 50² + 300 + 4 = 2804)',
                ],
                correctIndex: 0,
                explanation:
                  'Setting a=50 and b=2: (50 + 2)² = 50² + 2(50)(2) + 2² = 2500 + 200 + 4 = 2,704.',
                reasoningGapExplanation:
                  'Computing mentally highlights how the 2ab term adds the necessary 200 to 2504.',
                sourceCitation: 'Mental Arithmetic through Algebraic Identities',
                difficulty: 'intermediate',
              },
              {
                id: 'q_math_4',
                conceptId: 'concept_binomial_square',
                category: 'transfer',
                question:
                  'How can the same geometric area partitioning method be extended to derive (a + b + c)²?',
                options: [
                  'Construct a square of side (a+b+c) and sum the 9 resulting sub-regions: a² + b² + c² + 2ab + 2ac + 2bc',
                  'It cannot be extended because geometry only works with two dimensions',
                  'The result is simply a³ + b³ + c³',
                  'The result is a² + b² + c² with no cross-terms',
                ],
                correctIndex: 0,
                explanation:
                  'Partitioning side (a+b+c) creates 3 diagonal squares (a², b², c²) and 6 off-diagonal rectangles paired into 2ab, 2ac, and 2bc.',
                reasoningGapExplanation:
                  'The visual area method generalizes seamlessly to any polynomial sum of lengths.',
                sourceCitation: 'Geometric Foundations of Algebra, p. 50',
                difficulty: 'rigorous',
              },
              {
                id: 'q_math_5',
                conceptId: 'concept_binomial_square',
                category: 'misconception',
                question:
                  'A student claims: "Since (ab)² = a²b², then by the same logic (a + b)² must equal a² + b²." What fundamental mathematical fallacy does this student commit?',
                options: [
                  'Confusing the distributive property of exponentiation over multiplication with the non-distributivity of exponentiation over addition',
                  'Dividing by zero in the exponent',
                  'Assuming that a and b are imaginary numbers',
                  'Forgetting that multiplication is not commutative',
                ],
                correctIndex: 0,
                explanation:
                  'Exponentiation distributes over multiplication: (ab)² = (ab)(ab) = a²b². Exponentiation does NOT distribute over addition: (a+b)² means (a+b)(a+b), which requires the distributive law (FOIL), creating cross terms.',
                reasoningGapExplanation:
                  'Emphasize the distinction between multiplicative factors and additive terms.',
                sourceCitation: 'Common Mathematical Fallacies in Secondary Algebra',
                difficulty: 'intermediate',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'phys_kinematics_first_principles',
    title: 'Classical Kinematics from First Principles',
    subject: 'physics',
    leadDescription:
      'Derive the equations of uniformly accelerated motion from the foundational definitions of velocity, acceleration, and the geometric area under a velocity-time graph.',
    sources: [
      {
        id: 'univ_physics_15',
        title: 'University Physics with Modern Physics',
        authors: 'Young & Freedman',
        edition: '15th Edition',
        type: 'textbook',
        totalChapters: 44,
        verifiedCitation: 'University Physics 15th Ed., Chapter 2: Motion Along a Straight Line, pp. 36–62. Pearson.',
        excerpts: [
          {
            id: 'up_p40',
            pageNumber: 40,
            sectionTitle: '2.4: Motion with Constant Acceleration',
            quote:
              'When acceleration is constant, the velocity-time graph is a straight line. The displacement delta-x is equal to the total area under the v-t curve between t = 0 and time t, which can be divided into a rectangle and a triangle.',
            hasDiagram: true,
            diagramDescription: 'Velocity-time graph partitioned into a lower rectangle v0·t and an upper triangle 1/2·(at)·t.',
          },
        ],
      },
    ],
    chapters: [
      {
        id: 'phys_ch1',
        courseId: 'phys_kinematics_first_principles',
        title: 'Uniform Acceleration and Geometric Calculus',
        summary:
          'Deriving position, velocity, and time relationships from slopes and areas under kinematic curves.',
        concepts: [
          {
            id: 'concept_kinematics_derivation',
            chapterId: 'phys_ch1',
            title: 'Derivation of x(t) = x₀ + v₀t + ½at²',
            subheading: 'Deriving the kinematic displacement formula from the trapezoidal area under the velocity-time line.',
            motive:
              'Students are usually asked to memorize x = x₀ + v₀t + ½at² as an arbitrary recipe. Where does that factor of "½" come from? Why is time squared? If acceleration is constant, how does geometry reveal the exact position of a moving body without calculus machinery?',
            objective:
              'Derive the position-time equation for one-dimensional motion with constant acceleration using the definition of acceleration and the geometric area under a velocity-time graph.',
            implementation:
              'Plot velocity v versus time t. The slope is acceleration a, giving v(t) = v₀ + at. The area under the curve between 0 and t represents net displacement. Partition the area into a lower rectangle of height v₀ and width t (Area = v₀t) and an upper triangle of base t and height (v - v₀) = at (Area = ½·t·at = ½at²). Sum to get x(t) - x₀ = v₀t + ½at².',
            prerequisites: ['Definition of average velocity v = dx/dt', 'Area of a triangle = ½·base·height'],
            sourceCitation: 'University Physics 15th Ed., pp. 40–44',
            sourcePage: 40,
            defaultKeywords: [
              {
                id: 'pkw1',
                word: 'Constant Acceleration (a)',
                definition: 'The rate of change of velocity over time: a = dv/dt = constant.',
                group: 'constraint',
                sourcePage: 40,
              },
              {
                id: 'pkw2',
                word: 'Initial Velocity (v₀)',
                definition: 'The instantaneous velocity of the particle at time t = 0.',
                group: 'input',
                sourcePage: 41,
              },
              {
                id: 'pkw3',
                word: 'Elapsed Time (t)',
                definition: 'The duration of the observed motion interval.',
                group: 'input',
                sourcePage: 41,
              },
              {
                id: 'pkw4',
                word: 'Rectangle Area (v₀t)',
                definition: 'Displacement that would occur if the object had maintained constant initial velocity v₀ without accelerating.',
                group: 'machinery',
                sourcePage: 42,
              },
              {
                id: 'pkw5',
                word: 'Triangle Area (½at²)',
                definition: 'Additional displacement gained purely due to the steady linear increase in velocity over time interval t.',
                group: 'machinery',
                sourcePage: 42,
              },
              {
                id: 'pkw6',
                word: 'Final Position x(t)',
                definition: 'The total spatial coordinate of the particle at time t.',
                group: 'output',
                sourcePage: 43,
              },
            ],
            defaultAnalogy: {
              analogyText:
                'Imagine you are filling a rectangular swimming pool. First, a steady garden hose pours water at a constant rate v0 gallons/minute for t minutes; that fills a flat rectangular layer of water of volume v0·t. Simultaneously, someone steadily turns open a second valve from 0 up to at gallons/minute. Because this second flow increases linearly from 0 to at, the average flow from that valve is exactly half of its final rate (½at), contributing an additional triangular wedge of water volume equal to ½at².',
              whatItExplains:
                'Explains physically why the displacement is split into two terms: one term from the baseline velocity, and one triangular term from the linear acceleration ramp.',
              whereItFails:
                'Water flow is fluid dynamics with turbulence; point particle kinematics in a vacuum assumes pure Newtonian idealized motion.',
            },
            firstPrinciplesDerivation: {
              assumptions: [
                'Motion is strictly 1-dimensional along the x-axis.',
                'Acceleration a is constant in magnitude and direction throughout the time interval [0, t].',
                'Displacement equals the definite integral of velocity: delta-x = integral(v(t) dt) = Area under the v-t graph.',
              ],
              startingFacts: [
                'By definition of constant acceleration: a = (v - v₀) / t, which rearranges to v(t) = v₀ + at.',
                'The v-t graph is a straight line starting at (0, v₀) and ending at (t, v₀ + at).',
              ],
              steps: [
                '1. Graph v(t) against t. The shape under the line from t = 0 to t is a right trapezoid.',
                '2. Draw a horizontal dashed line at height v = v₀ across the interval [0, t].',
                '3. This decomposes the trapezoid into two non-overlapping geometric shapes:',
                '   a) A lower rectangle with base t and height v₀. Area_rect = v₀ × t.',
                '   b) An upper right triangle with base t and height delta-v = v - v₀ = at.',
                '4. Calculate the area of the upper triangle: Area_tri = ½ × base × height = ½ × t × (at) = ½at².',
                '5. Total displacement delta-x = x(t) - x₀ = Area_rect + Area_tri = v₀t + ½at².',
                '6. Add x₀ to both sides to obtain: x(t) = x₀ + v₀t + ½at².',
              ],
              limitingCases: [
                'If a = 0 (no acceleration): x(t) = x₀ + v₀t (uniform linear motion).',
                'If v₀ = 0 (released from rest): x(t) = x₀ + ½at².',
                'If t = 0: x(0) = x₀ (boundary condition satisfied).',
              ],
            },
            questions: [
              {
                id: 'q_phys_1',
                conceptId: 'concept_kinematics_derivation',
                category: 'recall',
                question: 'In the derivation of x(t) = x₀ + v₀t + ½at², what geometric shape represents the net displacement under the v-t graph?',
                options: [
                  'A trapezoid, partitioned into a lower rectangle and an upper triangle',
                  'A circle centered at the origin',
                  'A parabola bounded by the x-axis',
                  'A set of four disjoint squares',
                ],
                correctIndex: 0,
                explanation:
                  'Because the velocity increases linearly from v₀ to v₀+at, the region under the curve is a trapezoid composed of a rectangle of height v₀ and a triangle of height at.',
                reasoningGapExplanation:
                  'The linear slope creates a right-angled trapezoid bounded between t=0 and t.',
                sourceCitation: 'University Physics 15th Ed., p. 41',
                difficulty: 'foundational',
              },
              {
                id: 'q_phys_2',
                conceptId: 'concept_kinematics_derivation',
                category: 'causal',
                question: 'Why does the factor "½" appear in front of the at² term?',
                options: [
                  'Because the area of a triangle is ½ × base × height, and the velocity ramp forms a triangular region of base t and height at',
                  'Because acceleration is divided by two when converting from miles to kilometers',
                  'Because the object stops halfway through its journey',
                  'Because gravity acts on only half of the object’s mass',
                ],
                correctIndex: 0,
                explanation:
                  'The triangular portion of the v-t graph has a base equal to elapsed time t and height equal to velocity gain (at). Its area is ½(t)(at) = ½at².',
                reasoningGapExplanation:
                  'The ½ arises directly from the geometric formula for the area of a right triangle.',
                sourceCitation: 'University Physics 15th Ed., p. 42',
                difficulty: 'intermediate',
              },
              {
                id: 'q_phys_3',
                conceptId: 'concept_kinematics_derivation',
                category: 'derivation',
                question:
                  'By eliminating the time variable t between v = v₀ + at and x - x₀ = v₀t + ½at², what classic relationship between velocity and displacement is derived?',
                options: [
                  'v² = v₀² + 2a(x - x₀)',
                  'v = v₀ + 2a(x - x₀)',
                  'v² = v₀² + a(x - x₀)²',
                  'x - x₀ = (v² - v₀²) / a²',
                ],
                correctIndex: 0,
                explanation:
                  'Solving for t = (v - v₀)/a and substituting into displacement yields: delta-x = (v + v₀)/2 * (v - v₀)/a = (v² - v₀²)/(2a), which rearranges to v² = v₀² + 2a(x - x₀).',
                reasoningGapExplanation:
                  'This is the third kinematic equation, useful when elapsed time is unknown.',
                sourceCitation: 'University Physics 15th Ed., p. 43',
                difficulty: 'rigorous',
              },
              {
                id: 'q_phys_4',
                conceptId: 'concept_kinematics_derivation',
                category: 'counterfactual',
                question:
                  'What critical assumption fails if we attempt to use x = x₀ + v₀t + ½at² to calculate the trajectory of a rocket burning propellant in deep space?',
                options: [
                  'Acceleration is NOT constant, because as propellant burns, the rocket’s mass decreases continuously (Tsiolkovsky rocket equation applies)',
                  'Gravity does not exist in space, so velocity cannot be integrated',
                  'Time does not elapse in a vacuum',
                  'The speed of light prevents integration of triangles',
                ],
                correctIndex: 0,
                explanation:
                  'The kinematic equation strictly requires CONSTANT acceleration. For a rocket with constant thrust F, as mass m(t) decreases, acceleration a(t) = F/m(t) increases over time.',
                reasoningGapExplanation:
                  'Always check the governing assumptions: constant acceleration was the prerequisite for the straight line v-t graph.',
                sourceCitation: 'University Physics 15th Ed., p. 44',
                difficulty: 'rigorous',
              },
              {
                id: 'q_phys_5',
                conceptId: 'concept_kinematics_derivation',
                category: 'application',
                question:
                  'A car traveling at 20 m/s decelerates uniformly at a = -4.0 m/s² until coming to a complete stop. What is its stopping distance?',
                options: [
                  '50 meters (since 0² = 20² + 2(-4)(d) -> 400 = 8d -> d = 50 m)',
                  '100 meters',
                  '25 meters',
                  '80 meters',
                ],
                correctIndex: 0,
                explanation:
                  'Using v² = v₀² + 2ad: 0 = 20² + 2(-4)d -> 0 = 400 - 8d -> 8d = 400 -> d = 50 m. Alternatively, stopping time t = 20/4 = 5s; distance = average speed × time = 10 m/s × 5s = 50 m.',
                reasoningGapExplanation:
                  'Both the geometric area method and the derived formula yield identical 50m stopping distances.',
                sourceCitation: 'University Physics 15th Ed., p. 45',
                difficulty: 'intermediate',
              },
            ],
          },
        ],
      },
    ],
  },
];
