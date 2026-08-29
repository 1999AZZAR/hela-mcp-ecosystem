# Implementation Plan: Milestone 2 — Deterministic Snapshots & Doctor Command

## Phase 1: Ecosystem Snapshot Management (`config/snapshots/`)

- [x] Task: Create `config/snapshots/` directory and define snapshot schema
- [x] Task: Generate `config/snapshots/v1.0.0.json` and `config/snapshots/latest-stable.json` with exact commit hashes from Milestone 1
- [x] Task: Update `scripts/lib.sh` and `setup.sh` to support `--snapshot <tag|file>` flag
- [x] Task: Phase Verification & Checkpoint

---

## Phase 2: Deterministic & Idempotent Installation Engine

- [x] Task: Update `setup_server` in `setup.sh` to checkout exact pinned commit hashes
- [x] Task: Implement idempotency guard: verify commit hash and build artifact timestamps before triggering re-builds
- [x] Task: Add `--dev` flag to track moving `main`/`master` branches for development
- [x] Task: Implement rollback state tracking (`.rollback_state.json`) for safe updates and rollbacks
- [x] Task: Phase Verification & Checkpoint

---

## Phase 3: Comprehensive Diagnostic Engine (`scripts/doctor.sh` & `./setup.sh doctor`)

- [x] Task: Implement `scripts/doctor.sh` with host environment inspection (OS, Node.js >=18, Git, SQLite3)
- [x] Task: Implement server component verification (commit pins, build artifacts, stdio startup smoke check)
- [x] Task: Implement external runtime detectors (`playwright` for Cytosol, `adb` for Receptor, `blender` for Plastid, PTY for Ribosome)
- [x] Task: Implement safe API key status reporting without credential logging
- [x] Task: Integrate `doctor` command into `setup.sh` (`./setup.sh doctor [--profile <id>]`)
- [x] Task: Phase Verification & Checkpoint

---

## Phase 4: Verification, Doctor Testing & CI Matrix Validation

- [x] Task: Run `./setup.sh doctor` and verify formatted output across various profiles
- [x] Task: Test `--snapshot v1.0.0` installation and idempotency on the local environment
- [x] Task: Run pre-commit hooks and update Project Guardian memory
- [x] Task: Phase Verification & Checkpoint
