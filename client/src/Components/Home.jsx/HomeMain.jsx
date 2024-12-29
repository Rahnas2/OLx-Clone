


import { useEffect, useState } from 'react'
import Card from '../Card'
import { AuthUser } from '../../context/authContext'

function HomeMain() {

    const [products, setProducts] = useState([])

    const { getProducts } = AuthUser()

    useEffect(() =>{
        const fetchProducts = async () =>{
            
            try {
                const response = await getProducts()
                const test1 = response.data
                setProducts(test1.reverse())
            } catch (error) {
                console.log('something went wrong')
            }
        }

        fetchProducts()
    },[])

    console.log('products',products)
  return (
    <div className="text-[#153a3e] pt-5 pb-4 px-8 sm:px-14 md:px-24 lg:px-36">
        <h1 className="font-medium tracking-wide text-xl mb-3">Newly Added</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-1 sm:gap-x-12 md:gap-x-20 lg:gap-x-24">
            {
                products.map(item => <Card key={item._id}
                    price={item.price} year={item.year} kilometers={item.kilometers} brand={item.brand} model={item.model} mobile_no={item.mobile_no} image={item.images}
                    />)
            }
        </div>
    </div>
  )
}

export default HomeMain 