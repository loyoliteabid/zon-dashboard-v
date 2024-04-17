import { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/httpHooks";
import { Category } from "../definitions/datatypes";

const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  // custom hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const onLoad = async () => {
      const { data } = (await sendRequest("/categories")) as {
        data: Category[];
      };

      setCategories(data ?? []);
    };
    onLoad();
  }, [sendRequest]);

  return (
    <div className="mx-auto max-w-2xl py-56">
      {isLoading && <p>Loading...</p>}
      {categories.map((category, i) => (
        <p key={`category_${i}`}>{category.name}</p>
      ))}
      {!!error && (
        <div>
          <p className="text-xs text-red-600">Error happened</p>
          <button onClick={clearError}>Ok</button>
        </div>
      )}
    </div>
  );
};

export default Products;
