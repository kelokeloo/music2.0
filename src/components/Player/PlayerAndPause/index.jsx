const ctrlStyle = {
  fontSize: "5rem",
};
export function PlayerAndPause(props) {
  const { state, play, pause } = props;
  const arr = ["#icon-yunhang", "#icon-lianxi2hebing-15"];
  function handleClick() {
    if (state) {
      pause();
    } else {
      play();
    }
  }
  return (
    <svg
      className="icon"
      aria-hidden="true"
      style={ctrlStyle}
      onClick={() => handleClick()}
    >
      <use xlinkHref={state ? arr[1] : arr[0]}></use>
    </svg>
  );
}
