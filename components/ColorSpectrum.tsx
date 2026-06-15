export default function ColorSpectrum({
  palette,
}: {
  palette: string[];
}) {
  return (
    <div className="flex h-8 w-full overflow-hidden rounded-lg">
      {palette.map((color) => (
        <div
          key={color}
          style={{
            backgroundColor: color,
            width: `${100 / palette.length}%`,
          }}
        />
      ))}
    </div>
  );
}