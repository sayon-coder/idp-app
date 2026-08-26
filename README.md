# 🚀 Enterprise Internal Developer Platform (IDP) with GitOps

![CI/CD](https://github.com/sayon-coder/idp-app/actions/workflows/ci-cd.yml/badge.svg)
![Kubernetes](https://img.shields.io/badge/Kubernetes-1.32-326CE5?logo=kubernetes&logoColor=white)
![ArgoCD](https://img.shields.io/badge/ArgoCD-v3.5-EF7B4D?logo=argo&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-v1.15-7B42BC?logo=terraform&logoColor=white)
![AWS EKS](https://img.shields.io/badge/AWS-EKS-FF9900?logo=amazonaws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)

> **Developer pushes code → App deploys automatically to Kubernetes. No manual steps. Ever.**

This project implements the Spotify/Airbnb-style platform engineering pattern where developers self-serve deployments without touching Kubernetes directly.

---

## 🏗️ Architecture

\`\`\`
Developer → GitHub Push → GitHub Actions → Docker Build → GHCR
                                                              ↓
                                         ArgoCD ← GitOps Repo (Helm charts)
                                              ↓
                                         AWS EKS Cluster
                                         (Self-healing pods)
\`\`\`

---

## ⚡ How It Works

1. **Developer pushes code** to \`idp-app\` GitHub repo
2. **GitHub Actions** automatically:
   - Runs tests
   - Builds Docker image
   - Pushes to GitHub Container Registry (GHCR)
   - Updates image tag in \`idp-gitops\` repo
3. **ArgoCD** detects the change in \`idp-gitops\` and deploys within **2 minutes**
4. **Zero manual intervention** — Git is the single source of truth

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Cloud | AWS |
| Kubernetes | EKS (k8s 1.32) |
| Infrastructure as Code | Terraform |
| GitOps Engine | ArgoCD v3.5 |
| Package Manager | Helm |
| CI/CD | GitHub Actions |
| Container Registry | GHCR |
| App | Node.js + Express |

---

## 📁 Repository Structure

\`\`\`
idp-app/                          idp-gitops/
├── .github/workflows/            └── charts/
│   └── ci-cd.yml                     └── idp-app/
├── app/backend/                          ├── Chart.yaml
│   ├── server.js                         ├── values.yaml
│   └── package.json                      └── templates/
├── terraform/                                ├── deployment.yaml
│   ├── main.tf                               └── service.yaml
│   ├── variables.tf
│   ├── outputs.tf
│   └── versions.tf
└── Dockerfile
\`\`\`

---

## 🚀 Setup Instructions

### Prerequisites
\`\`\`bash
aws cli      # configured with IAM credentials
terraform    # v1.15+
kubectl      # v1.36+
helm         # v3.21+
eksctl       # v0.230+
argocd       # v3.5+
\`\`\`

### 1. Clone both repos
\`\`\`bash
git clone https://github.com/sayon-coder/idp-app.git
git clone https://github.com/sayon-coder/idp-gitops.git
\`\`\`

### 2. Provision EKS Cluster
\`\`\`bash
cd idp-app/terraform
terraform init
terraform apply -auto-approve
aws eks update-kubeconfig --region us-east-1 --name idp-cluster
kubectl get nodes
\`\`\`

### 3. Install ArgoCD
\`\`\`bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s
\`\`\`

### 4. Connect ArgoCD to GitOps Repo
\`\`\`bash
kubectl port-forward svc/argocd-server -n argocd 8080:443 &
PASS=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d)
argocd login localhost:8080 --username admin --password \$PASS --insecure
argocd repo add https://github.com/sayon-coder/idp-gitops.git
kubectl apply -f idp-gitops/argocd-app.yaml
\`\`\`

### 5. Trigger First Deployment
\`\`\`bash
git commit --allow-empty -m "trigger: initial deploy"
git push origin main
\`\`\`

---

## 🎬 Demo

### Self-Healing Demo
\`\`\`bash
kubectl delete pod <pod-name>
kubectl get pods -w
# New pod appears within 40 seconds automatically
\`\`\`

---

## 💰 Cost Management
\`\`\`bash
# Destroy when not in use
cd terraform && terraform destroy -auto-approve

# Recreate when needed (15 minutes)
terraform apply -auto-approve
\`\`\`

---

## 🎤 Interview Story

> *"I built an Internal Developer Platform where developers just push code to GitHub. GitHub Actions builds the Docker image, pushes to GHCR, and updates the GitOps repo. ArgoCD deploys to EKS within 2 minutes — zero manual steps. If anyone manually changes the cluster, ArgoCD reverts it. I demonstrated self-healing by deleting a pod and watching it recreate in 40 seconds."*

---

Built by [Sayon Biswas](https://github.com/sayon-coder) · Terraform · ArgoCD · AWS EKS
