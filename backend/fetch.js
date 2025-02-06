fetch('http://localhost:7000/assignTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify({
      email: 'x@x.com',
      taskId:"67a313a9d3d315f003513a80",
      currProgress:0,
      assignDate:'2025-02-05T07:30:49.564+00:00',
      dueDate:'2025-02-05T07:30:49.564+00:00'
    })
  })
  .then(response => response.json())
  .then(data => data.success?console.log(data.message):console.log(data.message))
  .catch(error => console.error('Error:', error));
