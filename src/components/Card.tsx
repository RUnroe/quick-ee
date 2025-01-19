import { ReactNode } from "react";

interface Props {
  className?: string
  children?: ReactNode
}

const Card = ({className, children}: Props) => {
  return (  
    <section className={`card ${className ? className : ''}`}>
      {children}
    </section>
  );
}
 
export default Card;