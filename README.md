
https://github.com/user-attachments/assets/f8cf8a84-cbb1-47ce-911b-364db4b7de4d

# 📚 The EpicBook – Production-Style DevOps Deployment on Azure

A fully containerized, production-style full-stack application deployed on Azure using Docker, Terraform, Ansible, and Nginx reverse proxy with CI/CD principles and infrastructure-as-code practices.

---


## 🚀 Project Overview

**The EpicBook** is a cloud-native web application deployed using a complete DevOps lifecycle approach.

This project demonstrates:
- Infrastructure provisioning with **Terraform**
- Configuration management with **Ansible**
- Containerization with **Docker**
- Reverse proxy routing using **Nginx**
- CI/CD automation concepts (optional integration)
- Cloud deployment on **Azure VM**
- Persistent storage with **MySQL volumes**

The system is designed with production-grade principles such as:
- Health checks
- Service dependency management
- Network segmentation
- Secure environment variable handling
- Reverse proxy isolation

---

## 🏗️ Architecture

```

User → Nginx Reverse Proxy → Node.js App → MySQL Database
│
Docker Compose Network
│
Persistent Volumes (DB + Logs)

```

### Core Components:
- **Frontend/UI** → Served via Node.js application
- **Backend API** → Handles business logic and database communication
- **Database** → MySQL 8.0 with persistent storage
- **Reverse Proxy** → Nginx routing `/` and `/api` traffic

---

## ⚙️ Tech Stack

- **Cloud**: Azure VM (Ubuntu)
- **Infrastructure as Code**: Terraform
- **Configuration Management**: Ansible
- **Containerization**: Docker & Docker Compose
- **Web Server / Proxy**: Nginx
- **Database**: MySQL 8.0
- **Runtime**: Node.js (Express)

---

## 📦 Project Structure

```

theepicbook/
│
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── .env
│
├── db/
│   ├── schema.sql
│   ├── seed.sql
│
├── app/
│   ├── backend/
│   ├── frontend/
│
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│
├── ansible/
│   ├── playbook.yml
│   ├── inventory
│
└── docs/
├── architecture.png

````

---

## 🐳 Docker Architecture

### Services:

### 1. Database (MySQL 8.0)
- Persistent volume: `db_data`
- Health-checked
- Initialized with schema + seed data

### 2. Backend App (Node.js)
- Built using multi-stage Dockerfile
- Connected to MySQL via internal network
- Exposes API endpoints

### 3. Nginx Reverse Proxy
- Routes:
  - `/` → frontend app
  - `/api` → backend service
- Logs persisted via volume mount

---

## 🔁 Reverse Proxy Routing

| Route | Service |
|------|--------|
| `/` | Frontend App |
| `/api` | Backend API |

Nginx ensures:
- No direct DB exposure
- Clean separation of concerns
- Load distribution-ready architecture

---

## 🔐 Environment Variables

All secrets are managed via `.env` file:

```env
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=bookstore
MYSQL_USER=mysqladmin
MYSQL_PASSWORD=StrongPassword123!
JAWSDB_URL=mysql://mysqladmin:password@db:3306/bookstore
````

⚠️ No secrets are hardcoded in images or Git history.

---

## 🧠 Key Features

* Multi-stage Docker builds (optimized images)
* Service health checks (DB + App)
* Restart policies for resilience
* Named Docker networks (frontend/backend isolation)
* Persistent MySQL storage
* Reverse proxy abstraction layer
* Production-style environment separation

---

## 🚀 Deployment Steps

### 1. Clone Repository

```bash
git clone https://github.com/orjimiracle/Epicbook-Docker.git
cd theepicbook
```

### 2. Start Services

```bash
docker compose up -d --build
```

### 3. Verify Running Containers

```bash
docker compose ps
```

### 4. Access Application

```
http://<YOUR_AZURE_VM_PUBLIC_IP>
```

---

## 🩺 Health Checks

* MySQL: `mysqladmin ping`
* Backend: `/health`
* Frontend: `/`

Ensures service readiness before traffic routing.

---

## ⚠️ Challenges Faced & Solutions

### 1. MySQL Version Conflict

* Issue: Old volume incompatible with upgraded MySQL version
* Fix: Upgraded to MySQL 8.0 and reinitialized volume

### 2. Service Startup Order

* Issue: Backend started before DB was ready
* Fix: Added `depends_on` with health checks + increased DB start period

### 3. Reverse Proxy Routing Issues

* Issue: API endpoints not resolving externally
* Fix: Corrected Nginx upstream configuration and Docker DNS resolution

---

## 📊 What I Learned

* Designing multi-service architectures with Docker Compose
* Importance of service orchestration in distributed systems
* How reverse proxies abstract backend complexity
* Real-world issues with database persistence and versioning
* Cloud VM deployment workflows using Infrastructure as Code
* Debugging container networking and DNS resolution

---

## 🔐 Security Practices Applied

* No direct database exposure to public network
* Internal Docker networks for service communication
* Environment-based secret management
* Reverse proxy as single entry point
* Minimal base images (security + performance optimization)

---

## 🌍 Future Improvements

* Add CI/CD pipeline (GitHub Actions / Azure DevOps)
* Implement HTTPS with Let’s Encrypt
* Add centralized logging (ELK stack)
* Introduce Kubernetes migration
* Add monitoring (Prometheus + Grafana)

---

## 👨‍💻 Author

**Orji, Ekeoma Miracle**
DevOps / Cloud & Security Engineer
Focus: DevSecOps | Cloud Infrastructure | Automation | Kubernetes

---

## 📜 License

This project is open-source for learning and portfolio purposes.

---

## ⭐ Acknowledgement

Built as part of a hands-on DevOps learning journey focused on production-grade system design, cloud deployment, and infrastructure automation.

```



