// 部署 iOS
$ appcenter codepush deployment add -a ****/reactnativedemo-ios Staging
$ appcenter codepush deployment add -a ****/reactnativedemo-ios Production

// 部署 Android
$ appcenter codepush deployment add -a ****/reactnativedemo-android Staging
$ appcenter codepush deployment add -a ****/reactnativedemo-android Production

appcenter codepush deployment list -a ****/reactnativedemo-ios -k
┌────────────┬───────────────────────────────────────┐
│ Name       │ Key                                   │
├────────────┼───────────────────────────────────────┤
│ Staging    │ Ryb-2G9BR8F9DBYVP1Sn92V0rtLoF-mYEqXa1 │
├────────────┼───────────────────────────────────────┤
│ Production │ GAenhtqytvftB2AeOu5JXRwhFSli6DKl__0hB │
└────────────┴───────────────────────────────────────┘

appcenter codepush deployment list -a ****/reactnativedemo-android -k
┌────────────┬───────────────────────────────────────┐
│ Name       │ Key                                   │
├────────────┼───────────────────────────────────────┤
│ Production │ GAOlJ1cNj6UqgyjREjDUg3LpWsCYOehkWZis3 │
├────────────┼───────────────────────────────────────┤
│ Staging    │ 7ZqXHzbmva6csHyyOzhdSRGZt_VRDrlUawXUe │
└────────────┴───────────────────────────────────────┘

// 提交
appcenter codepush release-react -a ****/reactnativedemo-ios
appcenter codepush release-react -a ****/reactnativedemo-ios --description '2020.04.16 修改背景'

// 历史提交
appcenter codepush deployment history -a ****/reactnativedemo-ios Staging

appcenter codepush deployment list -a ****/reactnativedemo-ios -k
