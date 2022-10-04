// import React from 'react'

// const ProductItem = ({ product }) => {
//   return (
//     <>
//       <div id={`carouselExampleControls${product.postTitle}`} className={`carousel slide ${product.postTitle}`} data-bs-ride="carousel">

//         <div className="carousel-inner">
//           {product.postImage.map((e) => <>

//             <div className="carousel-item active">
//               <div className='img' style={{ background: `url(${e})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '50vh', backgroundSize: 'cover', }}>

//               </div>
//             </div>

//           </>)}
//         </div>
//         <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleControls${product.postTitle}`} data-bs-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleControls${product.postTitle}`} data-bs-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//       <span className='my-2 fw-bold'>{product.postTitle}</span>
//     </>
//   )
// }

// export default ProductItem

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'

const ProductItem = ({ product }) => {
  return (
    <>
      <Carousel showThumbs={false}>
        {/* <div className='img' style={{ backgroundImage: `url(${product.postImage[0]})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '50vh', backgroundSize: 'cover', }}>

        </div> */}

        {product.postImage.map((e, index) => <>
          <div key={index} className="carousel-item active">
            <div key={index} className='img' style={{ background: `url(${e})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '50vh', backgroundSize: 'cover', }}>
            </div>
          </div>

        </>)}

      </Carousel>
      <span className='py-2'>{product.postTitle}</span>
    </>
  )
}

export default ProductItem