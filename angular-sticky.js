/**
 * @author GOHIN Maelig
 * @email mgohin@arca-compiuting.fr
 * @version 0.0.0
 */
(function (angular, $) {
    'use strict';

    var ngSticky = ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                keepVisible: '=?',
                css: '?='
            },
            link: function ($scope, element) {
                $timeout(function () {
                    var parentSelector = '#ui-view',
                        elem = $(element),
                        clone = elem.clone().wrap('<div class="sticky-wrapper"></div>').parent();

                    if ($scope.keepVisible) {
                        clone.addClass('sticky-keep-visible');
                    }
                    clone.addClass($scope.css);

                    clone.hide();
                    elem.parent().append(clone);

                    $(parentSelector).on('scroll', function () {
                        var offsetTop = elem[0].getBoundingClientRect().top;
                        var offsetKeepVisible = 0;
                        $('.sticky-wrapper.sticky-keep-visible:visible').each(function () {
                            if (!$(this).is(clone)) {
                                offsetKeepVisible += $(this).height();
                            }
                        });

                        if (offsetTop <= offsetKeepVisible) {
                            if (!clone.is(':visible')) {
                                $('.sticky-wrapper').not('.sticky-keep-visible').hide();
                                clone.css('top', offsetKeepVisible);
                                clone.show();
                            }
                        } else {
                            clone.hide();
                        }
                    });
                });
            }
        };
    }];


    angular.module('ngSticky', [])
        .directive('ngSticky', ngSticky);

})(window.angular, window.jQuery);
module.exports = 'ngSticky';