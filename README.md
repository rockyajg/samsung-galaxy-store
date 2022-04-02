# Samsung Galaxy Store App Page Generator

## Installation

```sh
npm install
```

## App Page Prerequisites

1. Create a new source folder inside of the `/app/` folder using a suitable name in the form of a [URL Slug](https://en.wikipedia.org/wiki/Clean_URL#Slug).
1. Create an index.md file inside of the newly-created source folder.  See `/apps/app-1/index.md` for an example of the required Front Matter and formatting.
1. Create a new `images` folder inside of the newly-created source folder.  Add the app's icon and images for the scrollable gallery into this folder.

## Running The Command Line Utility

### Build app pages for the source folders
```sh
npm run build
```

### Build and preview
```sh
npm start
```