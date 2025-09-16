require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
  erb :index
end

get '/game' do
  erb :game
end

get '/success' do
  erb :success
end
