import { toast } from "sonner";
import { useAddProductMutation } from "../redux/features/products/productsApi";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();
  const { handleSubmit, register } = useForm();

  const handleAddSingleProduct = async (data: FieldValues) => {
    const toastId = toast.loading("Adding.....");
    try {
      const productInfo = {
        name: data.name,
        price: parseFloat(data.price),
        quantity: Number(data.quantity),
        brand: data.brand,
        model: data.model,
        operatingSystem: data.operatingSystem,
        storage: Number(data.storage),
        screenSize: parseFloat(data.screenSize),
        details: data.details,
      };

      await addProduct(productInfo).unwrap();
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
    <form
      onSubmit={handleSubmit(handleAddSingleProduct)}
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
        <input type="text" id="name" {...register("name")} />
      </div>
      <div>
        <label htmlFor="price">price:</label>
        <input type="text" id="price" {...register("price")} />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input type="text" id="quantity" {...register("quantity")} />
      </div>
      <div>
        <label htmlFor="brand">Brand:</label>
        <input type="text" id="brand" {...register("brand")} />
      </div>
      <div>
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" {...register("model")} />
      </div>
      <div>
        <label htmlFor="operatingSystem">Operating System:</label>
        <input
          type="text"
          id="operatingSystem"
          {...register("operatingSystem")}
        />
      </div>
      <div>
        <label htmlFor="storage">Storage:</label>
        <input type="text" id="storage" {...register("storage")} />
      </div>
      <div>
        <label htmlFor="screenSize">Screen Size:</label>
        <input type="text" id="screenSize" {...register("screenSize")} />
      </div>
      <div>
        <label htmlFor="details">Details:</label>
        <input type="text" id="details" {...register("details")} />
      </div>

      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default AddProduct;
