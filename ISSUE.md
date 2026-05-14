Security follow-up and checklist

Summary

This file documents the security-related changes applied to the contact form and remaining recommended actions.

What was changed (high level)
- Escaped all user-provided fields before embedding in HTML emails to prevent XSS.
- Sanitized replyTo header values (removed CR/LF and limited length) to prevent header injection.
- Added MX validation with fallback to A/AAAA DNS records.
- Added basic rate-limiting (in-memory, per-email) as a temporary mitigation.
- Added plain-text fallback by attaching a text file (message.txt) and limited it to 32KB.
- Implemented retries with exponential backoff when sending via Microsoft Graph.
- Hardened Content-Security-Policy (removed 'unsafe-inline').
- Escaped closing script tag in JSON-LD to avoid script injection.

Files modified
- src/app/_actions/submitContact.ts — core changes (sanitization, MX fallback, rate limit, attachment, retries, header sanitation)
- next.config.mjs — CSP hardening
- src/app/[locale]/page.tsx — JSON-LD escaping

Checklist (recommended follow-ups)
- [ ] Replace in-memory rate-limiter with Redis-based limiter (required for production scale).
- [ ] Move secrets (client_secret, SMTP creds if any) to Hostinger secret store / Key Vault / Managed Identity and rotate.
- [ ] Integrate Sentry (or similar) with PII redaction for errors and delivery metrics.
- [ ] Add E2E tests that cover the contact form (reCAPTCHA flow, success and failure paths).
- [ ] Add Dependabot and CI job to run `npm audit` and `npm run build` on PRs.
- [ ] Monitor postcss advisory; consider patch or alternative if exploitability is relevant.

How to test (quick)
1. Run locally and test contact form with small message — verify email arrives and contains attachment.
2. Test with a very large message (>32KB) — verify attachment is truncated and message indicates truncation.
3. Simulate Graph API failures (invalid token) — verify retries occur (check logs) and eventual error returned.
4. Verify CSP changes do not break required scripts (reCAPTCHA) in staging.

Notes
- Current production deployment on Hostinger should keep secrets in Hostinger's environment variables. Do not commit secrets to the repo.
- For immediate mitigation of abuse, consider adding Hostinger/WAF rules while Redis is provisioned.

Commits
- chore(security): sanitize contact emails, add rate-limiting and MX fallback; harden CSP
- fix(build): await headers() in submitContact to fix build error
- fix(contact): use email-based rate limiting to avoid headers() in server action
- feat(contact): attach plain-text message as fileAttachment for fallback clients
- fix(contact): add retries with exponential backoff and limit attachment size
- fix(contact): sanitize replyTo header values to prevent header injection
- fix(security): sanitize email subject and escape </script> in JSON-LD

If you want, I can open a GitHub issue or PR summarizing this checklist for tracking.
