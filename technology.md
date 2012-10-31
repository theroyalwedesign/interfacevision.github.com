---
layout: post
title: Interface Vision - The Technology
tagline: Programming Without Coding
---
{% include JB/setup %}

{% assign posts_collate = site.posts %}

# Interface Vision - A Visual Object Language and Framework
## The Vision
> Eventually, programming will be done through composing programs visually: not through coding. This is inevitable.
Provided in this paper is a description of a visual object language and framework that gets us closer to this vision.

## Part 1 - Interface Vision
### Introduction
Interface Vision is a visual object language and fully composable object framework. The framework and visual language were developed using a programming methodology called Simple Interface Programming (SIP).

### What Makes SIP Different
Interface Vision’s framework has no public methods.

But Wait. How is that possible? If you have no public methods, then:

* How does Interface Vision pass information to a system (object) without pubic methods?
* How does Interface Vision communicate between sub-systems (objects)?

#### Communication Between Systems/Objects - How We Do It
This is how Interface Vision communicates between systems:

* Properties of objects, instead of methods, contain a system’s behaviour [(1)](#id-1).
* Properties contain a direct value (an object or primitive data type) or a reference to a value.
* References are handled using specific types of objects which are able to locate a value external to the system via Composite Centric Memory (CCM). CCM is described in detail later.
* All objects are located within Composite Centric Memory (CCM).

Let’s look at a specific example.

#### Example Using an Add Part And Internal Information
Let’s say we want to add two integers. We create an Add type with two properties as shown: [(2)](#id-2):

    public interface IPart {
    	long withLong { get; set; }
    }
    public class Add : IPart {
    	public IPart opLeft { get; set; }
    	public IPart opRight { get; set; }
    	public long withLong {
    		get { return opLeft.withLong + opRight.withLong; }
    	}
    }
###### Source-1.1: The Add Part can add two numbers. {#id-s1-1}

The first thing to note is that the properties opLeft and opRight are of type IPart: not a primitive datatype like long or int. The long primitive data type comes from the withLong property of both opLeft and opRight as can be seen within Add’s withLong property.

The Long type contains the final numerical value and is implemented as follows:

    public class Long : IPart {
    	public long value { get; set; }
    	public long withLong {
    		get { return value;}
    	}
    }
###### Source-1.2: The Long Part can contain a long primitive data type.

So, let’s see how we compose addition using C# object initializers:    

    static void main() { 
    	IPart myProgram = new Add {
    		opLeft = new Long { value = 5 },
    		opRight = new Long { value = 7 }
    	};
    	long result = myProgram.withLong;
    }
###### Source-1.3: Our first program simply adds two numbers.
The result of adding two numbers is found by simply calling myProgram.withLong.

We can visually represent Add using a diagram.

<p class="pagination-centered"><img class="img-polaroid" src="/assets/img/technology-system-add-internal-example.png"><img></p>
###### Figure-1.1: An example of adding two numbers internal to a system.

In this example, the information located in the properties is internal to the system. The values are just parts of type Long assigned to properties. Let’s look at an example where the information is external.

#### Locator Objects And External Information

Figure-1.2 is a form that has two inputs. When we press “Add” on that form, two numbers are summed ([3](#id-3)).

<p class="pagination-centered"><img class="img-polaroid" src="/assets/img/technology-system-add-form.png"><img></p>
###### Figure-1.2: A form which adds two numbers.

We are only allowed to compose programs and we can’t provide information via a public method with parameters. So, we need to create a composable system/object type that can locate information on a form called FormValue#.

    public class FormValue : IPart {
    	public string nameForm { get; set; }
    	public string nameField { get; set; }
    	public long withLong {
    		get { return Ccm.shared[nameForm].field[nameField].withLong; }
    	}
    }
###### Source-1.4: The FormValue Part is able to retrieve a value from the field of a form.

The example code is almost boilerplate except the global object called Ccm which stands for Composite Centric Memory (CCM)#. Ccm will be covered in detail later.
Here is an example usage#:

    static void main() { 
    	IPart myProgram = new Add {
    		opLeft = new FormValue {
    			nameForm = “AddForm”,
    			nameField = “opLeft”
        },
    		opRight = new FormValue {
          nameForm = “AddForm”,
          nameField = “opRight”
        }
    	};
    	long result = myProgram.withLong;
    }
###### Source-1.4: The values to add are external to the Add part.

A visual representation of this example is shown in Figure-1.3.

<p class="pagination-centered"><img class="img-polaroid" src="/assets/img/technology-system-add-external-example.png"><img></p>
###### Figure-1.3: An example of adding two numbers external to a system.

## Footnotes

{#id-1} 1. Notice how, in the first coding example, withLong contains the logic to add: opLeft.withLong + opRight.withLong. This is how properties can contain behaviour.

{#id-2} 2. Interface Vision was written in C#. Note that we are providing a withLong property where, later on in the page, you see it is withSystem. In reality, and for execution speed, every object can implement a with* method where * is a primitive data type like long, int, float, boolean, long[], etc.

{#id-3} 3. Note that, to keep the example simple, we do not provide a configuration for the form itself.
