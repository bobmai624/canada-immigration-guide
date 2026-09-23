# Alberta Report and A4 Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a government-source Alberta immigration report matching the British Columbia report’s depth, revise both reports so reader-facing abbreviations are always explained, and add verified A4 print/PDF controls to every province-report page.

**Architecture:** Keep the existing static GitHub Pages structure and shared `reports/report.css` and `reports/report.js`. Add an Alberta report subtree parallel to `reports/bc`, structured JSON research ledgers, local evidence archives, SVG diagrams, and standard-library verification scripts. Apply shared print behavior and terminology validation across both province reports without rebuilding the national government directory.

**Tech Stack:** Static HTML/CSS/JavaScript, SVG, JSON, Python 3 standard library, Poppler PDF tools where available, headless Chrome for print verification, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-24-alberta-deep-report-and-readable-terms-design.md`

## Global Constraints

- Government sources are primary; regulators and public institutions support licensing, education, and labour evidence.
- Preserve program, stream, pathway, selection, work authorization, nomination, and permanent-residence approval as separate layers.
- Every displayed acronym uses `中文全称（English Full Name，ACRONYM）`; otherwise use the complete Chinese term without the acronym.
- Extracted text is labelled as extraction, never as an original government document.
- Every material claim has a source identifier, access date, and evidence limitation.
- Every British Columbia and Alberta report page exposes `打印 / 保存 A4 PDF` and prints correctly on A4.
- Do not publish until source, terminology, link, print, responsive, and public-URL checks pass.

## Review Focus

- A pathway nested under another stream must remain nested and must not inflate the number of visas.
- Bare acronyms in SVG text, table cells, headings, and captions must fail validation while URLs and filenames remain allowed.
- Dynamic 2026 allocation and draw numbers must display their data date and source.
- A school’s designated-learning-institution status must not be treated as proof that every program is post-graduation-work-permit eligible.
- Print output must not clip occupation tables, source URLs, diagrams, or evidence screenshots.

---

### Task 1: Establish report verification and terminology controls

**Files:**
- Create: `tools/report_terms.py`
- Create: `tools/verify_province_reports.py`
- Create: `tests/test_report_terms.py`
- Create: `tests/test_report_structure.py`

**Interfaces:**
- Produces `CONTROLLED_TERMS: dict[str, tuple[str, str]]` mapping acronyms to Chinese and English full names.
- Produces `scan_text(path: Path, text: str) -> list[str]` for reader-facing acronym violations.
- Produces a command `python3 tools/verify_province_reports.py reports/bc reports/ab` with non-zero exit on failure.

- [ ] **Step 1: Write failing terminology tests**

Create unittest cases that require `AAIP`, `BC PNP`, `IRCC`, `NOC`, `TEER`, `CLB`, `LMIA`, `PGWP`, `EOI`, `WEOI`, `PR`, `EE`, `CEC`, `FSW`, `FST`, `ECA`, `DLI`, `CIP`, `ITA`, `RCIP`, and `FCIP` to be expanded in visible HTML/SVG text. Include passing cases for the full visible form and exclusions for URLs, filenames, source identifiers, JSON keys, and official quoted titles.

- [ ] **Step 2: Run tests and confirm the verifier is absent**

Run: `python3 -m unittest tests.test_report_terms -v`  
Expected: FAIL because `tools.report_terms` does not exist.

- [ ] **Step 3: Implement the dictionary and scanner**

Parse HTML with `html.parser`, omit `script`, `style`, URL attributes, code hashes, and marked official-title spans, and scan visible text nodes. Parse SVG as XML and scan text nodes. Emit path, line, acronym, and required expansion.

- [ ] **Step 4: Add structural checks**

Require each province directory to contain the overview, eight chapters, occupations, evidence, five named diagrams, a policy-check date, evidence links, print button, and chapter navigation. Validate internal relative links and JSON syntax.

- [ ] **Step 5: Run the focused tests**

Run: `python3 -m unittest tests.test_report_terms tests.test_report_structure -v`  
Expected: PASS.

- [ ] **Step 6: Commit the verification foundation**

Run: `git add tools/report_terms.py tools/verify_province_reports.py tests/test_report_terms.py tests/test_report_structure.py && git commit -m "test: add province report terminology and structure checks"`

### Task 2: Add shared A4 print and PDF-save behavior

**Files:**
- Modify: `reports/report.css`
- Modify: `reports/report.js`
- Modify: `tests/test_report_structure.py`
- Modify: all `reports/bc/*.html`

**Interfaces:**
- Produces `window.printProvinceReport()` in `reports/report.js`.
- Produces `.print-action`, `.print-meta`, `.print-landscape`, and print-only source URL behavior.

- [ ] **Step 1: Extend tests for the print contract**

Assert the shared stylesheet contains `@page`, `size: A4`, millimetre margins, print hiding rules, repeating `thead`, break controls, image/SVG maximum width, and a landscape class. Assert every BC page contains a button labelled `打印 / 保存 A4 PDF` and references the shared script.

- [ ] **Step 2: Run the structural test and observe failure**

Run: `python3 -m unittest tests.test_report_structure -v`  
Expected: FAIL on missing A4 declarations and print buttons.

- [ ] **Step 3: Implement shared print CSS and JavaScript**

Add an accessible click handler that calls `window.print()`. Add A4 portrait defaults, 12–16 mm margins, print-only title/date/URL metadata, hidden navigation and controls, fitted figures, repeated table headers, controlled breaks, and `.print-landscape` handling for wide tables.

- [ ] **Step 4: Add the print control to BC pages**

Insert the button and print metadata in BC overview, chapters, occupations, and evidence pages. Keep the control visible in the report header and keyboard reachable.

- [ ] **Step 5: Verify the print contract**

Run: `python3 -m unittest tests.test_report_structure -v`  
Expected: PASS for BC print integration; Alberta absence remains reported only when the Alberta directory becomes part of the test fixture.

- [ ] **Step 6: Commit shared printing**

Run: `git add reports/report.css reports/report.js reports/bc tests/test_report_structure.py && git commit -m "feat: add A4 print and PDF-save controls"`

### Task 3: Capture and register Alberta government evidence

**Files:**
- Create: `tools/fetch_ab_evidence.py`
- Create: `reports/ab/sources.json`
- Create: `reports/ab/claim-references.json`
- Create: `reports/ab/evidence/manifest.json`
- Create: `reports/ab/evidence/*`
- Create: `tests/test_ab_sources.py`

**Interfaces:**
- `fetch_ab_evidence.py --manifest reports/ab/sources.json --output reports/ab/evidence` downloads official HTML/PDF, creates text extraction where possible, records SHA-256, content type, HTTP status, and retrieval time.
- `sources.json` gives each source a stable identifier used by HTML anchors and claim references.

- [ ] **Step 1: Write source-manifest tests**

Require official source coverage for the program overview, updates, processing/draw information, worker application process, Worker Expression of Interest points grid, job-offer/employer rules, four worker streams, healthcare, technology, law enforcement, four entrepreneur streams, federal provincial nominees, Express Entry, post-graduation work permit, designated learning institutions, Alberta occupations, and professional/trade regulators.

- [ ] **Step 2: Run the source test and observe failure**

Run: `python3 -m unittest tests.test_ab_sources -v`  
Expected: FAIL because `reports/ab/sources.json` does not exist.

- [ ] **Step 3: Create the official source manifest**

Use current `alberta.ca`, `canada.ca`, `alis.alberta.ca`, public Alberta post-secondary, and official regulator URLs. Record source type, issuer, access date, effective date, planned archive type, and which claims the source supports.

- [ ] **Step 4: Implement and run evidence capture**

Run: `python3 tools/fetch_ab_evidence.py --manifest reports/ab/sources.json --output reports/ab/evidence`  
Expected: downloaded originals and manifest records for successful sources; explicit failure entries for blocked sources without claiming preservation.

- [ ] **Step 5: Render high-value PDF pages and page screenshots**

Use `pdftoppm -png -f PAGE -singlefile INPUT OUTPUT_PREFIX` for eligibility, scoring, occupation, document, and fee pages. Capture official web-page screenshots for program architecture, current allocations/draws, and worker application sequence. Record every image’s source identifier and date in `manifest.json`.

- [ ] **Step 6: Validate evidence coverage and hashes**

Run: `python3 -m unittest tests.test_ab_sources -v`  
Expected: PASS with no missing required source class and valid SHA-256 values for every archived original.

- [ ] **Step 7: Commit evidence and ledgers**

Run: `git add tools/fetch_ab_evidence.py reports/ab/sources.json reports/ab/claim-references.json reports/ab/evidence tests/test_ab_sources.py && git commit -m "research: archive Alberta immigration evidence"`

### Task 4: Build Alberta structured research datasets

**Files:**
- Create: `reports/ab/program-research.json`
- Create: `reports/ab/occupation-groups.json`
- Create: `reports/ab/schools-research.json`
- Create: `reports/ab/business-research.json`
- Create: `reports/ab/commentary-research.json`
- Create: `tests/test_ab_research_data.py`

**Interfaces:**
- Each claim stores `source_ids`, `checked_on`, `status`, and `limitations`.
- Occupation entries store `noc`, `title`, `list_type`, `pathway`, `requirements`, `regulator`, and `source_ids`.
- School entries store institution, program, location, credential, duration, tuition evidence, admission, international availability, post-graduation-work-permit evidence, occupation link, regulator, and unresolved questions.

- [ ] **Step 1: Write dataset schema and coverage tests**

Require all four worker streams, all four entrepreneur streams, healthcare/technology/law-enforcement pathways, priority-sector selection, current allocation and draw evidence, occupation-list types, at least ten researched Alberta programs, and claim-source integrity.

- [ ] **Step 2: Run tests and observe missing datasets**

Run: `python3 -m unittest tests.test_ab_research_data -v`  
Expected: FAIL because the five datasets do not exist.

- [ ] **Step 3: Populate program and business research**

Record eligibility at submission and assessment, legal status, language, education, experience, job offer, employer, occupation, licensing, funds/capital, application sequence, fees, current selection, post-nomination duties, and federal next step.

- [ ] **Step 4: Populate occupation research**

Separate exclusions, positive lists, eligible industries, regulators, community-level rules, compulsory trades, and sectors without a fixed positive list. Preserve overlapping occupations without double-counting them as separate visas.

- [ ] **Step 5: Populate school and labour-alignment research**

Select at least ten concrete Alberta programs that span healthcare support, skilled trades, construction, manufacturing, technology, tourism/hospitality, agriculture, aviation, and entrepreneurship. Do not include a program without official admission and post-graduation-work-permit evidence or an explicit unresolved marker.

- [ ] **Step 6: Populate market-claim research**

Record representative claims about low language, employer guarantees, rural shortcuts, technology fast tracks, inexpensive study, and guaranteed nomination; pair each with government evidence and safe consulting wording.

- [ ] **Step 7: Run data validation**

Run: `python3 -m unittest tests.test_ab_research_data -v`  
Expected: PASS with zero orphan source identifiers and zero unlabelled unknowns.

- [ ] **Step 8: Commit structured research**

Run: `git add reports/ab/*.json tests/test_ab_research_data.py && git commit -m "research: structure Alberta pathways occupations and schools"`

### Task 5: Create Alberta diagrams

**Files:**
- Create: `reports/ab/diagrams/architecture.svg`
- Create: `reports/ab/diagrams/allocation.svg`
- Create: `reports/ab/diagrams/scoring.svg`
- Create: `reports/ab/diagrams/study-path.svg`
- Create: `reports/ab/diagrams/work-permit.svg`
- Create: `tests/test_ab_diagrams.py`

**Interfaces:**
- Each SVG includes a title, description, policy/data date, source IDs, readable Chinese labels, and no unexplained acronym.

- [ ] **Step 1: Write SVG accessibility and source tests**

Require valid XML, viewBox, title, description, policy date, source marker, no clipped negative coordinates, and terminology compliance.

- [ ] **Step 2: Run tests and observe missing diagrams**

Run: `python3 -m unittest tests.test_ab_diagrams -v`  
Expected: FAIL on five missing files.

- [ ] **Step 3: Draw the architecture and allocation diagrams**

Use Alberta’s actual hierarchy and current dated allocation figures. Separate worker streams, dedicated pathways, entrepreneur streams, invitation, nomination, and federal approval.

- [ ] **Step 4: Draw scoring, study, and work-permit diagrams**

Show Worker Expression of Interest selection without implying score guarantees. Show study and work-permit pathways with explicit failure gates and no guaranteed nomination.

- [ ] **Step 5: Verify all diagrams**

Run: `python3 -m unittest tests.test_ab_diagrams -v`  
Expected: PASS.

- [ ] **Step 6: Commit diagrams**

Run: `git add reports/ab/diagrams tests/test_ab_diagrams.py && git commit -m "feat: add Alberta policy and pathway diagrams"`

### Task 6: Build Alberta overview and core policy chapters

**Files:**
- Create: `reports/ab/index.html`
- Create: `reports/ab/01-framework.html`
- Create: `reports/ab/02-fit.html`
- Create: `reports/ab/03-rules.html`
- Modify: `tests/test_report_structure.py`

**Interfaces:**
- Uses shared `../report.css` and `../report.js`.
- Source badges link to stable anchors in `evidence.html`.
- Every page includes the print control and print metadata.

- [ ] **Step 1: Add Alberta page expectations to structural tests**

Require page titles, sidebar order, chapter navigation, evidence links, figure alternatives, policy dates, and print controls.

- [ ] **Step 2: Run the structural test and observe failure**

Run: `python3 -m unittest tests.test_report_structure -v`  
Expected: FAIL on missing Alberta pages.

- [ ] **Step 3: Build the overview and architecture chapter**

Present the complete option universe, dated current conclusions, reading order, government responsibilities, active/historical labels, and architecture diagram.

- [ ] **Step 4: Build client-fit research**

Cover location/status, education, English, occupation, licensing, employer, budget, family, timeline, and rejection/high-risk profiles. Keep product-design recommendations separate from legal eligibility.

- [ ] **Step 5: Build the core rules chapter**

Provide separate detailed tables for all worker and entrepreneur streams and the dedicated pathways. Include application timing, documents, employer rules, occupation rules, fees, post-nomination duties, and federal connection.

- [ ] **Step 6: Run structure, source, and terminology checks for the completed page set**

Run: `python3 -m unittest tests.test_report_structure tests.test_ab_sources tests.test_ab_research_data tests.test_report_terms -v`  
Expected: PASS for the overview and first three Alberta chapters. Full-directory verification begins after Task 7 creates the remaining required pages.

- [ ] **Step 7: Commit core pages**

Run: `git add reports/ab/index.html reports/ab/01-framework.html reports/ab/02-fit.html reports/ab/03-rules.html tests/test_report_structure.py && git commit -m "feat: add Alberta report core policy chapters"`

### Task 7: Build Alberta study, schools, timeline, risk, and commentary chapters

**Files:**
- Create: `reports/ab/04-study.html`
- Create: `reports/ab/05-schools.html`
- Create: `reports/ab/06-timeline.html`
- Create: `reports/ab/07-risks.html`
- Create: `reports/ab/08-commentary.html`

**Interfaces:**
- Uses `schools-research.json`, `commentary-research.json`, and the shared evidence anchors.

- [ ] **Step 1: Build study planning and school/program research pages**

Start from occupation and licensing, then show program, institution, admission, tuition evidence, international availability, post-graduation-work-permit evidence, employment relevance, and immigration limits.

- [ ] **Step 2: Build the linear timeline and document page**

Provide separate worker, study, entrepreneur, nomination, work-permit, and federal sequences. Include decision gates and document tables rather than approval promises.

- [ ] **Step 3: Build risk conclusions**

Explain current allocations, selection pool pressure, priority changes, employer/community dependence, licensing, business performance, study-policy drift, and federal admissibility.

- [ ] **Step 4: Build the market-claim audit**

Show claim, government evidence, missing conditions, evaluation, and safe wording. Do not reproduce unsupported accusations.

- [ ] **Step 5: Run full Alberta chapter checks**

Run: `python3 tools/verify_province_reports.py reports/ab && python3 -m unittest tests.test_report_structure tests.test_ab_research_data -v`  
Expected: PASS with all eleven Alberta report pages present.

- [ ] **Step 6: Commit remaining chapters**

Run: `git add reports/ab/04-study.html reports/ab/05-schools.html reports/ab/06-timeline.html reports/ab/07-risks.html reports/ab/08-commentary.html && git commit -m "feat: complete Alberta study timeline and risk chapters"`

### Task 8: Build Alberta occupations and evidence centre

**Files:**
- Create: `reports/ab/occupations.html`
- Create: `reports/ab/evidence.html`
- Modify: `reports/report.js`
- Modify: `tests/test_report_structure.py`

**Interfaces:**
- Search fields use existing `data-filter` and `data-count` behavior.
- Evidence cards use source IDs from `sources.json`; occupation sections use groups from `occupation-groups.json`.

- [ ] **Step 1: Extend tests for occupation and evidence completeness**

Require all occupation-list types, regulator links, source counts, archived-file links, hash display, screenshot gallery, limitations, and search controls.

- [ ] **Step 2: Run tests and observe failure**

Run: `python3 -m unittest tests.test_report_structure tests.test_ab_research_data -v`  
Expected: FAIL on missing occupation and evidence pages.

- [ ] **Step 3: Build the occupation directory**

Render separate sections for exclusions, positive lists, industries, healthcare regulators, law enforcement, rural community rules, priority sectors, and compulsory trades. Explain title-versus-duties matching.

- [ ] **Step 4: Build the evidence centre**

Render a first-read source table, screenshot/PDF-page gallery, machine-readable ledgers, searchable source cards, SHA-256 hashes, archive labels, conflicts, and unresolved items.

- [ ] **Step 5: Run report and data checks**

Run: `python3 tools/verify_province_reports.py reports/ab && python3 -m unittest discover -s tests -v`  
Expected: PASS.

- [ ] **Step 6: Commit the directories**

Run: `git add reports/ab/occupations.html reports/ab/evidence.html reports/report.js tests && git commit -m "feat: add Alberta occupations and evidence centre"`

### Task 9: Revise British Columbia terminology and visible labels

**Files:**
- Modify: all `reports/bc/*.html`
- Modify: all `reports/bc/diagrams/*.svg`
- Modify: relevant `reports/bc/*.json`
- Modify: `tools/report_terms.py`
- Modify: `tests/test_report_terms.py`

**Interfaces:**
- The controlled dictionary remains the single audit source for both provinces.

- [ ] **Step 1: Run the terminology audit and save the baseline count**

Run: `python3 tools/verify_province_reports.py reports/bc`  
Expected: FAIL with a path-by-path list of bare acronyms.

- [ ] **Step 2: Expand BC program and federal terms**

Replace bare province-program, federal-department, permanent-residence, Express Entry, federal-program, community-program, work-permit, education, occupation, language, and credential acronyms with the approved visible format or complete Chinese term.

- [ ] **Step 3: Expand occupation, school, licensing, and evidence terminology**

Apply the same rule to tables, source introductions, figures, captions, notes, and structured reader-facing labels. Preserve official URLs, filenames, hashes, source IDs, and quoted official titles.

- [ ] **Step 4: Revise BC SVG diagrams**

Fit complete labels without clipping, enlarge viewBox or line-wrap where needed, and retain source/date notes.

- [ ] **Step 5: Run terminology and structural checks**

Run: `python3 tools/verify_province_reports.py reports/bc reports/ab && python3 -m unittest tests.test_report_terms tests.test_report_structure -v`  
Expected: PASS with zero bare controlled acronyms.

- [ ] **Step 6: Commit BC readability revisions**

Run: `git add reports/bc tools/report_terms.py tests/test_report_terms.py && git commit -m "refactor: explain immigration terminology across BC report"`

### Task 10: Integrate navigation and perform visual, print, and deployment QA

**Files:**
- Modify: `reports/index.html`
- Modify: `index.html`
- Create: `qa/province-reports/qa-results.json`
- Create: `qa/province-reports/*.png`
- Create: `qa/province-reports/*.pdf`

**Interfaces:**
- Province-report index exposes Alberta and updated British Columbia cards.
- QA JSON records viewport, page, print command, result, date, and artifact path.

- [ ] **Step 1: Add Alberta navigation and updated report metadata**

Link the Alberta overview from the homepage and province-report library. Update BC and Alberta policy-check dates and evidence-status labels without changing the national directory’s independent date labels.

- [ ] **Step 2: Run all automated checks**

Run: `python3 -m unittest discover -s tests -v && python3 tools/verify_province_reports.py reports/bc reports/ab`  
Expected: PASS with zero broken internal links, zero terminology violations, and complete report structures.

- [ ] **Step 3: Start a local static server**

Run: `python3 -m http.server 8765` from the repository root.  
Expected: server listens on port 8765 and serves both province reports.

- [ ] **Step 4: Perform desktop and mobile browser QA**

Inspect the Alberta overview, rules, schools, occupations, evidence, and the equivalent BC page types at 1440-pixel desktop and approximately 390-pixel phone width. Verify navigation, table scrolling, filter/search behavior, diagram legibility, evidence images, source links, and print-button focus/label.

- [ ] **Step 5: Render A4 print samples**

Use headless Chrome’s `--print-to-pdf` against one overview, one narrative chapter, one wide occupation page, and one evidence page from each province. Save eight PDFs under `qa/province-reports/`. Render representative PDF pages to PNG with `pdftoppm` and inspect for clipping, blank pages, broken rows, missing titles, and unreadable diagrams.

- [ ] **Step 6: Record QA evidence**

Write `qa-results.json` with the tested URLs, viewport sizes, PDF files, page counts, observed defects, fixes, and final pass status.

- [ ] **Step 7: Re-run checks after any QA fixes**

Run: `python3 -m unittest discover -s tests -v && python3 tools/verify_province_reports.py reports/bc reports/ab && git diff --check`  
Expected: all tests PASS and `git diff --check` emits no errors.

- [ ] **Step 8: Commit integration and QA artifacts**

Run: `git add index.html reports/index.html reports qa/province-reports && git commit -m "feat: publish Alberta deep report with verified A4 output"`

- [ ] **Step 9: Push and watch deployment**

Run: `git push origin main` followed by `gh run list --limit 3` and `gh run watch RUN_ID --exit-status`.  
Expected: the GitHub Pages workflow completes successfully for the pushed commit.

- [ ] **Step 10: Verify public HTTPS pages and downloads**

Request the public Alberta overview, rules, occupations, evidence, shared stylesheet/script, revised BC pages, and homepage. Confirm HTTP 200, expected titles, print controls, and current commit content.
