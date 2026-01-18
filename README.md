# Urban Life Optimizer @ nwHacks 2026

**Authors:** Mu Ye, Sakura, Natalia, Annaliese

## Inspiration

City dwellers are caught between long commutes and rising living costs. Moving closer to work saves time but costs more. Urban Life Optimizer helps users find the balance—a lifestyle that's both financially sustainable and mitigates burnout.

## What It Does

Users input their location, workplace, dependents, commute, and finances. The app analyzes these against real local data and returns actionable recommendations to reduce stress and optimize expenses.

## How We Built It

- **Frontend:** React
- **Backend:** Express.js server calling Gemini AI API
- **Data:** Static JSON knowledge base loaded at startup

## My Contribution: Backend & Knowledge Base

I built the backend data pipeline that grounds LLM responses in real local data using a multi-file JSON knowledge base — a RAG-inspired design that reduces hallucination by injecting authoritative local context into the prompt.

### Static Knowledge Base

| Dataset | Source |
|---------|--------|
| Rental prices by postal code | CMHC |
| Schools | City of Vancouver Open Data |
| Off-leash dog parks | City of Vancouver Open Data |
| SkyTrain stations | City of Vancouver Open Data |

### Retrieval Pipeline

1. Filter rent data by user's postal code prefix
2. Map CMHC neighbourhood names → City of Vancouver `geo_local_area` values (manual mapping required—datasets use incompatible boundaries)
3. Filter schools, dog parks, and SkyTrain stations by resolved areas
4. Conditionally include data (schools only if user has children, dog parks only if user has a dog)

### Prompt Design

- Enforced structured JSON output with strict field constraints
- Required citation of data sources
- Added fallback rules for areas outside dataset coverage

## Challenges

- **Prompt tuning:** Initial outputs referenced raw JSON keys and hallucinated data. Fixed through iterative rule additions.
- **Data integration:** CMHC and City of Vancouver use different geographic boundaries. Solved with manual neighbourhood mapping.

## What's Next

- Visual output (maps, charts)
- Expanded coverage beyond Vancouver
- Replace manual mapping with geocoding/spatial joins

<img width="3200" height="1632" alt="dataform" src="https://github.com/user-attachments/assets/92dd59da-d271-4c54-a8cd-51ab4773354b" />

<img width="3200" height="1504" alt="output" src="https://github.com/user-attachments/assets/7c875070-1b03-4304-8dbd-31af5a16c83c" />
note: zoom changed in the above image in order to screen capture more output for illustrative purposes, original is scrollable
