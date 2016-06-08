/**
 * @author GOHIN Maelig
 * @email mgohin@arca-compiuting.fr
 * @version 1.1.0
 * @license: MIT
 */
(function (angular) {
    'use strict';

    var ngSticky = ['$compile', '$timeout', '$window', function ($compile, $timeout, $window) {
        return {
            restrict: 'A',
            scope: {
                scrollingElem: '=?',
                superSticky: '=?',
                css: '=?',
                listenResize: '=?'
            },
            link: function ($scope, element) {
                $timeout(function () {
                    var visible = false,
                        nativeDisplay = element.css('display'),
                        nativePosition = element.css('position'),
                        nativeTop = element.css('top'),
                        nativeLeft = element.css('left'),
                        nativeWidth = element.css('width'),
                        scrolling = $scope.scrollingElem || document,
                        replacer;

                    element.addClass('sticky');

                    if ($scope.superSticky) {
                        element.addClass('sticky-keep-visible');
                    }

                    if($scope.listenResize){
                        angular.element($window).on('resize', function(){
                            if(visible){
                                element.css('width', $scope.listenResize.offsetWidth + 'px');
                                replacer.css('width', $scope.listenResize.offsetWidth + 'px');
                                nativeWidth = $scope.listenResize.offsetWidth + 'px';
                            }
                        });
                    }

                    angular.element(scrolling).on('scroll', function () {
                        var elementToCheck = visible ? replacer : element;
                        var offsetTop = elementToCheck[0].getBoundingClientRect().top;
                        var offsetKeepVisible = 0;
                        angular.forEach(angular.element(document.querySelectorAll('.sticky.sticky-is-visible.sticky-keep-visible')), function (e) {
                            if (e !== element[0] && e.offsetWidth > 0 && e.offsetHeight > 0) {
                                offsetKeepVisible += e.offsetHeight;
                            }
                        });

                        if (offsetTop <= offsetKeepVisible) {
                            if (!visible) {
                                replacer = angular.element('<div></div>');
                                replacer.css('width', element[0].offsetWidth + 'px');
                                replacer.css('height', element[0].offsetHeight + 'px');
                                element.after(replacer);

                                angular.element(document.querySelectorAll('.sticky.sticky-is-visible:not(.sticky-keep-visible)')).css('display', 'none');
                                element.css('width', element[0].offsetWidth + 'px');
                                element.css('position', 'fixed');
                                element.css('top', offsetKeepVisible + 'px');
                                element.css('left',  '0px');
                                element.addClass('sticky-is-visible');
                                visible = true;
                            }
                        } else if (replacer) {
                            replacer.remove();
                            element.css('width', nativeWidth);
                            element.css('display', nativeDisplay);
                            element.css('position', nativePosition);
                            element.css('top', nativeTop);
                            element.css('left', nativeLeft);
                            element.removeClass('sticky-is-visible');
                            visible = false;
                            var others = angular.element(document.querySelectorAll('.sticky.sticky-is-visible'));
                            if(others.length > 0){
                                angular.element(others[others.length - 1]).css('display', nativeDisplay);
                            }
                        }
                    });
                });
            }
        };
    }];


    angular.module('ngSticky', [])
        .directive('ngSticky', ngSticky);

})(window.angular);