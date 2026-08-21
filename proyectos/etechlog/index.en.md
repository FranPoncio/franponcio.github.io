---
titulo: Inventory and operations management — E-Techlog SA
resumen: End-to-end analysis of a warehouse operation using SAP and ERP — dead stock reduction, inventory accuracy, and safety and environmental management.
categoria: datos
orden: 3
periodo: '[2021 — 2023]'
rol: '[Inventory management and operations improvement]'
stack: ['SAP', 'ERP', 'Inventory management', 'ISO 14001', 'ISO 45001']
kpis:
  - label: Dead stock
    valor: '[−X%]'
    nota: 'of immobilised value'
  - label: Accuracy
    valor: '[X%]'
    nota: 'system vs. warehouse'
  - label: Scope
    valor: 'Full operation'
    nota: 'receiving to dispatch'
borrador: true
---

## Context

E-Techlog SA shares a warehouse with Set Logística. If the focus there was the
management system, here it was **inventory and operations**: what's in stock,
where it is, what it's worth, and what's stuck.

## The problem

Dead stock doesn't show up on any dashboard until someone goes looking for it. It
doesn't raise an error or trigger an alarm — it just takes up space, ties up
capital and ages. And because every individual movement is correct, the system
never complains.

Same with inventory accuracy. Nobody reports that system stock and warehouse
stock disagree — you find out when something is missing at dispatch, which is the
worst possible moment.

## What I did

### Full operation analysis

Receiving to dispatch, following the actual path of the goods rather than the org
chart. That's where the things no isolated metric shows up: where it piles up,
where it gets handled more than it should, what moves twice because it was put
away wrong.

### SAP and ERP

Working across the data in both systems to answer questions neither could answer
alone. **The underlying decision: defining the source of truth for each piece of
data.** When two systems describe the same warehouse, the question isn't which
one is right — it's which one governs what.

### Dead stock

Identification by turnover and age, valuation of what's immobilised, and the
process for deciding what to do with each item. The technical part is the easy
one; the hard part is **getting someone to own the decision**, because writing off
stock means admitting a purchase that didn't work out.

### Safety and environment

Managing **ISO 45001 and 14001** requirements on the floor: waste, protective
equipment, working conditions in the warehouse. In an operation where two
companies share one facility, this has an extra twist — responsibilities overlap
and have to be written down.

## Outcome

- **Dead stock reduced** by **[X%]** of immobilised value.
- **[Fill in]** inventory accuracy achieved.
- The operation analysed end to end, with bottlenecks identified and measured.

## What I took from it

That inventory accuracy is the foundation everything else sits on. You can have
the best dashboard, the best ERP and the best procedure — **if system stock
doesn't match warehouse stock, none of them are worth anything.**
