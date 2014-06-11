/**
 * @class js.modules.moduleB
 *
 * ## Description
 * Detects if there is a class called .slider and if so it loads the flexslider library
 *
*/

define(['jquery', 'plugins'], function ($, plugins) {
    'use strict';

	var detectFlexslider = {
        name: 'detectFlexslider',
        defaults: {
            $slider: $('.slider'),
            pluginOptions: {
                animation: "slide"
            }
        },
        init: function(options) {
            this.options = $.extend(this.defaults, options);
            this.loadSlider();
        },

        loadSlider: function() {
            var me = this;
            // If the element on the page is found, load and initialise the slider plugin
            if(me.options.$slider.doesExist()) {
                require(['flexslider'], function(flexslider) {
                    me.options.$slider.flexslider(me.options.pluginOptions);

                    console.log('Flexslider has loaded');
                });
            }
        }

    };

    detectFlexslider.init();

});