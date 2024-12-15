interface ProduktProps {
  nazwa: string;
}

export default function Produkt({ nazwa }: ProduktProps): JSX.Element {
  return (
    <div>
      <p>{nazwa}</p>
    </div>
  );
}