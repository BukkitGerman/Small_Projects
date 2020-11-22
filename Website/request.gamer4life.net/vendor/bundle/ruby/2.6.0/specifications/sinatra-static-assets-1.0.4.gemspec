# -*- encoding: utf-8 -*-
# stub: sinatra-static-assets 1.0.4 ruby lib

Gem::Specification.new do |s|
  s.name = "sinatra-static-assets".freeze
  s.version = "1.0.4"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["W\u0142odek Bzyl".freeze]
  s.date = "2012-06-16"
  s.description = "This Sinatra extensions provides following helper methods:\n    - image_tag\n    - stylesheet_link_tag\n    - javascript_script_tag".freeze
  s.email = ["matwb@ug.edu.pl".freeze]
  s.homepage = "".freeze
  s.rubygems_version = "3.0.3".freeze
  s.summary = "A Sinatra extension.".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<sinatra>.freeze, [">= 1.1.0"])
      s.add_development_dependency(%q<rack>.freeze, [">= 0"])
      s.add_development_dependency(%q<rack-test>.freeze, [">= 0"])
    else
      s.add_dependency(%q<sinatra>.freeze, [">= 1.1.0"])
      s.add_dependency(%q<rack>.freeze, [">= 0"])
      s.add_dependency(%q<rack-test>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<sinatra>.freeze, [">= 1.1.0"])
    s.add_dependency(%q<rack>.freeze, [">= 0"])
    s.add_dependency(%q<rack-test>.freeze, [">= 0"])
  end
end
