import React, { useState, useMemo } from "react";
import logoPF1 from "./logo-pf1.png";

const DATA = {"useCases": [{"code": "S-01", "dom": "ventes", "titre": "Analyse de pipeline et de prévisions", "resout": "Des prévisions construites sur le ressenti des commerciaux plutôt que sur les données, des revues de pipe chronophages et des mauvaises surprises en fin de trimestre.", "resultat": "Prévisions plus fiables, meilleure visibilité sur le pipe, moins de temps administratif pour les managers.", "mat": "Intermédiaire", "tags": ["prevision", "pipeline", "reporting", "management"]}, {"code": "S-06", "dom": "ventes", "titre": "Prédiction du risque de churn", "resout": "Un risque de perte de client détecté trop tard pour réagir, des renouvellements gérés à l'intuition plutôt que sur des signaux objectifs.", "resultat": "Réduction du churn, meilleure rétention du chiffre, plus de renouvellements gagnés.", "mat": "Avancé", "tags": ["churn", "retention", "risque", "base_installee"]}, {"code": "S-13", "dom": "ventes", "titre": "Préparation de rendez-vous", "resout": "Des heures passées à préparer chaque rendez-vous, des commerciaux qui arrivent sans le bon contexte client.", "resultat": "Plus de rendez-vous qualifiés par semaine, meilleure qualité d'échange, temps de préparation réduit.", "mat": "Basique", "tags": ["productivite", "rdv", "preparation"]}, {"code": "S-11", "dom": "ventes", "titre": "Relances personnalisées", "resout": "Des relances génériques, oubliées ou tardives, qui laissent refroidir les opportunités.", "resultat": "Aucune opportunité sans suivi, meilleurs taux de réponse, cycle de vente accéléré.", "mat": "Basique", "tags": ["relance", "suivi", "productivite"]}, {"code": "S-12", "dom": "ventes", "titre": "Mise à jour automatique du CRM", "resout": "Des commerciaux qui passent un temps considérable à saisir dans le CRM, des données incomplètes qui faussent le pilotage.", "resultat": "Plus de temps de vente récupéré, données CRM fiables, meilleure adoption de l'outil.", "mat": "Basique", "tags": ["productivite", "crm", "saisie", "adoption"]}, {"code": "S-25", "dom": "ventes", "titre": "Analyse et réponse aux appels d'offres", "resout": "Des réponses aux appels d'offres qui mobilisent plusieurs jours de travail, avec le risque d'oublier des exigences clés.", "resultat": "Réponses plus rapides, taux de couverture des exigences amélioré, plus d'AO traités.", "mat": "Intermédiaire", "tags": ["appel_offre", "ao", "productivite", "rfp"]}, {"code": "S-26", "dom": "ventes", "titre": "Génération de devis", "resout": "Des devis longs à produire, sources d'erreurs et de retards dans le cycle.", "resultat": "Devis plus rapides, moins d'erreurs, cycle de vente raccourci.", "mat": "Intermédiaire", "tags": ["devis", "quote", "productivite"]}, {"code": "S-02", "dom": "ventes", "titre": "Détection d'opportunités d'extension", "resout": "Du potentiel d'extension caché dans les comptes existants, et des commerciaux qui ne voient pas les opportunités de croissance.", "resultat": "Plus de revenu d'upsell et cross-sell, meilleure pénétration des comptes.", "mat": "Intermédiaire", "tags": ["upsell", "crosssell", "base_installee", "extension"]}, {"code": "S-34", "dom": "ventes", "titre": "Scoring de leads", "resout": "Du temps perdu sur des leads de faible qualité, sans visibilité sur ce qui rend un lead réellement prioritaire.", "resultat": "Effort concentré sur les leads les plus chauds, meilleurs taux de conversion.", "mat": "Intermédiaire", "tags": ["lead", "scoring", "prospection", "conversion"]}, {"code": "S-31", "dom": "ventes", "titre": "Enrichissement des leads", "resout": "Des fiches CRM incomplètes, des heures de recherche manuelle sur les prospects.", "resultat": "Données prospects complètes, meilleurs taux de contact, ciblage plus précis.", "mat": "Basique", "tags": ["lead", "enrichissement", "donnees", "prospection"]}, {"code": "M-06", "dom": "marketing", "titre": "Rédaction de contenu email", "resout": "La création de contenu de campagne qui bloque les calendriers de lancement, un ton incohérent dans l'équipe.", "resultat": "Lancements de campagnes accélérés, cohérence du contenu, plus de volume produit.", "mat": "Basique", "tags": ["email", "contenu", "redaction", "campagne"]}, {"code": "M-01", "dom": "marketing", "titre": "Découverte d'audience", "resout": "Des segments construits manuellement, un besoin de compétences techniques pour cibler, des lancements retardés.", "resultat": "Ciblage plus fin sans dépendre de l'IT, campagnes plus pertinentes, délais réduits.", "mat": "Basique", "tags": ["segmentation", "audience", "ciblage"]}, {"code": "M-18", "dom": "marketing", "titre": "Optimisation des objets d'email", "resout": "Des taux d'ouverture faibles, des objets d'email qui tombent dans les spams.", "resultat": "Meilleurs taux d'ouverture, délivrabilité protégée, première impression optimisée.", "mat": "Basique", "tags": ["email", "ouverture", "delivrabilite", "optimisation"]}, {"code": "M-19", "dom": "marketing", "titre": "Diagnostic de délivrabilité", "resout": "Des campagnes à fort volume qui n'arrivent pas en boîte de réception, des codes de rejet incompréhensibles.", "resultat": "Réputation d'expéditeur protégée, meilleur placement en boîte, moins de temps de diagnostic.", "mat": "Intermédiaire", "tags": ["email", "delivrabilite", "technique"]}, {"code": "M-25", "dom": "marketing", "titre": "Explication des moteurs de conversion", "resout": "L'impossibilité de savoir quels canaux génèrent vraiment des conversions, des rapports Excel manuels.", "resultat": "Budget alloué aux canaux les plus performants, décisions basées sur la donnée, analyse instantanée.", "mat": "Intermédiaire", "tags": ["conversion", "analyse", "roi", "reporting"]}, {"code": "M-29", "dom": "marketing", "titre": "Scoring de leads marketing", "resout": "Des leads transmis aux ventes sans qualification, un gaspillage de l'investissement marketing.", "resultat": "Leads mieux qualifiés transmis aux ventes, meilleur ROI marketing.", "mat": "Intermédiaire", "tags": ["lead", "scoring", "conversion", "qualification"]}, {"code": "M-36", "dom": "marketing", "titre": "Détection des leads non traités", "resout": "Des leads jamais rappelés, des dépassements de SLA invisibles et de l'investissement marketing gaspillé.", "resultat": "Pipeline récupéré sur les leads non traités, SLA de suivi respectés, ROI marketing tracé.", "mat": "Intermédiaire", "tags": ["lead", "sla", "suivi", "conversion"]}, {"code": "M-24", "dom": "marketing", "titre": "Gestion d'événements", "resout": "L'organisation et le suivi d'événements marketing dispersés, une exécution chronophage.", "resultat": "Événements mieux orchestrés, suivi des participants automatisé, moins de charge opérationnelle.", "mat": "Intermédiaire", "tags": ["evenement", "campagne", "organisation"]}, {"code": "M-13", "dom": "marketing", "titre": "Nommage et organisation des campagnes", "resout": "Des conventions de nommage incohérentes et des données erronées qui faussent le reporting.", "resultat": "Données propres pour l'analyse, efficacité opérationnelle, lancements plus rapides.", "mat": "Basique", "tags": ["campagne", "organisation", "donnees", "reporting"]}, {"code": "SV-08", "dom": "service", "titre": "Classification et détection d'intention", "resout": "Des spécialistes qui passent du temps à lire et comprendre des demandes confuses avant de pouvoir agir.", "resultat": "Temps de traitement réduit, résolution plus rapide, agents moins fatigués.", "mat": "Basique", "tags": ["ticket", "classification", "productivite", "comprehension"]}, {"code": "SV-21", "dom": "service", "titre": "Rédaction et résumé de réponses", "resout": "Des réponses longues à rédiger, des historiques de cas interminables à parcourir.", "resultat": "Réponses plus rapides et professionnelles, temps de traitement moyen réduit.", "mat": "Basique", "tags": ["reponse", "redaction", "productivite", "resume"]}, {"code": "SV-23", "dom": "service", "titre": "Recommandation de parcours de résolution", "resout": "Des agents, surtout juniors, qui ne savent pas quelle est la bonne procédure pour les cas complexes.", "resultat": "Résolution au premier contact améliorée, qualité de service homogène, formation accélérée.", "mat": "Intermédiaire", "tags": ["resolution", "procedure", "fcr", "formation"]}, {"code": "SV-20", "dom": "service", "titre": "Recommandation d'articles de connaissance", "resout": "Du temps perdu à chercher dans une documentation éparpillée, des réponses incohérentes aux clients.", "resultat": "Résolution au premier contact en hausse, temps de formation réduit, service cohérent.", "mat": "Intermédiaire", "tags": ["connaissance", "kb", "resolution", "fcr"]}, {"code": "SV-13", "dom": "service", "titre": "Routage des cas", "resout": "Des demandes mal orientées, des délais avant qu'un cas atteigne le bon expert.", "resultat": "Cas routés au bon interlocuteur, délais réduits, meilleur respect des SLA.", "mat": "Intermédiaire", "tags": ["routage", "ticket", "sla", "orchestration"]}, {"code": "SV-26", "dom": "service", "titre": "Déflexion vers le self-service", "resout": "Des demandes simples et répétitives qui saturent le support, des clients qui attendent.", "resultat": "Volume de tickets réduit, clients autonomes sur les cas simples, support concentré sur la valeur.", "mat": "Avancé", "tags": ["selfservice", "deflexion", "chatbot", "volume"]}, {"code": "SV-29", "dom": "service", "titre": "Résolution autonome de cas", "resout": "Un volume élevé de demandes standards qui mobilisent les équipes sur des tâches répétitives.", "resultat": "Une large part des demandes résolues automatiquement, équipes recentrées sur les cas complexes.", "mat": "Avancé", "tags": ["autonome", "resolution", "volume", "agent"]}, {"code": "SV-33", "dom": "service", "titre": "Prédiction et prévention des ruptures de SLA", "resout": "Des dépassements de SLA constatés trop tard, une gestion réactive plutôt que préventive.", "resultat": "Risque de rupture de SLA anticipé, conformité améliorée, satisfaction client préservée.", "mat": "Avancé", "tags": ["sla", "prediction", "risque", "prevention"]}, {"code": "SV-09", "dom": "service", "titre": "Scoring de sentiment et d'urgence", "resout": "Des clients frustrés non détectés, des cas urgents traités en retard.", "resultat": "Réponse priorisée et empathique, escalades pertinentes, satisfaction améliorée.", "mat": "Intermédiaire", "tags": ["sentiment", "urgence", "priorisation", "ticket"]}, {"code": "SV-35", "dom": "service", "titre": "Analyse de satisfaction et NPS", "resout": "Une vision floue de la satisfaction client, des retours non exploités.", "resultat": "Pilotage de la satisfaction par la donnée, identification des irritants, NPS amélioré.", "mat": "Intermédiaire", "tags": ["nps", "satisfaction", "analyse", "reporting"]}, {"code": "OP-01", "dom": "operations", "titre": "Automatisation des workflows de validation", "resout": "Des demandes internes (validations, approbations, signatures) qui circulent par email et se perdent, avec des délais et aucune traçabilité.", "resultat": "Circuits de validation fluides et tracés, délais réduits, fin des relances manuelles.", "mat": "Basique", "tags": ["validation", "workflow", "tracabilite", "productivite"]}, {"code": "OP-02", "dom": "operations", "titre": "Saisie et extraction de données documentaires", "resout": "Des informations clés enfermées dans des documents (contrats, formulaires, PDF) qu'il faut ressaisir à la main, source d'erreurs et de temps perdu.", "resultat": "Données extraites automatiquement, ressaisie supprimée, fiabilité accrue.", "mat": "Intermédiaire", "tags": ["document", "extraction", "saisie", "donnees"]}, {"code": "OP-03", "dom": "operations", "titre": "Assistant de recherche dans la base documentaire", "resout": "Des collaborateurs qui perdent du temps à chercher la bonne procédure, le bon document ou la bonne information dans des espaces dispersés.", "resultat": "Réponses immédiates appuyées sur vos documents, autonomie des équipes, temps de recherche réduit.", "mat": "Intermédiaire", "tags": ["recherche", "connaissance", "document", "productivite"]}, {"code": "OP-04", "dom": "operations", "titre": "Suivi d'activité et tableaux de bord en langage naturel", "resout": "Un pilotage qui dépend de rapports Excel manuels, sans vision en temps réel de l'avancement des opérations.", "resultat": "Tableaux de bord générés à la demande, visibilité temps réel, décisions plus rapides.", "mat": "Basique", "tags": ["reporting", "pilotage", "tableau_bord", "analyse"]}, {"code": "OP-05", "dom": "operations", "titre": "Détection d'anomalies dans les processus", "resout": "Des blocages ou des écarts dans les processus repérés trop tard, après que le problème a produit ses effets.", "resultat": "Anomalies détectées au plus tôt, interventions préventives, processus plus fiables.", "mat": "Avancé", "tags": ["anomalie", "detection", "prevention", "qualite"]}, {"code": "OP-06", "dom": "operations", "titre": "Orchestration de processus multi-étapes", "resout": "Des processus métier complexes gérés à la main, avec des tâches qui passent d'un service à l'autre sans coordination.", "resultat": "Processus orchestrés de bout en bout, coordination automatisée, moins de ruptures.", "mat": "Avancé", "tags": ["orchestration", "workflow", "processus", "coordination"]}, {"code": "OP-07", "dom": "operations", "titre": "Génération assistée de documents", "resout": "Des documents répétitifs (comptes rendus, courriers, fiches) rédigés manuellement à chaque fois.", "resultat": "Documents générés à partir des données, temps de rédaction réduit, format homogène.", "mat": "Basique", "tags": ["document", "generation", "redaction", "productivite"]}, {"code": "OP-08", "dom": "operations", "titre": "Suivi de conformité et contrôles", "resout": "Des contrôles de conformité réalisés manuellement et de façon irrégulière, avec un risque d'écart non détecté.", "resultat": "Contrôles systématisés, écarts signalés automatiquement, conformité tracée et auditable.", "mat": "Avancé", "tags": ["conformite", "controle", "audit", "tracabilite"]}, {"code": "FI-01", "dom": "finance", "titre": "Automatisation de la facturation", "resout": "Une facturation qui mobilise du temps, avec des erreurs de saisie et des retards d'émission qui pèsent sur la trésorerie.", "resultat": "Factures émises plus vite et sans erreur, trésorerie améliorée, charge administrative réduite.", "mat": "Intermédiaire", "tags": ["facturation", "tresorerie", "automatisation", "saisie"]}, {"code": "FI-02", "dom": "finance", "titre": "Relances de paiement intelligentes", "resout": "Des relances clients tardives, génériques ou oubliées, qui allongent les délais de paiement.", "resultat": "Relances déclenchées au bon moment et personnalisées, délais de paiement réduits, encours maîtrisé.", "mat": "Basique", "tags": ["relance", "recouvrement", "tresorerie", "paiement"]}, {"code": "FI-03", "dom": "finance", "titre": "Rapprochement et contrôle des écritures", "resout": "Des rapprochements (commandes, factures, paiements) faits manuellement, longs et sources d'écarts.", "resultat": "Rapprochements automatisés, écarts identifiés instantanément, clôtures accélérées.", "mat": "Intermédiaire", "tags": ["rapprochement", "controle", "comptabilite", "ecart"]}, {"code": "FI-04", "dom": "finance", "titre": "Reporting financier en langage naturel", "resout": "Des indicateurs financiers produits via des extractions et des tableurs, sans vision consolidée à jour.", "resultat": "Reporting à la demande, vision consolidée temps réel, pilotage facilité.", "mat": "Basique", "tags": ["reporting", "pilotage", "analyse", "tableau_bord"]}, {"code": "FI-05", "dom": "finance", "titre": "Prévision de trésorerie", "resout": "Une visibilité limitée sur les encaissements et décaissements à venir, qui rend le pilotage de trésorerie réactif.", "resultat": "Trésorerie anticipée, décisions de financement éclairées, meilleure maîtrise du cash.", "mat": "Avancé", "tags": ["tresorerie", "prevision", "cash", "pilotage"]}, {"code": "FI-06", "dom": "finance", "titre": "Traitement automatisé des notes de frais", "resout": "Des notes de frais saisies et contrôlées à la main, chronophages et sujettes aux erreurs.", "resultat": "Traitement accéléré, contrôles automatiques, conformité aux règles internes.", "mat": "Basique", "tags": ["notes_frais", "controle", "automatisation", "conformite"]}, {"code": "FI-07", "dom": "finance", "titre": "Détection des risques et fraudes", "resout": "Des opérations atypiques ou à risque noyées dans le volume, repérées trop tard ou pas du tout.", "resultat": "Opérations à risque signalées tôt, pertes évitées, conformité renforcée.", "mat": "Avancé", "tags": ["risque", "fraude", "detection", "conformite"]}, {"code": "SC-01", "dom": "supply", "titre": "Prévision de la demande", "resout": "Des prévisions de volume construites sur l'historique et le ressenti, qui mènent à des ruptures ou à du surstock.", "resultat": "Demande mieux anticipée, ruptures et surstocks réduits, niveaux de stock optimisés.", "mat": "Avancé", "tags": ["prevision", "demande", "stock", "planification"]}, {"code": "SC-02", "dom": "supply", "titre": "Optimisation des niveaux de stock", "resout": "Des stocks pilotés au cas par cas, avec de l'immobilisation inutile d'un côté et des ruptures de l'autre.", "resultat": "Stocks ajustés au besoin réel, immobilisation réduite, disponibilité améliorée.", "mat": "Intermédiaire", "tags": ["stock", "optimisation", "approvisionnement", "cout"]}, {"code": "SC-03", "dom": "supply", "titre": "Suivi et traçabilité des flux", "resout": "Une visibilité fragmentée sur l'état des commandes et des marchandises, avec des informations dispersées entre systèmes.", "resultat": "Traçabilité de bout en bout, statut consultable en temps réel, moins de litiges.", "mat": "Intermédiaire", "tags": ["tracabilite", "suivi", "flux", "visibilite"]}, {"code": "SC-04", "dom": "supply", "titre": "Automatisation des approvisionnements", "resout": "Des réapprovisionnements déclenchés manuellement, avec des délais et des erreurs de quantité.", "resultat": "Réappro déclenché automatiquement au bon seuil, ruptures évitées, charge réduite.", "mat": "Intermédiaire", "tags": ["approvisionnement", "automatisation", "stock", "reappro"]}, {"code": "SC-05", "dom": "supply", "titre": "Optimisation des tournées et de la distribution", "resout": "Des plans de transport et de distribution construits à la main, peu optimisés sur les coûts et les délais.", "resultat": "Tournées optimisées, coûts de transport réduits, délais de livraison tenus.", "mat": "Avancé", "tags": ["transport", "tournee", "distribution", "optimisation"]}, {"code": "SC-06", "dom": "supply", "titre": "Gestion proactive des incidents logistiques", "resout": "Des aléas (retard, rupture, avarie) traités en réactif, une fois que le client est déjà impacté.", "resultat": "Incidents anticipés et traités tôt, impact client réduit, fiabilité de service améliorée.", "mat": "Avancé", "tags": ["incident", "prevention", "service", "fiabilite"]}, {"code": "SC-07", "dom": "supply", "titre": "Suivi des indicateurs et de la performance logistique", "resout": "Un pilotage de la performance logistique fondé sur des rapports manuels, sans vision consolidée à jour.", "resultat": "Indicateurs en temps réel, écarts visibles immédiatement, pilotage par la donnée.", "mat": "Basique", "tags": ["reporting", "performance", "pilotage", "kpi"]}], "pains": {"ventes": [{"id": "prevision", "label": "Mes prévisions de vente sont peu fiables"}, {"id": "productivite", "label": "Mes commerciaux perdent du temps en tâches administratives"}, {"id": "lead", "label": "On traite mal nos leads (qualification, suivi, relances)"}, {"id": "base_installee", "label": "On exploite mal le potentiel de nos clients existants"}, {"id": "ao", "label": "Répondre aux appels d'offres et faire des devis prend trop de temps"}, {"id": "churn", "label": "On perd des clients sans l'avoir vu venir"}], "marketing": [{"id": "contenu", "label": "Produire du contenu de campagne est trop lent"}, {"id": "ciblage", "label": "Cibler les bonnes audiences est compliqué ou dépend de l'IT"}, {"id": "delivrabilite", "label": "Mes emails ont de faibles taux d'ouverture ou finissent en spam"}, {"id": "roi", "label": "Je ne sais pas quels canaux génèrent vraiment des conversions"}, {"id": "qualification", "label": "Les leads transmis aux ventes sont mal qualifiés"}, {"id": "organisation", "label": "Mes campagnes et données marketing sont mal organisées"}], "service": [{"id": "productivite", "label": "Mes agents passent trop de temps à comprendre et rédiger"}, {"id": "fcr", "label": "On résout mal les cas au premier contact"}, {"id": "volume", "label": "Le support est saturé par des demandes simples et répétitives"}, {"id": "sla", "label": "On dépasse nos SLA ou on les pilote en réactif"}, {"id": "routage", "label": "Les demandes sont mal orientées ou traitées en retard"}, {"id": "satisfaction", "label": "Je manque de visibilité sur la satisfaction client"}], "operations": [{"id": "validation", "label": "Nos circuits de validation internes sont lents et difficiles à suivre"}, {"id": "document", "label": "On ressaisit trop d'informations issues de documents (PDF, formulaires)"}, {"id": "recherche", "label": "Les équipes perdent du temps à chercher la bonne info ou procédure"}, {"id": "reporting", "label": "On manque de visibilité temps réel sur l'avancement des opérations"}, {"id": "workflow", "label": "Trop de tâches répétitives passent d'un service à l'autre sans coordination"}, {"id": "conformite", "label": "Nos contrôles de conformité sont manuels et irréguliers"}], "finance": [{"id": "facturation", "label": "Notre facturation prend du temps et génère des erreurs"}, {"id": "recouvrement", "label": "Nos délais de paiement clients sont trop longs"}, {"id": "rapprochement", "label": "Les rapprochements et contrôles comptables sont longs et manuels"}, {"id": "reporting", "label": "Produire nos indicateurs financiers demande trop d'extractions manuelles"}, {"id": "tresorerie", "label": "On manque de visibilité sur notre trésorerie à venir"}, {"id": "notes_frais", "label": "Le traitement des notes de frais est chronophage"}], "supply": [{"id": "prevision", "label": "Nos prévisions de demande génèrent des ruptures ou du surstock"}, {"id": "stock", "label": "Nos niveaux de stock sont mal ajustés au besoin réel"}, {"id": "tracabilite", "label": "On manque de visibilité temps réel sur l'état des commandes et flux"}, {"id": "approvisionnement", "label": "Nos réapprovisionnements sont manuels et sujets aux erreurs"}, {"id": "transport", "label": "Nos plans de transport et de distribution sont peu optimisés"}, {"id": "incident", "label": "On gère les incidents logistiques en réactif, une fois le client impacté"}]}};

const DOMAIN_GROUPS = [
  {
    group: "Relation client (CRM)",
    items: [
      { id: "ventes", label: "Ventes", desc: "Pipeline, prévisions, prospection, devis" },
      { id: "marketing", label: "Marketing", desc: "Campagnes, contenu, ciblage, conversion" },
      { id: "service", label: "Service client", desc: "Tickets, résolution, SLA, satisfaction" },
    ],
  },
  {
    group: "Processus métier (au-delà du CRM)",
    items: [
      { id: "operations", label: "Opérations & processus", desc: "Workflows, validations, documents, pilotage" },
      { id: "finance", label: "Finance & administratif", desc: "Facturation, relances, reporting, trésorerie" },
      { id: "supply", label: "Supply chain & logistique", desc: "Stocks, flux, approvisionnement, transport" },
    ],
  },
];
const DOMAINS = DOMAIN_GROUPS.flatMap((g) => g.items);

const EFFORT = {
  "Basique": { c: "#1f9d55", label: "Activable rapidement" },
  "Intermédiaire": { c: "#d97706", label: "Effort modéré" },
  "Avancé": { c: "#dc2626", label: "Projet structurant" },
};

// --- Volet maturité IA ---
const MATURITY_QUESTIONS = [
  {
    id: "scope",
    q: "Combien d'équipes ou de services utilisent l'IA dans leur travail au quotidien ?",
    help: "Par exemple : commerciaux, marketing, service client, mais aussi opérations, finance, RH.",
    opts: [
      { id: "0", label: "Aucun pour l'instant", score: 0 },
      { id: "1", label: "Une seule équipe", score: 1 },
      { id: "2", label: "Plusieurs équipes", score: 2 },
      { id: "many", label: "La majorité de l'organisation", score: 3 },
    ],
  },
  {
    id: "gov",
    q: "Avez-vous un cadre pour piloter et superviser l'IA (qui valide, qui contrôle) ?",
    opts: [
      { id: "no", label: "Non, rien de formalisé", score: 0 },
      { id: "informal", label: "Des règles informelles", score: 1 },
      { id: "defined", label: "Un cadre défini et appliqué", score: 2 },
      { id: "monitored", label: "Un cadre supervisé et mesuré", score: 3 },
    ],
  },
  {
    id: "usage",
    q: "Utilisez-vous déjà des fonctions d'IA dans votre plateforme aujourd'hui ?",
    opts: [
      { id: "none", label: "Pas encore, ou je ne sais pas", score: 0 },
      { id: "few", label: "Quelques fonctions, ponctuellement", score: 1 },
      { id: "regular", label: "Régulièrement, sur plusieurs cas", score: 2 },
      { id: "core", label: "L'IA est intégrée à nos processus clés", score: 3 },
    ],
  },
];

const MATURITY_LEVELS = [
  {
    min: 0, max: 2, key: "decouverte", label: "Découverte",
    desc: "L'IA est encore peu présente dans vos processus. La bonne nouvelle : votre plateforme Creatio embarque déjà des capacités d'IA prêtes à activer, sans projet lourd. L'enjeu est d'identifier un premier cas à fort impact et faible effort pour démarrer.",
    gov: "En plus de gérer votre relation client et vos processus métier, Creatio vous permet maintenant d'encadrer votre IA. Pas besoin d'un outil séparé : dès vos premiers usages, vous savez qui valide, qui contrôle et quelles données sont exposées.",
  },
  {
    min: 3, max: 4, key: "experimentation", label: "Expérimentation",
    desc: "Vous avez commencé à utiliser l'IA sur quelques cas. L'enjeu est maintenant de transformer ces essais en usages réguliers et de poser les premières règles de pilotage, pour passer de l'essai isolé à la pratique installée.",
    gov: "Creatio porte déjà votre relation client et vos processus métier. La plateforme vous permet en plus de superviser vos agents IA : qui valide, qui contrôle, avec une traçabilité complète. Vous structurez vos usages sans empiler un outil de plus.",
  },
  {
    min: 5, max: 6, key: "deploiement", label: "Déploiement",
    desc: "L'IA est en place sur plusieurs domaines avec un début de cadrage. L'enjeu est d'élargir à de nouveaux processus, au-delà de la relation client, et de renforcer le pilotage pour déployer en confiance.",
    gov: "Au-delà de vos processus métier déjà gérés dans Creatio, la plateforme centralise la maîtrise de votre IA : agents, données exposées, droits d'accès et historique des actions, pilotés au même endroit plutôt que dispersés dans des outils tiers.",
  },
  {
    min: 7, max: 9, key: "industrialisation", label: "Industrialisation",
    desc: "L'IA est intégrée à vos processus clés avec un cadre de supervision. L'enjeu est l'optimisation continue : mesurer les gains, étendre l'autonomie là où c'est pertinent, et faire de l'IA un avantage durable.",
    gov: "Vos processus métier tournent sur Creatio, qui vous permet en plus de tout piloter au même endroit : superviser vos agents IA, suivre leur consommation, vérifier la conformité et mesurer les gains. C'est ce qu'on appelle la gouvernance de l'IA, intégrée à votre plateforme.",
  },
];

function levelFor(score) {
  return MATURITY_LEVELS.find((l) => score >= l.min && score <= l.max) || MATURITY_LEVELS[0];
}

export default function App() {
  const [step, setStep] = useState(0); // 0 intro, 1 maturity, 2 domain, 3 pains, 4 results
  const [matAnswers, setMatAnswers] = useState({});
  const [domain, setDomain] = useState(null);
  const [pains, setPains] = useState([]);

  const painOptions = domain ? DATA.pains[domain] : [];

  const matScore = useMemo(
    () => Object.values(matAnswers).reduce((a, b) => a + b, 0),
    [matAnswers]
  );
  const matLevel = levelFor(matScore);
  const matComplete = Object.keys(matAnswers).length === MATURITY_QUESTIONS.length;

  const matches = useMemo(() => {
    if (!domain || pains.length === 0) return [];
    return DATA.useCases
      .filter((u) => u.dom === domain)
      .map((u) => ({ ...u, score: u.tags.filter((t) => pains.includes(t)).length }))
      .filter((u) => u.score > 0)
      .sort((a, b) => b.score - a.score || (a.mat === "Basique" ? -1 : 1))
      .slice(0, 5);
  }, [domain, pains]);

  const togglePain = (id) =>
    setPains((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const setMat = (qid, score) => setMatAnswers((m) => ({ ...m, [qid]: score }));

  const reset = () => {
    setStep(0); setMatAnswers({}); setDomain(null); setPains([]);
  };

  return (
    <div style={S.root}>
      <style>{CSS}</style>
      <div style={S.frame}>
        <Header step={step} />
        {step === 0 && <Intro onStart={() => setStep(1)} />}
        {step === 1 && (
          <MaturityStep
            answers={matAnswers}
            setMat={setMat}
            complete={matComplete}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <DomainStep
            value={domain}
            onPick={(dm) => { setDomain(dm); setPains([]); setStep(3); }}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <PainStep
            options={painOptions}
            selected={pains}
            toggle={togglePain}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <Results
            matches={matches}
            domain={DOMAINS.find((dm) => dm.id === domain)}
            level={matLevel}
            score={matScore}
            painLabels={painOptions.filter((o) => pains.includes(o.id)).map((o) => o.label)}
            onReset={reset}
          />
        )}
      </div>
      <p style={S.foot}>Prototype — diagnostic indicatif de maturité IA et cas d'usage, basé sur la plateforme Creatio</p>
    </div>
  );
}

function Header({ step }) {
  const labels = ["Maturité", "Domaine", "Irritants", "Résultats"];
  return (
    <div style={S.header}>
      <div style={S.brand}>
        <img src={logoPF1} alt="ProcessFirst logo" style={S.brandLogo} />
      </div>
      <div style={S.steps}>
        {labels.map((l, i) => {
          const active = step >= i + 1;
          return (
            <span key={l} style={{ ...S.stepDot, ...(active ? S.stepDotOn : {}) }}>
              {l}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Intro({ onStart }) {
  return (
    <div style={S.panel} className="fade">
      <p style={S.eyebrow}>Diagnostic IA · 2 minutes</p>
      <h1 style={S.h1}>
        Où en êtes-vous dans votre<br />
        <span style={S.h1accent}>trajectoire IA ?</span>
      </h1>
      <p style={S.lead}>
        L'IA est déjà présente dans votre plateforme Creatio. Ce diagnostic situe
        votre niveau de maturité, puis identifie les cas d'usage les plus
        pertinents pour vos enjeux, avec le problème qu'ils résolvent et le
        résultat attendu. Votre résultat s'affiche immédiatement.
      </p>
      <button style={S.cta} className="cta" onClick={onStart}>
        Lancer le diagnostic
        <span style={S.ctaArrow}>→</span>
      </button>
      <div style={S.trustRow}>
        <span>Niveau de maturité IA</span>
        <span style={S.dot}>·</span>
        <span>Cas d'usage personnalisés</span>
        <span style={S.dot}>·</span>
        <span>Résultat immédiat</span>
      </div>
    </div>
  );
}

function MaturityStep({ answers, setMat, complete, onBack, onNext }) {
  return (
    <div style={S.panel} className="fade">
      <p style={S.eyebrow}>Étape 1 · Votre maturité IA</p>
      <h2 style={S.h2}>Où en est votre organisation sur l'IA ?</h2>
      <p style={S.sub}>Trois questions pour situer votre niveau. Une réponse par question.</p>
      <div style={S.matList}>
        {MATURITY_QUESTIONS.map((mq) => (
          <div key={mq.id} style={S.matBlock}>
            <p style={S.matQ}>{mq.q}</p>
            {mq.help && <p style={S.matHelp}>{mq.help}</p>}
            <div style={S.matOpts}>
              {mq.opts.map((o) => {
                const on = answers[mq.id] === o.score;
                return (
                  <button
                    key={o.id}
                    className="matopt"
                    style={{ ...S.matOpt, ...(on ? S.matOptOn : {}) }}
                    onClick={() => setMat(mq.id, o.score)}
                  >
                    <span style={{ ...S.radio, ...(on ? S.radioOn : {}) }} />
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={S.navRow}>
        <button style={S.ghost} className="ghost" onClick={onBack}>← Retour</button>
        <button
          style={{ ...S.cta, ...(!complete ? S.ctaDisabled : {}) }}
          className="cta"
          disabled={!complete}
          onClick={onNext}
        >
          Continuer <span style={S.ctaArrow}>→</span>
        </button>
      </div>
    </div>
  );
}

function DomainStep({ value, onPick, onBack }) {
  return (
    <div style={S.panel} className="fade">
      <p style={S.eyebrow}>Étape 2 · Votre priorité</p>
      <h2 style={S.h2}>Sur quel domaine cherchez-vous à progresser ?</h2>
      <p style={S.sub}>
        L'IA Creatio ne se limite pas au CRM : elle adresse aussi vos processus
        métier internes.
      </p>
      {DOMAIN_GROUPS.map((grp) => (
        <div key={grp.group} style={S.domGroup}>
          <p style={S.domGroupLbl}>{grp.group}</p>
          <div style={S.cards}>
            {grp.items.map((dm) => (
              <button
                key={dm.id}
                className="domcard"
                style={{ ...S.domCard, ...(value === dm.id ? S.domCardOn : {}) }}
                onClick={() => onPick(dm.id)}
              >
                <span style={S.domLabel}>{dm.label}</span>
                <span style={S.domDesc}>{dm.desc}</span>
                <span style={S.domGo}>Choisir →</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={S.navRow}>
        <button style={S.ghost} className="ghost" onClick={onBack}>← Retour</button>
        <span />
      </div>
    </div>
  );
}

function PainStep({ options, selected, toggle, onBack, onNext }) {
  return (
    <div style={S.panel} className="fade">
      <p style={S.eyebrow}>Étape 3 · Vos irritants</p>
      <h2 style={S.h2}>Quels irritants vous parlent le plus ?</h2>
      <p style={S.sub}>Sélectionnez ceux qui résonnent. Plusieurs choix possibles.</p>
      <div style={S.painList}>
        {options.map((o) => {
          const on = selected.includes(o.id);
          return (
            <button
              key={o.id}
              className="pain"
              style={{ ...S.painItem, ...(on ? S.painItemOn : {}) }}
              onClick={() => toggle(o.id)}
            >
              <span style={{ ...S.check, ...(on ? S.checkOn : {}) }}>{on ? "✓" : ""}</span>
              {o.label}
            </button>
          );
        })}
      </div>
      <div style={S.navRow}>
        <button style={S.ghost} className="ghost" onClick={onBack}>← Retour</button>
        <button
          style={{ ...S.cta, ...(selected.length === 0 ? S.ctaDisabled : {}) }}
          className="cta"
          disabled={selected.length === 0}
          onClick={onNext}
        >
          Voir mes résultats <span style={S.ctaArrow}>→</span>
        </button>
      </div>
    </div>
  );
}

const WEBHOOK_URL = "https://hook.eu1.make.com/ygsltsooey8etk5qnvcn3hnawdooghb1";

function Results({ matches, domain, level, score, painLabels, onReset }) {
  const pct = Math.round((score / 9) * 100);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | sending | done | error

  const submit = async () => {
    if (!email.includes("@") || status === "sending") return;
    setStatus("sending");
    const payload = {
      email,
      niveau_maturite: level.label,
      score_maturite: score,
      domaine: domain.label,
      irritants: painLabels.join(", "),
      cas_usage_suggeres: matches.map((m) => m.titre).join(", "),
      date_soumission: new Date().toISOString(),
    };
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("done");
    } catch (e) {
      // Le webhook peut renvoyer une erreur CORS côté navigateur tout en ayant
      // bien reçu les données. On considère l'envoi comme abouti côté visiteur.
      setStatus("done");
    }
  };

  return (
    <div style={S.panel} className="fade">
      <p style={S.eyebrow}>Votre diagnostic</p>

      {/* Bloc maturité */}
      <div style={S.matResult}>
        <div style={S.matResTop}>
          <div>
            <p style={S.matResLbl}>Niveau de maturité IA</p>
            <h2 style={S.matResLevel}>{level.label}</h2>
          </div>
          <Gauge pct={pct} stage={level.key} />
        </div>
        <p style={S.matResDesc}>{level.desc}</p>
        <Ladder current={level.key} />
      </div>

      {/* Encart gouvernance — promesse Creatio 10X */}
      <div style={S.govCallout}>
        <span style={S.govIcon} aria-hidden="true">◆</span>
        <div>
          <p style={S.govLbl}>Gardez le contrôle de votre IA</p>
          <p style={S.govText}>{level.gov}</p>
        </div>
      </div>

      {/* Bloc cas d'usage */}
      <h3 style={S.resSection}>
        {matches.length} cas d'usage prioritaires · {domain.label}
      </h3>
      <p style={S.sub}>
        Classés par pertinence selon vos irritants. La pastille indique l'effort
        de mise en œuvre.
      </p>
      <div style={S.resultList}>
        {matches.map((u, i) => {
          const e = EFFORT[u.mat];
          return (
            <div key={u.code} style={S.resCard} className="rescard">
              <div style={S.resNum}>{String(i + 1).padStart(2, "0")}</div>
              <div style={S.resBody}>
                <div style={S.resHead}>
                  <h4 style={S.resTitle}>{u.titre}</h4>
                  <span style={{ ...S.badge, color: e.c, borderColor: e.c }}>{e.label}</span>
                </div>
                <p style={S.resProb}>
                  <strong style={S.resLbl}>Ce que ça résout — </strong>{u.resout}
                </p>
                <p style={S.resOut}>
                  <strong style={S.resLbl}>Résultat attendu — </strong>{u.resultat}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Capture — envoi vers Make */}
      <div style={S.capture}>
        {status !== "done" ? (
          <>
            <h3 style={S.capTitle}>Aller plus loin</h3>
            <p style={S.capText}>
              Réservons 30 minutes pour échanger sur vos résultats et identifier
              comment activer ces cas d'usage dans votre contexte.
            </p>
            <div style={S.capRow}>
              <input
                style={S.input}
                type="email"
                placeholder="votre.email@entreprise.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
              />
              <button
                style={{ ...S.cta, ...(status === "sending" ? S.ctaDisabled : {}) }}
                className="cta"
                onClick={submit}
                disabled={status === "sending"}
              >
                {status === "sending" ? "Envoi…" : "Réserver 30 minutes"}
              </button>
            </div>
            <p style={S.consent}>
              Vos données sont utilisées uniquement pour organiser cet échange,
              conformément à notre politique de confidentialité.
            </p>
          </>
        ) : (
          <div style={S.thanks}>
            <span style={S.thanksMark}>✓</span>
            <div>
              <h3 style={S.capTitle}>Demande enregistrée</h3>
              <p style={S.capText}>Merci, nous revenons vers vous rapidement pour fixer un créneau.</p>
            </div>
          </div>
        )}
      </div>

      <button style={S.restart} className="ghost" onClick={onReset}>
        ↺ Recommencer le diagnostic
      </button>
    </div>
  );
}

function Gauge({ pct, stage }) {
  const r = 30, c = 2 * Math.PI * r, off = c - (pct / 100) * c;
  const col = stage === "decouverte" ? "#d97706" : stage === "industrialisation" ? "#1f9d55" : "#ff4d1c";
  return (
    <svg width="78" height="78" viewBox="0 0 78 78" style={{ flexShrink: 0 }}>
      <circle cx="39" cy="39" r={r} fill="none" stroke="#22345a" strokeWidth="7" />
      <circle cx="39" cy="39" r={r} fill="none" stroke={col} strokeWidth="7"
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 39 39)" />
      <text x="39" y="44" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff">{pct}%</text>
    </svg>
  );
}

function Ladder({ current }) {
  const steps = MATURITY_LEVELS;
  const idx = steps.findIndex((s) => s.key === current);
  return (
    <div style={S.ladder}>
      {steps.map((s, i) => {
        const done = i <= idx;
        const isCur = i === idx;
        return (
          <div key={s.key} style={S.ladderItem}>
            <div style={{ ...S.ladderDot, ...(done ? S.ladderDotOn : {}), ...(isCur ? S.ladderDotCur : {}) }} />
            <span style={{ ...S.ladderLbl, ...(isCur ? S.ladderLblCur : {}) }}>{s.label}</span>
            {i < steps.length - 1 && <span style={{ ...S.ladderLine, ...(i < idx ? S.ladderLineOn : {}) }} />}
          </div>
        );
      })}
    </div>
  );
}

const NAVY = "#0f1f3d";
const VERM = "#ff4d1c";
const PAPER = "#ffffff";
const INK = "#1a2335";
const MUTE = "#5d6577";
const LINE = "#e7e9ef";
const WASH = "#f6f7f9";

const S = {
  root: { fontFamily: "'Inter', system-ui, sans-serif", color: INK, maxWidth: 760, margin: "0 auto", padding: "8px 4px 0" },
  frame: { background: PAPER, border: "1px solid " + LINE, borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 50px -28px rgba(15,31,61,0.28)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid " + LINE, background: WASH, flexWrap: "wrap", gap: 10 },
  brand: { display: "flex", alignItems: "center" },
  brandLogo: { height: 100, width: "auto", display: "block" },
  steps: { display: "flex", gap: 6, flexWrap: "wrap" },
  stepDot: { fontSize: 11, color: MUTE, padding: "4px 10px", borderRadius: 20, border: "1px solid " + LINE, fontWeight: 500 },
  stepDotOn: { color: PAPER, background: NAVY, borderColor: NAVY },
  panel: { padding: "36px 36px 40px" },
  eyebrow: { textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 11, fontWeight: 700, color: VERM, margin: "0 0 14px" },
  h1: { fontSize: 34, lineHeight: 1.12, fontWeight: 800, letterSpacing: "-0.03em", color: NAVY, margin: "0 0 18px" },
  h1accent: { color: VERM },
  h2: { fontSize: 25, lineHeight: 1.2, fontWeight: 800, letterSpacing: "-0.02em", color: NAVY, margin: "0 0 8px" },
  lead: { fontSize: 16, lineHeight: 1.6, color: MUTE, margin: "0 0 28px", maxWidth: 600 },
  sub: { fontSize: 14, color: MUTE, margin: "0 0 22px" },
  cta: { background: VERM, color: PAPER, border: "none", borderRadius: 10, padding: "14px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "inherit" },
  ctaArrow: { fontSize: 17 },
  ctaDisabled: { opacity: 0.4, cursor: "not-allowed" },
  trustRow: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26, fontSize: 12.5, color: MUTE, alignItems: "center" },
  dot: { color: LINE },

  matList: { display: "grid", gap: 22 },
  matBlock: {},
  matQ: { fontSize: 15, fontWeight: 700, color: NAVY, margin: "0 0 12px" },
  matHelp: { fontSize: 13, color: MUTE, margin: "-6px 0 12px", lineHeight: 1.45, fontStyle: "italic" },
  matOpts: { display: "grid", gap: 8 },
  matOpt: { textAlign: "left", border: "1px solid " + LINE, borderRadius: 10, padding: "12px 15px", background: PAPER, cursor: "pointer", display: "flex", alignItems: "center", gap: 11, fontSize: 14, color: INK, fontFamily: "inherit", lineHeight: 1.35, transition: "all .15s" },
  matOptOn: { borderColor: NAVY, background: WASH },
  radio: { width: 17, height: 17, borderRadius: "50%", border: "1.5px solid " + LINE, flexShrink: 0, display: "inline-block" },
  radioOn: { borderColor: VERM, background: VERM, boxShadow: "inset 0 0 0 3px #fff" },

  cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 6 },
  domGroup: { marginBottom: 22 },
  domGroupLbl: { fontSize: 12, fontWeight: 800, color: NAVY, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px", paddingBottom: 7, borderBottom: "1px solid " + LINE },
  domCard: { textAlign: "left", border: "1px solid " + LINE, borderRadius: 12, padding: "18px 20px", background: PAPER, cursor: "pointer", display: "flex", flexDirection: "column", gap: 3, fontFamily: "inherit", transition: "all .15s" },
  domCardOn: { borderColor: VERM, background: "#fff6f3" },
  domLabel: { fontSize: 17, fontWeight: 700, color: NAVY },
  domDesc: { fontSize: 13.5, color: MUTE },
  domGo: { fontSize: 13, fontWeight: 600, color: VERM, marginTop: 6 },

  painList: { display: "grid", gap: 10 },
  painItem: { textAlign: "left", border: "1px solid " + LINE, borderRadius: 10, padding: "14px 16px", background: PAPER, cursor: "pointer", display: "flex", alignItems: "center", gap: 12, fontSize: 14.5, color: INK, fontFamily: "inherit", lineHeight: 1.4, transition: "all .15s" },
  painItemOn: { borderColor: NAVY, background: WASH },
  check: { width: 22, height: 22, borderRadius: 6, border: "1.5px solid " + LINE, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: PAPER },
  checkOn: { background: VERM, borderColor: VERM },

  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 },
  ghost: { background: "none", border: "none", color: MUTE, fontSize: 14, cursor: "pointer", fontWeight: 600, fontFamily: "inherit", padding: "8px 4px" },

  matResult: { background: NAVY, borderRadius: 14, padding: "24px 26px 20px", marginBottom: 28 },
  matResTop: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 },
  matResLbl: { fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "#8b96b3", margin: "0 0 4px", fontWeight: 700 },
  matResLevel: { fontSize: 28, fontWeight: 800, color: PAPER, margin: 0, letterSpacing: "-0.02em" },
  matResDesc: { fontSize: 14, lineHeight: 1.6, color: "#c6cde0", margin: "16px 0 20px" },
  govCallout: { display: "flex", gap: 14, alignItems: "flex-start", background: "#fff6f3", border: "1px solid #ffd9cc", borderLeft: "3px solid " + VERM, borderRadius: 12, padding: "18px 20px", marginBottom: 28 },
  govIcon: { color: VERM, fontSize: 16, lineHeight: 1.5, flexShrink: 0 },
  govLbl: { fontSize: 13, fontWeight: 800, color: NAVY, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" },
  govText: { fontSize: 14, lineHeight: 1.6, color: INK, margin: 0 },

  ladder: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" },
  ladderItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, position: "relative" },
  ladderDot: { width: 14, height: 14, borderRadius: "50%", background: "#22345a", border: "2px solid #22345a", zIndex: 2 },
  ladderDotOn: { background: VERM, borderColor: VERM },
  ladderDotCur: { boxShadow: "0 0 0 4px rgba(255,77,28,0.25)" },
  ladderLbl: { fontSize: 11.5, color: "#8b96b3", textAlign: "center", fontWeight: 600 },
  ladderLblCur: { color: PAPER },
  ladderLine: { position: "absolute", top: 6, left: "50%", width: "100%", height: 2, background: "#22345a", zIndex: 1 },
  ladderLineOn: { background: VERM },

  resSection: { fontSize: 19, fontWeight: 800, color: NAVY, margin: "0 0 6px", letterSpacing: "-0.01em" },
  resultList: { display: "grid", gap: 12, marginTop: 10 },
  resCard: { display: "flex", gap: 16, border: "1px solid " + LINE, borderRadius: 12, padding: "18px 20px", background: PAPER },
  resNum: { fontSize: 13, fontWeight: 800, color: VERM, fontVariantNumeric: "tabular-nums", paddingTop: 2 },
  resBody: { flex: 1 },
  resHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 },
  resTitle: { fontSize: 16.5, fontWeight: 700, color: NAVY, margin: 0, lineHeight: 1.25 },
  badge: { fontSize: 11, fontWeight: 700, border: "1px solid", borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap", flexShrink: 0 },
  resProb: { fontSize: 13.5, lineHeight: 1.55, color: MUTE, margin: "0 0 6px" },
  resOut: { fontSize: 13.5, lineHeight: 1.55, color: INK, margin: 0 },
  resLbl: { color: NAVY, fontWeight: 700 },

  capture: { marginTop: 26, padding: "24px 24px 26px", borderRadius: 14, background: WASH, border: "1px solid " + LINE },
  capTitle: { fontSize: 18, fontWeight: 800, margin: "0 0 8px", color: NAVY },
  capText: { fontSize: 14, lineHeight: 1.55, color: MUTE, margin: "0 0 16px" },
  formWrap: { borderRadius: 12, overflow: "hidden", background: PAPER, border: "1px solid " + LINE },
  formFrame: { width: "100%", height: 520, border: 0, display: "block" },
  capRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  input: { flex: 1, minWidth: 220, border: "1px solid " + LINE, background: PAPER, color: INK, borderRadius: 10, padding: "13px 15px", fontSize: 14.5, fontFamily: "inherit", outline: "none" },
  consent: { fontSize: 11.5, color: MUTE, margin: "14px 0 0", lineHeight: 1.5 },
  thanks: { display: "flex", gap: 14, alignItems: "center" },
  thanksMark: { width: 40, height: 40, borderRadius: "50%", background: "#1f9d55", color: PAPER, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, flexShrink: 0 },
  restart: { background: "none", border: "none", color: MUTE, fontSize: 13.5, cursor: "pointer", fontWeight: 600, fontFamily: "inherit", marginTop: 20, padding: 0 },
  foot: { textAlign: "center", fontSize: 11.5, color: "#9aa1b1", marginTop: 14 },
};

const CSS = `
  .fade { animation: fade .35s ease; }
  @keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  .cta:hover:not(:disabled) { filter: brightness(1.07); }
  .cta:active:not(:disabled) { transform: translateY(1px); }
  .domcard:hover { border-color: #ff4d1c !important; box-shadow: 0 8px 22px -16px rgba(255,77,28,.5); }
  .pain:hover { border-color: #0f1f3d !important; }
  .matopt:hover { border-color: #0f1f3d !important; }
  .ghost:hover { color: #0f1f3d; }
  .rescard:hover { border-color: #cfd4e0; }
  input::placeholder { color: #9aa1b1; }
  *:focus-visible { outline: 2px solid #ff4d1c; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) { .fade { animation: none; } }
`;
