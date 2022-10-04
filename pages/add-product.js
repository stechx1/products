import React, { useRef, useState } from 'react'
import styles from '../styles/products.module.css'
import { db } from '../config/FirebaseConfig';
import { auth } from "../config/FirebaseConfig";
import { storage } from "../config/FirebaseConfig";
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Alert from '../components/Modal/Alert';
import LoadingSpinner from '../components/Spinner/LoadingSpinner';
import { useRouter } from 'next/router';

const AddProduct = () => {
    const router = useRouter();


    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const [data, setData] = useState({ title: '' });
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const imageRef = useRef();
    const uploadImage = () => {
        imageRef.current.click();
    }
    const [name, setName] = useState([])
    const [url, setUrl] = useState([])
    const [imgArray, setImgArray] = useState([])
    const [count, setCount] = useState(0)

    const captureImage = (e) => {
        setCount(count + 1)
        const image = e.target.files[0]
        const showImage = URL.createObjectURL(image)
        imgArray.push(showImage)
        name.push(e.target.files[0].name)
        url.push(e.target.files);
        console.log(url)
    }

    const addPost = async () => {
        if (data.title === '') {
            setMessage("Please Enter Title");
            setError(true);
        } else {
            setIsLoading(true)
            const downloadURI = await ManageImage();

            await addDoc(collection(db, 'products'), {
                title: data.title,
                postImage: downloadURI,
            })
                .then(() => {
                    setIsLoading(false)
                    router.push('/products')
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }
    const ManageImage = async () => {
        let downloadUriArray = []
        let imgRef;
        for (let index = 0; index < url.length; index++) {
            imgRef = ref(storage, `images/${name[0] + Date.now()} `);
            await uploadBytesResumable(imgRef, url[index][0]).then(() => {
                console.log("Image Uploaded", index + 1);
            });
            const downloadURI = await getDownloadURL(imgRef);
            downloadUriArray.push(downloadURI)
        }


        return downloadUriArray;
    };
    return (
        <>
            <div className="container py-5">
                <h1 className="text-center " style={{fontWeight:'600'}}>Add Product</h1>
                <div className={`${styles.form} py-4 w-50 mx-auto `}>
                    <div className="d-flex flex-column gap-1">
                        <label htmlFor="">Enter Title</label>
                        <input onChange={onChange} type="text" name="title" id="title" placeholder='Enter your title here' />
                    </div>
                    <div className="d-flex flex-column gap-1 pt-5">

                        <label htmlFor="">Select Images</label>

                        <div onClick={uploadImage} className={styles.thumbnail}>
                            <span>Click to Choose image</span>
                        </div>
                        <div className={styles.clearButton}>
                            <span onClick={() => { setImgArray([]) }}>{count} Images Selected</span>
                        </div>

                        <div>
                            <button disabled={imgArray.length === 0} className={styles.btn} onClick={addPost}>{isLoading ? <LoadingSpinner /> : "Add Product"}</button>
                        </div>

                    </div>
                </div>
                <span className='fs-4 fw-bold'>Selected Images</span>
                <div className="row">
                    {imgArray.map((e, index) =>
                        <div key={index} style={{ backgroundImage: `url(${e})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '50vh', backgroundSize: 'cover' }} className="col-md-3 mx-3 col-sm-6 col-12 my-2">
                            {/* <img key={index} src={e} alt="uploadedImage" className='img-fluid ' /> */}
                        </div>
                    )}
                </div>
            </div>
            <input onChange={captureImage} ref={imageRef} style={{ visibility: 'hidden' }} type="file" name="picture" id="picture" />
            {error && <Alert message={message} setError={setError} />}
        </>
    )
}

export default AddProduct