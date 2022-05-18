const ctrlStyle = {
  fontSize: "5rem",
};
export function Prev(props) {
  const { prev } = props;
  function handleClick() {
    prev();
  }
  return (
    <svg
      className="icon"
      aria-hidden="true"
      style={ctrlStyle}
      onClick={() => handleClick()}
    >
      <use xlinkHref="#icon-diyiyeshouyeshangyishou"></use>
    </svg>
  );
}
