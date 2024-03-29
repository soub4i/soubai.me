---
title: How to add status page to your k8s cluster using kubestatus
date: 2023-01-14T06:40:32.169Z
template: "post"
draft: false
slug: "how-to-add-status-page-to-k8s-cluster-kubestatus"
category: "k8s"
tags:
  - "k8s"
  - "devops"
  - "open-source"
  - "monitoring"
description: "Let's add a status page that shows the status of our services"
socialImage: "media/kubestatus-0.png"
---

Hello in today's blog post we will learn how to add a status page to your kubernetes cluster.

## What is status page

By definition a status page is a communication page (public) that helps you inform your users about outages and scheduled maintenance.
And as kubernetes (k8s) is the preferred platform to deploy applications nowdays it's deserves to make a blog post on how to create a status page 


## pre-required to start

To be able to progress in this tutorial make make sure you have a working **kubernetes** cluster and **kubectl** installed. in this tutorial I will use a minikube to spin up a local k8s cluster.

```console
minikube start
```

![](media/kubestatus-1.png)

I will be using **kubestatus** an open-source tool that I created to make life easier 😎.

### What is Kubestatus

[Kubestatus](https://github.com/soub4i/kubestatus) is a tool that allows you to create the status of your Kubernetes cluster. It is written in Go and uses the Kubernetes API to fetch information about the clusters and resources.

The tool provides a simple and convenient way to view the current state of your cluster and resources without having to use the kubectl command-line tool or the Kubernetes dashboard.

Kubestatus can be used to quickly identify problems or issues with your cluster's services, and can be a useful tool for troubleshooting and debugging. It is designed to be easy to use and requires minimal setup, making it a useful tool for both experienced Kubernetes users and those new to the platform.

### install Kubestatus: 


#### Using helm:


You can install Kubestatus via `helm` chart

```console
helm repo add kubestatus https://soub4i.github.io/kubestatus
```

You may need sometime to update your repo list:
```console
helm repo update
```

After install the chart on namespace `kubestatus` 

```console
helm install kubestatus kubestatus/kubestatus --set namespace="default" --n kubestatus --create-namespace --wait
```


#### Using kubectl:

Clone the repo:

```console
git clone https://github.com/soub4i/kubestatus
cd kubestatus
```
Create k8s resources:

```console
kubectl create -f kubestatus.yaml
```



Check the creation of resources under the namespace `kubestatus` 

```console
kubectl get all -n kubestatus
```

![](media/kubestatus-2.png)


### Configuration 


In order to run Kubestatus on your Kubernetes cluster quickly, You need to:

- Tell Kubestatus the namespace to watch for that edit `ConfigMap` and update `namespace` value (`--set namespace="default"`)
- Tell Kubestatus the services to watch for that add annotation `kubestatus/watch='true'` to desired services:

```console
kubectl annotate svc my-service-name kubestatus/watch='true'
```

## Adding some resources for the demo

To be able to see some out put we need to create a some resources (Pod + Service). I will create a simple `nginx` deployment and expose it via a `ClusterIP` service.


In your terminal:

```console
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 1
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
EOF
```

And 

```console
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - port: 80
EOF
```

Add annotation to `nginx-service`:

```console
kubectl annotate svc nginx-service kubestatus/watch='true'
```


### Demo time

You can add the kubestatus service to your `Ingress` to get something like status.mydomain.com .. for the forwarder demo I will just use `port-forward` to expose the kubestatus service so I can access to the status page on my local network http://localhost:8080

```console
kubectl port-forward service/kubestatus-service 8080:8080 -n kubestatus
```

You should be able to see something similar to:

![](media/kubestatus-4.png)



Cheers



