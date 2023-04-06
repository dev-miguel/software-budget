import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
// install rules

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

extend('required', {
    ...rules,
    message: 'Por favor, preencha o campo.',
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);