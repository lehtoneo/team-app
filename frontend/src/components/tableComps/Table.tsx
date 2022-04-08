const Table: React.FC = (props) => {
  return (
    <table className="border-collapse table-auto w-full text-sm">
      {props.children}
    </table>
  );
};

export default Table;
