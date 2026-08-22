# Sarwar Jony — Professional Portfolio

[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue)](https://sarwarjony.github.io/)

A complete professional academic portfolio for **Sarwar Jony**, Urban & Regional Planning student at KUET, specializing in GIS, Remote Sensing, and Spatial Data Analysis.

---

## 🌐 Live Website

Visit: `https://sarwarjony.github.io/`

Admin Panel: `https://sarwarjony.github.io/admin.html`

---

## 📁 Project Structure

```
portfolio/
│
├── index.html          ← Public website (main portfolio)
├── admin.html          ← Hidden admin/CMS panel
├── README.md           ← This file
├── UPDATE-GUIDE.md     ← Simple update guide for non-coders
├── robots.txt          ← SEO robots file
├── sitemap.xml         ← SEO sitemap
│
├── data/               ← Content data files
│   ├── profile.json
│   ├── projects.json
│   ├── research.json
│   ├── experience.json
│   ├── education.json
│   ├── skills.json
│   ├── certificates.json
│   ├── publications.json
│   ├── achievements.json
│   ├── social.json
│   └── settings.json
│
└── assets/
    ├── images/         ← Profile photos, project images
    ├── certificates/   ← Certificate images/PDFs
    ├── projects/       ← Project images
    └── documents/      ← CV, reports, papers
```

---

## 🚀 How to Deploy to GitHub Pages

### Step 1: Create a GitHub Account
If you don't have one, go to [github.com](https://github.com) and sign up.

### Step 2: Create a Repository
1. Click the **+** icon → **New repository**
2. Name it: `sarwarjony.github.io` (use YOUR GitHub username)
3. Set it to **Public**
4. Click **Create repository**

### Step 3: Upload Files
1. Click **uploading an existing file**
2. Drag and drop ALL files and folders from this project
3. Click **Commit changes**

### Step 4: Enable GitHub Pages
1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select **main** branch and **/ (root)** folder
4. Click **Save**

Your site will be live at: `https://YOUR-USERNAME.github.io/`

---

## ✏️ How to Update Content (Non-Coder Guide)

### The Easy Way — Admin Panel

1. Open `https://sarwarjony.github.io/admin.html`
2. Use the sidebar to navigate to the section you want to update
3. Make your changes using the forms
4. Click **Save**
5. Click **Preview Site** to see the result

> ⚠️ **IMPORTANT:** The admin panel saves data to your browser's local storage. Always use **Backup / Export** to save your data as a JSON file. If you clear your browser data or use a different browser, you'll need to import your backup.

### To Permanently Save Changes (Technical)

After updating content in the admin panel:

1. Go to **Backup / Export** → **Export Portfolio Data**
2. This downloads a `portfolio-backup.json` file
3. Open your GitHub repository
4. Upload the updated data files
5. Your changes will be permanent

---

## 📸 How to Add a Profile Photo

1. Upload your photo to your GitHub repository (`assets/images/profile.jpg`)
2. Your photo URL will be: `https://sarwarjony.github.io/assets/images/profile.jpg`
3. Go to **Admin → Profile** → paste this URL in the **Photo URL** field
4. Click **Save Profile**

---

## 📄 How to Update Your CV

1. Upload your CV PDF to `assets/documents/cv.pdf`
2. Your CV URL: `https://sarwarjony.github.io/assets/documents/cv.pdf`
3. Go to **Admin → Profile** → paste this URL in **CV / Resume URL**
4. Click **Save Profile**

---

## 🗺️ How to Add a New Project

1. Open `admin.html`
2. Click **Projects** in the sidebar
3. Click **Add Project**
4. Fill in: Title, Category, Description, Tools, Date, Status
5. Add thumbnail image URL (upload image to GitHub first)
6. Add GitHub and Report URLs if available
7. Check **Featured** if you want it on the homepage
8. Click **Save**

---

## 🔬 How to Add Research

1. Click **Research** in the admin sidebar
2. Click **Add Research**
3. Fill in: Title, Research Area, Description, Research Question, Methodology, Tools
4. Set Status (Idea / Ongoing / Under Review / Published)
5. Click **Save**

---

## 📜 How to Add Certificates

1. Click **Certificates** in the admin sidebar
2. Click **Add Certificate**
3. Fill in: Certificate Name, Issuing Organization, Date, Category
4. Add Credential URL (verification link)
5. Optionally add Certificate Image URL
6. Check **Featured** for important certificates
7. Click **Save**

---

## 💾 Backup Procedure

**Always backup your data regularly!**

1. Open `admin.html`
2. Go to **Backup / Export**
3. Click **Export Portfolio Data**
4. Save the downloaded JSON file securely
5. To restore: Click **Import Data** and select your backup file

---

## 🔒 About the Admin Panel Security

The admin panel (`admin.html`) is a client-side content management interface:

- ✅ It is **not indexed by search engines** (`robots.txt` blocks it)
- ✅ No visible link on the public website
- ⚠️ It is **NOT password-protected** (static GitHub Pages cannot do this securely)
- ⚠️ Anyone who knows the URL can access it
- 💡 For proper security: consider using Netlify CMS, Forestry.io, or a proper backend

For most academic portfolios, the admin URL obscurity is sufficient protection.

---

## 🎨 Design Credits

- Fonts: [Inter](https://fonts.google.com/specimen/Inter) + [Manrope](https://fonts.google.com/specimen/Manrope)
- Icons: [Font Awesome 6](https://fontawesome.com/)
- Colors: Custom academic palette (#2563EB primary, #10B981 secondary)

---

## 📞 Contact

Sarwar Jony · sarwarjony@kuet.ac.bd · KUET, Khulna, Bangladesh
