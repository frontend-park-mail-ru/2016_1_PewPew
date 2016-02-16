define(
    ['backbone', 'require', 'views/main', 'views/game', 'views/login', 'views/scoreboard'],
    function (Backbone, require) {
        var Router = Backbone.Router.extend({
            routes: {
                ':query': 'displayView',
                '*default': 'defaultAction'
            },
            initialize: function () {
                this.currentView = require('views/main');
            },
            displayView: function (viewName) {
                if (require.defined('views/' + viewName)) {
                    var view = require('views/' + viewName);
                } else {
                    var view = require('views/main');   // Пока что кидает в мейн,
                }                                       // потом сделаем что-то вроде 404 страницы
                this.currentView.hide();
                view.show();
                this.currentView = view;
            },
            defaultAction: function () {
                var mainView = require('views/main');
                mainView.show();
                this.currentView = mainView;
            }
        })

        return new Router();
    }
)