import React from 'react'

export default function ProductCard({ image, name, description }) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={image} width={300} height={300} />
      <p>{description}</p>
    </div>
  )
}
