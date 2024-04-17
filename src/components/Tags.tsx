import { useEffect, useState } from "react";
import { useHttpClient } from "../hooks/httpHooks";
import { Tag } from "../definitions/datatypes";

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  // custom hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const onLoad = async () => {
      const { data } = (await sendRequest("/products/tags")) as {
        data: Tag[];
      };

      setTags(data ?? []);
    };
    onLoad();
  }, [sendRequest]);

  return (
    <div className="mx-auto max-w-2xl py-40">
      <div className="sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center max-sm:my-10">
          <div>
            <h1 className="text-base font-semibold leading-6 text-gray-900 text-start">
              Tags
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of available product tags.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              disabled
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Tag
            </button>
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
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tags.map((tag, i) => (
                    <tr key={`tag_${i}`}>
                      <td className="whitespace-nowrap text-start py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {tag.name}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {tag.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
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

export default Tags;
