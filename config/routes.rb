Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  root 'main#index'
  get '/about', to: 'main#about'
  get 'collections/:id/sort-collection/', to: 'collections#sort_collection', as: :sort_collection

  resources :collections do
    resources :items
  end
end
