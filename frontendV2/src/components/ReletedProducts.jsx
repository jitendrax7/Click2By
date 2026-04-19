import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subcategory }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let copy = products.slice()
      copy = copy.filter((item) => item.category === category)
      if (subcategory) {
        copy = copy.filter((item) => item.subCategory === subcategory)
      }
      setRelated(copy.slice(0, 5))
    }
  }, [products, category, subcategory])

  if (!related.length) return null

  return (
    <section className="py-16 border-t border-surface-border">
      <div className="text-center mb-10">
        <Title text1="Related" text2="Products" center />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 stagger-children">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            category={item.category}
          />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
