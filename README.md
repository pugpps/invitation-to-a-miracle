````markdown
# Invitation to a Miracle

An interactive digital invitation and music resource website for **"Invitation to a Miracle"**, a Christmas cantata by **Joseph M. Martin**.

The website provides a centralized and interactive way for members, singers, musicians, and ministry participants to access the available musical resources for the cantata.

## Overview

**Invitation to a Miracle** is an Advent musical celebration featuring Celtic-inspired melodies and deeply moving choral harmonies. The website was created to provide convenient access to the musical materials associated with the cantata.

The website includes:

- Demo tracks
- Accompaniment tracks
- Individual choral parts
- Music sheet viewing
- Custom audio players
- Responsive desktop and mobile layouts
- Content protection features
- Interactive navigation
- Audio playback controls

## Features

### Demo Tracks

The Demo Tracks section contains the available demonstration recordings for the cantata.

Users can:

- Play and pause tracks
- View the current playback time
- View the total duration
- Seek through the recording
- Skip backward by 5 seconds
- Skip forward by 5 seconds
- Automatically stop the previous track when another track starts playing

### Accompaniment

The Accompaniment section provides access to available accompaniment recordings.

The same custom audio player is used for convenient playback and navigation.

### Choral Parts

The Choral Parts section provides individual vocal or sectional recordings when available.

Each musical selection can contain multiple available parts. Users can select a specific part to begin playback.

If a part is not yet available, the website displays a notice indicating that the recording will be updated once released.

### Music Sheet

The Music Sheet section provides an embedded viewer for the official sheet music.

The sheet music is displayed through an embedded Google Drive viewer to allow users to view the material directly within the website.

## Custom Audio Player

The website uses a custom-built audio player instead of the browser's default audio controls.

The player includes:

- Play button
- Pause button
- Progress slider
- Current playback time
- Total duration
- 5-second rewind
- 5-second forward
- Automatic playback state management
- Error handling for unavailable audio files

The player is designed with a transparent and minimal interface to match the overall visual design of the website.

## Responsive Design

The website is designed to work across different screen sizes.

### Desktop

The desktop layout uses:

- A centered content container
- Glass-style cards
- Scrollable content sections
- Horizontal navigation controls
- Responsive audio controls

### Mobile

The mobile layout automatically adjusts to smaller screens.

It provides:

- Vertical scrolling
- Compact header
- Mobile-friendly navigation
- Responsive track cards
- Responsive audio controls
- Reduced spacing where appropriate
- Touch-friendly controls

The website detects mobile devices using both viewport width and pointer capabilities.

## Content Protection

The website includes several client-side content protection measures intended to discourage unauthorized copying of ministry materials.

These include:

- Disabled right-click context menus
- Disabled text selection
- Disabled touch callouts
- Keyboard shortcut interception
- PrintScreen key detection
- Screenshot-related shortcut detection
- Print shortcut detection
- Save shortcut detection
- Visibility-change detection
- Temporary protected-content overlay

When a protected action is detected, the website can temporarily blur the main content and display a protection message.

### Important Note

These features are intended as a deterrent and user-interface protection mechanism.

A website running in a normal browser cannot completely prevent screenshots or screen recording performed by the operating system, browser, external applications, or another device.

## Design

The website uses a dark celestial visual theme inspired by the Advent and Christmas setting of the cantata.

The design includes:

- Dark navy background
- Blue and cyan accent colors
- Soft radial lighting effects
- Glassmorphism-style cards
- Rounded containers
- Subtle shadows
- Animated content transitions
- Celestial glow effects

The website uses the following fonts:

- Cinzel
- Great Vibes
- Plus Jakarta Sans

## Technologies

The project is built using modern web technologies.

- Next.js
- React
- TypeScript
- CSS
- HTML5 Audio
- Google Drive embedded viewer
- Vercel

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
└── README.md
````

## Track Data

Musical resources are managed through the project's track data file.

Track information can include:

* Track ID
* Track title
* Audio URL
* Part links
* Part labels

This structure makes it easier to add, remove, or update recordings without modifying the main user interface.

## Audio Playback Behavior

Only one audio track is intended to play at a time.

When a new track starts:

1. The selected track begins playback.
2. The currently playing track is identified.
3. Other audio players detect the change.
4. The previous track is paused.
5. The previous player updates its state.
6. The newly selected track becomes the active player.

This prevents multiple recordings from playing simultaneously.

## Error Handling

If an audio file cannot be loaded or played, the custom player displays a message indicating that the audio file is not currently available.

This allows the website to remain usable even when some recordings have not yet been released or uploaded.

## Deployment

The website is designed to be deployed using Vercel.

A typical deployment workflow is:

```bash
npm install
npm run build
npm run start
```

For development:

```bash
npm run dev
```

The development server can then be accessed through the local development address provided by Next.js.

## GitHub

The project can be maintained through Git and GitHub.

Typical workflow:

```bash
git add .
git commit -m "Update website"
git push
```

After pushing changes to the connected repository, the deployment platform can automatically build and deploy the latest version.

## Environment

Before running the project, install the required dependencies:

```bash
npm install
```

Then start the development server:

```bash
npm run dev
```

## Copyright and Usage

The website is intended for ministry-related use and provides access to copyrighted musical materials.

The content should only be accessed, distributed, or used according to the permissions and licensing associated with the musical work.

The website does not claim ownership of the underlying copyrighted music, recordings, or sheet music.

## Credits

### Musical Work

**Invitation to a Miracle**

Composer:

**Joseph M. Martin**

### Ministry

**Rose of Sharon FBC**

## Purpose

The purpose of this project is to provide a convenient digital platform where participants can access the available resources for the **Invitation to a Miracle** cantata.

Instead of distributing individual audio files and documents separately, the website organizes the available resources into a single responsive interface that can be accessed from desktop computers and mobile devices.

## Status

The website is actively maintained and can be updated as additional recordings, accompaniment tracks, choral parts, or other resources become available.

Future updates may include:

* Additional recordings
* Additional choral parts
* Updated accompaniment tracks
* Improved mobile experience
* Additional content protection improvements
* User-interface improvements
* Performance optimizations

```
```
