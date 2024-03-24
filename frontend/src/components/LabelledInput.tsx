interface LabelledInputProps {
  label: 'Email' | 'Password' | 'Name';
  onChange: () => void;
  type?: 'text' | 'password';
}

export const LabelledInput = ({
  label,
  onChange,
  type,
}: LabelledInputProps) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm  text-black dark:text-white font-semibold"
      >
        {label}
      </label>
      <input
        type={type}
        id={label}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:outline-none block w-full p-2.5    text-gray"
        placeholder={`${
          label === 'Email' ? 'abc@example.com' : label === 'Name' ? 'Name' : ''
        }`}
      />
    </div>
  );
};
