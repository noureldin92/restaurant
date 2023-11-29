export default function ItemButton({ onClick, className, type }) {
  return (
    <button onClick={onClick} className={className} type={type}>
      add to cart
    </button>
  );
}
