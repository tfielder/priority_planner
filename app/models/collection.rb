class Collection < ApplicationRecord
    has_many :items, dependent: :destroy
end
