# TDC Matchmaker Dashboard MVP

Internal dashboard MVP for The Date Crew matchmakers, built by Yaduraj Singh.

## Live Link

https://tdc-matchmaker-dashboard-yaduraj.regal-leaf-3985.chatgpt.site

## Sample Login

- Username: `yaduraj`
- Password: `tdc123`

## Tech Choices

The MVP uses React with Vite because the assignment is mostly a fast, interactive internal dashboard: login, customer list, biodata detail, notes, and match actions. Data is static and generated locally, which keeps the app easy to review and deploy while still loading 120 dummy matchmaking profiles. Styling is plain CSS with lucide-react icons for a lightweight, professional interface.

## Matching Logic

The match engine filters for opposite-gender candidates and ranks them with gender-specific rules. For male customers, it follows the requested criteria: younger, lower income, shorter height, and aligned views on children. For female customers, it uses broader compatibility signals researched from dating and Indian matrimonial products: life stage, profession or education overlap, relocation flexibility, values, city, religion, diet, and pets.

## AI Usage and Assumptions

The MVP includes an AI-style ranking and explanation layer that labels each match, explains the fit, and generates a short personalized intro for the mock email flow. It is deterministic for demo reliability and does not require an OpenAI API key; in production, the same structured match context can be sent to an LLM to generate richer intros and matchmaker-facing rationale. Additional Indian matchmaking fields included are diet, family type, Manglik status, interests, and values.
