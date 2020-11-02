---
title: build CLI Tool with Deno
date: 2020-05-28T06:40:32.169Z
template: "post"
draft: false
slug: "build-cli-tool-with-deno"
category: "deno"
tags:
  - "url-shorten"
  - "cli"
  - "typescript"
  - "deno"
description: "Today we will build a small CLI to help us to shorten url using Deno"
socialImage: "media/deno-v1.jpg"
---

Deno is the new project from the creator of node.js Ryan Dahl who wants to correct the mistakes previously made on node.js runtime I suggest you  watch this [video](https://www.youtube.com/watch?v=M3BM9TB-8yA&vl=en).

## What is Deno

Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust. 

The first version is recently [released](https://deno.land/v1)

## 2. Features

- Secure by default. No file, network, or environment access, unless explicitly enabled.
- Supports TypeScript out of the box.
- Ships only a single executable file.
Has built-in utilities like a dependency inspector (deno info) and a code formatter (deno fmt).
- Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: deno.land/std

From my little experience, the best way to avoid being stressed in this kind of situations is to be more and more exposed to this thing your brain will find a way to handle this situation

## 3. Installation Deno

Using shell

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh

```

Using homebrew


```sh
brew install deno

```

## 3. Let's build something

I want to build a simple CLI (Command line interface) to help me to shorten a long URL easily.

So basically I will catch the url from CLI arguments, test URL validity and create short URL using [cleanuri](https://cleanuri.com) free API

### Folder structure

let create a new folder with these files

```
MySuperCLI
└── src
    └── main.ts

```

### Show me the code


Open src/main.ts file and paste the following code
```ts
const { args: [url] } = Deno;
import { red, green, blue, bold } from "https://deno.land/std/fmt/colors.ts";

const baseURL: string = "https://cleanuri.com/api/v1/"



function isUrlValid(input: string) {
    const regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var url = new RegExp(regexQuery, "i");
    return url.test(input);
}

async function shortify(url: string): Promise<{ result_url: string }> {

    if (url === "" || url === undefined) {
        throw { error: "Please provide an url" };

    }

    if (!isUrlValid(url)) {
        throw { error: "Please provide a valid url" };
    }

    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    };
    const res = await fetch(`${baseURL}shorten`, options);
    const data = await res.json();
    return data;
}

try {

    const { result_url } = await shortify(url);
    console.log(blue(`${bold('Long URL:')}: ${url}`))
    console.log(green(`${bold('Short URL:')} ${result_url} `))


} catch ({ error }) {

    console.log(red(`Error: ${error}`))

}
```

In deno there is no package.json file so the  modules are imported using a URL and they're cached the first time you run your app.

```ts
const { args: [url] } = Deno;
import { red, green, blue, bold } from "https://deno.land/std/fmt/colors.ts";

```

 In the code above, I import colors function to colorize the output message and I destruct the args variable from the Deno namespace which simply returns the arguments passed to a script and gets the first argument.

 ```ts
function isUrlValid(input: string) {
    const regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var url = new RegExp(regexQuery, "i");
    return url.test(input);
}

async function shortify(url: string): Promise<{ result_url: string }> {

    if (url === "" || url === undefined) {
        throw { error: "Please provide an url" };

    }

    if (!isUrlValid(url)) {
        throw { error: "Please provide a valid url" };
    }

    const options = {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    };
    const res = await fetch(`${baseURL}shorten`, options);
    const data = await res.json();
    return data;
}

```

After I create two function the first one to validate url (Stolen from stackoverflow) and the second is just an async function that return the result from API

```ts

try {

    const { result_url } = await shortify(url);
    console.log(blue(`${bold('Long URL:')}: ${url}`))
    console.log(green(`${bold('Short URL:')} ${result_url} `))


} catch ({ error }) {

    console.log(red(`Error: ${error}`))

}

```

the last part it the code execute every time you call CLI from your terminal

## Test & Install

to test your code run this in the root folder

```
 deno run --allow-net src/main.ts https://www.google.com

```

if everything goes right you will see both URLs long and short one 

To install your script globally with a specific name Deno provides a [Script installer](https://deno.land/manual/tools/script_installer) for this :


```
deno install --allow-net --name shortify src/main.ts

```

Now I can use my command like that : 

```
shortify https://www.soubai.me/posts/design-patterns-in-javascript-made-easy-part-iii

```

## Output : 


![](media/Screenshot-20200531004639-880x145.png)


Code available on [github](https://github.com/AbderrahimSoubaiElidrissi/deno-url-shorten-cli)