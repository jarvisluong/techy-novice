---
title: 'Managing react modals with singleton component design'
date: '2019-01-08T18:54:10.523Z'
tags: ['react', 'react-native', 'discussion']
---

Controlling modals of all kinds (informational modals, custom alerts, image lightboxes, ...) across an application is a frustrating problem that we all face when developing apps. When the app is simple, it's sufficient to place a single `<Modal />` component and have a state to toggle it on/off. However, things get complicated when you have different places to present the same modal or different kinds of modal to display in your app.

There have been a couple of design solutions for this such as using the React Context API ([this blog](https://medium.com/@BogdanSoare/how-to-use-reacts-new-context-api-to-easily-manage-modals-2ae45c7def81) is an example) or manipulating `react-navigation`'s `StackNavigator` (as described in [this blog post](https://blog.brainsandbeards.com/better-modals-in-react-native-8ea6fb207146?gi=23e52db335d3)). In this post, I would like to share my own design for this problem using a singleton `<Modal />` component. What we will achieve from this solution is an imperative API like:

```javascript
SomeModal.show(title, content, { ...options })
SomeModal.hide()
```

(Note that this is kinda similar to `react-navigation` guide [Navigating without the navigation prop](https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html))

`<SomeModal />` is a react component and it is rendered in the top-level like this:

```jsx
class App extends Component {
	render() {
        // Container is your own wrapper component
		return (
			<Container>
				{/* Your real app */}
				<SomeModal />
			</Container />
		);
	}
}
```

So how does `SomeModal` knows what to do when we call `show()` and `hide()`
methods? First, we will define component methods `__show()` and `__hide()`, then
in its constructor, we save its reference to a static property of `SomeModal` by
using `this` (since `this` in the constructor will be the reference to the
rendered component). That reference will have access to all component methods of
`SomeModal`. We now can make two static methods `show()` and `hide()` and use
it:

```jsx
class SomeModal extends Component {
	static show() {
		SomeModal.__singletonRef.__show();
	}

	static hide() {
        SomeModal.__singletonRef.__hide();
    }

	constructor(props) {
		super(props);
		SomeModal.__singletonRef = this;
	}

	__show() { ... }
	__hide() { ... }
}
```

When doing this singleton component, we need to make sure we do not use this component twice in the app, since the reference will not be correct. This is the best fit, in my opinion, when we have a defined modal style across the app and we want to show and hide it everywhere we want to. This also allows showing and hiding modal outside of a react component.

What if you have different kinds of modals? In my own project, for every kind of modal, I make a separate React component and render it to the top level like this

```jsx
	<Container>
        {...}
        <FeedbackModal />
        <LinkPreviewModal />
        <AlertModal />
    </Container />
```

Hope you found this way of working with modals useful. Please let me know your thoughts!

Happy hacking!
