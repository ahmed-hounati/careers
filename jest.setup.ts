// jest.setup.ts or a dedicated mock file

global.File = class File {
  name: string;
  lastModified: number;
  size: number;
  type: string;

  constructor(parts: string[], name: string, options: { type: string }) {
    this.name = name;
    this.type = options.type;
    this.size = parts.reduce((acc, part) => acc + part.length, 0);
    this.lastModified = Date.now();
  }

  // Mock the arrayBuffer method
  async arrayBuffer(): Promise<ArrayBuffer> {
    // Return a mock ArrayBuffer with a fixed size (you can adjust this as needed)
    const buffer = new ArrayBuffer(10); // Mock ArrayBuffer size
    return buffer;
  }
} as unknown as typeof File;
