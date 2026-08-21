---
titulo: Tri-standard management system — Set Logística SRL
resumen: Implementation, certification and recertification of ISO 9001, 14001 and 45001 across a logistics operation, with the ERP as the backbone of the system.
categoria: gestion
orden: 3
periodo: 2013 — 2015
rol: Project Manager · Business Analyst · Data Analyst
stack: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ERP', 'SQL', 'Power BI', 'Tableau']
kpis:
  - label: Accidents
    valor: '0'
    nota: 'two consecutive years'
  - label: Complaints
    valor: '−40%'
    nota: 'year over year'
  - label: Standards
    valor: '3'
    nota: 'quality, environment and OH&S'
  - label: Cycles
    valor: 'Cert. + recert.'
    nota: 'external audit passed twice'
borrador: true
---

## Context

Set Logística SRL runs out of the same warehouse as E-Techlog — two companies,
one shared facility. My focus here was the **integrated management system** and
the ERP that holds it up.

## The problem

A certified system and a real operation tend to drift apart. The procedure says
one thing, the operator does another, and the binder gets updated the week before
the audit. When that happens, certification is an administrative cost that
improves nothing.

The challenge wasn't getting certified. It was **certifying something people
would use every day**.

## What I did

### The tri-standard system

Implementation and certification of **ISO 9001, 14001 and 45001** as one
integrated system, plus a full **recertification** cycle — the real test:
sustaining the system once the pressure of the first audit is gone.

Integrating all three shares the documentation and the audit cycle, but forces
you to resolve where they overlap. Risk is the clearest case: quality looks at
failing the customer, environment looks at impact, safety looks at harm to
people. Three readings of the same event — forcing them into a single matrix
makes all three useless.

Certification was run **as a project**: scope, schedule, owners and milestones
through to the external audit.

### The ERP as the backbone

The decision that held everything together: **management system records come out
of the ERP, not out of parallel spreadsheets**. If the operator already logs the
movement to do the job, that same record is the audit evidence.

That's what prevents the drift. Nobody has to "fill in the records" before an
audit, because the records are a by-product of the work.

### Non-conformities

Managing the full cycle: detection, root cause analysis, corrective action and
effectiveness verification. The hard part isn't raising the non-conformity — it's
**verifying months later that the action worked** and it didn't happen again.

### The indicators

A management system isn't held up by the binder — it's held up by what gets
measured. I built the dashboards that tracked the operation: non-conformities
opened and closed, response times, incidents, complaints by customer and by root
cause. Queried straight against the ERP database with **SQL**, published in
**Power BI** and **Tableau**.

That's what turned management review into a useful meeting: you walk in with the
numbers on the table, not with a story.

And it's where the thread that runs to today starts — **the data work didn't
begin in gas infrastructure, it began here, in 2013**.

## Outcome

- **Zero accidents across two consecutive years.** In a warehouse operation —
  forklifts, working at height, constant movement — that doesn't come from a
  poster on the wall. It comes from procedure and practice actually matching.
- **Customer complaints down 40% year over year.**
- Certification and recertification of all three standards passed.

## What I took from it

That a management system either helps or gets in the way depending on one
decision: **where the records come from**. If they come from the work, the system
improves the operation. If they come from a separate spreadsheet, it's
bureaucracy with a stamp.
