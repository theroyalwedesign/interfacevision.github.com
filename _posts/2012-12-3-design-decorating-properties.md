---
layout: post
title: "Decorating Properties of Instances"
description: "How simple interface programming allows you to decorate properties of objects."
category: design-sip
tags: [Decorating, Properties, SIP, Decorator Pattern, Observer Pattern]
author: Eric Hosick
author_twitter: erichosick
---

# Decorating Properties of Instances

## Introduction

The [Decorator Pattern](http://en.wikipedia.org/wiki/Decorator_pattern) allows you to compose and alter **object** behavior at runtime. This is a powerful design tool to have.

Adding the ability to **decorate the property** of an object would be even more powerful. It would give developers the ability to alter behavior at any point in their program (similar in concept to [aspects](http://en.wikipedia.org/wiki/Aspect-oriented_programming) but at runtime).

How is this done?

## Review of SIP Properties

Please take a quick look at our discussion on [Overloading](/design-sip/design-overloading-sip/) if you would like an introduction to how SIP properties work.

Any behavior in SIP is composed of Parts. The composed program below displays the addition of two numbers in a console:

    ..
    IPart addTwoNumbers = new ConsoleWriteLine {
      xml_text = new FloatDefault {
        xml_defaultValue =  new Add {
          xml_argLeft = new Vision.Core.Float { withFloat = 4.3f },
          xml_argRight = new Vision.Core.Float { withFloat = 2.4f }
        }
      }
    };
    IPart ignore = addTwoNumbers.withPart;
    ..

the output of this program is:

    6.7

The only "tricky" part of that program is the FloatDefault part. This part is used to convert the result of the addition from float to string (or we end up concatenating the values as strings resulting in '4.32.4' as the output).

## The Observer Part

What better way to show how to decorator a property than to show how we can observer (see [Observer Pattern](http://en.wikipedia.org/wiki/Observer_pattern)) any point in our program.

Let's provide some pseudo-code on the Observer part:

    public class Observer : PartParent {
      public Part xml_property { get; set; }
      public Part xml_actionBeforeGet { get; set; }
      public Part xml_actionAfterGet { get; set; }
    
      public override IPart withPart {
        get {
          IPart ignore = actionBeforeGet.withPart;
          IPart result = property.withPart;
          ignore = actionAfterGet.withPart;
          return result;
        }
      }
    
      public override float withFloat {
        get {
          IPart ignore = actionBeforeGet.withPart;
          float result = property.withFloat;
          ignore = actionAfterGet.withPart;
          return result;
        }
      }
      ....
    }

The property xml_property contains the part, and thus access to the property, that we are going to observe. The actions we take before and after a property is accessed is configured in the xml_actionBeforeGet and xml_actionAfterGet properties respectively. The logic for each with property is the same:

Run the action before we access the property:

    IPart ignore = actionBeforeGet.withPart;

Use the property

    float result = property.withFloat;

Run the action after we access the property.

    ignore = actionAfterGet.withPart;

Finally, return the result of the get.

    return result;

We are now able to inject an observer anywhere within our program during run-time. Woo hoo! Note the observer, in this case, is passive. We should not alter the flow of the program in any way: just observe.

## Putting it All Together

Let's print some text letting the user know we are accessing the argLeft property of Add.

    ..
    IPart addTwoNumbers = new ConsoleWriteLine {
      xml_text = new FloatDefault {
        xml_defaultValue = new Add {
          xml_argLeft = new Observer {
	          xml_property = new Float { withFloat = 4.3f },
	          xml_actionBeforeGet = new ConsoleWriteLine {
		          xml_text = new String { withString = "The Add's argLeft property will be accessed." }
            },
          xml_argRight = new Float { withFloat = 2.4f }
        }
      }
    };
    
    IPart ignore = addTwoNumbers.withPart;
    ..

the output of this program is:

    The Add's argLeft property will be accessed.
    6.7

The interesting point to notice is that the Observer is injected between xml_argLeft of Add and the Float Part which has a value of 4.3.

## Visually Representing Decorators

We should be able to represent decorators as "hooks" into our visual object language. The hook looks like a "current loop" - a device that wraps around a wire to monitor how much current flows through the wire.

<p class="pagination-centered"><img class="featurette-image img-polaroid" src="/assets/img/design-decorating-properties-observer.png"> </img></p>

We don't want to clutter up our original add program by visually injecting the Observer into our program. Instead, we are able to "attach" it to the program, as you would attaching any monitoring device to a circuit (for example).

## Cool Examples of Decorating Properties

Note that we can do all of this while the program is running: no need to code, build, and then run the program.

1. We could wrap any property of a program using a Timer part letting us know how much CPU time is used by a particular property whenever it is called.
2. We can notify other parts of a program when a property was accessed allowing us to add "onX" events anywhere in the program.
3. We can debug parts of a program during runtime without altering the existing behavior (because the observer is passive): even in production if need be.
4. We can inject logic to monitor things like conversions (of customers for example) without altering the existing behavior of our program.
5. We can inject single event triggers in our program that remove themselves from the program once they trigger.
6. We can create Agents that inject behavior within a program to monitor different parts of a program.







