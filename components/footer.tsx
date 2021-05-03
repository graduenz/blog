export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center text-gray-600">
      <div className="my-4 text-sm font-medium">
        Guilherme Augusto Raduenz &copy;&nbsp;
        {currentYear}
      </div>
    </footer>
  );
}
