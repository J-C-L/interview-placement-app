require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module InternshipPlacer
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Add NPM modules
    config.assets.paths << Rails.root.join('node_modules')

    # Automatically load all code from <rails_root>/lib
    config.autoload_paths << Rails.root.join('lib')
  end
end
