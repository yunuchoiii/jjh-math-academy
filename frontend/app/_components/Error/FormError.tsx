const FormError = ({ errorMessage }: { errorMessage: string }) => {
  return <div className="FormError flex items-center h-10 px-3 rounded-[8px] text-red-1 bg-red-1 bg-opacity-10 mt-0.5">
    <i className="fas fa-times mr-2.5"></i>
    <div className="text-sm leading-none">
      {errorMessage}
    </div>
  </div>;
};

export default FormError;