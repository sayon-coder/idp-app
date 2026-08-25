output "cluster_name" {
  description = "EKS cluster name"
  value       = aws_eks_cluster.idp.name
}

output "cluster_endpoint" {
  description = "EKS cluster endpoint"
  value       = aws_eks_cluster.idp.endpoint
}

output "cluster_version" {
  description = "EKS cluster Kubernetes version"
  value       = aws_eks_cluster.idp.version
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.idp_vpc.id
}

output "configure_kubectl" {
  description = "Command to configure kubectl"
  value       = "aws eks update-kubeconfig --region ${var.aws_region} --name ${var.cluster_name}"
}
