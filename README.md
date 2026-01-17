# Cloudflare PM Feedback Analyzer

## Overview
This project is a lightweight **feedback analysis prototype** built using **Cloudflare Workers** and **Cloudflare Workers AI**. It demonstrates how product teams can quickly extract insights from unstructured user feedback using AI, while leveraging Cloudflare’s edge platform for simplicity, performance, and scalability.

The prototype accepts user feedback as input and returns an AI-generated summary that highlights key themes and insights.

---

## Cloudflare Products Used

- **Cloudflare Workers**  
  Provides a serverless, globally distributed execution environment to handle requests with low latency and no infrastructure management.

- **Cloudflare Workers AI**  
  Enables AI inference directly within the Worker via an AI binding, eliminating the need for external AI APIs and reducing latency.

- **Wrangler**  
  Used for local development, environment configuration, and deployment.

---

## Architecture Overview

1. A user submits feedback via an HTTP request.
2. A Cloudflare Worker receives and validates the request.
3. The Worker sends the feedback text to **Workers AI** using a bound model.
4. Workers AI generates a summary or analysis.
5. The Worker returns the result to the client.

This architecture keeps all processing within Cloudflare’s ecosystem, simplifying security, improving performance, and minimizing operational overhead.

---

