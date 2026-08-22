# Infrastructure policy checks

The repository validates its SAM/CloudFormation templates with:

- `cfn-lint` 1.55.1 for schemas, intrinsic functions and informational best-practice checks.
- AWS CloudFormation Guard 3.2.0 for project security and cost-aware governance rules.

Run the checks with:

```bash
pnpm validate:infra
```

Guard rules and their unit tests live in `infra/guard`. The IAM, CloudWatch and S3 rule semantics
follow the open-source [AWS Guard Rules Registry](https://github.com/aws-cloudformation/aws-guard-rules-registry).

## Cost-aware exceptions

Two optional controls are intentionally suppressed at resource level:

- `CLOUDWATCH_LOG_GROUP_ENCRYPTED`: CloudWatch already encrypts log groups by default and the
  contact Lambda deliberately emits no contact PII. A dedicated customer-managed key would add a
  recurring KMS charge.
- `S3_BUCKET_LOGGING_ENABLED`: server access logging requires a separate destination bucket and
  creates request and storage charges. The content bucket remains private, encrypted, versioned,
  TLS-only and protected by least-privilege policies.

Each exception is declared in the affected resource's `Metadata`, includes a rationale, and has an
annual review date. Removing an exception causes `pnpm validate:infra` to fail until the control is
implemented.
