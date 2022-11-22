import type { Component } from 'solid-js';

import styles from './App.module.css';

function expandSelection(value: string, start: number, end: number, needle: string) {
  let lineEnd = value.indexOf(needle, start);

  if (lineEnd === -1) {
    lineEnd = value.length;
  }

  const lineStart = value.substring(0, start).lastIndexOf("\n") + 1;

  return [lineStart, lineEnd];
}

function atob_lines(input: string) {
  return input.split("\n").map(atob).join("\n");
}

const App: Component = () => {
  const _decode = (transform: (input: string) => string) => {
    if (!inputRef) {
      return;
    }

    const start = inputRef.selectionStart;
    const end = inputRef.selectionEnd;

    if (start === 0 && end === 0) {
      return;
    }

    const value = inputRef.value;
    const [lineStart, lineEnd] = expandSelection(value, start, end, "\n");
    const selection = value.substring(lineStart, lineEnd);

    inputRef.focus();
    inputRef.setSelectionRange(lineStart, lineEnd);
    inputRef.setRangeText(transform(selection), lineStart, lineEnd);
  }

  const decode = () => _decode(atob_lines)

  let inputRef: HTMLTextAreaElement | undefined;

  return (
    <div class={styles.App}>
      <div class={styles.controls}>
        <button onClick={decode}>Base64</button>
      </div>
      <div class={styles.editor}>
        <textarea ref={inputRef} placeholder="Add text here...\n\nE.g.:\n#group1\ntext or base64 text\n\n#group2\ntext or base64 text"></textarea>
      </div>
    </div>
  );
};

export default App;
