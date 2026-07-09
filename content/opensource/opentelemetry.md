---
project: OpenTelemetry
upstream: open-telemetry/opentelemetry-go-compile-instrumentation
role: Contributor · CNCF
order: 1
links:
  - label: "PR #501 — gin instrumentation (merged)"
    url: https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/501
  - label: "PR #581 — version-matrix test"
    url: https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/581
  - label: "Issue #578"
    url: https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/issues/578
---

OpenTelemetry's Go compile-time instrumentation project automatically injects
observability code into Go applications at build time, so developers get traces and
metrics without touching their application code.

**Gin HTTP server instrumentation (PR #501, merged).** I added compile-time
instrumentation support for [gin-gonic/gin](https://github.com/gin-gonic/gin), one of
the most widely used Go web frameworks. The instrumentation hooks Gin's request
handling at build time so that every incoming HTTP request produces a proper span with
method, route, and status attributes — following OpenTelemetry semantic conventions —
with zero changes to user code.

**Version-matrix release gating (PR #581, issue #578).** Instrumentation that patches a
third-party library is only safe within the version ranges it was written for. I'm
building a version-matrix test harness that exercises each instrumentation against the
full range of library versions it claims to support, so releases are gated on the
declared compatibility actually holding — catching silent breakage when upstream
libraries change internals.
