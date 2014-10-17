/**
 * @author Yan Zhu
 */
(function(app) {

	app.loadConfigData = function() {
		app.ConfigData = app.ConfigData || {};
		
		// Get config data
		$.ajax({
			url: 'static/config_data/scanned/gid_macro.json',
			dataType: 'json',
			async: false
		}).done(function(data, textStatus, jqXHR) {
			app.ConfigData.Menu = data;
		}).fail(function(jqXHR, textStatus, errorThrown) {
			console.debug(this.url, errorThrown);
			app.ConfigData.GidMacroMap = {};
		});
	};

})(Application);