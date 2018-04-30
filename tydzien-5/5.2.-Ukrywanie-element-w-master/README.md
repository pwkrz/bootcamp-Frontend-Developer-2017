# Hiding elements

**Assignment**

+ Place any two components in the application that contain form fields.
+ Above each form field, add an &lt;input type = "checkbox"&gt; element which, when clicked, will hide and show the component.
+ Hide one component using the * ngIf directive and the other one using the [hidden] attribute.
+ Answer the questions:

## What is the difference between these two methods?

The [hidden] attribute applies a `display: none` style property to the element, but the element is kept inside the document.

The *ngIf directive mounts/dismounts the component in the document.

## When do we use which one?

*ngIf is useful when you want to free up memory, when the element is not visible. On the other hand, [hidden] maintains the state of the element (form values, properties, etc.) regardless of its hidden/visible state.

## How can you solve the problems that the first one causes?

We can save the state of an element to variables before dismounting.