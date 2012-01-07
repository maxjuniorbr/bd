class CustomersController < ApplicationController
  def index
    render :layout => false
  end

  def show
    @customer = Customer.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @customer }
    end
  end

  def edit
    @customer = Customer.find(params[:id])
  end

  def create
    @customer = Customer.new(params[:customer])

    respond_to do |format|
      if @customer.save
        format.json { render :json => { :success => true } }
      else
        format.json { render :json => { :success => false } }
      end
    end
  end

  def update
    @customer = Customer.find(params[:id])

    respond_to do |format|
      if @customer.update_attributes(params[:customer])
        format.json { render :json => { :success => true } }
      else
        format.json { render :json => { :success => true } }
      end
    end
  end

  def destroy
    @customer = Customer.find(params[:id])
    @customer.destroy

    respond_to do |format|
      if @customer.destroy
        format.json { render :json => { :success => true } }
      else
        format.json { render :json => { :success => false } }
      end
    end
  end

  def store
    customers = Customer.where("name LIKE :search", {:search => "%#{params[:query]}%"}).all

    respond_to do |format| 
      format.json { render :json => { :root => customers } }
    end
  end
end
