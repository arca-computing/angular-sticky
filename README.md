current version : 1.0.10

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

    <div ng-sticky scrolling-elem="myScrollingView" super-sticky="true" css="'custom1 custom2'">
        ...
    </div>

note : `.sticky` will be applied to your element, `.sticky-is-visible` if sticky is applied and element is visible.
    
### Options
`scrolling-elem` (default is document) : scrolling element to listen for scroll. For example with a ui-view I needed to set it.

`super-sticky` (true/false, false default) : will keep the element when scrolling, so next will stack under it.

`css` : classes to apply to the wrapper.

# Demo \o/
[http://arca-computing.github.io/angular-sticky/](http://arca-computing.github.io/angular-sticky/)