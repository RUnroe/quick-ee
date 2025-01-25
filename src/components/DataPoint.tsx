import { ReactNode } from "react";

interface Props {
  label: string,
  data?: string,
  children?: ReactNode
}

const DataPoint = ({label, data, children}: Props) => {
  return (  
    <div className="data-point">
      <p className="label">{label}</p>
      {
        (data ? <p>{data}</p> : children) || ''
      }
    </div>
  );
}
 
export default DataPoint;