---
template: post
title: Smarter frontend app with Tensorflow.js
slug: smarter-frontend-app-with-tensorflowjs
category: javascript
date: 2020-08-26T01:00:00.000Z
socialImage: media/108e4db84873.jpg
description: Well in this blog post I will give you simple steps to put machine learning
  into as frontend developer that has nothing to do with AI or ML before.
draft: false
tags:
  - javascript
  - ml
  - ai
  - machine-learning
  - frontend
  - tensorflow
  - model
---
Imagine you are a simple dude frontend developer minding his `flex` and `React.Component` stuff and one day your boss tells you to add a brain to you fat ass frontend app and make it smarter .. I know you will quit the job but if you are broke as fuck && you like to challenge yourself like me you will try to learn how to do this.

Well in this blog post I will give you simple steps to put machine learning into as frontend developer that has nothing to do with AI or ML before.



# 1. Definitions

*Definitions are almost mine as far as I understand the concept please note that I'm not a Data scientist* 

**AI (Artificial intelligence)** is the theory and development of computer systems able to perform tasks normally requiring human intelligence, such as visual perception, speech recognition, decision-making, and translation between languages.

**ML (Machine learning)** is the scientific study of algorithms and statistical models that computer systems use to effectively perform a specific task. AI (Artificial intelligence) is the theory and development of computer systems able to perform tasks normally requiring human intelligence, such as visual perception, speech recognition, decision-making, and translation between languages.

ML (Machine learning) is the scientific study of algorithms and statistical models that computer systems use to effectively perform a specific task.

### 1.2 Types of ML

![](media/0_-068ud_-o3ajwq_z.jpg)

1. Supervised learning: The machine learning algorithm is trained on labeled data. Even though the data needs to be labeled accurately for this method to work, supervised learning is extremely powerful when used in the right circumstances.
2. Unsupervised machine learning holds the advantage of being able to work with unlabeled data. This means that human labor is not required to make the dataset machine-readable, allowing much larger datasets to be worked on by the program.
3. Reinforcement learning directly takes inspiration from how human beings learn from data in their lives. It features an algorithm that improves upon itself and learns from new situations using a trial-and-error method. Favorable outputs are encouraged or ‘reinforced’, and non-favorable outputs are discouraged or ‘punished’.

### 1.3 Model

![](media/images.jpeg)

 A machine learning model (basically a neural network) can be a mathematical representation of a real-world process. To generate a machine learning model you will need to provide training data (dataset) to a machine-learning algorithm to learn from.

### 1.4 Traditional app paradigm vs ML app

![](media/tvsml.png)

In the traditional app we feed algorithms to our business logic layer to get answers (processed data) but in machine learning app we feed our model with data (answers) and we get a model (algorithms)

## 2. Tensorflow & Tensorflow.js

![](media/tf.png)

**TensorFlow** is an end-to-end open-source platform for machine learning. It has a comprehensive, flexible ecosystem of tools, libraries, and community resources that lets researchers push the state-of-the-art in ML, and developers easily build and deploy ML-powered applications.

**Tensorflow.js** (previously Deeplearn.js) the library by Google is GPU accelerated via WebGL API and used for predictions by using pre-trained models in inference mode in the browser but also for the training mode itself. It mirrors the API of the popular TensorFlow library.

### 2.1 Where Tensorflow run

Basiclly everywhere :

1. Desktop running Windows, macOS or Linux (TensorFlow)
1. Cloud as a web service (Google cloud)
1. Mobile devices like iOS and Android (TensorFlow Lite)
1. Browsers (Tensorflow.js)


### 2.1 Installation of Tensorflow.js

You can use it directly via CDN 

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
```

OR using package manager : 

`
npm install @tensorflow/tfjs
`

for server side (node.js):

Option 1: Install TensorFlow.js with native C++ bindings.

`
npm install @tensorflow/tfjs-node
`

Option 2: Linux Only) If your system has a NVIDIA® GPU with CUDA support, use the GPU package even for higher performance.

`
npm install @tensorflow/tfjs-node-gpu
`

## 3. Case Study 1: Linear regression (Hello world)

![](media/lr.gif)

I will try with in this use case to train my model on the browser using tensorflow.js using a small dataset (just to demonstrate) to generate that will try to predict the price of a houses in Barcelona based on number of rooms 

```html
<html>
  <head>
    <title>Hello TensorFlow</title>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.6.1"></script>
    <script>
      const nr_epochs = 248; // higher=better but slower
      var tfinterface;
      const model = tf.sequential();

      function initTF() {
        const xs = tf.tensor2d([3, 3, 4, 4, 5]);
        const ys = tf.tensor2d([131000, 125000, 235000, 265000, 535000]);

        // 2. ML MODEL - linear regression model
        model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
        // Prep for training
        model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

        // train -- the higher the number the more accurate you'll get (but longer run time)
        tfinterface = model.fit(xs, ys, { epochs: nr_epochs });
      }

      // 3. WRAPPER AROUND PREDICT
      function predict(n) {
        return tfinterface.then(() => {
          return model.predict(tf.tensor2d([n], [1, 1]));
        });
      }

      // Helper for form
      function formpredict(v, r) {
        predict(v).then(function(res) {
          //   alert(res.get([0]));
          r.innerHTML = res.get([0]);
        });
      }
    </script>
  </head>

  <body onLoad="initTF();">
    <p></p>
    <div id="res">Wait</div>
    <p></p>
    <form
      name="iForm"
      onSubmit="formpredict(this.val.value,document.getElementById('res')); return false;"
      )
    >
      <script>
        document.getElementById("res").innerHTML = "&nbsp;";
      </script>
      Input Number: <input name="val" /><input type="submit" />
    </form>
  </body>
</html>
```

Here I trained the model and add an event listener to predict function on submitting the form 

[Code Source](https://codesandbox.io/s/determined-allen-2v1i7?file=/index.html)

## 4. Case Study 2: Coriander and Parsley classifier

In this case, I will try to create a model and use it to make predictions (identify coriander and parsley) I will not train the model in the browser like the first case for performance reasons (I used google collab [Here](https://colab.research.google.com/drive/135Oblj6v_Y2uAJOf3quw9y3F38idJLIZ) ) with this [dataset](https://github.com/alilakrakbi/Coriander-vs-Parsley)  Kudos to [Ali Lakrakbi](https://twitter.com/alilakrakbi), The output of trained model is a Keras model (Model.p5) I used [tfjs-converter](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter) to my model to Tensorflow.js compliant Model.

Finally, I just wrote an "Exploitation" code in javascript to use a pre-trained model to predict the picture if it's coriander or parsley

You can found the example [here](https://codesandbox.io/s/proud-dawn-j14mh) and the code source and more examples in this [repo](https://github.com/AbderrahimSoubaiElidrissi/tfjs-examples)

I hope this article gives you a getting started to ML and Tensorflow.js in web applications.