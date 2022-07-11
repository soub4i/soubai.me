---

template: post

title: Breaking down etcd

slug: breaking-down-etcd

category: cloud

date: 2022-07-11T01:00:00.000Z

socialImage: media/etcd-hero.jpg

description: Just another blog post to demystify the famous etcd.

draft: false

tags:

- devops
- etcd
- distributed-system
- k8S

---



Tldr; An attempt to help you to better understand the famous **etcd** by giving an introduction on overall architecture and algorithms



##  🛸 What is etcd ?

by definition etcd is a distributed, reliable key-value (KV) store for a distributed system. so simply etcd is just a consistent, fault-tolerant database used by modern tools like [kubernetes](https://kubernetes.io) to store (mainly) a **configuration** as a key-value structure (think about it a like JSON file). And as we are using etcd to store configuration the main design is to reliably store infrequently updated data and provide reliable watch queries.

The name comes from the GNU/Linux convention used to name configuration files “/etc” and the “d” stands for distributed.Etcd was created by the same team responsible for designing CoreOS Container Linux. In December 2018, the team donated etcd to the Cloud Native Computing Foundation (CNCF)

###  📦 Components

![](media/etcd-components.png)

The etcd is a toolchain with multiple components:

- **client**: etcd official Go client for etcd API (HTTP/GRPC) .

- **Balancer**: etcd client load balancer that implements retry and failover mechanism. etcd client should automatically balance loads between multiple endpoints.

- **Endpoints**: A list of etcd server endpoints that clients can connect to.



##  💡 How etcd works

etcd is based on an algorithm called Raft Consensus Algorithm ( an enhancement of consensus in Paxos algorithm ) to provide consistency and as etcd needs to be highly available it's run on cluster mode (multiple nodes); consensus stands for multiple distributed machines agree at same information (by-elections) 

![](media/raft-ss.png)

Let's say a client sends a message to the server and the server responds with a reply in the case of a single server there is no problem because there is only one server that will take care of the decision


![](media/raft-ms.png)

but in multiple servers  case (distributed system) the server response is related to:

- Type of system:

  - Symmetric: any server can respond to the request

  - ASymmetric: only the **elected** leader server can respond to the client

- System components:

  - Cluster: a group of machines (VMs, hardwares...)

  - Leader: The chosen machine by the cluster to be Leader; The leader ensures all the write operations and does log replication (for read operations any member can serve).

  - Elections: If a leader dies (didn't send a heartbeat after a configurable timeout) or fails to respond, the remaining nodes in the cluster elect a new leader.


![](media/raft-lr.jpg)

As the leader is the responsible of handling the write operations .. the write operations in Raft world is a log driven means the leader write a record in Raft log entry and broadcast it to all followers (consistency) once the Quorum (see next paragraph) acknowledged writing the change the mark the transaction as committed.

Another interesting concept ensuring etcd fault-tolerance is how many faulty nodes are tolerable in a given etcd cluster.. for that etcd uses Quorum.

Quorum is defined as __(n+1)/2__, indicating that more than half of the nodes in the cluster constitute a quorum. for example a 3 nodes cluster, etcd still runs as long as any 2 nodes are available.

Similarly, in a 5 nodes cluster, etcd still runs as long as any three nodes are available...


![](media/quorom.jpg)


## 🏗️ Design & Data model

From physical view etcd stores the physical data as key-value pairs in a persistent b+tree and also keeps a secondary in-memory btree (to speedup indexing). Each revision (see next paragraph) of the store’s state only contains the delta from its previous revision to be efficient. A single revision may correspond to multiple keys in the tree. see here for more details [Data model](https://etcd.io/docs/v3.5/learning/data_model/). 
The datastore is built on top of BoltDB, or more specifically, BBoltDB, a fork of BoltDB (a Go key-value store) and it's also maintained by the etcd team.

From logical perspective the store is a flat binary key space and the key space has a lexically sorted index on byte string keys so range queries are inexpensive.

Besides this key space maintains multiple revisions aka using MultiVersion Concurrency Control (MCCV) in order to handle concurrent operations. 

Example of revision in etcd using `etcdctl`

```sh
$ etcdctl put foo bar         # revision = 2
OK
$ etcdctl put foo1 bar1       # revision = 3
OK
$ etcdctl put foo bar_new     # revision = 4
OK
$ etcdctl put foo1 bar1_new   # revision = 5
OK

```

Alongside revision etcd uses a term to represent the term of the leader. When the leader changes, the term value increases by 1.


![](media/etcd-term.png)



## ⚡ API

Honestly, etcd has a complex internal architecture but exposes a very nice and intuitive:

![](media/etcd-api.png)


- `Put`: operation to write data to the cluster

- `Delete`: operation to delete data from the cluster

- `Get` : operation to retrieve data from the cluster with support to queries

- `Watch` : a real time watch mechanism to subscribe to the data updates in the cluster.

- `Transactions` : a simple transaction mechanism to perform at set operations (not in an atomic way)

- `Leases` : The Leases API is a design pattern used a within distributed system, think about it like a contract that gives its holder specified rights to some resource for a limited period, in etcd case is required to detect whether a node is alive in a distributed system.

![](media/lease-etcd.png)

Here a 10sec lease is created if no operations are done during this time it will automatically be cleared. After we bind PUTs operations to the leases so that etcd automatically clears key1 and key2 when the lease dies. for keeping a lease you need to call the `lease.KeepAlive()` method. The lease is used widely within K8s and the most useful use in my opinion is service discovery where the process (backends) register address to etcd when the process is launched so the API Gateway read from etcd when a failover occurs, and the new process address is registered with etcd and API Gateway can have the new ones.

![](media/sd-etcd.png)


## 🔌 Install

You can install a pre-build version of etcd like I'm using `yay` but use whatever you want:

```sh
yay -S etcd
```

or you can use docker version

```sh
docker run -d -v /usr/share/ca-certificates/:/etc/ssl/certs -p 4001:4001 -p 2380:2380 -p 2379:2379 \
 --name etcd quay.io/coreos/etcd:v2.3.8
```

After install, you can launch the daemon like 

```sh
etcd
```

![](media/etcd-screen1.png)


To play with it we will use the client CLI `etcdctl`

![](media/etcd-screen2.png)



Cheers


