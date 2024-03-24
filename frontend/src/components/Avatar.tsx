export function Circle() {
  return (
    <div className="h-1 w-1 rounded-full bg-slate-500 dark:bg-slate-300"></div>
  );
}

export function Avatar({
  name,
  size = 'small',
}: {
  name: string;
  size?: 'small' | 'big';
}) {
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === 'small' ? 'w-6 h-6' : 'w-10 h-10'
      }`}
    >
      <span
        className={`${
          size === 'small' ? 'text-xs' : 'text-md'
        } font-extralight text-gray-200 `}
      >
        {name[0]}
      </span>
    </div>
  );
}
