current version : 1.0.x

# What is that ?
A simple angular directive to keep elements sticky on top of the screen when you scroll. You can even stack them, that's magic !

# How to use it
### NPM style
    npm install angular-sticky-top --save
note : angular-sticky was already used, arf :/

### Old fashion style
    <script src="angular-sticky.min.js"></script>
    
### Time to stick
Add some css, it's not applied in directive so you are free to do whatever your want.

    .sticky-wrapper{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }

    <div ng-sticky>
        ...
    </div>

note : your element will be wrapped into a div with `sticky-wrapper` class.
    
### Options
`keep-visible` : will keep the element when scrolling, so next will stack under it.

`css` : classes to apply to the wrapper.

# Demo \o/
[http://arca-computing.github.io/angular-sticky/](http://arca-computing.github.io/angular-sticky/)