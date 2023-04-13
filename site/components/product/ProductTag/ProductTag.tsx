

interface ProductTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  fontSize = 32,
}) => {
  return (
    <div className="mb-2">
      <h3 >
        <span
          className="font-bold"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {name}
        </span>
      </h3>
      <h1 className="text-2xl">{price}</h1>
    </div>
  )
}

export default ProductTag
