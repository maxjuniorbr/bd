Bd::Application.routes.draw do
  # Resource routes
  resources :customers 

  # Root address
  root :to => 'home#index'

  # This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id(.:format)))'
end
