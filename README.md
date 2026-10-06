# EMI Calculator

A web-based loan EMI calculator built with React, Vite and TypeScript.

Drag the sliders (or type into the boxes next to them) to set:

- **Loan amount**: ₹10,000 – ₹1 crore, in steps of ₹10,000
- **Tenure**: 1 – 30 years
- **Interest rate**: 5% – 50% p.a., in steps of 0.1%

The page shows the monthly EMI, total interest and total payment, plus a month-by-month repayment
schedule (EMI, interest, principal, loan paid, loan remaining) that updates as you move the sliders.

## Run locally

```sh
npm install
npm run dev      # start the dev server
npm test         # run the EMI maths unit tests
npm run build    # production build into dist/
```

## Deployment

Every push to `main` builds the app and deploys it to GitHub Pages via
`.github/workflows/deploy.yml`: https://sandeeppatro.github.io/EMICalculator/
