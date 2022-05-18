export function LikeIcon(props) {
  const { click, actived } = props;
  return (
    <svg
      className="icon"
      aria-hidden="true"
      style={{ fontSize: "3.5rem", color: actived ? "rgba(211, 58, 44)" : "" }}
      onClick={() => click()}
    >
      <use xlinkHref="#icon-xihuan"></use>
    </svg>
  );
}
