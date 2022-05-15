---
template: post
title: Look mom no TravisCI
slug: look-mom-no-travisCI.md
category: devops
date: 2022-05-15T01:00:00.000Z
socialImage: media/hermes.png
description: Back to blogging again I'm learning golang and so I decided to create a simple CI platform.
draft: false
tags:
  - devops
  - golang
  - vue
  - CI
---

Back to blogging again I'm learning golang and so I decided to create a simple CI platform.

## 🛸 What is Hermes ?

Hermes is the winged herald and messenger of the Olympian gods. In addition, he is also a divine trickster, and the god of roads, flocks, commerce, and thieves. ... Hermes was the only Olympian capable of crossing the border between the living and the dead.

Ohh nope not that ...

Hermes **CI** (CI stands for Continuous integration) is an open-source continuous integration platform mainly written in Go.

The main idea is to clone the core feature of [TravisCI](https://travis-ci.org/) means to run a pipeline in a code repository and save logs and build status whenever a developer performs a registered event (push, PR, merge ...)

## 🚦Continuous integration (Back to school)

> Continuous integration is a DevOps software development practice where developers regularly merge their code changes into a central repository, after which automated builds and tests are run — AWS

## Breaking down the solution:

![](media/hermes.png)

So the idea is to create a process of transit of the code from developers' machines to production servers automatically. And as `git` is become the defacto standard of version control.I will be using Github webhooks to capture the developer's events on the code.

### ⚙ Config file:

It's a simple config file to tell the backend the type of job to schedule. This PoC support only Dockerized application ( app with docker file)

> Hermes.yaml

```yaml
name: My super pipeline
version: 1.0.0
schema: docker
```

> Dockerfile 🐳

A classic `Dockerfile` with instructions to be executed by `buildh`. in this example I used a very simple one

```docker
FROM yauritux/busybox-curl

RUN echo "Running build"
RUN echo "We don't need to build anything"
RUN echo "Getting Ouarzazate weather"
RUN echo "weather is goood"
```

### 💅 Frontend :

Simple nuxt.js application allow the user to authenticate using Github's OAuth and get the list of public repositories.

```
├── README.md
├── commitlint.config.js
├── components
│   ├── NuxtLogo.vue
│   └── Tutorial.vue
├── jest.config.js
├── layouts
│   └── default.vue
├── middleware
│   └── authenticated.ts
├── nuxt.config.js
├── package.json
├── pages
│   ├── index.vue
│   ├── login.vue
│   └── repos
│       ├── _id
│       │   ├── index.vue
│       │   └── job
│       │       └── _job.vue
│       └── index.vue
├── static
│   └── favicon.ico
├── store
│   ├── README.md
│   ├── index.md
│   └── index.ts
├── stylelint.config.js
├── test
│   └── NuxtLogo.spec.js
├── tsconfig.json
├── types
│   └── index.ts
└── yarn.lock

```

![](media/hermes-f.jpeg)

The magic happens when the user chooses a repository and configures it with Hermes CI (basically creating a webhooks on the repository's end (Github) to listen to Push, Pull request event)

```js
    createHook() {
      try {
        this.$axios.post(
          `${process.env.gitHubUrl}repos/${this?.user?.login}/${this?.id}/hooks`,
          {
            name: 'web',
            active: true,
            events: ['push', 'pull_request'],
            config: {
              url: `http://hermes.soubai.me/github/${this?.repo?.id}`,
              content_type: 'json',
              insecure_ssl: '0',
              digest: 'Hermes',
            },
          },
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        )
      } catch (error) {
        console.log(error)
      }
    },
```

Additionally, the frontend allows the user to track the build status and read the logs (fetching from the backend)

![](media/hermes-log.jpeg)

### 🦀 Backend

```
├── LICENSE
├── Makefile
├── go.mod
├── go.sum
├── main.go
├── models
│   └── Job.go
├── readme.md
├── server.service
└── tmp
```

A Golang HTTP server application to handle the request sent by Github whenever a registered event is triggered by user actions ex. `push`, `pull_request`. The backend uses the payload as context to create a job and schedule it in a queue message. Besides that, the backend saves status, logs, and jobs in MongoDB so we can read asynchronous operations in the frontend later.

> http server

```go

	router.HandleFunc("/github/{id}", handleGitHubWebhook).Methods("POST")
	router.HandleFunc("/github/{id}", GetJobs).Methods("GET")
	router.HandleFunc("/jobs/{id}", GetJob).Methods("GET")

	err := http.ListenAndServe(":"+os.Getenv("PORT"), corsOpts.Handler(router))
	if err != nil {
		log.Fatal(err)
	}

```

I use [Async](https://github.com/hibiken/asynq) as a message queue that uses Redis internally as a database in memory; The main goal of using Async is the classic use case of a message queue: optimize job requests load and decoupling a backend APIs part from the job Runner.

```go
func JobProcessingTask(id string, body Payload) (*asynq.Task, error) {
    payload, err := json.Marshal(JobPayload{ID: id, Body: body})
    if err != nil {
        return nil, err
    }
    return asynq.NewTask(TypeJobProcessing, payload), nil
}
```

### 🏃 Runner

```
├── Makefile
├── go.mod
├── go.sum
├── install.sh
├── main.go
├── models
│   └── Job.go
├── readme.md
└── tmp
```

The runner is an application that works with pipelines. A pipeline is a list of instructions/commands supposed to be executed by this runner as a single isolated process. In our case, the job is the pipeline defined in a `Dockerfile` inside the user's Github repository.

So basically runner's role is to :

1. Pull the user's repository code from Github
2. Run Dockerfile using [buildah](https://buildah.io/)
3. Catch build logs
4. Save everything in `MongoDB` database

```go
ctx := context.Background()
cmd = exec.CommandContext(ctx, "buildah", "bud", "--log-level", "info", "-t", strings.ToLower(body.Repository.FullName), path)
stdout, err := cmd.StdoutPipe()
cmd.Stderr = cmd.Stdout

```

## 📋 Sum up

HermesCI is a PoC of how we can make a CI system at home and gives me a great way to learn about all those concepts. you can find the code publicly here [buildah](https://github.com/soub4i/hermes-ci)

Cheers
