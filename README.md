
# Stylish Marble Art - Next.js Project

This is a Next.js project for 'Stylish Marble Art', a business specializing in gravestones, memorials, and custom marble work for homes. The website is fully responsive, features dual-language support (English and Urdu), and includes an AI-powered message drafting tool on the contact page to assist users.

Below is a guide to help you manage, deploy, and maintain your site.

## Managing Your Code with GitHub

To share your code and keep track of changes, you'll use Git and GitHub.

### Securing Secret Keys

Your project uses secret keys for its AI features and for sending emails. It is **critical** that these keys are never uploaded to a public GitHub repository. The standard way to handle this is with a `.env.local` file.

1.  **Create a `.env.local` file**: At the root of your project, create a file named `.env.local`. Your secret keys should be stored here. For example:
    ```
    # For the AI Assistant on the contact page
    GEMINI_API_KEY=your_gemini_secret_key_here

    # For sending emails from the contact form
    SMTP_HOST=your_smtp_host.com
    SMTP_PORT=587
    SMTP_USER=your_smtp_username
    SMTP_PASS=your_smtp_password
    SMTP_FROM_EMAIL=noreply@yourdomain.com
    SMTP_TO_EMAIL=your_email@yourdomain.com
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

## Deploying Your Website with Netlify

**Netlify** is a highly recommended choice for deploying Next.js applications, offering a simple and powerful workflow.

1.  **Push Your Code**: Make sure all your latest changes are pushed to your GitHub repository.
    ```bash
    git add .
    git commit -m "Finalizing site for deployment"
    git push
    ```

2.  **Sign up for Netlify**: Create an account on [Netlify](https://www.netlify.com). The easiest way is to sign up using your GitHub account.

3.  **Import Your Project**: From the Netlify dashboard, click "**Add new site**" > "**Import an existing project**" and select your `StylishMarbleArt` GitHub repository.

4.  **Configure and Deploy**: Netlify will automatically detect that it's a Next.js project and configure the build settings for you.
    *   **CRITICAL: Environment Variables**: Before you deploy, you must add your secret keys.
        *   Go to your site's settings, find the "**Build & deploy**" section, and then go to "**Environment**".
        *   Click "**Add a variable**" and add each of the keys from your `.env.local` file (e.g., `GEMINI_API_KEY`, `SMTP_HOST`, `SMTP_USER`, etc.) one by one with their corresponding values.
    *   Go back to the deployment page and click "**Deploy site**". Netlify will build and launch your website on a temporary URL (e.g., `your-site-name.netlify.app`).

## Connecting Your GoDaddy Domain

Once your site is live on the Netlify URL, you can connect your custom domain from GoDaddy.

1.  **Add Domain in Netlify**: In your Netlify project dashboard, go to "**Domain settings**". Click "**Add a domain**" and enter your domain name (e.g., `yourdomain.com`). Follow the prompts to verify you own the domain.

2.  **Update DNS Records in GoDaddy**: Netlify will provide you with the DNS records you need to add to GoDaddy. The recommended method is to use Netlify's nameservers.
    *   Log in to your **GoDaddy** account.
    *   Go to your **My Products** page and find your domain. Click the **DNS** button next to it.
    *   Under the **Nameservers** section, click the **Change** button.
    *   Select the option **"I'll use my own nameservers."**
    *   Netlify will give you 2 or more nameservers (they look like `dns1.p01.nsone.net`). Copy and paste each one into the fields on GoDaddy.
    *   Click **Save**.

3.  **Wait for Propagation**: DNS changes can take a few minutes up to a few hours to take effect. Netlify will automatically detect when the changes are complete and secure your site with a free SSL certificate. Your website will then be live at your custom domain!

## Making Changes to the Live Site

The best part of this setup is how easy it is to update your site.

1.  **Make Changes Locally**: Edit the code on your machine.
2.  **Push Changes to GitHub**: Commit and push them to your `main` branch:
    ```bash
    git add .
    git commit -m "Describe your changes here"
    git push
    ```
3.  **Automatic Redeployment**: Netlify will automatically detect the push and start a new deployment. Once it's finished, your changes will be live on your website. No manual uploads needed!
