// import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { Button } from "antd";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../redux/features/products/productsApi";
import { TProduct } from "../types/types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  const navigate = useNavigate();
  const { data: products } = useGetAllProductsQuery("");

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (productId: string | undefined) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      // User confirmed the deletion
      try {
        await deleteProduct(productId).unwrap();
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an issue deleting the product.",
          "error"
        );
      }
    }
  };

  const handleDetails = (id: string | undefined) => {
    navigate(`/product/${id}`);
  };
  const handleAddProduct = () => {
    navigate(`/add-product`);
  };
  const handleUpdateProduct = (id: string | undefined) => {
    navigate(`/updateProduct/${id}`);
  };

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
            backgroundColor: "rgb(210, 210, 210)",
            border: "2px solid black",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <div
            style={{
              padding: "15px",
              fontSize: "20px",
            }}
          >
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Brand: {product.brand}</p>
            <p>Model: {product.model}</p>
            <p>Operating System: {product.operatingSystem}</p>
            <p>Storage Capacity: {product.storage}</p>
            <p>Screen Size: {product.screenSize}</p>
            <p>Details: {product.details}</p>
          </div>
          <div
            style={{
              margin: "0px 10px 10px 0px",
              display: "flex",
              justifyContent: "end",
              gap: "5px",
            }}
          >
            <Button type="primary" onClick={() => handleDetails(product._id)}>
              details
            </Button>
            <Button type="primary" onClick={handleAddProduct}>
              Add
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(product?._id)}
            >
              Delete
            </Button>
            <Button
              type="primary"
              onClick={() => handleUpdateProduct(product._id)}
            >
              Update
            </Button>
            <Button type="primary">Duplicate</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
