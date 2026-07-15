import { FormatTextProps } from "@/types/components";
import React from "react";

const FormatText: React.FC<FormatTextProps> = ({ text }) => {
  if (!text) return null;

  const boldClasses = {
    1: "font-bold text-xl",
    2: "font-semibold text-lg",
    3: "font-medium text-base",
  };

  const parseInline = (text: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    let cursor = 0;

    while (cursor < text.length) {
      const match = text.slice(cursor).match(/B([123])\(/);

      if (!match || match.index === undefined) {
        nodes.push(text.slice(cursor));
        break;
      }

      const start = cursor + match.index;

      if (start > cursor) {
        nodes.push(text.slice(cursor, start));
      }

      const level = Number(match[1]);

      let depth = 1;
      let end = start + match[0].length;

      while (end < text.length && depth > 0) {
        if (text[end] === "(") depth++;
        else if (text[end] === ")") depth--;
        end++;
      }

      const content = text.slice(
        start + match[0].length,
        end - 1
      );

      nodes.push(
        <span
          key={`${start}-${end}`}
          className={
            boldClasses[level as keyof typeof boldClasses]
          }
        >
          {parseInline(content)}
        </span>
      );

      cursor = end;
    }

    return nodes;
  };

  const parseLine = (line: string, index: number) => {
    const trimmed = line.trim();

    if (
      trimmed.startsWith("*(") &&
      trimmed.endsWith(")")
    ) {
      return (
        <li key={index} className="ms-8 list-disc">
          {parseInline(trimmed.slice(2, -1))}
        </li>
      );
    }

    return <div key={index}>{parseInline(trimmed)}</div>;
  };

  return (
    <>
      {text
        .split("\n")
        .filter(Boolean)
        .map(parseLine)}
    </>
  );
}

export default FormatText;