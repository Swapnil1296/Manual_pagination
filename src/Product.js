import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  console.log(products);
  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const selectedHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="prod__single" key={prod.id}>
                <img src={prod.thumbnail} alt="p" />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectedHandler(page - 1)}
            className={page > 1 ? "" : "disable_pagination"}
          >
            ⏮️
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => selectedHandler(i + 1)}
                className={page === i + 1 ? "page_selected" : ""}
              >
                {i}
              </span>
            );
          })}
          <span
            onClick={() => selectedHandler(page + 1)}
            className={page < products.length / 10 ? "" : "disable_pagination"}
          >
            ⏭️
          </span>
        </div>
      )}
    </>
  );
}
