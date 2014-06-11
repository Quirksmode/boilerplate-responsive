/**
 * @class js.common
 *
 * ## Description
 * The build will inline common dependencies into this file.
 * For any third party dependencies, like jQuery, place them in the lib folder.
 *
*/

require.config({
    paths: {

        // Libs
        jquery: 'lib/jquery',
        flexslider: 'lib/jquery.flexslider',
        mixitup: 'lib/jquery.mixitup',
        stacktable: 'lib/jquery.stacktable',


        // Modules
        detectFlexslider: 'modules/detectFlexslider',
        detectMixitup: 'modules/detectMixitup',

        // Plugins
        plugins: 'plugins',

        // Plugins
        sandbox: 'sandbox'

    },
    // Inform requirejs of your dependecies
    shim: {
        'plugins': ['jquery'],
        'sandbox': ['jquery', 'stacktable'],
        'flexslider': ['jquery'],
        'mixitup': ['jquery'],
        'stacktable': ['jquery']
    }
});

require([
    // Libs
    'jquery',
    'stacktable',

    // Plugins
    'plugins',
    'sandbox'
]);