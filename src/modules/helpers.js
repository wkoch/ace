export function timeObjAsStr(time) {
  time.m = Math.trunc(time.m);
  time.h = String(time.h).padStart(2, "0");
  time.m = String(time.m).padStart(2, "0");
  return `${time.h}:${time.m}`;
}

export function timeStrAsObj(time) {
  let [hours, minutes] = time.split(":");
  return { h: Number(hours), m: Number(minutes) };
}

export function getDuration(start, finish) {
  start = timeStrAsObj(start);
  finish = timeStrAsObj(finish);
  // returns the duration in minutes between start and finish.
  return (finish.h - (start.h + 1)) * 60 + (60 - start.m) + finish.m;
}

export function timeDiff(time, duration) {
  time = timeStrAsObj(time);
  if (time.m + duration >= 60) {
    let hours = Math.trunc((time.m + duration) / 60);
    time.h += hours;
    time.m = time.m + duration - hours * 60;
  } else if (time.m + duration < 0) {
    time.h -= 1;
    time.m = 60 + duration;
  } else {
    time.m += duration;
  }
  return timeObjAsStr(time);
}

export function horaEntre(h, a, b) {
  a = timeStrAsObj(a);
  b = timeStrAsObj(b);
  h = timeStrAsObj(h);

  if ((h.h > a.h && h.h < b.h) || (h.h == a.h && h.m >= a.h && h.h < b.h)) {
    return true;
  } else {
    return false;
  }
}

export function proximoHorario(lista, manha, tarde, media) {
  if (lista.length == 0) {
    if (manha.ativado) {
      return manha.inicio;
    } else {
      return tarde.inicio;
    }
  } else {
    let ultimaVistoria = lista[lista.length - 1].hora;
    let ultimoTipo = lista[lista.length - 1].tipo;
    let duracao = ultimoTipo == "f" ? 2 : media;
    let essaVistoria = timeDiff(ultimaVistoria, duracao);
    if (
      (manha.ativado && !tarde.ativado) ||
      (!manha.ativado && tarde.ativado)
    ) {
      return essaVistoria;
    } else {
      if (horaEntre(essaVistoria, manha.inicio, manha.fim)) {
        return essaVistoria;
      } else if (horaEntre(essaVistoria, manha.fim, tarde.inicio)) {
        return tarde.inicio;
      } else {
        return essaVistoria;
      }
    }
  }
}

export function updateIDs(lista) {
  let id = 0;
  for (var item of lista) {
    item.id = id;
    id += 1;
  }
  return lista;
}
