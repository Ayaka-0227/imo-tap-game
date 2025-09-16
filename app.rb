require 'sinatra'
require 'json'

# Render対応の基本設定
configure do
  set :port, ENV['PORT'] || 4567
  set :bind, '0.0.0.0'
  set :environment, :production
  set :public_folder, 'public'
  set :views, 'views'
end

# ルート設定
get '/' do
  erb :index
end

# ゲームのAPI
post '/tap' do
  content_type :json
  # ゲームロジック
  { score: params[:score] }.to_json
end