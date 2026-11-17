# Blersjda Kit

**Blersjda Kit** is a free party game collection for kids, grown-ups, families, and friends. One person hosts, everyone else joins from their own phone with a short room code. No app to install and no account needed.

**[Play Blersjda Kit Live](https://herjiberb.github.io/Blersjda-Kit)**

---

## Included Games

| Game | Minimum players | Summary |
|------|-----------------|---------|
| **Madness** | 4+ | Write the funniest responses and earn points. Later rounds multiply the points! |
| **Cap** | 4+ | Like Madness, but you caption ridiculous, uncanny AI-generated images. |
| **Burn** | 3+ | Answer a simple prompt, write new prompts, and find the best combinations. |
| **Strokes** | 3+ | Draw, write captions, and assemble the ultimate meme through a bracket. |

---

## How to Play

1. **Host** opens the game on a computer, tablet, or phone and picks a game.
2. **Players** open the same link on their phones and enter the 4-character room code, or scan the QR code on screen.
3. Everyone submits answers, captions, or drawings from their own device.
4. Vote, score points, and see who wins.

Not enough people? The game supports **bots** to fill empty seats.

---

## Features

* **Phone-first:** the host and every player use only a phone or browser.
* **Room codes and QR joining:** quick, simple joining with a 4-character code.
* **Big-screen mode:** show the game on a TV using Chromecast or a second display (HDMI).
* **Installable (PWA):** add it to your home screen for an app-like experience.
* **Works offline** after the first load, thanks to a service worker.
* **Read-aloud support** through the browser's speech synthesis.
* **Family friendly format:** simple rules and a wide age range.

---

## Requirements

* A modern browser (Chrome, Edge, Safari, or Firefox) with JavaScript enabled
* An internet connection to create or join a room
* A phone, tablet, or computer for each player

---

## Run Your Own Copy

Blersjda Kit is built as static files, so any static host works (GitHub Pages, Netlify, and so on).

1. Download or clone this repository.
2. Serve the folder over HTTPS (needed for the service worker and install support).
3. Open `index.html` in your browser.

Keep the `icons/` folder and `manifest.webmanifest` next to the HTML file so installing and favicons work correctly.

---

## Project Structure

```
Blersjda-Kit/
  index.html            Main game file (all four games)
  manifest.webmanifest  Install and PWA settings
  icons/                Favicons and app icons
  images/               Image set used by Cap
```

---

## Feedback

Found a bug or have an idea for a new game? Open an issue on the repository.
