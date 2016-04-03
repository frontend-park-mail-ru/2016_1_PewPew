define(function(require) {
    var Backbone = require('backbone'),
        theme = require('models/theme'),
        removableBlockColor = theme.getTheme()['removableBlockColor'],
        unremovableBlockColor = theme.getTheme()['unremovableBlockColor'];

    var BarrierView = Backbone.View.extend({
            initialize: function(model, canvas) {
                this.canvas = canvas;
                this.model = model;
            },
            render: function() {
                var context = this.canvas.getContext('2d'),
                    model = this.model;
                if (context) {
                    context.beginPath();
                    if (model.get('isRemovable')) {
                        context.fillStyle = removableBlockColor;
                    } else {
                        context.fillStyle = unremovableBlockColor;
                    }
                    context.fillRect(model.get('posX') - model.get('sizeX') / 2, model.get('posY') - model.get('sizeY') / 2,
                        model.get('sizeY'), model.get('sizeX'));
                    context.closePath();
                }
            }
        });

    return BarrierView;
});
