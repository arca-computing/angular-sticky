/**
 * @author GOHIN Maelig
 * @email mgohin@arca-compiuting.fr
 * @version 1.0.4
 * @license: MIT
 */
(function (angular) {
    'use strict';

    var ngSticky = ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                scrollingElem: '=?',
                superSticky: '=?',
                css: '=?'
            },
            link: function ($scope, element) {
                $timeout(function () {
                    var elem = angular.element(element),
                        clone = elem.clone().wrap('<div class="sticky-wrapper"></div>').parent(),
                        visible = false;

                    if ($scope.superSticky) {
                        clone.addClass('sticky-keep-visible');
                    }
                    clone.addClass($scope.css);

                    clone.css('display', 'none');
                    elem.parent().append(clone);

                    var scrolling = $scope.scrollingElem || document;
                    angular.element(scrolling).on('scroll', function () {
                        var offsetTop = elem[0].getBoundingClientRect().top;
                        var offsetKeepVisible = 0;
                        angular.forEach(angular.element(document.querySelector('.sticky-wrapper.sticky-keep-visible')), function (elem) {
                            var jThis = angular.element(elem);
                            if (jThis !== clone && jThis[0].offsetWidth > 0 && jThis[0].offsetHeight > 0) {
                                offsetKeepVisible += jThis[0].offsetHeight;
                            }
                        });

                        if (offsetTop <= offsetKeepVisible) {
                            if (!visible) {
                                angular.element(document.querySelector('.sticky-wrapper:not(.sticky-keep-visible')).css('display', 'none');
                                clone.css('top', offsetKeepVisible + 'px');
                                clone.css('display', 'block');
                                visible = true;
                            }
                        } else {
                            clone.css('display', 'none');
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