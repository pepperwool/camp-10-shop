type Props = {
  stock: number
}

export function CardBadge({stock}: Props) {
  return (
    <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded-sm">Only {stock} left!</div>
  )
}