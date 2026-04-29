import { useEffect, useState } from "react";
import { AppBackground } from "../../components";

function CategoryCard({ category }) {
  return (
    <div className="col-4 col-md-3 mb-3 pt-4">
      <div
        className="d-flex align-items-center justify-content-center rounded-4 p-3"
        style={{
          background: "rgba(22, 90, 119)",
          aspectRatio: "1",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(91,200,245,0.3)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 6px 16px rgba(91,200,245,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(91,200,245,0.3)";
        }}
      >
        <span
          className="text-white fw-semibold text-center overflow-hidden"
        >
          {category.categoria}
        </span>
      </div>
    </div>
  );
}

function Categories() {
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (categoriesOptions.length === 0) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories/category/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setCategoriesOptions(data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <AppBackground title={"Categories"}>
      <div className="container mt-3" style={{ maxWidth: "600px" }}>
        <div className="row g-2">
          {categoriesOptions.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </AppBackground>
  );
}

export default Categories;