const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IDP Platform</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #0f172a;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container { max-width: 800px; width: 90%; padding: 2rem; }
    .header { text-align: center; margin-bottom: 3rem; }
    .header h1 { font-size: 2.5rem; color: #60a5fa; margin-bottom: 0.5rem; }
    .header p { color: #94a3b8; font-size: 1.1rem; }
    .badge {
      display: inline-block;
      background: #22c55e;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      margin-top: 1rem;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 1.5rem;
    }
    .card h3 { color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
    .card p { font-size: 1.25rem; font-weight: 600; color: #f1f5f9; }
    .card .icon { font-size: 2rem; margin-bottom: 0.75rem; }
    .pipeline {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .pipeline h2 { color: #60a5fa; margin-bottom: 1.25rem; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .steps {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .step {
      background: #0f172a;
      border: 1px solid #475569;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
      color: #cbd5e1;
    }
    .arrow { color: #60a5fa; font-weight: bold; }
    .footer { text-align: center; color: #475569; font-size: 0.85rem; margin-top: 2rem; }
    .footer a { color: #60a5fa; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Internal Developer Platform</h1>
      <p>Built by Sayon Biswas — GitOps on AWS EKS</p>
      <span class="badge">● LIVE</span>
    </div>

    <div class="cards">
      <div class="card">
        <div class="icon">☸️</div>
        <h3>Orchestration</h3>
        <p>AWS EKS</p>
      </div>
      <div class="card">
        <div class="icon">🔄</div>
        <h3>GitOps Engine</h3>
        <p>ArgoCD</p>
      </div>
      <div class="card">
        <div class="icon">⚙️</div>
        <h3>CI/CD</h3>
        <p>GitHub Actions</p>
      </div>
      <div class="card">
        <div class="icon">📦</div>
        <h3>Version</h3>
        <p>${process.env.APP_VERSION || '1.0.0'}</p>
      </div>
      <div class="card">
        <div class="icon">🌍</div>
        <h3>Environment</h3>
        <p>${process.env.NODE_ENV || 'production'}</p>
      </div>
      <div class="card">
        <div class="icon">✅</div>
        <h3>Status</h3>
        <p style="color:#22c55e">Healthy</p>
      </div>
    </div>

    <div class="pipeline">
      <h2>⚡ Deployment Pipeline</h2>
      <div class="steps">
        <div class="step">👨‍💻 Code Push</div>
        <span class="arrow">→</span>
        <div class="step">🔧 GitHub Actions</div>
        <span class="arrow">→</span>
        <div class="step">🐳 Docker Build</div>
        <span class="arrow">→</span>
        <div class="step">📦 GHCR</div>
        <span class="arrow">→</span>
        <div class="step">🔄 ArgoCD Sync</div>
        <span class="arrow">→</span>
        <div class="step">☸️ EKS Deploy</div>
      </div>
    </div>

    <div class="footer">
      Built by <a href="https://github.com/sayon-coder">Sayon Biswas</a> •
      <a href="https://github.com/sayon-coder/idp-app">GitHub</a> •
      Infrastructure as Code with Terraform
    </div>
  </div>
</body>
</html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'IDP Platform API',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
