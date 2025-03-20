export default async function handler(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) {
    const response = await fetch('http://localhost:5000');
    const data = await response.json();
    res.status(200).json(data);
  }
  