import React from 'react'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router'
const Navbar = () => {
    const router = useRouter();
    return (

        <>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.mainContainer} `}>
                <div className="container">
                    <a className="navbar-brand">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mx-auto mb-lg-0">
                            <li className={`nav-item ${styles.li} mx-3`}>
                                <a onClick={()=>{router.push('/products')}} className="nav-link " aria-current="page">Products</a>
                            </li>
                            <li className={`nav-item ${styles.li} mx-3`}>
                                <a onClick={()=>{router.push('/add-product')}} className="nav-link" >Add Product</a>
                            </li>
                            
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar