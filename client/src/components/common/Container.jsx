const Container = ({ children, isVerticalCenter = false }) => {
  return (
    <>
      <div className="container mx-auto">
        {isVerticalCenter ? (
          <VerticalCenter>{children}</VerticalCenter>
        ) : (
          children
        )}
      </div>
    </>
  );
};

const VerticalCenter = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto text-center">{children}</div>
      </div>
    </>
  );
};

export default Container;
