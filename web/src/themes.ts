class Themes {
	colors = {
		red: "#e50914",
		darkGray: "#3A3A3A"
	};

	breakpoints = {
		mobileS: '320px',
		mobileM: '375px',
		mobileL: '425px',
		tablet: '768px',
		laptop: '1024px',
		laptopL: '1440px',
		dekstop: '1920px',
		desktopM: '2440px',
		desktopL: '2600px'
	}

	devices = {
		mobileS: `(min-width: ${this.breakpoints.mobileS})`,
		mobileM: `(min-width: ${this.breakpoints.mobileM})`,
		mobileL: `(min-width: ${this.breakpoints.mobileL})`,
		tablet: `(min-width: ${this.breakpoints.tablet})`,
		laptop: `(min-width: ${this.breakpoints.laptop})`,
		laptopL: `(min-width: ${this.breakpoints.laptopL})`,
		desktop: `(min-width: ${this.breakpoints.dekstop})`,
		desktopM: `(min-width: ${this.breakpoints.desktopM})`,
		desktopL: `(min-width: ${this.breakpoints.desktopL})`
	}
}

const themes = new Themes();

export default themes;
