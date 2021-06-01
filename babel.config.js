// ./babel.config.js

module.exports = function(api) {
	api.cache(true);
	return {
		 presets: [
			 '@babel/preset-env', // [A]
			 '@babel/preset-react', // [B]
		 ],
		 plugins: [],
	 };
 };