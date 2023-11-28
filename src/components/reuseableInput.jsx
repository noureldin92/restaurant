export default function Input({ name, type, onChange, id }) {
  return (
    <div className="control">
      <label htmlFor={id}>{name}</label>
      <input id={id} name={name} type={type} onChange={onChange} />
    </div>
  );
}
