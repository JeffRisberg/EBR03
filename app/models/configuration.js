import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
    weekStartDate: DS.attr('number'),
    currentSeason: DS.belongsTo('charity', {async: true}),
    currentWeekIndex: DS.attr('number'),

    formattedWeekStartDate: function () {
        var date = this.get('weekStartDate');

        return moment(date).format('LL');
    }.property('weekStartDate')
});
