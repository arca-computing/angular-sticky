/**
 * @author GOHIN Maelig
 * @email mgohin@arca-compiuting.fr
 * @version 1.0.7
 * @license: MIT
 */
(function (angular) {
    'use strict';

    var ngSticky = ['$compile', '$timeout', function ($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                parentScope: '=?',
                scrollingElem: '=?',
                superSticky: '=?',
                css: '=?'
            },
            link: function ($scope, element) {
                $timeout(function () {
                    var clone = element.clone();

                    if($scope.parentScope) {
                        $compile(clone.contents())($scope.parentScope);
                    }

                    clone = clone.wrap('<div class="sticky-wrapper"></div>').parent();

                    if ($scope.superSticky) {
                        clone.addClass('sticky-keep-visible');
                    }
                    clone.addClass($scope.css);

                    clone.css('display', 'none');

                    element.parent().append(clone);

                    var visible = false,
                        scrolling = $scope.scrollingElem || document;
                    angular.element(scrolling).on('scroll', function () {
                        var offsetTop = element[0].getBoundingClientRect().top;
                        var offsetKeepVisible = 0;
                        angular.forEach(angular.element(document.querySelectorAll('.sticky-wrapper.sticky-keep-visible')), function (e) {
                            var jThis = angular.element(e);
                            if (jThis !== clone && jThis[0].offsetWidth > 0 && jThis[0].offsetHeight > 0) {
                                offsetKeepVisible += jThis[0].offsetHeight;
                            }
                        });

                        if (offsetTop <= offsetKeepVisible) {
                            if (!visible) {
                                angular.element(document.querySelectorAll('.sticky-wrapper:not(.sticky-keep-visible')).css('display', 'none');
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