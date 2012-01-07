class Customer < ActiveRecord::Base
  attr_accessible :name, :phone, :birth
end
