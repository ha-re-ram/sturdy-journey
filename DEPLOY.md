# Deploying Your Portfolio

Since your portfolio is built with Next.js, the easiest way to deploy it is with **Vercel**.

## Option 1: Deploy with Git (Recommended)

1.  **Push your code to GitHub**:
    Since you already have a local git repository initialized:
    ```bash
    git add .
    git commit -m "Initial portfolio setup"
    # Create a new repo on GitHub (https://github.com/new)
    git remote add origin https://github.com/hareramkushwaha/portfolio.git 
    git push -u origin main
    ```

2.  **Connect to Vercel**:
    - Go to [Vercel](https://vercel.com).
    - Log in with GitHub.
    - Click **"Add New..."** -> **"Project"**.
    - Import your `portfolio` repository.
    - Click **Deploy**.

## Option 2: Deploy with Vercel CLI

If you prefer command line:

1.  Install Vercel CLI:
    ```bash
    npm i -g vercel
    ```

2.  Deploy:
    ```bash
    vercel
    ```

## Custom Domain

Once deployed on Vercel:
1.  Go to your project settings in Vercel.
2.  Navigate to **Domains**.
3.  Add your custom domain (e.g., `hareramkushwaha.com`).
4.  Follow the DNS instructions provided by Vercel to update your domain's records.

## Option 3: Deploy to GitHub Pages (Static Export)

Since you've already configured your custom domain on GitHub Pages:

1.  **Configure Repository**:
    - Go to your GitHub repository -> Settings -> Pages.
    - Set source to "GitHub Actions".

2.  **Push Code**:
    - GitHub Actions will automatically detect Next.js and build your site.
    - Ensure your `next.config.ts` has `output: "export"` (already configured).

## How to Manage Projects

You can now control exactly which projects appear on your site and their order without editing code logic.

1.  Open `src/lib/config.ts`.
2.  Edit the `projects` array:
    ```typescript
    projects: [
      { name: "project-repo-name", status: "Completed" },
      { name: "another-repo", status: "In Progress" },
    ]
    ```
3.  Any project listed here will appear **first** on the projects page.
4.  All other repositories from your GitHub account will appear below them, sorted by latest update.

