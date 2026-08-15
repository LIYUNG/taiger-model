export const TicketStatus = {
  Open: 'open',
  Resolved: 'resolved'
};

/**
 * The GRE flavours, in the one spelling both collections use.
 *
 * A student's `gre_certificate` records which was sat; a program's `gre_types`
 * records which it accepts. Naming them once means a program's accepted list
 * and a student's certificate compare directly, with no translation step that
 * could quietly decide 'General' and 'GRE_GENERAL' are different things.
 *
 * The flavour has to be known before `gre_score` means anything: a General
 * total runs 260-340 and a Subject score 200-990, so the same number reads
 * completely differently depending on which it is.
 *
 * `Others` exists because the survey offers it, disabled — there is no scale to
 * read a score on, so nothing should resolve it.
 */
export const GreCertificate = {
  General: 'GRE_GENERAL',
  Subject: 'GRE_SUBJECT',
  Others: 'GRE_OTHERS'
};

/** The flavours a program can actually be screened against. */
export const GRE_SCREENABLE_CERTIFICATES = [
  GreCertificate.General,
  GreCertificate.Subject
];

/**
 * The Subject tests ETS still offers, for when the certificate is
 * `GRE_SUBJECT` — that says a Subject test was sat, but not which one.
 */
export const GreSubject = {
  Physics: 'Physics',
  Chemistry: 'Chemistry',
  Mathematics: 'Mathematics',
  Psychology: 'Psychology'
};

/**
 * The GMAT editions, again in one spelling for both collections.
 *
 * `Classic` is stored as 'GMAT_GENERAL' because that is the value the survey
 * has always written for it — the label reads "GMAT Physical Test", which
 * describes delivery rather than edition, but it is the only alternative to
 * Focus. Focus rescaled the total (205-805 against the classic 200-800) and
 * replaced Integrated Reasoning with Data Insights.
 *
 * `Online` is the survey's disabled third option, kept so the value is named
 * rather than appearing as a bare string.
 */
export const GmatCertificate = {
  Classic: 'GMAT_GENERAL',
  Focus: 'GMAT_FOCUS',
  Online: 'GMAT_ONLINE'
};

/** The editions a program can actually be screened against. */
export const GMAT_SCREENABLE_CERTIFICATES = [
  GmatCertificate.Classic,
  GmatCertificate.Focus
];
