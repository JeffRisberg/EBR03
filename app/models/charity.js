import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    ein: DS.attr('string', {defaultValue: "none"})
});
