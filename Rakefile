$:.unshift(File.dirname(__FILE__) + '/../../lib')
require 'rake/testtask'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new do |t|
  t.cucumber_opts = %w{--format pretty}
end

require "rspec/core/rake_task"

RSpec::Core::RakeTask.new(:spec)

task :all     => [:spec, :cucumber]
task :default => [:all]
