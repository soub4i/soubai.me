---
title: Create interactive mail utility CLI Tool using Deno
date: 2020-06-11T06:40:32.169Z
template: "post"
draft: false
slug: "create-interactive-mail-utility-cli-with-deno"
category: "deno"
tags:
  - "mail"
  - "cli"
  - "typescript"
  - "deno"
description: "Hack around deno again and create an interactive mail utility using Deno"
socialImage: "media/1_c0Kpbz6bwadk4ryJrbQiSQ.jpeg"
---

Last time I created a simple cli utility to help me to shortener url .
in today's post I will make another cli but this time more interactive to help me to send emails from my terminal 

## What is Deno (in case you don't know what is)

Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust. 

The first version is recently [released](https://deno.land/v1)


## Installation Deno

Using shell

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh

```

Using homebrew


```sh
brew install deno

```

## Let's create our CLI

I want to build a interactive CLI (Command line interface) to help me to send emails from my terminal.

First thing to do is asking the user for his email, subject and message to send after this we will send the email using smtp (Google servers) 

### Folder structure

let create a new folders with these files

```
$ mkdir dmailer && cd dmailer
$ mkdir src
$ touch src/mod.ts
$ touch src/deps.ts

```



### Show me the code

The deps.ts file will contains all our dependencies as is [recommended](https://deno.land/manual/linking_to_external_code#it-seems-unwieldy-to-import-urls-everywhere) by deno team  

let open deps.ts and add the following code

```ts
// re-exporting all needed deps
export { default as Ask } from 'https://deno.land/x/ask/mod.ts';

export { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
export { ConnectConfigWithAuthentication } from "https://deno.land/x/smtp/config.ts";

export { red, green, bold } from "https://deno.land/std/fmt/colors.ts";


```

just exporting two dependencies `Ask` (for interactive cli) and `SmtpClient` for creating a SMTP client and some cli console helpers.


Now Open src/mod.ts file and paste the following code
```ts
import { Ask, SmtpClient, ConnectConfigWithAuthentication, red, green, bold } from "./deps.ts";

// create SMTP client

const client = new SmtpClient();

const config: ConnectConfigWithAuthentication = {
  hostname: "smtp.gmail.com",
  port: 465,
  username: "email@gmail.com", // put a valid gmail account and make sure you are able to use this account with smtp
  password: "SuperPass@", // password
}

await client.connectTLS(config);

// create Ask instance 

console.log(bold("*** Welcome to DMailer ***"))


const ask = new Ask({
  prefix: '>'
});

const answers = await ask.prompt([
  {
    name: 'from',
    type: 'input',
    message: 'Enter your Email:'
  },
  {
    name: 'to',
    type: 'input',
    message: 'Enter receiver Email:'
  },
  {
    name: 'subject',
    type: 'input',
    message: 'Enter a Subject:'
  },
  {
    name: 'content',
    type: 'input',
    message: 'Write your message:'
  }
]);


try {

  if (!answers) {
    throw Error("Something is wrong !!")
  }
  const { from, to, subject, content } = answers
  if (!from) {
    throw Error("Your email is required !!")
  }
  if (!to) {
    throw Error("The email is required !!")
  }
  if (!subject) {
    throw Error("The subject is required !!")
  }

  if (!content) {
    throw Error("The message is required !!")
  }

  await client.send({
    from,
    to,
    subject,
    content,
  });

  console.log(green(`Success: Email sent to  ${to}`))


} catch (error) {

  console.log(red(`Error: ${error}`))

}
```

Before sending your email using gmail you have to allow non secure apps to access gmail you can do this by going to your gmail settings [here](https://myaccount.google.com/lesssecureapps).



## Test & Install

to test your code run this in the root folder

```
 deno run --allow-net --allow-read src/mod.ts 

```
The result 

![](media/Screenshot-20200611021956-1005x225.png)

The email :

![](media/Screenshot-20200611022219-751x277.png)


To install your script globally with a specific name:

```
deno install --allow-net --allow-read --name dmail src/mod.ts

```

Now I can use my command like that : 

```
$ dmail

```

## Output : 


![](media/Screenshot-20200611023011-871x250.png)


