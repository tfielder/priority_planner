class Item < ApplicationRecord
    belongs_to :collection
    validates :title, presence: true
end
