import { useState } from 'react';
import axios from 'axios';

const TaskAssignment = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAssignTask = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');

    const requestData = {
      email: 'x@x.com',
      taskId: '67a313a9d3d315f003513a81',
      currProgress: 0,
      assignDate: '2025-02-05T07:30:49.564+00:00',
      dueDate: '2025-02-05T07:30:49.564+00:00',
    };

    try {
      const response = await axios.post('http://localhost:7000/assignTask', requestData
      ,{withCredentials:true});

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      setError('Error occurred while sending the request: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Task Assignment</h1>
      <button onClick={handleAssignTask} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Assign Task'}
      </button>

      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TaskAssignment;
