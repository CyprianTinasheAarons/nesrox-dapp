import Link from "next/link"

export default function Grid({ products }) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending products</h2>
          <a href="/search" className="hidden text-sm font-medium text-black md:block">
            View all products
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-2 mt-6 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product: any) => (
            <Link href={`/product/${product.slug}`} key={product.id} className="relative group">
              <div className="w-full h-56 overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.images[0].url}
                  alt="product"
                  className="object-contain object-center w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a href={product.href}>
                  <span className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-900">{product.price.value} {product.price.currencyCode}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="/search" className="font-medium text-black">
            View all products
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

