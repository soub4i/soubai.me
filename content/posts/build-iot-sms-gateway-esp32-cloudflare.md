---
title: Build an IoT SMS Gateway using ESP32 and Cloudflare Workers
date: 2025-10-25T06:40:32.000Z
template: "post"
draft: false
slug: "build-iot-sms-gateway-esp32-cloudflare"
category: "iot"
tags:
  - "esp32"
  - "iot"
  - "cloudflare"
  - "rust"
  - "go"
description: "Build a complete SMS forwarding system using TTGO T-Call ESP32, Cloudflare Workers, and a terminal UI client"
socialImage: "media/esp32.jpg"
---

After my two backup phones died at the worst possible time, I decided to build something more reliable. Instead of buying another phone that might die, I grabbed a TTGO T-Call board from my drawer and spent a weekend building Lghnay - a dedicated SMS gateway that forwards messages to the cloud.

## What is Lghnay

Lghnay (Arabic: لغناي) is a complete IoT solution for forwarding SMS messages to the cloud. The system captures incoming SMS messages using an ESP32 module with an integrated SIM800 modem, forwards them to a serverless backend, stores them in a database, and provides real-time email notifications.


![](media/a.png)

The project consists of three interconnected components:

- **Firmware (C++/Arduino)**: Runs on the TTGO T-Call ESP32 board
- **Worker (Rust)**: Cloudflare Workers-based API for processing SMS data
- **TUI Client (Go)**: Terminal interface for viewing messages

## Use Cases

This system is perfect for:

- 📲 Remote SMS monitoring and logging
- 🔐 Two-factor authentication code forwarding
- 🚨 Alert system integration
- 🌐 IoT communication gateway

## Hardware Requirements

Before we start, you'll need:

- TTGO T-Call V1.4 (ESP32 with SIM800C/L modem)
- SIM card with SMS capability
- USB cable for programming and power
- WiFi network for internet connectivity

## Part 1: Setting Up the Firmware

### Install Dependencies

Install the following libraries in your Arduino IDE:

- [TinyGsmClient](https://github.com/vshymanskyy/TinyGSM) - For SIM800 modem communication
- WiFi (ESP32 standard library)
- HTTPClient (ESP32 standard library)
- Wire (I2C library for IP5306)

### Create Configuration File

Create a `config.h` file in your firmware directory:

```cpp
// config.h
#define SerialMon Serial
#define SerialAT Serial1

// IP5306 Power Management
#define IP5306_ADDR 0x75
#define IP5306_REG_SYS_CTL0 0x00

// Modem GPIO Pins
#define MODEM_RST 5
#define MODEM_PWKEY 4
#define MODEM_POWER_ON 23
#define MODEM_TX 27
#define MODEM_RX 26
#define I2C_SDA 21
#define I2C_SCL 22

// WiFi Credentials
const char* ssid = "Your_WiFi_SSID";
const char* password = "Your_WiFi_Password";

// Server Configuration
const char* serverURL = "https://your-worker-url/set";
const char* apikey = "Your_Auth_Token_Reversed";
const char* simPIN = ""; // Leave empty if no PIN required
```

### Key Features

The firmware includes:

- ⚡ Power management with IP5306 boost control
- 📡 Dual connectivity (WiFi + GSM/GPRS)
- 📨 Real-time SMS reception and parsing
- 🔒 Secure HTTPS data transmission
- 🔄 Automatic reconnection handling

### Upload the Firmware

Connect your TTGO T-Call via USB, select ESP32 Dev Module as your board, set upload speed to 115200, and upload the firmware.

## Part 2: Deploying the Cloudflare Worker

The serverless backend is built with Rust and runs on Cloudflare Workers, providing scalability and global distribution.

### Prerequisites

You'll need:

- Cloudflare Workers account
- Wrangler CLI installed
- Resend API account for email notifications

### Configure Environment Variables

Set up the following in your Cloudflare Worker dashboard:

Here is the table converted into a list format:

* **AUTH_KEY**: (Secret) The **un-reversed authentication string** used for the custom "Cisab" scheme.
* **RESEND_API_KEY**: (Secret) The **API key for the Resend email service**, used for sending notifications.
* **DB**: (D1 Binding) The **D1 Database binding name**, linking the Worker to the message storage.
* **FROM_EMAIL**: (Variable) The **sender email address** for the notifications.
* **TO_EMAIL**: (Variable) The **recipient email** address for receiving notifications of new SMS messages.

### Create Database

Create a D1 database and run this SQL:

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender TEXT NOT NULL,
  sms TEXT NOT NULL,
  ts TEXT NOT NULL
);
```

### Deploy the Worker

Navigate to the worker directory and deploy:

```bash
cd worker
wrangler publish
```

### Understanding "Cisab" Authentication

The project uses a custom authentication scheme called "Cisab" (literally "Basic" spelled backwards). Instead of standard Basic auth, it uses a reversed token:

1. Configure a secret `AUTH_KEY` (e.g., `"mySecretKey123"`)
2. Reverse this key: `"321yeKterceSym"`
3. Send it in the Authorization header:

```
Authorization: Cisab 321yeKterceSym
```

The worker reverses it back and validates against the stored `AUTH_KEY`.

## Part 3: Building the TUI Client

The terminal user interface is built with Go and provides an easy way to view and manage stored messages.

### Prerequisites

Install Go 1.20 or higher.

### Run the Client

![](media/tui.png)


Set environment variables and run:

```bash
export API_URL=https://your-worker-url
export TOKEN=your_reversed_auth_token
go run .
```

Or build and run:

```bash
go build -o ./bin/lghnay-tui
API_URL=https://your-worker-url TOKEN=your_token ./bin/lghnay-tui
```

### Features

- 🖥️ Clean terminal user interface
- 🔐 Secure API authentication
- 📋 Message listing and viewing
- 🎨 Easy-to-use command-line interface

## API Endpoints

The Worker provides the following REST endpoints:

### Health Check
```
GET /health
```

### Get All Messages
```
GET /get
```
Returns all stored SMS messages (newest first).

### Get Specific Message
```
GET /get/:id
```
Returns a message by ID.

### Store New Message
```
POST /set
Content-Type: application/json

{
  "sender": "+1234567890",
  "sms": "Message content",
  "ts": "2025-10-24 12:00:00"
}
```
Stores a new SMS and triggers email notification.

## Testing the System

Once everything is set up:

1. The ESP32 will automatically connect to WiFi and initialize the modem
2. Send an SMS to your SIM card
3. The firmware captures and forwards it to the Worker
4. The Worker stores it in D1 and sends an email notification
5. View messages using the TUI client

## Why Build This?

Sometimes the best solutions come from the most annoying problems. Rather than relying on backup phones that can die unexpectedly, this system provides:

- No screens to crack
- No batteries to bloat
- No operating systems to update
- Just a simple, purpose-built device that does one thing well

## Conclusion

Lghnay demonstrates how IoT, serverless computing, and simple terminal interfaces can work together to solve real-world problems. The combination of ESP32 for hardware interfacing, Cloudflare Workers for scalable backend processing, and Go for a clean user interface creates a robust and maintainable system.

The project is open source and available on [GitHub](https://github.com/soub4i/lghnay). Contributions are welcome!

## What's Next?

Possible improvements include:

- Adding support for sending SMS messages
- Implementing message filtering and routing
- Creating a web dashboard alongside the TUI
- Adding support for multiple SIM cards

Have you built something similar? I'd love to hear about your IoT projects in the comments below!