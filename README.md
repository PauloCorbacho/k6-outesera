# K6 Performance Test Suite

A complete load testing solution using K6 with GitHub Actions integration.

## 📌 Prerequisites

Before running tests, you must install:
- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **k6** (v0.50+) - *Not an npm package!*

## 🚀 Getting Started

### 1. Install k6 (Required)

#### Windows (PowerShell):
```powershell
# Method 1: MSI installer (recommended)
irm https://github.com/grafana/k6/releases/download/v0.50.0/k6-v0.50.0-x64.msi -OutFile k6-installer.msi
Start-Process msiexec.exe -Wait -ArgumentList "/i k6-installer.msi /quiet"
Remove-Item k6-installer.msi

# Method 2: Winget (Windows 11)
winget install k6

# Run main test
k6 run src/tests/load/load_test.js
```

## Project Structure
- `src/tests/`: Test scripts
- `src/services/`: API service classes
- `src/utils/`: Configuration files
- `results/`: Test outputs (not versioned)

## Configuration
Edit `src/utils/config.js` to adjust:
- API endpoints
- Performance thresholds
- Test parameters

## Features
- REST API testing (CRUD operations)
- Multiple service classes
- HTML and JSON reporting
- CI/CD integration

## GitHub Actions
Tests automatically run on:
- Push to main branch
- Pull requests
