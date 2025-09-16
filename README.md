# ste-assessment-automation-challenge

This project contains automated end-to-end tests for the **Paylocity Benefits Dashboard** application, implemented with [Playwright](https://playwright.dev/).

---

## 📦 Project Setup

### 1. Clone the repository

```
git clone <repo-url>
cd <your-repo-name>
```


### 2. Install dependencies

Ensure you have Node.js installed (LTS recommended).
Then run:
```
npm ci
```
### 3. Install Playwright browsers
```
npx playwright install --with-deps
```

⚙️ Environment Variables

This project uses environment variables stored in a .env file for credentials and configuration.

Create a .env file in the root directory:
```
# Paylocity Benefits Dashboard Variables
BASE_URL=https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login
USER_NAME=#username_goes_here
PASSWORD=#password_goes_here
```

⚠️ Never commit .env files with real credentials.

▶️ Running Tests Locally
```
npx playwright test
```
Run tests in headed mode (see the browser UI):
```
npx playwright test --headed
```

Run a single test file:
```
npx playwright test src/e2e/tests/addEmployee.spec.ts
```

Open last HTML report:
```
npx playwright show-report
```

⚡ Running Tests in GitHub Actions

This project is integrated with GitHub Actions.
You can run the Playwright test suite on demand from the GitHub UI.
```
Steps:
	1.	Go to the Actions tab in your GitHub repository.
	2.	Select Playwright Tests workflow.
	3.	Click Run workflow → choose the branch → press Run.
	4.	Once finished, download the Playwright report artifact from the workflow summary.
```
⸻

📂 Project Structure

src/
 └── e2e/
     ├── tests/                # Test specs
     ├── pages/                # Page Object Models (LoginPage, BenefitsPage, etc.)
     └── helpers/              # Reusable test helpers
config/
 └── prod.env.ts               # Reads environment variables from .env
playwright.config.ts           # Playwright test configuration
.env                           # Environment variables (ignored in Git)




