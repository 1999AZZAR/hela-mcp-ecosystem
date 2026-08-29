# 🌟 Beginner's Guide: How to Use the MCP Ecosystem

> **Target Audience:** Anyone! No advanced coding, terminal expertise, or system administration experience required. If you can copy and paste a single command, you can set this up in under 3 minutes.

---

## 💡 What is the MCP Ecosystem? (In Plain English)

Think of your AI assistant (like Claude, Cursor, ChatGPT, or Antigravity) like a brilliant mind in a room. By default, it can only talk to you. 

The **MCP Ecosystem** gives your AI assistant **hands, tools, and a long-term memory**:
* 🧠 **Project Guardian**: Gives your AI a persistent memory so it never forgets your project plans, notes, or tasks across chats.
* ⚡ **Chaining MCP**: Helps your AI think step-by-step, brainstorm multiple solutions, and pick the best strategy.
* 📁 **Filesystem**: Lets your AI read, create, search, and organize project files on your computer.
* 🖥️ **Terminal & Menager**: Lets your AI safely run commands and tests for you.
* 🔍 **Researcher**: Allows your AI to search Google and Wikipedia for real-time facts and documentation.
* 🎨 **The Designer**: Helps your AI create color palettes, design tokens, and modern user interfaces.
* 🌐 **Browser Agent**: Lets your AI open a browser, click buttons, and extract web data.

---

## 🚀 3-Minute Quick Start

### Step 1: Open Your Terminal
* **Mac**: Press `Cmd + Space`, type `Terminal`, and press `Enter`.
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

## 🧙 Step-by-Step Walkthrough of the Setup Wizard

When you run `./setup.sh`, you will see a friendly interactive menu. Here is exactly what to pick:

```
[INFO] mcp-ecosystem setup & configuration
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
👉 **What to type:** Type `2` (or `1`) and press `Enter`.

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
👉 **What to type:** Type the number for your AI app (e.g., `1` for Cursor, `2` for Claude) and press `Enter`.

---

### Optional API Keys (Press Enter to Skip!)

The wizard will ask if you have any optional API keys:

```
[INFO] Configuring Optional API Keys & Secrets:
  (All keys are optional. Press Enter to skip and use offline fallback mode)

[QUESTION] OpenRouter API Key (sk-or-v1-..., optional): 
[QUESTION] GitHub Personal Access Token (ghp_..., optional): 
[QUESTION] Google API Key (optional): 
[QUESTION] Google Custom Search Engine ID (optional): 
```
👉 **What to do:** 
* **If you have a key:** Paste it and press `Enter`.
* **If you don't have keys:** **Just press `Enter` on each question!** The system will automatically configure free offline fallback mode.

```
[SUCCESS] Wrote configuration to your AI app!
[SUCCESS] Done. Restart your AI app to start using your new superpowers!
```

---

## 🎯 How to Talk to Your AI to Use the MCP Tools

Once installed, **restart your AI app**. You don't need to learn any complex commands—just chat with your AI naturally!

### 1. Step-by-Step Task Planning & Brainstorming
> **Prompt:** *"I want to build a personal budget tracker web app. Use sequential thinking to analyze the architecture and give me 3 creative feature ideas using brainstorming."*

### 2. Project Memory & Task Tracking
> **Prompt:** *"Create an entity in memory called 'BudgetApp' and record our decision to use SQLite for local data storage."*

### 3. Research & Documentation
> **Prompt:** *"Search Wikipedia for best practices on REST API authentication and summarize the key security principles."*

### 4. UI/UX Design & Color Palettes
> **Prompt:** *"Generate an emerald green color palette with design tokens and Tailwind CSS classes for a modern financial dashboard."*

### 5. File & Project Operations
> **Prompt:** *"Search our project folder for all configuration files and summarize what each one does."*

---

## ❓ Frequently Asked Questions (FAQ)

### Do I need to pay for any API keys?
**No.** All servers work 100% offline without any paid subscriptions or credit cards:
* If you don't have an OpenRouter key, routing uses smart local heuristics.
* If you don't have a GitHub token, prompt guides load from the bundled local library.
* If you don't have a Google API key, research uses free Wikipedia search.

### How do I change my settings or add an API key later?
You never need to edit configuration files manually! Just open your terminal and run:
```bash
cd mcp-ecosystem
./setup.sh --reconfigure
```
This opens the configuration wizard instantly without re-downloading anything.

### How do I get the latest updates?
Run this single command whenever you want to update all servers:
```bash
cd mcp-ecosystem
./update.sh --all --test
```

### What if my AI app doesn't see the tools?
1. Make sure you completely quit and restart your AI app (e.g. Cursor or Claude Desktop).
2. Check your app's Settings -> MCP section to verify that the server lights are green.
3. If you run into any trouble, check our [Troubleshooting Guide](troubleshooting.md).
