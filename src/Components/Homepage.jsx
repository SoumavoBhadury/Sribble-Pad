import React, { useEffect, useState } from "react";

export default function Homepage() {
  const [load, setLoad] = useState('isLoading')

  useEffect(() => {
      setLoad('isLoaded')
  }, [])

  return (
    <>
    <div className="container mt-32 flex flex-col justify-center items-center text-white">
      <h1 className={`text-5xl text-white mx-auto flex opacity-0 transform translate-y-full transition ease-in-out duration-1000 ${load==='isLoaded' ? 'opacity-100 translate-y-1' : ''}`}><div className="animate-bounce w-6 h-6 rounded-full bg-blue-700 relative top-10"></div> Scribble-Pad <div className="animate-bounce w-6 h-6 rounded-full bg-pink-700"></div></h1>
      <div className="rounded-md w-1/3 mt-10 bg-gradient-to-r from-blue-600 via-transparent to-pink-700 p-1">
        <div className="p-3  bg-indigo-950">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis
          debitis, architecto nulla quae reiciendis, quos blanditiis porro,
          ratione similique inventore tenetur repellendus dolor maxime quam
          recusandae! Velit nobis ipsum, corporis tenetur repudiandae ullam
          vitae inventore? Dolorum, numquam voluptatum!
        </div>
      </div>
    </div>
      <a href="/Drawingpad" ><button className="text-white block w-1/5 mx-auto text-center my-24 bg-blue-700 py-2 rounded-full transition duration-300 transform hover:scale-105 hover:bg-blue-800 ">Start by creating your first NFTs</button></a>
    </>
  );
}
