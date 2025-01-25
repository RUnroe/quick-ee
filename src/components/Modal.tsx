import { ReactNode } from "react";

interface Props {
  title?: string,
  body?: ReactNode,
  footer?: ReactNode,
  className?: string,
  handleClose: () => void

}

const Modal = ({title, body, footer, className, handleClose}: Props) => {
  return (
    <>  
    <section className={`modal ${className || ''}`}>
      <div className="modal-header">
        {title ? <h3>{title}</h3> : null }

        <button 
          className="button close"
          onClick={handleClose}
        >
        ×
        </button>
      </div>

      <div className="modal-body">
        {body}
      </div>

      {footer ? 
        <div className="modal-footer">
          {footer}
        </div>
      : null}
    </section>
    <div className="modal-screen"></div>
    </>
  );
}
 
export default Modal;