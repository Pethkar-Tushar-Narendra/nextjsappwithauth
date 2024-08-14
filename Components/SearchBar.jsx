import useDebounce from "../Hooks/useDebounce";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import InputFields from "./InputFields";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SearchBar = ({ fetch }) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const wrapperRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef?.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const deboucedValue = useDebounce(value, 500);
  const session = useSession();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/list", {
          params: {
            fetch: fetch,
            search: "title",
            query: deboucedValue,
            page: 1,
            name: session?.data?.user?.name || "dev user",
          },
        });
        setData(
          response?.data?.results?.map((item) => ({
            name: item.original_title || item.original_name,
            id: item.id,
          })) || []
        );
      } catch (error) {
        console.log(error, "error");
      }
    };
    if (deboucedValue?.length > 0) {
      fetchMovies();
    }
  }, [deboucedValue, session]);

  return (
    <div ref={wrapperRef} className="relative h-100">
      <InputFields
        placeholder={`Type ${fetch === "tv" ? "Tv Show" : "Movie"} name...`}
        className="border-red border search_by_title"
        onFocus={() => {
          setOpen(true);
        }}
        type={"string"}
        value={value}
        onChange={(e) => setValue(e?.target?.value || "")}
      />
      {open && (
        <ul className="flex flex-col absolute bg-white text-black w-full search_menu mt-2">
          {data?.map((item) => {
            return (
              <li className="cursor-pointer hover:bg-gray-200 p-2">
                <Link href={`/${fetch}/${item.id}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
