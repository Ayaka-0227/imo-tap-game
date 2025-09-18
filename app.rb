require 'sinatra'
require 'json'

configure do
  set :port, ENV['PORT'] || 4567
  set :bind, '0.0.0.0'
  set :environment, ENV['RACK_ENV'] || 'development'
  set :public_folder, File.dirname(__FILE__) + '/public'
  set :static, true  # 静的ファイル配信を明示的に有効化
  set :views, File.dirname(__FILE__) + '/views'
end

# ルート設定
get '/' do
  erb :index
end

get '/game' do
  erb :game, locals: { osano_client_id: ENV['OSANO_CLIENT_ID'] || '' }
end

get '/success' do
  erb :success
end

# ゲームのAPI
post '/tap' do
  content_type :json
  { score: params[:score] }.to_json
end

# SPAフォールバック（ルート外のリロード対策）
get '/*' do
  erb :game
end