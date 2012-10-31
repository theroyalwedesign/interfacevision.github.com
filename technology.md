---
layout: post
title: Interface Vision - The Technology
tagline: Programming Without Coding
---
{% include JB/setup %}

{% assign posts_collate = site.posts %}

#Interface Vision - A Visual Object Language and Framework
##The Vision
> Eventually, programming will be done through composing programs visually: not through coding. This is inevitable.
Provided in this paper is a description of a visual object language and framework that gets us closer to this vision.

##Part 1 - Interface Vision
###Introduction
Interface Vision is a visual object language and fully composable object framework. The framework and visual language were developed using a programming methodology called Simple Interface Programming (SIP).

###What Makes SIP Different
Interface Vision’s framework has no public methods.

But Wait. How is that possible? If you have no public methods, then:

* How does Interface Vision pass information to a system (object) without pubic methods?
* How does Interface Vision communicate between sub-systems (objects)?

####Communication Between Systems/Objects - How We Do It

This is how Interface Vision communicates between systems:

* Properties of objects, instead of methods, contain a system’s behaviour.
* Properties contain a direct value (an object or primitive data type) or a reference to a value.
* References are handled using specific types of objects which are able to locate a value external to the system via Composite Centric Memory (CCM). CCM is described in detail later.
* All objects are located within Composite Centric Memory (CCM).

Let’s look at a specific example.

####Example Using an Add Item And Internal Information

Let’s say we want to add two integers. We create an Add type with two properties as follows:



##Footnotes

Notice how, in the first coding example, withLong contains the logic to add: opLeft.withLong + opRight.withLong. This is how properties can contain behavior.