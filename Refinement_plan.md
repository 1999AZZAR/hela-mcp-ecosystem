# MCP Ecosystem Refinement Plan

## Objective

Refine the existing `mcp-ecosystem` repository into a stable, reproducible, easy-to-publish MCP stack without adding new MCP servers.

The ecosystem currently contains exactly 10 MCPs:

1. Chaining MCP
2. Filesystem MCP
3. Project Guardian MCP
4. Terminal MCP
5. Menager MCP
6. Researcher MCP
7. The Designer MCP
8. Browser Agent MCP
9. scrcpy MCP
10. LL3M Agent MCP

Treat these 10 MCPs as the complete current capability set.

Do not add MCP #11 during this refinement.

The architectural model is:

```text
AI Host
   │
   ▼
Chaining MCP
orchestration / discovery / routing / workflows
   │
   ▼
Project Guardian MCP
persistent project state / knowledge / tasks / decisions
   │
   ▼
8 specialized capability MCPs
Filesystem
Terminal
Menager
Researcher
Browser Agent
The Designer
scrcpy
LL3M
```

The ecosystem repository is the integration/distribution layer.

The individual MCP repositories remain the implementation layer.

The objective is not to redesign the individual MCPs. Improve them only when an actual integration issue or correctness problem requires it.

---

# 1. Start With a Complete Repository Audit

Before modifying anything, inspect the entire `mcp-ecosystem` repository.

Inspect at minimum:

```text
README.md
config/
scripts/
setup.sh
update.sh
build scripts
test scripts
profile definitions
inventory
documentation
CI configuration
Docker configuration
generated configuration logic
```

Then inspect the current GitHub state of all 10 MCP repositories.

For each MCP determine:

* current repository
* current pinned commit
* build/install method
* runtime entrypoint
* supported platforms
* GUI/headless requirements
* environment variables
* external dependencies
* health/startup behavior
* existing tests
* known integration assumptions

Do not infer capabilities from old documentation when the repository implementation says otherwise.

GitHub is the source of truth.

Do not make architectural changes during the initial audit.

Run the existing tests and record the baseline.

---

# 2. Preserve the Existing 10-MCP Architecture

Do not merge the repositories.

Do not introduce another orchestration framework.

Do not replace Chaining.

Do not replace Project Guardian.

Do not add another memory MCP.

Do not add another terminal MCP.

Do not add MCPs merely to increase capability count.

The current architecture should remain:

```text
                 MCP ECOSYSTEM
                       │
             ┌─────────┴─────────┐
             │                   │
         BACKBONE           CAPABILITIES
             │                   │
       ┌─────┴─────┐       ┌─────┴─────────┐
       │           │       │               │
   Chaining    Guardian   8 specialized MCPs
```

Explicitly document this distinction.

---

# 3. Do Not Rebuild the Profile System

Profiles already exist.

Treat the existing profile implementation as the foundation.

Inspect:

```text
config/profiles.json
```

and all scripts that consume it.

Do not create a second profile mechanism.

Instead, refine the existing one.

For every existing profile verify:

* profile ID
* purpose
* included MCPs
* target environment
* GUI/headless behavior
* required dependencies
* optional dependencies
* required secrets
* generated client configuration
* installation behavior
* update behavior

Do not rename existing profiles unless there is a concrete reason.

Do not break existing profile compatibility unnecessarily.

---

# 4. Make Profiles Agent-Oriented

Profiles should remain server selections technically, but their documentation should explain the resulting agent environment.

For each profile document:

```text
Purpose
Backbone
Capabilities
Target
Requirements
Secrets
Typical workflows
```

Example structure:

```text
autonomous-developer

Backbone:
- Chaining
- Project Guardian

Capabilities:
- Filesystem
- Terminal
- Menager
- Browser Agent

Purpose:
Autonomous software development and verification.

Typical workflow:
restore context
→ plan
→ inspect
→ implement
→ execute
→ verify
→ persist state
```

Use the actual profiles already present in the repository.

Do not invent profiles merely for documentation.

---

# 5. Make `inventory.json` the Canonical Server Registry

Keep the existing inventory system.

Ensure every MCP has one authoritative definition.

Inventory metadata should represent actual implementation state.

Where appropriate, track:

```text
id
name
repository
revision
category
domain
platform
target
runtime
build method
requirements
environment variables
```

Classify the 10 servers as:

```text
backbone:
  chaining
  project-guardian

capability:
  filesystem
  terminal
  menager
  researcher
  browser-agent
  designer
  scrcpy
  ll3m
```

Do not duplicate server metadata unnecessarily in multiple scripts.

Scripts should consume inventory data instead of maintaining their own server lists.

---

# 6. Keep Commit Hashes as the Actual Version Pins

Do not migrate the ecosystem to SemVer-based dependency resolution.

The existing commit-based approach is appropriate for this multi-repository stack.

Use Git commits as immutable implementation revisions.

Conceptually:

```json
{
  "id": "browser-agent",
  "repository": "1999AZZAR/Browser-Agent",
  "revision": "<commit>"
}
```

A commit hash represents the exact source revision being deployed.

Do not replace this with:

```text
Browser Agent >= 1.4.0
```

unless an individual repository independently provides a meaningful release/version requirement.

Use the terminology:

```text
version
  human-facing release identifier

revision
  exact Git commit

ecosystem snapshot
  collection of pinned MCP revisions
```

The revision remains the reproducibility mechanism.

---

# 7. Introduce Ecosystem Snapshot Metadata

Add lightweight snapshot/release metadata without changing the commit-based model.

A snapshot should identify:

```text
ecosystem repository commit
Chaining commit
Guardian commit
Filesystem commit
Terminal commit
Menager commit
Researcher commit
Designer commit
Browser Agent commit
scrcpy commit
LL3M commit
```

This makes a complete stack reproducible.

Example conceptual structure:

```json
{
  "snapshot": "2026-08",
  "servers": {
    "chaining": "<commit>",
    "project-guardian": "<commit>",
    "filesystem": "<commit>",
    "terminal": "<commit>",
    "menager": "<commit>",
    "researcher": "<commit>",
    "designer": "<commit>",
    "browser-agent": "<commit>",
    "scrcpy": "<commit>",
    "ll3m": "<commit>"
  }
}
```

Use the existing project conventions if another format already exists.

Do not introduce unnecessary release-management complexity.

---

# 8. Make Installation Deterministic

Audit:

```bash
./setup.sh
```

and all underlying installation scripts.

For the same profile and pinned revisions, installation should produce the same logical environment.

Verify:

* exact commits are checked out
* dependencies are installed correctly
* builds use the intended revision
* generated configuration references the correct executable
* repeated setup is safe
* failed installations are clearly reported
* partial installation does not masquerade as success

Do not silently use a different branch or latest commit when a revision is pinned.

---

# 9. Make Setup Idempotent

Running:

```bash
./setup.sh --profile <profile>
```

multiple times must not produce:

* duplicate repositories
* duplicate configuration entries
* corrupted builds
* conflicting directories
* duplicate environment variables
* unnecessary destructive operations

If something is already correctly installed at the requested revision, reuse it.

If the requested revision differs, update it deterministically.

---

# 10. Improve Profile Validation

Before installation/configuration:

```text
profile
   ↓
validate
   ↓
install
   ↓
generate configuration
```

Validate:

* profile exists
* every referenced MCP exists in inventory
* every revision is valid
* required metadata exists
* target compatibility is valid
* platform requirements are satisfied
* required dependencies are present
* required environment variables are known
* conflicting requirements are detected

Fail early.

Do not partially install an obviously invalid profile.

---

# 11. Add or Refine `doctor`

If the repository already has diagnostic functionality, improve it instead of creating duplicate tooling.

Provide an ecosystem health command such as:

```bash
./setup.sh doctor
```

or the project's existing equivalent.

Check:

```text
Operating system
Architecture
Node.js
Git
Package manager
Docker if relevant
```

Then:

```text
Chaining
Project Guardian
Filesystem
Terminal
Menager
Researcher
Designer
Browser Agent
scrcpy
LL3M
```

For each selected component report:

```text
✓ Ready
⚠ Optional dependency missing
✗ Required dependency missing
```

Also check relevant external requirements:

* browser runtime
* Playwright/browser installation
* Android ADB/device
* scrcpy
* Blender
* required API keys
* required environment variables

Never expose secrets.

Return a non-zero exit status for required failures.

---

# 12. Improve Update Behavior

Preserve the existing update mechanism.

Verify:

```bash
./update.sh --all
./update.sh --profile <profile>
./update.sh <server>
```

or the actual supported commands.

For every update:

```text
read desired revision
        ↓
compare current revision
        ↓
checkout/update
        ↓
install dependencies
        ↓
build
        ↓
validate
```

A failed update must be obvious.

Do not report success when a selected MCP failed to update/build.

Support rollback by retaining the previous known commit where practical.

---

# 13. Audit the Two Backbone MCPs First

Treat Chaining and Project Guardian as the highest-priority integration surface.

## Chaining

Verify:

* MCP discovery
* tool discovery
* capability identification
* routing
* decomposition
* workflow execution
* ranking
* fallback behavior
* error propagation
* multi-MCP execution
* large-result handling

Do not move persistent project state into Chaining.

## Project Guardian

Verify:

* context restoration
* project state
* tasks
* decisions
* knowledge
* relations
* search
* persistence
* session continuity

Do not turn Guardian into a generic orchestration layer.

Maintain the boundary:

```text
Chaining
= what/how to execute

Guardian
= what the project knows/remembers
```

---

# 14. Audit All 8 Capability MCPs Against the Backbone

For every capability MCP determine:

```text
Can Chaining discover it correctly?
Can Chaining select it correctly?
Are its tool descriptions useful?
Are results structured enough?
Are errors understandable?
Can the agent recover from failures?
Can important results be persisted by Guardian?
Does it return unnecessarily large output?
```

Do not force every capability MCP to directly depend on Guardian.

The intended relationship is:

```text
Chaining
    ↓
capability MCP
    ↓
result
    ↓
Chaining / Agent
    ↓
Guardian when persistence matters
```

Keep individual MCPs independently usable.

---

# 15. Test Real Cross-MCP Workflows

This is the most important functional validation.

Do not stop at individual MCP smoke tests.

Create reproducible integration scenarios.

## Workflow A — Software development

```text
Guardian
→ restore project context

Chaining
→ decompose task

Filesystem
→ inspect repository

Terminal
→ implement/test

Browser Agent
→ verify web behavior

Guardian
→ persist important decisions/results
```

Verify that the workflow can continue after interruption.

---

## Workflow B — Research

```text
Guardian
→ restore research context

Chaining
→ plan research

Researcher
→ collect information

Filesystem
→ produce artifact

Guardian
→ persist findings
```

---

## Workflow C — UI development

```text
Guardian
→ restore requirements

Chaining
→ coordinate work

Designer
→ design/evaluate

Filesystem
→ implement artifacts

Browser Agent
→ verify result

Guardian
→ record important decisions
```

---

## Workflow D — Android debugging

```text
Guardian
→ restore issue context

Researcher
→ investigate

Terminal
→ inspect/build/debug

scrcpy
→ interact with device

Guardian
→ record findings
```

---

## Workflow E — Multi-agent terminal work

```text
Guardian
→ restore project state

Chaining
→ determine work distribution

Menager
→ control terminal/harness processes

Terminal / Filesystem
→ perform work

Guardian
→ persist results
```

---

## Workflow F — 3D work

```text
Guardian
→ restore scene/project context

Chaining
→ plan task

LL3M
→ operate Blender/3D workflow

Filesystem
→ manage artifacts

Guardian
→ persist important state
```

Each workflow should identify:

* expected starting state
* MCPs involved
* expected outputs
* failure conditions
* recovery behavior
* persistent state expected afterward

---

# 16. Standardize Integration Where It Actually Helps

Do not impose a giant universal response schema on all MCPs.

Only standardize ecosystem-critical information.

Where appropriate, results should make it possible to distinguish:

```text
success
failure
warning
artifact
metadata
truncation
```

For example:

```json
{
  "status": "success",
  "result": {},
  "artifacts": [],
  "warnings": []
}
```

Use native MCP/tool semantics when a common wrapper would add unnecessary complexity.

---

# 17. Control Large Tool Results

Audit:

* Terminal
* Filesystem
* Researcher
* Browser Agent
* Menager
* scrcpy
* LL3M

Look for commands/tools that can return enormous output.

Prefer:

* pagination
* limits
* truncation indicators
* targeted retrieval
* summaries where appropriate

Never silently truncate without telling the agent that truncation occurred.

This is especially important for Chaining because it consumes results from multiple servers.

---

# 18. Standardize Error Behavior

Audit errors across the ecosystem.

Errors should identify:

```text
operation
cause
recoverability
required action
```

Avoid:

* swallowed exceptions
* false success
* giant stack traces in normal agent output
* secrets in errors
* misleading generic failures

Preserve useful diagnostic detail for logs/debug mode.

---

# 19. Security Audit

Perform a concrete security review.

Prioritize:

### Terminal

* command construction
* shell injection
* environment handling
* working-directory validation
* output handling

### Filesystem

* path traversal
* arbitrary path access
* symlinks
* archive extraction
* permissions

### Menager

* PTY input
* process lifecycle
* child-process boundaries
* command injection
* cleanup

### Browser Agent

* credential exposure
* untrusted page content
* downloads
* arbitrary navigation
* browser profile handling

### scrcpy

* device selection
* command construction
* remote/device boundaries

### LL3M

* Blender process execution
* file paths
* external scripts
* generated artifacts

### Ecosystem

* setup scripts
* generated configs
* environment variables
* secrets
* temporary files
* repository checkout behavior

Never log credentials or tokens.

---

# 20. Audit Generated Client Configurations

The ecosystem already generates configurations for supported hosts/clients.

Keep that architecture.

For every supported target verify:

```text
profile
 ↓
MCP selection
 ↓
correct revision/build
 ↓
correct executable
 ↓
correct arguments
 ↓
correct environment
 ↓
valid client configuration
```

Test generated configuration rather than merely inspecting it.

Do not assume all clients use the same schema.

---

# 21. Preserve GUI/Headless Support

Inspect actual requirements from the 10 repositories.

Classify MCPs according to real requirements:

```text
headless-compatible
GUI-compatible
GUI-required
device-required
external-runtime-required
```

Do not hard-code assumptions based on server names.

Profile validation should use these requirements.

When a server cannot be used for the selected target, provide a clear explanation.

---

# 22. Documentation Cleanup

Update documentation only after the implementation is verified.

Recommended structure:

```text
README.md

docs/
├── architecture.md
├── profiles.md
├── installation.md
├── configuration.md
├── workflows.md
├── troubleshooting.md
└── security.md
```

Use existing files where possible instead of creating duplicates.

Documentation must match:

* actual server count
* actual server names
* actual profiles
* actual commands
* actual configuration
* actual supported environments

Remove stale descriptions.

Do not document planned features as if they already exist.

---

# 23. Rewrite the README Around the Actual Product

The first part of the README should immediately communicate:

```text
MCP Ecosystem
```

```text
10 MCPs
2 backbone MCPs
8 specialized capabilities
profile-based deployment
```

Explain:

```text
Chaining
= orchestration

Project Guardian
= persistent project state

Other MCPs
= specialized capabilities
```

Then show profiles.

Then installation.

Then server reference.

Then advanced configuration.

The README should make it possible for a new user to understand the project within a few minutes.

---

# 24. Add Real Workflow Documentation

Document workflows using actual commands and actual MCP capabilities.

Prefer:

```text
"Build a web application"
```

followed by:

```text
Guardian
→ Chaining
→ Designer
→ Filesystem
→ Terminal
→ Browser
→ Guardian
```

over generic descriptions such as:

> "This ecosystem provides powerful development capabilities."

Show what the system actually does.

---

# 25. Ecosystem-Level CI

Add/refine CI around the ecosystem repository.

At minimum validate:

```text
inventory syntax
profile syntax
profile references
revision metadata
generated configurations
scripts
documentation references
```

Where practical, run MCP startup smoke tests.

Do not make normal CI depend on:

* paid APIs
* personal credentials
* physical Android devices
* GUI environments
* proprietary local installations

Use mocks/offline modes where available.

---

# 26. Add an Ecosystem Integration Test Layer

Separate:

```text
unit tests
```

from:

```text
ecosystem integration tests
```

Integration tests should verify that the repositories work together.

Example:

```text
profile
 ↓
configuration
 ↓
Chaining
 ↓
capability discovery
 ↓
tool invocation
 ↓
result
 ↓
Guardian persistence
```

This is more valuable than simply testing that every repository builds.

---

# 27. Use Git Commits for Reproducibility Everywhere

When the ecosystem references an MCP:

```text
repository + commit
```

should be enough to reproduce the implementation.

Avoid references such as:

```text
latest
main
master
```

for production/default reproducible profiles unless there is an explicit development profile intended to track them.

A development profile may intentionally use moving branches, but production/public profiles should remain pinned.

---

# 28. Add a Stable Public Snapshot

Once the refinement is complete, create a known-good ecosystem snapshot.

The snapshot should correspond to:

```text
ecosystem commit
+
10 MCP commits
+
validated profiles
+
validated generated configurations
+
passing integration tests
```

Use this snapshot for:

* release
* demos
* documentation
* website recordings
* troubleshooting
* regression testing

This becomes the reference environment for the public release.

---

# 29. Do Not Over-Engineer Release Management

Do not introduce a package registry.

Do not introduce complicated dependency resolution.

Do not require SemVer across all repositories.

Do not build a custom package manager unless an actual requirement emerges.

The existing model is sufficient:

```text
Git repository
+
exact commit
+
profile
+
generated configuration
=
reproducible MCP stack
```

Keep it simple.

---

# 30. Final Validation Before Publication

Before declaring the ecosystem ready, test from a clean environment.

Test:

```text
fresh installation
fresh profile
existing installation
profile change
update
rollback
configuration generation
doctor
MCP startup
cross-MCP workflow
```

Do this for the most important profiles.

Record:

```text
OS
architecture
runtime versions
profile
ecosystem revision
10 MCP revisions
result
```

Fix every required failure.

Document intentional limitations.

---

# 31. Final Demonstration Phase

After engineering is stable, stop adding architecture.

Use the ecosystem for real work.

Record several complete workflows.

Prioritize workflows that demonstrate multiple MCPs working together.

Recommended recordings:

```text
1. Full software-development workflow
2. Research → artifact workflow
3. UI design → implementation → browser verification
4. Android debugging workflow
5. Multi-agent terminal workflow
6. Blender/3D workflow
```

Record enough context to demonstrate:

```text
project context
→ planning
→ orchestration
→ specialized capability
→ verification
→ persistent state
```

Do not make the recordings look like isolated MCP demos.

The point is to demonstrate the ecosystem.

---

# 32. Build the Dedicated Website From Real Usage

After the recordings are complete, build a dedicated website.

The website is the public front door.

GitHub remains the technical source of truth.

The website should focus on:

```text
What is MCP Ecosystem?
What can it actually do?
Which profile should I use?
How does it work?
Show me.
How do I install it?
Where is the source?
```

Suggested structure:

```text
Home
├── Hero/demo
├── What it is
├── Architecture
├── Profiles
├── Real workflows
├── MCP capabilities
├── Installation
├── Requirements
├── Documentation
└── GitHub
```

Use the real recordings as the primary proof.

Do not create artificial marketing claims.

---

# 33. Website Architecture Explanation

Keep the same model everywhere:

```text
                 AI HOST
                    │
                    ▼
               CHAINING
              ORCHESTRATE
                    │
                    ▼
              GUARDIAN
               REMEMBER
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
    Workspace     Research     Interaction
       │            │            │
   Filesystem    Researcher   Browser
   Terminal                   Designer
   Menager                    scrcpy
                              LL3M
```

The website should make clear that:

* Chaining is not another ordinary capability server
* Guardian is not merely a generic memory server
* the remaining MCPs are specialized capabilities
* profiles compose those capabilities

---

# 34. Publication Strategy

After the stable snapshot and website are ready:

```text
GitHub release
    ↓
website launch
    ↓
demo videos
    ↓
profile examples
    ↓
documentation
    ↓
community usage
    ↓
feedback
```

Do not immediately expand the MCP count.

Instead, use real user feedback to identify weaknesses.

---

# 35. Post-Publication Development Model

After publication, individual MCP repositories can evolve independently.

Example:

```text
Browser Agent
    ↓
new capability/fix
    ↓
Browser Agent commit
    ↓
ecosystem integration test
    ↓
update inventory revision
    ↓
new ecosystem snapshot
```

Same for:

```text
Chaining
Guardian
Terminal
Filesystem
Menager
Researcher
Designer
scrcpy
LL3M
```

The ecosystem should not need architectural changes for ordinary improvements to an individual MCP.

Only update the ecosystem when:

* server metadata changes
* profile composition changes
* configuration changes
* compatibility changes
* integration behavior changes
* a new stable revision needs to be pinned

---

# 36. What Not To Do

Do not:

* add an 11th MCP just for capability count
* merge the 10 repositories
* replace Git commit pins with SemVer dependency management
* rebuild the existing profile system
* duplicate profile logic
* duplicate inventory logic
* turn Chaining into a generic everything-MCP
* turn Guardian into a generic tool router
* force every MCP to depend directly on Guardian
* introduce unnecessary abstractions
* add a framework merely for architectural appearance
* optimize for number of tools
* optimize for number of MCPs
* break independently usable MCP repositories
* hide configuration failures
* claim support for environments that haven't been tested
* build the website before real workflows have been recorded

---

# 37. Definition of Done

The refinement is complete when:

## Architecture

```text
[ ] 10 MCP architecture clearly documented
[ ] Chaining identified as orchestration backbone
[ ] Guardian identified as persistent-state backbone
[ ] 8 capability MCPs clearly classified
```

## Configuration

```text
[ ] Inventory is canonical
[ ] Profiles are validated
[ ] Profile references are correct
[ ] GUI/headless requirements are accurate
[ ] Generated configurations are valid
```

## Reproducibility

```text
[ ] MCP revisions are pinned by commit
[ ] Profiles are reproducible
[ ] Stable ecosystem snapshot exists
[ ] No production profile relies accidentally on moving branches
```

## Operations

```text
[ ] Setup is idempotent
[ ] Update is reliable
[ ] Failure handling is explicit
[ ] Doctor/health checks work
[ ] Partial failures are correctly reported
```

## Integration

```text
[ ] Chaining discovers capabilities
[ ] Chaining can coordinate multiple MCPs
[ ] Guardian persists meaningful project state
[ ] Cross-MCP workflows work
[ ] Large outputs are controlled
[ ] Errors are actionable
```

## Security

```text
[ ] Shell execution audited
[ ] Filesystem access audited
[ ] PTY/process handling audited
[ ] Browser security audited
[ ] Device interaction audited
[ ] Blender execution audited
[ ] Secrets protected
[ ] Generated configs audited
```

## Documentation

```text
[ ] README matches implementation
[ ] Profiles documented
[ ] Installation documented
[ ] Architecture documented
[ ] Workflows documented
[ ] Troubleshooting documented
[ ] Supported environments documented
```

## Release

```text
[ ] Clean-machine installation tested
[ ] Important profiles tested
[ ] Stable snapshot recorded
[ ] Real workflows successfully completed
[ ] Demo recordings captured
[ ] Website can be built from those recordings
```

---

# Final Project Model

The finished ecosystem should remain deliberately simple:

```text
                         MCP ECOSYSTEM
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
           ORCHESTRATION                  STATE
                 │                           │
             CHAINING                   GUARDIAN
                 │                           │
                 └─────────────┬─────────────┘
                               │
                         PROFILE SYSTEM
                               │
               ┌───────────────┼───────────────┐
               │               │               │
           WORKSPACE        KNOWLEDGE       INTERACTION
               │               │               │
        Filesystem         Researcher       Browser
        Terminal                            Designer
        Menager                             scrcpy
                                            LL3M
```

The responsibilities remain:

```text
Chaining
    = orchestrate

Project Guardian
    = remember

8 capability MCPs
    = perform specialized work

Profiles
    = compose the stack

Inventory
    = define what exists

Git commits
    = define exactly what is deployed

Ecosystem repository
    = install + configure + validate + integrate + document

Website
    = demonstrate + explain + onboard
```

Do not optimize for adding more.

Optimize for making these 10 MCPs work together so well that a new user can install a profile, give an agent a real project, and immediately understand why the entire stack exists.

The ultimate lifecycle is:

```text
10 MCPs
   ↓
Refine ecosystem
   ↓
Validate existing profiles
   ↓
Harden installation/configuration
   ↓
Validate Chaining + Guardian backbone
   ↓
Test cross-MCP workflows
   ↓
Security + reliability audit
   ↓
Pin known-good commits
   ↓
Create stable ecosystem snapshot
   ↓
Record real workflows
   ↓
Build dedicated website
   ↓
Public release
   ↓
User adoption
   ↓
Real-world feedback
   ↓
Improve individual MCPs
   ↓
Update ecosystem pins
   ↓
Repeat
```
