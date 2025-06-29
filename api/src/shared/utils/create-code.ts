const createCode = (prefix = "") => {
  const now = new Date();

  const pad2 = (n: number) => n.toString().padStart(2, "0");

  const yyyy = now.getFullYear();
  const MM = pad2(now.getMonth() + 1);
  const dd = pad2(now.getDate());
  const HH = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());

  return `${prefix}${yyyy}${MM}${dd}${HH}${mm}${ss}`;
};

export default createCode;
