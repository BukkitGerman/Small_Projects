module UtilityHelper
	def self.included(base)
		base.class_eval do
			helpers do
				def js *scripts
					@js ||= []
					@js = scripts
				end

				def css *styles
					@css ||= []
					@css = styles
				end

				def javascripts *scripts
					js = []
					js << settings.javascripts if settings.respond_to?("javascripts")
					js << scripts
					js @js if @js
					js.flatten.uniq.map do |script|
						javascript_script_tag "/js/"+script
					end.join					
				end

				def stylesheets *styles
					css = []
					css << settings.stylesheets if settings.respond_to?("stylesheets")
					css << styles
					css << @css if @css
					css.flatten.uniq.map do |style|
						stylesheet_link_tag "/css/"+style
					end.join
				end

				def title value=nil
          			@title = value
        		end

        		def title_tag
          			if !@title.nil?
            			"<title>#{@title} - #{settings.appname}</title>"
          			else
            			"<title>#{settings.title || "untitled"}</title>"
          			end
        		end

        		def desc value=nil
          			@desc = value
        		end

        		def description
          			"<meta name=\"description\" content=\"#{@desc || settings.description || "undescribable"}\">"
      			end

      			def navbar_entrygen name, path, active=false
      				if active
      					link_to name, path, :class => "header-entry is-active"
      				else
      					link_to name, path, :class => "header-entry"
      				end
      			end

      			def navbar
      				route = request.path_info
      				html = ""
      				html << navbar_entrygen("Startseite", "/", route == "/")
      				html
      			end
			end
		end
	end
end