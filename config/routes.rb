Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root 'main#index'
  get '/about', to: 'main#about'
  
  resources :collections do
    resources :items
  end
end
