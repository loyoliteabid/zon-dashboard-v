/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/httpHooks";
import { Category, Product } from "../definitions/datatypes";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddInput, setShowAddInput] = useState(false);
  const [motorId, setMotorId] = useState("");
  const [newData, setNewData] = useState({
    name: "",
    showroom: "",
    regionalSpecs: "",
    exteriorColor: "",
  });

  // custom hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const onLoad = async () => {
      const { data } = (await sendRequest("/products")) as {
        data: Product[];
      };

      setProducts(data ?? []);

      const { data: categories } = (await sendRequest("/categories")) as {
        data: Category[];
      };
      if (categories && categories.length > 0) {
        const _motorId = categories.find((x) => x.name === "Motors")?.id;
        setMotorId(_motorId ?? "");
      }
    };
    onLoad();
  }, [sendRequest]);

  const addProduct = async () => {
    const reqData = {
      name: newData?.name ?? "New car",
      description: "A brand new car for your driving pleasure",
      categoryId: motorId ?? "1",
      postedOn: new Date().toISOString(),
      imageSrc: "new_car",
      showroom: newData?.showroom ?? "XYZ Showroom",
      trim: "Standard",
      year: 2024,
      kilometers: 1000,
      regionalSpecs: newData?.regionalSpecs ?? "UAE Version",
      doors: 4,
      bodyType: "Sedan",
      sellerType: "Dealer",
      transmissionType: "Automatic",
      horsepower: 200,
      numberOfCylinders: 4,
      warranty: true,
      exteriorColor: newData?.exteriorColor ?? "Black",
      interiorColor: "Beige",
      targetMarket: "Domestic",
      tags: ["advantador", "interior carbon", "two ton interior"],
    };

    const body = JSON.stringify(reqData);

    try {
      await sendRequest("/products/addone", "POST", body, {
        "Content-Type": "application/json",
      });
      const { data } = (await sendRequest("/products")) as {
        data: Product[];
      };

      setProducts(data ?? []);
      setShowAddInput(false);
    } catch (error) {
      console.log("Error: ", JSON.stringify(error));
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-40">
      <div className="sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center max-sm:my-10">
          <div>
            <h1 className="text-base font-semibold leading-6 text-gray-900 text-start">
              Products
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of available products.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            {!showAddInput && (
              <button
                type="button"
                onClick={() => setShowAddInput(true)}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Product
              </button>
            )}
            {showAddInput && (
              <button
                type="button"
                onClick={addProduct}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Saving..." : "Save Product"}
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Showroom
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Regional Specs
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Exterior Color
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {!showAddInput &&
                    products.map((product, i) => (
                      <tr key={`category_${i}`}>
                        <td className="whitespace-nowrap text-start py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {product.name}
                        </td>
                        <td className="whitespace-nowrap text-start px-3 py-4 text-sm text-gray-500">
                          {product.showroom}
                        </td>
                        <td className="whitespace-nowrap text-start px-3 py-4 text-sm text-gray-500">
                          {product.regionalSpecs}
                        </td>
                        <td className="whitespace-nowrap text-start px-3 py-4 text-sm text-gray-500">
                          {product.exteriorColor}
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                            <span className="sr-only">, {product.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  {showAddInput && (
                    <tr>
                      <td>
                        <input
                          value={newData.name}
                          className="m-1 border rounded-md p-1 px-2"
                          placeholder="Name"
                          type="text"
                          onChange={(e) =>
                            setNewData((obj) => ({
                              ...obj,
                              name: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={newData.showroom}
                          className="m-1 border rounded-md p-1 px-2"
                          placeholder="Showroom"
                          type="text"
                          onChange={(e) =>
                            setNewData((obj) => ({
                              ...obj,
                              showroom: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={newData.regionalSpecs}
                          className="m-1 border rounded-md p-1 px-2"
                          placeholder="Regional Spec"
                          type="text"
                          onChange={(e) =>
                            setNewData((obj) => ({
                              ...obj,
                              regionalSpecs: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={newData.exteriorColor}
                          className="m-1 border rounded-md p-1 px-2"
                          placeholder="Exterior color"
                          onChange={(e) =>
                            setNewData((obj) => ({
                              ...obj,
                              exteriorColor: e.target.value,
                            }))
                          }
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}

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
