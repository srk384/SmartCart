import ProductDetailComp from '../compnonents/ProductDetailComp'
import Navbar from '../compnonents/Navbar'
import Footer from '../compnonents/Footer'
import { useParams } from "react-router-dom";


const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div>
        <Navbar/>
        <ProductDetailComp prop={{id}}/>
        <Footer/>
    </div>
  )
}

export default ProductDetails