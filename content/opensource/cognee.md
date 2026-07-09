---
project: Cognee
upstream: topoteretes/cognee
role: Contributor
order: 2
links:
  - label: "Issue #3602 — Helm chart"
    url: https://github.com/topoteretes/cognee/issues/3602
  - label: "Issue #3616 — SaaS source connectors"
    url: https://github.com/topoteretes/cognee/issues/3616
---

[Cognee](https://github.com/topoteretes/cognee) is an open-source memory engine for AI
agents — it turns raw data into knowledge graphs that agents can query.

**Productionizing the Kubernetes Helm chart (#3602).** Assigned to bring the project's
Helm chart to production quality: proper configuration surface, secrets handling, and
sane defaults so teams can deploy Cognee to their own clusters reliably instead of
hand-rolling manifests.

**Shared SaaS source-connector pattern (#3616).** Designing a reusable connector
pattern for Cognee's DLT-based ingestion pipeline, so SaaS data sources (issue
trackers, docs tools, CRMs) can be added through one consistent interface instead of
each connector re-implementing auth, pagination, and incremental sync differently.
