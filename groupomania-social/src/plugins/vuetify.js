import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#091f43',
                primary_light: '#ccd9ed',
				secondary: '#d1515a',
                transparent: 'transparent',
                grey: '#2a2a2e',
                light_grey:'#afafaf',
				accent: '#8c9eff',
				error: '#d1515a',
                back: '#ebedf0'
			},
			dark: {
				primary: '#091f43',
                primary_light: '#ccd9ed',
				secondary: '#d1515a',
				accent: '#8c9eff',
				error: '#d1515a',
                back: '#ebedf0'
			},
		}
	}
});