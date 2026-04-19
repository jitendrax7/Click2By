import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'
import ProductItem from './ProductItem'

const SkeletonCard = () => (
  <div className="card-dark overflow-hidden">
    <div className="skeleton aspect-[3/4] rounded-t-xl rounded-b-none" />
    <div className="p-4 space-y-2">
      <div className="skeleton h-4 w-3/4 rounded" />
      <div className="skeleton h-4 w-1/2 rounded" />
    </div>
  </div>
)

const LatestCollection = () => {
  const { products, loading } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <section className="section bg-dark">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <Title
            text1="Latest"
            text2="Collections"
            subtitle="Explore our newest arrivals, handpicked for the modern wardrobe."
          />
          <a
            href="/collection"
            className="text-sm text-primary hover:text-primary-light transition-colors flex items-center gap-1 shrink-0 mb-10"
          >
            View all
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 stagger-children">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : latestProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  price={item.price}
                  name={item.name}
                  category={item.category}
                />
              ))
          }
        </div>
      </div>
    </section>
  )
}

export default LatestCollection
