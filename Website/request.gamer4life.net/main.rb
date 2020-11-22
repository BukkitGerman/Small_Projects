#!/usr/bin/env ruby

require "tilt/erb"
require "sinatra/base"
require "sinatra/static_assets"
require "sinatra/contrib"
require "sinatra/flash"
require "./server/routes"
require "./server/UtilityHelper"

class Webpage < Sinatra::Base
	register Sinatra::StaticAssets
  	register Sinatra::Contrib
  	register Sinatra::Flash
  	set :port, 1337
	set :session, true
	set :ver, "0.3"
	set :appname, "Appname"
	set :title, settings.appname
	set :description, "A Webapplication with Dynamic Navigation bar."

	

	set :raise_errors, false

	set :javascripts, []
	set :stylesheets, ["style.css"]
	set :environment, :production
	set :root, File.dirname(__FILE__)
 	set :public_folder, File.dirname(__FILE__) + '/assets'

 	include AppRoutes
 	include UtilityHelper
end
