export const aiActData = [
    {
        type: "header",
        shortLabel: "Chapter III",
        text: "CHAPTER III - HIGH-RISK AI SYSTEMS"
    },
    {
        type: "header",
        shortLabel: "Section 1",
        text: "SECTION 1 - Classification of AI systems as high-risk"
    },
    {
        type: "article",
        shortLabel: "Art. 6",
        title: "Article 6 - Classification rules for high-risk AI systems",
        keywords: ["Classification", "Safety Component", "Annex I", "Annex III", "Profiling"],
        content: [
            "1. Irrespective of whether an AI system is placed on the market or put into service independently of the products referred to in points (a) and (b), that AI system shall be considered to be high-risk where both of the following conditions are fulfilled:",
            "(a) the AI system is intended to be used as a safety component of a product, or the AI system is itself a product, covered by the Union harmonisation legislation listed in Annex I;",
            "(b) the product whose safety component pursuant to point (a) is the AI system, or the AI system itself as a product, is required to undergo a third-party conformity assessment, with a view to the placing on the market or the putting into service of that product pursuant to the Union harmonisation legislation listed in Annex I.",
            "2. In addition to the high-risk AI systems referred to in paragraph 1, AI systems referred to in Annex III shall be considered to be high-risk.",
            "3. By derogation from paragraph 2, an AI system referred to in Annex III shall not be considered to be high-risk where it does not pose a significant risk of harm to the health, safety or fundamental rights of natural persons, including by not materially influencing the outcome of decision making.",
            "The first subparagraph shall apply where any of the following conditions is fulfilled:",
            "(a) the AI system is intended to perform a narrow procedural task;",
            "(b) the AI system is intended to improve the result of a previously completed human activity;",
            "(c) the AI system is intended to detect decision-making patterns or deviations from prior decision-making patterns and is not meant to replace or influence the previously completed human assessment, without proper human review; or",
            "(d) the AI system is intended to perform a preparatory task to an assessment relevant for the purposes of the use cases listed in Annex III.",
            "Notwithstanding the first subparagraph, an AI system referred to in Annex III shall always be considered to be high-risk where the AI system performs profiling of natural persons.",
            "4. A provider who considers that an AI system referred to in Annex III is not high-risk shall document its assessment before that system is placed on the market or put into service. Such provider shall be subject to the registration obligation set out in Article 49(2). Upon request of national competent authorities, the provider shall provide the documentation of the assessment.",
            "5. The Commission shall, after consulting the European Artificial Intelligence Board (the ‘Board’), and no later than 2 February 2026, provide guidelines specifying the practical implementation of this Article in line with Article 96 together with a comprehensive list of practical examples of use cases of AI systems that are high-risk and not high-risk.",
            "6. The Commission is empowered to adopt delegated acts in accordance with Article 97 in order to amend paragraph 3, second subparagraph, of this Article by adding new conditions to those laid down therein, or by modifying them, where there is concrete and reliable evidence of the existence of AI systems that fall under the scope of Annex III, but do not pose a significant risk of harm to the health, safety or fundamental rights of natural persons.",
            "7. The Commission shall adopt delegated acts in accordance with Article 97 in order to amend paragraph 3, second subparagraph, of this Article by deleting any of the conditions laid down therein, where there is concrete and reliable evidence that this is necessary to maintain the level of protection of health, safety and fundamental rights provided for by this Regulation.",
            "8. Any amendment to the conditions laid down in paragraph 3, second subparagraph, adopted in accordance with paragraphs 6 and 7 of this Article shall not decrease the overall level of protection of health, safety and fundamental rights provided for by this Regulation and shall ensure consistency with the delegated acts adopted pursuant to Article 7(1), and take account of market and technological developments."
        ]
    },
    {
        type: "article",
        shortLabel: "Art. 7",
        title: "Article 7 - Amendments to Annex III",
        keywords: ["Amendments", "Delegated Acts", "High-Risk Criteria", "Health & Safety", "Fundamental Rights"],
        content: [
            "1. The Commission is empowered to adopt delegated acts in accordance with Article 97 to amend Annex III by adding or modifying use-cases of high-risk AI systems where both of the following conditions are fulfilled:",
            "(a) the AI systems are intended to be used in any of the areas listed in Annex III;",
            "(b) the AI systems pose a risk of harm to health and safety, or an adverse impact on fundamental rights, and that risk is equivalent to, or greater than, the risk of harm or of adverse impact posed by the high-risk AI systems already referred to in Annex III.",
            "2. When assessing the condition under paragraph 1, point (b), the Commission shall take into account the following criteria:",
            "(a) the intended purpose of the AI system;",
            "(b) the extent to which an AI system has been used or is likely to be used;",
            "(c) the nature and amount of the data processed and used by the AI system, in particular whether special categories of personal data are processed;",
            "(d) the extent to which the AI system acts autonomously and the possibility for a human to override a decision or recommendations that may lead to potential harm;",
            "(e) the extent to which the use of an AI system has already caused harm to health and safety, has had an adverse impact on fundamental rights or has given rise to significant concerns in relation to the likelihood of such harm or adverse impact...",
            "(f) the potential extent of such harm or such adverse impact...",
            "(g) the extent to which persons who are potentially harmed or suffer an adverse impact are dependent on the outcome produced with an AI system...",
            "(h) the extent to which there is an imbalance of power...",
            "(i) the extent to which the outcome produced involving an AI system is easily corrigible or reversible...",
            "(j) the magnitude and likelihood of benefit of the deployment of the AI system...",
            "(k) the extent to which existing Union law provides for effective measures of redress...",
            "3. The Commission is empowered to adopt delegated acts in accordance with Article 97 to amend the list in Annex III by removing high-risk AI systems where both of the following conditions are fulfilled:",
            "(a) the high-risk AI system concerned no longer poses any significant risks...",
            "(b) the deletion does not decrease the overall level of protection..."
        ]
    },
    {
        type: "header",
        shortLabel: "Section 2",
        text: "SECTION 2 - Requirements for high-risk AI systems"
    },
    {
        type: "article",
        shortLabel: "Art. 8",
        title: "Article 8 - Compliance with the requirements",
        keywords: ["Compliance", "State of the Art", "Risk Management", "Union Harmonisation"],
        content: [
            "1. High-risk AI systems shall comply with the requirements laid down in this Section, taking into account their intended purpose as well as the generally acknowledged state of the art on AI and AI-related technologies. The risk management system referred to in Article 9 shall be taken into account when ensuring compliance with those requirements.",
            "2. Where a product contains an AI system, to which the requirements of this Regulation as well as requirements of the Union harmonisation legislation listed in Section A of Annex I apply, providers shall be responsible for ensuring that their product is fully compliant with all applicable requirements under applicable Union harmonisation legislation..."
        ]
    },
    {
        type: "article",
        shortLabel: "Art. 9",
        title: "Article 9 - Risk management system",
        keywords: ["Risk Management System", "Iterative Process", "Lifecycle", "Testing", "Residual Risk"],
        content: [
            "1. A risk management system shall be established, implemented, documented and maintained in relation to high-risk AI systems.",
            "2. The risk management system shall be understood as a continuous iterative process planned and run throughout the entire lifecycle of a high-risk AI system, requiring regular systematic review and updating...",
            "3. The risks referred to in this Article shall concern only those which may be reasonably mitigated or eliminated through the development or design of the high-risk AI system...",
            "4. The risk management measures referred to in paragraph 2, point (d), shall give due consideration to the effects and possible interaction resulting from the combined application of the requirements set out in this Section...",
            "5. The risk management measures referred to in paragraph 2, point (d), shall be such that the relevant residual risk associated with each hazard, as well as the overall residual risk of the high-risk AI systems is judged to be acceptable...",
            "6. High-risk AI systems shall be tested for the purpose of identifying the most appropriate and targeted risk management measures...",
            "7. Testing procedures may include testing in real-world conditions in accordance with Article 60.",
            "8. The testing of high-risk AI systems shall be performed, as appropriate, at any time throughout the development process...",
            "9. When implementing the risk management system as provided for in paragraphs 1 to 7, providers shall give consideration to whether in view of its intended purpose the high-risk AI system is likely to have an adverse impact on persons under the age of 18...",
            "10. For providers of high-risk AI systems that are subject to requirements regarding internal risk management processes under other relevant provisions of Union law..."
        ]
    },
    {
        type: "article",
        shortLabel: "Art. 10",
        title: "Article 10 - Data and data governance",
        keywords: ["Data Governance", "Training Data", "Validation", "Bias Detection", "Quality Criteria"],
        content: [
            "1. High-risk AI systems which make use of techniques involving the training of AI models with data shall be developed on the basis of training, validation and testing data sets that meet the quality criteria referred to in paragraphs 2 to 5 whenever such data sets are used.",
            "2. Training, validation and testing data sets shall be subject to data governance and management practices appropriate for the intended purpose of the high-risk AI system...",
            "3. Training, validation and testing data sets shall be relevant, sufficiently representative, and to the best extent possible, free of errors and complete in view of the intended purpose...",
            "4. Data sets shall take into account, to the extent required by the intended purpose, the characteristics or elements that are particular to the specific geographical, contextual, behavioural or functional setting...",
            "5. To the extent that it is strictly necessary for the purpose of ensuring bias detection and correction in relation to the high-risk AI systems... the providers of such systems may exceptionally process special categories of personal data...",
            "6. For the development of high-risk AI systems not using techniques involving the training of AI models, paragraphs 2 to 5 apply only to the testing data sets."
        ]
    },
    {
        type: "article",
        shortLabel: "Art. 11",
        title: "Article 11 - Technical documentation",
        keywords: ["Technical Documentation", "Annex IV", "Up-to-date"],
        content: [
            "1. The technical documentation of a high-risk AI system shall be drawn up before that system is placed on the market or put into service and shall be kept up-to date...",
            "2. Where a high-risk AI system related to a product covered by the Union harmonisation legislation listed in Section A of Annex I is placed on the market or put into service...",
            "3. The Commission is empowered to adopt delegated acts in accordance with Article 97 in order to amend Annex IV..."
        ]
    },
    {
        type: "article",
        shortLabel: "Art. 12",
        title: "Article 12 - Record-keeping",
        keywords: ["Record-keeping", "Logs", "Traceability", "Event Recording"],
        content: [
            "1. High-risk AI systems shall technically allow for the automatic recording of events (logs) over the lifetime of the system.",
            "2. In order to ensure a level of traceability of the functioning of a high-risk AI system that is appropriate to the intended purpose of the system, logging capabilities shall enable the recording of events relevant for...",
            "3. For high-risk AI systems referred to in point 1 (a), of Annex III, the logging capabilities shall provide, at a minimum..."
        ]
    },
    {
        type: "article",
        shortLabel: "Art. 13",
        title: "Article 13 - Transparency and provision of information to deployers",
        keywords: ["Transparency", "Instructions for Use", "Interpretability", "Deployer Info"],
        content: [
            "1. High-risk AI systems shall be designed and developed in such a way as to ensure that their operation is sufficiently transparent to enable deployers to interpret a system’s output and use it appropriately...",
            "2. High-risk AI systems shall be accompanied by instructions for use in an appropriate digital format or otherwise that include concise, complete, correct and clear information...",
            "3. The instructions for use shall contain at least the following information..."
        ]
    },
    {
        type: "article",
        shortLabel: "Art. 14",
        title: "Article 14 - Human oversight",
        keywords: ["Human Oversight", "HMI", "Risk Prevention", "Verify Decisions"],
        content: [
            "1. High-risk AI systems shall be designed and developed in such a way, including with appropriate human-machine interface tools, that they can be effectively overseen by natural persons during the period in which they are in use.",
            "2. Human oversight shall aim to prevent or minimise the risks to health, safety or fundamental rights that may emerge when a high-risk AI system is used in accordance with its intended purpose...",
            "3. The oversight measures shall be commensurate with the risks, level of autonomy and context of use of the high-risk AI system...",
            "4. For the purpose of implementing paragraphs 1, 2 and 3, the high-risk AI system shall be provided to the deployer in such a way that natural persons to whom human oversight is assigned are enabled...",
            "5. For high-risk AI systems referred to in point 1(a) of Annex III, the measures referred to in paragraph 3 of this Article shall be such as to ensure that, in addition, no action or decision is taken by the deployer on the basis of the identification resulting from the system unless that identification has been separately verified..."
        ]
    },
    {
        type: "article",
        shortLabel: "Art. 15",
        title: "Article 15 - Accuracy, robustness and cybersecurity",
        keywords: ["Accuracy", "Robustness", "Cybersecurity", "Resilience", "Error Handling"],
        content: [
            "1. High-risk AI systems shall be designed and developed in such a way that they achieve an appropriate level of accuracy, robustness, and cybersecurity, and that they perform consistently in those respects throughout their lifecycle.",
            "2. To address the technical aspects of how to measure the appropriate levels of accuracy and robustness set out in paragraph 1 and any other relevant performance metrics...",
            "3. The levels of accuracy and the relevant accuracy metrics of high-risk AI systems shall be declared in the accompanying instructions of use.",
            "4. High-risk AI systems shall be as resilient as possible regarding errors, faults or inconsistencies that may occur within the system or the environment in which the system operates...",
            "5. High-risk AI systems shall be resilient against attempts by unauthorised third parties to alter their use, outputs or performance by exploiting system vulnerabilities..."
        ]
    }
];
