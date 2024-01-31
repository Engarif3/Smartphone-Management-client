import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/products/productsApi";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product } = useGetSingleProductQuery(id);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "15px",
          fontSize: "20px",
          border: "2px solid green",
          borderRadius: "5px",
        }}
      >
        <p>Name: {product?.data.name}</p>
        <p>Price: {product?.data.price}</p>
        <p>Quantity: {product?.data.quantity}</p>
        <p>Brand: {product?.data.brand}</p>
        <p>Model: {product?.data.model}</p>
        <p>Operating System: {product?.data.operatingSystem}</p>
        <p>Storage Capacity: {product?.data.storage}</p>
        <p>Screen Size: {product?.data.screenSize}</p>
        <p>Details: {product?.data.details}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
