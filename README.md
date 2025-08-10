# Stylish Marble Art - Next.js Project

This is a Next.js project for 'Stylish Marble Art', a business specializing in gravestones, memorials, and custom marble work for homes. The website is fully responsive, features dual-language support (English and Urdu), and includes an AI-powered message drafting tool on the contact page to assist users.

Below is a guide to help you manage, deploy, and maintain your site.

## Managing Your Code with GitHub

To share your code and keep track of changes, you'll use Git and GitHub.

### Securing Secret Keys

Your project may have secret keys or credentials (like API keys for services). It is **critical** that these are never uploaded to a public GitHub repository. The standard way to handle this is with a `.gitignore` file.

1.  **Create a `.env.local` file**: At the root of your project, create a file named `.env.local`. Any secret keys should be stored here. For example:
    ```
    SOME_API_KEY=your_secret_value_here
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

While GoDaddy is where you bought your domain name, you need a **hosting provider** to run a Next.js application. **Vercel** is the highly recommended choice as it's made by the creators of Next.js and has the easiest deployment process.

1.  **Sign up for Vercel**: Create an account on [Vercel](https://vercel.com) using your GitHub account.
2.  **Import Your Project**: From the Vercel dashboard, choose "Add New... > Project" and select your GitHub repository.
3.  **Configure and Deploy**: Vercel will automatically detect that it's a Next.js project.
    *   **Environment Variables**: If you have keys in your `.env.local` file, you must add them to Vercel's "Environment Variables" section in the project settings. This is how your live site securely accesses them.
    *   Click "Deploy". Vercel will build and launch your website on a temporary URL (e.g., `your-project.vercel.app`).

## Connecting Your GoDaddy Domain

Once your site is live on Vercel, you can connect your custom domain.

1.  **Add Domain in Vercel**: In your Vercel project dashboard, go to the "Domains" tab and enter your GoDaddy domain name.
2.  **Update DNS Records in GoDaddy**: Vercel will provide you with DNS records (usually an `A` record or `CNAME` record). You need to log in to your GoDaddy account, go to your domain's DNS management page, and add or update the records as instructed by Vercel.
3.  **Wait for Propagation**: DNS changes can take anywhere from a few minutes to a few hours to take effect. Once complete, your website will be live on your GoDaddy domain!

## Making Changes to the Live Site

The best part of this setup is how easy it is to update your site.

1.  **Make Changes Locally**: Edit the code on your local machine, just as you've been doing with me.
2.  **Push Changes to GitHub**: Once you're happy with the changes, commit and push them to your GitHub repository's `main` branch:
    ```bash
    git add .
    git commit -m "Describe your changes here"
    git push
    ```
3.  **Automatic Redeployment**: Vercel will automatically detect the new push to your `main` branch and will start a new deployment. Once it's finished, your changes will be live on your website. There's no need for manual uploads!
