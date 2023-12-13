import Link from "next/link";
import MyHead from "../components/MyHead";



import React from 'react';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 mt-9">
      
      <main>
        <section className="hero block md:flex  gap-10  items-center justify-center  mb-8 max-w-4xl px-5 mx-auto mt-9">
          <div className="hero-content mr-8">
            <h2 className="text-2xl font-bold mb-4">Keep your social links in one place</h2>
            <p className="text-gray-600">Showcase your online presence with ease</p>
            <Link href="/apply">
            
            <button className="px-4 py-2  text-white bg-blue-500 rounded mt-10 hover:bg-blue-600">Get Started</button>
            </Link>
          </div>
          <div className="hero-image flex justify-end mt-10">
            <Image
              src="/images/Doremon.png" // Replace with your own image path
              alt="Landing Page Image"
              width={700}
              height={900}
              className="border object-cover"
            />
          </div>
        </section>
      
      </main>
    </div>
  );
};

export default Home;
