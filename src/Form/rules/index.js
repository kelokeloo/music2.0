export function required(label) {
  return {
    required: true,
    message: `请输入你的${label} !`,
  };
}
