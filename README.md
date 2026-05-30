# StackHeal 🚑 

**The Developer's Urgent Care.** StackHeal is a zero-bloat, edge-deployed troubleshooting hub designed for modern web developers. It provides immediate, pure-code cures for the most frustrating deployment, SSR, and framework errors across Next.js, React, Vercel, and Prisma.

![StackHeal Architecture](https://img.shields.io/badge/Architecture-Vanilla_First-38bdf8?style=flat-square)
![Analytics](https://img.shields.io/badge/Analytics-Cloudflare_Privacy-f58220?style=flat-square)
![Hosting](https://img.shields.io/badge/Hosting-Vercel_Edge-000000?style=flat-square)

---

## ⚡ Core Philosophy: Zero-Bloat

When a developer's production build crashes, they don't want to read a 15-minute SEO recipe blog. They need the exact terminal error (The Symptom) and the exact code snippet to fix it (The Cure). 

StackHeal is built on a strict **Vanilla-First** architecture:
- **No heavy frontend frameworks:** Pure HTML, CSS (Glassmorphism), and Vanilla JavaScript.
- **No cookie banners:** Uses Cloudflare Web Analytics for 100% cookie-less, GDPR-compliant edge tracking.
- **Generative Engine Optimization (GEO):** Every article includes a dedicated `llms.txt` file optimized for AI crawlers (OpenAI, Anthropic, Gemini) to consume without DOM overhead.
- **Clean URLs:** Managed strictly via `vercel.json` edge routing.

---

## 🛠 Features

* **Real-time Edge Search:** Instant, client-side filtering using Vanilla JS.
* **AI-Ready Feeds:** Root and article-level `llms.txt` files for LLM ingestion.
* **Copy as Markdown:** One-click clipboard functionality that formats the Symptom and Cure into clean Markdown for developer notes.
* **Developer Logs:** A CSP-safe, serverless comment engine protected by Cloudflare Turnstile.
* **SEO Optimized:** Rich JSON-LD structured data, automatic `.html` stripping, and strict canonical URLs.

---

## 📂 Project Structure

```text
├── index.html                  # Main search hub & directory
├── sitemap.xml                 # Search engine map
├── robots.txt                  # Crawler instructions
├── vercel.json                 # Edge routing, clean URLs & security headers
├── llms.txt                    # Master AI directory map
├── css/
│   ├── variables.css           # Global theme & colors
│   ├── glassmorphism.css       # Core UI styling
│   └── code-blocks.css         # Syntax highlighting styles
├── js/
│   ├── theme.js                # Dark mode logic
│   └── code-copy.js            # Markdown clipboard logic
└── blog/
    ├── fix-cors-vercel/        # Article directories...
    │   ├── index.html          # UI optimized for humans
    │   └── llms.txt            # Markdown optimized for AI
    └── fix-hydration-failed-nextjs/
```

---

## 🚀 Local Development

Because StackHeal is pure Vanilla HTML/JS, you don't need a heavy build step or `npm install` for the frontend.

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/stackheal.git](https://github.com/yourusername/stackheal.git)
   cd stackheal
   ```

2. Serve it locally using any static server. For example, using Python or npx:
   ```bash
   # Using npx
   npx serve .
   
   # Or using Python
   python3 -m http.server 3000
   ```

3. Open `http://localhost:3000` in your browser.

---

## 📝 How to Add a New Article

To maintain the architecture and SEO/GEO integrity, follow these steps when adding a new "Symptom & Cure":

1. Create a new folder in `/blog/` with a descriptive, URL-friendly name (e.g., `/blog/fix-new-error/`).
2. Copy the `index.html` template from an existing post.
3. Update the metadata (`<title>`, `<meta>`, canonical URLs, JSON-LD).
4. Write the **Symptom**, **Cure**, and **Breakdown** sections.
5. Create an `llms.txt` file in the same directory containing the raw Markdown equivalent of the solution.
6. Add the new directory path to the root `/sitemap.xml` and root `/llms.txt`.
7. Add the HTML card to the grid in `/index.html`.

---

## ☁️ Deployment

This project is optimized specifically for **Vercel**. 

1. Push your code to GitHub.
2. Import the repository into your Vercel Dashboard.
3. Vercel will automatically detect the static architecture. The `vercel.json` file will automatically handle:
   - Stripping `.html` extensions.
   - Enforcing `308 Permanent Redirects` for clean URLs.
   - Injecting security headers (`X-Frame-Options`, `X-Content-Type-Options`).
4. Click **Deploy**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Built to keep the internet fast and developers sane.
