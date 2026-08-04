# Profiles

![Blotcat carefully choosing a specific loadout backpack from a rack of different backpacks](../assets/blotcat-profiles.jpg)
Rather than one hardcoded "install everything" stack, the suite is **profile-driven**. A profile is a named subset of servers from the inventory (`config/inventory.json`) chosen for a particular use case and target system. Each target system is classified as:

- **`gui`** — a desktop workstation where GUI/device servers make sense (Blender, scrcpy, headed browser).
- **`headless`** — a server OS / SSH / CI box with no display (no GUI or device servers).

The `system` field on a profile tells the setup tool whether it is appropriate for that target.

## Built-in profiles

Defined in `config/profiles.json`:

| Profile            | System     | Servers                                                              |
| ------------------ | ---------- | -------------------------------------------------------------------- |
| `dev-workspace`    | gui        | chaining, filesystem, guardian, terminal, research, browser, designer |
| `headless-server`  | headless   | chaining, filesystem, guardian, terminal, research                    |
| `research`         | headless   | research, chaining, filesystem                                        |
| `web-devops`       | gui        | browser, filesystem, guardian, chaining, designer                     |
| `android-testing`  | gui        | scrcpy, filesystem, chaining                                          |
| `3d-modeling`      | gui        | ll3m, filesystem, chaining                                            |
| `all`              | any        | every server in `config/inventory.json`                               |

The built-in `all` profile (system `any`) resolves to every server in the inventory. It is effectively the "everything" stack and is the predecessor of the old fixed 6-server config:

```bash
./setup.sh --profile all --client cursor
```

## Creating a custom profile

1. Each server must exist in `config/inventory.json` (name, repo URL, clone dir, build command, GUI/device flags, env vars).
2. Add an entry to the `profiles` array in `config/profiles.json` with an `id`, `name`, `system`, and a `servers` list referencing inventory keys.

## Commands

All scripts accept a scope you can pick interactively, or pass explicitly:

```bash
# Build / test / clean only a subset
./scripts/build-all.sh                     # interactive
./scripts/build-all.sh --profile research
./scripts/test-all.sh --all
./scripts/update.sh chaining-mcp-server filesystem-mcp-server

# Setup a profile non-interactively
TARGET_SYSTEM=gui ./setup.sh --profile dev-workspace --client cursor
./setup.sh --profile headless-server --client claude
```

## Client config generation

`scripts/generate-config.mjs` renders the resolved profile into a client config:

```bash
node scripts/generate-config.mjs research --backend cursor --root /abs/path
node scripts/generate-config.mjs dev-workspace --backend opencode --out /tmp/opencode.json
node scripts/generate-config.mjs all --backend docker
```

`lib.sh` exposes the shared helpers (`profile_ids`, `profile_servers`, `inventory_field`, scope resolution) used by every script, so a new script automatically supports the same `--profile` / `--all` scope flags.
