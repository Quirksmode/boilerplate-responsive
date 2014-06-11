/**
 * @class js.modules.moduleB
 *
 * ## Description
 * Detects if there is a class called .slider and if so it loads the flexslider library
 *
*/

define(['jquery', 'plugins', 'mixitup'], function ($, plugins, mixitup) {
    'use strict';

	var detectMixitup = {
        name: 'detectMixitup',
        defaults: {
            $filterGrid: $('#filterGrid')
        },
        init: function(options) {
            this.options = $.extend(this.defaults, options);
            this.loadMixitup();
        },

        loadMixitup: function() {
            var me = this;
            // If the element on the page is found, load and initialise the slider plugin
            if(me.options.$filterGrid.doesExist()) {
                me.options.$filterGrid.mixitup({
                    targetSelector: '.mix',
                    filterSelector: '.filter',
                    easing: 'smooth',
                    transitionSpeed: 600,
                    showOnLoad: 'all'
                });
            }
        }

    };

    detectMixitup.init();

});