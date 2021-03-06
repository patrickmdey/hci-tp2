import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#6200EE',
                secondary: '#03DAC5',
                accent: '#3700B3',
                error: '#b71c1c',
            },
        },
    },
    iconfont: 'md',
});
