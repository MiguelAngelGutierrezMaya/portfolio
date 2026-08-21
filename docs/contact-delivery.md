# Secure contact delivery

The portfolio contact form uses a private server-to-server integration. The browser can reach only
the same-origin Astro endpoint and never receives a Lambda URL, ARN, AWS credential, SES identity or
rate-limit table name.

```text
Browser ContactForm
        │ POST /api/contact/ (same origin)
        ▼
Astro SSR endpoint on Amplify Compute
        │ signed AWS SDK Invoke using its IAM role
        ▼
Private contact-mailer Lambda ──► DynamoDB rate limit and deduplication
        │
        └────────────────────────► Amazon SES ──► verified destination mailbox
```

## Security boundaries

- Astro's CSRF origin validation remains explicitly enabled. The endpoint also requires matching
  `Origin`, same-origin Fetch Metadata, a custom request marker and `application/json`.
- Request bodies are capped at 8 KiB before parsing. Zod and domain validation enforce exact fields,
  allowed types and conservative maximum lengths.
- A hidden honeypot is handled as a successful no-op so automated senders do not learn how detection
  works.
- Amplify Compute invokes Lambda through `lambda:InvokeFunction`. There is no API Gateway, Lambda
  Function URL or Lambda resource policy granting public access.
- Lambda repeats validation, strips unsafe control characters and sends a text-only email with a
  fixed subject. User input is never inserted into sender or subject headers.
- The SES execution policy is scoped to the verified sender identity and further constrained to the
  configured From and recipient addresses. The visitor email is used only as `Reply-To`.
- DynamoDB atomically permits three attempts per source in each 15-minute window and suppresses
  identical messages for five minutes. Keys contain SHA-256 digests rather than raw IP, email or
  message data, and TTL removes them automatically.
- The atomic DynamoDB limit and the Lambda timeout constrain abuse and cost. Reserved concurrency is
  intentionally omitted because the production account cannot reserve capacity without crossing
  Lambda's minimum unreserved-concurrency requirement. Its explicit CloudWatch log group keeps
  operational logs for 30 days; application code does not log contact payloads or SES message IDs.
- All client and endpoint failures use stable generic responses. Private AWS errors, names and ARNs
  are not returned to the browser.

AWS WAF can add edge rate rules, managed common-exploit rules and bot controls. It is intentionally
not provisioned by this stack because attaching WAF to an Amplify application introduces a separate
recurring Amplify firewall charge plus WAF usage charges. Enable it as an explicit cost decision.

## Runtime configuration

Amplify uses its existing compute role and requires only:

```text
CONTACT_MAILER_FUNCTION=migudev-portfolio-contact-mailer
CONTACT_REGION=us-east-2
```

AWS credentials are supplied by the Amplify Compute role. Never add access keys, the SES identity or
Lambda invocation URLs to public environment variables.

## Validate and deploy

```bash
pnpm validate:infra
pnpm build:infra:contact

sam deploy \
  --template-file .aws-sam/contact/template.yaml \
  --stack-name migudev-portfolio-contact \
  --resolve-s3 \
  --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
  --no-confirm-changeset \
  --no-fail-on-empty-changeset \
  --profile miguel.gutierrez-prod \
  --region us-east-2
```

After deployment, set the two private runtime variables on the Amplify app, remove every legacy
`PUBLIC_EMAIL_*` variable, and deploy the application code. Validate a successful same-origin
submission and confirm that cross-origin requests are rejected without invoking Lambda.

## Recovery

The stack is independent from the content store. A failed application deployment can be rolled back
without changing SES or DynamoDB. CloudFormation owns the Lambda, table, execution role and the
single invoke policy attached to the existing Amplify Compute role. Removing that invoke policy or
clearing `CONTACT_MAILER_FUNCTION` immediately disables delivery while keeping the public site
available.
