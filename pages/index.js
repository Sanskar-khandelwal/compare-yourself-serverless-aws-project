import Link from "next/link";
import MyHead from "../components/MyHead";



import React from 'react';
import Image from 'next/image';
import NavBar from "@/components/Navbar";

const Home = () => {
  return (
    <>
    <NavBar/>
    <div className="max-w-6xl py-8 mx-auto mt-9">
      
      <main>
        <section className="items-center justify-center block max-w-4xl gap-10 px-5 mx-auto mb-8 hero md:flex mt-9">
          <div className="mr-8 hero-content">
            <h2 className="mb-4 text-2xl font-bold">Keep your social links in one place</h2>
            <p className="text-gray-600">Showcase your online presence with ease</p>
            <Link href="/apply">
            
            <button className="px-4 py-2 mt-10 text-white bg-blue-500 rounded hover:bg-blue-600">Get Started</button>
            </Link>
          </div>
          <div className="flex justify-end mt-10 hero-image">
            <Image
              src="/images/Doremon.png" // Replace with your own image path
              alt="Landing Page Image"
              width={700}
              height={900}
              className="object-cover border"
            />
          </div>
        </section>
      
      </main>
    </div>
    </>
  );
};

export default Home;
