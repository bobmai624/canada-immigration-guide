# Province report library — 2026-09-22

- `bc/`: new Chinese British Columbia research, preserving the supplied Saskatchewan report's seven chapters and appendix. Separate occupation and evidence pages supplement that order.
- `sk/` and `on/`: faithful HTML conversions of user-supplied original reports. Original DOCX files, figures, tables and hyperlinks are retained. These imports are **not** a fresh full policy verification.
- The existing federal/provincial directory retains its own verification dates and deep links.

## BC coverage

Skills Immigration, Skilled Worker, Health Authority, the temporary rural/remote health support initiative, Entrepreneur Immigration Base/Regional/Strategic Projects, EEBC and non-EE handoffs, four federal community interfaces, closed/historical routes, employer conditions, SIRS, document preparation, deadlines, work-permit distinctions, 10 school/program research records and planning risks.

Six occupation lists contain 144 grouped entries and 109 unique NOC codes. NOC general employment requirements are distinct from individual BC licensing assessments. Five original SVG diagrams have text equivalents in the chapters. Twenty-four government webpage/PDF images support the evidence library.

`bc/sources.json` records 78 sources. Forty source records have raw downloaded archives; 21 have linked research-tool extracts. Some source URLs could not be archived. These states are shown separately; an extract is not an original webpage or screenshot. HTML archives use `.html.txt` to avoid presenting an active archived page as a current government service. SHA-256 values refer to preserved bytes.

## Evidence limits

Individual licensing procedures, live school seats/future tuition, some project-specific CIP or duration confirmations, dynamic community lists, private application portals, and certain operational work-permit exceptions require further case-level checks. No individual employment or immigration success probabilities are invented.

Source report imports are checked for exact document-body text order ignoring whitespace, table and image counts, and original DOCX hashes. `import-manifest.json` records those checks.

## Maintenance

Local build sources are in `work/canada-kb/bc-report` in the working project. Run `build-report.py`, then `build-hub.py`; inspect the generated pages and run link, hash and browser checks before publishing. Official rules can change independently of this site's publication date.
