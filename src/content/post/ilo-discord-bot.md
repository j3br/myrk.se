---
publishDate: 2023-06-07T19:23:00Z
title: A Discord Bot for power-cycling a HPE server via iLO
excerpt: Look Upon the Light.
image: https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80
---

## The problem
I usually find myself trying to limit my power usage by shutting off my HP ProLiant server during the day, only to realize later that I forgot to power it back on. It's a common scenario that can be annoying, especially when you're away from home and unable to manually push the power button.

Sure, I can access the Integrated Lights-Out GUI through a VPN, but it's not always convenient or feasible to do so.

If it were just me utilizing the server, forgetting to power it back on wouldn't be much of an issue. However, considering that friends and family also benefit from the various services hosted on this machine, I need a better solution.

## The solution: 光 - Hikari

Hikari was inspired by a project developed by **Kerwood**, and you can find its source code on GitHub [here](https://github.com/Kerwood/discord-ilo-bot).

I set out to build my own version and opted for a slightly more modular approach. Overkill? Certainly, but it was fun nonetheless.

### Technical details
Hikari is built using [Discord.py](https://discordpy.readthedocs.io/en/stable/), an API wrapper for Discord, and communicates with the server via the iLO/Redfish API.

Just like its inspirator the bot offers three commands:
 - !start - Sends a power on request
 - !stop - Sends a power off request
 - !status - Returns the current power state

With this, even the most technically inept can easily power-cycle the server with one simple command through Discord.

<figure>
  <img src="/assets/bot.png" alt="Bot commands demo"/>
  <figcaption>Easy peasy!</figcaption>
</figure>

For easy deployment, a Docker image is available on [Docker Hub](https://hub.docker.com/r/j3br/hikari) and the source code can be found on [GitHub](https://github.com/j3br/hikari).