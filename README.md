# WhatsApp Bot

A complete, production-ready WhatsApp Bot built with Node.js, Express, and MongoDB.

## Features

- **Webhook Verification**: Automatically handles Meta's webhook verification challenge.
- **Message Handling**: Receives and processes incoming text messages.
- **Auto-Reply System**:
  - Responds to "hi" or "hello".
  - Interactive Menu (responds to "menu").
  - Numbered options handling ("1", "2").
- **User Management**: Saves user phone numbers and tracks interaction counts in MongoDB.
- **Admin Commands**: `/users` command to check total user count.
- **Logging**: Comprehensive logging for debugging and monitoring.

## Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Meta Developer Account (WhatsApp Cloud API)

## Setup

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment**:
    Copy `.env.example` to `.env` and fill in your credentials:
    ```env
    PORT=3000
    MONGODB_URI="mongodb://localhost:27017/whatsapp-bot"
    WHATSAPP_TOKEN="your_access_token"
    PHONE_NUMBER_ID="your_phone_number_id"
    VERIFY_TOKEN="your_verify_token"
    ```
4.  **Run the server**:
    ```bash
    npm run dev
    ```

## API Endpoints

-   `GET /api/webhook`: Webhook verification.
-   `POST /api/webhook`: Receive messages.
-   `GET /health`: Health check.

## Project Structure

```
/src
  /config         # Database and WhatsApp configuration
  /controllers    # Business logic for messages
  /models         # Mongoose models (User)
  /routes         # Express routes
  /services       # External services (WhatsApp API)
  /utils          # Utilities (Logger)
  app.ts          # Express app setup
server.ts         # Server entry point
```

## License

MIT
