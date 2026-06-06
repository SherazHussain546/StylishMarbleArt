# Hosting Your Reviews on a Subdomain

To host the `reviews-standalone.html` file on **reviews.stylishmarbleart.com** using Netlify, follow these exact steps:

### 1. Prepare Your Deployment Folder
1. Create a new folder on your computer named `sma-reviews-site`.
2. Copy the content of `public/reviews-standalone.html` into a new file inside that folder named `index.html`. 
   *Note: It must be named `index.html` for Netlify to serve it as the home page.*

### 2. Deploy to Netlify
1. Log in to your [Netlify Dashboard](https://app.netlify.com).
2. Go to the **Sites** tab.
3. Scroll to the bottom and find the **"Want to deploy a new site without connecting to Git?"** area.
4. Drag and drop your `sma-reviews-site` folder into that box.
5. Netlify will generate a random URL (e.g., `sparkly-crepe-123.netlify.app`).

### 3. Connect the Subdomain
1. Inside your new site dashboard on Netlify, go to **Site Settings > Domain management**.
2. Click **Add custom domain**.
3. Enter `reviews.stylishmarbleart.com` and click **Verify**.
4. Click **Add domain**.

### 4. Configure Your DNS (e.g., GoDaddy)
1. Go to your domain provider's DNS settings (where `stylishmarbleart.com` is managed).
2. Add a new **CNAME** record:
   - **Type**: `CNAME`
   - **Host/Name**: `reviews`
   - **Value/Points to**: Your Netlify site address (e.g., `sparkly-crepe-123.netlify.app`).
   - **TTL**: `1 Hour` (or Default)

### 5. Verify and SSL
Wait about 5-10 minutes. Netlify will automatically detect the DNS change and provision a free Let's Encrypt SSL certificate. Your site will then be live at **https://reviews.stylishmarbleart.com**.