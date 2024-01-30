// import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { Button } from "antd";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import { TProduct } from "../types/types";
// import { useAppSelector } from "../redux/hooks";

const Products = () => {
  // const user = useAppSelector(selectCurrentUser);
  // console.log(user);
  const { data: products } = useGetAllProductsQuery("");

  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {products?.data.map((product: TProduct) => (
        <div
          key={product._id}
          style={{
            border: "2px solid black",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "15px",
            }}
          >
            <p>Name:{product.name}</p>
            <p>Price:{product.price}</p>
            <p>Quantity:{product.quantity}</p>
            <p>Brand:{product.brand}</p>
            <p>Model:{product.model}</p>
            <p>Operating System:{product.operatingSystem}</p>
            <p>Storage Capacity:{product.storage}</p>
            <p>Screen Size:{product.screenSize}</p>
            <p>Details:{product.details}</p>
          </div>
          <div
            style={{
              margin: "0px 10px 10px 0px",
              display: "flex",
              justifyContent: "end",
              gap: "5px",
            }}
          >
            <Button>Add</Button>
            <Button>Delete</Button>
            <Button>Update</Button>
            <Button>Duplicate</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
