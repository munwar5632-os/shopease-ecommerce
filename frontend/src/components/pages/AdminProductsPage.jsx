import { useEffect, useState } from "react";
import useProductStore from "../stores/useProductStore";
import AdminProductTable from "../Admin/AdminProductTable";
import AdminProductForm from "../Admin/AdminProductForm";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import API from "../services/api";

const AdminProductsPage = () => {
  const { products, fetchProducts } = useProductStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts({ limit: 100 });
  }, []);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, formData);
      } else {
        await API.post("/products", formData);
      }
      await fetchProducts({ limit: 100 });
      setModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await API.delete(`/products/${id}`);
      await fetchProducts({ limit: 100 });
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <AdminProductTable
        products={products}
        onEdit={(p) => {
          setEditingProduct(p);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
      >
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
        {loading && <p>Saving...</p>}
      </Modal>
    </div>
  );
};

export default AdminProductsPage;
