---
titulo: Gas infrastructure indicators
resumen: Indicator system, dashboards and reporting for the Córdoba gas network, prepared to IDB / IFC standards.
categoria: datos
orden: 1
periodo: 2016 — 2023
rol: Business Analyst · Data Analyst
stack: ['Power BI', 'DAX', 'SQL', 'Power Query', 'ETL']
kpis:
  - label: Network
    valor: 12,000 km
    nota: 'pipelines and branch lines'
  - label: Stations
    valor: '150'
    nota: 'pressure reduction'
  - label: Connections
    valor: '500'
    nota: 'industrial'
  - label: Standard
    valor: IDB / IFC
    nota: 'reporting to lenders'

portada:
  src: ./portada.png
  alt: '[Replace with a real photo: pipeline route or control room]'

galeria:
  - src: ./traza.png
    alt: '[Replace with a dashboard screenshot using synthetic data]'
    pie: '[Caption — what it shows and why it matters]'
  - src: ./estacion.png
    alt: '[Replace with a data model diagram]'
    pie: '[Caption]'

borrador: true
---

> **Placeholder text**, translated from the Spanish version to show how the
> bilingual setup works. Replace it with your own.

## Context

Seven years in public gas infrastructure in Córdoba. Other people built the
works: my job was **knowing what state they were in**, and making that reportable
to the organisations financing them, under their standards.

## The problem

The data existed, but scattered: physical progress lived in inspection
spreadsheets, financial progress came from administration on a different cutoff
date, and commissioning was logged by operations in a separate system.

The monthly report took a week, and most of that time wasn't analysis — it was
reconciliation. When two areas reported different progress for the same work, it
was almost never a data-entry error. **It was that each one understood "progress"
differently.**

That observation shaped the whole project. The problem wasn't tooling.

## What I built

- **Granularity by section, not by contract.** A single contract can have fronts
  in very different states; averaging them hides exactly what you need to see.

- **Physical and financial progress kept separate, always shown together.** They
  are never averaged into a single index. 40 % of pipe laid is not 40 % of budget
  spent, and the gap between the two curves *is* the information — not an error
  to be corrected.

- **The IDB / IFC standard.** It required traceability from each figure back to
  its supporting document. That shaped the entire model — the document link had
  to be part of the fact, not an annex. It's the part I wouldn't have done on my
  own, and the part that ended up mattering most.

- **ETL.** Ingesting the three sources, normalising dates to the accounting
  cutoff, and validations that reject a load rather than let an inconsistent
  figure through.

## Outcome

The monthly report went from a week to a day. But the important part wasn't the
time saved — it was that **the conversation changed subject**. People stopped
arguing about whose number was right and started arguing about what to do about it.

---

### ⚠ Before publishing: confidentiality

Operational data for the network **belongs to your employer, not to you**. And
this repo is public: whatever you push stays in the git history even if you
delete it later.

What *is* yours is the **method** — the data model, the indicator definitions,
the reporting architecture.
