root@portfolio

A hacker/terminal-themed personal portfolio site — green CRT aesthetic, a live "global attack map" that reveals your photos when it's "hit," typewriter project cards, and a hidden in-browser editor so you can update everything without touching code.

No backend, no database — just static files hosted for free on GitHub Pages, with GitHub itself acting as the storage layer for your content.


Features


Terminal / hacker aesthetic — scanlines, CRT vignette, matrix rain, glitch text, monospace type.
Animated world map — nodes pulse across a stylized dotted world map, with "intrusion" lines periodically firing between them. On impact, an explosion effect reveals one of your photos.
Link portal effect — clicking any social or project link scrolls to the map, fades it out, and "jacks in" to the destination with a boot-sequence animation before showing it inline.
Hidden edit mode — hold Shift and type 697427 anywhere on the page to unlock editing. No visible admin button, no login screen.
Everything editable in place: name, role, bio, skills, contact links, avatar, project cards (with image + auto-generated slide/typewriter animation), and a free-form "custom blocks" section where you can add your own text/image blocks with a choice of entrance animation (fade, slide, typing effect).
Private photo archive — upload 10 photos that get pulled into the map's "breach" reveals. Only visible to you while in edit mode; never shown to visitors.
Theme customization — pick any accent color (presets or a full color picker) and switch between dark and white/light mode, live.
GitHub-backed persistence — your edits save instantly to your own browser so reloads never lose work. A Push to GitHub button commits your content to data.json in this repo, which is what every visitor's browser actually loads — that's what makes edits "go live."


Tech

Plain HTML, CSS, and vanilla JavaScript. No build step, no framework, no dependencies beyond two Google Fonts. Content lives in data.json and is fetched at page load; edits are pushed back via the GitHub REST API using a personal access token stored only in your browser.

Files

FilePurposeindex.htmlPage structurestyle.cssAll stylingscript.jsApp logic — map/animations, edit mode, theme engine, GitHub syncdata.jsonYour content (profile, photos, projects, custom blocks, theme) — this is what gets committed on pushSETUP.mdStep-by-step hosting + GitHub token setup

Quick start

See SETUP.md for the full walkthrough. Short version:


Push these files to a public GitHub repo.
Enable Settings → Pages (deploy from main, root folder).
Open the live site, enter edit mode (**********), fill in your info and photos.
Generate a fine-grained GitHub token scoped to only this repo with Contents: Read and write, and connect it in the edit-mode panel.
Click Push to GitHub whenever you want your edits to go live.


Security note

The GitHub token is stored only in localStorage in the browser you used to connect it — it is never written into any of the site's files or committed to the repo. Still, always scope it to this one repository only, so the impact stays contained even in a worst case.

License

Use, modify, and adapt freely for your own portfolio.
