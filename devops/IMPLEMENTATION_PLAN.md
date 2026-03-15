# Implementation Plan - GleWorks DevOps Integration

> Status: this is a proposal/history document, not a source of truth for what currently exists in this repo. Paths and infra files listed below are planned work unless they have been added separately.

I will use your `~/dev/GleWorks` project as the central "Lab Case Study". Instead of generic examples, we will implement the DevOps stack directly for this application.

## Proposed Changes

### [GleWorks Project]

We will create a specific directory for DevOps manifests within the project.

#### [NEW] [k8s-manifests](file:///home/will/dev/GleWorks/k8s)
- Create Deployment, Service, and Ingress manifests for GleWorks.

#### [NEW] [terraform](file:///home/will/dev/GleWorks/terraform)
- Define the local environment infrastructure.

#### [NEW] [kubernetes.nix](file:///etc/nixos/profiles/shared/kubernetes.nix)
- Enable the K3s service in "server" mode.
- Add `kubectl`, `kubernetes-helm`, and `k9s` (a great TUI for k8s) to system packages.
- Configure the `KUBECONFIG` environment variable to point to the K3s config.

#### [NEW] [iac.nix](file:///etc/nixos/profiles/shared/iac.nix)
- Add `ansible`, `terraform`, and `terraform-ls` to system packages.

#### [MODIFY] [think14gryzen.nix](file:///etc/nixos/hosts/personal/think14gryzen.nix)
- Import the new `kubernetes.nix` and `iac.nix` profiles.

### [Shell Configuration]

#### [MODIFY] [base.nix](file:///etc/nixos/home/base.nix)
- Add a shell alias `k = "kubectl"`.

## Verification Plan

### Automated Tests
- None applicable for system setup, but I will verify the service manually.

### Manual Verification
1. **Apply Configuration**: Run `sudo nixos-rebuild switch --flake /etc/nixos#Think14GRyzen`.
2. **Check Service**: Run `systemctl status k3s` to ensure the cluster is running.
3. **Check Nodes**: Run `kubectl get nodes` to see the local node in `Ready` state.
4. **TUI Check**: Run `k9s` to verify the cluster interface.

## Learning Path (Mentor Mode)
Once setup is complete, I will guide you through:
1. **Pods & Deployments**: Running your first container.
2. **Services**: Exposing your app.
3. **ConfigMaps & Secrets**: Managing configuration.
4. **Namespaces**: Organizing your cluster.
