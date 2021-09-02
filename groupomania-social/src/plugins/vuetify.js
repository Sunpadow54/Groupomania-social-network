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
                grey: '#2a2a2e',
				accent: '#8c9eff',
				error: '#d1515a',
			},
			dark: {
				primary: '#091f43',
				secondary: '#d1515a',
				accent: '#8c9eff',
				error: '#d1515a',
			},
		}
	}
});
