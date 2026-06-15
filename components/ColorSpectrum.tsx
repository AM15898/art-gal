type Color = {
  hex: string;
  percentage: number;
};

export default function ColorSpectrum({
  palette,
}: {
  palette: Color[];
}) {
  return (
    <div className="flex h-8 w-full overflow-hidden rounded-lg">
      {palette.map((color) => (
        <div
          key={color.hex}
          style={{
            backgroundColor: color.hex,
            width: `${color.percentage}%`,
          }}
        />
      ))}
    </div>
  );
}