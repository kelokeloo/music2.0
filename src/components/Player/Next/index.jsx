const ctrlStyle = {
  fontSize: "5rem",
};
export function Next(props) {
  const { next } = props;
  function handleClick() {
    next();
  }
  return (
    <svg
      className="icon"
      aria-hidden="true"
      style={ctrlStyle}
      onClick={() => handleClick()}
    >
      <use xlinkHref="#icon-zuihouyiyemoyexiayishou"></use>
    </svg>
  );
}
