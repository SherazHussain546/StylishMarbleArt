# Firebase Security Rules for Stylish Marble Art

To make your dynamic gallery and other features work correctly and securely, you need to update your Firebase Security Rules. Please copy and paste the contents of `firestore.rules` and `storage.rules` into your Firebase project settings.

This is a one-time setup.

## How to Update Your Rules

1.  **Go to your Firebase Project Console**: [https://console.firebase.google.com/](https://console.firebase.google.com/)
2.  Select your project (`stylish-marble-art`).

### **For Firestore Database Rules:**

1.  In the left-hand menu, go to **Build > Firestore Database**.
2.  Click on the **"Rules"** tab at the top.
3.  **Delete** the existing rules in the editor.
4.  **Copy** the entire content of the `firestore.rules` file and **paste** it into the editor.
5.  Click the **"Publish"** button.

### **For Firebase Storage Rules:**

1.  In the left-hand menu, go to **Build > Storage**.
2.  Click on the **"Rules"** tab at the top.
3.  **Delete** the existing rules in the editor.
4.  **Copy** the entire content of the `storage.rules` file and **paste** it into the editor.
5.  Click the **"Publish"** button.

That's it! Your gallery will now have the correct permissions to allow you to upload and delete images from your admin panel, and for the public to view them.
