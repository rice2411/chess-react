type Props = {
  children?: JSX.Element[];
};

function CenterContainer({ children }: any) {
  return (
    <div className="flex flex-col justify-center items-center my-10 mx-0">
      {children}
    </div>
  );
}

export default CenterContainer;
