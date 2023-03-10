class ItemsController < ApplicationController
  before_action :get_collection
  before_action :set_item, only: %i[ show edit update destroy ]

  # GET /items or /items.json
  def index
    get_items
  end

  # GET /items/1 or /items/1.json
  def show
  end

  # GET /items/new
  def new
    if @collection.items.size < CollectionsHelper.max_items
      @item = @collection.items.build
    else
      format.html { redirect_to collection_items_path(@collection), notice: "Limit of #{CollectionsHelper.max_items.to_s} per collection."}
      format.json { render :show, status: :created, location: @item }
    end
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items or /items.json
  def create
    @item = @collection.items.build(item_params)

    respond_to do |format|
      if @item.save
        format.html { redirect_to collection_items_path(@collection), notice: "Item was successfully created." }
        format.json { render :show, status: :created, location: @item }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /items/1 or /items/1.json
  def update
    respond_to do |format|
      if @item.update(item_params)
        format.html { redirect_to collection_item_path(@collection), notice: "Item was successfully updated." }
        format.json { render :show, status: :ok, location: @item }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1 or /items/1.json
  def destroy
    @item.destroy

    respond_to do |format|
      format.html { redirect_to collection_items_path(@collection), notice: "Item was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = @collection.items.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def item_params
      params.require(:item).permit(:title, :description, :collection_id)
    end

    def get_collection
      @collection = Collection.find(params[:collection_id])
    end

    def get_items
      @items = @collection.items
    end
end
