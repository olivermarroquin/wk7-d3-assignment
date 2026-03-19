# AI Product App

## Overview

This is a small web application that takes user input from the DOM and uses it to call an AI API (Cloudflare Workers AI). Once AI replies, it renders the response on the page. The app demonstrates dynamic async API requests, user input handling, and UI state management.

---

## How to Run

1. Clone or download the repository
2. Open the project folder
3. Open `index.html` in your browser with Five Server

---

## Features

- Two user inputs:
  - Product Topic → what the AI talks about
  - Response Tone → how the AI responds
- Submit button triggers API request
- Displays:
  - Loading state
  - Error state
  - Success state (AI response)

---

## How Inputs Affect the API Request

The app builds a request body like this:

```json
{
  "messages": [
    {
      "role": "system",
      "content": "Respond in a [tone] tone..."
    },
    {
      "role": "user",
      "content": "Tell me about [topic]..."
    }
  ]
}
```
