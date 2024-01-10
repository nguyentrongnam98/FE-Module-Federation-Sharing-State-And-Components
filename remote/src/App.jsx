import { useState, useEffect } from 'react'
import {store as RelatedStore} from "./store";
import { Provider, useDispatch, useSelector } from 'react-redux'
import { updateProductId } from './productsSlice';
import productsReducer from './productsSlice'

const RelatedProduct = () => {
  const dispatch = useDispatch();

  const productId = useSelector((state) => state.productsReducer.productId);
  const products = useSelector((state) => {
    const product = state.productsReducer.products.find(product => product.id === productId);

    return state.productsReducer.products.filter(prod => product.related.indexOf(prod.id) >= 0)
});
  return (
    <div style={{width: 200}} className="relative border-dashed border-2 border-green-300 p-2 rounded">
            <div className="absolute -top-8 left-0 text-green-300 font-bold">Team Product (<a target="_blank" href="https://github.com/dotuan9x/micro-frontends/tree/master/react-redux/products" rel="noreferrer">products</a>) </div>
            <h1 className="text-base font-medium">Related products</h1>
            <ul className="flex flex-col">
                {
                    products.map((product) => {
                        return (
                            <li key={product.id} className="cursor-pointer opacity-100 hover:opacity-80">
                                <img className="w-36" onClick={() => dispatch(updateProductId(product.id))} alt="" src={product.image} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
  )
}

function App(props) {
const { store = RelatedStore } = props
  useEffect(() => {
    store.injectReducer('relatedReducer', productsReducer);
}, [])
  return (
    <Provider store={store || {}}>
      <RelatedProduct/>
    </Provider>
  )
}

export default App
