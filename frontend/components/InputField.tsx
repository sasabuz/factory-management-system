'use client'
interface HeaderInterface {
  searchTerm:string;
  setSearchTerm: (value: string)=>void;
  setCurrentPage: (value: number)=>void;

}

const InputField = ({searchTerm, setSearchTerm, setCurrentPage}:HeaderInterface) => {
  return (
    <div className="w-full">
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        type="text"
        placeholder="Search here..."
        className="w-full px-4 py-2 text-md border rounded outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};

export default InputField;
