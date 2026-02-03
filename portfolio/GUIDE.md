# Portfolio Customization Guide

This project is built to be easily customizable. Most of the content (text, images, links) is stored in a single file: `src/data/content.js`.

## 1. How to Add New Projects
1.  Open `src/data/content.js`.
2.  Scroll down to the `export const projects = [...]` array.
3.  Add a new object to the array following this format:
    ```javascript
    {
      title: "Your Project Title",
      desc: "Short description of what the project does.",
      img: "URL_TO_IMAGE_OR_IMPORT", // You can import the image at the top
      demo: "https://your-demo-link.com",
      github: "https://github.com/your/repo",
      tech: "React, Node.js, etc"
    },
    ```

## 2. How to Add Certificates
1.  Open `src/pages/Certificates.jsx`. 
    *Note: Currently certificates are hardcoded here, but you can move them to `content.js` if you prefer.*
2.  Find the `const certificates = [...]` array.
3.  Add a new certificate object:
    ```javascript
    {
        title: "Certificate Name",
        issuer: "Organization (e.g., Udemy, Coursera)",
        date: "2024",
        img: "https://link-to-badge-image.png",
        link: "https://link-to-credential.com"
    },
    ```

## 3. How to Update Skills
1.  Open `src/data/content.js`.
2.  Find `export const skills = [...]`.
3.  Add a new object. You will need to import the icon from `react-icons` at the top of the file first.
    ```javascript
    // Top of file
    import { FaNewIcon } from 'react-icons/fa';

    // In skills array
    { name: "New Skill", icon: FaNewIcon, color: "text-blue-500" },
    ```

## 4. Setting up the Contact Form (EmailJS)
1.  Go to [EmailJS](https://www.emailjs.com/) and create a free account.
2.  Create a **Service** (e.g., Gmail) and get your `Service ID`.
3.  Create an **Email Template** and get your `Template ID`.
    *   Template variables should generally match your form inputs: `{{user_name}}`, `{{user_email}}`, `{{message}}`.
4.  Get your **Public Key** from "Account Settings" > "API Keys".
5.  Open `src/pages/Home.jsx`.
6.  Find the `sendEmail` function (~Line 14).
7.  Uncomment the `emailjs.sendForm` line and paste your keys:
    ```javascript
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
    ```
8.  Remove the `setTimeout` simulation code.

## 5. Mobile Responsiveness
The site is built with **Tailwind CSS** and is already responsive.
-   **Grid Layouts**: We use `grid-cols-1 md:grid-cols-3`, meaning it shows 1 column on mobile and 3 on PC.
-   **Navbar**: The menu items hide on small screens (`hidden md:block`). You might want to add a hamburger menu for better mobile navigation in the future.

## 6. Updating Resume
1.  Replace the file `src/utils/AyushDeloite.pdf` with your new PDF.
2.  Ensure the filename matches, or update the import in `src/components/Hero.jsx` and `src/pages/Home.jsx`.
