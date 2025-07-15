# 🟩 Node.js Demo API – Assignment-tracesocio

A simple Node.js API server with support for containerization using **Docker**, local orchestration using **Docker Compose**, and production deployment using **Helm** on Kubernetes.

---

## 📦 Features

- Express-based API with request debugging
- Dockerized for easy deployment
- Docker Compose for local development
- Helm chart for Kubernetes deployment
- Ready for CI/CD pipelines

---

## 📁 Project Structure

```
.
├── index.js                # Node.js API entry point
├── Dockerfile              # Docker image instructions
├── docker-compose.yml      # Docker Compose for local orchestration
├── node_app/              # Helm chart for K8s deployment
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       └── ingress.yaml
└── Jenkinsfile            # CI/CD pipeline definition
```

---

## 🚀 Local Development

### ▶️ Start the application

**Prerequisites:**
```bash
npm install 
```

**Run the application:**
```bash
node index.js
```

**Environment Setup:**
Create a `.env` file in the root directory:
```env
PORT=3000
debug=true
HOST=0.0.0.0
```

Open your browser or test with curl:

```bash
curl http://localhost:3000/api
```

---

## 🐳 Docker

### 🔨 Build the Docker image

```bash
docker build -t gautam4424/node_app .
```

### ▶️ Run the container

```bash
docker run -p 3000:3000 --env-file .env gautam4424/node_app 
```

---

## 🐳 Docker Compose

### ▶️ Run with Compose

```bash
docker-compose up --build
```

This will expose the app at `http://localhost:3000/api`

---

## ☸️ Kubernetes Deployment with Helm

### 🧱 Helm Chart Directory Structure

```
node_app/
├── Chart.yaml
├── values.yaml
└── templates/
    ├── deployment.yaml
    ├── service.yaml
    ├── configmap.yaml
    └── ingress.yaml (optional)
```

### 📦 Package & Install with Helm

```bash
# Inside project root
helm install node-app ./node_app
```

**ConfigMap Usage:**
The Helm chart includes a ConfigMap for managing application configuration. You can customize values in `values.yaml`:

```yaml
# values.yaml
config:
  PORT: "3000"
  debug: "true"
  HOST: "0.0.0.0"
  NODE_ENV: "production"
```

**Helm Management Commands:**
```bash
# Upgrade deployment
helm upgrade node-app ./node_app

# Uninstall deployment
helm uninstall node-app

# View deployment status
helm status node-app

# List all releases
helm list
```

**View ConfigMap:**
```bash
kubectl get configmap node-app-config -o yaml
```

### 🚀 Access the Application

**1. Check Service Status:**
```bash
kubectl get svc
```

**2. Get NodePort Details:**
```bash
kubectl get svc node-app -o wide
```

**3. Access the Application:**
The service will be exposed on a NodePort between `30000-32767`. Use the port shown in the output:

```bash
# Example if NodePort is 31234
curl http://localhost:31234/api

# Or test with POST request
curl -X POST http://localhost:31234/api \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

**4. Alternative Access Methods:**
```bash
# Port forwarding (if NodePort is not accessible)
kubectl port-forward svc/node-app 3000:3000
curl http://localhost:3000/api

# Get pod details
kubectl get pods -l app=node-app

# Check pod logs
kubectl logs -l app=node-app
```

---

## 🧪 CI/CD Support

This project supports automated pipelines using Jenkins with the following stages:

1. **Git pull** - Source code checkout
2. **SonarQube analysis** - Code quality scanning
3. **Trivy scan** - Container vulnerability scanning
4. **Docker build & push** - Image creation and registry push
5. **Helm deploy** - Kubernetes deployment

See `Jenkinsfile` for complete pipeline details.

---

## 📬 API Usage Example

**Test the API endpoint:**
```bash
curl http://localhost:3000/api
```

**POST request with JSON body:**
```bash
curl -X POST http://localhost:3000/api \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "age": 30}'
```

**Response Example:**
```
Welcome to our demo API, here are the details of your request:
***Headers***:
host: localhost:3000
user-agent: curl/7.68.0
accept: */*
content-type: application/json
content-length: 26

***Method***:
POST

***Body***:
{
  "name": "John",
  "age": 30
}
```

**Debugging Mode:**
When `debug=true` is set in environment variables, the application will log all HTTP requests using Morgan middleware in development format.

---

## 🧰 Tools & Dependencies

**Node.js Dependencies:**
- **express** - Web framework
- **dotenv** - Environment variable management
- **morgan** - HTTP request logger (optional, for debugging)

**Infrastructure:**
- **Docker** & **Docker Compose**
- **Helm** 3.x
- **Kubernetes** cluster (minikube, k3s, EKS, etc.)
- **Jenkins** (for CI/CD)

---

## 🔐 Environment Variables

| Variable | Description | Default | ConfigMap | Required |
|----------|-------------|---------|-----------|----------|
| `PORT` | Application port | `3000` | ✅ | No |
| `debug` | Enable Morgan logging | `false` | ✅ | No |
| `HOST` | Server bind address | `0.0.0.0` | ✅ | No |
| `NODE_ENV` | Environment mode | `development` | ✅ | No |

**Local Development (.env file):**
```env
PORT=3000
debug=true
HOST=0.0.0.0
```

**Note:** When deployed via Helm, these variables are managed through ConfigMap and can be customized in the `values.yaml` file.

---

## 🙋‍♂️ Author

**Gautam Sachdeva**

