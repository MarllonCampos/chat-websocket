import { FormEvent, useRef } from "react";

export const Register = () => {
  const inputName = useRef<HTMLInputElement>(null);
  const inputGroupId = useRef<HTMLInputElement>(null);
  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputName.current || !inputGroupId.current) return;
    const { value: name } = inputName.current;
    const { value: groupId } = inputGroupId.current;
    console.log({ name, groupId });
  };
  return (
    <div className="register">
      <div className="register__card">
        <h3 className="register__card-title">
          Entre no Chat
        </h3>
        <form
          className="register__card-form"
          onSubmit={formSubmit}
        >
          <div className="form-group">
            <label htmlFor="name">Nome: </label>
            <input
              type="text"
              name="name"
              autoFocus
              ref={inputName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="group-id">Id do grupo: </label>
            <input
              type="text"
              name="group-id"
              ref={inputGroupId}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};
