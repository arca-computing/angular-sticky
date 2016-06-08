current version : 1.1.0

# What is that ?
A simple angular directive to keep elements sticky on top of the screen when you scroll. You can even stack them, that's magic !

# How to use it
### NPM style
    npm install angular-sticky-top --save
note : angular-sticky was already used, arf :/

### Old fashion style
    <script src="angular-sticky.min.js"></script>
    
### Time to stick

    $scope.myScrollingView = document.getElementById('#ui-view');
    $scope.listenResize = document.getElementById('#my-phantom-div-with-same-with-of-my-elem-to-help-elem-resize-when-window-resizes');

    <div ng-sticky scrolling-elem="myScrollingView" super-sticky="true" css="'custom1 custom2'" listen-resize="listenResize">
        ...
    </div>

note : `.sticky` will be applied to your element, `.sticky-is-visible` if sticky is applied and element is visible.
    
### Options
`scrolling-elem` (default is document) : scrolling element to listen for scroll. For example with a ui-view I needed to set it.

`super-sticky` (true/false, false default) : will keep the element when scrolling, so next will stack under it.

`css` : classes to apply to the wrapper.

`listenResize` : will use this item with when window resize, if null window resize will not be listened. If you don't use this option sticky and their replacer will not resize, and it's gonna be bad.

# Demo \o/
[http://arca-computing.github.io/angular-sticky/](http://arca-computing.github.io/angular-sticky/)