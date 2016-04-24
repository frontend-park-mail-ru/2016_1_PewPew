define(function(require) {
    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        user = require('models/user');

    var Session = Backbone.Model.extend({
        defaults: {
            'isAuth': false,
            'id': ''
        },
        urlRoot: '/session',
        initialize: function() {
            this.excludeAttrs = ['isAuth', 'id'];
            this.fetch({
              success: function(model, response) {
                this.set('isAuth', true);
                user.set('id', response.id);
              }.bind(this),
              error: function(model, response) {
                this.set('isAuth', false);
              }.bind(this)
            });
            user.on('login', function() {
                this.set('isAuth', true);
                this.trigger('login');
            }.bind(this));
        },
        login: function(login, password) {
            this.save({
                'login': login,
                'password': password
            },{
                success: function (data) {
                    user.set('id', data.id);
                    user.fetch();
                    this.set('isAuth', true);
                    this.trigger('login');
                }.bind(this),
                error: function () {
                    this.trigger('invalidLoginPassword', 'Invalid login or password');
                }.bind(this)
            });
        },
        logout: function() {
            this.destroy({
                success: function() {
                    window.location.hash = 'main';
                    this.set('isAuth', false);
                    console.log('in');
                    user.clear();
                }.bind(this),
                error: function () {
                    this.trigger('invalidLogout');
                }.bind(this)
            });
        },
        destroy: function(options) {
            this.isNew = function() {return false;};
            Backbone.Model.prototype.destroy.apply(this, arguments);
            this.isNew = Backbone.Model.prototype.isNew;
        },
        save: function (attrs, options) {
            attrs = attrs || this.toJSON();
            options = options || {};
            if (this.excludeAttrs) {
                attrs = _.omit(attrs, this.excludeAttrs);
            }
            options.attrs = attrs;
            Backbone.Model.prototype.save.call(this, attrs, options);
        },
        validateLogin: function (login, password1) {
            if ( !(login && password1) ) {
                this.trigger('invalidLoginPassword', 'All fields required');
                return false;
            }
            return true;
        },
        isLoggedIn: function() {
            return this.get('isAuth');
        }
    });

    return new Session();
});
