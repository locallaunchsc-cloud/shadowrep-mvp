# ShadowRep MVP

ShadowRep lets Solana users prove wallet-based reputation without publicly exposing their wallet.

This starter repo is a working product skeleton, not a production privacy system yet. It uses mock wallet analytics so you can build the UX first, then swap in Helius / Birdeye / Jupiter / Range / SAS later.

## What is included

- Next.js 14 App Router + TypeScript
- Tailwind UI with a dark, privacy-focused aesthetic
- Solana wallet adapter (Phantom, Solflare)
- Mock Solana wallet analytics (deterministic per address)
- Reputation scoring engine + badge eligibility
- Hidden-wallet proof generation using HMAC signatures
- Shareable reputation card route that hides the wallet address
- Private gate builder and verification flow
- Prisma schema kept for future persistence — **not required to run the demo**

## Core pages

- `/` — landing page
- `/dashboard` — connect a Solana wallet and generate a ShadowRep
- `/gates` — create a demo private gate
- `/verify/[gateId]` — verify against a private gate (qualified / not qualified)
- `/card/[proofId]` — public hidden-wallet proof card

## Core API routes

- `POST /api/analyze` — analyze wallet + create reputation proof
- `POST /api/verify` — evaluate a wallet against gate requirements
- `GET  /api/proofs/[proofId]` — fetch a stored proof for the share card
- `GET  /api/gates`, `POST /api/gates`, `GET /api/gates/[gateId]` — manage gates

## Deploying to Vercel

The MVP is designed to deploy to Vercel **without** any database setup. All wallet data is mocked and all proofs / gates are stored in-memory per serverless instance.

### Step-by-step

1. **Push to GitHub.** Create a new GitHub repo, then:

   ```bash
   git init
   git add .
   git commit -m "ShadowRep MVP initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/shadowrep-mvp.git
   git push -u origin main
   ```

2. **Import to Vercel.** Go to [vercel.com/new](https://vercel.com/new), pick the GitHub repo, and import it.

3. **Framework preset.** Vercel should auto-detect **Next.js**. Leave the default build command (`next build`) and output settings alone.

4. **Environment variables.** Add the following under *Project Settings → Environment Variables*:

   | Key | Value | Required? |
   |---|---|---|
   | `SHADOWREP_ISSUER_SECRET` | `openssl rand -hex 32` output | Recommended |
   | `HELIUS_API_KEY` | free key from [helius.dev](https://helius.dev) | Optional — enables LIVE on-chain data |
   | `NEXT_PUBLIC_APP_URL` | your Vercel domain (e.g. `https://shadowrep.vercel.app`) | Optional |

   `DATABASE_URL` is **not** required — nothing reads it in the demo build.

   **About `HELIUS_API_KEY`:** when set, `/api/analyze` reads real mainnet activity (tx count, wallet age, swap protocols) via Helius. When unset, the app uses deterministic mock data so the demo still works. The reputation card shows a green "Live on-chain data via Helius" pill when Helius is active, and an amber "Demo data (mock)" pill otherwise.

5. **Deploy.** Click Deploy. The first build runs `npm install` then `next build`. No Prisma migrations, no DB.

6. **Test.**
   - Open the deployed URL.
   - Connect Phantom or Solflare on `/dashboard` (mainnet RPC).
   - Click *Analyze Wallet* → a reputation card appears with badges.
   - Click *Open share card* → the public hidden-wallet card renders.
   - Build a gate on `/gates`, open the verify link, click *Verify Privately*.

### Caveats of the demo deploy

- Proofs and gates live in serverless function memory. Two requests can hit different lambda instances, so a generated share card may show "could not be loaded" if a different cold instance handles the read. This is fine for demoing the flow; wire Prisma + Postgres / Neon when you need persistence.
- Wallet analytics are **mocked** in `lib/walletAnalytics.ts` — the same wallet address always returns the same fake snapshot.
- The proof signature uses HMAC. It's selective disclosure, **not** zero-knowledge.

## Local setup (optional)

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

You do **not** need to run `prisma generate` or set up a database to run the demo.

## Architecture

```
/app
  /api/analyze         POST  → wallet analytics + proof issuance
  /api/verify          POST  → gate evaluation
  /api/proofs/[id]     GET   → fetch proof for share card
  /api/gates           GET/POST
  /api/gates/[id]      GET
  /card/[proofId]      public hidden-wallet card
  /dashboard           wallet connect + analyze
  /gates               gate builder
  /verify/[gateId]     verification UI
/components            Navbar, WalletButton, WalletProviders, ReputationCard
/lib
  walletAnalytics.ts   mock analytics (swap with Helius / Birdeye later)
  scoring.ts           score + badge engine
  proofs.ts            HMAC-signed hidden-wallet proofs
  gates.ts             gate evaluation logic
  hash.ts              sha256 wallet hash (never store raw addresses)
  store.ts             in-memory store for proofs + gates
  types.ts             shared types
/prisma/schema.prisma  reference schema for future persistence
```

## Privacy posture

- Raw wallet addresses are **never persisted**. Only `sha256(walletAddress)` is stored in snapshots, proofs, and gate evaluations.
- Share cards display the wallet hash, the score, the tier, and badge names — never the public key.
- Gate verification returns a yes/no result; gate owners never see the verifier's wallet.

## Suggested next integrations

1. **Helius Enhanced Transactions API** for real wallet transaction history.
2. **Jupiter / Birdeye APIs** for accurate swap volume tiers.
3. **Range / Solana Attestation Service** for reusable attestations.
4. **Discord bot** for role granting after private verification.
5. **Light Protocol / ZK Compression** if badge records scale up.
6. **Reclaim Protocol** for off-chain social / creator proofs.
7. **Prisma + Postgres (Neon / Supabase)** to persist proofs and gates beyond a single lambda instance.

## Product roadmap

1. Wallet analyzer, score, badges, hidden-wallet card *(MVP)*.
2. Private Discord / Telegram gates.
3. Solana Attestation Service integration.
4. DarkRank private leaderboards.
5. Token only after real product usage.

## Safety and positioning

Do not market ShadowRep as a way to evade laws or hide illicit money. The product is about **selective disclosure**: proving credibility without leaking unnecessary wallet data.

> Prove your crypto reputation without exposing your wallet.
