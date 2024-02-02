import { useUpdateProductMutation } from "../redux/features/products/productsApi";

import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/features/products/productsApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "antd";
import { useEffect } from "react";

const UpdateAProduct = () => {
  const [UpdateAProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: product } = useGetSingleProductQuery(id);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: product?.data.name || "",
      price: product?.data.price || 0,
      quantity: product?.data.quantity || 0,
      brand: product?.data.brand || "",
      model: product?.data.model || "",
      operatingSystem: product?.data.operatingSystem || "",
      storage: product?.data.storage || 0,
      screenSize: product?.data.screenSize || 0,
      details: product?.data.details || "",
    },
  });

  useEffect(() => {
    if (product) {
      reset(product.data);
    }
  }, [product, reset]);

  const handleUpdateProduct = async (data: FieldValues) => {
    const toastId = toast.loading("Adding.....");
    try {
      const productInfo = {
        id: id,
        data: {
          name: data.name,
          price: parseFloat(data.price),
          quantity: Number(data.quantity),
          brand: data.brand,
          model: data.model,
          operatingSystem: data.operatingSystem,
          storage: Number(data.storage),
          screenSize: parseFloat(data.screenSize),
          details: data.details,
        },
      };

      await UpdateAProduct(productInfo).unwrap();
      toast.success("Product added successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/products");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(handleUpdateProduct)}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            // defaultValue={product?.data.name}
            {...register("name")}
          />
        </div>
        <div>
          <label htmlFor="price">price:</label>
          <input
            type="text"
            id="price"
            // defaultValue={product?.data.price}
            {...register("price")}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            // defaultValue={product?.data.quantity}
            {...register("quantity")}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            // defaultValue={product?.data.brand}
            {...register("brand")}
          />
        </div>
        <div>
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            // defaultValue={product?.data.model}
            {...register("model")}
          />
        </div>
        <div>
          <label htmlFor="operatingSystem">Operating System:</label>
          <input
            type="text"
            id="operatingSystem"
            // defaultValue={product?.data.operatingSystem}
            {...register("operatingSystem")}
          />
        </div>
        <div>
          <label htmlFor="storage">Storage:</label>
          <input
            type="text"
            id="storage"
            // defaultValue={product?.data.storage}
            {...register("storage")}
          />
        </div>
        <div>
          <label htmlFor="screenSize">Screen Size:</label>
          <input
            type="text"
            id="screenSize"
            // defaultValue={product?.data.screenSize}
            {...register("screenSize")}
          />
        </div>
        <div>
          <label htmlFor="details">Details:</label>
          <input
            type="text"
            id="details"
            // defaultValue={product?.data.details}
            {...register("details")}
          />
        </div>

        <Button htmlType="submit">Submit</Button>
      </form>
    </div>
  );
};

export default UpdateAProduct;
