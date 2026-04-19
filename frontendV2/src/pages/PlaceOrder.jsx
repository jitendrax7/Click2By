import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const steps = ['Delivery', 'Payment', 'Confirm']

const paymentMethods = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>
      </svg>
    ),
    available: true,
  },
  {
    id: 'stripe',
    label: 'Stripe',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    available: false,
  },
  {
    id: 'razorpay',
    label: 'Razorpay',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    available: false,
  },
]

const PlaceOrder = () => {
  const { navigate, backendUrl, token, setCartItems, products, delivery_fee, cartItems, getCartAmount } = useContext(ShopContext)
  const [method, setMethod] = useState('cod')
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipcode: '', country: '', phone: ''
  })

  const onChange = (e) => {
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }))
  }

  const handleDeliveryNext = (e) => {
    e.preventDefault()
    setStep(1)
    window.scrollTo(0, 0)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (method !== 'cod') { toast.error('Only Cash on Delivery is available'); return }
    setLoading(true)
    try {
      let orderItems = []
      for (const id in cartItems) {
        for (const s in cartItems[id]) {
          if (cartItems[id][s] > 0) {
            const info = structuredClone(products.find((p) => p._id === id))
            if (info) { info.size = s; info.quantity = cartItems[id][s]; orderItems.push(info) }
          }
        }
      }
      const orderData = { address: formData, items: orderItems, amount: getCartAmount() + delivery_fee }
      const res = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
      if (res.data.success) {
        setCartItems({})
        navigate('/orders')
        toast.success('Order placed successfully!')
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const InputField = ({ name, placeholder, type = 'text', required = true, half = false }) => (
    <div className={half ? '' : 'col-span-2'}>
      <label className="block text-xs uppercase tracking-widest text-text-faint mb-1.5">{placeholder}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-dark"
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="container-custom py-10">
        {/* Header + Step Indicator */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2 font-semibold">Checkout</p>
          <h1 className="font-display text-4xl font-bold text-text-primary mb-6">Place Your Order</h1>

          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 ${i <= step ? 'text-primary' : 'text-text-faint'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    i < step ? 'bg-primary border-primary text-dark'
                    : i === step ? 'border-primary text-primary'
                    : 'border-surface-border'
                  }`}>
                    {i < step ? (
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : i + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px max-w-16 ${i < step ? 'bg-primary' : 'bg-surface-border'} transition-colors`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left panel */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <form onSubmit={handleDeliveryNext} className="animate-fade-up">
                <h2 className="font-semibold text-text-primary mb-5">Delivery Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <InputField name="firstName" placeholder="First name" half />
                  <InputField name="lastName" placeholder="Last name" half />
                  <InputField name="email" placeholder="Email address" type="email" />
                  <InputField name="street" placeholder="Street address" />
                  <InputField name="city" placeholder="City" half />
                  <InputField name="state" placeholder="State" half />
                  <InputField name="zipcode" placeholder="ZIP Code" type="number" half />
                  <InputField name="country" placeholder="Country" half required={false} />
                  <InputField name="phone" placeholder="Phone number" type="number" />
                </div>
                <button type="submit" className="btn-primary mt-6 gap-2">
                  Continue to Payment
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </form>
            )}

            {step === 1 && (
              <form onSubmit={onSubmitHandler} className="animate-fade-up">
                <h2 className="font-semibold text-text-primary mb-5">Payment Method</h2>
                <div className="space-y-3">
                  {paymentMethods.map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => pm.available && setMethod(pm.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        !pm.available ? 'opacity-40 cursor-not-allowed border-surface-border' :
                        method === pm.id
                          ? 'border-primary bg-primary/5'
                          : 'border-surface-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === pm.id ? 'border-primary' : 'border-surface-border'}`}>
                        {method === pm.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className={`text-primary ${method !== pm.id ? 'text-text-muted' : ''}`}>{pm.icon}</span>
                      <span className={`font-medium text-sm ${method === pm.id ? 'text-text-primary' : 'text-text-muted'}`}>{pm.label}</span>
                      {!pm.available && <span className="ml-auto text-xs text-text-faint">Coming soon</span>}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="button" onClick={() => setStep(0)} className="btn-outline">
                    ← Back
                  </button>
                  <button
                    type="submit"
                    id="place-order-submit-btn"
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        Placing Order...
                      </span>
                    ) : 'Place Order'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartTotal />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
