require 'fileutils'

desc 'Build the Substance Article distribution'
task :build_dist do
  system("browserify index.js -o dist/substance-article.js")
  system("browserify index.js | uglifyjs > dist/substance-article.min.js")
end
