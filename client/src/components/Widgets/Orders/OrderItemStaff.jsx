import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderItemStaff({ item }) {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/items/product/${item.productID}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [item]);

  const imageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  return (
    <div className="border rounded-lg">
      {product && product.imagePaths && product.imagePaths.length > 0 && ( 
        <div className="grid grid-cols-4 gap-8 p-8">
          <img src={`http://localhost:3002/assets/${product.imagePaths[0]}`} alt={product.name} className="col-span-1 shadow-md"/>
          <div className="col-span-3 grid grid-cols-6">
            <div className="col-span-5">
              <p className="text-2xl font-medium">{product.name}</p>
              <p>{product.description}</p>
              <p className="text-lg font-medium">Item details</p>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(item.selectedDetails).map((detail, index) => {
                  if (detail[0] !== 'qty') {
                    return (
                      <p key={index} className="col-span-1 font-medium">{detail[0]}: {detail[1]}</p> 
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            <div className="col-span-1 flex justify-end content-center">
              <p className="text-2xl font-medium">x{item.selectedDetails.qty}</p>
            </div>
          </div>
          <div className="col-span-1 text-center content-center">
            <p className="text-xl font-medium">Client Designs:</p>
          </div>
          <div className="col-span-3 gap-4 grid grid-cols-3">
            {item.images.map((image) => (
              <img key={image} src={`http://localhost:3002/assets/${image}`} alt={image} className="col-span-1 shadow-md mx-auto" width={100} height={100} onClick={() => imageClick(image)}/>
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <div 
          className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="max-w-full bg-black rounded-xl flex flex-col relative"
          >
            <img src={`http://localhost:3002/assets/${selectedImage}`} alt={selectedImage} className="col-span-1 shadow-md mx-auto" width={800} height={800}/>
          </div>
        </div>
      )}
    </div>
  );
}
