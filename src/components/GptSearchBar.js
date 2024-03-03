import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  return (
    <div className="  pt-[6%] flex justify-center">
      <form className=" bg-black grid grid-cols-12  w-1/2 ">
        <input
          type="text"
          className="p-4 m-4 col-span-9 rounded-lg"
          placeholder={lang[langkey].gptSearchPlaceholder}
        ></input>
        <button className=" col-span-3 py-2 m-4 px-4 bg-red-700 text-white rounded-lg">
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
