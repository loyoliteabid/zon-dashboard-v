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
    <div className="mx-auto max-w-2xl py-56">
      {isLoading && <p>Loading...</p>}
      {tags.map((tag, i) => (
        <p key={`category_${i}`}>{tag.name}</p>
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

export default Tags;
