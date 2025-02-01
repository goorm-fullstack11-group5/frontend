export const LANGUAGES = {
  c: "C11",
  cpp: "C++20",
  java: "Java 17",
  javascript: "ES2022",
  python: "Python 3.11",
};

export const CODE_SNIPPETS = {
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\\n");\n\treturn 0;\n}\n`,
  cpp: `#include <iostream>\n\nusing namespace std;\n\nint main() {\n\tcout << "Hello, World!" << endl;\n\treturn 0;\n}\n`,
  java: (className: string) => `
public class ${className} {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
  `,
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("World");\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Code Editor")\n`,
};
