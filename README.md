# Cloudflare PM Feedback Analyzer

**Cloudflare Product Manager Intern Assignment**  
**Candidate:** Kabir Chaudhry  

- **Live Prototype:** https://feedback-analyzer.kabir-projects.workers.dev  
- **GitHub Repository:** https://github.com/kabirc04/Cloudflare-PM-feedback-analyzer  

---

## Overview
To solve the challenge of **noisy, unstructured user feedback**, I built an automated intelligence pipeline that transforms raw feedback into actionable product insights in seconds.  

The core goal of this project was to **minimize Time to Value** for product managers by leveraging the **Cloudflare Developer Platform** to handle ingestion, AI-powered analysis, and persistent storage — all at the edge.

---

## Architecture Overview

### Products Used

- **Cloudflare Workers**  
  Used as the central orchestrator to handle HTTP requests, validate inputs, and route data between AI services and storage.

- **Cloudflare Workers AI (Llama 3.1)**  
  Integrated to perform instant sentiment analysis and categorization of feedback into **Bug**, **Praise**, or **Feature** — automating a task that typically requires significant manual PM effort.

- **Cloudflare D1 (SQL Database)**  
  Used to persist analyzed feedback entries for long-term trend analysis and reporting.  
  I chose **D1 over KV** because product analysis requires **relational queries** (e.g., “Show me all high-priority bugs from Tuesday”), which benefit from structured SQL schemas.

### High-Level Flow

1. A user submits feedback via an HTTP request.
2. A Cloudflare Worker receives and validates the input.
3. The Worker sends the feedback text to Workers AI for categorization.
4. The result is stored in a D1 table for future querying and analysis.
5. The categorized feedback is returned to the client.

This architecture keeps all processing within Cloudflare’s ecosystem, reducing latency, simplifying security, and minimizing operational overhead.

---

## Vibe-Coding Context 

I used **Claude 3.5 Sonnet** as my vibe-coding partner.

**Primary Prompt:**  
> “Act as a Cloudflare Engineer. Write a Worker that takes a URL parameter `text`, sends it to Workers AI for categorization into Bug, Praise, or Feature, and stores the result in a D1 table named `feedback`.”

This approach allowed me to iterate quickly on logic while focusing my own effort on product design and developer experience evaluation.

---

## Final Recommendation

Working in the **Cloudflare Dashboard** felt magical — the interface proactively guided me toward success. In contrast, the CLI frequently stalled momentum due to manual configuration requirements.

If Cloudflare can bring the CLI experience closer to the Dashboard—by auto-detecting bindings, validating configs, and offering schema initialization—the gap between a great idea and a globally deployed application would virtually disappear.
