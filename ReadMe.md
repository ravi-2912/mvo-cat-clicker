# Model-View-Octopus :octopus: Cat Clicker App

A Cat Clicker app to demonstrate design pattern using Model-View-Octopus :octopus: (MVO) using vanilla javascript i.e. no framwork. Here to make things interesting I am using Octopus :octopus:.

The MVO paradigm has been constructed using four objects - `model`, `view`, `viewNav` and `octopus` :octopus:. These  objects separate the cats' data (Model) from what the user sees (Views) where the interaction between the two is managed seperately (Octopus :octopus:) which essentially is ViewModel.


#### MVVM using [Knockout JS](http://knockoutjs.com/)
The [ko branch](https://github.com/ravi-2912/mvo-cat-clicker/tree/ko) of this master demonstrates the same app using Knockout JS, with significant less coding required. Indeed using a framework is efficienct.

***
### Dependencies
The followings libraries are needed to run the app
```
jQuery 3.2
Bootstrap 4
```

### Installation
Just download and run `index.html`. Make sure the following files are present
```bash
$> tree
.
├─ css/
│    └─ style.css
├─ js/
│    └─ script.js
├─ index.html
└─ ReadMe.md
```