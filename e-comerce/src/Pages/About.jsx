// About.jsx
import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Our mission is to provide top-quality products with exceptional
          customer service, making online shopping convenient, secure, and
          enjoyable. We aim to be a leading e-commerce platform by continually
          enhancing user experience and ensuring customer satisfaction.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
        <p className="text-gray-700 leading-relaxed">
          From the latest in fashion to unique cultural pieces, we carefully
          curate a diverse range of products to meet our customers' needs. Each
          product is selected based on quality, customer ratings, and feedback,
          ensuring you only get the best. We’re also working on enhancing your
          shopping experience with a product rating system, so you can make more
          informed choices.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Our Commitment to Quality
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Quality and trust are at the core of our values. We strive to ensure
          every item meets our high standards, and we prioritize feedback from
          our customers to continually improve. Whether you’re shopping for
          yourself or others, you can trust that each product reflects our
          commitment to excellence.
        </p>
      </section>
    </div>
  );
};

export default About;
