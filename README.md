# Music Shuffler 🎵

A lightweight, offline-first music player web application for shuffling and playing MP3 files from your local device.

## Features

- **Local Music Playback**: Load and play MP3 files directly from your device—your music never leaves your computer
- **Shuffle Mode**: Randomly shuffle through your selected music folder
- **Repeat Modes**: Toggle between no repeat, repeat one track, and repeat all
- **Interactive Playlist**: View and click on any track in your playlist to start playing from that song
- **Queue Preview**: See the next 5 tracks queued up in the "Up Next" section
- **Responsive Controls**:
  - Play/Pause controls
  - Next/Previous track navigation
  - Seek bar with current time and duration display
  - Shuffle and repeat toggles
- **Media Session Support**: Control playback from your device's media controls (keyboard shortcuts, lock screen controls)
- **Progressive Web App Ready**: Installable as a standalone app with a service worker for offline support
- **Clean UI**: Minimal, music-focused interface with emoji controls

## How to Use

1. Open the application in your browser
2. Click **"Upload Folder"** or the folder icon to select your music folder
3. Choose all your MP3 files from your device
4. Use the player controls to:
   - Play/pause tracks
   - Skip to next/previous songs
   - Enable shuffle mode (active by default)
   - Cycle through repeat modes
   - Click any track in the playlist to play it

## Technical Stack

- **Frontend**: HTML, CSS, JavaScript
- **Storage**: Runs entirely in-browser (no server needed)
- **PWA**: Manifest file for installability and service worker support

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AdithiDShetty/music-shuffler.git
