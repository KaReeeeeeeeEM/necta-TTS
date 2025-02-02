import TextBox from "./TextBox";

export default function Hero() {
  return (
    <div className="relative h-[92vh] bg-gray-500 flex items-center justify-center">
      <img
        src="/logo-alt.jpg"
        alt="necta-logo"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 bg-[#00000080] w-full h-full"></div>
      <div className="relative z-10">
        <h1 className="text-2xl md:text-5xl text-center text-white font-bold flex items-center justify-center gap-2 mt-10">
          Welcome to
          <span className="text-yellow-300">Necta</span>
          Results Portal
        </h1>
        <p className="text-center text-gray-200 text-sm mt-2">
          Simply enter your registration number to get your results
        </p>
        <TextBox />
      </div>
    </div>
  );
}
