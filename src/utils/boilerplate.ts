export function getBoilerplateCode(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "java":
      return `
public class ${fileName.split(".")[0]} {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`;
    case "py":
      return `
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()
`;
    case "js":
    case "ts":
      return `
function main() {
  console.log("Hello, World!");
}

main();
`;
    case "html":
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
`;
    case "css":
      return `
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
`;
    default:
      return "";
  }
}
