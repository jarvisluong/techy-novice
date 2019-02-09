---
title: Building multiple version of an Expo app
date: '2019-01-17T19:08:34.187Z'
tags: ['react-native', 'how-to']
---

After working tirelessly to build your app in Expo, you are ready to bring your work to user testing. You then realize you need to have multiple build versions of your app. The possibility of multiple [`releaseChannel`](https://docs.expo.io/versions/latest/guides/release-channels#__next) from expo won't be fully helpful since each version may come with its own icon, name, configurations (different Facebook App Id, FCM token), and even package name when you want to publish those to AppStore/Play Store. Fortunately, this can be easily achieved with Expo. Let's jump right into the solution!

In `expo-cli`, there is one flag that is `--config`, where you can specify your own path to the `app.json` file. Sweet! You can clone the original `app.json` that comes by default with an expo app as many times as you want for each variant, make changes to any configuration you want. However, it is a must that you change the `slug` field if you are going to publish your app so that the OTA updates from Expo can detect the right version of your app correctly. You don't want Expo to deliver a staging version update to your production variant 😅. To start the packager for a specific variant, you will pass that variant's `app.json` file like this:

```bash
expo start --config app.another-version.json
```

You will likely want to tell your app which variant it is running on as well, to offer users with customized behaviors. To do this, you can pass your own way to identify build variant through the field `extra` in the `app.json` file. Those fields can be accessed in your app through `Constants.manifest.extra`. For example:

```jsx
// In app.staging.json
{
  "extra": {
    "variant": "staging"
  }
}

 // In your app
render() {
  // You are running in  staging mode!
  return <Text>You are running in {Constants.manifest.extra.variant} mode!</Text>
}
```

During the development, if you switch the variant, you will need to stop the old packager and run a new one with `-c` so that Expo can clear the cache from the previous variant.

I do have an example empty project where you can take a look, or use it directly: https://github.com/jarvisluong/demo-multiple-version-expo.

If you are already detached and using ExpoKit in your app, stay tuned! I am also maintaining an ExpoKit app at the moment and I will share my solution in my next post.
