# Deployment Guide for FaithJourney.pro

## 1. Prerequisites

Ensure you have your Supabase project set up and your API keys ready.

## 2. Environment Variables

You need to add the following environment variables to your deployment platform (Vercel).

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Public Key

## 3. Deploying to Vercel

### Option A: Using Vercel CLI (Recommended for manual deploy)

1.  Open your terminal in the project folder.
2.  Run the deployment command:
    ```bash
    npx vercel
    ```
3.  Follow the prompts:
    -   **Set up and deploy?** `Y`
    -   **Scope:** Select your account.
    -   **Link to existing project?** `N`
    -   **Project Name:** `faith-journey-pro`
    -   **Directory:** `./`
    -   **Modify settings?** `N`

4.  Once deployed, Vercel will give you a production URL (e.g., `https://faith-journey-pro.vercel.app`).

### Option B: Using Git Integration

1.  Push your code to a GitHub repository.
2.  Go to Vercel Dashboard > **Add New...** > **Project**.
3.  Import your GitHub repository.
4.  Add the Environment Variables in the configuration step.
5.  Click **Deploy**.

## 4. Connecting Your Custom Domain (faithjourney.pro)

1.  Go to your **Vercel Dashboard**.
2.  Select your **faith-journey-pro** project.
3.  Go to **Settings** > **Domains**.
4.  Enter `faithjourney.pro` in the input field and click **Add**.
5.  Select the recommended option (usually adding a standard domain).
6.  Vercel will show you the **DNS Records** you need to add to your domain registrar (where you bought the domain, e.g., GoDaddy, Namecheap).

    -   **Type:** `A`
    -   **Name:** `@`
    -   **Value:** `76.76.21.21` (Vercel's IP)

    -   **Type:** `CNAME`
    -   **Name:** `www`
    -   **Value:** `cname.vercel-dns.com`

7.  Log in to your domain registrar, find the **DNS Settings** or **Zone Editor**, and add these records.
8.  Wait for propagation (can take minutes to hours). Vercel will automatically issue an SSL certificate once verified.
