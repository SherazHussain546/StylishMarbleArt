
# Stylish Marble Art - Next.js Project

This is a Next.js project for 'Stylish Marble Art', a business specializing in gravestones, memorials, and custom marble work for homes. The website is fully responsive, features dual-language support (English and Urdu), and includes an AI-powered message drafting tool on the contact page to assist users.

Below is a guide to help you manage, deploy, and maintain your site.

## Managing Your Code with GitHub

To share your code and keep track of changes, you'll use Git and GitHub.

### Securing Secret Keys

Your project uses a secret key for its AI features (`GEMINI_API_KEY`). It is **critical** that this key is never uploaded to a public GitHub repository. The standard way to handle this is with a `.env.local` file.

1.  **Create a `.env.local` file**: At the root of your project, create a file named `.env.local`. Your secret key should be stored here. For example:
    ```
    GEMINI_API_KEY=your_secret_value_here
    ```

2.  **Use the `.gitignore` file**: A `.gitignore` file has been added to your project. This file tells Git to ignore specific files and folders. It is pre-configured to ignore `.env.local`, so your secrets will remain safe on your local machine.

### Pushing to GitHub

1.  **Initialize Git**: If you haven't already, open a terminal in your project folder and run `git init`.
2.  **Create a Repository**: Go to [GitHub](https://github.com) and create a new repository.
3.  **Follow GitHub's Instructions**: GitHub will provide you with commands to connect your local project to the remote repository and push your code. It will look something like this:
    ```bash
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/your-username/your-repository-name.git
    git push -u origin main
    ```

## Deploying Your Website

**Vercel** is the highly recommended choice as it's made by the creators of Next.js and has the easiest deployment process.

1.  **Push Your Code**: Make sure all your latest changes are pushed to your GitHub repository.
    ```bash
    git add .
    git commit -m "Finalizing site for deployment"
    git push
    ```

2.  **Sign up for Vercel**: Create an account on [Vercel](https://vercel.com). The easiest way is to sign up using your GitHub account.

3.  **Import Your Project**: From the Vercel dashboard, choose "**Add New...**" > "**Project**" and select your `StylishMarbleArt` GitHub repository.

4.  **Configure and Deploy**: Vercel will automatically detect that it's a Next.js project and set up the build settings for you.
    *   **CRITICAL: Environment Variables**: Before you deploy, you must add your `GEMINI_API_KEY`. Expand the "**Environment Variables**" section.
        *   For the **Name**, enter `GEMINI_API_KEY`.
        *   For the **Value**, copy and paste the secret key from your local `.env.local` file.
        *   Click **Add**.
    *   Click "**Deploy**". Vercel will build and launch your website on a temporary URL (e.g., `stylishmarbleart.vercel.app`).

## Connecting Your Custom Domain (`stylishmarbleart.com`)

Once your site is live on the Vercel URL, you can connect your custom domain.

1.  **Add Domain in Vercel**: In your Vercel project dashboard, go to the "**Settings**" tab and then click on "**Domains**". Enter `stylishmarbleart.com` and click **Add**.

2.  **Update DNS Records**: Vercel will show you the DNS records you need to add to your domain registrar (the company where you bought your domain, like GoDaddy, Namecheap, etc.).
    *   It will likely give you an **`A` record** (an IP address) or **`CNAME` records**.
    *   Log in to your domain registrar's website.
    *   Go to the DNS management page for `stylishmarbleart.com`.
    *   Delete any existing `A` or `CNAME` records for your root domain (`@`) and `www`, and add the new ones provided by Vercel.

3.  **Wait for Propagation**: DNS changes can take a few minutes up to a few hours to take effect. Vercel will automatically detect when the changes are complete and secure your site with an SSL certificate. Your website will then be live at **stylishmarbleart.com**!

## Making Changes to the Live Site

The best part of this setup is how easy it is to update your site.

1.  **Make Changes Locally**: Edit the code on your machine.
2.  **Push Changes to GitHub**: Commit and push them to your `main` branch:
    ```bash
    git add .
    git commit -m "Describe your changes here"
    git push
    ```
3.  **Automatic Redeployment**: Vercel will automatically detect the push and start a new deployment. Once it's finished, your changes will be live on your website. No manual uploads needed!
