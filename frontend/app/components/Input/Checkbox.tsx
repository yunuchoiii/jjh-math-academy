import styles from "./Input.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  return <div className="flex items-center mt-2">
    <input 
      type="checkbox" 
      id="remember" 
      className={`h-4 w-4 ${styles.checkbox}`}
      checked={checked}
      onChange={() => onChange(!checked)}
    />
    <label htmlFor="remember" className="ml-2 text-sm cursor-pointer">{label}</label>
  </div>
}

export default Checkbox;