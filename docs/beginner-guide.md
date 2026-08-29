# Beginner's Guide: How to Use the HeLa MCP Ecosystem

> **Target Audience:** Anyone. No advanced coding, terminal expertise, or system administration experience required. If you can copy and paste a single command, you can set this up in under 3 minutes.

---

## What is the HeLa MCP Ecosystem? (In Plain English)

Think of your AI assistant (like Claude, Cursor, ChatGPT, Gemini, or Antigravity) like a brilliant mind in a room. By default, it can only talk to you.

The **HeLa MCP Ecosystem** gives your AI assistant **hands, tools, and long-term memory** through specialized cellular components:
* **HeLa Genome**: Gives your AI persistent memory so it never forgets your project plans, architectural decisions, or open tasks across chats.
* **HeLa Mitosis**: Helps your AI think step-by-step, brainstorm multiple solutions, and pick the best strategy.
* **HeLa Membrane**: Lets your AI read, create, search, and organize project files on your computer safely.
* **HeLa Nucleus & HeLa Ribosome**: Lets your AI safely run commands and terminal tests for you.
* **HeLa Enzyme**: Allows your AI to search Google and Wikipedia for real-time facts and documentation.
* **HeLa Phenotype**: Helps your AI create color palettes, design tokens, and modern user interfaces.
* **HeLa Cytosol**: Lets your AI open a browser, click buttons, and inspect web pages.
* **HeLa Receptor & HeLa Plastid**: Enables physical Android device control and 3D Blender modeling.

---

## 3-Minute Quick Start

### Step 1: Open Your Terminal
* **macOS**: Press `Cmd + Space`, type `Terminal`, and press `Enter`.
* **Windows**: Open `PowerShell` or `Windows Terminal` (WSL / Ubuntu recommended).
* **Linux**: Press `Ctrl + Alt + T`.

### Step 2: Copy & Run This Command
Paste this command into your terminal and press `Enter`:

```bash
git clone https://github.com/1999AZZAR/mcp-ecosystem.git
cd mcp-ecosystem
./setup.sh
```

---

## Step-by-Step Walkthrough of the Setup Wizard

When you run `./setup.sh`, you will see an interactive menu:

```
[INFO] HeLa MCP Ecosystem setup & configuration
[SUCCESS] Prerequisites OK (Node.js v20.x.x)

[INFO] Available profiles:
  1) Dev Workspace (Full desktop workstation with browser automation)
  2) Headless Server (Core 7 servers - recommended for most users)
  3) Research Terminal (Dedicated research node)
  4) Web Dev + Browser Automation
  5) Android Testing Rig
  6) 3D / Blender Station
  7) All (full inventory)

[QUESTION] Enter profile number (1-7):
```
**Selection:** Type `1` (or `2`) and press `Enter`.

---

### Selecting Your AI App

Next, the wizard will ask which AI application you use:

```
[INFO] Generate MCP client config?
  1) Cursor IDE (~/.cursor/mcp.json)
  2) Claude Desktop / CLI (~/.claude.json)
  3) Antigravity CLI / Gemini (~/.gemini/antigravity-cli/mcp_config.json)
  4) OpenCode (config/opencode.generated.json)
  5) Kilo CLI (~/.config/kilo/config.json)
  6) Zed Editor (~/.config/zed/settings.json)
  7) Codex / ChatGPT (~/.codex/config.toml)
  8) Docker Compose
  9) Skip

[QUESTION] Choice (1-9):
```
**Selection:** Type the number for your AI app (e.g., `1` for Cursor, `2` for Claude) and press `Enter`.

---

### Optional API Keys (Press Enter to Skip)

The wizard will ask if you have any optional API keys:

```
[INFO] Configuring Optional API Keys & Secrets:
  (All keys are optional. Press Enter to skip and use offline fallback mode)
  See docs/keys-and-secrets.md for documentation & sign-up URLs.

[QUESTION] OpenRouter API Key (sk-or-v1-..., optional):
[QUESTION] GitHub Personal Access Token (ghp_..., optional):
[QUESTION] Google API Key (optional):
[QUESTION] Google Custom Search Engine ID (optional):
```

**What to do:**
* **If you have keys:** Paste them in.
* **If you don't have keys:** Just press `Enter` to skip every prompt. The ecosystem will run in 100% offline fallback mode at no cost.

---

## Verifying Your Setup with `doctor`

To verify that your installation is completely healthy, run:

```bash
./setup.sh doctor
```

When everything is ready, you will see a green success confirmation:
```
SUCCESS: All required HeLa MCP servers and dependencies are healthy and ready!
```

---

## Next Steps

1. **Restart your AI app** (Cursor, Claude, Zed, etc.).
2. Ask your AI: *"What MCP tools do you have available?"*
3. Read the **[Workflows Guide](workflows.md)** to see examples of autonomous feature development, research, and design.
