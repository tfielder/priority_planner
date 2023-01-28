class AddItemsToCollections < ActiveRecord::Migration[7.0]
  def change
    add_reference :items, :collection, foreign_key: true
  end
end
