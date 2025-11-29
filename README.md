# 🎅 SECRET SANTA

A simple **React** app to organize a Secret Santa event. Add participants and the app will randomly assign a Secret Santa to each person! 🎁

The page is hosted on **GitHub Pages** and **automatically deployed** via **GitHub Actions**. ✨

## 🎄 Installation

```bash
npm install
```

## 🎁 Usage

All configuration files are in the `config/` folder.

### 1. Add participants

Edit `config/participants.txt`. One name per line, that's it!

```
Tom
Georgina
Fanny
Gael
Natacha
Bastien
```

### 2. Customize passwords (optional)

Edit `config/passwords.txt` to set your own password list. One password per line.  
Make sure you have at least as many passwords as participants!

```
noel
cadeaux
sapin
guirlande
```

> The year is automatically appended to passwords (e.g., `noel2025`)

### 3. Run the Shuffle ✨

#### Option A: Via GitHub (recommended)

1. Edit files in `config/` directly on GitHub
2. Go to the **Actions** tab
3. Select the **🔀 Shuffle** workflow
4. Click on **Run Workflow**
5. Check the logs to see the passwords

![image](https://github.com/user-attachments/assets/fe0f574a-b844-473b-a234-4ad02b3df55a)
![image](https://github.com/user-attachments/assets/5b124886-ba1e-434f-9d58-c9b6441200e8)
![image](https://github.com/user-attachments/assets/adae1b67-1f79-4a3a-8383-52d98c348f8e)

#### Option B: Locally

```bash
npm run shuffle

# Output in terminal:
# 👤 Tom → 🔐 noel2025
# 👤 Georgina → 🔐 sapin2025
# ...
```

### 4. Access the website

The site is automatically deployed on GitHub Pages, after a Shuffle or a push on main branch.  
If you push on main branch, shuffle is not triggered! This way you can fix UI issues without reshuffling.

**https://your-github-account.github.io/secret-santa/**

## 🤶 Happy Holidays!

You're all set to host your Secret Santa event! 🎉🎅

Feel free to fork this repo and contribute! 🎄🎁
