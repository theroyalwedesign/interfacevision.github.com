---
layout: post
title: "Defining and Using Properties in SIP"
description: ""
category: documentation-sip
tags: [SIP Properties, Properties, Attributes]
author: Eric Hosick
author_twitter: erichosick
---

## Defining and Using Properties in SIP

A property in Simple Interface Programming (SIP) is different from attributes or traditional properties.

A SIP property can contain a part instance and software behavior.

As such, accessing a SIP property will:

1. return part located in that property.
1. run behavior contained within the property.
1. both locate a part and run the behavior on the part.

## Defining Properties in SIP

Two steps are required to define a SIP property.

### Step 1 - Persisting Properties

First, we define how the property is persisted.

    private ItemClass p_propertySip = Empty.instanceStatic;
    [XmlElement("propertySip")] public ItemClass xml_propertySip {
      get { return p_propertySip; }
      set {
        p_propertySip = (null != value) ? value : Empty.instanceStatic;
        p_propertySip.parentDirect = this;
      }
    }

Every SIP property has an XmlElement with a property name of xml_propertySip where propertySip is the name of the property. The Name of the element is almost always the same as the name of the property (in this case propertySip).

    [XmlElement("propertySip")] public ItemClass xml_propertySip { ... }

The get scope of the property always returns the part located in p_propertySip as seen here: 

    get { return p_propertySip; }
	
where p_propertySip is defined as:

private ItemClass p_propertySip = Empty.instanceStatic;

Setting a SIP property involves setting the p_propertySip property and the properties parent part.

A SIP property can **never** be null. As such, on setting the property, we check for null and set the instance to an Empty part if null was passed:

    p_propertySip = (null != value) ? value : Empty.instanceStatic;
    
The part placed within a SIP property has a "parent" or another part that owns the part. As such, we set the parent of the new property to the current Part:

    p_propertySip.parentDirect = this;

### Step 2 - Accessing Properties
    
Second, we need to describe how to access the persisted property:

    [XmlIgnore] public IPart propertySip {
      get { return xml_propertySip.callWith ? xml_propertySip.withItem : xml_propertySip; }
    }

You almost always access a SIP property through this property. Here is where we decide if we return a Part, run the behavior of a Part or do both.

The callWith property of every Part is, by default, true. That means the behavior will always be called on a Part unless callWith is overridden. When overridden, and set to false, the access a property will return the part persisted in xml_propertySip.

### Putting It All Together

Here is an example of a fully defined SIP property named variables.

		[XmlIgnore] public IPart variables {
			get { xml_variables.callWith ? xml_variables.withItem : xml_variables; }
		}
		
		private ItemClass p_variables = Empty.instanceStatic;
		[XmlElement("variables")] public ItemClass xml_variables {
			get { return p_variables; }
			set {
				p_variables = (null != value) ? value : Empty.instanceStatic;
				p_variables.parentDirect = this;
			}
		}

## Using Properties in SIP

### Creating a Part Instance

When programmatically creating a part, you use the xml_propertySip. An example of creating a Template part is provided:

    ...
    IPart template = new Template {
      xml_variables = new FloatNamed { name = "some name", value = 4.0 },
      xml_action = new ...
    }
    ...

### Using a Property

When programming, you use a property by simply accessing the property like so:

    ...
    IPart variablesFound = template.variables;
    ...

In this example code along with the above example code, since callWith is true, the withItem of the Part located in xml_variables is called. This happens to be a FloatNamed which, when withItem is called, returns an instance of itself.


## Improving Access Time

In some cases, your property may always want to run withItem of the Part placed in a property. In this case, we can simplify the implementation as follows:

    [XmlIgnore] public IPart propertySip {
      get { return xml_propertySip.withItem; }
    }

Let's consider an add Part which contains a left and right argument. Add and is defined as follows:

    namespace Vision.Core {
      [Serializable] public class OpArgDual : Part, IArgDouble {
        [XmlIgnore] public IPart argLeft {
          get { return xml_argLeft.withItem; }
        }
    
        private ItemClass p_argLeft = Empty.instanceStatic;
        [XmlElement("argLeft")] public ItemClass xml_argLeft {
          get { return p_argLeft; }
          set {
            p_argLeft = (null != value) ? value : Empty.instanceStatic;
            p_argLeft.parentDirect = this;
          }
        }
    
        [XmlIgnore] public IPart argRight {
          get { return xml_argRight.withItem; }
        }
    
        private ItemClass p_argRight = Empty.instanceStatic;
        [XmlElement("argRight")] public ItemClass xml_argRight {
          get { return p_argRight; }
          set {
            p_argRight = (null != value) ? value : Empty.instanceStatic;
            p_argRight.parentDirect = this;
          }
        }
      }

      [Serializable] public class Add : OpArgDual {
        [XmlIgnore] public override int withInt {
          get {
            return argLeft.withInt + argRight.withInt;
          }
        }
      }
    }

In this case, we always need to use the value of argLeft or argRight when doing mathematical operations with left and right arguments. We never want to return the Part and use it in some way. So, in this case, we can simplify the get scope of argLeft and argRight directly accessing the persisted xml_argLeft.withItem (or xml_argRight.withItem).



## Why Not Use Macros To Define A Property?

We don't use macros because C# does not support macros [Why doesn't C# support #define macros?](http://blogs.msdn.com/b/csharpfaq/archive/2004/03/09/86979.aspx)







