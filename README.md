<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/santa-claus_1f385.png" width="80" alt="Santa Claus" />
</p>

<h1 align="center">Secret Santa</h1>

<p align="center">
  <strong>A beautifully simple Secret Santa web app</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-customization">Customization</a> •
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite" />
</p>

---

## ✨ Features

- 🎁 **Zero Backend Required** — Fully static, deploy anywhere
- 🔐 **Privacy First** — Each participant has a unique password to reveal their match
- 🎲 **Fair Algorithm** — Guaranteed circular assignment (no one gets themselves)
- ❄️ **Beautiful UI** — Festive design with snowfall animation
- 🚀 **One-Click Deploy** — GitHub Actions workflow for instant deployment
- 📱 **Fully Responsive** — Works perfectly on mobile and desktop
- 🛠️ **Easy Configuration** — Simple text files, no database needed

## 🎬 Demo

Check out a live demo: **[github.com/bastdus/Secret-Santa](https://github.com/bastdus/Secret-Santa)**

<p align="center">
  <img src="https://github.com/user-attachments/assets/fe0f574a-b844-473b-a234-4ad02b3df55a" width="600" alt="Secret Santa Screenshot" />
</p>

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Secret-Santa.git
cd Secret-Santa

# Install dependencies
npm install
```

### Setup Your Event

**1. Add participants** — Edit `config/participants.txt` (_one by line_)

```
Alice
Bob
Charlie
Diana
Eve
```

**2. Customize passwords** (optional) — Edit `config/passwords.txt` (_one by line_)

```
snowflake
reindeer
mistletoe
jingle
```

> 💡 The current year is automatically appended to passwords (e.g., `snowflake2025`)

**3. Generate assignments**

```bash
npm run shuffle
```

Output:

```
🎄 Secret Santa generated!

👤 Alice → 🔐 snowflake2025
👤 Bob → 🔐 reindeer2025
👤 Charlie → 🔐 mistletoe2025
...
```

**4. Start local development**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔧 How It Works

### The Shuffle Algorithm

The app uses a **circular permutation** algorithm that guarantees:

1. ✅ No one is assigned to themselves
2. ✅ Everyone gives exactly one gift
3. ✅ Everyone receives exactly one gift
4. ✅ The chain forms a single cycle (A→B→C→...→A)

```
Participants: [Alice, Bob, Charlie, Diana]
        ↓ Shuffle
Shuffled:     [Charlie, Alice, Diana, Bob]
        ↓ Shift by 1
Receivers:    [Bob, Charlie, Alice, Diana]
        ↓ Pair
Result:       Charlie → Bob
              Alice → Charlie
              Diana → Alice
              Bob → Diana
```

### Data Obfuscation

Assignments are stored in `src/data.json` with simple character-code obfuscation:

```json
{
  "name": "70-113-110-104-106", // "Alice"
  "password": "120-115-116-124-55-53-55-58", // "snow2025"
  "secretFriend": "71-116-103" // "Bob"
}
```

> ⚠️ **Note**: This is obfuscation, not encryption. It prevents casual snooping but is not cryptographically secure. For most family/friend Secret Santa events, this level of "security" is perfect!

### Password Protection

Each participant has a unique password. When they click their name:

1. A modal prompts for their password
2. The password is checked client-side against the obfuscated data
3. On success, their Secret Santa assignment is revealed

## 🌐 Deployment

### GitHub Pages (Recommended)

This project is designed for seamless GitHub Pages deployment with GitHub Actions.

#### Initial Setup

1. **Fork or push** this repository to your GitHub account

2. **Enable GitHub Pages**

   - Go to `Settings` → `Pages`
   - Set Source to `Deploy from a branch`
   - Select the `gh-pages` branch (will appear after first deployment)

3. **Update the base URL** in `vite.config.ts`:
   ```ts
   export default defineConfig({
     base: "/your-repo-name/",
     // ...
   });
   ```

#### Deploying

**Option A: Via GitHub UI (Recommended)**

1. Edit `config/participants.txt` and `config/passwords.txt` directly on GitHub
2. Go to the **Actions** tab
3. Select **🔀 Shuffle** workflow
4. Click **Run workflow**
5. Check the logs to see the generated passwords

<p align="center">
  <img src="https://github.com/user-attachments/assets/5b124886-ba1e-434f-9d58-c9b6441200e8" width="400" alt="GitHub Actions" />
  <img src="https://github.com/user-attachments/assets/adae1b67-1f79-4a3a-8383-52d98c348f8e" width="400" alt="Workflow Output" />
</p>

**Option B: Local Build + Deploy**

```bash
# Generate assignments
npm run shuffle

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

#### Build Tracking

Every deployment (push to main or shuffle workflow) automatically appends a build comment to the HTML with the commit hash and timestamp:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
  </head>
  <body>
    ...
  </body>
</html>
<!-- build: eb1f3d8 | 2025-11-29 21:37:28 UTC -->
```

This makes it easy to verify which version is currently deployed.

### Other Hosting Platforms

The `dist/` folder contains a fully static site that can be deployed anywhere:

| Platform             | Command                                    |
| -------------------- | ------------------------------------------ |
| **Netlify**          | Drag & drop `dist/` folder or connect repo |
| **Vercel**           | `vercel --prod`                            |
| **Cloudflare Pages** | Connect repo, set build output to `dist`   |
| **Firebase Hosting** | `firebase deploy`                          |
| **Any static host**  | Upload contents of `dist/`                 |

## 🎨 Customization

### Modify the UI Text

Edit `src/app/index.tsx` to customize:

- Event title and date
- Instructions text
- Budget amount
- Language (default is French)

```tsx
<Card
  title={<>🎅 Secret Santa 🤶<br />Saturday, December 20, 2025</>}
  description={<>Click your name to discover who you're gifting! 🎁<br />(max $25)</>}
>
```

### Change the Theme

The app uses CSS custom properties for easy theming. Edit the CSS files in:

- `src/app/styles.css` — Main app styles
- `src/components/ui/*/styles.css` — Component-specific styles
- `src/reset.css` — CSS reset

### Add More Passwords

The password list in `config/passwords.txt` should have **at least as many entries as participants**. The script will randomly assign passwords from this list.

Christmas-themed password suggestions:

```
snowflake
reindeer
mistletoe
jingle
chimney
sleigh
ornament
gingerbread
nutcracker
tinsel
```

## 📁 Project Structure

```
Secret-Santa/
├── config/
│   ├── participants.txt     # List of participant names
│   └── passwords.txt        # Available passwords
├── src/
│   ├── app/
│   │   ├── index.tsx        # Main App component
│   │   └── styles.css       # App styles
│   ├── components/ui/       # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── GiftIcon/
│   │   └── Modal/
│   ├── hooks/
│   │   └── useSecretSanta.ts # Core logic hook
│   ├── utils/
│   │   └── deobfuscate.ts   # Data deobfuscation utility
│   ├── data.json            # Generated assignments (obfuscated)
│   └── main.tsx             # Entry point
├── script/
│   └── shuffle.js           # Assignment generation script
├── .github/workflows/
│   ├── deploy.yml           # Build & deploy on push
│   └── shuffle.yml          # Shuffle & deploy (manual trigger)
└── dist/                    # Production build output
```

## 🛠️ Available Scripts

| Script            | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start development server              |
| `npm run build`   | Build for production                  |
| `npm run preview` | Preview production build locally      |
| `npm run shuffle` | Generate new Secret Santa assignments |
| `npm run deploy`  | Deploy to GitHub Pages                |

## 🔒 Security Considerations

This app is designed for **trusted groups** (family, friends, coworkers). The obfuscation provides:

- ✅ Prevents accidental spoilers when viewing source
- ✅ Requires knowing your password to see your assignment
- ✅ Simple and transparent implementation

It does **not** provide:

- ❌ Protection against determined technical users
- ❌ Server-side validation
- ❌ Audit logging

For most Secret Santa events, this is the perfect balance of simplicity and privacy!

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions

- 🌍 Internationalization (i18n) support
- 🎨 Additional themes (dark mode, different holidays)
- 📧 Notification integration
- 🔐 Optional stronger encryption
- 🧪 Unit tests
- 📱 PWA support

## 🙏 Acknowledgments

- [react-snowfall](https://github.com/cahilfoley/react-snowfall) for the beautiful snow animation

---

<p align="center">
  <strong>🎄 Happy Holidays! 🎁</strong>
</p>

<p align="center">
  Made with ❤️ for Secret Santa lovers everywhere
</p>
