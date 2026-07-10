---
project: OpenTelemetry
upstream: open-telemetry/opentelemetry-go-compile-instrumentation
role: Contributor · CNCF
logo: /images/logos/opentelemetry.png
order: 1
---

OpenTelemetry's Go compile-time instrumentation project automatically injects
observability code into Go applications at build time, so developers get traces and
metrics without touching their application code.

<Contribution
  title="Gin HTTP server instrumentation"
  status="merged"
  pr="https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/501"
>

I added compile-time instrumentation support for [gin-gonic/gin](https://github.com/gin-gonic/gin),
one of the most widely used Go web frameworks. The instrumentation hooks Gin's request
handling at build time so that every incoming HTTP request produces a proper span with
method, route, and status attributes — following OpenTelemetry semantic conventions —
with zero changes to user code.

</Contribution>

<Contribution
  title="Version-matrix release gating"
  status="in progress"
  pr="https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/581"
  issue="https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/issues/578"
>

Instrumentation that patches a third-party library is only safe within the version
ranges it was written for. I'm building a version-matrix test harness that exercises
each instrumentation against the full range of library versions it claims to support,
so releases are gated on the declared compatibility actually holding — catching silent
breakage when upstream libraries change internals.

</Contribution>
