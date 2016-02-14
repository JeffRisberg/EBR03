import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        var amountInNative = this.currencyTranslator.translateToNative(serialized);
        return amountInNative;
    },

    serialize(deserialized) {
        var amountInUSD = this.currentcyTranslator.translateToUSD(deserialized);
        return amountInUSD;
    }
});
