# Enterprise Internal Developer Platform (IDP) with GitOps

## Architecture
Developer → GitHub Push → GitHub Actions → GHCR → GitOps Repo → ArgoCD → EKS

## Stack
- **Kubernetes**: AWS EKS (k8s 1.32)
- **IaC**: Terraform
- **GitOps Engine**: ArgoCD
- **Package Manager**: Helm
- **CI/CD**: GitHub Actions
- **Registry**: GitHub Container Registry (GHCR)
- **App**: Node.js + Express

## Repos
- `idp-app` — Application code + CI/CD pipeline
- `idp-gitops` — Helm charts (ArgoCD watches this)

## Setup Instructions

### Prerequisites
- AWS CLI configured
- kubectl, helm, eksctl, argocd CLI installed
- Terraform installed

### 1. Provision EKS Cluster
```bash
cd terraform
terraform init
terraform apply -auto-approve
aws eks update-kubeconfig --region us-east-1 --name idp-cluster
```

### 2. Install ArgoCD
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s
```

### 3. Get ArgoCD Password
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

### 4. Connect GitOps Repo
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443 &
argocd login localhost:8080 --username admin --insecure
argocd repo add https://github.com/sayon-coder/idp-gitops.git
kubectl apply -f argocd-app.yaml
```

### 5. Trigger Pipeline
Push any change to `idp-app` main branch. Pipeline auto-builds, pushes image, updates GitOps repo, ArgoCD deploys within 2 minutes.

## Demo

### Self-Healing
```bash
kubectl delete pod <pod-name>
kubectl get pods -w  # Watch it recreate automatically
```

### End-to-End Flow
1. Edit `app/backend/server.js`
2. `git push origin main`
3. Watch GitHub Actions build and push image
4. ArgoCD auto-syncs new image tag
5. New pods roll out with zero downtime

## Destroy
```bash
cd terraform && terraform destroy -auto-approve
```
