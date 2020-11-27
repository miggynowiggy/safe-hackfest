import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	icons: {
		iconfont: "fa" || "md",
	},
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: "#9A12B3",
				secondary: "#FF727D",
				accent: "#FCB400",
				error: "#f05454",
			},
		},
	},
});
