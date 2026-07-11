import "./Categories.css";

function Categories({ selectedCategory, setSelectedCategory }) {

  const categories = [
    "All",
    "Mobiles",
    "Laptops",
    "Headphones",
    "Watches",
    "Accessories",
  ];

  return (
    <div className="categories">

      {categories.map((cat) => (

        <button
          key={cat}
          className={selectedCategory === cat ? "active-category" : ""}
          onClick={() => setSelectedCategory(cat)}
        >
          {cat}
        </button>

      ))}

    </div>
  );
}

export default Categories;