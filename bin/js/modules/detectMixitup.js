define(["jquery","plugins","mixitup"],function(i){"use strict";var t={name:"detectMixitup",defaults:{$filterGrid:i("#filterGrid")},init:function(t){this.options=i.extend(this.defaults,t),this.loadMixitup()},loadMixitup:function(){var i=this;i.options.$filterGrid.doesExist()&&i.options.$filterGrid.mixitup({targetSelector:".mix",filterSelector:".filter",easing:"smooth",transitionSpeed:600,showOnLoad:"all"})}};t.init()});