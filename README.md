# K6 Performance Test Suite

A complete load testing solution using K6 with GitHub Actions integration.

## Getting Started

```bash
# Install dependencies (if needed)
npm install

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