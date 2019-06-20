# hyperapp-todo
A simple todo-type SPA written in Hyperapp. Supports adding/editing/deleting
tasks, reordering, marking tasks as complete, and autosave to local storage.

## Demo
A working copy of this web app is hosted
[on Github Pages](https://lpraz.github.io/hyperapp-todo).

## Building
This web app is built using Parcel. To run locally:
```
parcel index.html
```

To rebuild for Github Pages:
```
parcel build -d docs --public-url "./" --no-source-maps index.html
```