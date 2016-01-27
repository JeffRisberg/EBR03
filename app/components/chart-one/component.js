import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'canvas',
    attributeBindings: ['width', 'height'],

    didInsertElement: function(){
        console.log("didInsertElement");
    },

    willDestroyElement: function(){
        console.log("willDestroyElement");
    },

    updateChart: function(){

    }
});