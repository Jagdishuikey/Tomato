import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const { food_list } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes near you</h2>

        <div className='food-display-list'>
            {food_list.map((item,index)=>{
              if(category==='All'|| category===item.category){
                return (
                  <div className="food-card-wrapper" key={index}>
                    <div className="food-card-inner">
                      <FoodItem 
                        id={item._id} 
                        name={item.name}
                        description={item.description} 
                        price={item.price} 
                        image={item.image}
                      />
                    </div>
                  </div>
                )
              }
            })}
        </div>
    </div>
  )
}

export default FoodDisplay