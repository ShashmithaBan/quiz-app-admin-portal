import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  const modalContainer = document.getElementById('modal') || document.body;

  return createPortal(
    <dialog className="modal" ref={dialog} >
      <div className=' border-2 border-green-500 rounded-md'>
      <div className='px-20 py-5'>
      {children}
      </div>
      
      <button onClick={onClose} className='bg-red-500 text-white px-11 py-2 rounded hover:bg-red-600 mx-auto block mb-5'>Close</button>
      </div>
     
    </dialog>,
    modalContainer
  );
}

export default Modal;