EduSave (Kenya) - MVP

Overview
- EduSave connects university students across Kenya to save on textbooks, access scholarships, find gigs, and join campus communities.
- This MVP is a static site (HTML/CSS/JS) with client-side features: auth (mock), marketplace previews, scholarships, gigs, communities, modals, dark mode, live search, and Kenyan university filtering.

Features
- Responsive layout with modern UI and dark mode toggle (persisted)
- Auth: signup/login with mock API, remember me, social login (mock), password strength and reset (mock)
- Search: live filtering of cards with results count
- Kenya focus: university selector with persistence and URL hash sync (#uni=...)
- Communities: list major Kenyan universities with mock member counts, Join and Invite actions
- Extras: footer contact form with validation/toasts, cookie banner, stats animation, hero parallax, confetti on success

Getting Started
1) Open index.html in your browser (double-click or use a local server)
2) Optional: serve locally for best results
   - VS Code Live Server
   - Python: `python -m http.server 5500` then open http://localhost:5500

Basic Usage
- Use the theme toggle (moon/sun) to switch dark/light mode
- Choose your university from the selector; content filters automatically and syncs to URL (e.g., #uni=Kenyatta%20University)
- Click Login/Sign Up to open modals; use social buttons for mock login
- Join a university community and copy invite link

Deployment
- GitHub Pages
  1. Push this folder to a GitHub repo
  2. Settings → Pages → Deploy from branch → select main and root
  3. Visit your Pages URL
- Netlify (recommended for speed)
  1. Drag-and-drop the folder at app.netlify.com or connect repo
  2. Build settings: none (static)
  3. Deploy

Notes
- All authentication and data are client-side (localStorage/sessionStorage) for demo purposes only
- Replace social links and contact email with your real accounts
- Consider adding a real backend (Node/Express or Firebase) for production auth and data

License
- MIT (or your preferred license)


