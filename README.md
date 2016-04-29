current version : 1.0.6

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

    <div ng-sticky scrolling-elem="'#myScrollingView'" super-sticky="true" css="'custom1 custom2'">
        ...
    </div>

note : your element will be wrapped into a div with `sticky-wrapper` class.
    
### Options
`scrolling-elem` (css selector, default is document) : scrolling element to listen for scroll. For example with a ui-view I needed to set it.

`super-sticky` (true/false, false default) : will keep the element when scrolling, so next will stack under it.

`css` : classes to apply to the wrapper.

# Demo \o/
[http://arca-computing.github.io/angular-sticky/](http://arca-computing.github.io/angular-sticky/)