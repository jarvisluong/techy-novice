---
title: 'When prop-drilling slows down my React apps'
date: '2019-03-10T08:11:12.357Z'
tags: ['react', 'javascript', 'redux']
---

Prop-drilling is a typical pattern in most React applications, especially when using with Redux. Personally how I wrote React apps in the past was to make a huge component to present a screen (or a page) in my app, and only those components are connected to the redux store. If I want to separate a page to sections (for better managing my code), I make a sub-component and then pass the prop from the parent component that I stated above. That pattern worked fine until I want to update a state which subscribes to a fast-changing event (form input, slider, scroll events). My app starts to slow down dramatically. After googling and wandering around Github issues in the react repo as well as popular blogs and forums, I came up with a way to drastically improve the performance of my react app.

First, I realized that in a React application, the most expensive thing which can happen is to update the DOM tree (or native tree in the case of React Native). That means I need to reduce the DOM update as much as possible, and I used the React dev tool to debug my applications. I turned on "highlighting updates" in the setting panel and started to scroll the slider which I linked to a reducer, and I was shocked that whenever the slider changes, the whole page was highlighted (which means React re-rendered them). Imagine the operation has to be done in every frame :sigh:

I started to look at blog posts and even documentation of the React library to understand how React handles DOM updates when a prop or state change. I learned that React updates a component when ANY prop or state change (except when the component has implemented a custom `shouldComponentUpdate`), and the change is defined as follow (in fact, it was just a normal Javascript comparison, but I still list them here):

- For primitive-valued props such as number, boolean, null, undefined, string: a change is a change in value. (for example 1 to 2, true to false, "hello" to "hello world")
- For reference-valued props such as functions, objects (this includes React components and Arrays): a change is a change in reference, no matter if the content of the object is similar. (I would recommend reading the book "You don't know JS" to understand this more deeply)

From the specs above it means that having reference-valued as props are the primary cause that triggers most of the unnecessary re-renders. It is even worse when I was following the pattern prop-drilling. My mistake was that I provided nearly huge slices of my redux state as props to all screen components, and then distribute some of them to each smaller section of that screen. It makes the whole screen updates every time a small part of the redux state updates, including the unrelated part of a component (since the parent component updates the whole tree). After a refractor/optimization session, I was able to speed up my app's performance with the following principles (which I intended to keep in my future react apps):

1. Use primitive values for my props as much as possible.
2. It is better to connect to redux store to any component that needs some part of the redux state to achieve the first principle, instead of passing them from the parent component. That will make the parent component re-render less frequently, and the prop changes will be necessary for every small component.
3. When I have to use Array, or function, or object as props, memoized selectors are a good source of help to avoid changing the reference of those props as much as possible. With redux, we can achieve this with the `reselect` library.
4. Avoid prop spreading as much as possible to prevent a human-made mistake. When doing prop spreading, we can easily pass an unrelated prop to a component, which makes the component itself rerender when that unrelated prop changes.

References:

1. Redux isn't slow, you're just doing it wrong - An optimization guide. https://reactrocket.com/post/react-redux-optimization/
