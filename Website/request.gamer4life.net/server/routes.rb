module AppRoutes
	def self.included(base)
		base.class_eval do

			get "/" do
				erb :index
			end
			get "/test" do
				title "test"
				erb :index
			end
		end
	end
end