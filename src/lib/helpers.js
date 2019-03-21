

export function timeObjAsStr(time) {
    time.m = Math.trunc(time.m);
  time.h = String(time.h).padStart(2, "0");
  time.m = String(time.m).padStart(2, "0");
  return `${time.h}:${time.m}`;
}