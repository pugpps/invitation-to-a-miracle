# Invitation To A Miracle

A responsive digital invitation and music resource website for **Invitation To A Miracle**, a Christmas/Advent cantata by **Joseph M. Martin**.

The website provides a centralized and mobile-friendly way for invited users to access the cantata's demo tracks, accompaniment tracks, choral parts, and music sheet.

## Features

- 🎵 **Demo Tracks**
  - Listen to available demo recordings.
  - Custom audio player with play/pause controls.
  - 5-second forward and backward controls.
  - Audio progress bar.
  - Current playback time and total duration.
  - Automatically pauses the previously playing track.

- 🎹 **Accompaniment**
  - Access available accompaniment recordings.
  - Uses the same custom audio player interface.

- 🎼 **Choral Parts**
  - Access individual vocal parts when available.
  - Part selection for different recordings.
  - Automatically starts the selected part.
  - Displays a notice when a part is not yet available.

- 📄 **Music Sheet**
  - Embedded Google Drive music sheet viewer.
  - Allows the official music score to be viewed directly from the website.

- 📱 **Responsive Design**
  - Optimized for desktop and mobile devices.
  - Mobile layout automatically adjusts based on screen size and touch capability.
  - Scrollable content on mobile devices.
  - Desktop interface uses a contained full-screen layout.

- 🌌 **Celestial / Advent Theme**
  - Dark blue visual design.
  - Subtle celestial lighting effects.
  - Glassmorphism-inspired cards.
  - Animated content transitions.
  - Typography using Cinzel, Great Vibes, and Plus Jakarta Sans.

- 🔒 **Content Protection**
  - Disables right-click/context menus.
  - Prevents common browser shortcuts associated with saving, printing, and developer tools.
  - Detects Print Screen keyboard events where supported.
  - Displays a protected-content overlay when screen capture activity or page visibility changes is detected.
  - Disables text selection and mobile long-press callouts.

> **Note:** Browser-based screenshot protection cannot completely prevent screenshots or screen recording. Operating systems, browsers, and mobile devices can capture content outside the control of a webpage. The implemented protection is intended to discourage casual copying and provide an additional layer of content protection.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS-in-JS / React inline styles
- Google Fonts
- Google Drive Embedded Viewer
- Vercel
- GitHub

## Project Structure

```text
.
├── app/
│   ├── page.tsx
│   └── ...
├── data/
│   └── tracks.ts
├── public/
│   ├── cover.jpg
│   └── ...
├── package.json
├── tsconfig.json
├── next.config.*
└── README.md

Track Data

The available tracks are maintained in:

data/tracks.ts

The project separates the audio resources into:

demoTracks
accompanimentTracks
partsTracks

Each track contains the information required by the custom audio player, such as its title, identifier, and audio URL.

Custom Audio Player

The website uses a custom audio interface instead of displaying the browser's default audio controls.

The player provides:

Current Time
     │
     ▼
[ Progress Bar ]
     │
     ▼
↺ 5s    ▶ / ⏸    ↻ 5s

The player includes:

Play
Pause
Seek forward 5 seconds
Seek backward 5 seconds
Progress seeking
Duration display
Automatic playback management
Error handling for unavailable audio

The play/pause button uses a clean transparent interface without the browser's default audio-control styling.

Content Organization
Demo Tracks

The Demo Tracks section contains the primary demonstration recordings for the cantata.

Accompaniment

The Accompaniment section provides instrumental/accompaniment recordings for rehearsal and preparation.

Choral Parts

The Choral Parts section organizes individual vocal recordings and allows users to select the available part they need.

Music Sheet

The Music Sheet section provides an embedded viewer for the official score.

Responsive Behavior

The application uses responsive styling to provide separate layout behavior for desktop and mobile screens.

Desktop
┌──────────────────────────────────────────────┐
│                    Header                    │
├──────────────────────────────────────────────┤
│ Demo │ Accompaniment │ Parts │ Music Sheet   │
├──────────────────────────────────────────────┤
│                                              │
│                   Content                    │
│                                              │
├──────────────────────────────────────────────┤
│              Rose of Sharon FBC              │
└──────────────────────────────────────────────┘
Mobile
┌──────────────────────┐
│        Header        │
├──────────────────────┤
│ Demo   Accompaniment │
│ Parts  Music Sheet   │
├──────────────────────┤
│                      │
│      Track List      │
│                      │
│      Track List      │
│                      │
│      Track List      │
│                      │
└──────────────────────┘

Mobile content is allowed to grow vertically so that the entire track list can be accessed through normal page scrolling.

Installation

Clone the repository:

git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git

Enter the project directory:

cd YOUR-REPOSITORY

Install dependencies:

npm install

Run the development server:

npm run dev

Open the local development server:

http://localhost:3000
Build

Create a production build:

npm run build

Run the production server:

npm start
Deployment

The website is designed to be deployed using Vercel.

After connecting the GitHub repository to Vercel, the application can automatically redeploy whenever changes are pushed to the configured branch.

Typical workflow:

git add .
git commit -m "Update website"
git push

Vercel then builds and deploys the updated application.

Updating Tracks

To add or modify an audio track, edit:

data/tracks.ts

Example:

{
  id: "01",
  title: "Overture",
  url: "/audio/overture.mp3"
}

If the audio file is hosted externally, the url can point to the appropriate hosted resource.

Updating the Cover

The main invitation artwork is loaded from:

/public/cover.jpg

Replacing this file with another image using the same filename updates the cover displayed on the website.

Music Sheet

The music sheet viewer uses a Google Drive preview URL:

https://drive.google.com/file/d/FILE_ID/preview

If the music sheet is replaced, update the corresponding Google Drive file ID in the Music Sheet section of the application.

Security and Content Protection

This website includes client-side measures intended to discourage unauthorized copying of the provided materials.

Implemented measures include:

Disabled context menu
Disabled text selection
Disabled mobile callouts
Print Screen detection where supported
Detection of common screenshot/browser shortcuts
Print shortcut prevention
Protected-content overlay
Page visibility detection
Disabled browser audio download controls
Disabled Picture-in-Picture for the custom audio player

These measures should not be considered a replacement for server-side authorization, DRM, access control, or copyright enforcement.

Because the website runs inside a user's browser, determined users may still be able to capture content using operating-system-level screenshots, external recording devices, browser developer tools, or other methods.

Credits

Cantata: Invitation To A Miracle

Composer: Joseph M. Martin

Organization: Rose of Sharon FBC

Website developed as a private digital resource for accessing cantata rehearsal and performance materials.

License

This project is intended for private/ministry use.

The musical recordings, sheet music, artwork, and other copyrighted materials contained or linked through this website remain the property of their respective copyright holders.

Do not redistribute, reproduce, or publicly share copyrighted materials without appropriate permission.

Invitation To A Miracle

Experience the wonder, hope, and joy of the Advent season.
