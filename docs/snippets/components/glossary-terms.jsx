export const glossaryTerms = [
  "Attack Path",
  "Attack Path Management (APM)",
  "Choke Point",
  "Collector",
  "Cypher",
  "Directory",
  "Edge",
  "Enterprise Access Model (EAM)",
  "Escalation (ESC)",
  "Exposure",
  "Finding",
  "FOSS",
  "Graph",
  "Impact",
  "Kind",
  "Node",
  "Object",
  "Principal",
  "Privilege",
  "Remediation",
  "Right",
  "Tenant",
  "Tier Zero/High Value",
  "Tiering/Tier Model",
];

export const letters = Array.from(new Set(glossaryTerms.map((term) => term[0].toUpperCase())))
  .filter((letter) => /^[A-Z]$/.test(letter))
  .sort();