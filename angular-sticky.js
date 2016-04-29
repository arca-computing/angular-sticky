/**
 * @author GOHIN Maelig
 * @email mgohin@arca-compiuting.fr
 * @version 1.0.3
 * @license: MIT
 */
(function (angular, $) {
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
                    var elem = $(element),
                        clone = elem.clone().wrap('<div class="sticky-wrapper"></div>').parent(),
                        visible = false;

                    if ($scope.superSticky) {
                        clone.addClass('sticky-keep-visible');
                    }
                    clone.addClass($scope.css);

                    clone.hide();
                    elem.parent().append(clone);

                    var scrolling = $scope.scrollingElem || document;
                    $(scrolling).on('scroll', function () {
                        var offsetTop = elem[0].getBoundingClientRect().top;
                        var offsetKeepVisible = 0;
                        $('.sticky-wrapper.sticky-keep-visible:visible').each(function () {
                            if (!$(this).is(clone)) {
                                offsetKeepVisible += $(this).height();
                            }
                        });

                        if (offsetTop <= offsetKeepVisible) {
                            if (!visible) {
                                $('.sticky-wrapper').not('.sticky-keep-visible').hide();
                                clone.css('top', offsetKeepVisible);
                                clone.show();
                                visible = true;
                            }
                        } else {
                            clone.hide();
                            visible = false;
                        }
                    });
                });
            }
        };
    }];


    angular.module('ngSticky', [])
        .directive('ngSticky', ngSticky);

})(window.angular, window.jQuery);