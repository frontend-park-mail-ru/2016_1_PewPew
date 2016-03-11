define(function (require) {
    var Backbone = require('backbone'),
        session = require('models/session'),
        views = {
            main: require('views/main'),
            game: require('views/game'),
            login: require('views/login'),
            scoreboard: require('views/scoreboard'),
            register: require('views/register'),
            gameMenu: require('views/gameMenu'),
            changeUserData: require('views/changeUserData')
        };


    var Router = Backbone.Router.extend({
        routes: {
            'main': 'displayView',
            'login': 'displayView',
            'register': 'displayView',
            'scoreboard': 'displayView',
            'gameMenu': 'displayView',
            'changeUserData': 'displayView',
            '*default': 'defaultAction'
        },
        initialize: function () {
            this.currentView = views['main'];
            this.listenTo(session, 'login', function () { this.navigate('#gameMenu', {trigger: true})}.bind(this));
            this.listenTo(views['gameMenu'], 'startTraining', this.startTraining);
        },
        displayView: function () {
            var view = views[Backbone.history.getFragment()];
            if (view.loginRequired && !session.isLoggedIn()) {
                this.navigate('#login', {trigger: true})
            } else {
                this.currentView.hide();
                view.show();
                this.currentView = view;
            }
        },
        defaultAction: function () {
            var mainView = views['main'];
            mainView.show();
            this.currentView = mainView;
        },
        startTraining: function() {
            var view = views['game'];
            this.currentView.hide();
            view.show();
            this.currentView = view;
        }
    });

    return new Router();
});