export default function getLocFromIndex(index, lines) {
  // pop potential final newline
  // indeed, we won't display a message on this character
  // but instead on the previous one
  if (lines[lines.length - 1] === "") {
    lines.pop();
  }

  let cumulated = 0;
  const lengths = lines.map(({ length }) => {
    cumulated += length;
    return {
      cumulated,
      length,
    };
  });

  let line = 1;
  let column = 0;

  let totalLength = lengths[lines.length - 1].cumulated;
  // if error is on trailing newline
  // display it on the previous line
  if (index >= totalLength) {
    line = lines.length;
    column = lengths[line - 1].length;
  } else {
    while (index > lengths[line - 1].cumulated) {
      line += 1;
    }

    // if error is on first line
    if (line - 2 < 0) {
      column = index;
    } else {
      column = index - lengths[line - 2].cumulated;
    }
  }

  return { line, column };
}
