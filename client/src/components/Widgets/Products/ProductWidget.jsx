import { Link } from "react-router-dom"

export default function ProductWidget({item, url}) {
  return (
    <Link to={`/product/${item._id}`}>
      <div className="shadow-xl w-72 font-medium rounded-md bg-white mx-auto p-2">
        <img src={`${url}/assets/${item.imagePaths[0]}`} alt={item.name}/>
        <p className="flex flex-col justify-center px-3 border-t h-[10vh]">
          <span className="text-xl capitalize">{item.name}</span>
          <span className="text-red-500">${item.price.toFixed(2)}</span>
        </p>
      </div>
    </Link>
  )
}
