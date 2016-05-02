/**
 * @author GOHIN Maelig
 * @email mgohin@arca-compiuting.fr
 * @version 1.0.8
 * @license: MIT
 */
(function (angular) {
    'use strict';

    var ngSticky = ['$compile', '$timeout', function ($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                scrollingElem: '=?',
                superSticky: '=?',
                css: '=?'
            },
            link: function ($scope, element) {
                $timeout(function () {
                    var visible = false,
                        nativeDisplay = element.css('display'),
                        nativePosition = element.css('position'),
                        nativeTop = element.css('top'),
                        nativeLeft = element.css('left'),
                        scrolling = $scope.scrollingElem || document,
                        replacer;

                    element.addClass('sticky');

                    if ($scope.superSticky) {
                        element.addClass('sticky-keep-visible');
                    }

                    angular.element(scrolling).on('scroll', function () {
                        var elementToCheck = visible ? replacer : element;
                        var offsetTop = elementToCheck[0].getBoundingClientRect().top;
                        var offsetKeepVisible = 0;
                        angular.forEach(angular.element(document.querySelectorAll('.sticky.sticky-is-visible.sticky-keep-visible')), function (e) {
                            var jThis = angular.element(e);
                            if (jThis !== element && jThis[0].offsetWidth > 0 && jThis[0].offsetHeight > 0) {
                                offsetKeepVisible += jThis[0].offsetHeight;
                            }
                        });

                        if (offsetTop <= offsetKeepVisible) {
                            if (!visible) {
                                replacer = angular.element('<div></div>');
                                replacer.css('width', element[0].offsetWidth + 'px');
                                replacer.css('height', element[0].offsetHeight + 'px');
                                element.after(replacer);

                                angular.element(document.querySelectorAll('.sticky.sticky-is-visible:not(.sticky-keep-visible')).css('display', 'none');
                                element.css('position', 'fixed');
                                element.css('top', offsetKeepVisible + 'px');
                                element.css('left',  '0px');
                                element.addClass('sticky-is-visible');
                                visible = true;
                            }
                        } else if (replacer) {
                            replacer.remove();
                            element.css('display', nativeDisplay);
                            element.css('position', nativePosition);
                            element.css('top', nativeTop);
                            element.css('left', nativeLeft);
                            element.removeClass('sticky-is-visible');
                            visible = false;
                        }
                    });
                });
            }
        };
    }];


    angular.module('ngSticky', [])
        .directive('ngSticky', ngSticky);

})(window.angular);