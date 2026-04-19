import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'
import ProductItem from './ProductItem'

const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32', '#c9a96e', '#c9a96e']

const BestSeller = () => {
  const { products, loading } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const best = products.filter((item) => item.bestseller)
    setBestSeller(best.slice(0, 5))
  }, [products])

  return (
    <section className="section bg-dark-2">
      <div className="container-custom">
        <div className="text-center mb-12">
          <Title
            text1="Best"
            text2="Sellers"
            subtitle="Our most loved pieces — tried, tested, and approved by thousands."
            center
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 stagger-children">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="card-dark overflow-hidden">
                  <div className="skeleton aspect-[3/4] rounded-t-xl rounded-b-none" />
                  <div className="p-4 space-y-2">
                    <div className="skeleton h-4 w-3/4 rounded" />
                    <div className="skeleton h-4 w-1/2 rounded" />
                  </div>
                </div>
              ))
            : bestSeller.map((item, index) => (
                <div key={item._id} className="relative">
                  {/* Rank Badge */}
                  <div
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                    style={{ background: medalColors[index], color: '#0a0a0f' }}
                  >
                    #{index + 1}
                  </div>
                  <ProductItem
                    id={item._id}
                    image={item.image}
                    price={item.price}
                    name={item.name}
                    category={item.category}
                  />
                </div>
              ))
          }
        </div>
      </div>
    </section>
  )
}

export default BestSeller
