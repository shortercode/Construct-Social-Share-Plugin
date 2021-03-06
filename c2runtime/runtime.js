﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.CordovaSocialSharing = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	function share (o) {
		var exists = window["plugins"] && window["plugins"]["socialsharing"] && window["plugins"]["socialsharing"]["share"];
		if (exists)
			window["plugins"]["socialsharing"]["share"](o);
	}
	
	var pluginProto = cr.plugins_.CordovaSocialSharing.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// Initialise object properties
		this.testProperty = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;
	
	instanceProto.onCreate = function()
	{
		// Read properties set in C3
		this.testProperty = this.properties[0];
	};
	
	instanceProto.saveToJSON = function ()
	{
		return {};
	};
	
	instanceProto.loadFromJSON = function (o)
	{
	};
	
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};
		
	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.ShareText = function (msg)
	{
		share(msg);
	};
	
	Acts.prototype.ShareTextWithSubject = function (msg, subject)
	{
		share(msg, subject);
	};
	
	Acts.prototype.Share = function (msg, subject, url)
	{
		share({
			"message": msg,
			"subject": subject,
			"url": url
		});
	};
	
	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {};
		
	pluginProto.exps = new Exps();

}());