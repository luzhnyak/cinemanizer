import { useState } from 'react';
import { Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const FormAuth = ({ onSubmit, title, isRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegister && (
        <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
          />
        </FloatingLabel>
      )}

      <FloatingLabel
        controlId="floatingInput2"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingPassword3"
        label="Password"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
      </FloatingLabel>
      <Button variant="primary" type="submit">
        {title}
      </Button>
    </form>
  );
};

export default FormAuth;
