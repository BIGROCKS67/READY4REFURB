# Ready For Refurb: design notes

Existing site, audited against ~/.claude/UI_RULES.md on 2 Nov 2026. Brand kept: dark/white sections,
blue #3FB8E0 from the R4R logo, real job photos, "Are you R4R?" as the owner's motto.

## Fixed in this pass
- Removed: preloader, custom cursor (it hid the real cursor), Lenis smooth scroll, three.js stats
  background, materials ticker, fade-up on every block, hero hidden until JS animated it,
  uppercase eyebrow labels, icon tiles on every card, check-mark icon lists, arrows on every CTA,
  glass blur on stats. JS bundle 1.4MB down to 376KB (120KB gzipped).
- Hero now has a literal H1 ("Bathroom fitters in Towcester, Northampton and Milton Keynes") beside the motto.
- Copy: no em dashes, no negation pivot, sentence case headings and buttons, UK "to" ranges,
  error messages say what to do, form fields have real labels, 16px inputs.
- Reviews: removed the site builder's own review and a placeholder-looking name; removed
  relative dates that go stale; kept customers' wording as written.
- Commercial floor: phone in the nav, sticky Call/Quote bar on phones, company number and
  registered office in the footer.
- Consent: Facebook pixel loads only after "Accept" (equal Reject), privacy page at /privacy/,
  "Cookie settings" in the footer.

## Known gaps (not fixed)
- Brand face is the system stack / Inter (rule 4). Changing type is a brand decision for George.
- No opening hours or street address shown (service-area business); add hours if George wants.
- Review count checked against Google on 5 Nov 2026 (23 reviews, 5.0) and updated on the site. "Fully insured" is still George's claim; not checked against a certificate.
- Blog headings are still Title Case.
- Quote form goes to info@battleplanmedia.co.uk; confirm with George and Connor.
- Not tested: real form submissions end to end, Lighthouse, VoiceOver.

## Local search pass, 5 Nov 2026
- No separate town pages for snagging (UI_RULES 13.1: no cloned town pages without a real local job,
  review and local detail per town). Instead the snagging page's "Areas we cover" names the new build
  sites near Towcester, Northampton and Milton Keynes as places in the area, not as jobs done there.
  Add a town page only when George has a job, photos and a review from that town.
- No FAQPage markup (retired as a rich result). The extra snagging questions are visible text only.
- Organization sameAs now lists the Google Business Profile and Companies House. Facebook page URL is
  still unknown; add it when George confirms it.
- llms.txt is kept up to date because it already exists, but UI_RULES 13.4 says nothing uses it;
  do not spend more time on it.
