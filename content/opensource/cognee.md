---
project: Cognee
upstream: topoteretes/cognee
role: Contributor
logo: /images/logos/cognee.png
order: 2
---

[Cognee](https://github.com/topoteretes/cognee) is an open-source memory engine for AI
agents — it turns raw data into knowledge graphs that agents can query.

<Contribution
  title="Productionizing the Kubernetes Helm chart"
  status="assigned"
  issue="https://github.com/topoteretes/cognee/issues/3602"
>

Assigned to bring the project's Helm chart to production quality: proper configuration
surface, secrets handling, and sane defaults so teams can deploy Cognee to their own
clusters reliably instead of hand-rolling manifests.

</Contribution>

<Contribution
  title="Shared SaaS source-connector pattern"
  status="assigned"
  issue="https://github.com/topoteretes/cognee/issues/3616"
>

Designing a reusable connector pattern for Cognee's DLT-based ingestion pipeline, so
SaaS data sources (issue trackers, docs tools, CRMs) can be added through one
consistent interface instead of each connector re-implementing auth, pagination, and
incremental sync differently.

</Contribution>
