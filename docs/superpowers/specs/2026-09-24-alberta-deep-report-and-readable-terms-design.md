# Alberta Deep Report, Readable Terminology, and A4 Export Design

**Date:** 2026-09-24  
**Status:** Awaiting written-spec review  
**Product:** Canada policy knowledge base for internal study and immigration consultancy research

## 1. Purpose

Build an Alberta provincial immigration report that matches the approved British Columbia report in research depth, evidence preservation, visual structure, navigation, and auditability. At the same time, revise both reports so a reader never needs prior knowledge of immigration abbreviations, and add an A4 print/PDF control to every report-facing page.

The output is an internal product-research foundation. It inventories and explains government pathways before client matching. It must separate program existence, current intake, expression of interest, invitation, provincial nomination, work authorization, and federal permanent-residence approval.

## 2. Audience and reading level

The primary reader is a Chinese-speaking education or immigration consultant who may be new to Canadian policy terminology. Explanations use plain Chinese. Official English names remain visible so staff can locate the original government page and learn the terminology.

The report must not assume that the reader already knows an acronym. It must not turn a government stream, pathway, selection initiative, work permit, or historical program into the same type of “visa.”

## 3. Alberta policy scope

The Alberta report covers the complete currently published Alberta Advantage Immigration Program structure and the relevant federal interfaces.

### 3.1 Worker streams

- Alberta Opportunity Stream
- Alberta Express Entry Stream
- Rural Renewal Stream
- Tourism and Hospitality Stream

### 3.2 Dedicated worker pathways and initiatives

- Dedicated Health Care Pathways, including Express Entry and non-Express Entry options
- Accelerated Tech Pathway
- Law Enforcement Pathway
- Priority-sector draws and other initiatives
- Worker Expression of Interest and invitation system

Dedicated pathways and draw priorities must remain subordinate to their actual government structure. They must not be counted as separate permanent-residence visas merely because they have separate selection rules.

### 3.3 Entrepreneur streams

- Rural Entrepreneur Stream
- Graduate Entrepreneur Stream
- Farm Stream
- Foreign Graduate Entrepreneur Stream

### 3.4 Federal and community interfaces

- Express Entry and the federal economic programs that support it
- Provincial nominee permanent-residence applications
- Employer-specific and open work permits where legally relevant
- Post-graduation work permits
- Rural community endorsement and designated-community responsibilities
- Professional licensing and compulsory-trade certification

### 3.5 Status and history

Open, invitation-based, capped, paused, expired, historical, announced, and selection-priority entries must be labelled separately. Current criteria and historical criteria may not be blended.

## 4. Page architecture

Create `reports/ab/` with the same navigation depth as `reports/bc/`:

1. `index.html` — report overview and reading guide
2. `01-framework.html` — government architecture
3. `02-fit.html` — client-fit research
4. `03-rules.html` — eligibility, application logic, employers, occupations, and federal connection
5. `04-study.html` — overseas study planning
6. `05-schools.html` — researched schools and programs
7. `06-timeline.html` — linear timelines, documents, and work authorization
8. `07-risks.html` — risk conclusions and consulting boundaries
9. `08-commentary.html` — market claims compared with government evidence
10. `occupations.html` — occupation lists, exclusions, regulators, and preparation requirements
11. `evidence.html` — evidence register, archived originals, screenshots, hashes, and unresolved issues

The province-report library and knowledge-base homepage will link to the Alberta report. The existing Alberta government directory remains available as the underlying national inventory rather than being replaced.

## 5. Visual system and diagrams

Use the shared province-report stylesheet and the existing BC visual language. Alberta receives five minimum report-native SVG diagrams:

1. Government pathway architecture
2. 2026 nomination allocation, issued nominations, remaining spaces, and application load
3. Worker Expression of Interest scoring and selection sequence
4. Study-to-employment-to-nomination pathway
5. Nomination, work-permit, and federal permanent-residence transition

Every diagram must identify its data date and distinguish government facts from report interpretation. Every diagram gets a text alternative, source links, and a full-size link. Government screenshots remain visually distinct from report-created diagrams.

## 6. Chapter requirements

### 6.1 Government architecture

Show all worker and entrepreneur streams, dedicated pathways, federal interfaces, and historical entries. Explain which authority controls each step and what legal status the step does or does not provide.

### 6.2 Client fit

Evaluate applicants in mainland China, third countries, and Canada. Cover ordinary bachelor, college, vocational, and high-school backgrounds; low-to-medium English; regulated occupations; skilled trades; healthcare; technology; tourism and hospitality; rural employment; entrepreneurs; and profiles for whom Alberta is a poor fit.

### 6.3 Rules and application logic

For each stream or pathway, record:

- intake and invitation mechanism
- residence or work-location requirement
- legal-status and work-permit requirement
- language requirement
- education requirement
- work-experience requirement
- job-offer and employer requirement
- occupation rule
- licensing rule
- settlement-funds or business-capital rule
- provincial documents
- post-nomination duties
- federal next step
- known selection uncertainty

### 6.4 Study planning

Start with occupation, licensing, employer demand, and realistic work authorization before recommending a school. Separate school admission English from immigration language tests. Separate a designated learning institution from post-graduation work-permit eligibility. Do not present study as guaranteed nomination.

### 6.5 Schools and programs

Research concrete Alberta programs suited to the identified occupation and licensing pathways. For each program record institution, location, credential, duration, tuition source, admission requirements, international availability, post-graduation work-permit evidence, related occupation, regulator or trade authority, employment evidence, immigration relevance, and unresolved questions.

### 6.6 Timeline and materials

Provide linear pathways from preparation through provincial and federal stages. Include failure gates for language, admission, work authorization, licensing, employer eligibility, invitation, nomination, work-permit expiry, and federal admissibility. Timelines are ranges or planning sequences rather than approval promises.

### 6.7 Risk conclusions

Address allocation changes, draw priorities, expression-of-interest competition, employer dependency, community endorsement, licensing delay, business-performance obligations, policy changes during study, and weak employment outcomes.

### 6.8 Market-claim audit

For each selected public claim, store the claim, publication date, source link, government rule, missing condition, evaluation, and safe consulting wording. Do not reproduce personal allegations or unverifiable success claims.

## 7. Occupation directory

The Alberta occupation page must separately present:

- Alberta Opportunity Stream exclusions and special requirements
- Tourism and Hospitality eligible occupations
- Accelerated Tech Pathway occupations and eligible industries
- Dedicated Health Care professions and regulators
- Law Enforcement occupations
- Rural Renewal community-level occupation or employer rules
- priority sectors without a fixed universal positive occupation list
- compulsory trades and professional licensing authorities

An occupation’s presence in a priority sector does not prove current invitation or client eligibility. Occupation classification must be based on duties, not title alone.

## 8. Evidence preservation

Use Alberta and Canadian government sources first. Regulatory bodies, public institutions, and official labour-market sources may be used for licensing, study, and employment evidence.

For each material claim, retain:

- source identifier
- official title and URL
- issuing authority
- access date
- effective or publication date when available
- archive path and archive type
- SHA-256 for downloaded files
- text extraction where possible
- screenshot or rendered PDF page for high-value evidence
- claim-to-source relationship
- limitations, contradictions, or unresolved questions

Evidence types must be labelled as official downloaded original, official-page screenshot, extracted text, report-created diagram, or external supporting source. Extracted text is never labelled as an original government file.

## 9. Terminology and abbreviation standard

No unexplained acronym may appear in either the British Columbia or Alberta report.

When an acronym is displayed, use this visible form:

> 中文全称（English Full Name，ACRONYM）

Examples:

- 不列颠哥伦比亚省省提名计划（British Columbia Provincial Nominee Program，BC PNP）
- 阿尔伯塔优势移民计划（Alberta Advantage Immigration Program，AAIP）
- 加拿大移民、难民及公民部（Immigration, Refugees and Citizenship Canada，IRCC）
- 国家职业分类（National Occupational Classification，NOC）
- 培训、教育、经验与职责等级（Training, Education, Experience and Responsibilities，TEER）
- 加拿大语言基准（Canadian Language Benchmarks，CLB）
- 劳动力市场影响评估（Labour Market Impact Assessment，LMIA）
- 毕业后工作许可证（Post-Graduation Work Permit，PGWP）
- 意向表达（Expression of Interest，EOI）
- 工人意向表达（Worker Expression of Interest，WEOI）
- 永久居民（Permanent Resident，PR）

For repeated prose, the complete Chinese term may be used without repeating the acronym. A bare acronym is forbidden in headings, cards, diagrams, tables, captions, notes, and ordinary prose. Official document titles may preserve the official English title, but the surrounding label must explain it in Chinese.

A terminology dictionary and automated audit will scan HTML, SVG, and structured data for prohibited bare abbreviations. The audit must allow URLs, filenames, hash values, official quotations, and source identifiers without rewriting them.

## 10. A4 print and PDF workflow

Every British Columbia and Alberta report-facing page must display a clearly visible button labelled:

> 打印 / 保存 A4 PDF

The button invokes the browser print interface through `window.print()`. The interface lets the user print immediately or choose “Save as PDF.” This avoids third-party PDF libraries, preserves selectable text and links, and stays compatible with the static GitHub Pages deployment.

Print styling must include:

- `@page { size: A4; }`
- controlled millimetre margins
- report title, province, policy-check date, and current page URL in the printed document
- hidden website navigation, sidebars, interactive controls, and chapter navigation
- tables fitted within printable width
- repeated table headers where supported
- avoided row splitting where practical
- SVG diagrams and evidence images scaled within page width
- headings kept with following content where practical
- source links visible as text or preserved as clickable PDF links
- no clipped cards, figures, captions, code, or long URLs
- sensible page breaks before major sections
- portrait default, with wide tables allowed to use a dedicated landscape print class

The control appears in the report header and remains reachable on long pages. Keyboard and screen-reader labels must identify that it opens the print dialog.

The report will not claim that the browser silently downloads a PDF. The button wording accurately describes printing or saving through the browser’s native PDF destination.

## 11. Quality assurance

Before publication, verify:

- all internal links and chapter navigation
- all source-card targets
- all downloaded-file hashes
- terminology audit across BC and Alberta
- no bare controlled acronyms in reader-facing content
- occupation counts and duplicate handling
- source coverage for each pathway
- desktop and phone-width layouts
- filtering and search on occupation and evidence pages
- A4 print preview for every page type
- long-table pagination
- diagram and screenshot print scaling
- GitHub Pages deployment and public HTTPS responses

The final report must disclose evidence gaps. A clean layout or successful page load is not evidence that every policy condition has been verified.

## 12. Publication

Publish the completed Alberta report, revised British Columbia report, shared terminology support, and A4 print/PDF controls to the existing GitHub Pages knowledge base. Update the homepage and province-report index only after local content, terminology, link, print, and visual checks pass.

