import { forwardRef } from 'react';

const AdminMessage = forwardRef(function AdminMessage({ message }, ref) {
  return (
    <li className="my-1 py-1 text-center" ref={ref}>
      📢 {message.content}
    </li>
  );
});

export default AdminMessage;
