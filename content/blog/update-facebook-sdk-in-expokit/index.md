---
title: 'Update Facebook SDK in your ExpoKit project'
date: '2019-01-24T14:23:16.481Z'
---

Recently, Facebook has required apps that are using Facebook SDK to update to
the latest version as soon as possible, otherwise, they will place a restriction
on those apps. In the case of your ExpoKit apps, you don't want to upgrade to
later ExpoKit SDK version just yet, or even the latest version of ExpoKit SDK
won't include the latest Facebook SDK version. This blog will show you a way to
upgrade Facebook SDK yourself and still keep the ExpoKit SDK version as you
wish. This assumes that
there are no breaking changes need to be made to upgrade the Facebook SDK itself.

For Android: This is very simple, you just need to change the `app/build.gradle`
file, change the version of `implementation 'com.facebook.android:facebook-android-sdk:x.x.x` to your own version. Then you
can build your app and voila, Facebook SDK upgrade is done!

For iOS: First, you will need to fork [the expo
repo](https://github.com/expo/expo) to make a copy of your own. Get to know the
ExpoKit tag to point at the [release](https://github.com/expo/expo/releases)
corresponding to your SDK version. Make a branch out of that tag (you can find
the instruction on how to do it
[here](https://stackoverflow.com/questions/10940981/how-to-create-a-new-branch-from-a-tag)).
Edit the file `ExpoKit.podspec` in the repo to upgrade `FBSDKCoreKit`,
`FBSDKLoginKit` and `FBSDKShareKit` to your preferred Facebook SDK version. Run
`pod update`. You have completed upgrading Facebook SDK for your ExpoKit app.
