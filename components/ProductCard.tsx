import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  price: number;
}

const ProductCard = ({ name, image, description, price }: ProductCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <img src={image} alt={name} className="rounded-md h-48 w-full object-cover mb-4" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <p className="text-blue-600 font-bold">${price}</p>
    </div>
  );
};

export default ProductCard;
