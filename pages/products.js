import React, { useEffect, useState } from 'react'
import { db } from '../config/FirebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import ProductItem from '../components/ProductItem'
import LoadingSpinner from '../components/Spinner/LoadingSpinner'
const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try {
            const postItem = [];
            setLoading(true)
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc) => {
                const { postImage, title } = doc.data();
                postItem.push({
                    postTitle: title,
                    postImage: postImage,
                });
            });
            setLoading(false)
            setProducts(postItem);
        } catch (excep) {
            console.log(excep);
        }
    }
    return (
        <>
            <div className='text-center pt-4'>
                <span className='fs-1' style={{fontWeight:'600'}}>Products</span>
            </div>
            {loading ? <div className="d-flex align-items-center justify-content-center pt-5"><LoadingSpinner /></div> : <div className="container pt-5">
                <div className="row">
                    {products.map((product, index) => <>
                        <div key={index} className="col-md-4">
                            <ProductItem key={index} product={product} />
                        </div>
                    </>)}

                </div>
            </div>}
        </>
    )
}

export default Products