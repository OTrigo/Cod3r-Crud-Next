const Title = (props: any) => {
  return (
    <div className="flex flex-col justify-center w-full text-black">
      <h1 className="pl-6 py-2 font-bold">{props.children}</h1>
      <hr className="border-2 border-purple-400 mb-4" />
    </div>
  );
};

export default Title;
