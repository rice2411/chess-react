import { useState } from "react";
import CenterContainer from "../../Components/CenterContainer";

function FakingType() {
  const [count, setCount] = useState(0);
  const handleChange = (e: any) => {
    const TEXT_DEFAULT = "AHIHI ĐỒ NGỐK!!";
    const index = count + 1;
    e.target.value = TEXT_DEFAULT.slice(0, index);
    setCount(index);
  };
  return (
    <CenterContainer>
      <h1 className="font-bold text-3xl">Faking Type</h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your message
        </label>
        <textarea
          id="message"
          onChange={handleChange}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
    </CenterContainer>
  );
}

export default FakingType;
