---
title: 'Using Expo Unimodules with React Native Navigation'
date: '2019-03-23T12:51:16.606Z'
tags: ['react-native', 'expo']
type: 'blog'
---

![Expo+ReactNativeNavigation](./cover.png)

#### <i>TL-DR: There is an [example](https://github.com/jarvisluong/react-native-navigation-with-unimodules) github project to get started.</i>

> [Expo](https://expo.io) is a set of tools, libraries and services you can use to build native iOS and Android apps faster than ever before.

Ever since I found Expo and got started building mobile applications using Expo, I fall in love with how Expo's developers got the experience so slick and reliable, and I do not have to tackle with the native integration of lots of common native modules (such as Calendar, Location, Camera, Video, Fingerprint, etc.)

When using Expo and we need to add support for additional native modules that the SDK does not currently include, it is possible to eject from the normal workflow (they call it "managed" workflow) and get into the "ejected" workflow, where everything runs like a typical react application.

Recently, Expo has succeeded in making most of their native modules to become "unimodules," which mean those modules can be used in any react native applications. The "unimodules" gives us another options when deciding whether to create a "react-native init" app or an "expo init" app: Making a new normal react native application with the support to run expo's native modules (they call it "bare" workflow). This allows us to ultilize the flexibility of a normal react native application while being able to enjoy the high quality of expo's native modules. Navigation is an important feature in a mobile application and react native currently there are two options available: [react-navigation](https://reactnavigation.org) for JS-based implementation and [react-native-navigation](https://wix.github.io/react-native-navigation/) for using the native implementation. In some project I'm working on, using the native implementation is required, so I have to use react-native-navigation. I still want to use expo's unimodules so I dediced to try to set up a new "bare" react native application which can add expo's unimodules and react-native-navigation.

First, I used the [expo-cli](https://docs.expo.io/versions/latest/workflow/expo-cli/) to bootstrap a new react-native project and chose the "bare-minimum" option ![bare-option](./bare-minimum.jpg). This will let the expo-cli to generate a new react native project just like how we run `react-native init` but they add the support to install expo's unimodules easily. You can run the app by running `react-native run-ios` or `react-native run-android.`

To install and set up react-native-navigation, I visit their [documentation](https://wix.github.io/react-native-navigation/#/docs/Installing) and follow the instruction, with the following differences:

Since the project already has CocoaPod setup, it is better to use CocoaPod to manage iOS native dependencies than doing manual linking, so I proceeded to add the following line into the Podfile:

```
pod 'ReactNativeNavigation', :path => '../node_modules/react-native-navigation/ReactNativeNavigation.podspec'
```

With the above line, I can skip the dragging XCode project and linking binaries step mentioned in react-native-navigation documentation, and go straight to modifing the AppDelegate.m file. In the function

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
```

I modify the content as below while still following the installation documentation:

```
self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];
    NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
   [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions bridgeManagerDelegate:self];
    return YES;
```

> Notice that you need to add the option `bridgeManagerDelegate:self` to the bootstrap method, according to unimodules' [documentation](https://github.com/unimodules/react-native-unimodules#configure-ios)

With that, I have completed the iOS linking process and then proceed to link the library to the Android project. It is pretty much similar to what react-native-navigation's documentation pointed out, with the following adjustments:

- In `app/build.gradle`, we need to add this new line in `dependencies {}`, I encountered a build error before I found this solution: https://stackoverflow.com/questions/49112190/error-program-type-already-present-android-support-design-widget-coordinatorl

```
implementation 'com.android.support:design:27.1.0'
```

- In MainApplication.java, I still need to keep the property `mModuleRegistryProvider` to help unimodules registered themselves

```
private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(Arrays.<Package>asList(
      new ReactAdapterPackage(),
      new ReactAdapterPackage(),
      new ConstantsPackage(),
      new ConstantsPackage(),
      new PermissionsPackage(),
      new PermissionsPackage(),
      new FileSystemPackage(),
      new FileSystemPackage()
   ), Arrays.<SingletonModule>asList());
```

After that, we add the following line to `getPackages()`:

```
return Arrays.<ReactPackage>asList(
             // new MainReactPackage(),
             new ModuleRegistryAdapter(mModuleRegistryProvider)
 );
```

The reason I commented out but not deleting the line MainReactPackage is to enable `react-native link` to find where to add new native modules when we need to add new ones.

I am now all set to use this application with react-native-navigation while being able to install any expo's native modules (unimodules) as I want. I am now able to ultilize the best of both worlds!

I hope this post is helpful to anyone facing the same problem as mine. If any questions or suggestions arise, please feel free to comment below, and I will get back as soon as possible!
