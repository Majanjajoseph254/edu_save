# EduSave (Kenya) - MVP

## Overview
EduSave is an innovative platform designed to empower university students across Kenya by providing a comprehensive solution for educational resources and opportunities. The platform facilitates:
- Affordable textbook sharing and exchange
- Access to scholarship opportunities
- Student gig economy participation
- Vibrant campus community connections

This MVP demonstrates core functionality through a responsive static site implementation.

Features
- Responsive layout with modern UI and dark mode toggle (persisted)
- Auth: signup/login with mock API, remember me, social login (mock), password strength and reset (mock)
- Search: live filtering of cards with results count
- Kenya focus: university selector with persistence and URL hash sync (#uni=...)
- Communities: list major Kenyan universities with mock member counts, Join and Invite actions
- Extras: footer contact form with validation/toasts, cookie banner, stats animation, hero parallax, confetti on success

## Technologies Used
- HTML5 for structure
- CSS3 for styling and responsive design
- JavaScript (ES6+) for interactive features
- LocalStorage/SessionStorage for client-side data persistence
- Modern CSS features including Grid and Flexbox
- Responsive design principles for mobile-first approach

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Optional: Visual Studio Code with Live Server extension for development

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Majanjajoseph254/edu_save.git
   ```
2. Navigate to the project directory:
   ```bash
   cd edu_save
   ```
3. Open index.html in your browser, or for best results:
   - Use VS Code with Live Server extension
   - Right-click index.html and select "Open with Live Server"

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

## Contributing
Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin new-feature`
5. Submit a pull request

## Live Demo
Visit the live application: [EduSave Kenya](https://majanjajoseph254.github.io/edu_save/)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, please open an issue in the repository or contact the maintainers.


